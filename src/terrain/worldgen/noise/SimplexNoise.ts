import { floor } from '../math/Mth'
import type { RandomSource } from '../random/RandomSource'

/**
 * net.minecraft.world.level.levelgen.synth.SimplexNoise（只移植了 2D 部分）
 *
 * 1.21.1 的世界生成里只剩一个地方在用它：末地外岛（end_islands 密度函数）。
 * 构造方式和 ImprovedNoise 一样（3 个偏移 + 洗牌），但 2D 采样不加偏移量——原版就是这么写的。
 */

const GRADIENT = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
  [1, 1, 0], [0, -1, 1], [-1, 1, 0], [0, -1, -1]
]

const SQRT_3 = Math.sqrt(3.0)
/** 把正方形网格“斜切”成三角形网格的系数 */
const F2 = 0.5 * (SQRT_3 - 1.0)
const G2 = (3.0 - SQRT_3) / 6.0

export class SimplexNoise {
  private readonly p = new Int32Array(512)
  readonly xo: number
  readonly yo: number
  readonly zo: number

  constructor(random: RandomSource) {
    this.xo = random.nextDouble() * 256.0
    this.yo = random.nextDouble() * 256.0
    this.zo = random.nextDouble() * 256.0
    for (let i = 0; i < 256; i++) this.p[i] = i
    for (let i = 0; i < 256; i++) {
      const j = random.nextInt(256 - i)
      const k = this.p[i]
      this.p[i] = this.p[j + i]
      this.p[j + i] = k
    }
  }

  private P(i: number): number {
    return this.p[i & 0xff]
  }

  private cornerNoise(g: number, x: number, y: number, z: number, offset: number): number {
    let d = offset - x * x - y * y - z * z
    if (d < 0.0) return 0.0
    d *= d
    const v = GRADIENT[g]
    return d * d * (v[0] * x + v[1] * y + v[2] * z)
  }

  getValue(x: number, y: number): number {
    const d = (x + y) * F2
    const i = floor(x + d)
    const j = floor(y + d)
    const e = (i + j) * G2
    const h = x - (i - e)
    const k = y - (j - e)
    // 落在两个三角形中的哪一个
    const [l, m] = h > k ? [1, 0] : [0, 1]
    const n = h - l + G2
    const o = k - m + G2
    const p = h - 1.0 + 2.0 * G2
    const q = k - 1.0 + 2.0 * G2
    const r = i & 0xff
    const s = j & 0xff
    const t = this.P(r + this.P(s)) % 12
    const u = this.P(r + l + this.P(s + m)) % 12
    const v = this.P(r + 1 + this.P(s + 1)) % 12
    return 70.0 * (this.cornerNoise(t, h, k, 0.0, 0.5) + this.cornerNoise(u, n, o, 0.0, 0.5) + this.cornerNoise(v, p, q, 0.0, 0.5))
  }
}
