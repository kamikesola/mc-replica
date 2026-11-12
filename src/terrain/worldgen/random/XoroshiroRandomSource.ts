import { getSeed } from '../math/Mth'
import { MarsagliaPolarGaussian } from './MarsagliaPolarGaussian'
import { type PositionalRandomFactory, type RandomSource, toInt, toLong } from './RandomSource'
import { type Seed128bit, seedFromHashOf, upgradeSeedTo128bit, GOLDEN_RATIO_64, SILVER_RATIO_64 } from './RandomSupport'

const MASK64 = (1n << 64n) - 1n

function rotl(x: bigint, k: bigint): bigint {
  const u = x & MASK64
  return toLong((u << k) | (u >> (64n - k)))
}

/**
 * net.minecraft.world.level.levelgen.Xoroshiro128PlusPlus
 * 128 位状态（两个 long），周期 2^128-1，统计质量远好于 48 位 LCG。
 */
export class Xoroshiro128PlusPlus {
  seedLo: bigint
  seedHi: bigint

  constructor(lo: bigint, hi: bigint) {
    this.seedLo = toLong(lo)
    this.seedHi = toLong(hi)
    // 全零状态是不动点，原版换成两个常数
    if ((this.seedLo | this.seedHi) === 0n) {
      this.seedLo = GOLDEN_RATIO_64
      this.seedHi = SILVER_RATIO_64
    }
  }

  static fromSeed(seed: Seed128bit): Xoroshiro128PlusPlus {
    return new Xoroshiro128PlusPlus(seed.lo, seed.hi)
  }

  nextLong(): bigint {
    const l = this.seedLo
    let m = this.seedHi
    const n = toLong(rotl(toLong(l + m), 17n) + l)
    m = m ^ l
    this.seedLo = toLong(rotl(l, 49n) ^ m ^ (m << 21n))
    this.seedHi = rotl(m, 28n)
    return n
  }
}

/** net.minecraft.world.level.levelgen.XoroshiroRandomSource：1.18+ 世界生成的主力随机源 */
export class XoroshiroRandomSource implements RandomSource {
  private rng: Xoroshiro128PlusPlus
  private readonly gaussianSource = new MarsagliaPolarGaussian(this)

  constructor(seedOrLo: bigint, hi?: bigint) {
    this.rng =
      hi === undefined
        ? Xoroshiro128PlusPlus.fromSeed(upgradeSeedTo128bit(seedOrLo))
        : new Xoroshiro128PlusPlus(seedOrLo, hi)
  }

  static fromSeed128(seed: Seed128bit): XoroshiroRandomSource {
    return new XoroshiroRandomSource(seed.lo, seed.hi)
  }

  fork(): RandomSource {
    return new XoroshiroRandomSource(this.rng.nextLong(), this.rng.nextLong())
  }

  forkPositional(): PositionalRandomFactory {
    return new XoroshiroPositionalRandomFactory(this.rng.nextLong(), this.rng.nextLong())
  }

  setSeed(seed: bigint): void {
    this.rng = Xoroshiro128PlusPlus.fromSeed(upgradeSeedTo128bit(seed))
    this.gaussianSource.reset()
  }

  nextInt(bound?: number): number {
    if (bound === undefined) return toInt(this.rng.nextLong())
    if (bound <= 0) throw new RangeError('Bound must be positive')
    // Lemire 的无偏有界随机：用乘法取高 32 位，少量情况下拒绝重采
    const b = BigInt(bound)
    let l = BigInt.asUintN(32, this.rng.nextLong())
    let m = l * b
    let n = m & 0xffffffffn
    if (n < b) {
      const i = BigInt((-bound >>> 0) % bound) // Integer.remainderUnsigned(~bound + 1, bound)
      while (n < i) {
        l = BigInt.asUintN(32, this.rng.nextLong())
        m = l * b
        n = m & 0xffffffffn
      }
    }
    return Number(m >> 32n)
  }

  nextIntBetweenInclusive(min: number, max: number): number {
    return this.nextInt(max - min + 1) + min
  }

  nextLong(): bigint {
    return this.rng.nextLong()
  }

  nextBoolean(): boolean {
    return (this.rng.nextLong() & 1n) !== 0n
  }

  nextFloat(): number {
    return this.nextBits(24) * 5.9604644775390625e-8 // 2^-24（Java 的 5.9604645E-8F 正好是它）
  }

  nextDouble(): number {
    return this.nextBits(53) * 1.1102230246251565e-16 // 2^-53
  }

  nextGaussian(): number {
    return this.gaussianSource.nextGaussian()
  }

  consumeCount(count: number): void {
    for (let i = 0; i < count; i++) this.rng.nextLong()
  }

  /** 无符号右移取高 bits 位 */
  private nextBits(bits: number): number {
    return Number(BigInt.asUintN(64, this.rng.nextLong()) >> BigInt(64 - bits))
  }
}

export class XoroshiroPositionalRandomFactory implements PositionalRandomFactory {
  constructor(
    readonly seedLo: bigint,
    readonly seedHi: bigint
  ) {}

  at(x: number, y: number, z: number): RandomSource {
    return new XoroshiroRandomSource(getSeed(x, y, z) ^ this.seedLo, this.seedHi)
  }

  /** MD5(name) 拆成两个 long，再与工厂自身的种子异或 */
  fromHashOf(name: string): RandomSource {
    const s = seedFromHashOf(name)
    return new XoroshiroRandomSource(s.lo ^ this.seedLo, s.hi ^ this.seedHi)
  }

  fromSeed(seed: bigint): RandomSource {
    return new XoroshiroRandomSource(seed ^ this.seedLo, seed ^ this.seedHi)
  }
}
