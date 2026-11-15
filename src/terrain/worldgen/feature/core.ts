/**
 * 地物（feature）的公共部分：世界接口、各种“提供者”（IntProvider / HeightProvider / 方块提供者）、
 * 方块判断（RuleTest、BlockPredicate）。都对应原版同名的类，JSON 格式也和原版一样。
 *
 * 方块状态在这里只用方块名表示（"minecraft:oak_log"），属性（朝向、含水……）不保存——
 * 我们的方块表还没有“状态”这个概念（v7 再做）。需要属性的地方（雪层厚度等）在注释里说明了取舍。
 */
import { inTag } from './tags'
import { clampedMap, nextIntBetween } from '../math/Mth'
import { NormalNoise, type NoiseParameters } from '../noise/NormalNoise'
import { LegacyRandomSource } from '../random/LegacyRandomSource'
import type { RandomSource } from '../random/RandomSource'

// ---------------------------------------------------------------- 世界接口

export type HeightmapType = 'WORLD_SURFACE_WG' | 'WORLD_SURFACE' | 'OCEAN_FLOOR_WG' | 'OCEAN_FLOOR' | 'MOTION_BLOCKING' | 'MOTION_BLOCKING_NO_LEAVES'

/** 原版 WorldGenLevel（这里是 WorldGenRegion：以当前区块为中心的 3×3 区块） */
export interface WorldGenLevel {
  readonly minY: number
  /** 世界高度（主世界 384），最高的方块 y = minY + height - 1 */
  readonly height: number
  readonly seaLevel: number
  /** 世界种子（晶洞的噪声要用） */
  readonly seed: bigint
  getBlock(x: number, y: number, z: number): string
  /** 写方块；超出可写范围（3×3 区块以外、世界上下界以外）时什么也不做，返回 false */
  setBlock(x: number, y: number, z: number, state: string): boolean
  /** 原版 WorldGenRegion.getHeight：这一列“第一个空位”的 y（= 最高的方块 + 1） */
  getHeight(type: HeightmapType, x: number, z: number): number
  /** 方块位置的生物群系（原版 BiomeManager.getBiome） */
  getBiome(x: number, y: number, z: number): string
  /** 群系温度（考虑高度），冻结 / 下雪用 */
  temperature(biome: string, x: number, y: number, z: number): number
  /** 方块位置能不能写（原版 ensureCanWrite） */
  canWrite(x: number, y: number, z: number): boolean
}

export const isOutsideBuildHeight = (level: WorldGenLevel, y: number) => y < level.minY || y >= level.minY + level.height

// ---------------------------------------------------------------- 方块的物理性质（按名字）

const AIR = new Set(['minecraft:air', 'minecraft:cave_air', 'minecraft:void_air'])
export const isAir = (b: string) => AIR.has(b)
export const isWater = (b: string) => b === 'minecraft:water'

/** 不是“实心”的（原版 legacySolid：碰撞箱为空，或者包围盒平均边长 < 0.73 且不满一格高）：植物、地毯、藤蔓…… */
const NON_SOLID = new Set(
  [
    'water', 'lava', 'short_grass', 'tall_grass', 'fern', 'large_fern', 'dead_bush', 'seagrass', 'tall_seagrass', 'vine', 'glow_lichen',
    'moss_carpet', 'pale_moss_carpet', 'pale_hanging_moss', 'mangrove_propagule', 'cocoa', 'hanging_roots', 'cave_vines', 'cave_vines_plant',
    'oak_sapling', 'spruce_sapling', 'birch_sapling', 'jungle_sapling', 'acacia_sapling', 'dark_oak_sapling', 'cherry_sapling', 'pale_oak_sapling',
    'dandelion', 'poppy', 'blue_orchid', 'allium', 'azure_bluet', 'red_tulip', 'orange_tulip', 'white_tulip', 'pink_tulip', 'oxeye_daisy',
    'cornflower', 'lily_of_the_valley', 'closed_eyeblossom', 'open_eyeblossom', 'sunflower', 'lilac', 'rose_bush', 'peony',
    'brown_mushroom', 'red_mushroom', 'sugar_cane', 'kelp', 'kelp_plant', 'lily_pad', 'sweet_berry_bush', 'bamboo_sapling', 'pink_petals',
    'sea_pickle', 'spore_blossom', 'small_dripleaf', 'big_dripleaf_stem', 'small_amethyst_bud', 'medium_amethyst_bud', 'large_amethyst_bud',
    'amethyst_cluster', 'sculk_vein', 'fire', 'soul_fire',
    ...['tube', 'brain', 'bubble', 'fire', 'horn'].flatMap((c) => [`${c}_coral`, `${c}_coral_fan`, `${c}_coral_wall_fan`])
  ].map((n) => `minecraft:${n}`)
)

/** 原版 BlockState.blocksMotion（旧的“实心”）：挡住移动。雪层原版标了 forceSolidOn，算实心 */
export const blocksMotion = (b: string) => !isAir(b) && !NON_SOLID.has(b)

/** 实心、但不是完整的方块（上表面不满）：雪层、仙人掌、箱子、竹子、滴水石锥、台阶…… */
const PARTIAL = new Set(
  ['snow', 'cactus', 'chest', 'bamboo', 'pointed_dripstone', 'big_dripleaf', 'sculk_sensor', 'sculk_shrieker', 'sandstone_slab', 'azalea', 'flowering_azalea', 'dirt_path', 'farmland'].map((n) => `minecraft:${n}`)
)

/** 原版 isFaceFull(碰撞箱, UP)：上表面是不是完整的（雪层能不能放在上面）。树叶的碰撞箱是满的 */
export const hasFullTopFace = (b: string) => (blocksMotion(b) && !PARTIAL.has(b))

/**
 * 原版 isFaceSturdy / isFaceFull(支撑形状)：这一面能不能“撑住”东西（海草、发光地衣、藤蔓……）。
 * 树叶的支撑形状是空的，所以不算。这里不区分方向（我们没有台阶朝向、楼梯……）
 */
export const isSturdy = (b: string) => blocksMotion(b) && !PARTIAL.has(b) && !isLeaves(b)

/** 原版 isSolidRender：不透光的完整方块（蘑菇要长在上面） */
export const isSolidRender = (b: string) => isSturdy(b) && !inTag(b, 'minecraft:ice') && b !== 'minecraft:glass' && b !== 'minecraft:mangrove_roots'

/** 一直“含水”的方块（海草、海带、珊瑚……）：原版里它们和水源在同一格 */
export const ALWAYS_WATERLOGGED = new Set(
  ['seagrass', 'tall_seagrass', 'kelp', 'kelp_plant', 'sea_pickle', ...['tube', 'brain', 'bubble', 'fire', 'horn'].flatMap((c) => [`${c}_coral`, `${c}_coral_fan`, `${c}_coral_wall_fan`])].map((n) => `minecraft:${n}`)
)

/** 原版 getFluidState：这一格有没有水（水方块或者含水的方块） */
export const hasWater = (b: string) => b === 'minecraft:water' || ALWAYS_WATERLOGGED.has(b)
/** 原版 BlockState.liquid()：是流体方块本身（不含“含水”） */
export const isLiquid = (b: string) => b === 'minecraft:water' || b === 'minecraft:lava'

export const isLeaves = (b: string) => inTag(b, 'minecraft:leaves')

/** 原版 BlockState.canBeReplaced()：空气、流体、草、雪层、藤蔓等（minecraft:replaceable 标签） */
export const canBeReplaced = (b: string) => inTag(b, 'minecraft:replaceable')

/** 去掉属性："minecraft:oak_log[axis=y]" → "minecraft:oak_log" */
export const blockName = (state: string) => {
  const i = state.indexOf('[')
  return i < 0 ? state : state.slice(0, i)
}

/** JSON 里的方块状态 {Name, Properties} → 名字 */
export function parseState(json: unknown): string {
  const o = json as { Name: string }
  return o.Name.includes(':') ? o.Name : `minecraft:${o.Name}`
}

// ---------------------------------------------------------------- 数值提供者

export type IntProvider = (random: RandomSource) => number

/** IntProvider 的最小、最大值（原版 getMinValue / getMaxValue），只支持常数和 uniform */
export function intRange(json: unknown): [number, number] {
  if (typeof json === 'number') return [json, json]
  const o = json as Record<string, number>
  if ('value' in o) return [o.value, o.value]
  return [o.min_inclusive, o.max_inclusive]
}

/** 原版 IntProvider：常数，或 uniform / biased_to_bottom / clamped / clamped_normal / weighted_list */
export function intProvider(json: unknown): IntProvider {
  if (typeof json === 'number') return () => json
  const o = json as Record<string, unknown>
  // 有些字段的编码器直接是 UniformInt（不写 type），比如樱花树干的 branch_start_offset_from_top
  const type = o.type === undefined && 'min_inclusive' in o ? 'uniform' : String(o.type).replace('minecraft:', '')
  switch (type) {
    case 'constant':
      return () => o.value as number
    case 'uniform': {
      const min = o.min_inclusive as number
      const max = o.max_inclusive as number
      return (r) => r.nextIntBetweenInclusive(min, max)
    }
    case 'biased_to_bottom': {
      const min = o.min_inclusive as number
      const max = o.max_inclusive as number
      return (r) => min + r.nextInt(r.nextInt(max - min + 1) + 1)
    }
    case 'clamped': {
      const src = intProvider(o.source)
      const min = o.min_inclusive as number
      const max = o.max_inclusive as number
      return (r) => Math.min(max, Math.max(min, src(r)))
    }
    case 'clamped_normal': {
      const mean = Math.fround(o.mean as number)
      const dev = Math.fround(o.deviation as number)
      const min = o.min_inclusive as number
      const max = o.max_inclusive as number
      // 原版 (int)Mth.clamp(Mth.normal(random, mean, deviation), min, max)，Mth.normal = mean + (float)nextGaussian * deviation
      return (r) => Math.trunc(Math.min(max, Math.max(min, Math.fround(mean + Math.fround(Math.fround(r.nextGaussian()) * dev)))))
    }
    case 'weighted_list': {
      const items = (o.distribution as { data: unknown; weight: number }[]).map((e) => ({ p: intProvider(e.data), w: e.weight }))
      const total = items.reduce((s, e) => s + e.w, 0)
      return (r) => {
        let i = r.nextInt(total)
        for (const e of items) {
          i -= e.w
          if (i < 0) return e.p(r)
        }
        throw new Error('weighted_list')
      }
    }
    default:
      throw new Error(`不支持的 IntProvider：${String(o.type)}`)
  }
}

/** 原版 FloatProvider（树的 cherry 放置器等用到）：常数或 uniform */
export function floatProvider(json: unknown): (r: RandomSource) => number {
  if (typeof json === 'number') return () => Math.fround(json)
  const o = json as Record<string, number | string>
  if (String(o.type).endsWith('trapezoid')) {
    const min = Math.fround(o.min as number)
    const max = Math.fround(o.max as number)
    const plateau = Math.fround(o.plateau as number)
    const f = Math.fround(max - min)
    const g = Math.fround(Math.fround(f - plateau) / 2)
    const h = Math.fround(f - g)
    return (r) => Math.fround(Math.fround(min + Math.fround(r.nextFloat() * h)) + Math.fround(r.nextFloat() * g))
  }
  if (String(o.type).endsWith('clamped_normal')) {
    // 原版 ClampedNormalFloat：mean + nextGaussian * deviation，夹在 [min, max]
    const mean = Math.fround(o.mean as number)
    const dev = Math.fround(o.deviation as number)
    const min = Math.fround(o.min as number)
    const max = Math.fround(o.max as number)
    return (r) => Math.min(Math.max(Math.fround(mean + Math.fround(Math.fround(r.nextGaussian()) * dev)), min), max)
  }
  if (String(o.type).endsWith('uniform')) {
    const min = Math.fround(o.min_inclusive as number)
    const max = Math.fround(o.max_exclusive as number)
    return (r) => Math.fround(Math.fround(r.nextFloat() * (max - min)) + min)
  }
  throw new Error(`不支持的 FloatProvider：${String(o.type)}`)
}

// ---------------------------------------------------------------- 高度

/** 原版 VerticalAnchor：{absolute} / {above_bottom} / {below_top} */
export function anchor(json: unknown, level: WorldGenLevel): number {
  const o = json as Record<string, number>
  if ('absolute' in o) return o.absolute
  if ('above_bottom' in o) return level.minY + o.above_bottom
  if ('below_top' in o) return level.height - 1 + level.minY - o.below_top
  throw new Error(`高度锚点 ${JSON.stringify(json)}`)
}

export type HeightProvider = (r: RandomSource, level: WorldGenLevel) => number

/** 原版 HeightProvider：uniform / trapezoid / very_biased_to_bottom / biased_to_bottom / constant */
export function heightProvider(json: unknown): HeightProvider {
  const o = json as Record<string, unknown>
  const type = String(o.type ?? 'minecraft:constant').replace('minecraft:', '')
  if (!('type' in o) && ('absolute' in o || 'above_bottom' in o || 'below_top' in o)) return (_r, l) => anchor(o, l)
  switch (type) {
    case 'constant':
      return (_r, l) => anchor(o.value, l)
    case 'uniform':
      return (r, l) => {
        const i = anchor(o.min_inclusive, l)
        const j = anchor(o.max_inclusive, l)
        if (i > j) return i
        return r.nextInt(j - i + 1) + i
      }
    case 'trapezoid': {
      const plateau = (o.plateau as number) ?? 0
      return (r, l) => {
        const i = anchor(o.min_inclusive, l)
        const j = anchor(o.max_inclusive, l)
        if (i > j) return i
        const k = j - i
        if (plateau >= k) return r.nextInt(k + 1) + i
        const m = Math.trunc((k - plateau) / 2)
        const n = k - m
        return i + r.nextInt(n + 1) + r.nextInt(m + 1)
      }
    }
    case 'very_biased_to_bottom': {
      const inner = (o.inner as number) ?? 1
      return (r, l) => {
        const i = anchor(o.min_inclusive, l)
        const j = anchor(o.max_inclusive, l)
        if (j - i - inner + 1 <= 0) return i
        const k = nextIntBetween(r, i + inner, j)
        const m = nextIntBetween(r, i, k - 1)
        return nextIntBetween(r, i, m - 1 + inner)
      }
    }
    case 'biased_to_bottom': {
      const inner = (o.inner as number) ?? 1
      return (r, l) => {
        const i = anchor(o.min_inclusive, l)
        const j = anchor(o.max_inclusive, l)
        if (j - i - inner + 1 <= 0) return i
        const k = r.nextInt(j - i - inner + 1)
        return r.nextInt(k + inner) + i
      }
    }
    default:
      throw new Error(`不支持的 HeightProvider：${type}`)
  }
}

// ---------------------------------------------------------------- 方块提供者（树干、树叶用哪种方块）

export type StateProvider = (r: RandomSource, x: number, y: number, z: number) => string

export function stateProvider(json: unknown): StateProvider {
  const o = json as Record<string, unknown>
  switch (String(o.type).replace('minecraft:', '')) {
    case 'simple_state_provider': {
      const s = parseState(o.state)
      return () => s
    }
    case 'weighted_state_provider': {
      const items = (o.entries as { data: unknown; weight: number }[]).map((e) => ({ s: parseState(e.data), w: e.weight }))
      const total = items.reduce((s, e) => s + e.w, 0)
      return (r) => {
        let i = r.nextInt(total)
        for (const e of items) {
          i -= e.w
          if (i < 0) return e.s
        }
        return items[0].s
      }
    }
    case 'randomized_int_state_provider': {
      // 先取来源方块，再随机一个整数属性（比如红树胎生苗的 age）；属性我们不存，但随机数要照样消耗
      const src = stateProvider(o.source)
      const values = intProvider(o.values)
      return (r, x, y, z) => {
        const s = src(r, x, y, z)
        values(r)
        return s
      }
    }
    case 'rotated_block_provider': {
      const s = parseState(o.state)
      return () => s
    }
    case 'noise_provider':
    case 'noise_threshold_provider':
    case 'dual_noise_provider':
      return noiseStateProvider(o)
    default:
      throw new Error(`不支持的方块提供者：${String(o.type)}`)
  }
}

/**
 * 原版 NoiseBasedStateProvider 的三个子类：按一个固定种子的噪声选方块（花林、平原、草甸的花）。
 * 噪声 = NormalNoise.create(new WorldgenRandom(new LegacyRandomSource(seed)), noise)，和世界种子无关。
 */
function noiseStateProvider(o: Record<string, unknown>): StateProvider {
  const type = String(o.type).replace('minecraft:', '')
  const noise = NormalNoise.create(new LegacyRandomSource(BigInt(o.seed as number)), o.noise as NoiseParameters)
  const scale = Math.fround(o.scale as number)
  const value = (x: number, y: number, z: number, sc = scale) => noise.getValue(x * sc, y * sc, z * sc)
  const pick = (list: string[], d: number) => list[Math.trunc(Math.min(Math.max((1.0 + d) / 2.0, 0.0), 0.9999) * list.length)]
  const states = ((o.states as unknown[]) ?? []).map(parseState)
  switch (type) {
    case 'noise_provider':
      return (_r, x, y, z) => pick(states, value(x, y, z))
    case 'noise_threshold_provider': {
      const threshold = Math.fround(o.threshold as number)
      const highChance = Math.fround(o.high_chance as number)
      const def = parseState(o.default_state)
      const low = (o.low_states as unknown[]).map(parseState)
      const high = (o.high_states as unknown[]).map(parseState)
      return (r, x, y, z) => {
        const d = value(x, y, z)
        if (d < threshold) return low[r.nextInt(low.length)]
        return r.nextFloat() < highChance ? high[r.nextInt(high.length)] : def
      }
    }
    default: {
      // dual_noise_provider：先用“慢噪声”决定这一片有几种花（variety），再从里面按噪声挑
      const [vMin, vMax] = o.variety as [number, number]
      const slow = NormalNoise.create(new LegacyRandomSource(BigInt(o.seed as number)), o.slow_noise as NoiseParameters)
      const slowScale = Math.fround(o.slow_scale as number)
      const slowValue = (x: number, y: number, z: number) => slow.getValue(x * slowScale, y * slowScale, z * slowScale)
      return (_r, x, y, z) => {
        const d = slowValue(x, y, z)
        const n = Math.trunc(clampedMap(d, -1.0, 1.0, vMin, vMax + 1))
        const list: string[] = []
        for (let j = 0; j < n; j++) list.push(pick(states, slowValue(x + j * 54545, y, z + j * 34234)))
        return pick(list, value(x, y, z))
      }
    }
  }
}

// ---------------------------------------------------------------- 矿石的目标判断（RuleTest）

export type RuleTest = (block: string, r: RandomSource) => boolean

export function ruleTest(json: unknown): RuleTest {
  const o = json as Record<string, unknown>
  switch (String(o.predicate_type).replace('minecraft:', '')) {
    case 'always_true':
      return () => true
    case 'tag_match': {
      const tag = String(o.tag)
      return (b) => inTag(b, tag)
    }
    case 'block_match': {
      const name = parseState({ Name: o.block })
      return (b) => b === name
    }
    case 'blockstate_match': {
      const name = parseState(o.block_state)
      return (b) => b === name
    }
    case 'random_block_match': {
      const name = parseState({ Name: o.block })
      const p = Math.fround(o.probability as number)
      return (b, r) => b === name && r.nextFloat() < p
    }
    default:
      throw new Error(`不支持的 RuleTest：${String(o.predicate_type)}`)
  }
}

// ---------------------------------------------------------------- 位置判断（BlockPredicate）

export type BlockPredicate = (level: WorldGenLevel, x: number, y: number, z: number) => boolean

const HORIZONTAL: [number, number][] = [[0, -1], [0, 1], [-1, 0], [1, 0]]
const DOUBLE_PLANTS = new Set(['tall_grass', 'large_fern', 'sunflower', 'lilac', 'rose_bush', 'peony', 'small_dripleaf', 'tall_seagrass'].map((n) => `minecraft:${n}`))
/** 两格高的植物（原版 DoublePlantBlock）：放的时候上面一格也要放 */
export const isDoublePlant = (b: string) => DOUBLE_PLANTS.has(b)

/**
 * 生成阶段蘑菇处的亮度算不算“暗”（< 13）。原版这时光照还没算完，取到的值和区块生成的先后有关；
 * 对照原版存档：当成“全都亮”最接近（露天的沙滩、草地上不长，见 v5.1 笔记）。
 */
const MUSHROOM_DARK = (_l: WorldGenLevel, _x: number, _y: number, _z: number) => false

const isDirtOrFarmland = (b: string) => inTag(b, 'minecraft:dirt') || b === 'minecraft:farmland'

/**
 * 原版 BlockState.canSurvive：方块放在这里能不能“活”。只实现了地物会放的那些方块，其余都当成能活。
 * 原版的光照判断（蘑菇要暗处）在生成阶段还没有光照，这里当成 0（见 v5.1 笔记）。
 */
export function canSurvive(state: string, level: WorldGenLevel, x: number, y: number, z: number): boolean {
  const below = level.getBlock(x, y - 1, z)
  const n = state.slice(10) // 去掉 "minecraft:"
  if (n.endsWith('_sapling')) return isDirtOrFarmland(below)
  switch (n) {
    case 'mangrove_propagule':
      return isDirtOrFarmland(below) || below === 'minecraft:clay'
    // BushBlock：花、草、蕨、浆果丛、粉红色花簇、两格高的植物（下半）
    case 'short_grass': case 'fern': case 'tall_grass': case 'large_fern': case 'sunflower': case 'lilac': case 'rose_bush': case 'peony':
    case 'dandelion': case 'poppy': case 'blue_orchid': case 'allium': case 'azure_bluet': case 'red_tulip': case 'orange_tulip': case 'white_tulip':
    case 'pink_tulip': case 'oxeye_daisy': case 'cornflower': case 'lily_of_the_valley': case 'open_eyeblossom': case 'closed_eyeblossom':
    case 'sweet_berry_bush': case 'pink_petals':
      return isDirtOrFarmland(below)
    case 'azalea': case 'flowering_azalea':
      return inTag(below, 'minecraft:azalea_grows_on')
    case 'dead_bush':
      return inTag(below, 'minecraft:dead_bush_may_place_on')
    case 'brown_mushroom': case 'red_mushroom':
      // 原版：长在菌丝、灰化土这类方块上，或者亮度 < 13 且下面是不透光的完整方块
      return inTag(below, 'minecraft:mushroom_grow_block') || (isSolidRender(below) && MUSHROOM_DARK(level, x, y, z))
    case 'lily_pad':
      return (hasWater(below) || inTag(below, 'minecraft:ice')) && !hasWater(level.getBlock(x, y, z)) && !isLiquid(level.getBlock(x, y, z))
    case 'moss_carpet': case 'pale_moss_carpet':
      return !isAir(below)
    case 'small_dripleaf':
      return inTag(below, 'minecraft:small_dripleaf_placeable') || (level.getBlock(x, y, z) === 'minecraft:water' && isDirtOrFarmland(below))
    case 'big_dripleaf': case 'big_dripleaf_stem':
      return below === 'minecraft:big_dripleaf_stem' || inTag(below, 'minecraft:big_dripleaf_placeable')
    case 'spore_blossom':
      return isSturdy(level.getBlock(x, y + 1, z)) && !hasWater(level.getBlock(x, y, z))
    case 'seagrass': case 'tall_seagrass':
      return isSturdy(below) && below !== 'minecraft:magma_block'
    case 'kelp': case 'kelp_plant':
      return below !== 'minecraft:magma_block' && (below === 'minecraft:kelp' || below === 'minecraft:kelp_plant' || isSturdy(below))
    case 'sea_pickle':
      return blocksMotion(below) || hasFullTopFace(below)
    case 'bamboo':
      return inTag(below, 'minecraft:bamboo_plantable_on')
    case 'cactus': {
      for (const [dx, dz] of HORIZONTAL) {
        const b = level.getBlock(x + dx, y, z + dz)
        if (blocksMotion(b) || b === 'minecraft:lava') return false
      }
      return (below === 'minecraft:cactus' || inTag(below, 'minecraft:sand')) && !isLiquid(level.getBlock(x, y + 1, z))
    }
    case 'sugar_cane': {
      if (below === 'minecraft:sugar_cane') return true
      if (!inTag(below, 'minecraft:dirt') && !inTag(below, 'minecraft:sand')) return false
      for (const [dx, dz] of HORIZONTAL) {
        const b = level.getBlock(x + dx, y - 1, z + dz)
        if (hasWater(b) || b === 'minecraft:frosted_ice') return true
      }
      return false
    }
  }
  return true
}

export function blockPredicate(json: unknown): BlockPredicate {
  const o = json as Record<string, unknown>
  const off = (o.offset as number[] | undefined) ?? [0, 0, 0]
  const [dx, dy, dz] = off
  switch (String(o.type).replace('minecraft:', '')) {
    case 'true':
      return () => true
    case 'not': {
      const p = blockPredicate(o.predicate)
      return (l, x, y, z) => !p(l, x, y, z)
    }
    case 'all_of': {
      const ps = (o.predicates as unknown[]).map(blockPredicate)
      return (l, x, y, z) => ps.every((p) => p(l, x, y, z))
    }
    case 'any_of': {
      const ps = (o.predicates as unknown[]).map(blockPredicate)
      return (l, x, y, z) => ps.some((p) => p(l, x, y, z))
    }
    case 'matching_blocks': {
      const names = new Set((typeof o.blocks === 'string' ? [o.blocks] : (o.blocks as string[])).map((n) => parseState({ Name: n })))
      return (l, x, y, z) => names.has(l.getBlock(x + dx, y + dy, z + dz))
    }
    case 'matching_block_tag': {
      const tag = String(o.tag)
      return (l, x, y, z) => inTag(l.getBlock(x + dx, y + dy, z + dz), tag)
    }
    case 'matching_fluids': {
      const fluids = typeof o.fluids === 'string' ? [o.fluids] : (o.fluids as string[])
      const water = fluids.some((f) => f.endsWith('water'))
      const lava = fluids.some((f) => f.endsWith('lava'))
      return (l, x, y, z) => {
        const b = l.getBlock(x + dx, y + dy, z + dz)
        return (water && hasWater(b)) || (lava && b === 'minecraft:lava')
      }
    }
    case 'solid':
      return (l, x, y, z) => blocksMotion(l.getBlock(x + dx, y + dy, z + dz))
    case 'replaceable':
      return (l, x, y, z) => canBeReplaced(l.getBlock(x + dx, y + dy, z + dz))
    case 'inside_world_bounds':
      return (l, _x, y) => !isOutsideBuildHeight(l, y + dy)
    case 'would_survive': {
      const state = parseState(o.state)
      return (l, x, y, z) => canSurvive(state, l, x + dx, y + dy, z + dz)
    }
    case 'has_sturdy_face':
      return (l, x, y, z) => isSturdy(l.getBlock(x + dx, y + dy, z + dz))
    default:
      throw new Error(`不支持的 BlockPredicate：${String(o.type)}`)
  }
}
