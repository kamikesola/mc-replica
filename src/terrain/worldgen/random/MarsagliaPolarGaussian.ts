import type { RandomSource } from './RandomSource'

/** net.minecraft.world.level.levelgen.MarsagliaPolarGaussian：极坐标法生成正态分布，一次产出两个值 */
export class MarsagliaPolarGaussian {
  private nextNextGaussian = 0
  private haveNextNextGaussian = false

  constructor(private readonly randomSource: RandomSource) {}

  reset(): void {
    this.haveNextNextGaussian = false
  }

  nextGaussian(): number {
    if (this.haveNextNextGaussian) {
      this.haveNextNextGaussian = false
      return this.nextNextGaussian
    }
    let d: number
    let e: number
    let f: number
    do {
      d = 2.0 * this.randomSource.nextDouble() - 1.0
      e = 2.0 * this.randomSource.nextDouble() - 1.0
      f = d * d + e * e
    } while (f >= 1.0 || f === 0.0)
    const g = Math.sqrt((-2.0 * Math.log(f)) / f)
    this.nextNextGaussian = e * g
    this.haveNextNextGaussian = true
    return d * g
  }
}
