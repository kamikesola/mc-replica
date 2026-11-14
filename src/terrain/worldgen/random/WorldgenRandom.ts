import { LegacyRandomSource } from './LegacyRandomSource'
import { toInt, toLong } from './RandomSource'
import { XoroshiroRandomSource } from './XoroshiroRandomSource'

/**
 * 原版 WorldgenRandom：地物（feature）用的随机数。
 *
 * 它继承 LegacyRandomSource 的 nextInt / nextFloat / nextDouble 等算法（都建立在 next(bits) 上），
 * 但 next(bits) 的位来自内部的另一个随机源——主世界是 Xoroshiro：
 *   next(bits) = (int)(xoroshiro.nextLong() >>> (64 - bits))
 * 所以同一个种子，WorldgenRandom.nextInt(16) 和 Xoroshiro 自己的 nextInt(16) 结果不一样，不能混用。
 */
export class WorldgenRandom extends LegacyRandomSource {
  private source: XoroshiroRandomSource | undefined
  /** 原版的 count：调用了多少次 next（只用于调试） */
  count = 0

  constructor(seed: bigint) {
    super(0n)
    this.source = new XoroshiroRandomSource(seed)
  }

  override setSeed(seed: bigint): void {
    // 父类构造函数会调用一次 setSeed，那时 source 还没创建（原版：randomSource != null 才转发）
    this.source?.setSeed(seed)
  }

  override next(bits: number): number {
    this.count++
    return toInt(BigInt.asUintN(64, this.source!.nextLong()) >> BigInt(64 - bits))
  }

  /** 原版 setDecorationSeed：每个区块的“装饰种子”，由世界种子和区块最小角的方块坐标算出 */
  setDecorationSeed(levelSeed: bigint, minX: number, minZ: number): bigint {
    this.setSeed(levelSeed)
    const a = this.nextLong() | 1n
    const b = this.nextLong() | 1n
    const n = toLong(toLong(BigInt(minX) * a + BigInt(minZ) * b) ^ levelSeed)
    this.setSeed(n)
    return n
  }

  /** 原版 setFeatureSeed：每个地物各自的种子 = 装饰种子 + 序号 + 10000 × 步骤 */
  setFeatureSeed(decorationSeed: bigint, index: number, step: number): void {
    this.setSeed(toLong(decorationSeed + BigInt(index) + BigInt(10000 * step)))
  }
}
