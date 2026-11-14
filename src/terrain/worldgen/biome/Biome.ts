import { LegacyRandomSource } from '../random/LegacyRandomSource'
import { PerlinSimplexNoise } from '../noise/PerlinSimplexNoise'

/**
 * 生物群系的数据（worldgen/biome/*.json）和由它算出来的温度、颜色。
 *
 * v4 用到的字段：
 *   temperature / downfall      温度、湿度：决定草和树叶的颜色、会不会下雪
 *   temperature_modifier        "frozen"：冰冻海洋，温度按噪声忽高忽低（海面上一块块的冰）
 *   effects.water_color         水的颜色
 *   effects.grass_color / foliage_color          直接指定的草 / 树叶颜色（恶地、沼泽等）
 *   effects.grass_color_modifier                 "swamp"（两种绿色按噪声交替）/ "dark_forest"（偏暗）
 */
export interface BiomeData {
  id: string
  temperature: number
  downfall: number
  temperatureModifier: 'none' | 'frozen'
  waterColor: number
  grassColor?: number
  foliageColor?: number
  grassColorModifier: 'none' | 'swamp' | 'dark_forest'
}

/** 没有原版群系数据时的默认值（温度 0.8、湿度 0.4，和平原一样） */
export function defaultBiome(id: string): BiomeData {
  return { id, temperature: 0.8, downfall: 0.4, temperatureModifier: 'none', waterColor: 0x3f76e4, grassColorModifier: 'none' }
}

export function parseBiome(id: string, json: unknown): BiomeData {
  const o = json as Record<string, unknown>
  const effects = (o.effects ?? {}) as Record<string, unknown>
  return {
    id,
    temperature: Number(o.temperature ?? 0.8),
    downfall: Number(o.downfall ?? 0.4),
    temperatureModifier: o.temperature_modifier === 'frozen' ? 'frozen' : 'none',
    waterColor: Number(effects.water_color ?? 0x3f76e4),
    grassColor: effects.grass_color === undefined ? undefined : Number(effects.grass_color),
    foliageColor: effects.foliage_color === undefined ? undefined : Number(effects.foliage_color),
    grassColorModifier: effects.grass_color_modifier === 'swamp' ? 'swamp' : effects.grass_color_modifier === 'dark_forest' ? 'dark_forest' : 'none'
  }
}

// 原版写死种子的三个噪声（Biome 类的静态字段）
const TEMPERATURE_NOISE = new PerlinSimplexNoise(new LegacyRandomSource(1234n), [0])
const FROZEN_TEMPERATURE_NOISE = new PerlinSimplexNoise(new LegacyRandomSource(3456n), [-2, -1, 0])
export const BIOME_INFO_NOISE = new PerlinSimplexNoise(new LegacyRandomSource(2345n), [0])

const f32 = Math.fround

/**
 * 某个位置的温度（原版 Biome.getHeightAdjustedTemperature，float 运算）：
 *   冰冻海洋：按噪声，有的地方温度变成 0.2
 *   y > 80：越高越冷，每 40 格降 0.05，再加一点噪声
 */
export function temperatureAt(b: BiomeData, x: number, y: number, z: number): number {
  let f = f32(b.temperature)
  if (b.temperatureModifier === 'frozen') {
    const d = FROZEN_TEMPERATURE_NOISE.getValue(x * 0.05, z * 0.05, false) * 7.0
    const e = BIOME_INFO_NOISE.getValue(x * 0.2, z * 0.2, false)
    if (d + e < 0.3) {
      const h = BIOME_INFO_NOISE.getValue(x * 0.09, z * 0.09, false)
      if (h < 0.8) f = f32(0.2)
    }
  }
  if (y > 80) {
    const g = f32(TEMPERATURE_NOISE.getValue(f32(x / 8), f32(z / 8), false) * 8.0)
    return f32(f - f32(f32(f32(g + y) - 80) * f32(0.05)) / 40)
  }
  return f
}

/** 冷到会下雪（原版 coldEnoughToSnow：温度 < 0.15） */
export function coldEnoughToSnow(b: BiomeData, x: number, y: number, z: number): boolean {
  return temperatureAt(b, x, y, z) < f32(0.15)
}

// ---------------------------------------------------------------- 颜色

const pack = (r: number, g: number, b: number) => (Math.round(r) << 16) | (Math.round(g) << 8) | Math.round(b)

/**
 * 原版的草 / 树叶颜色来自一张 256×256 的颜色图（colormap/grass.png、foliage.png），按温度 t 和 u = 湿度 × t 查。
 * 那两张图是 Mojang 的资源，不能放进仓库，所以这里用一个二次多项式近似：
 *   通道 = a0 + a1·t + a2·u + a3·t² + a4·u² + a5·t·u
 * 系数是用 13 个已知群系颜色（平原、森林、桦木林、丛林、稀疏丛林、针叶林、雪原、沙漠、草甸、蘑菇岛、
 * 风袭丘陵、裸岩山峰、海洋）最小二乘拟合的，这 13 个群系的误差：草 ≤ 1 个色阶，树叶 ≤ 2 个色阶。
 */
const GRASS_FIT = [
  [127.948, 63.292, -22.644, -0.338, 4.082, -101.523],
  [180.283, 5.097, 1.642, -2.313, -1.096, 21.42],
  [150.821, -62.439, -13.644, -3.338, -0.607, -20.112]
]
const FOLIAGE_FIT = [
  [96.062, 79.14, -29.359, -1.242, -3.489, -116.037],
  [161.251, 9.346, -5.925, -6.515, 3.828, 30.614],
  [123.311, -74.385, -17.5, -6.79, -0.891, -24.342]
]
function colormap(temperature: number, downfall: number, fit: number[][]): number {
  const t = Math.min(1, Math.max(0, temperature))
  const u = Math.min(1, Math.max(0, downfall)) * t // 原版：湿度先乘温度
  const f = [1, t, u, t * t, u * u, t * u]
  const [r, g, b] = fit.map((a) => Math.min(255, Math.max(0, a.reduce((s, k, i) => s + k * f[i], 0))))
  return pack(r, g, b)
}

export function grassColor(b: BiomeData, x: number, z: number): number {
  if (b.grassColorModifier === 'swamp') {
    // 沼泽：两种绿色按噪声交替
    return BIOME_INFO_NOISE.getValue(x * 0.0225, z * 0.0225, false) < -0.1 ? 0x4c763c : 0x6a7039
  }
  const base = b.grassColor ?? colormap(b.temperature, b.downfall, GRASS_FIT)
  if (b.grassColorModifier === 'dark_forest') return ((base & 0xfefefe) + 0x28340a) >> 1
  return base
}

export function foliageColor(b: BiomeData): number {
  return b.foliageColor ?? colormap(b.temperature, b.downfall, FOLIAGE_FIT)
}
