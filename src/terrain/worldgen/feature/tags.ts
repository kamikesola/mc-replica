/**
 * 地物要用到的方块标签（原版 data/minecraft/tags/block/*.json，展开后的结果，1.21.4）。
 * 只列地物和树用到的；方块名省略 minecraft: 前缀。
 */
const TERRACOTTA = ['terracotta', 'white_terracotta', 'orange_terracotta', 'magenta_terracotta', 'light_blue_terracotta', 'yellow_terracotta', 'lime_terracotta', 'pink_terracotta', 'gray_terracotta', 'light_gray_terracotta', 'cyan_terracotta', 'purple_terracotta', 'blue_terracotta', 'brown_terracotta', 'green_terracotta', 'red_terracotta', 'black_terracotta']
const DIRT = ['dirt', 'grass_block', 'podzol', 'coarse_dirt', 'mycelium', 'rooted_dirt', 'moss_block', 'pale_moss_block', 'mud', 'muddy_mangrove_roots']
const BASE_STONE = ['stone', 'granite', 'diorite', 'andesite', 'tuff', 'deepslate']
const LEAVES = ['jungle_leaves', 'oak_leaves', 'spruce_leaves', 'pale_oak_leaves', 'dark_oak_leaves', 'acacia_leaves', 'birch_leaves', 'azalea_leaves', 'flowering_azalea_leaves', 'mangrove_leaves', 'cherry_leaves']
const WOODS = ['dark_oak', 'pale_oak', 'oak', 'acacia', 'birch', 'jungle', 'spruce', 'mangrove', 'cherry']
const FLOWERS = ['dandelion', 'open_eyeblossom', 'poppy', 'blue_orchid', 'allium', 'azure_bluet', 'red_tulip', 'orange_tulip', 'white_tulip', 'pink_tulip', 'oxeye_daisy', 'cornflower', 'lily_of_the_valley', 'wither_rose', 'torchflower', 'closed_eyeblossom']

const RAW: Record<string, string[]> = {
  air: ['air', 'void_air', 'cave_air'],
  dirt: DIRT,
  sand: ['sand', 'red_sand', 'suspicious_sand'],
  snow: ['snow', 'snow_block', 'powder_snow'],
  ice: ['ice', 'packed_ice', 'blue_ice', 'frosted_ice'],
  leaves: LEAVES,
  logs: [...WOODS.flatMap((w) => [`${w}_log`, `${w}_wood`, `stripped_${w}_log`, `stripped_${w}_wood`]), 'crimson_stem', 'stripped_crimson_stem', 'crimson_hyphae', 'stripped_crimson_hyphae', 'warped_stem', 'stripped_warped_stem', 'warped_hyphae', 'stripped_warped_hyphae'],
  base_stone_overworld: BASE_STONE,
  base_stone_nether: ['netherrack', 'basalt', 'blackstone'],
  stone_ore_replaceables: ['stone', 'granite', 'diorite', 'andesite'],
  deepslate_ore_replaceables: ['deepslate', 'tuff'],
  features_cannot_replace: ['bedrock', 'spawner', 'chest', 'end_portal_frame', 'reinforced_deepslate', 'trial_spawner', 'vault'],
  replaceable: ['air', 'water', 'lava', 'short_grass', 'fern', 'dead_bush', 'seagrass', 'tall_seagrass', 'fire', 'soul_fire', 'snow', 'vine', 'glow_lichen', 'resin_clump', 'light', 'tall_grass', 'large_fern', 'structure_void', 'void_air', 'cave_air', 'bubble_column', 'warped_roots', 'nether_sprouts', 'crimson_roots', 'hanging_roots'],
  replaceable_by_trees: [...LEAVES, ...FLOWERS, 'pale_moss_carpet', 'short_grass', 'fern', 'dead_bush', 'vine', 'glow_lichen', 'sunflower', 'lilac', 'rose_bush', 'peony', 'tall_grass', 'large_fern', 'hanging_roots', 'pitcher_plant', 'water', 'seagrass', 'tall_seagrass', 'warped_roots', 'nether_sprouts', 'crimson_roots'],
  mangrove_logs_can_grow_through: ['mud', 'muddy_mangrove_roots', 'mangrove_roots', 'mangrove_leaves', 'mangrove_log', 'mangrove_propagule', 'moss_carpet', 'vine'],
  mangrove_roots_can_grow_through: ['mud', 'muddy_mangrove_roots', 'mangrove_roots', 'moss_carpet', 'vine', 'mangrove_propagule', 'snow'],
  azalea_grows_on: [...DIRT, 'sand', 'red_sand', 'suspicious_sand', ...TERRACOTTA, 'snow_block', 'powder_snow'],
  azalea_root_replaceable: [...BASE_STONE, ...DIRT, ...TERRACOTTA, 'red_sand', 'clay', 'gravel', 'sand', 'snow_block', 'powder_snow'],
  lush_ground_replaceable: [...BASE_STONE, 'cave_vines_plant', 'cave_vines', ...DIRT, 'clay', 'gravel', 'sand'],
  moss_replaceable: [...BASE_STONE, 'cave_vines_plant', 'cave_vines', ...DIRT],
  snow_layer_cannot_survive_on: ['ice', 'packed_ice', 'barrier'],
  snow_layer_can_survive_on: ['honey_block', 'soul_sand', 'mud']
}

export const TAGS: Record<string, Set<string>> = Object.fromEntries(Object.entries(RAW).map(([k, v]) => [`minecraft:${k}`, new Set(v.map((n) => `minecraft:${n}`))]))

/** 方块是否在标签里；不认识的标签当成空的 */
export function inTag(block: string, tag: string): boolean {
  const t = TAGS[tag.startsWith('#') ? tag.slice(1) : tag.includes(':') ? tag : `minecraft:${tag}`]
  return t ? t.has(block) : false
}
