import { BLOCK_BY_NAME, BLOCK_OF, NAME_BY_BLOCK } from '../terrain/blocks'
import ITEM_LIST from './itemList.json'

/**
 * 物品（v10）。原版的物品和方块是两套东西：
 *   方块在世界里（状态、碰撞箱、模型），物品在背包里（名字、能叠多少个、图标）
 * 大部分方块有一个同名的物品（石头 → 石头），也有不同名的（红石粉放下去是红石线，小麦种子放下去是小麦）；
 * 很多物品放不下去（木棍、钻石、生肉……）。
 *
 * 物品就用原版的名字（"minecraft:stone"）表示，背包里一格是 { item, count }。
 */

export interface ItemStack {
  item: string
  count: number
}

/** 原版全部物品 → 最大堆叠数（tools/vanilla/gen-items.py，来自数据报告） */
export const MAX_STACK = new Map<string, number>((ITEM_LIST as [string, number][]).map(([n, m]) => [n, m]))

export const isItem = (name: string) => MAX_STACK.has(name)
export const maxStack = (item: string) => MAX_STACK.get(item) ?? 64

/** 名字不一样的“物品 → 方块”（原版 Items 里 new BlockItem(Blocks.XXX) 名字对不上的那些） */
const PLACES: Record<string, string> = {
  redstone: 'redstone_wire',
  string: 'tripwire',
  wheat_seeds: 'wheat',
  carrot: 'carrots',
  potato: 'potatoes',
  beetroot_seeds: 'beetroots',
  melon_seeds: 'melon_stem',
  pumpkin_seeds: 'pumpkin_stem',
  sweet_berries: 'sweet_berry_bush',
  glow_berries: 'cave_vines',
  cocoa_beans: 'cocoa',
  torchflower_seeds: 'torchflower_crop',
  pitcher_pod: 'pitcher_crop'
}
/** 反过来：方块 → 拿到的物品（原版 getCloneItemStack：贴墙的火把是火把，红石线是红石粉……） */
const PICKS: Record<string, string> = Object.fromEntries(Object.entries(PLACES).map(([i, b]) => [b, i]))
Object.assign(PICKS, {
  wall_torch: 'torch',
  soul_wall_torch: 'soul_torch',
  redstone_wall_torch: 'redstone_torch',
  water: 'water_bucket',
  lava: 'lava_bucket',
  piston_head: 'piston',
  tall_seagrass: 'seagrass',
  kelp_plant: 'kelp',
  cave_vines_plant: 'glow_berries',
  weeping_vines_plant: 'weeping_vines',
  twisting_vines_plant: 'twisting_vines',
  big_dripleaf_stem: 'big_dripleaf',
  bamboo_sapling: 'bamboo',
  attached_melon_stem: 'melon_seeds',
  attached_pumpkin_stem: 'pumpkin_seeds'
})

/** 物品放下去是哪个方块（默认状态）；放不下去的返回 undefined */
export function blockOfItem(item: string): number | undefined {
  const short = item.slice(10)
  return BLOCK_BY_NAME[`minecraft:${PLACES[short] ?? short}`]
}

/** 方块（状态）对应的物品（创造模式的“选方块”）；没有返回 undefined */
export function itemOfBlock(s: number): string | undefined {
  const name = NAME_BY_BLOCK[BLOCK_OF[s]]?.slice(10)
  if (!name) return undefined
  const short = PICKS[name] ?? name.replace(/_wall_(sign|hanging_sign|banner|skull|head|fan)$/, '_$1').replace(/_coral_wall_fan$/, '_coral_fan')
  const id = `minecraft:${short}`
  return isItem(id) ? id : undefined
}

/** 显示用的名字：原版的英文名（"oak_planks" → "Oak Planks"），没有翻译文件 */
export function itemName(item: string): string {
  return item
    .slice(10)
    .split('_')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ')
}
