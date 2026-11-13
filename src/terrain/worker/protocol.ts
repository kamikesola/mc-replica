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
  packs: { name: string; count: number }[]
}

export interface ChunkData {
  cx: number
  cz: number
  /** 每个 section 的方块（调色板 + 位压缩数组），从下往上 */
  sections: PalettedData[]
  /** 每个 section 的网格；整段没有面时为 null */
  meshes: SectionMeshes[]
  /** 区块加载后要马上更新一次的流体（区块内编号，见 Chunk.index），让含水层边上的水流进洞里 */
  fluidUpdates: Int32Array
  ms: number
}

export interface Requests {
  /** 设置种子和 noise_settings，返回世界信息 */
  init: [{ seed: string; settings: string }, WorldInfo]
  /** 生成一个区块：方块 + 网格。greedy=false 时不合并面（对比用） */
  chunk: [{ cx: number; cz: number; greedy: boolean }, ChunkData]
  /** F3 调试屏的 NoiseRouter 一行 */
  f3: [{ x: number; y: number; z: number }, { line: string }]
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
