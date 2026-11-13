import { BlockType, FLUIDS, FluidKind, type FluidState, fluidBlock, SOLID } from '../blocks'

/**
 * 流体流动：移植自原版 1.21.1 的 FlowingFluid / WaterFluid / LavaFluid / LiquidBlock。
 *
 * 原版的流体不是每帧都动，而是“计划刻”（scheduled tick）驱动的：
 *   - 某个位置的方块变了，它自己和周围 6 格里的流体都被安排在若干 tick 后更新一次
 *     （水 5 tick，主世界岩浆 30 tick）
 *   - 到时间后，这格流体重新算一遍自己应该是什么状态（getNewLiquid），然后往下、往四周流（spread）
 *   - 流出去的新流体又会安排自己的更新……一层层扩散，直到稳定
 *
 * 几条关键规则：
 *   - 流动的水每流一格量少 1（岩浆少 2），量为 0 就消失。源的量是 8，所以水最远流 7 格
 *   - 能往下流就先往下流；往四周流时只流向“最近的坑”的方向（getSlopeDistance，水看 4 格，岩浆看 2 格）
 *   - 两个水源夹着的空格，下面是实心方块或水源，就会变成新的水源（无限水）。岩浆在主世界不会
 *   - 岩浆碰到水：岩浆源变黑曜石，流动的岩浆变圆石；岩浆从上面流进水里变石头
 *
 * 这个文件只依赖一个读写方块的接口（FluidWorld），Node 里的测试可以直接用。
 */

export interface FluidWorld {
  /** 读方块；区块没加载返回 null（当作实心，不往那里流） */
  get(x: number, y: number, z: number): number | null
  /** 写方块（不触发任何更新，更新由 FluidTicker 自己安排） */
  set(x: number, y: number, z: number, b: BlockType): void
}

type Kind = FluidKind.water | FluidKind.lava

/** 各种流体的参数（主世界） */
const PROPS = {
  [FluidKind.water]: { tickDelay: 5, dropOff: 1, slopeFindDistance: 4, convertToSource: true },
  [FluidKind.lava]: { tickDelay: 30, dropOff: 2, slopeFindDistance: 2, convertToSource: false }
} as const

const EMPTY: FluidState = FLUIDS[BlockType.air]
const HORIZONTAL = [
  [0, 0, -1], // 北
  [0, 0, 1], // 南
  [-1, 0, 0], // 西
  [1, 0, 0] // 东
] as const

interface Scheduled {
  x: number
  y: number
  z: number
  kind: Kind
}

export class FluidTicker {
  /** 当前游戏时间（tick） */
  time = 0
  /** 计划刻：到期时间 → 这一刻要更新的位置（按加入顺序） */
  private queue = new Map<number, Scheduled[]>()
  /** 已经安排了的位置，避免重复安排（原版 hasScheduledTick） */
  private pending = new Set<string>()
  /** 每个 tick 最多处理多少个（原版 65536；浏览器主线程上限小一点，处理不完的顺延） */
  maxPerTick = 4000
  /** 统计：上一个 tick 处理了多少个、还有多少个在排队（F3 用） */
  lastProcessed = 0

  constructor(private readonly world: FluidWorld) {}

  get queued(): number {
    return this.pending.size
  }

  clear(): void {
    this.queue.clear()
    this.pending.clear()
  }

  private fluidAt(x: number, y: number, z: number): FluidState {
    const b = this.world.get(x, y, z)
    return b === null ? EMPTY : FLUIDS[b]
  }

  /** 实心或没加载（流体不能进去） */
  private blocked(x: number, y: number, z: number): boolean {
    const b = this.world.get(x, y, z)
    return b === null || SOLID[b] === 1
  }

  /** 安排 (x, y, z) 在 delay tick 后更新（已经安排过就不重复安排） */
  schedule(x: number, y: number, z: number, kind: Kind, delay: number = PROPS[kind].tickDelay): void {
    const key = `${x},${y},${z},${kind}`
    if (this.pending.has(key)) return
    this.pending.add(key)
    const due = this.time + Math.max(1, delay)
    let list = this.queue.get(due)
    if (!list) this.queue.set(due, (list = []))
    list.push({ x, y, z, kind })
  }

  /**
   * (x, y, z) 的方块变了：通知它自己和周围 6 格的流体（原版 LiquidBlock.onPlace / neighborChanged）。
   * 岩浆在这时检查有没有挨着水，挨着就凝固。
   */
  blockChanged(x: number, y: number, z: number): void {
    this.notify(x, y, z)
    for (const [dx, dy, dz] of [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]) this.notify(x + dx, y + dy, z + dz)
  }

  private notify(x: number, y: number, z: number): void {
    const f = this.fluidAt(x, y, z)
    if (f.kind === FluidKind.none) return
    if (f.kind === FluidKind.lava && this.solidifyLava(x, y, z, f)) return
    this.schedule(x, y, z, f.kind)
  }

  /**
   * 岩浆碰到水（上面或四周，不算下面）：源变黑曜石，流动的变圆石（原版 LiquidBlock.shouldSpreadLiquid）。
   * 返回 true 表示已经凝固。
   */
  private solidifyLava(x: number, y: number, z: number, f: FluidState): boolean {
    for (const [dx, dy, dz] of [[0, 1, 0], [0, 0, -1], [0, 0, 1], [-1, 0, 0], [1, 0, 0]]) {
      if (this.fluidAt(x + dx, y + dy, z + dz).kind === FluidKind.water) {
        this.setAndUpdate(x, y, z, f.source ? BlockType.obsidian : BlockType.cobblestone)
        return true
      }
    }
    return false
  }

  private setAndUpdate(x: number, y: number, z: number, b: BlockType): void {
    this.world.set(x, y, z, b)
    this.blockChanged(x, y, z)
  }

  /** 推进一个游戏 tick：处理所有到期的计划刻 */
  tick(): void {
    this.time++
    let processed = 0
    for (const due of [...this.queue.keys()].sort((a, b) => a - b)) {
      if (due > this.time) break
      const list = this.queue.get(due)!
      while (list.length > 0 && processed < this.maxPerTick) {
        const s = list.shift()!
        this.pending.delete(`${s.x},${s.y},${s.z},${s.kind}`)
        processed++
        this.tickFluid(s)
      }
      if (list.length === 0) this.queue.delete(due)
      if (processed >= this.maxPerTick) break
    }
    this.lastProcessed = processed
  }

  // ---------------------------------------------------------------- FlowingFluid.tick

  private tickFluid({ x, y, z, kind }: Scheduled): void {
    if (this.world.get(x, y, z) === null) return // 区块已经卸载
    let state = this.fluidAt(x, y, z)
    if (state.kind !== kind) return // 这格已经不是这种流体了
    if (!state.source) {
      const next = this.getNewLiquid(x, y, z, kind)
      const delay = this.spreadDelay(x, y, z, state, next)
      if (next.kind === FluidKind.none) {
        state = next
        this.setAndUpdate(x, y, z, BlockType.air)
      } else if (next.amount !== state.amount || next.falling !== state.falling || next.source !== state.source) {
        state = next
        this.world.set(x, y, z, fluidBlock(kind, next.amount, next.falling))
        this.schedule(x, y, z, kind, delay)
        this.blockChanged(x, y, z)
      }
    }
    this.spread(x, y, z, state)
  }

  /** 岩浆在“变高”时有 3/4 的概率慢 4 倍（原版 LavaFluid.getSpreadDelay），水固定 5 tick */
  private spreadDelay(x: number, y: number, z: number, state: FluidState, next: FluidState): number {
    const kind = state.kind as Kind
    let d: number = PROPS[kind].tickDelay
    if (kind === FluidKind.lava && state.kind !== FluidKind.none && next.kind !== FluidKind.none && !state.falling && !next.falling) {
      if (this.height(x, y, z, next) > this.height(x, y, z, state) && Math.random() < 0.75) d *= 4
    }
    return d
  }

  /** 液面高度：上面也是同种流体 → 1，否则 量 / 9 */
  private height(x: number, y: number, z: number, f: FluidState): number {
    return this.fluidAt(x, y + 1, z).kind === f.kind ? 1 : f.amount / 9
  }

  /** 这一格“应该”是什么流体状态（原版 getNewLiquid） */
  private getNewLiquid(x: number, y: number, z: number, kind: Kind): FluidState {
    if (this.blocked(x, y, z)) return EMPTY
    const p = PROPS[kind]
    let maxAmount = 0
    let sources = 0
    for (const [dx, , dz] of HORIZONTAL) {
      if (this.blocked(x + dx, y, z + dz)) continue
      const f = this.fluidAt(x + dx, y, z + dz)
      if (f.kind === kind) {
        if (f.source) sources++
        maxAmount = Math.max(maxAmount, f.amount)
      }
    }
    // 无限水：两个以上的水源相邻，下面是实心方块或水源 → 变成水源
    if (p.convertToSource && sources >= 2) {
      const below = this.world.get(x, y - 1, z)
      const fb = this.fluidAt(x, y - 1, z)
      if ((below !== null && SOLID[below]) || (fb.kind === kind && fb.source)) return FLUIDS[fluidBlock(kind, 8)]
    }
    // 上面有同种流体 → 下落的流体（满格）
    if (this.fluidAt(x, y + 1, z).kind === kind && !this.blocked(x, y + 1, z)) return FLUIDS[fluidBlock(kind, 8, true)]
    const k = maxAmount - p.dropOff
    return k <= 0 ? EMPTY : FLUIDS[fluidBlock(kind, k)]
  }

  // ---------------------------------------------------------------- 往外流

  private spread(x: number, y: number, z: number, state: FluidState): void {
    if (state.kind === FluidKind.none) return
    const kind = state.kind as Kind
    const below = this.getNewLiquid(x, y - 1, z, kind)
    if (this.canSpreadTo(x, y - 1, z, 'down', below.kind)) {
      // 能往下流就往下流；周围有 3 个以上的源（比如在一大片水的底下挖洞）时也往四周流
      this.spreadTo(x, y - 1, z, 'down', below)
      if (this.sourceNeighborCount(x, y, z, kind) >= 3) this.spreadToSides(x, y, z, state)
    } else if (state.source || !this.isHole(x, y, z)) {
      this.spreadToSides(x, y, z, state)
    }
  }

  private spreadToSides(x: number, y: number, z: number, state: FluidState): void {
    const kind = state.kind as Kind
    let i = state.amount - PROPS[kind].dropOff
    if (state.falling) i = 7
    if (i <= 0) return
    for (const [dx, dz, next] of this.getSpread(x, y, z, kind)) {
      if (this.canSpreadTo(x + dx, y, z + dz, 'side', next.kind)) this.spreadTo(x + dx, y, z + dz, 'side', next)
    }
  }

  /**
   * 往哪几个方向流（原版 getSpread）：对每个能流过去的方向，算出离最近的“坑”有多远，
   * 只保留最近的那几个方向。附近没有坑（都是 1000）时四个方向都流。
   */
  private getSpread(x: number, y: number, z: number, kind: Kind): [number, number, FluidState][] {
    let best = 1000
    let out: [number, number, FluidState][] = []
    for (const [dx, , dz] of HORIZONTAL) {
      const nx = x + dx
      const nz = z + dz
      const next = this.getNewLiquid(nx, y, nz, kind)
      if (!this.canPassThrough(nx, y, nz, kind)) continue
      const d = this.isHole(nx, y, nz) ? 0 : this.slopeDistance(nx, y, nz, 1, -dx, -dz, kind)
      if (d < best) out = []
      if (d <= best) {
        out.push([dx, dz, next])
        best = d
      }
    }
    return out
  }

  /** 从 (x, y, z) 出发（不往 from 方向走），走几格能遇到坑；找不到返回 1000 */
  private slopeDistance(x: number, y: number, z: number, depth: number, fromX: number, fromZ: number, kind: Kind): number {
    let best = 1000
    for (const [dx, , dz] of HORIZONTAL) {
      if (dx === fromX && dz === fromZ) continue
      const nx = x + dx
      const nz = z + dz
      if (!this.canPassThrough(nx, y, nz, kind)) continue
      if (this.isHole(nx, y, nz)) return depth
      if (depth < PROPS[kind].slopeFindDistance) best = Math.min(best, this.slopeDistance(nx, y, nz, depth + 1, -dx, -dz, kind))
    }
    return best
  }

  /** 下面能流下去（下面不是实心）——原版叫 isWaterHole */
  private isHole(x: number, y: number, z: number): boolean {
    return !this.blocked(x, y - 1, z)
  }

  /** 能流过这一格：不是同种流体的源，且不是实心 */
  private canPassThrough(x: number, y: number, z: number, kind: Kind): boolean {
    if (this.blocked(x, y, z)) return false
    const f = this.fluidAt(x, y, z)
    return !(f.kind === kind && f.source)
  }

  private sourceNeighborCount(x: number, y: number, z: number, kind: Kind): number {
    let n = 0
    for (const [dx, , dz] of HORIZONTAL) {
      const f = this.fluidAt(x + dx, y, z + dz)
      if (f.kind === kind && f.source) n++
    }
    return n
  }

  /**
   * 能不能把流体放进 (x, y, z)（原版 canSpreadTo + canBeReplacedWith）：
   *   空的 → 能；水 → 只有岩浆从上面来时能；岩浆 → 只有水来、并且岩浆够高（≥ 4/9）时能；实心 → 不能
   */
  private canSpreadTo(x: number, y: number, z: number, dir: 'down' | 'side', incoming: FluidKind): boolean {
    if (this.blocked(x, y, z) || incoming === FluidKind.none) return false
    const f = this.fluidAt(x, y, z)
    if (f.kind === FluidKind.none) return true
    if (f.kind === FluidKind.water) return dir === 'down' && incoming === FluidKind.lava
    return incoming === FluidKind.water && this.height(x, y, z, f) >= 0.44444445
  }

  private spreadTo(x: number, y: number, z: number, dir: 'down' | 'side', state: FluidState): void {
    // 岩浆从上面流进水里：变成石头（原版 LavaFluid.spreadTo）
    if (dir === 'down' && state.kind === FluidKind.lava && this.fluidAt(x, y, z).kind === FluidKind.water) {
      this.setAndUpdate(x, y, z, BlockType.stone)
      return
    }
    this.setAndUpdate(x, y, z, fluidBlock(state.kind as Kind, state.amount, state.falling))
  }
}
