/**
 * v5 测试用的数据包：在原版数据上改生物群系的地物列表，让某一类地物单独出现（和 tools/vanilla 里
 * 生成原版对照存档用的数据包一模一样，所以两边的地物序号、随机种子都对得上）。
 *
 *   oresOnly：每个群系只保留第 6 步（underground_ores）
 *   treesOnly：每个群系只有第 9 步的一个地物 test_trees：每个区块 1 次，从所有树里随机挑一种
 * 两者都去掉了雕刻器（carvers，我们还没做）。
 */
import type { PackInput } from '../src/terrain/worldgen/Worldgen'

type Json = Record<string, unknown>

function biomes(vanilla: PackInput): [string, Json][] {
  return Object.entries(vanilla.files).filter(([p]) => /worldgen\/biome\/[^/]+\.json$/.test(p)) as [string, Json][]
}

export function oresOnlyPack(vanilla: PackInput): PackInput {
  const files: Record<string, unknown> = {}
  for (const [p, b] of biomes(vanilla)) {
    const name = p.split('/').pop()!
    files[`/ores/worldgen/biome/${name}`] = { ...b, carvers: [], features: (b.features as string[][]).map((l, i) => (i === 6 ? l : [])) }
  }
  return { name: 'ores', files }
}

export function treesOnlyPack(vanilla: PackInput): PackInput {
  const trees = Object.entries(vanilla.files)
    .filter(([p, j]) => /worldgen\/configured_feature\/[^/]+\.json$/.test(p) && ['minecraft:tree', 'minecraft:huge_red_mushroom', 'minecraft:huge_brown_mushroom'].includes((j as Json).type as string))
    .map(([p]) => p.split('/').pop()!.replace('.json', ''))
    .sort()
  const sapling = (t: string) => (t.includes('mangrove') ? 'minecraft:mangrove_propagule' : 'minecraft:oak_sapling')
  const files: Record<string, unknown> = {
    '/trees/worldgen/configured_feature/test_trees.json': {
      type: 'minecraft:simple_random_selector',
      config: { features: trees.map((t) => ({ feature: `minecraft:${t}`, placement: [{ type: 'minecraft:block_predicate_filter', predicate: { type: 'minecraft:would_survive', state: { Name: sapling(t) } } }] })) }
    },
    '/trees/worldgen/placed_feature/test_trees.json': {
      feature: 'minecraft:test_trees',
      placement: [{ type: 'minecraft:in_square' }, { type: 'minecraft:surface_water_depth_filter', max_water_depth: 2 }, { type: 'minecraft:heightmap', heightmap: 'OCEAN_FLOOR' }, { type: 'minecraft:biome' }]
    }
  }
  for (const [p, b] of biomes(vanilla)) {
    const name = p.split('/').pop()!
    files[`/trees/worldgen/biome/${name}`] = { ...b, carvers: [], features: [...Array.from({ length: 9 }, () => []), ['minecraft:test_trees']] }
  }
  return { name: 'trees', files }
}

/** 树相关的方块（对照时只比较这些） */
export const TREE_BLOCKS = /_log$|_leaves$|vine|bee_nest|cocoa|mushroom_block|mushroom_stem|propagule|mangrove_roots|moss_carpet|hanging_moss|creaking/
/** 矿石 */
export const ORE_BLOCKS = /_ore$/
