import type { RandomSource } from '../random/RandomSource'
import { SimplexNoise } from './SimplexNoise'

/**
 * 多倍频的 2D Simplex 噪声（原版 PerlinSimplexNoise）。
 * 生物群系的温度修正（高处更冷、冰冻海洋的冰）和沼泽草的颜色用的就是它，种子是写死的常数。
 *
 * octaves：倍频列表，例如 [0] 或 [-2, -1, 0]。0 是最高频；-1 频率减半、振幅加倍，依此类推。
 */
export class PerlinSimplexNoise {
  private readonly levels: (SimplexNoise | null)[]
  private readonly highestFreqInputFactor: number
  private readonly highestFreqValueFactor: number

  constructor(random: RandomSource, octaves: number[]) {
    const set = [...new Set(octaves)].sort((a, b) => a - b)
    const i = -set[0]
    const j = set[set.length - 1]
    const k = i + j + 1
    const has = (o: number) => set.includes(o)
    const first = new SimplexNoise(random)
    const l = j
    this.levels = new Array(k).fill(null)
    if (l >= 0 && l < k && has(0)) this.levels[l] = first
    for (let m = l + 1; m < k; m++) {
      if (m >= 0 && has(l - m)) this.levels[m] = new SimplexNoise(random)
      else random.consumeCount(262)
    }
    // 原版在最高倍频 > 0 时还会用 3D Simplex 派生出更低频的倍频；原版用到它的地方最高倍频都是 0，这里不实现
    if (j > 0) throw new Error('PerlinSimplexNoise：不支持大于 0 的倍频')
    this.highestFreqInputFactor = Math.pow(2.0, j)
    this.highestFreqValueFactor = 1.0 / (Math.pow(2.0, k) - 1.0)
  }

  /** useOrigin：是否加上每个倍频自己的随机原点（原版的布尔参数，这里用到的地方都是 false） */
  getValue(x: number, z: number, useOrigin: boolean): number {
    let d = 0.0
    let e = this.highestFreqInputFactor
    let f = this.highestFreqValueFactor
    for (const n of this.levels) {
      if (n) d += n.getValue(x * e + (useOrigin ? n.xo : 0.0), z * e + (useOrigin ? n.yo : 0.0)) * f
      e /= 2.0
      f *= 2.0
    }
    return d
  }
}
