import { BLOCK_BY_NAME, BlockType, COLLISION, NAME_BY_STATE, propOf, STURDY, withState } from './blocks'
import { DIR_NAMES, DIR_VEC, Dir, inTag, neighborUpdates, opposite, type PlaceWorld } from './placement'

/**
 * 红石（v9.1）：移植自原版 1.21.4 的 RedStoneWireBlock、RedstoneTorchBlock、LeverBlock、ButtonBlock、DiodeBlock（中继器）、
 * RedstoneLampBlock、DoorBlock / TrapDoorBlock / FenceGateBlock 的红石部分、PistonBaseBlock，以及 Level 里的信号查询。
 *
 * 信号有两种（原版的叫法是 signal 和 direct signal，玩家习惯叫“弱充能”和“强充能”）：
 *   getSignal(方块, 方向)        方块往这个方向“发”多少信号（0..15）。拉杆、红石块对 6 个方向都发；
 *                                 火把不往它插着的那个方块发；中继器只往前发；红石线只往它连着的方向和下面发
 *   getDirectSignal(方块, 方向)  能“穿过”实心方块的信号：拉杆给它贴着的方块，火把给头顶的方块，红石线给脚下和指着的方块
 * 实心方块（导体）自己不发信号，但被强充能时，对所有方向发出它收到的最大强充能（原版 Level.getSignal）。
 *
 * 方向的约定和原版一样：getSignal(邻居, d) 里 d 是“从收信号的方块指向邻居”的方向。
 *
 * 更新的方式也照原版：一格变了，通知它周围的方块（neighborChanged）；红石线、灯、门这些马上重新算，
 * 火把、中继器、灯熄灭、按钮弹起要等几个 tick（计划刻）。原版通知的范围是“这一格的邻居，以及邻居的邻居”，
 * 这里一律通知曼哈顿距离 2 以内的格子，多通知的那些重新算一遍结果不变。
 */

export interface RedstoneWorld extends PlaceWorld {
  /** 写一格（会重建网格、更新光照、记改动） */
  set(x: number, y: number, z: number, s: number): void
}

const nameOf = (s: number) => (NAME_BY_STATE[s] ?? '').slice(10)
const is = (s: number, re: RegExp) => re.test(nameOf(s))
const prop = (s: number, k: string) => propOf(s, k)
const on = (s: number, k: string) => propOf(s, k) === 'true'
const dirByName = (n: string | undefined): Dir => DIR_NAMES.indexOf(n as (typeof DIR_NAMES)[number]) as Dir
const key = (x: number, y: number, z: number) => `${x},${y},${z}`

const isWire = (s: number) => is(s, /^redstone_wire$/)
const isTorch = (s: number) => is(s, /^redstone_(wall_)?torch$/)
const isRepeater = (s: number) => is(s, /^repeater$/)
const isButton = (s: number) => is(s, /_button$/)
const isPiston = (s: number) => is(s, /^(sticky_)?piston$/)

/**
 * 原版 isRedstoneConductor：完整的、不透明的方块能“导”强充能。
 * 原版默认是“碰撞箱是完整方块”，玻璃、树叶、红石块、侦测器、活塞等改成了不导
 */
export function isConductor(s: number): boolean {
  return COLLISION[s] === 1 && !is(s, /glass|leaves|^redstone_block$|observer|piston|^ice$|barrier|spawner|slime_block|honey_block|soul_sand|mud$/)
}

/** 原版 isSignalSource：会发信号的方块（红石线连向它们） */
export function isSignalSource(s: number): boolean {
  return isWire(s) || isTorch(s) || isRepeater(s) || isButton(s) || is(s, /^(lever|redstone_block|comparator|observer|target|daylight_detector|.*pressure_plate|tripwire_hook|trapped_chest|lectern|sculk_sensor|calibrated_sculk_sensor)$/)
}

// ---------------------------------------------------------------- 信号

/** 拉杆、按钮连着的方向（原版 FaceAttachedHorizontalDirectionalBlock.getConnectedDirection 的反方向 = 从它指向贴着的方块……这里直接按原版的写法） */
function attachedDir(s: number): Dir {
  const face = prop(s, 'face')
  return face === 'floor' ? Dir.up : face === 'ceiling' ? Dir.down : dirByName(prop(s, 'facing'))
}

/**
 * 红石线算自己的强度时，别的红石线不给它“强充能”（原版的 shouldSignal = false），
 * 否则两根线会通过脚下的方块互相充能、永远不灭
 */
let wiresGivePower = true

/** 原版 BlockState.getSignal：方块 s（在 x,y,z）往方向 d 的反方向发多少信号（d 从收信号的一方指向 s） */
function getSignal(w: PlaceWorld, x: number, y: number, z: number, s: number, d: Dir): number {
  if (s === BlockType.air) return 0
  if (isWire(s)) {
    if (!wiresGivePower || d === Dir.down) return 0
    const power = Number(prop(s, 'power'))
    if (power === 0) return 0
    if (d === Dir.up) return power
    const conn = wireConnections(w, x, y, z, s)
    return conn[opposite(d)] !== 'none' ? power : 0
  }
  const name = nameOf(s)
  if (name === 'redstone_block') return 15
  if (name === 'lever' || isButton(s)) return on(s, 'powered') ? 15 : 0
  if (name === 'redstone_torch') return on(s, 'lit') && d !== Dir.up ? 15 : 0
  if (name === 'redstone_wall_torch') return on(s, 'lit') && dirByName(prop(s, 'facing')) !== d ? 15 : 0
  if (isRepeater(s)) return on(s, 'powered') && dirByName(prop(s, 'facing')) === d ? 15 : 0
  return 0
}

/** 原版 BlockState.getDirectSignal：强充能 */
function getDirectSignal(w: PlaceWorld, x: number, y: number, z: number, s: number, d: Dir): number {
  if (s === BlockType.air) return 0
  if (isWire(s)) return wiresGivePower ? getSignal(w, x, y, z, s, d) : 0
  const name = nameOf(s)
  if (name === 'lever' || isButton(s)) return on(s, 'powered') && attachedDir(s) === d ? 15 : 0
  if (isTorch(s)) return d === Dir.down ? getSignal(w, x, y, z, s, d) : 0
  if (isRepeater(s)) return getSignal(w, x, y, z, s, d)
  return 0
}

/** 原版 Level.getDirectSignalTo：(x,y,z) 收到的最大强充能 */
function directSignalTo(w: PlaceWorld, x: number, y: number, z: number): number {
  let m = 0
  for (let d = 0; d < 6 && m < 15; d++) {
    const [dx, dy, dz] = DIR_VEC[d]
    const n = w.get(x + dx, y + dy, z + dz)
    if (n !== null) m = Math.max(m, getDirectSignal(w, x + dx, y + dy, z + dz, n, d as Dir))
  }
  return m
}

/** 原版 Level.getSignal(pos, d)：(x,y,z) 这一格往 d 的反方向发出的信号；实心方块转发它收到的强充能 */
export function signalAt(w: PlaceWorld, x: number, y: number, z: number, d: Dir): number {
  const s = w.get(x, y, z)
  if (s === null) return 0
  const i = getSignal(w, x, y, z, s, d)
  return isConductor(s) ? Math.max(i, directSignalTo(w, x, y, z)) : i
}

/** 原版 Level.getBestNeighborSignal：周围 6 格给 (x,y,z) 的最大信号 */
export function bestNeighborSignal(w: PlaceWorld, x: number, y: number, z: number, except?: Dir): number {
  let m = 0
  for (let d = 0; d < 6 && m < 15; d++) {
    if (d === except) continue
    const [dx, dy, dz] = DIR_VEC[d]
    m = Math.max(m, signalAt(w, x + dx, y + dy, z + dz, d as Dir))
  }
  return m
}

export const hasNeighborSignal = (w: PlaceWorld, x: number, y: number, z: number, except?: Dir) => bestNeighborSignal(w, x, y, z, except) > 0

// ---------------------------------------------------------------- 红石线

/** 原版 RedStoneWireBlock.shouldConnectTo：红石线连向哪些方块 */
function connectsTo(s: number, d: Dir | null): boolean {
  if (isWire(s)) return true
  if (isRepeater(s)) {
    const f = dirByName(prop(s, 'facing'))
    return d !== null && (f === d || f === opposite(d))
  }
  if (is(s, /^observer$/)) return d === dirByName(prop(s, 'facing'))
  return isSignalSource(s) && d !== null
}

/**
 * 原版 RedStoneWireBlock.getConnectionState：红石线 4 个方向是 none / side / up（爬上旁边方块的侧面）。
 * 只连了一边时延长成一条直线；一边都没连时是十字
 */
export function wireConnections(w: PlaceWorld, x: number, y: number, z: number, _s?: number): Record<number, 'none' | 'side' | 'up'> {
  const above = w.get(x, y + 1, z) ?? BlockType.air
  const aboveOpen = !isConductor(above)
  const out: Record<number, 'none' | 'side' | 'up'> = {}
  for (const d of [Dir.north, Dir.east, Dir.south, Dir.west]) {
    const [dx, , dz] = DIR_VEC[d]
    const n = w.get(x + dx, y, z + dz) ?? BlockType.air
    let c: 'none' | 'side' | 'up' = 'side'
    // 原版 getConnectingSide：上面不是导体时，可以沿旁边方块的侧面爬上去 ——
    // 旁边方块的顶面能放红石线（顶面坚固，或者是漏斗、活板门），并且它上面就是红石线
    const up = w.get(x + dx, y + 1, z + dz) ?? BlockType.air
    if (aboveOpen && ((STURDY[n] >> Dir.up) & 1 || is(n, /hopper|trapdoor/)) && isWire(up)) c = (STURDY[n] >> opposite(d)) & 1 ? 'up' : 'side'
    else {
      const below = w.get(x + dx, y - 1, z + dz) ?? BlockType.air
      if (!connectsTo(n, d) && (isConductor(n) || !isWire(below))) c = 'none'
    }
    out[d] = c
  }
  const ns = out[Dir.north] !== 'none' || out[Dir.south] !== 'none'
  const ew = out[Dir.east] !== 'none' || out[Dir.west] !== 'none'
  if (!ew) {
    if (out[Dir.north] === 'none') out[Dir.north] = 'side'
    if (out[Dir.south] === 'none') out[Dir.south] = 'side'
  }
  if (!ns) {
    if (out[Dir.east] === 'none') out[Dir.east] = 'side'
    if (out[Dir.west] === 'none') out[Dir.west] = 'side'
  }
  return out
}

/** 红石线的形状（给 placement.updateShape 用） */
export function wireShape(w: PlaceWorld, x: number, y: number, z: number, s: number): number {
  const c = wireConnections(w, x, y, z, s)
  return withState(s, { north: c[Dir.north], east: c[Dir.east], south: c[Dir.south], west: c[Dir.west] })
}

/** 原版 RedStoneWireBlock.calculateTargetStrength：周围的信号（不算红石线），和相邻红石线（含上下台阶）减 1 */
function wireStrength(w: PlaceWorld, x: number, y: number, z: number): number {
  wiresGivePower = false
  const i = bestNeighborSignal(w, x, y, z)
  wiresGivePower = true
  if (i >= 15) return i
  let j = 0
  const wirePower = (s: number | null) => (s !== null && isWire(s) ? Number(prop(s, 'power')) : 0)
  const aboveConductor = isConductor(w.get(x, y + 1, z) ?? BlockType.air)
  for (const d of [Dir.north, Dir.east, Dir.south, Dir.west]) {
    const [dx, , dz] = DIR_VEC[d]
    const n = w.get(x + dx, y, z + dz)
    j = Math.max(j, wirePower(n))
    if (n !== null && isConductor(n)) {
      if (!aboveConductor) j = Math.max(j, wirePower(w.get(x + dx, y + 1, z + dz)))
    } else j = Math.max(j, wirePower(w.get(x + dx, y - 1, z + dz)))
  }
  return Math.max(i, j - 1)
}

// ---------------------------------------------------------------- 更新

/** 按钮按下去多久弹起（原版：石头 20 tick，木头 30 tick） */
const buttonTicks = (s: number) => (is(s, /^(stone|polished_blackstone)_button$/) ? 20 : 30)

export class Redstone {
  /** 当前游戏时间（tick） */
  time = 0
  /** 计划刻：位置 → 到期时间 */
  private scheduled = new Map<string, number>()
  /** 等着重新算的位置（neighborChanged） */
  private queue: [number, number, number][] = []
  private queued = new Set<string>()
  /** 一次 process 最多处理多少个（防止有环路时卡死） */
  maxPerProcess = 20000
  /** 上一次 process 处理了多少（F3 用） */
  lastProcessed = 0

  constructor(private readonly w: RedstoneWorld) {}

  clear(): void {
    this.scheduled.clear()
    this.queue.length = 0
    this.queued.clear()
  }

  get pending(): number {
    return this.scheduled.size
  }

  schedule(x: number, y: number, z: number, delay: number): void {
    const k = key(x, y, z)
    if (!this.scheduled.has(k)) this.scheduled.set(k, this.time + delay)
  }

  /** (x,y,z) 变了：通知曼哈顿距离 2 以内的格子 */
  changed(x: number, y: number, z: number): void {
    for (let dy = -2; dy <= 2; dy++)
      for (let dz = -2; dz <= 2; dz++)
        for (let dx = -2; dx <= 2; dx++) {
          if (Math.abs(dx) + Math.abs(dy) + Math.abs(dz) > 2) continue
          const k = key(x + dx, y + dy, z + dz)
          if (this.queued.has(k)) continue
          this.queued.add(k)
          this.queue.push([x + dx, y + dy, z + dz])
        }
  }

  /** 写一格，形状更新（门的另一半……），再通知周围 */
  private set(x: number, y: number, z: number, s: number): void {
    this.w.set(x, y, z, s)
    this.changed(x, y, z)
    neighborUpdates(this.w, (nx, ny, nz, ns) => {
      this.w.set(nx, ny, nz, ns)
      this.changed(nx, ny, nz)
    }, x, y, z)
  }

  /** 处理所有等着的 neighborChanged */
  process(): void {
    let n = 0
    while (this.queue.length && n < this.maxPerProcess) {
      const [x, y, z] = this.queue.shift()!
      this.queued.delete(key(x, y, z))
      n++
      const s = this.w.get(x, y, z)
      if (s === null || s === BlockType.air) continue
      this.neighborChanged(x, y, z, s)
    }
    this.lastProcessed = n
    // 剩下的下次再算（不丢）
  }

  /** 一个游戏 tick：到期的计划刻 */
  tick(): void {
    this.time++
    for (const [k, t] of this.scheduled) {
      if (t > this.time) continue
      this.scheduled.delete(k)
      const [x, y, z] = k.split(',').map(Number)
      const s = this.w.get(x, y, z)
      if (s !== null) this.scheduledTick(x, y, z, s)
    }
    this.process()
  }

  /** 原版 neighborChanged：周围变了，这一格要不要变 */
  private neighborChanged(x: number, y: number, z: number, s: number): void {
    const name = nameOf(s)
    if (isWire(s)) {
      // 强度和连接一起更新（连接也看斜上 / 斜下的红石线，6 个邻居的形状更新管不到）
      const next = withState(wireShape(this.w, x, y, z, s), { power: wireStrength(this.w, x, y, z) })
      if (next !== s) this.set(x, y, z, next)
    } else if (isTorch(s)) {
      if (on(s, 'lit') === this.torchPowered(x, y, z, s)) this.schedule(x, y, z, 2)
    } else if (isRepeater(s)) {
      if (on(s, 'powered') !== this.repeaterInput(x, y, z, s) > 0) this.schedule(x, y, z, Number(prop(s, 'delay')) * 2)
    } else if (name === 'redstone_lamp') {
      const powered = hasNeighborSignal(this.w, x, y, z)
      if (on(s, 'lit') && !powered) this.schedule(x, y, z, 4)
      else if (!on(s, 'lit') && powered) this.set(x, y, z, withState(s, { lit: true }))
    } else if (isButton(s)) {
      if (on(s, 'powered')) this.schedule(x, y, z, buttonTicks(s))
    } else if (inTag('doors', s)) {
      // 原版 DoorBlock.neighborChanged：上下两半，任何一半旁边有信号就开
      const otherY = prop(s, 'half') === 'lower' ? y + 1 : y - 1
      const powered = hasNeighborSignal(this.w, x, y, z) || hasNeighborSignal(this.w, x, otherY, z)
      if (powered !== on(s, 'powered')) this.set(x, y, z, withState(s, { powered, open: powered }))
    } else if (inTag('trapdoors', s) || inTag('fence_gates', s)) {
      const powered = hasNeighborSignal(this.w, x, y, z)
      if (powered !== on(s, 'powered')) this.set(x, y, z, withState(s, { powered, open: powered }))
    } else if (isPiston(s)) {
      this.checkPiston(x, y, z, s)
    }
  }

  /** 原版 scheduledTick */
  private scheduledTick(x: number, y: number, z: number, s: number): void {
    const name = nameOf(s)
    if (isTorch(s)) {
      const powered = this.torchPowered(x, y, z, s)
      if (on(s, 'lit') === powered) this.set(x, y, z, withState(s, { lit: !powered }))
    } else if (isRepeater(s)) {
      const want = this.repeaterInput(x, y, z, s) > 0
      if (on(s, 'powered') !== want) this.set(x, y, z, withState(s, { powered: want }))
    } else if (name === 'redstone_lamp') {
      if (on(s, 'lit') && !hasNeighborSignal(this.w, x, y, z)) this.set(x, y, z, withState(s, { lit: false }))
    } else if (isButton(s)) {
      if (on(s, 'powered')) this.set(x, y, z, withState(s, { powered: false }))
    }
  }

  /** 火把插着的方块有没有信号（原版 RedstoneTorchBlock.hasNeighborSignal） */
  private torchPowered(x: number, y: number, z: number, s: number): boolean {
    const d = nameOf(s) === 'redstone_torch' ? Dir.down : opposite(dirByName(prop(s, 'facing')))
    const [dx, dy, dz] = DIR_VEC[d]
    return signalAt(this.w, x + dx, y + dy, z + dz, d) > 0
  }

  /** 中继器的输入：facing 指向输入的那一格（原版 DiodeBlock.getInputSignal，红石线直接取强度） */
  private repeaterInput(x: number, y: number, z: number, s: number): number {
    const d = dirByName(prop(s, 'facing'))
    const [dx, , dz] = DIR_VEC[d]
    const n = this.w.get(x + dx, y, z + dz)
    if (n !== null && isWire(n)) return Number(prop(n, 'power'))
    return signalAt(this.w, x + dx, y, z + dz, d)
  }

  // ---------------------------------------------------------------- 活塞

  /** 原版 PistonBaseBlock.checkIfExtend：除了正面，周围有信号就推；上面那格周围有信号也推（“半连接”） */
  private checkPiston(x: number, y: number, z: number, s: number): void {
    const facing = dirByName(prop(s, 'facing'))
    let powered = hasNeighborSignal(this.w, x, y, z, facing)
    if (!powered) {
      for (let d = 0; d < 6 && !powered; d++) {
        if (d === Dir.down) continue
        const [dx, dy, dz] = DIR_VEC[d]
        if (signalAt(this.w, x + dx, y + 1 + dy, z + dz, d as Dir) > 0) powered = true
      }
    }
    const extended = on(s, 'extended')
    if (powered && !extended) this.extend(x, y, z, s, facing)
    else if (!powered && extended) this.retract(x, y, z, s, facing)
  }

  /** 推得动吗：0 推得动，1 推不动，2 会被推碎（花草、火把……） */
  private pushReaction(s: number): 0 | 1 | 2 {
    if (s === BlockType.air) return 2
    if (is(s, /^(obsidian|crying_obsidian|bedrock|end_portal_frame|reinforced_deepslate|respawn_anchor|piston_head|moving_piston)$/) || (isPiston(s) && on(s, 'extended'))) return 1
    // 有方块实体的方块原版推不动
    if (is(s, /chest$|furnace|smoker|barrel|hopper|dispenser|dropper|beacon|spawner|sign$|banner$|jukebox|lectern|brewing_stand|enchanting_table|conduit|bell|campfire|beehive|bee_nest|command_block|structure_block|jigsaw|daylight_detector|comparator|crafter|vault|decorated_pot|chiseled_bookshelf|end_gateway|end_portal$/)) return 1
    if (inTag('replaceable', s) || COLLISION[s] === 0 || inTag('beds', s) || inTag('doors', s)) return 2
    return 0
  }

  /** 推：前面一排最多 12 个方块往前挪一格，推碎最前面那个会碎的，前面放活塞头 */
  private extend(x: number, y: number, z: number, s: number, facing: Dir): void {
    const [dx, dy, dz] = DIR_VEC[facing]
    const line: [number, number, number, number][] = []
    let [px, py, pz] = [x + dx, y + dy, z + dz]
    for (;;) {
      const b = this.w.get(px, py, pz)
      if (b === null) return
      const r = this.pushReaction(b)
      if (r === 1) return
      if (r === 2) {
        if (b !== BlockType.air) this.w.set(px, py, pz, BlockType.air) // 推碎（原版会掉落物品）
        break
      }
      line.push([px, py, pz, b])
      if (line.length > 12) return
      px += dx
      py += dy
      pz += dz
    }
    for (let i = line.length - 1; i >= 0; i--) {
      const [bx, by, bz, b] = line[i]
      this.w.set(bx + dx, by + dy, bz + dz, b)
    }
    const sticky = nameOf(s) === 'sticky_piston'
    this.w.set(x, y, z, withState(s, { extended: true }))
    this.w.set(x + dx, y + dy, z + dz, withState(BLOCK_OF_NAME('piston_head'), { facing: DIR_NAMES[facing], type: sticky ? 'sticky' : 'normal', short: false }))
    for (const [bx, by, bz] of [[x, y, z], ...line.map(([a, b, c]) => [a + dx, b + dy, c + dz]), [px, py, pz]]) this.changed(bx, by, bz)
  }

  /** 收：去掉活塞头；粘性活塞把头前面那个方块拉回来 */
  private retract(x: number, y: number, z: number, s: number, facing: Dir): void {
    const [dx, dy, dz] = DIR_VEC[facing]
    const head = this.w.get(x + dx, y + dy, z + dz)
    this.w.set(x, y, z, withState(s, { extended: false }))
    if (head !== null && nameOf(head) === 'piston_head') this.w.set(x + dx, y + dy, z + dz, BlockType.air)
    if (nameOf(s) === 'sticky_piston') {
      const far = this.w.get(x + 2 * dx, y + 2 * dy, z + 2 * dz)
      if (far !== null && far !== BlockType.air && this.pushReaction(far) === 0) {
        this.w.set(x + dx, y + dy, z + dz, far)
        this.w.set(x + 2 * dx, y + 2 * dy, z + 2 * dz, BlockType.air)
      }
    }
    for (const k of [0, 1, 2]) this.changed(x + k * dx, y + k * dy, z + k * dz)
  }
}

const BLOCK_OF_NAME = (n: string) => BLOCK_BY_NAME[`minecraft:${n}`]

/** 右键：拉杆扳动、按钮按下、中继器调延迟（1→2→3→4→1）。不是这些返回 null */
export function useRedstone(s: number): number | null {
  if (is(s, /^lever$/)) return withState(s, { powered: !on(s, 'powered') })
  if (isButton(s)) return on(s, 'powered') ? s : withState(s, { powered: true })
  if (isRepeater(s)) return withState(s, { delay: (Number(prop(s, 'delay')) % 4) + 1 })
  return null
}
