import { lfloor } from '../math/Mth'
import type { RandomSource } from '../random/RandomSource'
import { ImprovedNoise } from './ImprovedNoise'

/**
 * net.minecraft.world.level.levelgen.synth.PerlinNoise
 *
 * 多个 ImprovedNoise 按“八度（octave）”叠加：
 * 第 i 层的频率是 2^(firstOctave+i)，振幅是 amplitudes[i] × 2^(i 层的衰减)。
 * 振幅为 0 的层不会创建（但 legacy 路径要空转随机数保持序列一致）。
 */
export class PerlinNoise {
  /** 下标 0 是频率最低的一层；为 null 表示振幅为 0 */
  readonly noiseLevels: (ImprovedNoise | null)[]
  readonly firstOctave: number
  readonly amplitudes: readonly number[]
  private readonly lowestFreqValueFactor: number
  private readonly lowestFreqInputFactor: number
  readonly maxValue: number

  /** 新路径：用位置随机工厂按 "octave_<n>" 派生每一层，层与层之间互不影响 */
  static create(random: RandomSource, firstOctave: number, amplitudes: readonly number[]): PerlinNoise {
    return new PerlinNoise(random, firstOctave, amplitudes, true)
  }

  /** 旧路径（old_blended_noise 用）：一个随机源顺序生成所有层 */
  static createLegacyForBlendedNoise(random: RandomSource, octaves: number[]): PerlinNoise {
    const [first, amps] = makeAmplitudes(octaves)
    return new PerlinNoise(random, first, amps, false)
  }

  static createLegacyForLegacyNetherBiome(
    random: RandomSource,
    firstOctave: number,
    amplitudes: readonly number[]
  ): PerlinNoise {
    return new PerlinNoise(random, firstOctave, amplitudes, false)
  }

  private constructor(
    random: RandomSource,
    firstOctave: number,
    amplitudes: readonly number[],
    useNewFactory: boolean
  ) {
    this.firstOctave = firstOctave
    this.amplitudes = amplitudes
    const i = amplitudes.length
    const j = -firstOctave
    this.noiseLevels = new Array<ImprovedNoise | null>(i).fill(null)

    if (useNewFactory) {
      const factory = random.forkPositional()
      for (let k = 0; k < i; k++) {
        if (amplitudes[k] !== 0.0) {
          const l = firstOctave + k
          this.noiseLevels[k] = new ImprovedNoise(factory.fromHashOf('octave_' + l))
        }
      }
    } else {
      // 先生成频率最高的那层（octave 0），再往低频方向逐层生成
      const improvedNoise = new ImprovedNoise(random)
      if (j >= 0 && j < i) {
        if (amplitudes[j] !== 0.0) this.noiseLevels[j] = improvedNoise
      }
      for (let k = j - 1; k >= 0; k--) {
        if (k < i) {
          if (amplitudes[k] !== 0.0) this.noiseLevels[k] = new ImprovedNoise(random)
          else skipOctave(random)
        } else {
          skipOctave(random)
        }
      }
      const created = this.noiseLevels.filter((n) => n !== null).length
      const expected = amplitudes.filter((a) => a !== 0.0).length
      if (created !== expected) {
        throw new Error('Failed to create correct number of noise levels for given non-zero amplitudes')
      }
      if (j < i - 1) throw new Error('Positive octaves are temporarily disabled')
    }

    this.lowestFreqInputFactor = Math.pow(2.0, -j)
    this.lowestFreqValueFactor = Math.pow(2.0, i - 1) / (Math.pow(2.0, i) - 1.0)
    this.maxValue = this.edgeValue(2.0)
  }

  getValue(x: number, y: number, z: number): number {
    return this.getValueFull(x, y, z, 0.0, 0.0, false)
  }

  getValueFull(x: number, y: number, z: number, yScale: number, yMax: number, useFixedY: boolean): number {
    let d = 0.0
    let e = this.lowestFreqInputFactor
    let f = this.lowestFreqValueFactor
    for (let i = 0; i < this.noiseLevels.length; i++) {
      const n = this.noiseLevels[i]
      if (n !== null) {
        const g = n.noise(wrap(x * e), useFixedY ? -n.yo : wrap(y * e), wrap(z * e), yScale * e, yMax * e)
        d += this.amplitudes[i] * g * f
      }
      e *= 2.0
      f /= 2.0
    }
    return d
  }

  /** 从频率最高的一层往回数：i=0 是最高频 */
  getOctaveNoise(i: number): ImprovedNoise | null {
    return this.noiseLevels[this.noiseLevels.length - 1 - i]
  }

  maxBrokenValue(y: number): number {
    return this.edgeValue(y + 2.0)
  }

  private edgeValue(multiplier: number): number {
    let d = 0.0
    let e = this.lowestFreqValueFactor
    for (let i = 0; i < this.noiseLevels.length; i++) {
      if (this.noiseLevels[i] !== null) d += this.amplitudes[i] * multiplier * e
      e /= 2.0
    }
    return d
  }
}

/**
 * 空转一个 ImprovedNoise 会消耗的随机数：3 个 nextDouble（Legacy 下每个调用两次 next）
 * + 256 次洗牌 nextInt = 6 + 256 = 262。
 */
function skipOctave(random: RandomSource): void {
  random.consumeCount(262)
}

/** 坐标过大时折回到 ±2^24 附近，避免 double 精度丢失（远方“条纹地形”的来源之一） */
export function wrap(value: number): number {
  return value - lfloor(value / 3.3554432e7 + 0.5) * 3.3554432e7
}

/** 例如 octaves = [-15..0] → firstOctave = -15，amplitudes = 16 个 1.0 */
function makeAmplitudes(octaves: number[]): [number, number[]] {
  const sorted = [...new Set(octaves)].sort((a, b) => a - b)
  if (sorted.length === 0) throw new Error('Need some octaves!')
  const i = -sorted[0]
  const j = sorted[sorted.length - 1]
  const k = i + j + 1
  if (k < 1) throw new Error('Total number of octaves needs to be >= 1')
  const list = new Array<number>(k).fill(0.0)
  for (const l of sorted) list[l + i] = 1.0
  return [-i, list]
}
