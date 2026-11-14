import { Parameter, parameters, type ParameterPoint } from './Climate'

/**
 * 主世界的生物群系参数表，移植自原版 1.21.1 的 OverworldBiomeBuilder。
 *
 * 这张表不在数据包里（数据包只写了 "preset": "minecraft:overworld"），是 Java 代码生成的。
 * 思路是把 6 维气候空间切成格子：
 *
 *   温度 5 档 × 湿度 5 档        → 决定“哪一类”群系（雪原 / 平原 / 森林 / 热带 / 沙漠）
 *   大陆性：蘑菇岛 / 深海 / 海洋 / 海岸 / 近内陆 / 中内陆 / 远内陆
 *   侵蚀度 7 档                   → 越小越陡（山），越大越平（平原、沼泽）
 *   怪异度：切成 13 段“片”         → 山峰 / 高地 / 中间 / 低地 / 河谷；正负决定用不用变种
 *
 * 表的顺序和原版完全相同：查表时距离相同取第一个，顺序不同结果就可能不同。
 * 有原版数据生成器导出的 biome_parameters 报告时，tests/biome.test.ts 会逐条比对。
 */

type Entry = [ParameterPoint, string]
type Grid = (string | null)[][]

const s = Parameter.span
const B = (name: string) => `minecraft:${name}`

const FULL_RANGE = s(-1.0, 1.0)
const temperatures = [s(-1.0, -0.45), s(-0.45, -0.15), s(-0.15, 0.2), s(0.2, 0.55), s(0.55, 1.0)]
const humidities = [s(-1.0, -0.35), s(-0.35, -0.1), s(-0.1, 0.1), s(0.1, 0.3), s(0.3, 1.0)]
const erosions = [s(-1.0, -0.78), s(-0.78, -0.375), s(-0.375, -0.2225), s(-0.2225, 0.05), s(0.05, 0.45), s(0.45, 0.55), s(0.55, 1.0)]
const FROZEN_RANGE = temperatures[0]
const UNFROZEN_RANGE = s(temperatures[1], temperatures[4])
const mushroomFieldsContinentalness = s(-1.2, -1.05)
const deepOceanContinentalness = s(-1.05, -0.455)
const oceanContinentalness = s(-0.455, -0.19)
const coastContinentalness = s(-0.19, -0.11)
const inlandContinentalness = s(-0.11, 0.55)
const nearInlandContinentalness = s(-0.11, 0.03)
const midInlandContinentalness = s(0.03, 0.3)
const farInlandContinentalness = s(0.3, 1.0)

const OCEANS = [
  ['deep_frozen_ocean', 'deep_cold_ocean', 'deep_ocean', 'deep_lukewarm_ocean', 'warm_ocean'],
  ['frozen_ocean', 'cold_ocean', 'ocean', 'lukewarm_ocean', 'warm_ocean']
].map((r) => r.map(B))

// 行：温度 0..4（冷 → 热）；列：湿度 0..4（干 → 湿）
const grid = (rows: (string | null)[][]): Grid => rows.map((r) => r.map((n) => (n === null ? null : B(n))))
const MIDDLE_BIOMES = grid([
  ['snowy_plains', 'snowy_plains', 'snowy_plains', 'snowy_taiga', 'taiga'],
  ['plains', 'plains', 'forest', 'taiga', 'old_growth_spruce_taiga'],
  ['flower_forest', 'plains', 'forest', 'birch_forest', 'dark_forest'],
  ['savanna', 'savanna', 'forest', 'jungle', 'jungle'],
  ['desert', 'desert', 'desert', 'desert', 'desert']
])
const MIDDLE_BIOMES_VARIANT = grid([
  ['ice_spikes', null, 'snowy_taiga', null, null],
  [null, null, null, null, 'old_growth_pine_taiga'],
  ['sunflower_plains', null, null, 'old_growth_birch_forest', null],
  [null, null, 'plains', 'sparse_jungle', 'bamboo_jungle'],
  [null, null, null, null, null]
])
const PLATEAU_BIOMES = grid([
  ['snowy_plains', 'snowy_plains', 'snowy_plains', 'snowy_taiga', 'snowy_taiga'],
  ['meadow', 'meadow', 'forest', 'taiga', 'old_growth_spruce_taiga'],
  ['meadow', 'meadow', 'meadow', 'meadow', 'dark_forest'],
  ['savanna_plateau', 'savanna_plateau', 'forest', 'forest', 'jungle'],
  ['badlands', 'badlands', 'badlands', 'wooded_badlands', 'wooded_badlands']
])
const PLATEAU_BIOMES_VARIANT = grid([
  ['ice_spikes', null, null, null, null],
  ['cherry_grove', null, 'meadow', 'meadow', 'old_growth_pine_taiga'],
  ['cherry_grove', 'cherry_grove', 'forest', 'birch_forest', null],
  [null, null, null, null, null],
  ['eroded_badlands', 'eroded_badlands', null, null, null]
])
const SHATTERED_BIOMES = grid([
  ['windswept_gravelly_hills', 'windswept_gravelly_hills', 'windswept_hills', 'windswept_forest', 'windswept_forest'],
  ['windswept_gravelly_hills', 'windswept_gravelly_hills', 'windswept_hills', 'windswept_forest', 'windswept_forest'],
  ['windswept_hills', 'windswept_hills', 'windswept_hills', 'windswept_forest', 'windswept_forest'],
  [null, null, null, null, null],
  [null, null, null, null, null]
])

/**
 * paleGarden：1.21.4 起原版在 PLATEAU_BIOMES_VARIANT[2][4]（温和、最湿、怪异度 ≥ 0 的高地）放了苍白之园，
 * 1.21.1 这一格是 null（退回黑森林）。数据包里有 minecraft:pale_garden 时由调用方打开。
 * 已用 1.21.4 服务端导出的 biome_parameters 报告核对：打开后 7593 项逐项一致。
 */
export function overworldBiomeParameters(opts: { paleGarden?: boolean } = {}): Entry[] {
  const out: Entry[] = []
  const PLATEAU_VARIANT = opts.paleGarden ? PLATEAU_BIOMES_VARIANT.map((r, i) => (i === 2 ? [...r.slice(0, 4), B('pale_garden')] : r)) : PLATEAU_BIOMES_VARIANT

  // 地表群系：深度取 0 和 1 两个点（地面和地下一点点都算这个群系）
  const surface = (t: Parameter, h: Parameter, c: Parameter, e: Parameter, w: Parameter, offset: number, biome: string) => {
    out.push([parameters(t, h, c, e, Parameter.point(0.0), w, offset), biome])
    out.push([parameters(t, h, c, e, Parameter.point(1.0), w, offset), biome])
  }
  const underground = (t: Parameter, h: Parameter, c: Parameter, e: Parameter, w: Parameter, offset: number, biome: string) => {
    out.push([parameters(t, h, c, e, s(0.2, 0.9), w, offset), biome])
  }
  const bottom = (t: Parameter, h: Parameter, c: Parameter, e: Parameter, w: Parameter, offset: number, biome: string) => {
    out.push([parameters(t, h, c, e, Parameter.point(1.1), w, offset), biome])
  }

  // ---- 挑选群系的小函数（和原版同名）
  const pickMiddleBiome = (i: number, j: number, w: Parameter): string => {
    if (w.max < 0) return MIDDLE_BIOMES[i][j]!
    return MIDDLE_BIOMES_VARIANT[i][j] ?? MIDDLE_BIOMES[i][j]!
  }
  const pickBadlandsBiome = (j: number, w: Parameter): string => {
    if (j < 2) return w.max < 0 ? B('badlands') : B('eroded_badlands')
    return j < 3 ? B('badlands') : B('wooded_badlands')
  }
  const pickMiddleBiomeOrBadlandsIfHot = (i: number, j: number, w: Parameter) => (i === 4 ? pickBadlandsBiome(j, w) : pickMiddleBiome(i, j, w))
  const pickPlateauBiome = (i: number, j: number, w: Parameter): string => {
    if (w.max >= 0) {
      const v = PLATEAU_VARIANT[i][j]
      if (v !== null) return v
    }
    return PLATEAU_BIOMES[i][j]!
  }
  const pickSlopeBiome = (i: number, j: number, w: Parameter): string => {
    if (i >= 3) return pickPlateauBiome(i, j, w)
    return j <= 1 ? B('snowy_slopes') : B('grove')
  }
  const pickMiddleBiomeOrBadlandsIfHotOrSlopeIfCold = (i: number, j: number, w: Parameter) =>
    i === 0 ? pickSlopeBiome(i, j, w) : pickMiddleBiomeOrBadlandsIfHot(i, j, w)
  const maybePickWindsweptSavannaBiome = (i: number, j: number, w: Parameter, b: string) => (i > 1 && j < 4 && w.max >= 0 ? B('windswept_savanna') : b)
  const pickBeachBiome = (i: number, _j: number) => (i === 0 ? B('snowy_beach') : i === 4 ? B('desert') : B('beach'))
  const pickShatteredCoastBiome = (i: number, j: number, w: Parameter) =>
    maybePickWindsweptSavannaBiome(i, j, w, w.max >= 0 ? pickMiddleBiome(i, j, w) : pickBeachBiome(i, j))
  const pickPeakBiome = (i: number, j: number, w: Parameter): string => {
    if (i <= 2) return w.max < 0 ? B('jagged_peaks') : B('frozen_peaks')
    return i === 3 ? B('stony_peaks') : pickBadlandsBiome(j, w)
  }
  const pickShatteredBiome = (i: number, j: number, w: Parameter) => SHATTERED_BIOMES[i][j] ?? pickMiddleBiome(i, j, w)

  const coast = coastContinentalness
  const near = nearInlandContinentalness
  const mid = midInlandContinentalness
  const far = farInlandContinentalness

  // ---- 海洋和蘑菇岛
  surface(FULL_RANGE, FULL_RANGE, mushroomFieldsContinentalness, FULL_RANGE, FULL_RANGE, 0.0, B('mushroom_fields'))
  for (let i = 0; i < temperatures.length; i++) {
    surface(temperatures[i], FULL_RANGE, deepOceanContinentalness, FULL_RANGE, FULL_RANGE, 0.0, OCEANS[0][i])
    surface(temperatures[i], FULL_RANGE, oceanContinentalness, FULL_RANGE, FULL_RANGE, 0.0, OCEANS[1][i])
  }

  // ---- 陆地：按怪异度切成 13 片
  const peaks = (w: Parameter) => {
    for (let i = 0; i < temperatures.length; i++) {
      const t = temperatures[i]
      for (let j = 0; j < humidities.length; j++) {
        const h = humidities[j]
        const b1 = pickMiddleBiome(i, j, w)
        const b2 = pickMiddleBiomeOrBadlandsIfHot(i, j, w)
        const b3 = pickMiddleBiomeOrBadlandsIfHotOrSlopeIfCold(i, j, w)
        const b4 = pickPlateauBiome(i, j, w)
        const b5 = pickShatteredBiome(i, j, w)
        const b6 = maybePickWindsweptSavannaBiome(i, j, w, b5)
        const b7 = pickPeakBiome(i, j, w)
        surface(t, h, s(coast, far), erosions[0], w, 0.0, b7)
        surface(t, h, s(coast, near), erosions[1], w, 0.0, b3)
        surface(t, h, s(mid, far), erosions[1], w, 0.0, b7)
        surface(t, h, s(coast, near), s(erosions[2], erosions[3]), w, 0.0, b1)
        surface(t, h, s(mid, far), erosions[2], w, 0.0, b4)
        surface(t, h, mid, erosions[3], w, 0.0, b2)
        surface(t, h, far, erosions[3], w, 0.0, b4)
        surface(t, h, s(coast, far), erosions[4], w, 0.0, b1)
        surface(t, h, s(coast, near), erosions[5], w, 0.0, b6)
        surface(t, h, s(mid, far), erosions[5], w, 0.0, b5)
        surface(t, h, s(coast, far), erosions[6], w, 0.0, b1)
      }
    }
  }

  const highSlice = (w: Parameter) => {
    for (let i = 0; i < temperatures.length; i++) {
      const t = temperatures[i]
      for (let j = 0; j < humidities.length; j++) {
        const h = humidities[j]
        const b1 = pickMiddleBiome(i, j, w)
        const b2 = pickMiddleBiomeOrBadlandsIfHot(i, j, w)
        const b3 = pickMiddleBiomeOrBadlandsIfHotOrSlopeIfCold(i, j, w)
        const b4 = pickPlateauBiome(i, j, w)
        const b5 = pickShatteredBiome(i, j, w)
        const b6 = maybePickWindsweptSavannaBiome(i, j, w, b1)
        const b7 = pickSlopeBiome(i, j, w)
        const b8 = pickPeakBiome(i, j, w)
        surface(t, h, coast, s(erosions[0], erosions[1]), w, 0.0, b1)
        surface(t, h, near, erosions[0], w, 0.0, b7)
        surface(t, h, s(mid, far), erosions[0], w, 0.0, b8)
        surface(t, h, near, erosions[1], w, 0.0, b3)
        surface(t, h, s(mid, far), erosions[1], w, 0.0, b7)
        surface(t, h, s(coast, near), s(erosions[2], erosions[3]), w, 0.0, b1)
        surface(t, h, s(mid, far), erosions[2], w, 0.0, b4)
        surface(t, h, mid, erosions[3], w, 0.0, b2)
        surface(t, h, far, erosions[3], w, 0.0, b4)
        surface(t, h, s(coast, far), erosions[4], w, 0.0, b1)
        surface(t, h, s(coast, near), erosions[5], w, 0.0, b6)
        surface(t, h, s(mid, far), erosions[5], w, 0.0, b5)
        surface(t, h, s(coast, far), erosions[6], w, 0.0, b1)
      }
    }
  }

  const midSlice = (w: Parameter) => {
    surface(FULL_RANGE, FULL_RANGE, coast, s(erosions[0], erosions[2]), w, 0.0, B('stony_shore'))
    surface(s(temperatures[1], temperatures[2]), FULL_RANGE, s(near, far), erosions[6], w, 0.0, B('swamp'))
    surface(s(temperatures[3], temperatures[4]), FULL_RANGE, s(near, far), erosions[6], w, 0.0, B('mangrove_swamp'))
    for (let i = 0; i < temperatures.length; i++) {
      const t = temperatures[i]
      for (let j = 0; j < humidities.length; j++) {
        const h = humidities[j]
        const b1 = pickMiddleBiome(i, j, w)
        const b2 = pickMiddleBiomeOrBadlandsIfHot(i, j, w)
        const b3 = pickMiddleBiomeOrBadlandsIfHotOrSlopeIfCold(i, j, w)
        const b4 = pickShatteredBiome(i, j, w)
        const b5 = pickPlateauBiome(i, j, w)
        const b6 = pickBeachBiome(i, j)
        const b7 = maybePickWindsweptSavannaBiome(i, j, w, b1)
        const b8 = pickShatteredCoastBiome(i, j, w)
        const b9 = pickSlopeBiome(i, j, w)
        surface(t, h, s(near, far), erosions[0], w, 0.0, b9)
        surface(t, h, s(near, mid), erosions[1], w, 0.0, b3)
        surface(t, h, far, erosions[1], w, 0.0, i === 0 ? b9 : b5)
        surface(t, h, near, erosions[2], w, 0.0, b1)
        surface(t, h, mid, erosions[2], w, 0.0, b2)
        surface(t, h, far, erosions[2], w, 0.0, b5)
        surface(t, h, s(coast, near), erosions[3], w, 0.0, b1)
        surface(t, h, s(mid, far), erosions[3], w, 0.0, b2)
        if (w.max < 0) {
          surface(t, h, coast, erosions[4], w, 0.0, b6)
          surface(t, h, s(near, far), erosions[4], w, 0.0, b1)
        } else {
          surface(t, h, s(coast, far), erosions[4], w, 0.0, b1)
        }
        surface(t, h, coast, erosions[5], w, 0.0, b8)
        surface(t, h, near, erosions[5], w, 0.0, b7)
        surface(t, h, s(mid, far), erosions[5], w, 0.0, b4)
        if (w.max < 0) surface(t, h, coast, erosions[6], w, 0.0, b6)
        else surface(t, h, coast, erosions[6], w, 0.0, b1)
        if (i === 0) surface(t, h, s(near, far), erosions[6], w, 0.0, b1)
      }
    }
  }

  const lowSlice = (w: Parameter) => {
    surface(FULL_RANGE, FULL_RANGE, coast, s(erosions[0], erosions[2]), w, 0.0, B('stony_shore'))
    surface(s(temperatures[1], temperatures[2]), FULL_RANGE, s(near, far), erosions[6], w, 0.0, B('swamp'))
    surface(s(temperatures[3], temperatures[4]), FULL_RANGE, s(near, far), erosions[6], w, 0.0, B('mangrove_swamp'))
    for (let i = 0; i < temperatures.length; i++) {
      const t = temperatures[i]
      for (let j = 0; j < humidities.length; j++) {
        const h = humidities[j]
        const b1 = pickMiddleBiome(i, j, w)
        const b2 = pickMiddleBiomeOrBadlandsIfHot(i, j, w)
        const b3 = pickMiddleBiomeOrBadlandsIfHotOrSlopeIfCold(i, j, w)
        const b4 = pickBeachBiome(i, j)
        const b5 = maybePickWindsweptSavannaBiome(i, j, w, b1)
        const b6 = pickShatteredCoastBiome(i, j, w)
        surface(t, h, near, s(erosions[0], erosions[1]), w, 0.0, b2)
        surface(t, h, s(mid, far), s(erosions[0], erosions[1]), w, 0.0, b3)
        surface(t, h, near, s(erosions[2], erosions[3]), w, 0.0, b1)
        surface(t, h, s(mid, far), s(erosions[2], erosions[3]), w, 0.0, b2)
        surface(t, h, coast, s(erosions[3], erosions[4]), w, 0.0, b4)
        surface(t, h, s(near, far), erosions[4], w, 0.0, b1)
        surface(t, h, coast, erosions[5], w, 0.0, b6)
        surface(t, h, near, erosions[5], w, 0.0, b5)
        surface(t, h, s(mid, far), erosions[5], w, 0.0, b1)
        surface(t, h, coast, erosions[6], w, 0.0, b4)
        if (i === 0) surface(t, h, s(near, far), erosions[6], w, 0.0, b1)
      }
    }
  }

  const valleys = (w: Parameter) => {
    surface(FROZEN_RANGE, FULL_RANGE, coast, s(erosions[0], erosions[1]), w, 0.0, w.max < 0 ? B('stony_shore') : B('frozen_river'))
    surface(UNFROZEN_RANGE, FULL_RANGE, coast, s(erosions[0], erosions[1]), w, 0.0, w.max < 0 ? B('stony_shore') : B('river'))
    surface(FROZEN_RANGE, FULL_RANGE, near, s(erosions[0], erosions[1]), w, 0.0, B('frozen_river'))
    surface(UNFROZEN_RANGE, FULL_RANGE, near, s(erosions[0], erosions[1]), w, 0.0, B('river'))
    surface(FROZEN_RANGE, FULL_RANGE, s(coast, far), s(erosions[2], erosions[5]), w, 0.0, B('frozen_river'))
    surface(UNFROZEN_RANGE, FULL_RANGE, s(coast, far), s(erosions[2], erosions[5]), w, 0.0, B('river'))
    surface(FROZEN_RANGE, FULL_RANGE, coast, erosions[6], w, 0.0, B('frozen_river'))
    surface(UNFROZEN_RANGE, FULL_RANGE, coast, erosions[6], w, 0.0, B('river'))
    surface(s(temperatures[1], temperatures[2]), FULL_RANGE, s(inlandContinentalness, far), erosions[6], w, 0.0, B('swamp'))
    surface(s(temperatures[3], temperatures[4]), FULL_RANGE, s(inlandContinentalness, far), erosions[6], w, 0.0, B('mangrove_swamp'))
    surface(FROZEN_RANGE, FULL_RANGE, s(inlandContinentalness, far), erosions[6], w, 0.0, B('frozen_river'))
    for (let i = 0; i < temperatures.length; i++) {
      for (let j = 0; j < humidities.length; j++) {
        surface(temperatures[i], humidities[j], s(mid, far), s(erosions[0], erosions[1]), w, 0.0, pickMiddleBiomeOrBadlandsIfHot(i, j, w))
      }
    }
  }

  midSlice(s(-1.0, -0.93333334))
  highSlice(s(-0.93333334, -0.7666667))
  peaks(s(-0.7666667, -0.56666666))
  highSlice(s(-0.56666666, -0.4))
  midSlice(s(-0.4, -0.26666668))
  lowSlice(s(-0.26666668, -0.05))
  valleys(s(-0.05, 0.05))
  lowSlice(s(0.05, 0.26666668))
  midSlice(s(0.26666668, 0.4))
  highSlice(s(0.4, 0.56666666))
  peaks(s(0.56666666, 0.7666667))
  highSlice(s(0.7666667, 0.93333334))
  midSlice(s(0.93333334, 1.0))

  // ---- 地下群系
  underground(FULL_RANGE, FULL_RANGE, s(0.8, 1.0), FULL_RANGE, FULL_RANGE, 0.0, B('dripstone_caves'))
  underground(FULL_RANGE, s(0.7, 1.0), FULL_RANGE, FULL_RANGE, FULL_RANGE, 0.0, B('lush_caves'))
  bottom(FULL_RANGE, FULL_RANGE, FULL_RANGE, s(erosions[0], erosions[1]), FULL_RANGE, 0.0, B('deep_dark'))

  return out
}

/** 下界（原版 MultiNoiseBiomeSourceParameterList.Preset.NETHER）：5 个群系，只看温度、湿度和偏移 */
export function netherBiomeParameters(_opts: { paleGarden?: boolean } = {}): Entry[] {
  const p = (t: number, h: number, offset: number) =>
    parameters(Parameter.point(t), Parameter.point(h), Parameter.point(0), Parameter.point(0), Parameter.point(0), Parameter.point(0), offset)
  return [
    [p(0, 0, 0), B('nether_wastes')],
    [p(0, -0.5, 0), B('soul_sand_valley')],
    [p(0.4, 0, 0), B('crimson_forest')],
    [p(0, 0.5, 0.375), B('warped_forest')],
    [p(-0.5, 0, 0.175), B('basalt_deltas')]
  ]
}
