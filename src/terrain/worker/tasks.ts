/**
 * 区块生成的三种任务（v10.2）。主线程的调度器（terrain/generator.ts）决定什么时候做哪个，
 * Worker 只负责算；算好的原型和装饰交回主线程保存，以后谁要用就发给谁。
 *
 *   原型 proto      地形 + 含水层 + 地表 + 雕刻器（protoChunk）
 *   装饰 decorate   在周围 3×3 个原型上放这个区块的地物；要先有同一装饰区域里排在前面的装饰（decorationDeps）
 *   组装 assemble   原型 + 周围 3×3 的装饰 → 最终区块（generateChunk 的后半段：拼邻居、颜色、压缩）
 *
 * 为什么要拆：v10.1 以前每个 Worker 自己算自己要的一切，邻居区块的原型和装饰在好几个 Worker 里各算一遍，
 * 81 个区块要算 398 次原型。拆开以后每个原型、每个装饰在整个游戏里只算一次。
 *
 * 这里的计算全部复用 ChunkSource 的代码：先把主线程发来的结果放进它的缓存（putProto / putDecoration），
 * 再调用原来的 proto() / decoration() / generateChunk()，它们在缓存里找到现成的就不会再算。
 * 所以结果和以前一个 Worker 从头算到尾逐格相同（tests/generator.test.ts 核对）。
 */
import type { NoiseSettingsInfo, Worldgen } from '../worldgen'
import type { ChunkData } from './protocol'
import { type Decoration, type Proto } from './pipeline'
import { chunkSource, generateChunk } from './surface'

/** 周围 3×3 的偏移，先 z 后 x（和 ChunkSource、generateChunk 的顺序一样） */
export const AROUND: [number, number][] = [-1, 0, 1].flatMap((dz) => [-1, 0, 1].map((dx) => [dx, dz] as [number, number]))

export function protoTask(wg: Worldgen, settingsId: string, s: NoiseSettingsInfo, cx: number, cz: number): Proto {
  const src = chunkSource(wg, settingsId, s)
  src.clear()
  const p = src.proto(cx, cz)
  src.clear()
  return p
}

/**
 * protos：(cx, cz) 周围 3×3 的原型（AROUND 的顺序）；priors：decorationDeps(cx, cz) 里每个区块的装饰
 */
export function decorateTask(
  wg: Worldgen,
  settingsId: string,
  s: NoiseSettingsInfo,
  cx: number,
  cz: number,
  protos: Proto[],
  priors: [number, number, Decoration][]
): Decoration {
  const src = chunkSource(wg, settingsId, s)
  src.clear()
  AROUND.forEach(([dx, dz], i) => src.putProto(cx + dx, cz + dz, protos[i]))
  for (const [ex, ez, d] of priors) src.putDecoration(ex, ez, d)
  const d = src.decoration(cx, cz)
  src.clear()
  return d
}

/**
 * protos、decorations：(cx, cz) 周围 3×3 的原型和装饰（AROUND 的顺序）；没有地物的世界 decorations 为 null
 */
export function assembleTask(
  wg: Worldgen,
  settingsId: string,
  s: NoiseSettingsInfo,
  cx: number,
  cz: number,
  protos: Proto[],
  decorations: Decoration[] | null
): ChunkData {
  const src = chunkSource(wg, settingsId, s)
  src.clear()
  AROUND.forEach(([dx, dz], i) => {
    src.putProto(cx + dx, cz + dz, protos[i])
    if (decorations) src.putDecoration(cx + dx, cz + dz, decorations[i])
  })
  const { meshes: _, ...data } = generateChunk(wg, settingsId, s, cx, cz, { mesh: false })
  src.clear()
  return data
}

/** 原型里要转移（不复制）给主线程的内存 */
export const protoBuffers = (p: Proto): ArrayBufferLike[] => [p.blocks.buffer, p.fluidUpdates.buffer, p.worldSurfaceWG.buffer, p.oceanFloorWG.buffer]
export const decorationBuffers = (d: Decoration): ArrayBufferLike[] => d.flatMap((part) => [part.idx.buffer, part.ids.buffer])
