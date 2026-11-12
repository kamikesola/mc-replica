import { getSeed, javaStringHashCode } from '../math/Mth'
import { MarsagliaPolarGaussian } from './MarsagliaPolarGaussian'
import { type PositionalRandomFactory, type RandomSource, toInt, toLong } from './RandomSource'

const MODULUS_MASK = (1n << 48n) - 1n // 281474976710655L
const MULTIPLIER = 25214903917n // 0x5DEECE66D
const INCREMENT = 11n

/**
 * net.minecraft.world.level.levelgen.LegacyRandomSource
 *
 * 48 位线性同余发生器（LCG），算法与 java.util.Random 完全相同：
 *   seed = (seed * 0x5DEECE66D + 0xB) mod 2^48
 * 每次取高位作为输出。1.18 之前的世界生成全靠它，现在世界种子和一些旧路径仍在用。
 */
export class LegacyRandomSource implements RandomSource {
  private seed = 0n
  private readonly gaussianSource = new MarsagliaPolarGaussian(this)

  constructor(seed: bigint) {
    this.setSeed(seed)
  }

  fork(): RandomSource {
    return new LegacyRandomSource(this.nextLong())
  }

  forkPositional(): PositionalRandomFactory {
    return new LegacyPositionalRandomFactory(this.nextLong())
  }

  setSeed(seed: bigint): void {
    // 初始扰动：与乘数异或，然后截到 48 位
    this.seed = (seed ^ MULTIPLIER) & MODULUS_MASK
    this.gaussianSource.reset()
  }

  /** 推进一步，返回高 bits 位（Java 里是 int，bits=32 时会变成负数） */
  next(bits: number): number {
    this.seed = (this.seed * MULTIPLIER + INCREMENT) & MODULUS_MASK
    return toInt(this.seed >> BigInt(48 - bits))
  }

  nextInt(bound?: number): number {
    if (bound === undefined) return this.next(32)
    if (bound <= 0) throw new RangeError('Bound must be positive')
    if ((bound & (bound - 1)) === 0) {
      // 2 的幂：直接取高位，避免取模偏差
      return toInt((BigInt(bound) * BigInt(this.next(31))) >> 31n)
    }
    let i: number
    let j: number
    do {
      i = this.next(31)
      j = i % bound
      // Java 里 i - j + (bound - 1) 会 int 溢出变负，用来拒绝分布不均匀的尾部
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
    return this.next(24) * 5.9604644775390625e-8 // 2^-24（Java 的 5.9604645E-8F 正好是它）
  }

  nextDouble(): number {
    const i = this.next(26)
    const j = this.next(27)
    return (i * 134217728 + j) * 1.1102230246251565e-16 // ((long)i << 27) + j) * 2^-53
  }

  nextGaussian(): number {
    return this.gaussianSource.nextGaussian()
  }

  consumeCount(count: number): void {
    for (let i = 0; i < count; i++) this.nextInt()
  }
}

export class LegacyPositionalRandomFactory implements PositionalRandomFactory {
  constructor(private readonly seed: bigint) {}

  at(x: number, y: number, z: number): RandomSource {
    return new LegacyRandomSource(getSeed(x, y, z) ^ this.seed)
  }

  fromHashOf(name: string): RandomSource {
    return new LegacyRandomSource(BigInt(javaStringHashCode(name)) ^ this.seed)
  }

  fromSeed(seed: bigint): RandomSource {
    return new LegacyRandomSource(seed)
  }
}
