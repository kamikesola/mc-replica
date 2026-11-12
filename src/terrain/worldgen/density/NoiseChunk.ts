import { lerp } from '../math/Mth'
import { createVisitor, type DensityFunction, type FunctionContext, Marker } from './DensityFunction'

/**
 * 区块级求值器，对应原版 NoiseChunk 的核心思路（简化版，按“一块矩形区域”工作）。
 *
 * 单点求值时 interpolated / flat_cache 只是透传；真正生成地形时它们改变结果：
 *
 *  - interpolated：只在“格子（cell）”的 8 个角上算一次，格子内部三线性插值。
 *    主世界 cell = 4×8×4，计算量直接少两个数量级，代价是地形有轻微的“格子感”。
 *  - flat_cache：在 4×4 的 quart 网格、y=0 上算一次，同一个 quart 内的方块直接取这个值（不插值）。
 *  - cache_2d：同一列 (x, z) 只算一次。
 *
 * 所以 F3 屏显示的值（单点）和 NoiseChunk 生成方块时用的值，在插值层面会略有差别——原版也是如此。
 */
export interface Region {
  /** 区域最小角（方块坐标），x0/z0 必须是 cellWidth 的倍数 */
  x0: number
  z0: number
  sizeX: number
  sizeZ: number
  minY: number
  height: number
  cellWidth: number
  cellHeight: number
}

const floorDiv = (a: number, b: number) => Math.floor(a / b)

export class NoiseChunk {
  readonly fn: DensityFunction
  /** 统计：插值角点、flat 缓存实际做了多少次底层求值 */
  readonly stats = { interpolatedCorners: 0, flatCacheCells: 0 }

  constructor(
    wired: DensityFunction,
    readonly region: Region
  ) {
    if (region.x0 % region.cellWidth !== 0 || region.z0 % region.cellWidth !== 0) {
      throw new Error('区域起点必须对齐到 cellWidth')
    }
    const visitor = createVisitor((fn) => {
      if (!(fn instanceof Marker)) return fn
      switch (fn.type) {
        case 'interpolated':
          return new InterpolatedGrid(fn.argument, region, this.stats)
        case 'flat_cache':
          return new FlatGrid(fn.argument, region, this.stats)
        case 'cache_2d':
          return new Cache2D(fn.argument)
        default:
          return fn.argument // cache_once / cache_all_in_cell：只影响性能
      }
    })
    this.fn = wired.mapAll(visitor)
  }

  /**
   * 逐方块求值整块区域，回调参数是 (x, y, z, density)。
   * 顺序：x → z → y（从下往上），与 cache_2d 的单列缓存配合最好。
   */
  forEach(
    cb: (x: number, y: number, z: number, density: number) => void,
    /** 只遍历区域里的一部分列（世界坐标，左闭右开）；省略则遍历整个区域 */
    columns?: { x0: number; x1: number; z0: number; z1: number }
  ): void {
    const { x0, z0, sizeX, sizeZ, minY, height } = this.region
    const xa = columns?.x0 ?? x0
    const xb = columns?.x1 ?? x0 + sizeX
    const za = columns?.z0 ?? z0
    const zb = columns?.z1 ?? z0 + sizeZ
    const ctx: FunctionContext = { blockX: 0, blockY: 0, blockZ: 0 }
    for (let x = xa; x < xb; x++) {
      for (let z = za; z < zb; z++) {
        for (let y = minY; y < minY + height; y++) {
          ctx.blockX = x
          ctx.blockY = y
          ctx.blockZ = z
          cb(x, y, z, this.fn.compute(ctx))
        }
      }
    }
  }
}

class InterpolatedGrid implements DensityFunction {
  readonly type = 'interpolated'
  private readonly values: Float64Array
  private readonly nx: number
  private readonly ny: number
  private readonly nz: number
  private readonly cx0: number
  private readonly cy0: number
  private readonly cz0: number

  constructor(
    readonly argument: DensityFunction,
    private readonly r: Region,
    stats: { interpolatedCorners: number }
  ) {
    this.cx0 = floorDiv(r.x0, r.cellWidth)
    this.cz0 = floorDiv(r.z0, r.cellWidth)
    this.cy0 = floorDiv(r.minY, r.cellHeight)
    this.nx = Math.ceil(r.sizeX / r.cellWidth) + 1
    this.nz = Math.ceil(r.sizeZ / r.cellWidth) + 1
    this.ny = Math.ceil(r.height / r.cellHeight) + 1
    this.values = new Float64Array(this.nx * this.ny * this.nz)
    const ctx: FunctionContext = { blockX: 0, blockY: 0, blockZ: 0 }
    let i = 0
    for (let ix = 0; ix < this.nx; ix++) {
      for (let iz = 0; iz < this.nz; iz++) {
        for (let iy = 0; iy < this.ny; iy++) {
          ctx.blockX = (this.cx0 + ix) * r.cellWidth
          ctx.blockY = (this.cy0 + iy) * r.cellHeight
          ctx.blockZ = (this.cz0 + iz) * r.cellWidth
          this.values[i++] = argument.compute(ctx)
        }
      }
    }
    stats.interpolatedCorners += this.values.length
  }

  private at(ix: number, iy: number, iz: number): number {
    return this.values[(ix * this.nz + iz) * this.ny + iy]
  }

  compute(ctx: FunctionContext): number {
    const { cellWidth: w, cellHeight: h } = this.r
    const cx = floorDiv(ctx.blockX, w)
    const cy = floorDiv(ctx.blockY, h)
    const cz = floorDiv(ctx.blockZ, w)
    const ix = cx - this.cx0
    const iy = cy - this.cy0
    const iz = cz - this.cz0
    if (ix < 0 || iy < 0 || iz < 0 || ix >= this.nx - 1 || iy >= this.ny - 1 || iz >= this.nz - 1) {
      return this.argument.compute(ctx) // 区域外：退化成单点
    }
    const dx = (ctx.blockX - cx * w) / w
    const dy = (ctx.blockY - cy * h) / h
    const dz = (ctx.blockZ - cz * w) / w
    // 与 NoiseChunk 相同的插值顺序：先 y，再 x，最后 z
    const n00 = lerp(dy, this.at(ix, iy, iz), this.at(ix, iy + 1, iz))
    const n10 = lerp(dy, this.at(ix + 1, iy, iz), this.at(ix + 1, iy + 1, iz))
    const n01 = lerp(dy, this.at(ix, iy, iz + 1), this.at(ix, iy + 1, iz + 1))
    const n11 = lerp(dy, this.at(ix + 1, iy, iz + 1), this.at(ix + 1, iy + 1, iz + 1))
    const n0 = lerp(dx, n00, n10)
    const n1 = lerp(dx, n01, n11)
    return lerp(dz, n0, n1)
  }

  mapAll(): DensityFunction {
    return this
  }
  children(): DensityFunction[] {
    return [this.argument]
  }
}

class FlatGrid implements DensityFunction {
  readonly type = 'flat_cache'
  private readonly values: Float64Array
  private readonly qx0: number
  private readonly qz0: number
  private readonly n: number

  constructor(
    readonly argument: DensityFunction,
    r: Region,
    stats: { flatCacheCells: number }
  ) {
    this.qx0 = r.x0 >> 2
    this.qz0 = r.z0 >> 2
    // 原版 flat cache 是正方形，边长取两个方向中较大的那个，再多一格给插值角点用
    this.n = (Math.max(r.sizeX, r.sizeZ) >> 2) + 1
    this.values = new Float64Array(this.n * this.n)
    const ctx: FunctionContext = { blockX: 0, blockY: 0, blockZ: 0 }
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        ctx.blockX = (this.qx0 + i) << 2
        ctx.blockY = 0
        ctx.blockZ = (this.qz0 + j) << 2
        this.values[i * this.n + j] = argument.compute(ctx)
      }
    }
    stats.flatCacheCells += this.values.length
  }

  compute(ctx: FunctionContext): number {
    const k = (ctx.blockX >> 2) - this.qx0
    const l = (ctx.blockZ >> 2) - this.qz0
    if (k >= 0 && l >= 0 && k < this.n && l < this.n) return this.values[k * this.n + l]
    return this.argument.compute(ctx)
  }
  mapAll(): DensityFunction {
    return this
  }
  children(): DensityFunction[] {
    return [this.argument]
  }
}

class Cache2D implements DensityFunction {
  readonly type = 'cache_2d'
  private lastX = NaN
  private lastZ = NaN
  private lastValue = 0

  constructor(readonly argument: DensityFunction) {}

  compute(ctx: FunctionContext): number {
    if (ctx.blockX !== this.lastX || ctx.blockZ !== this.lastZ) {
      this.lastX = ctx.blockX
      this.lastZ = ctx.blockZ
      this.lastValue = this.argument.compute(ctx)
    }
    return this.lastValue
  }
  mapAll(): DensityFunction {
    return this
  }
  children(): DensityFunction[] {
    return [this.argument]
  }
}
