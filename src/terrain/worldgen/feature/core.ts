/**
 * 地物（feature）的公共部分：世界接口、各种“提供者”（IntProvider / HeightProvider / 方块提供者）、
 * 方块判断（RuleTest、BlockPredicate）。都对应原版同名的类，JSON 格式也和原版一样。
 *
 * 方块状态在这里只用方块名表示（"minecraft:oak_log"），属性（朝向、含水……）不保存——
 * 我们的方块表还没有“状态”这个概念（v7 再做）。需要属性的地方（雪层厚度等）在注释里说明了取舍。
 */
import { inTag } from './tags'
import { nextIntBetween } from '../math/Mth'
import type { RandomSource } from '../random/RandomSource'

// ---------------------------------------------------------------- 世界接口

export type HeightmapType = 'WORLD_SURFACE_WG' | 'WORLD_SURFACE' | 'OCEAN_FLOOR_WG' | 'OCEAN_FLOOR' | 'MOTION_BLOCKING' | 'MOTION_BLOCKING_NO_LEAVES'

/** 原版 WorldGenLevel（这里是 WorldGenRegion：以当前区块为中心的 3×3 区块） */
export interface WorldGenLevel {
  readonly minY: number
  /** 世界高度（主世界 384），最高的方块 y = minY + height - 1 */
  readonly height: number
  readonly seaLevel: number
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

/** 不是完整方块的（没有碰撞或者碰撞很小）：植物、地毯、藤蔓…… */
const NON_SOLID = new Set(
  [
    'water', 'lava', 'short_grass', 'tall_grass', 'fern', 'large_fern', 'dead_bush', 'seagrass', 'tall_seagrass', 'vine', 'glow_lichen',
    'moss_carpet', 'pale_moss_carpet', 'pale_hanging_moss', 'mangrove_propagule', 'cocoa', 'hanging_roots', 'cave_vines', 'cave_vines_plant',
    'oak_sapling', 'spruce_sapling', 'birch_sapling', 'jungle_sapling', 'acacia_sapling', 'dark_oak_sapling', 'cherry_sapling', 'pale_oak_sapling',
    'dandelion', 'poppy', 'brown_mushroom', 'red_mushroom', 'sugar_cane', 'kelp', 'kelp_plant', 'lily_pad', 'sweet_berry_bush', 'bamboo_sapling'
  ].map((n) => `minecraft:${n}`)
)

/** 原版 BlockState.blocksMotion（旧的“实心”）：挡住移动。雪层原版标了 forceSolidOn，算实心 */
export const blocksMotion = (b: string) => !isAir(b) && !NON_SOLID.has(b)

/** 原版 isFaceFull(UP)：上表面是不是完整的（雪层能不能放在上面） */
export const hasFullTopFace = (b: string) => blocksMotion(b) && b !== 'minecraft:snow'

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
    default:
      throw new Error(`不支持的方块提供者：${String(o.type)}`)
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

/** 原版 SaplingBlock / BushBlock.mayPlaceOn：树苗只能种在 dirt 标签的方块或耕地上 */
function canSurvive(state: string, level: WorldGenLevel, x: number, y: number, z: number): boolean {
  const below = level.getBlock(x, y - 1, z)
  if (state.endsWith('_sapling')) return inTag(below, 'minecraft:dirt') || below === 'minecraft:farmland'
  if (state === 'minecraft:mangrove_propagule') return inTag(below, 'minecraft:dirt') || below === 'minecraft:farmland' || below === 'minecraft:clay'
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
        return (water && b === 'minecraft:water') || (lava && b === 'minecraft:lava')
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
      return (l, x, y, z) => hasFullTopFace(l.getBlock(x + dx, y + dy, z + dz))
    default:
      throw new Error(`不支持的 BlockPredicate：${String(o.type)}`)
  }
}
