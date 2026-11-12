import { floor, lerp3, smoothstep } from '../math/Mth'
import type { RandomSource } from '../random/RandomSource'

/**
 * SimplexNoise.GRADIENT：立方体 12 条棱的中点方向，再补 4 个凑满 16 个（下标 & 15）。
 * 展平成一维数组，第 i 个梯度是 [3i, 3i+1, 3i+2]。
 */
const GRADIENT = new Float64Array([
  1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1,
  -1, 0, -1, -1, 1, 1, 0, 0, -1, 1, -1, 1, 0, 0, -1, -1
])

function gradDot(gradIndex: number, x: number, y: number, z: number): number {
  const g = (gradIndex & 15) * 3
  return GRADIENT[g] * x + GRADIENT[g + 1] * y + GRADIENT[g + 2] * z
}

/** float 字面量 1.0E-7F 转成 double 后的值 */
const Y_EPSILON = Math.fround(1.0e-7)

/**
 * net.minecraft.world.level.levelgen.synth.ImprovedNoise
 *
 * Ken Perlin 2002 年的 “Improved Noise”：
 *  1. 坐标先加上随机偏移 xo/yo/zo（让不同种子的噪声不重合）；
 *  2. 用 256 项的排列表 p 给整数格点哈希出梯度；
 *  3. 8 个角各自 “梯度 · 到该角的向量”；
 *  4. 用 smoothstep 权重做三线性插值。
 */
export class ImprovedNoise {
  private readonly p = new Uint8Array(256)
  readonly xo: number
  readonly yo: number
  readonly zo: number

  constructor(random: RandomSource) {
    this.xo = random.nextDouble() * 256.0
    this.yo = random.nextDouble() * 256.0
    this.zo = random.nextDouble() * 256.0

    for (let i = 0; i < 256; i++) this.p[i] = i
    // Fisher–Yates 洗牌，顺序和原版完全一致，才能复现同一张表
    for (let i = 0; i < 256; i++) {
      const j = random.nextInt(256 - i)
      const b = this.p[i]
      this.p[i] = this.p[i + j]
      this.p[i + j] = b
    }
  }

  /**
   * yScale / yMax 是给 BlendedNoise 用的“Y 方向抹平”参数，普通采样传 0。
   * 原版注释写的是 deprecated，但 1.21 的 old_blended_noise 仍然依赖它。
   */
  noise(x: number, y: number, z: number, yScale = 0, yMax = 0): number {
    const d = x + this.xo
    const e = y + this.yo
    const f = z + this.zo
    const i = floor(d)
    const j = floor(e)
    const k = floor(f)
    const g = d - i
    const h = e - j
    const l = f - k
    let o: number
    if (yScale !== 0.0) {
      const m = yMax >= 0.0 && yMax < h ? yMax : h
      o = floor(m / yScale + Y_EPSILON) * yScale
    } else {
      o = 0.0
    }
    return this.sampleAndLerp(i, j, k, g, h - o, l, h)
  }

  private P(index: number): number {
    return this.p[index & 0xff]
  }

  private sampleAndLerp(
    gridX: number,
    gridY: number,
    gridZ: number,
    deltaX: number,
    weirdDeltaY: number,
    deltaZ: number,
    deltaY: number
  ): number {
    const i = this.P(gridX)
    const j = this.P(gridX + 1)
    const k = this.P(i + gridY)
    const l = this.P(i + gridY + 1)
    const m = this.P(j + gridY)
    const n = this.P(j + gridY + 1)
    const d = gradDot(this.P(k + gridZ), deltaX, weirdDeltaY, deltaZ)
    const e = gradDot(this.P(m + gridZ), deltaX - 1.0, weirdDeltaY, deltaZ)
    const f = gradDot(this.P(l + gridZ), deltaX, weirdDeltaY - 1.0, deltaZ)
    const g = gradDot(this.P(n + gridZ), deltaX - 1.0, weirdDeltaY - 1.0, deltaZ)
    const h = gradDot(this.P(k + gridZ + 1), deltaX, weirdDeltaY, deltaZ - 1.0)
    const o = gradDot(this.P(m + gridZ + 1), deltaX - 1.0, weirdDeltaY, deltaZ - 1.0)
    const p = gradDot(this.P(l + gridZ + 1), deltaX, weirdDeltaY - 1.0, deltaZ - 1.0)
    const q = gradDot(this.P(n + gridZ + 1), deltaX - 1.0, weirdDeltaY - 1.0, deltaZ - 1.0)
    const r = smoothstep(deltaX)
    const s = smoothstep(deltaY)
    const t = smoothstep(deltaZ)
    return lerp3(r, s, t, d, e, f, g, h, o, p, q)
  }
}
