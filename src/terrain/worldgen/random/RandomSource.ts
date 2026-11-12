/**
 * net.minecraft.util.RandomSource 的 TS 版本。
 *
 * Java 的 long 在这里一律用 bigint 表示（取值范围 -2^63 .. 2^63-1）。
 * 随机数只在“构造噪声”时大量使用，采样阶段完全不碰 bigint，所以性能不是问题。
 */
export interface RandomSource {
  /** 派生一个独立的随机源（会消耗当前随机源的状态） */
  fork(): RandomSource
  /** 派生一个“位置随机工厂”：同一个工厂，同一个坐标/名字永远得到同一个随机源 */
  forkPositional(): PositionalRandomFactory
  setSeed(seed: bigint): void

  /** 不带参数：32 位有符号整数；带参数：[0, bound) */
  nextInt(bound?: number): number
  nextIntBetweenInclusive(min: number, max: number): number
  nextLong(): bigint
  nextBoolean(): boolean
  nextFloat(): number
  nextDouble(): number
  nextGaussian(): number
  /** 空转 count 次，用来“跳过”某个本该生成的东西，保持后续序列不变 */
  consumeCount(count: number): void
}

export interface PositionalRandomFactory {
  at(x: number, y: number, z: number): RandomSource
  /** 用字符串（通常是资源 ID）派生随机源，世界生成里最重要的入口 */
  fromHashOf(name: string): RandomSource
  fromSeed(seed: bigint): RandomSource
}

/** Java long 截断 */
export const toLong = (v: bigint): bigint => BigInt.asIntN(64, v)
/** Java int 截断 */
export const toInt = (v: bigint): number => Number(BigInt.asIntN(32, v))
