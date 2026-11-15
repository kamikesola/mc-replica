import { toLong } from './RandomSource'

/**
 * 和 LegacyRandomSource（java.util.Random 的 48 位线性同余）结果一样，但不用 bigint：
 * 48 位状态拆成两个 24 位的数，乘法按 24 位一段算，都在 double 能精确表示的范围里。
 * 洞穴雕刻器一个区块要调用几十万次随机数，用 bigint 太慢（v5.1）。
 */
const TWO24 = 16777216
const ML = 0xece66d // 乘数 0x5DEECE66D 的低 24 位
const MH = 0x5de // 高位
const MULT = 0x5deece66dn

export class FastLegacyRandom {
  private hi = 0
  private lo = 0
  private nextNextGaussian = 0
  private haveNextNextGaussian = false

  constructor(seed: bigint) {
    this.setSeed(seed)
  }

  setSeed(seed: bigint): void {
    const s = BigInt.asUintN(48, seed ^ MULT)
    this.hi = Number(s >> 24n)
    this.lo = Number(s & 0xffffffn)
    this.haveNextNextGaussian = false
  }

  next(bits: number): number {
    const p0 = this.lo * ML + 0xb
    const lo = p0 % TWO24
    const p1 = this.hi * ML + this.lo * MH + Math.floor(p0 / TWO24)
    this.hi = p1 % TWO24
    this.lo = lo
    const v = Math.floor((this.hi * TWO24 + this.lo) / 2 ** (48 - bits))
    return v | 0
  }

  nextInt(bound?: number): number {
    if (bound === undefined) return this.next(32)
    if ((bound & (bound - 1)) === 0) return Math.floor((bound * this.next(31)) / 2147483648)
    let i: number
    let j: number
    do {
      i = this.next(31)
      j = i % bound
    } while (((i - j + (bound - 1)) | 0) < 0)
    return j
  }

  nextIntBetweenInclusive(min: number, max: number): number {
    return this.nextInt(max - min + 1) + min
  }

  nextLong(): bigint {
    const i = this.next(32)
    const j = this.next(32)
    return toLong((BigInt(i) << 32n) + BigInt(j))
  }

  nextBoolean(): boolean {
    return this.next(1) !== 0
  }

  nextFloat(): number {
    return this.next(24) / 16777216
  }

  nextDouble(): number {
    return (this.next(26) * 134217728 + this.next(27)) * 1.1102230246251565e-16
  }

  nextGaussian(): number {
    // 原版 LegacyRandomSource 用 MarsagliaPolarGaussian
    if (this.haveNextNextGaussian) {
      this.haveNextNextGaussian = false
      return this.nextNextGaussian
    }
    let d: number
    let e: number
    let f: number
    do {
      d = 2 * this.nextDouble() - 1
      e = 2 * this.nextDouble() - 1
      f = d * d + e * e
    } while (f >= 1 || f === 0)
    const g = Math.sqrt((-2 * Math.log(f)) / f)
    this.nextNextGaussian = e * g
    this.haveNextNextGaussian = true
    return d * g
  }
}
