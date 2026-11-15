import { ALWAYS_WATERLOGGED } from './worldgen/feature/core'
import { TEXTURE_LAYER, type TextureName } from './textures/painters'

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
  short_grass, fern, tall_grass, large_fern, dead_bush, dandelion, poppy, blue_orchid, allium, azure_bluet, red_tulip, orange_tulip, white_tulip, pink_tulip, oxeye_daisy, cornflower, lily_of_the_valley, closed_eyeblossom, open_eyeblossom, sunflower, lilac, rose_bush, peony, brown_mushroom, red_mushroom, sweet_berry_bush, sugar_cane, bamboo, azalea, flowering_azalea, pink_petals, lily_pad, pumpkin, melon, cactus, seagrass, tall_seagrass, kelp, kelp_plant, sea_pickle, glow_lichen, hanging_roots, spore_blossom, cave_vines, cave_vines_plant, small_dripleaf, big_dripleaf, big_dripleaf_stem, moss_block, pale_moss_block, dripstone_block, pointed_dripstone, smooth_basalt, amethyst_block, budding_amethyst, small_amethyst_bud, medium_amethyst_bud, large_amethyst_bud, amethyst_cluster, sculk, sculk_vein, sculk_sensor, sculk_shrieker, sculk_catalyst, blue_ice, mossy_cobblestone, magma_block, spawner, chest, bone_block, suspicious_sand, suspicious_gravel, sandstone_slab, tube_coral_block, tube_coral, tube_coral_fan, tube_coral_wall_fan, brain_coral_block, brain_coral, brain_coral_fan, brain_coral_wall_fan, bubble_coral_block, bubble_coral, bubble_coral_fan, bubble_coral_wall_fan, fire_coral_block, fire_coral, fire_coral_fan, fire_coral_wall_fan, horn_coral_block, horn_coral, horn_coral_fan, horn_coral_wall_fan
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

/** 方块 ID → 流体状态（查表） */
export const FLUIDS: FluidState[] = Array.from({ length: 256 }, () => NO_FLUID)
for (const kind of [FluidKind.water, FluidKind.lava] as const) {
  FLUIDS[kind === FluidKind.water ? BlockType.water : BlockType.lava] = { kind, amount: 8, source: true, falling: false }
  for (let a = 1; a <= 7; a++) FLUIDS[FLOW_BASE[kind] + a - 1] = { kind, amount: a, source: false, falling: false }
  FLUIDS[FLOW_BASE[kind] + 7] = { kind, amount: 8, source: false, falling: true }
}

/** 每个方块 ID 的流体种类（0 = 不是流体），网格生成时查 */
/** 含水的方块（v5.1）：海草、海带、珊瑚……原版里它们和水源在同一格，这里当成“水源 + 一个十字形的面” */
export const WATERLOGGED: BlockType[] = [...ALWAYS_WATERLOGGED].map((n) => BlockType[n.slice(10) as keyof typeof BlockType])
for (const b of WATERLOGGED) FLUIDS[b] = { kind: FluidKind.water, amount: 8, source: true, falling: false }

export const FLUID_KIND: Uint8Array = Uint8Array.from(FLUIDS, (f) => f.kind)

export const isFluid = (b: number) => FLUID_KIND[b] !== FluidKind.none

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
  shape: 'cube' | 'slab' | 'cross' | 'multiface'
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

/** 方块种类数（含所有流体状态） */
export const BLOCK_COUNT = BLOCKS.length

/** 调色板“直接模式”下每格的位数：ceil(log2(方块种类数))，原版约 2.6 万种状态 → 15 位 */
export const BLOCK_BITS = Math.ceil(Math.log2(BLOCK_COUNT))

/**
 * 每种方块 6 个面的纹理层号，网格生成时直接查表。
 * 面的顺序：-x, +x, -y, +y, -z, +z（和 mesh/mesher.ts 的 FACE_DIRS 一致）
 */
export const FACE_TEXTURES: Uint8Array = (() => {
  const t = new Uint8Array(BLOCK_COUNT * 6)
  for (let b = 0; b < BLOCK_COUNT; b++) {
    const { top, side, bottom } = BLOCKS[b].textures
    const layers = [side, side, bottom, top, side, side].map((n) => TEXTURE_LAYER[n])
    t.set(layers, b * 6)
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
export const SOLID: Uint8Array = Uint8Array.from({ length: 256 }, (_, b) => (BLOCKS[b]?.solid ? 1 : 0))

export const isSolid = (b: number) => SOLID[b] === 1

/** 形状（v5）：0 完整方块，1 slab（雪层、地毯），2 十字（藤蔓等） */
for (const b of [BlockType.vine, BlockType.glow_lichen, BlockType.sculk_vein]) BLOCKS[b].shape = 'multiface'
export const SHAPE: Uint8Array = Uint8Array.from({ length: 256 }, (_, b) => {
  const s = BLOCKS[b]?.shape
  return s === 'slab' ? 1 : s === 'cross' ? 2 : s === 'multiface' ? 3 : 0
})
/** slab 的高度（1/16 格） */
export const SHAPE_HEIGHT: Uint8Array = Uint8Array.from({ length: 256 }, (_, b) => BLOCKS[b]?.height ?? 16)
