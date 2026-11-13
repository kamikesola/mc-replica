import { createVisitor, type DensityFunction, type FunctionContext, Marker } from '../density/DensityFunction'
import { clamp, clampedMap, inverseLerp, lerp } from '../math/Mth'
import type { PositionalRandomFactory } from '../random/RandomSource'

/**
 * 含水层（Aquifer）：决定地下的空腔里是空气、水还是岩浆。逐行移植自原版 1.21.1 的
 * Aquifer.NoiseBasedAquifer 和 NoiseBasedChunkGenerator.createFluidPicker。
 *
 * 为什么需要它：密度函数只告诉我们“哪里是石头，哪里是空的”。v0~v2 的做法是“每一列地表以上、海平面以下填水”，
 * 结果洞穴里永远是干的，海底下面的洞也是干的。原版把地下分成很多块“含水层”，每块有自己的水位：
 *
 *   1. 把世界切成 16×12×16 的格子，每个格子里随机放一个“中心点”
 *   2. 每个中心点算出一个水位和流体种类（FluidStatus）：
 *        - 离地表近、地表那里有水（海、湖）→ 和地表连通，水位 = 海平面
 *        - 否则看 floodedness 噪声：淹没 / 随机水位 / 干的（水位在世界最底下）
 *        - 水位很低（≤ -10）时，看 lava 噪声决定是不是岩浆
 *   3. 一个空的方块，找离它最近的几个中心点，主要听最近的那个的水位：
 *      方块 y < 水位 → 流体，否则空气
 *   4. 两个含水层水位不同时，交界处要有一道“墙”挡住，不然高处的水会悬在空中。
 *      墙的厚度由 barrier 噪声和两边的水位差（“压力”）决定 —— 密度 + 压力 > 0 的地方变成石头
 *
 * 另外 y < -54 的地方是全局的岩浆层（原版深层洞穴底部的岩浆湖就是这么来的）。
 */

export const enum Fluid {
  air = 0,
  water = 1,
  lava = 2
}

/** 一个含水层的状态：水位（这个 y 以下是流体）+ 流体种类。对应原版 Aquifer.FluidStatus */
export class FluidStatus {
  constructor(
    readonly fluidLevel: number,
    readonly fluidType: Fluid
  ) {}

  at(y: number): Fluid {
    return y < this.fluidLevel ? this.fluidType : Fluid.air
  }
}

/** 全局流体：y < min(-54, 海平面) 是岩浆，其余是“海平面以下为默认流体”。对应 createFluidPicker */
export type FluidPicker = (x: number, y: number, z: number) => FluidStatus

export function createFluidPicker(seaLevel: number, defaultFluid: Fluid): FluidPicker {
  const lava = new FluidStatus(-54, Fluid.lava)
  const sea = new FluidStatus(seaLevel, defaultFluid)
  const low = Math.min(-54, seaLevel)
  return (_x, y) => (y < low ? lava : sea)
}

export interface Aquifer {
  /**
   * 一个方块是什么：返回流体种类（Fluid.air 表示空气），返回 null 表示“这里是石头”。
   * density 是这个方块的 final_density（> 0 本来就是石头）。
   */
  computeSubstance(x: number, y: number, z: number, density: number): Fluid | null
  /** 上一次 computeSubstance 之后，这个流体方块要不要在区块加载后马上更新一次（让水流进旁边的洞里） */
  shouldScheduleFluidUpdate: boolean
}

/** 关掉含水层时（下界、末地等）：直接用全局流体 */
export function disabledAquifer(picker: FluidPicker): Aquifer {
  return {
    shouldScheduleFluidUpdate: false,
    computeSubstance: (x, y, z, density) => (density > 0 ? null : picker(x, y, z).at(y))
  }
}

/** 含水层要用到的 6 个 router 字段，加上计算“预估地表高度”用的 initial_density_without_jaggedness */
export interface AquiferNoises {
  barrier: (ctx: FunctionContext) => number
  floodedness: (ctx: FunctionContext) => number
  spread: (ctx: FunctionContext) => number
  lava: (ctx: FunctionContext) => number
  /** 这两个要按“区块内的 flat_cache”规则求值，见 chunkLocal() */
  erosion: (ctx: FunctionContext) => number
  depth: (ctx: FunctionContext) => number
  /** 预估地表高度：给定 (x, z) 返回高度，调用方负责缓存（原版 NoiseChunk.preliminarySurfaceLevel） */
  preliminarySurfaceLevel: (x: number, z: number) => number
}

// 原版常数
const X_SPACING = 16
const Y_SPACING = 12
const Z_SPACING = 16
const X_RANGE = 10
const Y_RANGE = 9
const Z_RANGE = 10
/** DimensionType.WAY_BELOW_MIN_Y = MIN_Y << 4 */
const WAY_BELOW_MIN_Y = -2032 << 4
/** 周围 13 个区块（以区块为单位的偏移），用来看“地表那里有没有水” */
const SURFACE_SAMPLING_OFFSETS_IN_CHUNKS = [
  [0, 0],
  [-2, -1],
  [-1, -1],
  [0, -1],
  [1, -1],
  [-3, 0],
  [-2, 0],
  [-1, 0],
  [1, 0],
  [-2, 1],
  [-1, 1],
  [0, 1],
  [1, 1]
]

/** 两个距离平方的“相似度”：1 - |差| / 25。越接近 1 说明方块正好在两个中心点的中间 */
const similarity = (a: number, b: number) => 1.0 - Math.abs(b - a) / 25.0
const FLOWING_UPDATE_SIMILARITY = similarity(10 * 10, 12 * 12)

const floorDiv = (a: number, b: number) => Math.floor(a / b)
/** Mth.map */
const map = (v: number, a: number, b: number, c: number, d: number) => lerp(inverseLerp(v, a, b), c, d)
/** Mth.quantize */
const quantize = (v: number, q: number) => Math.floor(v / q) * q

/** 含水层要覆盖的方块范围（世界坐标，含两端），用来预先分配格子缓存 */
export interface AquiferBounds {
  minX: number
  maxX: number
  minY: number
  maxY: number
  minZ: number
  maxZ: number
}

export class NoiseBasedAquifer implements Aquifer {
  shouldScheduleFluidUpdate = false
  // 格子缓存（原版 aquiferLocationCache / aquiferCache）：按格子坐标排成一维数组
  private readonly minGX: number
  private readonly minGY: number
  private readonly minGZ: number
  private readonly sizeGX: number
  private readonly sizeGY: number
  private readonly sizeGZ: number
  /** 每个格子的中心点坐标，locY 为 NaN 表示还没算 */
  private readonly locX: Int32Array
  private readonly locY: Float64Array
  private readonly locZ: Int32Array
  private readonly statuses: (FluidStatus | undefined)[]

  constructor(
    private readonly noises: AquiferNoises,
    private readonly random: PositionalRandomFactory,
    private readonly picker: FluidPicker,
    bounds: AquiferBounds
  ) {
    // 和原版一样多留一圈：computeSubstance 会看 floorDiv(x - 5, 16) 和它 +1 的格子，y 方向 ±1
    this.minGX = floorDiv(bounds.minX - 5, 16)
    this.minGY = floorDiv(bounds.minY + 1, 12) - 1
    this.minGZ = floorDiv(bounds.minZ - 5, 16)
    this.sizeGX = floorDiv(bounds.maxX - 5, 16) + 2 - this.minGX
    this.sizeGY = floorDiv(bounds.maxY + 1, 12) + 2 - this.minGY
    this.sizeGZ = floorDiv(bounds.maxZ - 5, 16) + 2 - this.minGZ
    const n = this.sizeGX * this.sizeGY * this.sizeGZ
    this.locX = new Int32Array(n)
    this.locY = new Float64Array(n).fill(NaN)
    this.locZ = new Int32Array(n)
    this.statuses = new Array(n)
  }

  private index(gx: number, gy: number, gz: number): number {
    const x = gx - this.minGX
    const y = gy - this.minGY
    const z = gz - this.minGZ
    if (x < 0 || y < 0 || z < 0 || x >= this.sizeGX || y >= this.sizeGY || z >= this.sizeGZ) {
      throw new RangeError(`含水层格子 (${gx}, ${gy}, ${gz}) 超出了预先分配的范围`)
    }
    return (y * this.sizeGZ + z) * this.sizeGX + x
  }

  /** 格子的中心点：格子原点 + 随机偏移（x 0..9，y 0..8，z 0..9）。返回格子下标，坐标存在 loc* 里 */
  private location(gx: number, gy: number, gz: number): number {
    const i = this.index(gx, gy, gz)
    if (Number.isNaN(this.locY[i])) {
      const r = this.random.at(gx, gy, gz)
      this.locX[i] = gx * X_SPACING + r.nextInt(X_RANGE)
      this.locY[i] = gy * Y_SPACING + r.nextInt(Y_RANGE)
      this.locZ[i] = gz * Z_SPACING + r.nextInt(Z_RANGE)
    }
    return i
  }

  computeSubstance(i: number, j: number, k: number, density: number): Fluid | null {
    if (density > 0.0) {
      this.shouldScheduleFluidUpdate = false
      return null
    }
    const global = this.picker(i, j, k)
    if (global.at(j) === Fluid.lava) {
      this.shouldScheduleFluidUpdate = false
      return Fluid.lava
    }

    // 找最近的 4 个中心点（在周围 2×3×2 个格子里找）。o/p/q/r 是距离平方，s/t/u/v 是格子下标
    const l = floorDiv(i - 5, 16)
    const m = floorDiv(j + 1, 12)
    const n = floorDiv(k - 5, 16)
    let o = Number.MAX_SAFE_INTEGER
    let p = Number.MAX_SAFE_INTEGER
    let q = Number.MAX_SAFE_INTEGER
    let r = Number.MAX_SAFE_INTEGER
    let s = 0
    let t = 0
    let u = 0
    let v = 0
    for (let w = 0; w <= 1; w++) {
      for (let x = -1; x <= 1; x++) {
        for (let y = 0; y <= 1; y++) {
          const c = this.location(l + w, m + x, n + y)
          const dx = this.locX[c] - i
          const dy = this.locY[c] - j
          const dz = this.locZ[c] - k
          const d2 = dx * dx + dy * dy + dz * dz
          if (o >= d2) {
            v = u
            u = t
            t = s
            s = c
            r = q
            q = p
            p = o
            o = d2
          } else if (p >= d2) {
            v = u
            u = t
            t = c
            r = q
            q = p
            p = d2
          } else if (q >= d2) {
            v = u
            u = c
            r = q
            q = d2
          } else if (r >= d2) {
            v = c
            r = d2
          }
        }
      }
    }

    const status1 = this.status(s)
    const d = similarity(o, p)
    const fluid = status1.at(j)
    if (d <= 0.0) {
      // 离最近的中心点比第二近的近得多：完全听最近的
      this.shouldScheduleFluidUpdate = d >= FLOWING_UPDATE_SIMILARITY
      return fluid
    }
    if (fluid === Fluid.water && this.picker(i, j - 1, k).at(j - 1) === Fluid.lava) {
      this.shouldScheduleFluidUpdate = true
      return fluid
    }

    // 夹在两个含水层之间：算“压力”，压力够大的地方变成石头墙
    const barrier = { value: NaN }
    const ctx: FunctionContext = { blockX: i, blockY: j, blockZ: k }
    const status2 = this.status(t)
    const e = d * this.pressure(ctx, barrier, status1, status2)
    if (density + e > 0.0) {
      this.shouldScheduleFluidUpdate = false
      return null
    }
    const status3 = this.status(u)
    const f = similarity(o, q)
    if (f > 0.0) {
      const g = d * f * this.pressure(ctx, barrier, status1, status3)
      if (density + g > 0.0) {
        this.shouldScheduleFluidUpdate = false
        return null
      }
    }
    const g = similarity(p, q)
    if (g > 0.0) {
      const h = d * g * this.pressure(ctx, barrier, status2, status3)
      if (density + h > 0.0) {
        this.shouldScheduleFluidUpdate = false
        return null
      }
    }
    const bl = fluid !== status2.at(j)
    const bl2 = g >= FLOWING_UPDATE_SIMILARITY && status2.at(j) !== status3.at(j)
    const bl3 = f >= FLOWING_UPDATE_SIMILARITY && fluid !== status3.at(j)
    if (!bl && !bl2 && !bl3) {
      this.shouldScheduleFluidUpdate =
        f >= FLOWING_UPDATE_SIMILARITY && similarity(o, r) >= FLOWING_UPDATE_SIMILARITY && fluid !== this.status(v).at(j)
    } else {
      this.shouldScheduleFluidUpdate = true
    }
    return fluid
  }

  /**
   * 两个含水层之间的压力（原版 calculatePressure）。水位差越大、离两个水位的中间越近，压力越大；
   * 一边是水一边是岩浆时压力固定为 2（一定隔开）。barrier 噪声只在需要时算一次。
   */
  private pressure(ctx: FunctionContext, barrier: { value: number }, a: FluidStatus, b: FluidStatus): number {
    const y = ctx.blockY
    const fa = a.at(y)
    const fb = b.at(y)
    if ((fa === Fluid.lava && fb === Fluid.water) || (fa === Fluid.water && fb === Fluid.lava)) return 2.0
    const diff = Math.abs(a.fluidLevel - b.fluidLevel)
    if (diff === 0) return 0.0
    const mid = 0.5 * (a.fluidLevel + b.fluidLevel)
    const e = y + 0.5 - mid
    const half = diff / 2.0
    const o = half - Math.abs(e)
    let q: number
    if (e > 0.0) {
      const p = 0.0 + o
      q = p > 0.0 ? p / 1.5 : p / 2.5
    } else {
      const p = 3.0 + o
      q = p > 0.0 ? p / 3.0 : p / 10.0
    }
    let rr: number
    if (!(q < -2.0) && !(q > 2.0)) {
      if (Number.isNaN(barrier.value)) barrier.value = this.noises.barrier(ctx)
      rr = barrier.value
    } else {
      rr = 0.0
    }
    return 2.0 * (rr + q)
  }

  /** 格子 c 的含水层状态（缓存）。中心点一定落在自己的格子里，所以直接用格子下标 */
  private status(c: number): FluidStatus {
    let st = this.statuses[c]
    if (!st) {
      st = this.computeFluid(this.locX[c], this.locY[c], this.locZ[c])
      this.statuses[c] = st
    }
    return st
  }

  /** 一个含水层的水位和流体（原版 computeFluid） */
  private computeFluid(i: number, j: number, k: number): FluidStatus {
    const global = this.picker(i, j, k)
    let minSurface = Number.MAX_SAFE_INTEGER
    const top = j + 12
    const bottom = j - 12
    let surfaceHasFluid = false
    for (const [ox, oz] of SURFACE_SAMPLING_OFFSETS_IN_CHUNKS) {
      const x = i + ox * 16
      const z = k + oz * 16
      const surface = this.noises.preliminarySurfaceLevel(x, z)
      const r = surface + 8
      const self = ox === 0 && oz === 0
      // 中心点比自己这一列的地表还高：就是地面上的空气 / 海水，直接用全局的
      if (self && bottom > r) return global
      const nearSurface = top > r
      if (nearSurface || self) {
        const s = this.picker(x, r, z)
        if (s.at(r) !== Fluid.air) {
          if (self) surfaceHasFluid = true
          // 附近的地表就有水（海、河）：和它连通
          if (nearSurface) return s
        }
      }
      minSurface = Math.min(minSurface, surface)
    }
    const level = this.computeSurfaceLevel(i, j, k, global, minSurface, surfaceHasFluid)
    return new FluidStatus(level, this.computeFluidType(i, j, k, global, level))
  }

  /** 水位：淹没（= 全局水位）/ 随机水位 / 干的（原版 computeSurfaceLevel） */
  private computeSurfaceLevel(i: number, j: number, k: number, global: FluidStatus, minSurface: number, surfaceHasFluid: boolean): number {
    const ctx: FunctionContext = { blockX: i, blockY: j, blockZ: k }
    let d: number
    let e: number
    // 深暗之域（Deep Dark）所在的区域不放水
    if (this.noises.erosion(ctx) < Math.fround(-0.225) && this.noises.depth(ctx) > Math.fround(0.9)) {
      d = -1.0
      e = -1.0
    } else {
      const m = minSurface + 8 - j
      const f = surfaceHasFluid ? clampedMap(m, 0.0, 64.0, 1.0, 0.0) : 0.0
      const g = clamp(this.noises.floodedness(ctx), -1.0, 1.0)
      const h = map(f, 1.0, 0.0, -0.3, 0.8)
      const o = map(f, 1.0, 0.0, -0.8, 0.4)
      d = g - o
      e = g - h
    }
    if (e > 0.0) return global.fluidLevel
    if (d > 0.0) return this.randomizedFluidSurfaceLevel(i, j, k, minSurface)
    return WAY_BELOW_MIN_Y
  }

  /** 随机水位：每 16×40×16 一个，在格子中间 ±10 格（3 的倍数）范围内 */
  private randomizedFluidSurfaceLevel(i: number, j: number, k: number, minSurface: number): number {
    const o = floorDiv(i, 16)
    const p = floorDiv(j, 40)
    const q = floorDiv(k, 16)
    const base = p * 40 + 20
    // 注意：原版这里传的是格子坐标，不是方块坐标
    const d = this.noises.spread({ blockX: o, blockY: p, blockZ: q }) * 10.0
    return Math.min(minSurface, base + quantize(d, 3))
  }

  /** 水位 ≤ -10 的含水层，按 lava 噪声（每 64×40×64 一个值）有一部分变成岩浆 */
  private computeFluidType(i: number, j: number, k: number, global: FluidStatus, level: number): Fluid {
    if (level <= -10 && level !== WAY_BELOW_MIN_Y && global.fluidType !== Fluid.lava) {
      const d = this.noises.lava({ blockX: floorDiv(i, 64), blockY: floorDiv(j, 40), blockZ: floorDiv(k, 64) })
      if (Math.abs(d) > 0.3) return Fluid.lava
    }
    return global.fluidType
  }
}

/**
 * 预估地表高度（原版 1.21.1 NoiseChunk.computePreliminarySurfaceLevel）：
 * 从世界顶部往下，每 cellHeight 格查一次 initial_density_without_jaggedness，第一个 > 0.390625 的 y 就是。
 * (x, z) 先对齐到 4 格（quart）。结果按列缓存。
 */
export function preliminarySurfaceSampler(
  initialDensity: (ctx: FunctionContext) => number,
  minY: number,
  height: number,
  cellHeight: number,
  cache: Map<number, number>
): (x: number, z: number) => number {
  return (x, z) => {
    const qx = Math.floor(x / 4) * 4
    const qz = Math.floor(z / 4) * 4
    const key = (qx + 0x200000) * 0x400000 + (qz + 0x200000)
    let v = cache.get(key)
    if (v === undefined) {
      v = Number.MAX_SAFE_INTEGER
      const ctx: FunctionContext = { blockX: qx, blockY: 0, blockZ: qz }
      for (let y = minY + height; y >= minY; y -= cellHeight) {
        ctx.blockY = y
        if (initialDensity(ctx) > 0.390625) {
          v = y
          break
        }
      }
      cache.set(key, v)
    }
    return v
  }
}

/**
 * 按“这个区块的 NoiseChunk”求值：flat_cache 在区块范围内（区块起点所在的 quart 起 5×5 个 quart）
 * 取 quart 角上、y = 0 的值，范围外直接算。原版含水层判断“深暗之域”时用的 erosion / depth 就是这样算的。
 */
export function chunkLocal(fn: DensityFunction, chunkX: number, chunkZ: number): DensityFunction {
  const qx0 = chunkX * 4
  const qz0 = chunkZ * 4
  return fn.mapAll(
    createVisitor((f) => {
      if (!(f instanceof Marker) || f.type !== 'flat_cache') return f
      const arg = f.argument
      const cache = new Map<number, number>()
      return {
        type: 'flat_cache',
        compute(ctx: FunctionContext): number {
          const qx = Math.floor(ctx.blockX / 4)
          const qz = Math.floor(ctx.blockZ / 4)
          const dx = qx - qx0
          const dz = qz - qz0
          if (dx < 0 || dz < 0 || dx > 4 || dz > 4) return arg.compute(ctx)
          const k = dx * 5 + dz
          let v = cache.get(k)
          if (v === undefined) {
            v = arg.compute({ blockX: qx * 4, blockY: 0, blockZ: qz * 4 })
            cache.set(k, v)
          }
          return v
        },
        mapAll() {
          return this
        },
        children: () => [arg]
      } as unknown as DensityFunction
    })
  )
}
