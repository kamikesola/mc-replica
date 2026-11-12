import { clampedLerp } from '../math/Mth'
import type { RandomSource } from '../random/RandomSource'
import { XoroshiroRandomSource } from '../random/XoroshiroRandomSource'
import { PerlinNoise, wrap } from './PerlinNoise'

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i)

export interface BlendedNoiseParams {
  xzScale: number
  yScale: number
  xzFactor: number
  yFactor: number
  smearScaleMultiplier: number
}

/**
 * net.minecraft.world.level.levelgen.synth.BlendedNoise（JSON 类型 minecraft:old_blended_noise）
 *
 * 1.17 及以前的地形主噪声，1.18 起作为 overworld/base_3d_noise 保留：
 * 用 mainNoise 算出一个 0..1 的混合权重，在 minLimitNoise / maxLimitNoise 两个 16 层噪声之间插值。
 * 当权重已经 ≤0 或 ≥1 时跳过对应那一组，这是原版的性能优化，结果不变。
 */
export class BlendedNoise {
  private readonly xzMultiplier: number
  private readonly yMultiplier: number
  readonly maxValue: number

  static unseeded(params: BlendedNoiseParams): BlendedNoise {
    return new BlendedNoise(new XoroshiroRandomSource(0n), params)
  }

  private readonly minLimitNoise: PerlinNoise
  private readonly maxLimitNoise: PerlinNoise
  private readonly mainNoise: PerlinNoise

  constructor(
    random: RandomSource,
    readonly params: BlendedNoiseParams
  ) {
    this.minLimitNoise = PerlinNoise.createLegacyForBlendedNoise(random, range(-15, 0))
    this.maxLimitNoise = PerlinNoise.createLegacyForBlendedNoise(random, range(-15, 0))
    this.mainNoise = PerlinNoise.createLegacyForBlendedNoise(random, range(-7, 0))
    this.xzMultiplier = 684.412 * params.xzScale
    this.yMultiplier = 684.412 * params.yScale
    this.maxValue = this.minLimitNoise.maxBrokenValue(this.yMultiplier)
  }

  withNewRandom(random: RandomSource): BlendedNoise {
    return new BlendedNoise(random, this.params)
  }

  compute(blockX: number, blockY: number, blockZ: number): number {
    const { xzFactor, yFactor, smearScaleMultiplier } = this.params
    const d = blockX * this.xzMultiplier
    const e = blockY * this.yMultiplier
    const f = blockZ * this.xzMultiplier
    const g = d / xzFactor
    const h = e / yFactor
    const i = f / xzFactor
    const j = this.yMultiplier * smearScaleMultiplier
    const k = j / yFactor
    let l = 0.0
    let m = 0.0
    let n = 0.0
    let o = 1.0

    for (let p = 0; p < 8; p++) {
      const noise = this.mainNoise.getOctaveNoise(p)
      if (noise !== null) {
        n += noise.noise(wrap(g * o), wrap(h * o), wrap(i * o), k * o, h * o) / o
      }
      o /= 2.0
    }

    const q = (n / 10.0 + 1.0) / 2.0
    const bl2 = q >= 1.0
    const bl3 = q <= 0.0
    o = 1.0

    for (let r = 0; r < 16; r++) {
      const s = wrap(d * o)
      const t = wrap(e * o)
      const u = wrap(f * o)
      const v = j * o
      if (!bl2) {
        const noise = this.minLimitNoise.getOctaveNoise(r)
        if (noise !== null) l += noise.noise(s, t, u, v, e * o) / o
      }
      if (!bl3) {
        const noise = this.maxLimitNoise.getOctaveNoise(r)
        if (noise !== null) m += noise.noise(s, t, u, v, e * o) / o
      }
      o /= 2.0
    }

    return clampedLerp(l / 512.0, m / 512.0, q) / 128.0
  }
}
