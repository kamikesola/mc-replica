import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import Player, { Mode } from '../player'
import type Terrain from '../terrain'
import { BLOCKS, BlockType, HOTBAR } from '../terrain/blocks'
import { collides, moveAndCollide, type Vec3 } from './physics'
import { raycast, type RayHit } from './raycast'

/**
 * Control：键盘鼠标输入 → 玩家移动、挖方块、放方块（对应原项目的 Control 类）。
 *
 * 按键：
 *   WASD 移动 · 空格 跳 / 飞行上升 · Shift 潜行 / 飞行下降
 *   双击 W 或按住 R 疾跑 · 双击空格或按 F 切换飞行
 *   左键 挖 · 右键 放 · 数字键 / 滚轮 选方块 · F3 调试信息 · M 噪声图
 *
 * 位置约定：feet 是玩家脚底中心（碰撞箱底面中心），相机放在 feet + 眼高。
 */
export default class Control {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  player: Player
  terrain: Terrain
  control: PointerLockControls

  /** 玩家脚底位置 */
  feet: Vec3 = { x: 0.5, y: 120, z: 0.5 }
  /** 出生点找好之前不移动（区块还没加载完） */
  spawned = false
  /** 当前选中的物品栏格子 0..8 */
  slot = 0
  /** 准星对准的方块 */
  target: RayHit | null = null
  /** 最远能够到 5 格（原版生存模式 4.5，这里放宽一点） */
  reach = 5

  private keys = new Set<string>()
  private lastTap: Record<string, number> = {}
  private sprintByDoubleTap = false

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, player: Player, terrain: Terrain) {
    this.scene = scene
    this.camera = camera
    this.player = player
    this.terrain = terrain
    this.control = new PointerLockControls(camera, document.body)
    this.initKeyboard()
    this.initMouse()
  }

  // ---------------------------------------------------------------- 输入

  initKeyboard = () => {
    document.addEventListener('keydown', (e) => {
      if (!this.control.isLocked) return
      if (e.code === 'F3' || e.code === 'Tab') e.preventDefault()
      if (e.repeat) return
      this.keys.add(e.code)
      const now = performance.now()
      const doubleTap = now - (this.lastTap[e.code] ?? 0) < 300
      this.lastTap[e.code] = now

      if (e.code === 'KeyW' && doubleTap) this.sprintByDoubleTap = true
      if ((e.code === 'Space' && doubleTap) || e.code === 'KeyF') this.toggleFly()
      if (e.code.startsWith('Digit')) {
        const n = Number(e.code.slice(5))
        if (n >= 1 && n <= 9) this.slot = n - 1
      }
    })
    document.addEventListener('keyup', (e) => {
      this.keys.delete(e.code)
      if (e.code === 'KeyW') this.sprintByDoubleTap = false
    })
    // 失去焦点时清空按键，防止切回来后人物一直往前走
    window.addEventListener('blur', () => this.keys.clear())
    this.control.addEventListener('unlock', () => this.keys.clear())
  }

  initMouse = () => {
    document.addEventListener('mousedown', (e) => {
      if (!this.control.isLocked || !this.target) return
      if (e.button === 0) this.breakBlock()
      if (e.button === 2) this.placeBlock()
    })
    document.addEventListener('contextmenu', (e) => e.preventDefault())
    document.addEventListener(
      'wheel',
      (e) => {
        if (!this.control.isLocked) return
        this.slot = (this.slot + (e.deltaY > 0 ? 1 : -1) + 9) % 9
      },
      { passive: true }
    )
  }

  toggleFly = () => {
    this.player.setMode(this.player.flying ? Mode.walking : Mode.flying)
    this.player.velocity.y = 0
  }

  // ---------------------------------------------------------------- 挖 / 放

  breakBlock = () => {
    const t = this.target!
    const type = this.terrain.getBlock(t.x, t.y, t.z)
    if (type === null || !BLOCKS[type].breakable) return
    this.terrain.setBlock(t.x, t.y, t.z, BlockType.air)
  }

  placeBlock = () => {
    const t = this.target!
    const x = t.x + t.nx
    const y = t.y + t.ny
    const z = t.z + t.nz
    const here = this.terrain.getBlock(x, y, z)
    if (here !== BlockType.air && here !== BlockType.water) return
    // 不能把方块放进自己身体里
    const body = { half: this.player.body.width / 2, height: this.player.body.height }
    if (collides(this.feet, body, (bx, by, bz) => bx === x && by === y && bz === z)) return
    this.terrain.setBlock(x, y, z, HOTBAR[this.slot])
  }

  // ---------------------------------------------------------------- 出生点

  /**
   * 在原点附近找一块陆地站上去。区块还没生成好时返回 false，下一帧再试。
   * 出生点周围全是海时，就在海面上空开着飞行模式出生。
   */
  trySpawn = (): boolean => {
    const info = this.terrain.info
    if (!info) return false
    for (let r = 0; r <= 48; r += 4) {
      for (let i = 0; i < Math.max(1, r * 2); i++) {
        const a = (i / Math.max(1, r * 2)) * Math.PI * 2
        const x = Math.floor(Math.cos(a) * r)
        const z = Math.floor(Math.sin(a) * r)
        const top = this.terrain.topSolidY(x, z)
        if (top === null) return false // 还没加载
        if (top >= info.seaLevel) {
          this.feet = { x: x + 0.5, y: top + 1, z: z + 0.5 }
          return true
        }
      }
    }
    this.feet = { x: 0.5, y: info.seaLevel + 10, z: 0.5 }
    this.player.setMode(Mode.flying)
    return true
  }

  // ---------------------------------------------------------------- 每帧

  update = (dt: number) => {
    if (!this.spawned) {
      this.spawned = this.trySpawn()
      this.syncCamera()
      return
    }
    dt = Math.min(dt, 0.05) // 卡顿时不要一下飞出去太远
    this.updateMode()
    this.updateVelocity(dt)

    const p = this.player
    const body = { half: p.body.width / 2, height: p.body.height }
    const { onGround } = moveAndCollide(this.feet, p.velocity, dt, body, this.terrain.isSolidAt.bind(this.terrain))
    p.onGround = onGround
    if (onGround && p.flying) p.setMode(Mode.walking) // 飞行时落地自动取消飞行（同原版）

    this.syncCamera()
    this.updateTarget()
  }

  /** 根据按键决定走 / 跑 / 潜行 / 飞 */
  private updateMode() {
    const p = this.player
    const sprint = this.keys.has('KeyR') || this.sprintByDoubleTap
    if (p.flying) p.setMode(sprint ? Mode.sprintFlying : Mode.flying)
    else if (this.keys.has('ShiftLeft') || this.keys.has('ShiftRight')) p.setMode(Mode.sneaking)
    else p.setMode(sprint && this.keys.has('KeyW') ? Mode.sprinting : Mode.walking)
  }

  private get inWater(): boolean {
    const b = this.terrain.getBlock(Math.floor(this.feet.x), Math.floor(this.feet.y + 0.4), Math.floor(this.feet.z))
    return b === BlockType.water
  }

  private updateVelocity(dt: number) {
    const p = this.player
    const v = p.velocity

    // 水平方向：相机朝向投影到水平面上
    const forward = new THREE.Vector3()
    this.camera.getWorldDirection(forward)
    forward.y = 0
    forward.normalize()
    const right = new THREE.Vector3().crossVectors(forward, this.camera.up).normalize()
    const move = new THREE.Vector3()
    if (this.keys.has('KeyW')) move.add(forward)
    if (this.keys.has('KeyS')) move.sub(forward)
    if (this.keys.has('KeyD')) move.add(right)
    if (this.keys.has('KeyA')) move.sub(right)
    if (move.lengthSq() > 0) move.normalize()
    const speed = p.speed * (this.inWater && !p.flying ? 0.5 : 1)
    v.x = move.x * speed
    v.z = move.z * speed

    // 竖直方向
    const up = this.keys.has('Space')
    const down = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight')
    if (p.flying) {
      v.y = up ? p.speed * 0.75 : down ? -p.speed * 0.75 : 0
    } else if (this.inWater) {
      // 水里：重力小、下沉慢，按住空格往上游
      v.y = up ? 3 : Math.max(v.y - p.gravity * 0.2 * dt, -2.5)
    } else {
      v.y = Math.max(v.y - p.gravity * dt, -p.terminalVelocity)
      if (up && p.onGround) v.y = Math.sqrt(2 * p.gravity * p.jumpHeight) // v² = 2gh
    }
  }

  private syncCamera() {
    const eye = this.player.mode === Mode.sneaking ? 1.27 : this.player.body.eye
    this.camera.position.set(this.feet.x, this.feet.y + eye, this.feet.z)
  }

  private updateTarget() {
    const dir = new THREE.Vector3()
    this.camera.getWorldDirection(dir)
    const o = this.camera.position
    this.target = raycast(o.x, o.y, o.z, dir.x, dir.y, dir.z, this.reach, (x, y, z) => {
      const b = this.terrain.getBlock(x, y, z)
      return b !== null && b !== BlockType.air && b !== BlockType.water
    })
    if (this.target) this.terrain.highlight.show(this.target.x, this.target.y, this.target.z)
    else this.terrain.highlight.hide()
  }

  /** 面朝方向（F3 用），和原版一样用 东南西北 */
  get facing(): string {
    const dir = new THREE.Vector3()
    this.camera.getWorldDirection(dir)
    if (Math.abs(dir.x) > Math.abs(dir.z)) return dir.x > 0 ? 'east (+X)' : 'west (-X)'
    return dir.z > 0 ? 'south (+Z)' : 'north (-Z)'
  }
}
