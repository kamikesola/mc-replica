import { TEXTURE_LAYER, type TextureName } from './textures/painters'

/**
 * 方块种类。和原项目的 BlockType 一样是一个枚举，值就是存进调色板的方块 ID。
 *
 * v1 起每个方块有了纹理：顶面 / 侧面 / 底面各指定一张（见 textures/painters.ts）。
 * 原版的“方块状态”（朝向、台阶上下半等）留到 v7。
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
  /** 顶面 / 侧面 / 底面的纹理 */
  textures: { top: TextureName; side: TextureName; bottom: TextureName }
  /** 实心：会挡住玩家，也会挡住相邻方块的面 */
  solid: boolean
  /** 能不能被玩家挖掉 */
  breakable: boolean
}

const block = (name: string, top: TextureName, side = top, bottom = top, extra: Partial<BlockInfo> = {}): BlockInfo => ({
  name,
  textures: { top, side, bottom },
  solid: true,
  breakable: true,
  ...extra
})

export const BLOCKS: Record<BlockType, BlockInfo> = {
  [BlockType.air]: block('空气', 'stone', 'stone', 'stone', { solid: false, breakable: false }),
  [BlockType.stone]: block('石头', 'stone'),
  [BlockType.deepslate]: block('深板岩', 'deepslate_top', 'deepslate'),
  [BlockType.dirt]: block('泥土', 'dirt'),
  [BlockType.grass]: block('草方块', 'grass_top', 'grass_side', 'dirt'),
  [BlockType.sand]: block('沙子', 'sand'),
  [BlockType.gravel]: block('沙砾', 'gravel'),
  [BlockType.water]: block('水', 'water', 'water', 'water', { solid: false, breakable: false }),
  [BlockType.bedrock]: block('基岩', 'bedrock', 'bedrock', 'bedrock', { breakable: false }),
  [BlockType.planks]: block('木板', 'planks'),
  [BlockType.cobblestone]: block('圆石', 'cobblestone'),
  [BlockType.log]: block('原木', 'log_top', 'log'),
  [BlockType.leaves]: block('树叶', 'leaves'),
  [BlockType.glowstone]: block('萤石', 'glowstone')
}

/** 方块种类数 */
export const BLOCK_COUNT = Object.keys(BLOCKS).length

/** 调色板“直接模式”下每格的位数：ceil(log2(方块种类数))，原版约 2.6 万种状态 → 15 位 */
export const BLOCK_BITS = Math.ceil(Math.log2(BLOCK_COUNT))

/**
 * 每种方块 6 个面的纹理层号，网格生成时直接查表。
 * 面的顺序：-x, +x, -y, +y, -z, +z（和 mesh/greedy.ts 的 FACES 一致）
 */
export const FACE_TEXTURES: Uint8Array = (() => {
  const t = new Uint8Array(BLOCK_COUNT * 6)
  for (let b = 0; b < BLOCK_COUNT; b++) {
    const { top, side, bottom } = BLOCKS[b as BlockType].textures
    const layers = [side, side, bottom, top, side, side].map((n) => TEXTURE_LAYER[n])
    t.set(layers, b * 6)
  }
  return t
})()

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

/** 实心表：SOLID[b] = 1 表示实心。网格生成时每个方块都要查好几次，用数组比查对象快 */
export const SOLID: Uint8Array = Uint8Array.from({ length: 256 }, (_, b) => (BLOCKS[b as BlockType]?.solid ? 1 : 0))

export const isSolid = (b: number) => SOLID[b] === 1
