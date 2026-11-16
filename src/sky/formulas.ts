/**
 * 昼夜和光照贴图的公式（v6），移植自原版 1.21.4 客户端。只有数学，不依赖 three，Worker 和测试里也能用。
 *
 * 时间：一天 24000 刻（20 刻 / 秒，现实里 20 分钟）。dayTime 0 是早上 6 点（太阳刚升起），6000 正午，18000 午夜。
 *
 *   timeOfDay(dayTime)   太阳的“角度”，0..1：0 正午，0.25 日落，0.5 午夜，0.75 日出。
 *                        不是匀速的——原版用一个余弦把白天和黑夜拉得一样长、黄昏过得快一点
 *   skyDarken            白天 1.0，夜里 0.2：天空光的亮度系数（光照贴图用）
 *   skyColor             群系的 sky_color × 一个按时间变化的系数（夜里变黑）
 *   fogColor             群系的 fog_color，同样随时间变暗；朝着太阳看时混进日出日落的颜色；再往天空色靠一点
 *   sunriseColor         日出日落时太阳那一侧天边的橙红色（只在太阳接近地平线时有）
 *   starBrightness       星星的亮度，夜里最多 0.5
 *
 * 光照贴图（lightmap）：16×16 张小图，横轴方块光 0..15、纵轴天空光 0..15，每格是那个亮度组合的颜色。
 * 每帧按时间重新算一次，方块的顶点颜色 = 贴图颜色 × 方向明暗 × AO。所以天黑的时候不用重建任何网格。
 */

const f32 = Math.fround
const TAU = Math.PI * 2

/** 原版 DimensionType 的固定时间：下界一直是 18000（“午夜”），末地 6000 */
export function fixedTime(settingsId: string): number | null {
  return /nether/.test(settingsId) ? 18000 : /end/.test(settingsId) ? 6000 : null
}

/** 原版 DimensionType.timeOfDay */
export function timeOfDay(dayTime: number): number {
  const d = frac(dayTime / 24000 - 0.25)
  const e = 0.5 - Math.cos(d * Math.PI) / 2
  return f32((d * 2 + e) / 3)
}

/** 太阳的角度（弧度），原版 Level.getSunAngle */
export const sunAngle = (t: number) => t * TAU

/** 月相 0..7（原版 DimensionType.moonPhase：每天换一个） */
export const moonPhase = (dayTime: number) => ((Math.floor(dayTime / 24000) % 8) + 8) % 8

/** 原版 ClientLevel.getSkyDarken（不下雨） */
export function skyDarken(t: number): number {
  let g = 1 - (Math.cos(t * TAU) * 2 + 0.2)
  g = clamp(g, 0, 1)
  g = 1 - g
  return g * 0.8 + 0.2
}

/** 天空色的时间系数（原版 ClientLevel.getSkyColor 里的 h） */
export function skyBrightness(t: number): number {
  return clamp(Math.cos(t * TAU) * 2 + 0.5, 0, 1)
}

/** 星星亮度（原版 ClientLevel.getStarBrightness） */
export function starBrightness(t: number): number {
  const g = clamp(1 - (Math.cos(t * TAU) * 2 + 0.25), 0, 1)
  return g * g * 0.5
}

/** 日出日落的颜色 [r, g, b, a]（原版 DimensionSpecialEffects.getSunriseOrSunsetColor），不是黄昏时返回 null */
export function sunriseColor(t: number): [number, number, number, number] | null {
  const f = Math.cos(t * TAU)
  if (f < -0.4 || f > 0.4) return null
  const h = (f / 0.4) * 0.5 + 0.5
  let i = 1 - (1 - Math.sin(h * Math.PI)) * 0.99
  i *= i
  return [h * 0.3 + 0.7, h * h * 0.7 + 0.2, 0.2, i]
}

export type Rgb = [number, number, number]

export const rgb = (c: number): Rgb => [((c >> 16) & 255) / 255, ((c >> 8) & 255) / 255, (c & 255) / 255]

/**
 * 原版 CubicSampler.gaussianSampleVec3：周围 6×6×6 个点按 [1,4,6,4,1] 的核加权平均（核随小数部分平移）。
 * 天空色、雾色用它在玩家周围的群系之间平滑过渡
 */
const KERNEL = [0, 1, 4, 6, 4, 1, 0]
export function gaussianSampleRgb(x: number, y: number, z: number, fetch: (qx: number, qy: number, qz: number) => number): Rgb {
  const i = Math.floor(x)
  const j = Math.floor(y)
  const k = Math.floor(z)
  const d = x - i
  const e = y - j
  const f = z - k
  let g = 0
  const out: Rgb = [0, 0, 0]
  for (let l = 0; l < 6; l++) {
    const h = lerp(d, KERNEL[l + 1], KERNEL[l])
    for (let n = 0; n < 6; n++) {
      const o = lerp(e, KERNEL[n + 1], KERNEL[n])
      for (let q = 0; q < 6; q++) {
        const r = lerp(f, KERNEL[q + 1], KERNEL[q])
        const t = h * o * r
        if (t === 0) continue
        g += t
        const c = rgb(fetch(i - 2 + l, j - 2 + n, k - 2 + q))
        out[0] += c[0] * t
        out[1] += c[1] * t
        out[2] += c[2] * t
      }
    }
  }
  return [out[0] / g, out[1] / g, out[2] / g]
}

/** 维度的天空效果（原版 DimensionSpecialEffects）：主世界、下界、末地 */
export type Dimension = 'overworld' | 'nether' | 'end'
export const dimensionOf = (settingsId: string): Dimension => (/nether/.test(settingsId) ? 'nether' : /end/.test(settingsId) ? 'end' : 'overworld')

/** 天空色（原版 ClientLevel.getSkyColor，不下雨、没有闪电） */
export function skyColor(biomeSky: Rgb, t: number): Rgb {
  const h = skyBrightness(t)
  return [biomeSky[0] * h, biomeSky[1] * h, biomeSky[2] * h]
}

/**
 * 雾色 = 清屏色（原版 FogRenderer.computeFogColor，人在空气里）
 * @param look   视线方向（单位向量）
 * @param chunks 视距（区块）
 */
export function fogColor(dim: Dimension, biomeFog: Rgb, sky: Rgb, t: number, look: [number, number, number], chunks: number, eyeY: number, minY: number): Rgb {
  const brightness = skyBrightness(t)
  let c: Rgb
  // DimensionSpecialEffects.getBrightnessDependentFogColor
  if (dim === 'overworld') c = [biomeFog[0] * (brightness * 0.94 + 0.06), biomeFog[1] * (brightness * 0.94 + 0.06), biomeFog[2] * (brightness * 0.91 + 0.09)]
  else if (dim === 'end') c = [biomeFog[0] * 0.15, biomeFog[1] * 0.15, biomeFog[2] * 0.15]
  else c = [...biomeFog]
  // 朝太阳那一侧看时，雾里混进日出日落的颜色
  if (chunks >= 4 && dim === 'overworld') {
    const side = Math.sin(sunAngle(t)) > 0 ? -1 : 1
    let dot = look[0] * side
    if (dot < 0) dot = 0
    const sr = sunriseColor(t)
    if (dot > 0 && sr) {
      dot *= sr[3]
      for (let i = 0; i < 3; i++) c[i] = c[i] * (1 - dot) + sr[i] * dot
    }
  }
  // 视距越远，雾越接近天空色
  if (dim !== 'nether') {
    let v = 0.25 + (0.75 * chunks) / 32
    v = 1 - Math.pow(v, 0.25)
    for (let i = 0; i < 3; i++) c[i] += (sky[i] - c[i]) * v
  }
  // 越接近世界底部越黑（原版 clearColorScale：主世界 1/32，其他维度 1）
  let dark = (eyeY - minY) * (dim === 'overworld' ? 0.03125 : 1)
  if (dark < 1) {
    if (dark < 0) dark = 0
    dark *= dark
    for (let i = 0; i < 3; i++) c[i] *= dark
  }
  return c
}

export interface LightmapInput {
  dim: Dimension
  /** 时间（timeOfDay） */
  t: number
  /** 方块光的闪烁（原版 blockLightRedFlicker，−0.1..0.1 附近随机游走） */
  flicker: number
  /** 亮度设置（原版 options.gamma：0 “昏暗”，0.5 默认，1 “明亮”） */
  gamma: number
}

/**
 * 光照贴图 16×16（原版 1.21.4 LightTexture.updateLightTexture + shaders/core/lightmap.fsh）。
 * 返回 RGB 字节，下标 (sky * 16 + block) * 3
 */
export function lightmap(p: LightmapInput, out = new Uint8Array(16 * 16 * 3)): Uint8Array {
  const darken = skyDarken(p.t)
  const skyFactor = darken * 0.95 + 0.05
  // 天空光的颜色：白天白色，夜里偏蓝（原版 (darken, darken, 1) 往白色插 35%）
  const skyCol: Rgb = [lerp(0.35, darken, 1), lerp(0.35, darken, 1), 1]
  const blockFactor = p.flicker + 1.5
  const ambient = p.dim === 'nether' ? 0.1 : 0
  const bright = p.dim === 'end' // 原版 forceBrightLightmap：末地
  const brightness = (level: number) => {
    const curved = level / (4 - 3 * level)
    return lerp(ambient, curved, 1)
  }
  for (let sky = 0; sky < 16; sky++)
    for (let block = 0; block < 16; block++) {
      const bl = brightness(block / 15) * blockFactor
      const sk = brightness(sky / 15) * skyFactor
      // 方块光是暖色：越暗越偏黄
      let c: Rgb = [bl, bl * ((bl * 0.6 + 0.4) * 0.6 + 0.4), bl * (bl * bl * 0.6 + 0.4)]
      if (bright) {
        c = c.map((v, i) => clamp(lerp(0.25, v, [0.99, 1.12, 1.0][i]), 0, 1)) as Rgb
      } else {
        c = c.map((v, i) => lerp(0.04, v + skyCol[i] * sk, 0.75)) as Rgb
        c = c.map((v) => clamp(v, 0, 1)) as Rgb
      }
      // 亮度设置：往 1 - (1 - x)^4 靠
      c = c.map((v) => lerp(p.gamma, v, 1 - Math.pow(1 - v, 4))) as Rgb
      c = c.map((v) => clamp(lerp(0.04, v, 0.75), 0, 1)) as Rgb
      const o = (sky * 16 + block) * 3
      out[o] = Math.round(c[0] * 255)
      out[o + 1] = Math.round(c[1] * 255)
      out[o + 2] = Math.round(c[2] * 255)
    }
  return out
}

/** 下一刻的方块光闪烁（原版 LightTexture.tick） */
export function nextFlicker(flicker: number, random = Math.random): number {
  flicker += (random() - random()) * random() * random() * 0.1
  return flicker * 0.9
}

/**
 * 1500 颗星星的位置（原版 SkyRenderer.buildStars，随机种子 10842）。
 * 返回每颗星的 4 个角（x, y, z ×4），在半径 100 的球面上；不合格的随机点被跳过，所以实际不到 1500 颗
 */
export function starQuads(random: { nextFloat(): number; nextDouble(): number }): Float32Array {
  const out: number[] = []
  for (let i = 0; i < 1500; i++) {
    const g = random.nextFloat() * 2 - 1
    const h = random.nextFloat() * 2 - 1
    const j = random.nextFloat() * 2 - 1
    const k = 0.15 + random.nextFloat() * 0.1
    const l = g * g + h * h + j * j
    if (l <= 0.010000001 || l >= 1) continue
    const len = Math.sqrt(l)
    const v = [(g / len) * 100, (h / len) * 100, (j / len) * 100]
    const m = random.nextDouble() * Math.PI * 2
    // Matrix3f().rotateTowards(-v, up).rotateZ(-m)：本地 z 轴指向 -v（朝球心），在切平面里转 m
    const zAxis = norm([-v[0], -v[1], -v[2]])
    const xAxis = norm(cross([0, 1, 0], zAxis))
    const yAxis = cross(zAxis, xAxis)
    const cm = Math.cos(-m)
    const sm = Math.sin(-m)
    for (const [a, b] of [
      [k, -k],
      [k, k],
      [-k, k],
      [-k, -k]
    ]) {
      // 先绕 z 转，再变换到切平面
      const rx = a * cm - b * sm
      const ry = a * sm + b * cm
      out.push(v[0] + xAxis[0] * rx + yAxis[0] * ry, v[1] + xAxis[1] * rx + yAxis[1] * ry, v[2] + xAxis[2] * rx + yAxis[2] * ry)
    }
  }
  return Float32Array.from(out)
}

/**
 * 原版 FogRenderer.setupFog 的地形雾范围（方块）：视距的最后 1/10（4..64 格）里从清楚变成雾色；
 * 下界一直有雾：视距的 5% 开始，到 min(视距, 192) 的一半全是雾
 */
export function terrainFog(dim: Dimension, renderDistance: number): { start: number; end: number } {
  if (dim === 'nether') return { start: renderDistance * 0.05, end: Math.min(renderDistance, 192) * 0.5 }
  const h = clamp(renderDistance / 10, 4, 64)
  return { start: renderDistance - h, end: renderDistance }
}

const frac = (x: number) => x - Math.floor(x)
const clamp = (x: number, a: number, b: number) => (x < a ? a : x > b ? b : x)
/** 原版 Mth.lerp(delta, a, b) */
const lerp = (d: number, a: number, b: number) => a + d * (b - a)
const norm = (v: number[]) => {
  const l = Math.hypot(v[0], v[1], v[2])
  return [v[0] / l, v[1] / l, v[2] / l]
}
const cross = (a: number[], b: number[]) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
