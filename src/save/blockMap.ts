import { BLOCK_BY_NAME, BlockType, parseState, stateOf } from '../terrain/blocks'

/**
 * 原版存档里的方块状态 → 我们的状态编号（v8）。
 *
 * 我们只有 234 种方块（地形生成会用到的那些）。原版存档里，玩家盖的房子、村庄、要塞会有很多别的方块：
 * 木板台阶、工作台、火把、羊毛……这些先换成样子最接近的方块（木头类 → 橡木木板，石头类 → 圆石……），
 * 换不了的算“不认识”，当作空气，并且记下数量（菜单和 F3 里显示）。
 */

/** 按名字猜一个代替品：[匹配原版名字（不带命名空间）, 代替的方块] */
const SUBSTITUTES: [RegExp, BlockType][] = [
  [/(_|^)(log|wood|stem|hyphae)$/, BlockType.log],
  [/_leaves$/, BlockType.leaves],
  [/planks|_slab$|_stairs$|_fence|_door$|_trapdoor$|crafting_table|bookshelf|barrel|chest|_sign$|_hanging_sign$|lectern|loom|composter|beehive|scaffolding|ladder|cartography|fletching|smithing/, BlockType.planks],
  [/glass/, BlockType.ice],
  [/wool$|carpet$|_bed$|concrete|glazed_terracotta|_terracotta$|shulker_box/, BlockType.white_terracotta],
  [/sandstone/, BlockType.sandstone],
  [/snow/, BlockType.snow_block],
  [/ore$/, BlockType.iron_ore],
  [/brick|cobble|stone|deepslate|andesite|diorite|granite|tuff|blackstone|basalt|quartz|prismarine|purpur|furnace|smoker|dispenser|dropper|observer|piston|anvil|cauldron|grindstone|stonecutter|lodestone|_wall$|polished|chiseled|cut_|smooth_|block$/, BlockType.cobblestone],
  [/dirt|farmland|path|mud/, BlockType.dirt],
  [/lantern|lamp|torch|campfire|candle|end_rod|sea_lantern|froglight/, BlockType.glowstone],
  [/grass|fern|bush|sapling|flower|tulip|orchid|rose|lily|mushroom$|crop|wheat|carrots|potatoes|beetroots|melon_stem|pumpkin_stem|cocoa/, BlockType.short_grass]
]

export class BlockMapper {
  private readonly cache = new Map<string, number>()
  /** 换成了别的方块的原版方块：名字 → 格数 */
  readonly substituted = new Map<string, number>()
  /** 不认识、当成空气的原版方块：名字 → 格数 */
  readonly unknown = new Map<string, number>()

  /** state 形如 "minecraft:oak_log[axis=x]"（属性按名字排序，和 tools/vanilla/anvil.ts 一样） */
  map(state: string, count = 1): number {
    let s = this.cache.get(state)
    if (s === undefined) {
      s = this.lookup(state)
      this.cache.set(state, s)
    }
    if (s < 0) {
      const name = baseName(state)
      const book = s === -1 ? this.unknown : this.substituted
      book.set(name, (book.get(name) ?? 0) + count)
      return s === -1 ? BlockType.air : this.substituteOf(state)
    }
    return s
  }

  private readonly subs = new Map<string, number>()
  private substituteOf(state: string): number {
    return this.subs.get(state)!
  }

  /** ≥ 0：认识的状态；-1：不认识；-2：换成了代替品（存在 subs 里） */
  private lookup(state: string): number {
    try {
      const s = parseState(state)
      if (s !== undefined) return s
    } catch {
      // 属性的取值我们没有（比如更新的版本加的），按只有名字处理
    }
    const name = baseName(state)
    if (BLOCK_BY_NAME[name] !== undefined) return BLOCK_BY_NAME[name]
    const short = name.replace(/^minecraft:/, '')
    for (const [re, b] of SUBSTITUTES) {
      if (!re.test(short)) continue
      // 原木保留朝向
      const axis = /axis=([xyz])/.exec(state)?.[1]
      this.subs.set(state, b === BlockType.log && axis ? stateOf(b, { axis }) : b)
      return -2
    }
    return -1
  }
}

const baseName = (state: string) => (state.includes('[') ? state.slice(0, state.indexOf('[')) : state)
