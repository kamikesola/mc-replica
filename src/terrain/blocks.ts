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
  lava = 15
  // 16..22 流动的水（量 1..7），23 下落的水；24..30 流动的岩浆，31 下落的岩浆
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
}

const block = (name: string, top: TextureName, side = top, bottom = top, extra: Partial<BlockInfo> = {}): BlockInfo => ({
  name,
  textures: { top, side, bottom },
  solid: true,
  breakable: true,
  ...extra
})
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
