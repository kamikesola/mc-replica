import { binarySearch, lerpF } from '../math/Mth'

const fround = Math.fround

/**
 * net.minecraft.util.CubicSpline —— 三次 Hermite 样条。
 *
 * 原版地形“山有多高”几乎全由它决定（overworld/offset、factor、jaggedness）。
 * 一个控制点 = (location, value, derivative)，value 本身又可以是一条样条，
 * 于是形成“以大陆性为横轴、每个点上再以侵蚀度为横轴……”的嵌套结构。
 *
 * 注意：原版这里全程是 float，不是 double。每一步都要 Math.fround，
 * 否则和原版会有 1e-8 量级的差别，地形边缘偶尔会差一个方块。
 */
export interface CubicSpline<C> {
  apply(c: C): number
  /** 用于调试/可视化：返回结构（常数或多点） */
  readonly kind: 'constant' | 'multipoint'
}

class Constant<C> implements CubicSpline<C> {
  readonly kind = 'constant'
  constructor(readonly value: number) {}
  apply(): number {
    return this.value
  }
}

class Multipoint<C> implements CubicSpline<C> {
  readonly kind = 'multipoint'

  constructor(
    readonly coordinate: (c: C) => number,
    readonly locations: Float32Array,
    readonly values: CubicSpline<C>[],
    readonly derivatives: Float32Array
  ) {
    const n = locations.length
    if (n !== values.length || n !== derivatives.length) {
      throw new Error('All lengths must be equal')
    }
    if (n === 0) throw new Error('Cannot create a multipoint spline with no points')
    for (let i = 0; i < n - 1; i++) {
      if (locations[i] >= locations[i + 1]) throw new Error('Spline locations must be strictly ascending')
    }
  }

  apply(c: C): number {
    const f = fround(this.coordinate(c))
    const locs = this.locations
    const i = findIntervalStart(locs, f)
    const j = locs.length - 1
    if (i < 0) return linearExtend(f, locs, this.values[0].apply(c), this.derivatives, 0)
    if (i === j) return linearExtend(f, locs, this.values[j].apply(c), this.derivatives, j)

    const g = locs[i]
    const h = locs[i + 1]
    const k = fround(fround(f - g) / fround(h - g))
    const l = this.derivatives[i]
    const m = this.derivatives[i + 1]
    const n = this.values[i].apply(c)
    const o = this.values[i + 1].apply(c)
    const hg = fround(h - g)
    const on = fround(o - n)
    const p = fround(fround(l * hg) - on)
    const q = fround(fround(fround(-m) * hg) + on)
    // lerp(k, n, o) + k * (1 - k) * lerp(k, p, q)
    return fround(lerpF(k, n, o) + fround(fround(k * fround(1.0 - k)) * lerpF(k, p, q)))
  }
}

function findIntervalStart(locations: Float32Array, x: number): number {
  return binarySearch(0, locations.length, (i) => x < locations[i]) - 1
}

function linearExtend(point: number, locations: Float32Array, value: number, derivatives: Float32Array, index: number): number {
  const f = derivatives[index]
  return f === 0.0 ? value : fround(value + fround(f * fround(point - locations[index])))
}

export const CubicSpline = {
  constant<C>(value: number): CubicSpline<C> {
    return new Constant<C>(fround(value))
  },
  multipoint<C>(
    coordinate: (c: C) => number,
    locations: number[],
    values: CubicSpline<C>[],
    derivatives: number[]
  ): CubicSpline<C> {
    return new Multipoint<C>(coordinate, Float32Array.from(locations), values, Float32Array.from(derivatives))
  }
}
