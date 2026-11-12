import type { RandomSource } from '../random/RandomSource'
import { PerlinNoise } from './PerlinNoise'

/** worldgen/noise/*.json 的内容：{ "firstOctave": -9, "amplitudes": [1, 1, 2, …] } */
export interface NoiseParameters {
  firstOctave: number
  amplitudes: number[]
}

/** 让两个 PerlinNoise 的采样点错开的系数（一个“不整齐”的数，避免两层格点重合） */
const INPUT_FACTOR = 1.0181268882175227

/**
 * net.minecraft.world.level.levelgen.synth.NormalNoise
 *
 * 两个独立的 PerlinNoise 相加：第二个的坐标乘以 1.018…，
 * 再乘 valueFactor，把输出的标准差归一到约 1/3，
 * 这样所有噪声的取值范围大致都在 [-1, 1]，方便样条和阈值统一处理。
 */
export class NormalNoise {
  readonly valueFactor: number
  readonly first: PerlinNoise
  readonly second: PerlinNoise
  readonly maxValue: number

  static create(random: RandomSource, parameters: NoiseParameters): NormalNoise {
    return new NormalNoise(random, parameters, true)
  }

  static createLegacyNetherBiome(random: RandomSource, parameters: NoiseParameters): NormalNoise {
    return new NormalNoise(random, parameters, false)
  }

  private constructor(
    random: RandomSource,
    readonly parameters: NoiseParameters,
    useNewFactory: boolean
  ) {
    const { firstOctave, amplitudes } = parameters
    if (useNewFactory) {
      this.first = PerlinNoise.create(random, firstOctave, amplitudes)
      this.second = PerlinNoise.create(random, firstOctave, amplitudes)
    } else {
      this.first = PerlinNoise.createLegacyForLegacyNetherBiome(random, firstOctave, amplitudes)
      this.second = PerlinNoise.createLegacyForLegacyNetherBiome(random, firstOctave, amplitudes)
    }

    // 找到第一个和最后一个非零振幅，八度跨度越大，叠加后的方差越小
    let j = 2147483647
    let k = -2147483648
    amplitudes.forEach((d, l) => {
      if (d !== 0.0) {
        j = Math.min(j, l)
        k = Math.max(k, l)
      }
    })
    // 原版写的是 0.16666666666666666，即目标标准差 1/3 再除以 2（两个噪声相加）
    this.valueFactor = 0.16666666666666666 / expectedDeviation(k - j)
    this.maxValue = (this.first.maxValue + this.second.maxValue) * this.valueFactor
  }

  getValue(x: number, y: number, z: number): number {
    const d = x * INPUT_FACTOR
    const e = y * INPUT_FACTOR
    const f = z * INPUT_FACTOR
    return (this.first.getValue(x, y, z) + this.second.getValue(d, e, f)) * this.valueFactor
  }
}

function expectedDeviation(octaves: number): number {
  return 0.1 * (1.0 + 1.0 / (octaves + 1))
}
