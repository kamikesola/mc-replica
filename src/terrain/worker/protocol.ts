import type { PalettedData } from '../chunk/PalettedContainer'
import type { SectionMeshes } from './surface'

/**
 * 主线程 ↔ 地形 Worker 的消息格式。
 *
 * 每个方法登记 [参数, 返回值]：主线程 pool.call('chunk', {...}) 能拿到正确的返回类型，
 * Worker 里的处理函数也会被类型检查。
 */
export interface WorldInfo {
  seed: string
  settings: string
  /** 可选的 noise_settings（下拉框用） */
  allSettings: string[]
  /** 当前 noise_settings 的 router 字段（噪声图面板用） */
  routerFields: string[]
  minY: number
  height: number
  seaLevel: number
  /** 这个维度有没有天空光（v6：主世界有，下界、末地没有） */
  hasSkyLight: boolean
  packs: { name: string; count: number }[]
}

export interface ChunkData {
  cx: number
  cz: number
  /** 每个 section 的方块（调色板 + 位压缩数组），从下往上 */
  sections: PalettedData[]
  /** 不压缩的方块（v6），下标 ((y - minY) * 16 + z) * 16 + x，算光照时要发给 Worker */
  blocks: Uint8Array
  /** 区块加载后要马上更新一次的流体（区块内编号，见 Chunk.index），让含水层边上的水流进洞里 */
  fluidUpdates: Int32Array
  /** 每一列草 / 树叶 / 水的颜色（v4）：[(lz*16+lx)*3 + 种类]*3 + RGB，种类 0 草 1 树叶 2 水 */
  tints: Uint8Array
  ms: number
}

export interface Requests {
  /** 设置种子和 noise_settings，返回世界信息 */
  init: [{ seed: string; settings: string }, WorldInfo]
  /** 生成一个区块的方块（v6 起不再顺便生成网格） */
  chunk: [{ cx: number; cz: number }, ChunkData]
  /**
   * 光照 + 网格（v6）：chunks 是周围 3×3 个区块的方块（先 z 后 x），返回中心区块 18×18 列的光照和每个 section 的网格。
   * greedy=false 时不合并面（对比用）
   */
  light: [{ chunks: Uint8Array[]; greedy: boolean }, { light: Uint8Array; meshes: SectionMeshes[]; ms: number }]
  /** 天空和雾的颜色（v6）：玩家所在位置周围的生物群系 sky_color / fog_color 按原版 CubicSampler 平均 */
  skyColors: [{ x: number; y: number; z: number }, { sky: [number, number, number]; fog: [number, number, number] }]
  /** F3 调试屏的 NoiseRouter 一行 */
  f3: [{ x: number; y: number; z: number }, { line: string; biome: string }]
  /** 噪声图面板：以 (cx, cz) 为中心采一张 size×size 的俯视图 */
  slice: [{ field: string; cx: number; cy: number; cz: number; size: number; step: number }, { values: Float32Array; min: number; max: number }]
}

export type Method = keyof Requests
export type Params<M extends Method> = Requests[M][0]
export type Result<M extends Method> = Requests[M][1]

export interface RequestMessage<M extends Method = Method> {
  id: number
  method: M
  params: Params<M>
}

export type ResponseMessage = { id: number; ok: true; result: unknown } | { id: number; ok: false; error: string }
