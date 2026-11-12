import { clamp, clampedMap } from '../math/Mth'
import { BlendedNoise, type BlendedNoiseParams } from '../noise/BlendedNoise'
import type { NoiseParameters, NormalNoise } from '../noise/NormalNoise'
import { SimplexNoise } from '../noise/SimplexNoise'
import { LegacyRandomSource } from '../random/LegacyRandomSource'
import { CubicSpline } from './CubicSpline'

/**
 * net.minecraft.world.level.levelgen.DensityFunction 及 DensityFunctions 里的各个实现。
 *
 * 一个密度函数就是 f(x, y, z) → double。原版把地形写成一棵由 JSON 描述的表达式树：
 * 叶子是噪声、常数、Y 梯度；中间节点是加减乘、钳制、样条……
 * 最终 final_density > 0 的位置是石头，≤ 0 是空气（或水）。
 *
 * 这里每个类对应 JSON 里的一个 "type"。
 */

export interface FunctionContext {
  blockX: number
  blockY: number
  blockZ: number
}

export interface Visitor {
  apply(fn: DensityFunction): DensityFunction
  visitNoise(holder: NoiseHolder): NoiseHolder
  /** 引用节点（"minecraft:xxx"）展开时的缓存：同一个 ID 只映射一次，保证缓存节点被共享 */
  readonly memo: Map<string, DensityFunction>
  /** 按对象身份去重：一棵树里被多处共享的子树只映射一次 */
  readonly identity: Map<DensityFunction, DensityFunction>
}

export function createVisitor(
  apply: (fn: DensityFunction) => DensityFunction,
  visitNoise: (holder: NoiseHolder) => NoiseHolder = (h) => h
): Visitor {
  return { apply, visitNoise, memo: new Map(), identity: new Map() }
}

/** 映射子节点，并保持共享关系（原版靠 record 的 equals + HashMap 做到同样的事） */
export function mapChild(fn: DensityFunction, v: Visitor): DensityFunction {
  let r = v.identity.get(fn)
  if (r === undefined) {
    r = fn.mapAll(v)
    v.identity.set(fn, r)
  }
  return r
}

export interface DensityFunction {
  /** JSON 里的 type（不带命名空间），用于界面显示 */
  readonly type: string
  compute(ctx: FunctionContext): number
  /** 自底向上重建整棵树，visitor 可以替换任意节点（种子绑定、缓存替换都靠它） */
  mapAll(visitor: Visitor): DensityFunction
  /** 子节点，仅用于调试/展示 */
  children(): DensityFunction[]
}

/** 噪声引用：解析时只有 ID 和参数，绑定种子（RandomState）之后才有真正的 NormalNoise */
export class NoiseHolder {
  constructor(
    readonly id: string,
    readonly parameters: NoiseParameters,
    readonly noise: NormalNoise | null = null
  ) {}

  getValue(x: number, y: number, z: number): number {
    return this.noise === null ? 0.0 : this.noise.getValue(x, y, z)
  }

  get maxValue(): number {
    return this.noise === null ? 2.0 : this.noise.maxValue
  }
}

// ------------------------------------------------------------------ 叶子

export class Constant implements DensityFunction {
  readonly type = 'constant'
  constructor(readonly value: number) {}
  compute(): number {
    return this.value
  }
  mapAll(v: Visitor): DensityFunction {
    return v.apply(this)
  }
  children(): DensityFunction[] {
    return []
  }
}

export class YClampedGradient implements DensityFunction {
  readonly type = 'y_clamped_gradient'
  constructor(
    readonly fromY: number,
    readonly toY: number,
    readonly fromValue: number,
    readonly toValue: number
  ) {}
  compute(ctx: FunctionContext): number {
    return clampedMap(ctx.blockY, this.fromY, this.toY, this.fromValue, this.toValue)
  }
  mapAll(v: Visitor): DensityFunction {
    return v.apply(this)
  }
  children(): DensityFunction[] {
    return []
  }
}

export class Noise implements DensityFunction {
  readonly type = 'noise'
  constructor(
    readonly noise: NoiseHolder,
    readonly xzScale: number,
    readonly yScale: number
  ) {}
  compute(ctx: FunctionContext): number {
    return this.noise.getValue(ctx.blockX * this.xzScale, ctx.blockY * this.yScale, ctx.blockZ * this.xzScale)
  }
  mapAll(v: Visitor): DensityFunction {
    return v.apply(new Noise(v.visitNoise(this.noise), this.xzScale, this.yScale))
  }
  children(): DensityFunction[] {
    return []
  }
}

/**
 * shift_a / shift_b / shift：用一个低频噪声给坐标加“扰动”，让大陆边缘不那么规整。
 * shift_a 采样 (x, 0, z)，shift_b 采样 (z, x, 0) —— 同一个噪声换轴就得到另一个独立方向。
 */
export class ShiftNoise implements DensityFunction {
  constructor(
    readonly type: 'shift_a' | 'shift_b' | 'shift',
    readonly offsetNoise: NoiseHolder
  ) {}
  compute(ctx: FunctionContext): number {
    switch (this.type) {
      case 'shift_a':
        return this.sample(ctx.blockX, 0.0, ctx.blockZ)
      case 'shift_b':
        return this.sample(ctx.blockZ, ctx.blockX, 0.0)
      default:
        return this.sample(ctx.blockX, ctx.blockY, ctx.blockZ)
    }
  }
  private sample(x: number, y: number, z: number): number {
    return this.offsetNoise.getValue(x * 0.25, y * 0.25, z * 0.25) * 4.0
  }
  mapAll(v: Visitor): DensityFunction {
    return v.apply(new ShiftNoise(this.type, v.visitNoise(this.offsetNoise)))
  }
  children(): DensityFunction[] {
    return []
  }
}

export class ShiftedNoise implements DensityFunction {
  readonly type = 'shifted_noise'
  constructor(
    readonly shiftX: DensityFunction,
    readonly shiftY: DensityFunction,
    readonly shiftZ: DensityFunction,
    readonly xzScale: number,
    readonly yScale: number,
    readonly noise: NoiseHolder
  ) {}
  compute(ctx: FunctionContext): number {
    const d = ctx.blockX * this.xzScale + this.shiftX.compute(ctx)
    const e = ctx.blockY * this.yScale + this.shiftY.compute(ctx)
    const f = ctx.blockZ * this.xzScale + this.shiftZ.compute(ctx)
    return this.noise.getValue(d, e, f)
  }
  mapAll(v: Visitor): DensityFunction {
    return v.apply(
      new ShiftedNoise(
        mapChild(this.shiftX, v),
        mapChild(this.shiftY, v),
        mapChild(this.shiftZ, v),
        this.xzScale,
        this.yScale,
        v.visitNoise(this.noise)
      )
    )
  }
  children(): DensityFunction[] {
    return [this.shiftX, this.shiftY, this.shiftZ]
  }
}

/** old_blended_noise：解析时只存参数，绑定种子时由 RandomState 换成真正的噪声 */
export class BlendedNoiseFunction implements DensityFunction {
  readonly type = 'old_blended_noise'
  private noise: BlendedNoise | null

  constructor(
    readonly params: BlendedNoiseParams,
    noise: BlendedNoise | null = null
  ) {
    this.noise = noise
  }

  compute(ctx: FunctionContext): number {
    // 未绑定种子时与原版 BlendedNoise.UNSEEDED 一致：用 Xoroshiro(0)
    this.noise ??= BlendedNoise.unseeded(this.params)
    return this.noise.compute(ctx.blockX, ctx.blockY, ctx.blockZ)
  }
  mapAll(v: Visitor): DensityFunction {
    return v.apply(this)
  }
  children(): DensityFunction[] {
    return []
  }
}

/** 没有结构/旧版区块混合时这些都是常数 */
export class FixedValue implements DensityFunction {
  constructor(
    readonly type: 'blend_alpha' | 'blend_offset' | 'beardifier',
    readonly value: number
  ) {}
  compute(): number {
    return this.value
  }
  mapAll(v: Visitor): DensityFunction {
    return v.apply(this)
  }
  children(): DensityFunction[] {
    return []
  }
}

/**
 * end_islands：末地外岛。主岛是一个以原点为中心的圆锥，外面散落的小岛由 SimplexNoise 决定位置。
 * 种子固定来自 LegacyRandomSource(世界种子)，空转 17292 次后再构造噪声（原版如此）。
 * 计算以 8×8 方块为单位；中间大量 float 运算，需要逐步 Math.fround。
 */
export class EndIslands implements DensityFunction {
  readonly type = 'end_islands'
  private readonly islandNoise: SimplexNoise

  constructor(readonly seed: bigint) {
    const random = new LegacyRandomSource(seed)
    random.consumeCount(17292)
    this.islandNoise = new SimplexNoise(random)
  }

  /** 返回 -100..80 的“岛屿高度值”（float） */
  static heightValue(noise: SimplexNoise, x: number, z: number): number {
    const f32 = Math.fround
    const i = Math.trunc(x / 2)
    const j = Math.trunc(z / 2)
    const k = x % 2
    const l = z % 2
    // (float)(x * x + z * z)：int 乘法，可能溢出
    let f = f32(100.0 - f32(f32(Math.sqrt(f32((Math.imul(x, x) + Math.imul(z, z)) | 0))) * 8.0))
    f = clamp(f, -100.0, 80.0)
    for (let m = -12; m <= 12; m++) {
      for (let n = -12; n <= 12; n++) {
        const o = i + m
        const p = j + n
        if (o * o + p * p > 4096 && noise.getValue(o, p) < f32(-0.9)) {
          const g = f32(f32(f32(f32(Math.abs(f32(o)) * 3439.0) + f32(Math.abs(f32(p)) * 147.0)) % 13.0) + 9.0)
          const h = f32(k - m * 2)
          const q = f32(l - n * 2)
          let r = f32(100.0 - f32(f32(Math.sqrt(f32(f32(h * h) + f32(q * q)))) * g))
          r = clamp(r, -100.0, 80.0)
          f = Math.max(f, r)
        }
      }
    }
    return f
  }

  compute(ctx: FunctionContext): number {
    return (EndIslands.heightValue(this.islandNoise, Math.trunc(ctx.blockX / 8), Math.trunc(ctx.blockZ / 8)) - 8.0) / 128.0
  }
  mapAll(v: Visitor): DensityFunction {
    return v.apply(this)
  }
  children(): DensityFunction[] {
    return []
  }
}

// ------------------------------------------------------------------ 引用与标记

/** JSON 里写一个字符串 "minecraft:overworld/continents" 就是引用另一个文件 */
export class Reference implements DensityFunction {
  readonly type = 'reference'
  private resolved: DensityFunction | null = null

  constructor(
    readonly id: string,
    private readonly resolver: (id: string) => DensityFunction
  ) {}

  get value(): DensityFunction {
    return (this.resolved ??= this.resolver(this.id))
  }
  compute(ctx: FunctionContext): number {
    return this.value.compute(ctx)
  }
  mapAll(v: Visitor): DensityFunction {
    let mapped = v.memo.get(this.id)
    if (mapped === undefined) {
      mapped = mapChild(this.value, v)
      v.memo.set(this.id, mapped)
    }
    return mapped
  }
  children(): DensityFunction[] {
    return [this.value]
  }
}

export type MarkerType = 'interpolated' | 'flat_cache' | 'cache_2d' | 'cache_once' | 'cache_all_in_cell'

/**
 * 缓存/插值标记。单点求值时它们什么都不做，直接返回参数的值（F3 调试屏就是这样算的）；
 * 生成区块时 NoiseChunk 会把它们替换成真正的缓存（见 NoiseChunk.ts）。
 */
export class Marker implements DensityFunction {
  constructor(
    readonly type: MarkerType,
    readonly argument: DensityFunction
  ) {}
  compute(ctx: FunctionContext): number {
    return this.argument.compute(ctx)
  }
  mapAll(v: Visitor): DensityFunction {
    return v.apply(new Marker(this.type, mapChild(this.argument, v)))
  }
  children(): DensityFunction[] {
    return [this.argument]
  }
}

export class BlendDensity implements DensityFunction {
  readonly type = 'blend_density'
  constructor(readonly argument: DensityFunction) {}
  compute(ctx: FunctionContext): number {
    return this.argument.compute(ctx) // Blender.empty()：不混合
  }
  mapAll(v: Visitor): DensityFunction {
    return v.apply(new BlendDensity(mapChild(this.argument, v)))
  }
  children(): DensityFunction[] {
    return [this.argument]
  }
}

// ------------------------------------------------------------------ 运算

export type MappedType = 'abs' | 'square' | 'cube' | 'half_negative' | 'quarter_negative' | 'squeeze'

export class Mapped implements DensityFunction {
  constructor(
    readonly type: MappedType,
    readonly input: DensityFunction
  ) {}
  compute(ctx: FunctionContext): number {
    const d = this.input.compute(ctx)
    switch (this.type) {
      case 'abs':
        return Math.abs(d)
      case 'square':
        return d * d
      case 'cube':
        return d * d * d
      case 'half_negative':
        return d > 0.0 ? d : d * 0.5
      case 'quarter_negative':
        return d > 0.0 ? d : d * 0.25
      case 'squeeze': {
        // 把 [-1, 1] 软压缩：e/2 - e³/24，原版用来让 final_density 在 0 附近更平滑
        const e = clamp(d, -1.0, 1.0)
        return e / 2.0 - (e * e * e) / 24.0
      }
    }
  }
  mapAll(v: Visitor): DensityFunction {
    return v.apply(new Mapped(this.type, mapChild(this.input, v)))
  }
  children(): DensityFunction[] {
    return [this.input]
  }
}

export type Ap2Type = 'add' | 'mul' | 'min' | 'max'

export class Ap2 implements DensityFunction {
  constructor(
    readonly type: Ap2Type,
    readonly argument1: DensityFunction,
    readonly argument2: DensityFunction
  ) {}
  compute(ctx: FunctionContext): number {
    const d = this.argument1.compute(ctx)
    switch (this.type) {
      case 'add':
        return d + this.argument2.compute(ctx)
      case 'mul':
        // 原版的短路：乘数为 0 就不算第二个参数（省掉昂贵的洞穴噪声）
        return d === 0.0 ? 0.0 : d * this.argument2.compute(ctx)
      case 'min':
        return Math.min(d, this.argument2.compute(ctx))
      case 'max':
        return Math.max(d, this.argument2.compute(ctx))
    }
  }
  mapAll(v: Visitor): DensityFunction {
    return v.apply(new Ap2(this.type, mapChild(this.argument1, v), mapChild(this.argument2, v)))
  }
  children(): DensityFunction[] {
    return [this.argument1, this.argument2]
  }
}

export class Clamp implements DensityFunction {
  readonly type = 'clamp'
  constructor(
    readonly input: DensityFunction,
    readonly min: number,
    readonly max: number
  ) {}
  compute(ctx: FunctionContext): number {
    return clamp(this.input.compute(ctx), this.min, this.max)
  }
  mapAll(v: Visitor): DensityFunction {
    return v.apply(new Clamp(mapChild(this.input, v), this.min, this.max))
  }
  children(): DensityFunction[] {
    return [this.input]
  }
}

export class RangeChoice implements DensityFunction {
  readonly type = 'range_choice'
  constructor(
    readonly input: DensityFunction,
    readonly minInclusive: number,
    readonly maxExclusive: number,
    readonly whenInRange: DensityFunction,
    readonly whenOutOfRange: DensityFunction
  ) {}
  compute(ctx: FunctionContext): number {
    const d = this.input.compute(ctx)
    return d >= this.minInclusive && d < this.maxExclusive
      ? this.whenInRange.compute(ctx)
      : this.whenOutOfRange.compute(ctx)
  }
  mapAll(v: Visitor): DensityFunction {
    return v.apply(
      new RangeChoice(
        mapChild(this.input, v),
        this.minInclusive,
        this.maxExclusive,
        mapChild(this.whenInRange, v),
        mapChild(this.whenOutOfRange, v)
      )
    )
  }
  children(): DensityFunction[] {
    return [this.input, this.whenInRange, this.whenOutOfRange]
  }
}

/** 意面洞穴用：输入值越大，噪声坐标被缩得越小（洞越粗） */
const RARITY: Record<string, (d: number) => number> = {
  type_1(d) {
    // getSpaghettiRarity3D
    if (d < -0.5) return 0.75
    if (d < 0.0) return 1.0
    return d < 0.5 ? 1.5 : 2.0
  },
  type_2(d) {
    // getSphaghettiRarity2D（原版拼写就是 Sphaghetti）
    if (d < -0.75) return 0.5
    if (d < -0.5) return 0.75
    if (d < 0.5) return 1.0
    return d < 0.75 ? 2.0 : 3.0
  }
}

export class WeirdScaledSampler implements DensityFunction {
  readonly type = 'weird_scaled_sampler'
  private readonly mapper: (d: number) => number

  constructor(
    readonly input: DensityFunction,
    readonly noise: NoiseHolder,
    readonly rarityValueMapper: 'type_1' | 'type_2'
  ) {
    const m = RARITY[rarityValueMapper]
    if (m === undefined) throw new Error(`未知的 rarity_value_mapper: ${rarityValueMapper}`)
    this.mapper = m
  }
  compute(ctx: FunctionContext): number {
    const d = this.input.compute(ctx)
    const e = this.mapper(d)
    return e * Math.abs(this.noise.getValue(ctx.blockX / e, ctx.blockY / e, ctx.blockZ / e))
  }
  mapAll(v: Visitor): DensityFunction {
    return v.apply(new WeirdScaledSampler(mapChild(this.input, v), v.visitNoise(this.noise), this.rarityValueMapper))
  }
  children(): DensityFunction[] {
    return [this.input]
  }
}

// ------------------------------------------------------------------ 样条

/** JSON 里样条的结构：常数，或者 { coordinate, points: [{location, value, derivative}] } */
export type SplineNode =
  | number
  | {
      coordinate: DensityFunction
      locations: number[]
      values: SplineNode[]
      derivatives: number[]
    }

function buildSpline(node: SplineNode): CubicSpline<FunctionContext> {
  if (typeof node === 'number') return CubicSpline.constant(node)
  const coord = node.coordinate
  return CubicSpline.multipoint<FunctionContext>(
    (ctx) => coord.compute(ctx),
    node.locations,
    node.values.map(buildSpline),
    node.derivatives
  )
}

function mapSpline(node: SplineNode, v: Visitor): SplineNode {
  if (typeof node === 'number') return node
  return {
    coordinate: mapChild(node.coordinate, v),
    locations: node.locations,
    values: node.values.map((n) => mapSpline(n, v)),
    derivatives: node.derivatives
  }
}

function splineCoordinates(node: SplineNode, out: DensityFunction[]): DensityFunction[] {
  if (typeof node !== 'number') {
    if (!out.includes(node.coordinate)) out.push(node.coordinate)
    node.values.forEach((n) => splineCoordinates(n, out))
  }
  return out
}

export class Spline implements DensityFunction {
  readonly type = 'spline'
  private readonly spline: CubicSpline<FunctionContext>

  constructor(readonly node: SplineNode) {
    this.spline = buildSpline(node)
  }
  compute(ctx: FunctionContext): number {
    return this.spline.apply(ctx)
  }
  mapAll(v: Visitor): DensityFunction {
    return v.apply(new Spline(mapSpline(this.node, v)))
  }
  children(): DensityFunction[] {
    return splineCoordinates(this.node, [])
  }
}
