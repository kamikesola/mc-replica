import { BlendedNoise } from '../noise/BlendedNoise'
import { NormalNoise } from '../noise/NormalNoise'
import { LegacyRandomSource } from '../random/LegacyRandomSource'
import type { PositionalRandomFactory } from '../random/RandomSource'
import { XoroshiroRandomSource } from '../random/XoroshiroRandomSource'
import { normalizeId } from '../registry/Registry'
import { BlendedNoiseFunction, createVisitor, EndIslands, type DensityFunction, NoiseHolder, type Visitor } from './DensityFunction'
import type { DensityFunctionParser } from './DensityFunctionParser'

/**
 * net.minecraft.world.level.levelgen.RandomState
 *
 * “种子 → 一套具体噪声”的地方：
 *   random = Xoroshiro(seed).forkPositional()
 *   每个噪声   = NormalNoise.create(random.fromHashOf("minecraft:continentalness"), 参数)
 *   旧混合噪声 = BlendedNoise(random.fromHashOf("minecraft:terrain"))
 *
 * 因为每个噪声的种子只取决于“世界种子 + 噪声 ID”，
 * 所以新增/删除一个噪声不会改变其他噪声 —— 这是 1.18 改用位置随机工厂的关键原因。
 */
export class RandomState {
  readonly random: PositionalRandomFactory
  private readonly noises = new Map<string, NormalNoise>()
  private readonly wired = new Map<string, DensityFunction>()
  private readonly visitor: Visitor

  constructor(
    readonly parser: DensityFunctionParser,
    readonly seed: bigint,
    readonly legacyRandomSource = false
  ) {
    this.random = (legacyRandomSource ? new LegacyRandomSource(seed) : new XoroshiroRandomSource(seed)).forkPositional()

    this.visitor = createVisitor(
      (fn) => {
        if (fn instanceof EndIslands) return new EndIslands(seed)
        if (fn instanceof BlendedNoiseFunction) {
          const r = legacyRandomSource ? new LegacyRandomSource(seed) : this.random.fromHashOf('minecraft:terrain')
          return new BlendedNoiseFunction(fn.params, new BlendedNoise(r, fn.params))
        }
        return fn
      },
      (holder) => new NoiseHolder(holder.id, holder.parameters, this.getOrCreateNoise(holder.id))
    )
  }

  getOrCreateNoise(id: string): NormalNoise {
    id = normalizeId(id)
    let n = this.noises.get(id)
    if (n === undefined) {
      n = this.instantiate(id)
      this.noises.set(id, n)
    }
    return n
  }

  private instantiate(id: string): NormalNoise {
    const params = this.parser.registry.getNoise(id)
    if (this.legacyRandomSource) {
      // 1.18 之前的旧世界：温度/湿度/偏移三个噪声走特殊路径（与原版 RandomState 一致）
      if (id === 'minecraft:temperature') {
        return NormalNoise.createLegacyNetherBiome(new LegacyRandomSource(this.seed), {
          firstOctave: -7,
          amplitudes: [1.0, 1.0]
        })
      }
      if (id === 'minecraft:vegetation') {
        return NormalNoise.createLegacyNetherBiome(new LegacyRandomSource(this.seed + 1n), {
          firstOctave: -7,
          amplitudes: [1.0, 1.0]
        })
      }
      if (id === 'minecraft:offset') {
        return NormalNoise.create(this.random.fromHashOf('minecraft:offset'), { firstOctave: 0, amplitudes: [0.0] })
      }
    }
    return NormalNoise.create(this.random.fromHashOf(id), params)
  }

  /** 把一棵未绑定种子的树“接线”：噪声换成真实噪声，引用展开并共享 */
  wire(fn: DensityFunction): DensityFunction {
    return fn.mapAll(this.visitor)
  }

  /** 按 ID 取已绑定种子的密度函数 */
  get(id: string): DensityFunction {
    id = normalizeId(id)
    let fn = this.wired.get(id)
    if (fn === undefined) {
      fn = this.wire(this.parser.get(id))
      this.wired.set(id, fn)
    }
    return fn
  }
}
