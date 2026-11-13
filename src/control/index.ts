import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import Player, { Mode } from '../player'
import type Terrain from '../terrain'
import { BLOCKS, BlockType, HOTBAR } from '../terrain/blocks'
import { collides, moveAndCollide, type Vec3 } from './physics'
import { raycast, type RayHit } from './raycast'

/** 水的阻力：原版每 tick 速度 ×0.8，换算成连续形式的衰减系数（每秒） */
const WATER_DRAG = -Math.log(0.8) / 0.05

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
  /** 上一帧水平方向是否撞到了方块（水里爬岸用） */
  private hitWall = false
  /** 游泳状态：碰到水进入，回到陆地才退出（决定水平速度） */
  private swimming = false
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
    const { onGround, hitWall } = moveAndCollide(this.feet, p.velocity, dt, body, this.terrain.isSolidAt.bind(this.terrain))
    p.onGround = onGround
    this.hitWall = hitWall
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

  /**
   * 脚底泡在水里多深（格）：0 表示没碰到水。
   * 水面高度和画出来的一样：上面不是水的水块，水面在 14/16 处（见 mesh/mesher.ts）。
   */
  private get waterDepth(): number {
    const { x, y, z } = this.feet
    const bx = Math.floor(x)
    const bz = Math.floor(z)
    let top = -Infinity
    // 从脚所在的格子往上找，找到连续的水柱顶
    for (let by = Math.floor(y); by <= Math.floor(y + this.player.body.height); by++) {
      if (this.terrain.getBlock(bx, by, bz) !== BlockType.water) break
      top = this.terrain.getBlock(bx, by + 1, bz) === BlockType.water ? by + 1 : by + 0.875
    }
    return Math.max(0, top - y)
  }

  private updateVelocity(dt: number) {
    const p = this.player
    const v = p.velocity
    const depth = p.flying ? 0 : this.waterDepth
    const touchingWater = depth > 0

    // “游泳状态”：碰到水就进入，回到地面（且不在水里）才退出。
    // 从水面跳出去的那一下也算游泳状态，所以水平速度不会突然变成陆地速度（原版也是这样：
    // 出水的一瞬间人在空中，空中几乎不能加速，保持的是水里的速度）
    if (touchingWater) this.swimming = true
    else if (p.onGround || p.flying) this.swimming = false

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
    const speed = p.speed * (this.swimming ? 0.5 : 1)
    v.x = move.x * speed
    v.z = move.z * speed

    // 竖直方向
    const up = this.keys.has('Space')
    const down = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight')
    if (p.flying) {
      v.y = up ? p.speed * 0.75 : down ? -p.speed * 0.75 : 0
      return
    }

    // 在浅水里站着（水没过脚踝不到 0.4 格）按空格：正常起跳，和陆地一样
    const shallowJump = up && p.onGround && depth <= 0.4

    if (touchingWater && !shallowJump) {
      // 水里的竖直速度，按原版每 tick 的规则换算成每秒（原版 LivingEntity）：
      //   每 tick：按住跳 y += 0.04；然后 y *= 0.8（水的阻力）；再 y -= 0.005（水里的重力）
      //   稳定后：按住跳 = +0.135 格/tick = +2.7 格/秒；松开 = -0.025 格/tick = -0.5 格/秒（慢慢下沉）
      // 这里用连续形式：速度以 e^(-k·t) 的速度靠近稳定值，k = -ln(0.8) / 0.05 秒
      const target = up ? 2.7 : -0.5
      v.y = target + (v.y - target) * Math.exp(-WATER_DRAG * dt)

      // 游向一格高的岸边时往上蹿一下（原版 LivingEntity.travel）：
      // 水里水平方向撞到方块，并且把人抬高 0.6 格之后前面是空的 → 竖直速度设为 0.3 格/tick = 6 格/秒。
      // 抬高 0.6 格还撞墙（高墙、水下的峭壁）就不会触发，所以不会贴着墙一直往上爬
      if (this.hitWall && move.lengthSq() > 0) {
        const body = { half: p.body.width / 2, height: p.body.height }
        const lifted = { x: this.feet.x + move.x * 0.3, y: this.feet.y + 0.6, z: this.feet.z + move.z * 0.3 }
        if (!collides(lifted, body, this.terrain.isSolidAt.bind(this.terrain))) v.y = 6
      }
    } else {
      // 陆地 / 空中（包括从水面跳出去的那一下）：正常重力。
      // 原版在水面按住空格就是这样：在水里往上加速 → 冲出水面 → 重力拉回来 → 再进水，一上一下地“浮”着
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
