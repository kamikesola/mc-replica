import { ALWAYS_WATERLOGGED } from './worldgen/feature/core'
import { buildStates, getProp, stateName, vanillaIndex, withProps, type StateRegistry } from './states'
import { TEXTURE_LAYER, type TextureName } from './textures/painters'
import BLOCK_LIST from './blockList.json'
import SHAPES_JSON from './blockShapes.json'
import STATE_DEFS from './stateDefs.json'

/**
 * 方块种类。和原项目的 BlockType 一样是一个枚举，值就是存进调色板的方块 ID。
 *
 * v1 起每个方块有了纹理：顶面 / 侧面 / 底面各指定一张（见 textures/painters.ts）。
 * v3 起水和岩浆有了“流动”状态：原版的 level 属性（流动的水还剩多少、是不是在往下落），
 * 这里每种状态占一个 ID（见下面的 fluidBlock）。原版其他的“方块状态”（朝向、台阶上下半等）留到 v7。
 */
export enum BlockType {
  air = 0,
  stone = 1,
  deepslate = 2,
  dirt = 3,
  grass = 4,
  sand = 5,
  gravel = 6,
  /** 水源 */
  water = 7,
  bedrock = 8,
  planks = 9,
  cobblestone = 10,
  log = 11,
  leaves = 12,
  glowstone = 13,
  obsidian = 14,
  /** 岩浆源 */
  lava = 15,
  // 16..22 流动的水（量 1..7），23 下落的水；24..30 流动的岩浆，31 下落的岩浆
  // v4：地表规则用到的方块
  sandstone = 32,
  red_sand = 33,
  red_sandstone = 34,
  snow_block = 35,
  powder_snow = 36,
  ice = 37,
  packed_ice = 38,
  mud = 39,
  mycelium = 40,
  podzol = 41,
  coarse_dirt = 42,
  calcite = 43,
  terracotta = 44,
  white_terracotta = 45,
  orange_terracotta = 46,
  yellow_terracotta = 47,
  brown_terracotta = 48,
  red_terracotta = 49,
  light_gray_terracotta = 50,
  // v5：矿石、石头、树木、装饰（顺序和下面 BLOCKS.push 一致）
  granite, diorite, andesite, tuff, clay, infested_stone, infested_deepslate,
  coal_ore, deepslate_coal_ore, iron_ore, deepslate_iron_ore, copper_ore, deepslate_copper_ore,
  gold_ore, deepslate_gold_ore, redstone_ore, deepslate_redstone_ore, emerald_ore, deepslate_emerald_ore,
  lapis_ore, deepslate_lapis_ore, diamond_ore, deepslate_diamond_ore, raw_iron_block, raw_copper_block,
  spruce_log, birch_log, jungle_log, acacia_log, dark_oak_log, mangrove_log, cherry_log, pale_oak_log,
  spruce_leaves, birch_leaves, jungle_leaves, acacia_leaves, dark_oak_leaves, mangrove_leaves, cherry_leaves, pale_oak_leaves,
  azalea_leaves, flowering_azalea_leaves,
  mushroom_stem, red_mushroom_block, brown_mushroom_block,
  mangrove_roots, muddy_mangrove_roots, rooted_dirt, bee_nest, creaking_heart,
  snow, moss_carpet, pale_moss_carpet,
  vine, cocoa, pale_hanging_moss, mangrove_propagule,
  // v5.1（顺序和下面 BLOCKS.push 一致）
  short_grass, fern, tall_grass, large_fern, dead_bush, dandelion, poppy, blue_orchid, allium, azure_bluet, red_tulip, orange_tulip, white_tulip, pink_tulip, oxeye_daisy, cornflower, lily_of_the_valley, closed_eyeblossom, open_eyeblossom, sunflower, lilac, rose_bush, peony, brown_mushroom, red_mushroom, sweet_berry_bush, sugar_cane, bamboo, azalea, flowering_azalea, pink_petals, lily_pad, pumpkin, melon, cactus, seagrass, tall_seagrass, kelp, kelp_plant, sea_pickle, glow_lichen, hanging_roots, spore_blossom, cave_vines, cave_vines_plant, small_dripleaf, big_dripleaf, big_dripleaf_stem, moss_block, pale_moss_block, dripstone_block, pointed_dripstone, smooth_basalt, amethyst_block, budding_amethyst, small_amethyst_bud, medium_amethyst_bud, large_amethyst_bud, amethyst_cluster, sculk, sculk_vein, sculk_sensor, sculk_shrieker, sculk_catalyst, blue_ice, mossy_cobblestone, magma_block, spawner, chest, bone_block, suspicious_sand, suspicious_gravel, sandstone_slab, tube_coral_block, tube_coral, tube_coral_fan, tube_coral_wall_fan, brain_coral_block, brain_coral, brain_coral_fan, brain_coral_wall_fan, bubble_coral_block, bubble_coral, bubble_coral_fan, bubble_coral_wall_fan, fire_coral_block, fire_coral, fire_coral_fan, fire_coral_wall_fan, horn_coral_block, horn_coral, horn_coral_fan, horn_coral_wall_fan,
  // v5.2（顺序和下面 BLOCKS.push 一致）
  netherrack, soul_sand, soul_soil, basalt, blackstone, nether_gold_ore, nether_quartz_ore, ancient_debris, crimson_nylium, warped_nylium, crimson_stem, warped_stem, nether_wart_block, warped_wart_block, shroomlight, crimson_fungus, warped_fungus, crimson_roots, warped_roots, nether_sprouts, weeping_vines, weeping_vines_plant, twisting_vines, twisting_vines_plant, fire, soul_fire, end_stone, chorus_plant, chorus_flower, end_gateway, iron_bars, bubble_column
}

// ---------------------------------------------------------------- 流体状态

export const enum FluidKind {
  none = 0,
  water = 1,
  lava = 2
}

/**
 * 原版的流体状态：
 *   源（source）     量 = 8
 *   流动（flowing）  量 = 1..7，离源越远越少；水每格少 1，岩浆每格少 2
 *   下落（falling）  量 = 8，从上面流下来的，竖直的一整柱
 */
export interface FluidState {
  kind: FluidKind
  amount: number
  source: boolean
  falling: boolean
}

const FLOW_BASE = { [FluidKind.water]: 16, [FluidKind.lava]: 24 } as const

/** 流体状态 → 方块 ID */
export function fluidBlock(kind: FluidKind.water | FluidKind.lava, amount: number, falling = false): BlockType {
  if (falling) return FLOW_BASE[kind] + 7
  if (amount >= 8) return kind === FluidKind.water ? BlockType.water : BlockType.lava
  return FLOW_BASE[kind] + amount - 1
}

const NO_FLUID: FluidState = { kind: FluidKind.none, amount: 0, source: false, falling: false }

/** 方块 → 流体状态（v7 起最终用的是按状态的 FLUIDS，见文件末尾） */
const BLOCK_FLUIDS: FluidState[] = Array.from({ length: 4096 }, () => NO_FLUID)
const WATER_SOURCE: FluidState = { kind: FluidKind.water, amount: 8, source: true, falling: false }
for (const kind of [FluidKind.water, FluidKind.lava] as const) {
  BLOCK_FLUIDS[kind === FluidKind.water ? BlockType.water : BlockType.lava] = { kind, amount: 8, source: true, falling: false }
  for (let a = 1; a <= 7; a++) BLOCK_FLUIDS[FLOW_BASE[kind] + a - 1] = { kind, amount: a, source: false, falling: false }
  BLOCK_FLUIDS[FLOW_BASE[kind] + 7] = { kind, amount: 8, source: false, falling: true }
}

/** 一直含水的方块（v5.1）：海草、海带、珊瑚……原版里它们和水源在同一格，这里当成“水源 + 一个十字形的面” */
export const WATERLOGGED: BlockType[] = [...ALWAYS_WATERLOGGED].map((n) => BlockType[n.slice(10) as keyof typeof BlockType])
for (const b of WATERLOGGED) BLOCK_FLUIDS[b] = WATER_SOURCE

// ---------------------------------------------------------------- 方块表

export interface BlockInfo {
  name: string
  /** 顶面 / 侧面 / 底面的纹理 */
  textures: { top: TextureName; side: TextureName; bottom: TextureName }
  /** 实心：会挡住玩家，也会挡住相邻方块的面 */
  solid: boolean
  /** 能不能被玩家挖掉 */
  breakable: boolean
  /**
   * 形状（v5）：cube 完整方块；slab 只有底下 height/16 高（雪层、地毯）；cross 两片交叉的面（藤蔓、垂根等植物，镂空纹理）。
   * 不是 cube 的方块都不实心，也不挡住相邻方块的面。
   */
  /** multiface（v5.1）：发光地衣、幽匿脉络、藤蔓——贴在旁边实心方块的面上；旁边没有实心方块时画成十字 */
  shape: 'cube' | 'slab' | 'cross' | 'multiface' | 'none'
  /** slab 的高度（1/16 格） */
  height: number
}

const block = (name: string, top: TextureName, side = top, bottom = top, extra: Partial<BlockInfo> = {}): BlockInfo => ({
  name,
  textures: { top, side, bottom },
  solid: true,
  breakable: true,
  shape: 'cube',
  height: 16,
  ...extra
})
const slab = (name: string, tex: TextureName, height: number) => block(name, tex, tex, tex, { solid: false, shape: 'slab', height })
const cross = (name: string, tex: TextureName) => block(name, tex, tex, tex, { solid: false, shape: 'cross' })
const fluid = (name: string, tex: TextureName) => block(name, tex, tex, tex, { solid: false, breakable: false })

export const BLOCKS: BlockInfo[] = [
  block('空气', 'stone', 'stone', 'stone', { solid: false, breakable: false }),
  block('石头', 'stone'),
  block('深板岩', 'deepslate_top', 'deepslate'),
  block('泥土', 'dirt'),
  block('草方块', 'grass_top', 'grass_side', 'dirt'),
  block('沙子', 'sand'),
  block('沙砾', 'gravel'),
  fluid('水', 'water'),
  block('基岩', 'bedrock', 'bedrock', 'bedrock', { breakable: false }),
  block('木板', 'planks'),
  block('圆石', 'cobblestone'),
  block('原木', 'log_top', 'log'),
  block('树叶', 'leaves'),
  block('萤石', 'glowstone'),
  block('黑曜石', 'obsidian'),
  fluid('岩浆', 'lava')
]
for (let a = 1; a <= 7; a++) BLOCKS[FLOW_BASE[FluidKind.water] + a - 1] = fluid(`水（流动 ${a}）`, 'water')
BLOCKS[FLOW_BASE[FluidKind.water] + 7] = fluid('水（下落）', 'water')
for (let a = 1; a <= 7; a++) BLOCKS[FLOW_BASE[FluidKind.lava] + a - 1] = fluid(`岩浆（流动 ${a}）`, 'lava')
BLOCKS[FLOW_BASE[FluidKind.lava] + 7] = fluid('岩浆（下落）', 'lava')
BLOCKS.push(
  block('砂岩', 'sandstone_top', 'sandstone'),
  block('红沙', 'red_sand'),
  block('红砂岩', 'red_sandstone_top', 'red_sandstone'),
  block('雪块', 'snow'),
  block('细雪', 'powder_snow'),
  block('冰', 'ice'),
  block('浮冰', 'packed_ice'),
  block('泥巴', 'mud'),
  block('菌丝体', 'mycelium_top', 'mycelium_side', 'dirt'),
  block('灰化土', 'podzol_top', 'podzol_side', 'dirt'),
  block('砂土', 'coarse_dirt'),
  block('方解石', 'calcite'),
  block('陶瓦', 'terracotta'),
  block('白色陶瓦', 'white_terracotta'),
  block('橙色陶瓦', 'orange_terracotta'),
  block('黄色陶瓦', 'yellow_terracotta'),
  block('棕色陶瓦', 'brown_terracotta'),
  block('红色陶瓦', 'red_terracotta'),
  block('淡灰色陶瓦', 'light_gray_terracotta')
)
// v5
BLOCKS.push(
  block('花岗岩', 'granite'),
  block('闪长岩', 'diorite'),
  block('安山岩', 'andesite'),
  block('凝灰岩', 'tuff'),
  block('黏土', 'clay'),
  block('被虫蚀的石头', 'stone'),
  block('被虫蚀的深板岩', 'deepslate_top', 'deepslate'),
  block('煤矿石', 'coal_ore'),
  block('深层煤矿石', 'deepslate_coal_ore'),
  block('铁矿石', 'iron_ore'),
  block('深层铁矿石', 'deepslate_iron_ore'),
  block('铜矿石', 'copper_ore'),
  block('深层铜矿石', 'deepslate_copper_ore'),
  block('金矿石', 'gold_ore'),
  block('深层金矿石', 'deepslate_gold_ore'),
  block('红石矿石', 'redstone_ore'),
  block('深层红石矿石', 'deepslate_redstone_ore'),
  block('绿宝石矿石', 'emerald_ore'),
  block('深层绿宝石矿石', 'deepslate_emerald_ore'),
  block('青金石矿石', 'lapis_ore'),
  block('深层青金石矿石', 'deepslate_lapis_ore'),
  block('钻石矿石', 'diamond_ore'),
  block('深层钻石矿石', 'deepslate_diamond_ore'),
  block('粗铁块', 'raw_iron_block'),
  block('粗铜块', 'raw_copper_block'),
  block('云杉原木', 'spruce_log_top', 'spruce_log'),
  block('白桦原木', 'birch_log_top', 'birch_log'),
  block('丛林原木', 'jungle_log_top', 'jungle_log'),
  block('金合欢原木', 'acacia_log_top', 'acacia_log'),
  block('深色橡木原木', 'dark_oak_log_top', 'dark_oak_log'),
  block('红树原木', 'mangrove_log_top', 'mangrove_log'),
  block('樱花原木', 'cherry_log_top', 'cherry_log'),
  block('苍白橡木原木', 'pale_oak_log_top', 'pale_oak_log'),
  block('云杉树叶', 'spruce_leaves'),
  block('白桦树叶', 'birch_leaves'),
  block('丛林树叶', 'jungle_leaves'),
  block('金合欢树叶', 'acacia_leaves'),
  block('深色橡木树叶', 'dark_oak_leaves'),
  block('红树树叶', 'mangrove_leaves'),
  block('樱花树叶', 'cherry_leaves'),
  block('苍白橡树树叶', 'pale_oak_leaves'),
  block('杜鹃树叶', 'azalea_leaves'),
  block('盛开的杜鹃树叶', 'flowering_azalea_leaves'),
  block('蘑菇柄', 'mushroom_stem'),
  block('红色蘑菇方块', 'red_mushroom_block'),
  block('棕色蘑菇方块', 'brown_mushroom_block'),
  block('红树根', 'mangrove_roots'),
  block('沾泥的红树根', 'muddy_mangrove_roots'),
  block('缠根泥土', 'rooted_dirt'),
  block('蜂巢', 'bee_nest_top', 'bee_nest'),
  block('嘎枝之心', 'pale_oak_log_top', 'creaking_heart'),
  slab('雪', 'snow', 2),
  slab('苔藓地毯', 'moss_carpet', 1),
  slab('苍白苔藓地毯', 'pale_moss_carpet', 1),
  cross('藤蔓', 'vine'),
  cross('可可果', 'cocoa'),
  cross('苍白垂须', 'pale_hanging_moss'),
  cross('红树胎生苗', 'mangrove_propagule')
)
// v5.1
BLOCKS.push(
  cross('矮草丛', 'short_grass'),
  cross('蕨', 'fern'),
  cross('高草丛', 'tall_grass'),
  cross('大型蕨', 'large_fern'),
  cross('枯萎的灌木', 'dead_bush'),
  cross('蒲公英', 'dandelion'),
  cross('虞美人', 'poppy'),
  cross('兰花', 'blue_orchid'),
  cross('绒球葱', 'allium'),
  cross('蓝花美耳草', 'azure_bluet'),
  cross('红色郁金香', 'red_tulip'),
  cross('橙色郁金香', 'orange_tulip'),
  cross('白色郁金香', 'white_tulip'),
  cross('粉红色郁金香', 'pink_tulip'),
  cross('滨菊', 'oxeye_daisy'),
  cross('矢车菊', 'cornflower'),
  cross('铃兰', 'lily_of_the_valley'),
  cross('闭合的眼眸花', 'closed_eyeblossom'),
  cross('张开的眼眸花', 'open_eyeblossom'),
  cross('向日葵', 'sunflower'),
  cross('丁香', 'lilac'),
  cross('玫瑰丛', 'rose_bush'),
  cross('牡丹', 'peony'),
  cross('棕色蘑菇', 'brown_mushroom'),
  cross('红色蘑菇', 'red_mushroom'),
  cross('甜浆果丛', 'sweet_berry_bush'),
  cross('甘蔗', 'sugar_cane'),
  cross('竹子', 'bamboo'),
  cross('杜鹃花丛', 'azalea'),
  cross('盛开的杜鹃花丛', 'flowering_azalea'),
  slab('粉红色花簇', 'pink_petals', 1),
  slab('睡莲', 'lily_pad', 1),
  block('南瓜', 'pumpkin_top', 'pumpkin'),
  block('西瓜', 'melon_top', 'melon'),
  block('仙人掌', 'cactus_top', 'cactus'),
  cross('海草', 'seagrass'),
  cross('高海草', 'tall_seagrass'),
  cross('海带', 'kelp'),
  cross('海带茎', 'kelp_plant'),
  cross('海泡菜', 'sea_pickle'),
  cross('发光地衣', 'glow_lichen'),
  cross('垂根', 'hanging_roots'),
  cross('孢子花', 'spore_blossom'),
  cross('洞穴藤蔓', 'cave_vines'),
  cross('洞穴藤蔓（茎）', 'cave_vines_plant'),
  cross('小型垂滴叶', 'small_dripleaf'),
  cross('大型垂滴叶', 'big_dripleaf'),
  cross('大型垂滴叶茎', 'big_dripleaf_stem'),
  block('苔藓块', 'moss_block'),
  block('苍白苔藓块', 'pale_moss_block'),
  block('滴水石块', 'dripstone_block'),
  cross('滴水石锥', 'pointed_dripstone'),
  block('平滑玄武岩', 'smooth_basalt'),
  block('紫水晶块', 'amethyst_block'),
  block('紫水晶母岩', 'budding_amethyst'),
  cross('小型紫晶芽', 'small_amethyst_bud'),
  cross('中型紫晶芽', 'medium_amethyst_bud'),
  cross('大型紫晶芽', 'large_amethyst_bud'),
  cross('紫水晶簇', 'amethyst_cluster'),
  block('幽匿块', 'sculk'),
  cross('幽匿脉络', 'sculk_vein'),
  slab('幽匿感测体', 'sculk_sensor', 8),
  slab('幽匿尖啸体', 'sculk_shrieker', 8),
  block('幽匿催发体', 'sculk_catalyst'),
  block('蓝冰', 'blue_ice'),
  block('苔石', 'mossy_cobblestone'),
  block('岩浆块', 'magma_block'),
  block('刷怪笼', 'spawner'),
  block('箱子', 'chest'),
  block('骨块', 'bone_block_top', 'bone_block'),
  block('可疑的沙子', 'suspicious_sand'),
  block('可疑的沙砾', 'suspicious_gravel'),
  slab('砂岩台阶', 'sandstone_slab', 8),
  block('管珊瑚块', 'tube_coral_block'),
  cross('管珊瑚', 'tube_coral'),
  cross('管珊瑚扇', 'tube_coral_fan'),
  cross('管珊瑚壁扇', 'tube_coral_wall_fan'),
  block('脑纹珊瑚块', 'brain_coral_block'),
  cross('脑纹珊瑚', 'brain_coral'),
  cross('脑纹珊瑚扇', 'brain_coral_fan'),
  cross('脑纹珊瑚壁扇', 'brain_coral_wall_fan'),
  block('气泡珊瑚块', 'bubble_coral_block'),
  cross('气泡珊瑚', 'bubble_coral'),
  cross('气泡珊瑚扇', 'bubble_coral_fan'),
  cross('气泡珊瑚壁扇', 'bubble_coral_wall_fan'),
  block('火珊瑚块', 'fire_coral_block'),
  cross('火珊瑚', 'fire_coral'),
  cross('火珊瑚扇', 'fire_coral_fan'),
  cross('火珊瑚壁扇', 'fire_coral_wall_fan'),
  block('鹿角珊瑚块', 'horn_coral_block'),
  cross('鹿角珊瑚', 'horn_coral'),
  cross('鹿角珊瑚扇', 'horn_coral_fan'),
  cross('鹿角珊瑚壁扇', 'horn_coral_wall_fan')
)
// v5.2：下界、末地、气泡柱
BLOCKS.push(
  block('下界岩', 'netherrack'),
  block('灵魂沙', 'soul_sand'),
  block('灵魂土', 'soul_soil'),
  block('玄武岩', 'basalt_top', 'basalt'),
  block('黑石', 'blackstone'),
  block('下界金矿石', 'nether_gold_ore'),
  block('下界石英矿石', 'nether_quartz_ore'),
  block('远古残骸', 'ancient_debris_top', 'ancient_debris'),
  block('绯红菌岩', 'crimson_nylium_top', 'crimson_nylium'),
  block('诡异菌岩', 'warped_nylium_top', 'warped_nylium'),
  block('绯红菌柄', 'crimson_stem_top', 'crimson_stem'),
  block('诡异菌柄', 'warped_stem_top', 'warped_stem'),
  block('下界疣块', 'nether_wart_block'),
  block('诡异疣块', 'warped_wart_block'),
  block('菌光体', 'shroomlight'),
  cross('绯红菌', 'crimson_fungus'),
  cross('诡异菌', 'warped_fungus'),
  cross('绯红菌索', 'crimson_roots'),
  cross('诡异菌索', 'warped_roots'),
  cross('下界苗', 'nether_sprouts'),
  cross('垂泪藤', 'weeping_vines'),
  cross('垂泪藤（茎）', 'weeping_vines_plant'),
  cross('缠怨藤', 'twisting_vines'),
  cross('缠怨藤（茎）', 'twisting_vines_plant'),
  cross('火', 'fire'),
  cross('灵魂火', 'soul_fire'),
  block('末地石', 'end_stone'),
  block('紫颂植物', 'chorus_plant'),
  block('紫颂花', 'chorus_flower'),
  block('末地折跃门', 'end_gateway'),
  cross('铁栏杆', 'iron_bars'),
  block('气泡柱', 'bubble_column', 'bubble_column', 'bubble_column', { solid: false, shape: 'none', breakable: false })
)

/**
 * 原版方块名 → 方块 ID（地表规则、含水层给出的是原版名字）。
 * 原版有、这里还没有的方块，先用外观最接近的代替。
 */
export const BLOCK_BY_NAME: Record<string, BlockType> = {
  'minecraft:air': BlockType.air,
  'minecraft:stone': BlockType.stone,
  'minecraft:deepslate': BlockType.deepslate,
  'minecraft:dirt': BlockType.dirt,
  'minecraft:grass_block': BlockType.grass,
  'minecraft:sand': BlockType.sand,
  'minecraft:gravel': BlockType.gravel,
  'minecraft:water': BlockType.water,
  'minecraft:lava': BlockType.lava,
  'minecraft:bedrock': BlockType.bedrock,
  'minecraft:obsidian': BlockType.obsidian,
  'minecraft:sandstone': BlockType.sandstone,
  'minecraft:red_sand': BlockType.red_sand,
  'minecraft:red_sandstone': BlockType.red_sandstone,
  'minecraft:snow_block': BlockType.snow_block,
  'minecraft:powder_snow': BlockType.powder_snow,
  'minecraft:ice': BlockType.ice,
  'minecraft:packed_ice': BlockType.packed_ice,
  'minecraft:mud': BlockType.mud,
  'minecraft:mycelium': BlockType.mycelium,
  'minecraft:podzol': BlockType.podzol,
  'minecraft:coarse_dirt': BlockType.coarse_dirt,
  'minecraft:calcite': BlockType.calcite,
  'minecraft:terracotta': BlockType.terracotta,
  'minecraft:white_terracotta': BlockType.white_terracotta,
  'minecraft:orange_terracotta': BlockType.orange_terracotta,
  'minecraft:yellow_terracotta': BlockType.yellow_terracotta,
  'minecraft:brown_terracotta': BlockType.brown_terracotta,
  'minecraft:red_terracotta': BlockType.red_terracotta,
  'minecraft:light_gray_terracotta': BlockType.light_gray_terracotta,
  'minecraft:oak_log': BlockType.log,
  'minecraft:cobblestone': BlockType.cobblestone,
  'minecraft:oak_planks': BlockType.planks,
  'minecraft:glowstone': BlockType.glowstone,
  'minecraft:cave_air': BlockType.air,
  'minecraft:void_air': BlockType.air,
  'minecraft:oak_leaves': BlockType.leaves
}
// v5：名字和枚举名一致的方块
for (const k of Object.keys(BlockType)) {
  const v = (BlockType as unknown as Record<string, number>)[k]
  if (typeof v === 'number' && v >= BlockType.granite) BLOCK_BY_NAME[`minecraft:${k}`] = v
}

/** 方块 ID → 原版方块名（地表规则读方块时用） */
export const NAME_BY_BLOCK: string[] = []
for (const [name, b] of Object.entries(BLOCK_BY_NAME)) NAME_BY_BLOCK[b] ??= name // 别名（cave_air 等）不覆盖第一个名字
for (let b = 16; b <= 23; b++) NAME_BY_BLOCK[b] = 'minecraft:water'
for (let b = 24; b <= 31; b++) NAME_BY_BLOCK[b] = 'minecraft:lava'

// ---------------------------------------------------------------- 其余的原版方块（v8.1）

/**
 * 原版一共 1095 种方块。上面手写的 234 种（含流体的各个状态）是地形生成用得到的，编号从 v1 起就定了；
 * 其余的按原版注册顺序接在后面（blockList.json），名字就是原版名。
 * 它们的形状、碰撞箱、光照都来自原版服务端（tools/vanilla/gen-blocks.py），样子来自资源包里的模型（v7.1）。
 * 没有资源包时，程序纹理按名字挑一张差不多的（木头类用木板、石头类用圆石……），形状按碰撞箱粗略地分成方块 / 薄片 / 十字。
 */
const SHAPES_DATA = SHAPES_JSON as unknown as { shapes: number[][]; collision: Record<string, number | number[]>; hardness: Record<string, number | number[]>; sturdy: Record<string, number | number[]>; tool: Record<string, number | number[]> }
const RAW_DEFS = STATE_DEFS as unknown as Record<string, { props: [string, string[]][]; default: Record<string, string> }>

/** 原版方块的默认状态在它所有状态里的下标（原版顺序） */
function vanillaDefaultIndex(name: string): number {
  const d = RAW_DEFS[name]
  if (!d) return 0
  let i = 0
  for (const [k, values] of d.props) i = i * values.length + values.indexOf(d.default[k])
  return i
}
const perVanillaState = <T>(v: T | T[], i: number): T => (Array.isArray(v) ? v[i] : v)

/** 没有资源包时用哪张程序纹理 */
const PROC_TEXTURES: [RegExp, TextureName, TextureName?][] = [
  [/(_|^)(log|wood|stem|hyphae)$/, 'log_top', 'log'],
  [/leaves$/, 'leaves'],
  [/planks|_slab$|_stairs$|fence|door|sign|crafting_table|bookshelf|barrel|chest|lectern|loom|composter|beehive|scaffolding|ladder|table$/, 'planks'],
  [/glass|ice/, 'ice'],
  [/wool|carpet|_bed$|concrete|terracotta|shulker/, 'white_terracotta'],
  [/sandstone/, 'sandstone'],
  [/snow/, 'snow'],
  [/ore$/, 'iron_ore'],
  [/bars|chain/, 'iron_bars'],
  [/lantern|lamp|torch|campfire|candle|end_rod|froglight|glowstone/, 'glowstone'],
  [/dirt|farmland|path|mud|soil/, 'dirt'],
  [/brick|cobble|stone|deepslate|andesite|diorite|granite|tuff|blackstone|basalt|quartz|prismarine|purpur|furnace|smoker|_wall$|polished/, 'cobblestone']
]

for (const name of BLOCK_LIST as string[]) {
  if (BLOCK_BY_NAME[name] !== undefined) continue
  const short = name.slice(10)
  const di = vanillaDefaultIndex(name)
  const shape = SHAPES_DATA.shapes[perVanillaState(SHAPES_DATA.collision[name], di)]
  const hardness = perVanillaState(SHAPES_DATA.hardness[name], di)
  const [, top, side] = PROC_TEXTURES.find(([re]) => re.test(short)) ?? [null, 'stone' as TextureName]
  const full = shape.length === 6 && shape.join() === '0,0,0,1,1,1'
  // 只有一个盒子、贴着地、铺满一格的：薄片（台阶、地毯、压力板……）
  const flat = shape.length === 6 && shape[0] === 0 && shape[1] === 0 && shape[2] === 0 && shape[3] === 1 && shape[5] === 1 && shape[4] < 1
  BLOCKS.push(
    block(short, top, side ?? top, top, {
      solid: full,
      breakable: hardness >= 0,
      shape: full ? 'cube' : flat ? 'slab' : 'cross',
      height: flat ? Math.max(1, Math.round(shape[4] * 16)) : 16
    })
  )
  const b = BLOCKS.length - 1
  BLOCK_BY_NAME[name] = b
  NAME_BY_BLOCK[b] = name
}

/** 方块种类数（含所有流体状态；v8.1 起包括原版全部方块） */
export const BLOCK_COUNT = BLOCKS.length

// ---------------------------------------------------------------- 方块状态（v7，见 states.ts）

/** 名字里固定的属性：流动的水 / 岩浆的 level（原版：源 0，流动 8 − 量，下落 8），一直含水的方块 waterlogged=true */
function fixedProps(b: number): Record<string, string> {
  const f = BLOCK_FLUIDS[b]
  if ((b >= 16 && b <= 31) || b === BlockType.water || b === BlockType.lava) return { level: String(f.source ? 0 : f.falling ? 8 : 8 - f.amount) }
  if (WATERLOGGED.includes(b)) return { waterlogged: 'true' }
  return {}
}

export const STATES: StateRegistry = buildStates(
  Array.from({ length: BLOCK_COUNT }, (_, b) => NAME_BY_BLOCK[b]),
  fixedProps
)
/** 状态总数（v7）。每一格存的是状态编号；方块 b 的默认状态编号就是 b */
export const STATE_COUNT = STATES.count
/** 状态 → 方块 */
export const BLOCK_OF = STATES.blockOf
/** 调色板“直接模式”下每格的位数：ceil(log2(状态数))，原版约 2.7 万种状态 → 15 位 */
export const STATE_BITS = Math.ceil(Math.log2(STATE_COUNT))
/** 方块 + 属性 → 状态 */
export const stateOf = (b: number, props?: Record<string, string | number | boolean>) => (props ? withProps(STATES, b, props) : b)
/** 改状态的属性 */
export const withState = (s: number, props: Record<string, string | number | boolean>) => withProps(STATES, s, props)
/** 状态的一个属性 */
export const propOf = (s: number, name: string) => getProp(STATES, s, name)
export const propOfStateId = propOf
/** 状态的完整名字（原版存档的写法） */
export const fullStateName = (s: number) => stateName(STATES, s)
/** 状态 → 方块名（不带属性） */
export const NAME_BY_STATE: string[] = Array.from({ length: STATE_COUNT }, (_, s) => NAME_BY_BLOCK[BLOCK_OF[s]])

/** "minecraft:oak_log[axis=x]" 或 "minecraft:oak_log" → 状态；不认识的方块返回 undefined */
export function parseState(str: string): number | undefined {
  const i = str.indexOf('[')
  const b = BLOCK_BY_NAME[i < 0 ? str : str.slice(0, i)]
  if (b === undefined) return undefined
  if (i < 0) return b
  const props: Record<string, string> = {}
  for (const kv of str.slice(i + 1, -1).split(',')) {
    const [k, v] = kv.split('=')
    if (k) props[k] = v
  }
  // 水、岩浆的 level：换成流动的“方块”（源 0，流动 1..7 = 量 8 − level，≥ 8 下落）
  if ((b === BlockType.water || b === BlockType.lava) && props.level !== undefined) {
    const level = Number(props.level)
    const kind = b === BlockType.water ? FluidKind.water : FluidKind.lava
    return level === 0 ? b : level >= 8 ? fluidBlock(kind, 8, true) : fluidBlock(kind, 8 - level)
  }
  return withProps(STATES, b, props)
}

/**
 * 多面方块（藤蔓、发光地衣、幽匿脉络）每个状态贴着哪几面（v7），按网格的面顺序：-x, +x, -y, +y, -z, +z
 * （属性 west, east, down, up, north, south）
 */
export const FACE_MASK: Uint8Array = Uint8Array.from({ length: STATE_COUNT }, (_, s) =>
  ['west', 'east', 'down', 'up', 'north', 'south'].reduce((m, p, i) => (getProp(STATES, s, p) === 'true' ? m | (1 << i) : m), 0)
)

/** 按方块的表扩展成按状态的表 */
function perState(table: ArrayLike<number>): Uint8Array {
  return Uint8Array.from({ length: STATE_COUNT }, (_, s) => table[BLOCK_OF[s]])
}

/** 状态 → 流体状态（v7：waterlogged=true 的状态是水源） */
export const FLUIDS: FluidState[] = Array.from({ length: STATE_COUNT }, (_, s) => (getProp(STATES, s, 'waterlogged') === 'true' ? WATER_SOURCE : BLOCK_FLUIDS[BLOCK_OF[s]]))

/** 每个状态的流体种类（0 = 不是流体），网格生成时查 */
export const FLUID_KIND: Uint8Array = Uint8Array.from(FLUIDS, (f) => f.kind)

export const isFluid = (b: number) => FLUID_KIND[b] !== FluidKind.none

/**
 * 每个状态 6 个面的纹理层号，网格生成时直接查表。
 * 面的顺序：-x, +x, -y, +y, -z, +z（和 mesh/mesher.ts 的 FACE_DIRS 一致）
 */
export const FACE_TEXTURES: Uint8Array = (() => {
  const t = new Uint8Array(STATE_COUNT * 6)
  const MUSHROOM_FACES = ['west', 'east', 'down', 'up', 'north', 'south']
  for (let s = 0; s < STATE_COUNT; s++) {
    const { top, side, bottom } = BLOCKS[BLOCK_OF[s]].textures
    let faces: TextureName[] = [side, side, bottom, top, side, side]
    const p = (k: string) => getProp(STATES, s, k)
    // v7：按状态换纹理
    const axis = p('axis')
    if (axis === 'x') faces = [top, top, side, side, side, side] // 横着的原木：两头是年轮
    else if (axis === 'z') faces = [side, side, side, side, top, top]
    if (p('snowy') === 'true') faces = [faces[0], faces[1], faces[2], faces[3], faces[4], faces[5]].map((f, i) => (i === 2 || i === 3 ? f : 'grass_snow_side')) as TextureName[]
    if (/_mushroom_block$|mushroom_stem$/.test(NAME_BY_BLOCK[BLOCK_OF[s]] ?? '')) faces = faces.map((f, i) => (p(MUSHROOM_FACES[i]) === 'false' ? 'mushroom_block_inside' : f))
    if (p('berries') === 'true') faces = faces.map((f) => (f === 'cave_vines' ? 'cave_vines_lit' : f === 'cave_vines_plant' ? 'cave_vines_plant_lit' : f))
    if (p('half') === 'lower' && /sunflower|lilac|rose_bush|peony/.test(NAME_BY_BLOCK[BLOCK_OF[s]] ?? '')) faces = faces.map(() => 'tall_flower_bottom')
    t.set(
      faces.map((n) => TEXTURE_LAYER[n]),
      s * 6
    )
  }
  return t
})()

/** 物品栏里能放的方块（数字键 1–9）。水和岩浆放下去是“源”，会流开 */
export const HOTBAR: BlockType[] = [
  BlockType.grass,
  BlockType.dirt,
  BlockType.stone,
  BlockType.cobblestone,
  BlockType.planks,
  BlockType.log,
  BlockType.glowstone,
  BlockType.water,
  BlockType.lava
]

/** 实心表：SOLID[b] = 1 表示实心。网格生成时每个方块都要查好几次，用数组比查对象快 */
export const SOLID: Uint8Array = perState(Uint8Array.from({ length: BLOCK_COUNT }, (_, b) => (BLOCKS[b]?.solid ? 1 : 0)))

export const isSolid = (b: number) => SOLID[b] === 1

/** 形状（v5）：0 完整方块，1 slab（雪层、地毯），2 十字（藤蔓等） */
for (const b of [BlockType.vine, BlockType.glow_lichen, BlockType.sculk_vein]) BLOCKS[b].shape = 'multiface'
export const SHAPE: Uint8Array = perState(
  Uint8Array.from({ length: BLOCK_COUNT }, (_, b) => {
    const s = BLOCKS[b]?.shape
    return s === 'slab' ? 1 : s === 'cross' ? 2 : s === 'multiface' ? 3 : s === 'none' ? 4 : 0
  })
)
/** slab 的高度（1/16 格） */
export const SHAPE_HEIGHT: Uint8Array = Uint8Array.from(perState(Uint8Array.from({ length: BLOCK_COUNT }, (_, b) => BLOCKS[b]?.height ?? 16)), (h, s) => {
  const layers = getProp(STATES, s, 'layers') // v7：雪层的厚度
  return layers ? Number(layers) * 2 : h
})

// ---------------------------------------------------------------- 碰撞箱、破坏时间（v8.1，原版导出）

/** 碰撞箱的形状表：每项是若干个盒子，每个盒子 6 个数 x0 y0 z0 x1 y1 z1（方块内坐标 0..1）。0 号是空的，1 号是完整方块 */
export const COLLISION_SHAPES: readonly number[][] = SHAPES_DATA.shapes
/** 状态 → 碰撞箱形状编号 */
export const COLLISION: Uint16Array = Uint16Array.from({ length: STATE_COUNT }, (_, s) => {
  const v = SHAPES_DATA.collision[NAME_BY_STATE[s]]
  return v === undefined ? (SOLID[s] ? 1 : 0) : perVanillaState(v, vanillaIndex(STATES, s))
})
/** 状态 → 破坏时间（原版 destroyTime，-1 = 挖不动：基岩、屏障……） */
export const HARDNESS: Float32Array = Float32Array.from({ length: STATE_COUNT }, (_, s) => {
  const v = SHAPES_DATA.hardness[NAME_BY_STATE[s]]
  return v === undefined ? 0 : perVanillaState(v, vanillaIndex(STATES, s))
})

/**
 * 坚固的面（v9，原版 isFaceSturdy）：6 位，第 i 位是原版 Direction 的第 i 个方向（下 上 北 南 西 东）。
 * 这一面能“撑住”东西：栅栏、墙、玻璃板连不连过去，火把能不能插在上面，都看它
 */
export const STURDY: Uint8Array = Uint8Array.from({ length: STATE_COUNT }, (_, s) => {
  const v = SHAPES_DATA.sturdy[NAME_BY_STATE[s]]
  return v === undefined ? (SOLID[s] ? 63 : 0) : perVanillaState(v, vanillaIndex(STATES, s))
})

/** 要用对的工具挖才掉东西（v10，原版 requiresCorrectToolForDrops）：石头、矿石、黑曜石……空手挖得慢，而且什么都不掉 */
export const NEEDS_TOOL: Uint8Array = Uint8Array.from({ length: STATE_COUNT }, (_, s) => {
  const v = SHAPES_DATA.tool[NAME_BY_STATE[s]]
  return v === undefined ? 0 : perVanillaState(v, vanillaIndex(STATES, s))
})
