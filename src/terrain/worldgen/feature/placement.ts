/**
 * 放置规则（原版 PlacedFeature + PlacementModifier）。
 *
 * 一个 placed_feature = 一个地物 + 一串放置修饰器。原版用 Java Stream 把修饰器串起来：
 *   Stream.of(区块原点).flatMap(修饰器1).flatMap(修饰器2)…….forEach(放地物)
 * Stream 是“惰性、深度优先”的：第一个位置先走完所有修饰器、把地物放下去，才轮到第二个位置。
 * 随机数的消耗顺序因此是交错的（位置1 的 x、z、y、放地物，位置2 的 x、z、y……），
 * 这里用递归 run(i, x, y, z) 得到同样的顺序。
 */
import { blockPredicate, heightProvider, intProvider, isOutsideBuildHeight, type HeightmapType, type WorldGenLevel } from './core'
import type { RandomSource } from '../random/RandomSource'
import { BIOME_INFO_NOISE } from '../biome/Biome'

/** 还没实现的放置修饰器（调试用） */
export const unsupportedModifiers = new Map<string, number>()

export interface PlacementContext {
  level: WorldGenLevel
  /** 最外层（直接写在生物群系里）的 placed_feature 的 ID；嵌套在别的地物里的没有（biome 修饰器要用它） */
  topFeature: string | null
  /** 某个群系是否带有这个 placed_feature（原版 BiomeGenerationSettings.hasFeature） */
  biomeHasFeature: (biome: string, feature: string) => boolean
}

type Pos = [number, number, number]
/** 修饰器：给一个位置，返回 0 个或多个位置（按顺序） */
type Modifier = (ctx: PlacementContext, r: RandomSource, x: number, y: number, z: number) => Pos[]

const DIRS: Record<string, Pos> = { up: [0, 1, 0], down: [0, -1, 0], north: [0, 0, -1], south: [0, 0, 1], west: [-1, 0, 0], east: [1, 0, 0] }

export function placementModifier(json: unknown): Modifier {
  const o = json as Record<string, unknown>
  const type = String(o.type).replace('minecraft:', '')
  switch (type) {
    case 'count': {
      const count = intProvider(o.count)
      return (_c, r, x, y, z) => {
        const n = count(r)
        const out: Pos[] = []
        for (let i = 0; i < n; i++) out.push([x, y, z])
        return out
      }
    }
    case 'in_square':
      return (_c, r, x, y, z) => {
        const i = r.nextInt(16) + x
        const k = r.nextInt(16) + z
        return [[i, y, k]]
      }
    case 'height_range': {
      const h = heightProvider(o.height)
      return (c, r, x, _y, z) => [[x, h(r, c.level), z]]
    }
    case 'heightmap': {
      const hm = o.heightmap as HeightmapType
      return (c, _r, x, _y, z) => {
        const k = c.level.getHeight(hm, x, z)
        return k > c.level.minY ? [[x, k, z]] : []
      }
    }
    case 'biome':
      return (c, _r, x, y, z) => {
        if (!c.topFeature) throw new Error('biome 修饰器只能用在群系直接引用的地物上')
        return c.biomeHasFeature(c.level.getBiome(x, y, z), c.topFeature) ? [[x, y, z]] : []
      }
    case 'rarity_filter': {
      const chance = Math.fround(1.0 / (o.chance as number))
      return (_c, r, x, y, z) => (r.nextFloat() < chance ? [[x, y, z]] : [])
    }
    case 'surface_water_depth_filter': {
      const max = o.max_water_depth as number
      return (c, _r, x, y, z) => {
        const i = c.level.getHeight('OCEAN_FLOOR', x, z)
        const j = c.level.getHeight('WORLD_SURFACE', x, z)
        return j - i <= max ? [[x, y, z]] : []
      }
    }
    case 'block_predicate_filter': {
      const p = blockPredicate(o.predicate)
      return (c, _r, x, y, z) => (p(c.level, x, y, z) ? [[x, y, z]] : [])
    }
    case 'random_offset': {
      const xz = intProvider(o.xz_spread)
      const ys = intProvider(o.y_spread)
      return (_c, r, x, y, z) => {
        const i = x + xz(r)
        const j = y + ys(r)
        const k = z + xz(r)
        return [[i, j, k]]
      }
    }
    case 'environment_scan': {
      const [dx, dy, dz] = DIRS[String(o.direction_of_search)]
      const maxSteps = o.max_steps as number
      const target = blockPredicate(o.target_condition)
      const allowed = o.allowed_search_condition ? blockPredicate(o.allowed_search_condition) : () => true
      return (c, _r, x, y, z) => {
        const l = c.level
        if (!allowed(l, x, y, z)) return []
        for (let i = 0; i < maxSteps; i++) {
          if (target(l, x, y, z)) return [[x, y, z]]
          x += dx
          y += dy
          z += dz
          if (isOutsideBuildHeight(l, y)) return []
          if (!allowed(l, x, y, z)) break
        }
        return target(l, x, y, z) ? [[x, y, z]] : []
      }
    }
    case 'surface_relative_threshold_filter': {
      const hm = o.heightmap as HeightmapType
      const min = (o.min_inclusive as number | undefined) ?? -Infinity
      const max = (o.max_inclusive as number | undefined) ?? Infinity
      return (c, _r, x, y, z) => {
        const h = c.level.getHeight(hm, x, z)
        return h + min <= y && y <= h + max ? [[x, y, z]] : []
      }
    }
    case 'noise_based_count': {
      const ratio = o.noise_to_count_ratio as number
      const factor = o.noise_factor as number
      const offset = (o.noise_offset as number) ?? 0
      return (_c, _r, x, y, z) => {
        const d = BIOME_INFO_NOISE.getValue(x / factor, z / factor, false)
        const n = Math.ceil((d + offset) * ratio)
        return Array.from({ length: Math.max(0, n) }, () => [x, y, z] as Pos)
      }
    }
    case 'noise_threshold_count': {
      const level = o.noise_level as number
      const below = o.below_noise as number
      const above = o.above_noise as number
      return (_c, _r, x, y, z) => {
        const d = BIOME_INFO_NOISE.getValue(x / 200.0, z / 200.0, false)
        const n = d < level ? below : above
        return Array.from({ length: Math.max(0, n) }, () => [x, y, z] as Pos)
      }
    }
    case 'fixed_placement': {
      const ps = o.positions as Pos[]
      return () => ps.map((p) => [p[0], p[1], p[2]] as Pos)
    }
    default:
      // 还没实现的（count_on_every_layer、carving_mask）：不放。每个地物有自己的随机种子，不影响别的地物
      unsupportedModifiers.set(type, (unsupportedModifiers.get(type) ?? 0) + 1)
      return () => []
  }
}

/** 地物本身：在某个位置尝试放下，返回是否成功 */
export type FeaturePlacer = (level: WorldGenLevel, r: RandomSource, x: number, y: number, z: number) => boolean

export class PlacedFeature {
  constructor(
    readonly id: string,
    private readonly modifiers: Modifier[],
    private readonly feature: FeaturePlacer,
    /** 地物类型没实现，放了也不会改任何方块 */
    readonly noop = false
  ) {}

  /** 原版 PlacedFeature.placeWithContext：位置流 → 逐个放地物 */
  place(ctx: PlacementContext, r: RandomSource, x: number, y: number, z: number): boolean {
    let placed = false
    const run = (i: number, px: number, py: number, pz: number) => {
      if (i === this.modifiers.length) {
        if (this.feature(ctx.level, r, px, py, pz)) placed = true
        return
      }
      const next = this.modifiers[i](ctx, r, px, py, pz)
      for (const [nx, ny, nz] of next) run(i + 1, nx, ny, nz)
    }
    run(0, x, y, z)
    return placed
  }
}
