import * as THREE from 'three'
import type { PlayerSave } from '../save/store'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import Player, { PHYSICS } from '../player'
import type Terrain from '../terrain'
import { BLOCK_OF, BLOCKS, BlockType, COLLISION, COLLISION_SHAPES, FLUIDS, FluidKind, HARDNESS, HOTBAR, NAME_BY_BLOCK, NAME_BY_STATE, NEEDS_TOOL } from '../terrain/blocks'
import { ItemEntity, popResource, throwItem } from '../items/entities'
import { Inventory } from '../items/inventory'
import { destroyProgress } from '../items/mining'
import { blockOfItem, itemOfBlock, type ItemStack } from '../items/items'
import { hasLootTables, loadLootTable, lootTables } from '../items/lootLoader'
import { dirOf, placement, useBlock, type PlaceWorld } from '../terrain/placement'
import { useRedstone } from '../terrain/redstone'
import { tickPlayer, type MoveInput, type MoveWorld } from './movement'
import { AABB, collides, EMPTY, FULL_CUBE, type Vec3 } from './physics'
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
  /** 准星打在方块面上的那一点（世界坐标，v9） */
  hit: [number, number, number] = [0, 0, 0]
  /**
   * 游戏模式（v10）：创造（瞬间挖掉、方块用不完、能飞、不掉东西）或生存（挖要时间、掉东西、放方块要用背包里的）
   */
  mode: 'creative' | 'survival' = 'creative'
  /** 背包（v10）：0..8 是物品栏 */
  inventory = new Inventory()
  /** 背包界面里“拿在鼠标上”的东西（v10） */
  cursor: ItemStack | null = null
  /** 地上的物品（v10） */
  drops: ItemEntity[] = []
  /** 正在挖的方块（v10，生存模式）：位置、挖了多少（0..1） */
  mining: { x: number; y: number; z: number; state: number; progress: number } | null = null
  /** 挖掉一块后要等几个 tick 才能挖下一块（原版 destroyDelay = 5） */
  private destroyDelay = 0
  private leftDown = false

  /** 当前格子里的物品 */
  get held(): ItemStack | null {
    return this.inventory.slots[this.slot]
  }
  /** 准星对准的方块 */
  target: RayHit | null = null
  /** 最远能够到 5 格（原版生存模式 4.5，这里放宽一点） */
  reach = 5
  /** 视角摇晃（原版“视角摇晃”选项，默认开） */
  bobbing = true

  /** 还没跑掉的时间（秒），满 1 tick 就跑一次 */
  private acc = 0
  /** 两个 tick 之间走到哪儿了（0..1），画面插值用（v6：时间也按它插值，太阳动得平滑） */
  get partialTick(): number {
    return this.acc / PHYSICS.TICK
  }
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

  /** 眼睛在什么里面（UI 用来切换雾） */
  get medium(): 'air' | 'water' | 'lava' {
    return this.player.underLava ? 'lava' : this.player.underWater ? 'water' : 'air'
  }

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, player: Player, terrain: Terrain) {
    this.scene = scene
    this.camera = camera
    this.player = player
    this.terrain = terrain
    this.head.rotation.order = 'YXZ'
    this.control = new PointerLockControls(this.head as unknown as THREE.Camera, document.body)
    this.world = {
      // 没加载的区块当作实心，防止掉进还没生成的地方
      // v8.1：每个状态用原版的碰撞箱（台阶、栅栏、雪层、灵魂沙……），见 collisionBoxes
      shape: (x, y, z) => {
        const b = terrain.getBlock(x, y, z)
        return b === null ? FULL_CUBE : collisionBoxes(b)
      },
      block: (x, y, z) => terrain.getBlock(x, y, z) ?? BlockType.bedrock
    }
    this.initKeyboard()
    this.initMouse()
    // 创造模式的默认物品栏：v1 起的那 9 种方块
    HOTBAR.forEach((b, i) => {
      const item = itemOfBlock(b)
      if (item) this.inventory.slots[i] = { item, count: 1 }
    })
  }

  /** 换模式（v10）：生存模式不能飞 */
  setMode(mode: 'creative' | 'survival'): void {
    this.mode = mode
    if (mode === 'survival') this.player.flying = false
    this.mining = null
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
      if (e.code === 'KeyQ') this.dropHeld(e.ctrlKey)
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
      if (e.button === 0) this.leftDown = true
      if (!this.control.isLocked || !this.target) return
      // 创造模式点一下就挖掉；生存模式按住左键慢慢挖（在 tick 里）
      if (e.button === 0 && this.mode === 'creative') this.breakBlock()
      if (e.button === 2) this.placeBlock()
      if (e.button === 1) this.pickBlock()
    })
    document.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.leftDown = false
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
    if (this.mode === 'survival') return
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

  /** 方块世界的读接口（v9，给 terrain/placement.ts 用） */
  private placeWorld: PlaceWorld = { get: (x, y, z) => this.terrain.getBlock(x, y, z) }
  /** 写一格并通知邻居（v9）：门的另一半、栅栏的连接、楼梯拐弯……；v9.1 起红石也跟着算（Terrain.updateBlock） */
  private setAndUpdate = (x: number, y: number, z: number, s: number) => this.terrain.updateBlock(x, y, z, s)

  breakBlock = () => {
    const t = this.target!
    const type = this.terrain.getBlock(t.x, t.y, t.z)
    if (type === null || !BLOCKS[BLOCK_OF[type]].breakable) return
    // 含水的方块挖掉以后留下水（原版：方块没了，流体状态还在）
    this.setAndUpdate(t.x, t.y, t.z, FLUIDS[type].kind === FluidKind.water && FLUIDS[type].source && BLOCK_OF[type] !== BlockType.water ? BlockType.water : BlockType.air)
    if (this.mode === 'survival') this.dropLoot(t.x, t.y, t.z, type)
  }

  /**
   * 生存模式挖掉方块后掉东西（v10）：按原版的战利品表（items/loot.ts）；要用对的工具的方块空手挖什么都不掉。
   * 没有战利品表（没放数据包）时掉方块自己
   */
  private async dropLoot(x: number, y: number, z: number, s: number) {
    if (NEEDS_TOOL[s]) return
    const name = NAME_BY_BLOCK[BLOCK_OF[s]].replace('minecraft:', 'minecraft:blocks/')
    let stacks: ItemStack[] | null = null
    if (hasLootTables()) {
      await loadLootTable(name)
      stacks = lootTables.blockDrops(s)
    }
    if (stacks === null) {
      const item = itemOfBlock(s)
      stacks = item ? [{ item, count: 1 }] : []
    }
    for (const st of stacks) this.drops.push(popResource(x, y, z, st))
  }

  /** 生存模式挖方块（v10，原版 MultiPlayerGameMode.continueDestroyBlock）：按住左键，每 tick 加一点进度（items/mining.ts） */
  private tickMining() {
    if (this.destroyDelay > 0) {
      this.destroyDelay--
      return
    }
    const t = this.target
    if (!this.leftDown || !t || !this.control.isLocked) {
      this.mining = null
      return
    }
    const s = this.terrain.getBlock(t.x, t.y, t.z)
    if (s === null) return
    const m = this.mining
    if (!m || m.x !== t.x || m.y !== t.y || m.z !== t.z || m.state !== s) this.mining = { x: t.x, y: t.y, z: t.z, state: s, progress: 0 }
    this.mining!.progress += destroyProgress(HARDNESS[s], NEEDS_TOOL[s] === 1, this.player.onGround, this.player.underWater)
    if (this.mining!.progress >= 1) {
      this.breakBlock()
      this.mining = null
      this.destroyDelay = 5
    }
  }

  /** 地上的物品：物理、被捡起来（原版 Player.touch → ItemEntity.playerTouch：玩家的碰撞箱四周放大 1、上下 0.5） */
  private tickDrops() {
    const inWater = (p: Vec3) => {
      const b = this.terrain.getBlock(Math.floor(p.x), Math.floor(p.y), Math.floor(p.z))
      return b !== null && FLUIDS[b].kind === FluidKind.water
    }
    const pb = AABB.body(this.player.pos, this.player.body.width, this.player.body.height)
    const reach = new AABB(pb.minX - 1, pb.minY - 0.5, pb.minZ - 1, pb.maxX + 1, pb.maxY + 0.5, pb.maxZ + 1)
    for (const d of this.drops) {
      // 没加载的区块里的物品不动
      if (this.terrain.getBlock(Math.floor(d.pos.x), Math.floor(d.pos.y), Math.floor(d.pos.z)) === null) continue
      d.tick(this.world.shape, inWater)
      const b = d.box
      if (d.pickupDelay === 0 && b.maxX > reach.minX && b.minX < reach.maxX && b.maxY > reach.minY && b.minY < reach.maxY && b.maxZ > reach.minZ && b.minZ < reach.maxZ) {
        const left = this.inventory.add(d.stack.item, d.stack.count)
        if (left === 0) d.removed = true
        else d.stack.count = left
      }
    }
    this.drops = this.drops.filter((d) => !d.removed)
  }

  /** Q：扔掉手上的一个（Ctrl+Q 扔一整组） */
  dropHeld(all = false) {
    const st = this.inventory.take(this.slot, all ? 64 : 1)
    if (!st) return
    if (this.mode === 'creative' && !all) this.inventory.add(st.item, st.count) // 创造模式手上的不会少
    const p = this.player.pos
    this.drops.push(throwItem({ x: p.x, y: p.y + this.eye, z: p.z }, this.yaw, this.head.rotation.x, st))
  }

  placeBlock = () => {
    const t = this.target!
    // v9：右键先“用”方块（开关门、活板门、栅栏门），按着 Shift 时不用、直接放
    if (!this.keys.has('ShiftLeft') && !this.keys.has('ShiftRight')) {
      const s = this.terrain.getBlock(t.x, t.y, t.z)
      // v9.1：拉杆、按钮、中继器
      const used = s === null ? null : (useRedstone(s) ?? useBlock(s, this.yaw))
      if (used !== null) {
        this.setAndUpdate(t.x, t.y, t.z, used)
        return
      }
    }
    // v10：手上的物品放下去是哪个方块（木棍、钻石之类放不下去）
    const held = this.held
    const block = held && blockOfItem(held.item)
    if (block === undefined || block === null) return
    // v9：状态按原版的规则定（terrain/placement.ts）：楼梯的朝向和上下、台阶叠放、门和床放两格、火把插墙上……
    const result = placement(this.placeWorld, {
      block,
      clicked: [t.x, t.y, t.z],
      face: dirOf(t.nx, t.ny, t.nz),
      hit: this.hit,
      yaw: this.yaw,
      pitch: this.head.rotation.x
    })
    if (!result) return
    // 不能把方块放进自己身体里
    const b = this.player.body
    for (const [x, y, z, s] of result)
      if (collides(this.player.pos, b.width, b.height, (bx, by, bz) => (bx === x && by === y && bz === z ? collisionBoxes(s) : EMPTY))) return
    for (const [x, y, z, s] of result) this.terrain.updateBlock(x, y, z, s)
    if (this.mode === 'survival') this.inventory.take(this.slot, 1)
  }

  /**
   * 选方块（v8.1，原版的鼠标中键）：把准星指着的方块放进当前这一格物品栏。
   * 原版拿到的是物品，放下去是默认状态；我们也放默认状态（原木照样按点的面定朝向）
   */
  pickBlock = () => {
    const t = this.target
    if (!t) return
    const s = this.terrain.getBlock(t.x, t.y, t.z)
    if (s === null || s === BlockType.air || isPureFluid(s)) return
    // v10：选的是物品（贴墙的火把 → 火把，红石线 → 红石粉）
    const item = itemOfBlock(s)
    if (!item) return
    const slots = this.inventory.slots
    const i = slots.findIndex((st) => st?.item === item)
    if (i >= 0 && i < 9) this.slot = i
    else if (i >= 9) {
      // 生存模式：背包里有，换到当前格子（原版 pickSlot）
      ;[slots[this.slot], slots[i]] = [slots[i], slots[this.slot]]
    } else if (this.mode === 'creative') slots[this.slot] = { item, count: 1 }
  }

  // ---------------------------------------------------------------- 出生点

  /**
   * 在原点附近找一块陆地站上去。区块还没生成好时返回 false，下一帧再试。
   * 出生点周围全是海时，就在海面上空开着飞行模式出生。
   */
  trySpawn = (): boolean => {
    const info = this.terrain.info
    if (!info) return false
    // v8：存档里有玩家的位置 → 回到那里（等脚下的区块点亮了再开始物理，免得掉下去）
    const r0 = this.resume
    if (r0) {
      this.teleport(r0.x, r0.y, r0.z)
      this.head.rotation.set(r0.pitch, r0.yaw, 0)
      this.player.flying = r0.flying
      return !!this.terrain.getChunk(Math.floor(r0.x), Math.floor(r0.z))?.light
    }
    const { x: sx, z: sz } = this.spawnCenter
    for (let r = 0; r <= 48; r += 4) {
      for (let i = 0; i < Math.max(1, r * 2); i++) {
        const a = (i / Math.max(1, r * 2)) * Math.PI * 2
        const x = sx + Math.floor(Math.cos(a) * r)
        const z = sz + Math.floor(Math.sin(a) * r)
        // 下界有基岩天花板：从天花板下面往下找落脚点（v5.2）
        const top = /nether/.test(info.settings) ? this.terrain.floorBelow(x, z, 120) : this.terrain.topSolidY(x, z)
        if (top === null) {
          if (!this.terrain.getChunk(x, z)) return false // 还没加载
          continue
        }
        if (top >= info.seaLevel || /end/.test(info.settings)) {
          this.teleport(x + 0.5, top + 1, z + 0.5)
          return true
        }
      }
    }
    this.teleport(sx + 0.5, info.seaLevel + 10, sz + 0.5)
    this.player.flying = true
    return true
  }

  /** 存档里的玩家（v8）：出生时直接回到这里 */
  resume: PlayerSave | null = null
  /** 没有存档的玩家时，在这一点附近找地方出生（v8：原版存档的出生点；生成的世界是原点） */
  spawnCenter = { x: 0, z: 0 }

  /** 存档用（v8）：玩家现在的位置、朝向、是否在飞 */
  get saveState(): PlayerSave {
    const p = this.player.pos
    return { x: p.x, y: p.y, z: p.z, yaw: this.head.rotation.y, pitch: this.head.rotation.x, flying: this.player.flying }
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
    this.terrain.tick()
    // v10：挖方块、地上的物品
    if (this.mode === 'survival') this.tickMining()
    this.tickDrops()
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
      return b !== null && b !== BlockType.air && !isPureFluid(b)
    })
    // 射线打在面上的那一点（v9：放台阶、楼梯、门时要知道点在面上哪个位置）
    if (this.target) this.hit = [ox + dir.x * this.target.distance, oy + dir.y * this.target.distance, oz + dir.z * this.target.distance]
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

/** 状态的碰撞箱（v8.1）：原版导出的形状表换成 AABB，每种形状只换一次 */
const SHAPE_CACHE: (readonly AABB[])[] = []
export function collisionBoxes(s: number): readonly AABB[] {
  const id = COLLISION[s]
  let boxes = SHAPE_CACHE[id]
  if (!boxes) {
    const a = COLLISION_SHAPES[id]
    const out: AABB[] = []
    for (let i = 0; i < a.length; i += 6) out.push(new AABB(a[i], a[i + 1], a[i + 2], a[i + 3], a[i + 4], a[i + 5]))
    boxes = SHAPE_CACHE[id] = id === 0 ? EMPTY : id === 1 ? FULL_CUBE : out
  }
  return boxes
}

/** 只是水或岩浆（不是含水的方块）：准星穿过去（v9：含水的楼梯、海草也能选中了） */
const isPureFluid = (s: number) => NAME_BY_STATE[s] === 'minecraft:water' || NAME_BY_STATE[s] === 'minecraft:lava'
