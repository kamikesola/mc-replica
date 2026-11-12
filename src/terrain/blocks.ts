/**
 * 方块种类。和原项目的 BlockType 一样是一个枚举，值存进区块的 Uint8Array 里。
 *
 * v0 还没有纹理（原版纹理有版权，v1 做纹理图集时换成自己画的 / CC0 的），
 * 每种方块先用一个颜色表示。
 */
export enum BlockType {
  air = 0,
  stone = 1,
  deepslate = 2,
  dirt = 3,
  grass = 4,
  sand = 5,
  gravel = 6,
  water = 7,
  bedrock = 8,
  planks = 9,
  cobblestone = 10,
  log = 11,
  leaves = 12,
  glowstone = 13
}

export interface BlockInfo {
  name: string
  /** 顶面颜色 / 侧面颜色 / 底面颜色（0..1 的 RGB） */
  top: [number, number, number]
  side: [number, number, number]
  bottom: [number, number, number]
  /** 实心：会挡住玩家，也会挡住相邻方块的面 */
  solid: boolean
  /** 能不能被玩家挖掉 */
  breakable: boolean
}

const rgb = (hex: number): [number, number, number] => [((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255]
const same = (hex: number, name: string, extra: Partial<BlockInfo> = {}): BlockInfo => ({
  name,
  top: rgb(hex),
  side: rgb(hex),
  bottom: rgb(hex),
  solid: true,
  breakable: true,
  ...extra
})

export const BLOCKS: Record<BlockType, BlockInfo> = {
  [BlockType.air]: { ...same(0, '空气'), solid: false, breakable: false },
  [BlockType.stone]: same(0x7f7f7f, '石头'),
  [BlockType.deepslate]: same(0x50505a, '深板岩'),
  [BlockType.dirt]: same(0x866043, '泥土'),
  [BlockType.grass]: { ...same(0x866043, '草方块'), top: rgb(0x6aa84f) },
  [BlockType.sand]: same(0xdbd3a0, '沙子'),
  [BlockType.gravel]: same(0x857f7a, '沙砾'),
  [BlockType.water]: { ...same(0x3f76e4, '水'), solid: false, breakable: false },
  [BlockType.bedrock]: { ...same(0x3a3a3a, '基岩'), breakable: false },
  [BlockType.planks]: same(0xa2834f, '木板'),
  [BlockType.cobblestone]: same(0x6b6b6b, '圆石'),
  [BlockType.log]: { ...same(0x6b5132, '原木'), top: rgb(0xa58a5e), bottom: rgb(0xa58a5e) },
  [BlockType.leaves]: same(0x3f7a2a, '树叶'),
  [BlockType.glowstone]: same(0xf3d27a, '萤石')
}

/** 物品栏里能放的方块（数字键 1–9） */
export const HOTBAR: BlockType[] = [
  BlockType.grass,
  BlockType.dirt,
  BlockType.stone,
  BlockType.cobblestone,
  BlockType.planks,
  BlockType.log,
  BlockType.leaves,
  BlockType.sand,
  BlockType.glowstone
]

export const isSolid = (b: number) => BLOCKS[b as BlockType]?.solid ?? false
