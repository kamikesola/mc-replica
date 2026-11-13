import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import Player, { PHYSICS } from '../player'
import type Terrain from '../terrain'
import { BLOCKS, BlockType, HOTBAR, isSolid } from '../terrain/blocks'
import { tickPlayer, type MoveInput, type MoveWorld } from './movement'
import { collides, EMPTY, FULL_CUBE, type Vec3 } from './physics'
import { raycast, type RayHit } from './raycast'

/** 原版默认视野 70°（竖直方向） */
const BASE_FOV = 70

/**
 * Control：键盘鼠标输入 → 玩家移动、挖方块、放方块（对应原项目的 Control 类）。
 *
 * 按键：
 *   WASD 移动 · 空格 跳 / 游泳上浮 / 飞行上升 · Shift 潜行 / 飞行下降
 *   双击 W 或按住 R 疾跑 · 双击空格或按 F 切换飞行
 *   左键 挖 · 右键 放 · 数字键 / 滚轮 选方块
 *
 * v2：物理改成和原版一样的固定步长——每秒 20 个 tick，每个 tick 跑一遍 movement.ts。
 * 屏幕每秒刷新 60 次甚至更多，两个 tick 之间的画面用插值补出来：
 *
 *   帧时间累加到 acc 里，满 0.05 秒就跑一个 tick
 *   画面位置 = lerp(上一个 tick 的位置, 这个 tick 的位置, acc / 0.05)
 *
 * 这样物理结果和帧率无关（30 帧和 144 帧跳得一样高），画面也不会一顿一顿的。
 *
 * 位置约定：player.pos 是脚底中心，相机在脚底 + 眼高。
 */
export default class Control {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  player: Player
  terrain: Terrain
  control: PointerLockControls
  /**
   * 鼠标转动的是这个“头”，不是相机本身。相机每帧从头复制朝向，再叠加视角摇晃。
   * 如果直接转相机，摇晃造成的倾斜会被鼠标控制器当成玩家自己转的，越积越歪。
   */
  head = new THREE.Object3D()

  /** 出生点找好之前不移动（区块还没加载完） */
  spawned = false
  /** 当前选中的物品栏格子 0..8 */
  slot = 0
  /** 准星对准的方块 */
  target: RayHit | null = null
  /** 最远能够到 5 格（原版生存模式 4.5，这里放宽一点） */
  reach = 5
  /** 视角摇晃（原版“视角摇晃”选项，默认开） */
  bobbing = true

  /** 还没跑掉的时间（秒），满 1 tick 就跑一次 */
  private acc = 0
  /** 眼高：切换站 / 蹲时每 tick 走一半，看起来是平滑蹲下（原版 Camera.tick） */
  private eye = 1.62
  private prevEye = 1.62
  /** 视野倍数：疾跑 1.15、飞行 1.1，每 tick 走一半（原版 GameRenderer.tickFov） */
  private fovMod = 1
  private prevFovMod = 1

  private keys = new Set<string>()
  private lastTap: Record<string, number> = {}
  private sprintByDoubleTap = false
  private world: MoveWorld

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, player: Player, terrain: Terrain) {
    this.scene = scene
    this.camera = camera
    this.player = player
    this.terrain = terrain
    this.head.rotation.order = 'YXZ'
    this.control = new PointerLockControls(this.head as unknown as THREE.Camera, document.body)
    this.world = {
      // 没加载的区块当作实心，防止掉进还没生成的地方
      shape: (x, y, z) => {
        const b = terrain.getBlock(x, y, z)
        return b === null || isSolid(b) ? FULL_CUBE : EMPTY
      },
      isWater: (x, y, z) => terrain.getBlock(x, y, z) === BlockType.water
    }
    this.initKeyboard()
    this.initMouse()
  }

  /** 玩家脚底位置（F3、噪声图用） */
  get feet(): Vec3 {
    return this.player.pos
  }

  set feet(v: Vec3) {
    this.teleport(v.x, v.y, v.z)
  }

  /** 瞬移（调试、出生用）：位置、上一 tick 位置一起改，速度清零 */
  teleport(x: number, y: number, z: number): void {
    this.player.pos = { x, y, z }
    this.player.prevPos = { x, y, z }
    this.player.velocity = { x: 0, y: 0, z: 0 }
  }

  /** 朝向（绕 y 轴的角度，弧度） */
  get yaw(): number {
    return new THREE.Euler().setFromQuaternion(this.head.quaternion, 'YXZ').y
  }

  // ---------------------------------------------------------------- 输入

  initKeyboard = () => {
    document.addEventListener('keydown', (e) => {
      if (!this.control.isLocked) return
      if (e.code === 'F3' || e.code === 'Tab') e.preventDefault()
      if (e.repeat) return
      this.keys.add(e.code)
      const now = performance.now()
      // 原版双击判定是 7 tick = 0.35 秒
      const doubleTap = now - (this.lastTap[e.code] ?? 0) < 350
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
    this.player.flying = !this.player.flying
    this.player.velocity.y = 0
  }

  /** 这一 tick 的输入 */
  private readInput(): MoveInput {
    const k = this.keys
    const axis = (a: string, b: string) => (k.has(a) ? 1 : 0) - (k.has(b) ? 1 : 0)
    return {
      forward: axis('KeyW', 'KeyS'),
      left: axis('KeyA', 'KeyD'),
      jump: k.has('Space'),
      sneak: k.has('ShiftLeft') || k.has('ShiftRight'),
      sprint: k.has('KeyR') || this.sprintByDoubleTap,
      yaw: this.yaw
    }
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
    const b = this.player.body
    if (collides(this.player.pos, b.width, b.height, (bx, by, bz) => (bx === x && by === y && bz === z ? FULL_CUBE : EMPTY))) return
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
          this.teleport(x + 0.5, top + 1, z + 0.5)
          return true
        }
      }
    }
    this.teleport(0.5, info.seaLevel + 10, 0.5)
    this.player.flying = true
    return true
  }

  // ---------------------------------------------------------------- 每帧

  update = (dt: number) => {
    if (!this.spawned) {
      this.spawned = this.trySpawn()
      this.render(1)
      return
    }
    // 卡顿太久（切到别的标签页再回来）就不补了，最多补 5 个 tick
    this.acc = Math.min(this.acc + dt, PHYSICS.TICK * 5)
    while (this.acc >= PHYSICS.TICK) {
      this.acc -= PHYSICS.TICK
      this.tick()
    }
    this.render(this.acc / PHYSICS.TICK)
    this.updateTarget()
  }

  /** 一个 tick：物理 + 镜头的平滑量 */
  private tick() {
    const p = this.player
    tickPlayer(p, this.readInput(), this.world)
    if (!p.sprinting) this.sprintByDoubleTap = false // 撞墙停下后，要重新双击才能再跑

    this.prevEye = this.eye
    this.eye += (p.body.eye - this.eye) * 0.5

    // 视野：飞行 ×1.1；移动速度属性 / 0.1 → (h + 1) / 2，疾跑时 (1.3 + 1) / 2 = 1.15
    let fov = p.flying ? 1.1 : 1
    fov *= (p.speedAttribute / PHYSICS.WALK_SPEED + 1) / 2
    this.prevFovMod = this.fovMod
    this.fovMod += (fov - this.fovMod) * 0.5
  }

  /** 把插值后的位置、朝向、摇晃、视野放到相机上。t = 0..1，表示在两个 tick 之间的位置 */
  private render(t: number) {
    const p = this.player
    const lerp = (a: number, b: number) => a + (b - a) * t
    const eye = lerp(this.prevEye, this.eye)
    this.camera.position.set(lerp(p.prevPos.x, p.pos.x), lerp(p.prevPos.y, p.pos.y) + eye, lerp(p.prevPos.z, p.pos.z))
    this.camera.quaternion.copy(this.head.quaternion)

    // 视角摇晃（原版 GameRenderer.bobView）：随走过的距离左右晃、上下颠，幅度是 bob
    if (this.bobbing) {
      const g = p.walkDist - p.prevWalkDist
      const h = -(p.walkDist + g * t) * Math.PI
      const i = lerp(p.prevBob, p.bob)
      const deg = Math.PI / 180
      this.camera.rotateX(-Math.abs(Math.cos(h - 0.2) * i) * 5 * deg)
      this.camera.rotateZ(-Math.sin(h) * i * 3 * deg)
      this.camera.translateX(-Math.sin(h) * i * 0.5)
      this.camera.translateY(Math.abs(Math.cos(h) * i))
    }

    // 视野：疾跑时变宽；眼睛在水下时变窄（原版 ×6/7）
    let fov = BASE_FOV * lerp(this.prevFovMod, this.fovMod)
    if (p.underWater) fov *= 6 / 7
    if (Math.abs(this.camera.fov - fov) > 1e-3) {
      this.camera.fov = fov
      this.camera.updateProjectionMatrix()
    }
  }

  /** 射线从眼睛出发（不带摇晃），方向是头的朝向 */
  private updateTarget() {
    const p = this.player
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(this.head.quaternion)
    const t = this.acc / PHYSICS.TICK
    const ox = p.prevPos.x + (p.pos.x - p.prevPos.x) * t
    const oy = p.prevPos.y + (p.pos.y - p.prevPos.y) * t + this.prevEye + (this.eye - this.prevEye) * t
    const oz = p.prevPos.z + (p.pos.z - p.prevPos.z) * t
    this.target = raycast(ox, oy, oz, dir.x, dir.y, dir.z, this.reach, (x, y, z) => {
      const b = this.terrain.getBlock(x, y, z)
      return b !== null && b !== BlockType.air && b !== BlockType.water
    })
    if (this.target) this.terrain.highlight.show(this.target.x, this.target.y, this.target.z)
    else this.terrain.highlight.hide()
  }

  /** 面朝方向（F3 用），和原版一样用 东南西北 */
  get facing(): string {
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(this.head.quaternion)
    if (Math.abs(dir.x) > Math.abs(dir.z)) return dir.x > 0 ? 'east (+X)' : 'west (-X)'
    return dir.z > 0 ? 'south (+Z)' : 'north (-Z)'
  }
}
