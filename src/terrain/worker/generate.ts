/// <reference lib="webworker" />
/**
 * 地形 Worker（对应原项目的 terrain/worker/generate.ts）。
 *
 * 为什么放 Worker：原版主世界一个区块要算 10 万个方块的密度，在主线程里算会卡掉好几帧。
 * Terrain 会开几个这样的 Worker 一起干活（见 pool.ts）。
 *
 * 启动时读一次数据包、建一个 Worldgen；之后每条消息都在它上面求值。
 */
import { type NoiseSettingsInfo, Worldgen } from '../worldgen'
import { peaksAndValleys } from '../worldgen/density/peaksAndValleys'
import { loadPacks } from './datapacks'
import type { Method, Params, RequestMessage, ResponseMessage, Result } from './protocol'
import { chunkFromBlocks, generateChunk, meshChunk } from './surface'
import { chunkNbt, decodeChunk } from '../../save/anvil'
import { BlockMapper } from '../../save/blockMap'
import { settleLeaves } from '../worldgen/feature/settle'
import { gaussianSampleRgb } from '../../sky/formulas'
import { setModels } from '../models'

const ready: Promise<Worldgen> = loadPacks().then((packs) => new Worldgen(packs))

let settingsId = ''
/** 维度有没有天空光：noise_settings 是下界、末地的没有（原版 dimension_type 的 has_skylight） */
const hasSkyLight = (id: string) => !/nether|end/.test(id)
let settings: NoiseSettingsInfo | null = null

type Handler<M extends Method> = (wg: Worldgen, p: Params<M>) => [Result<M>, Transferable[]] | Promise<[Result<M>, Transferable[]]>

const handlers: { [M in Method]: Handler<M> } = {
  models(_wg, p) {
    setModels(p.models)
    return [null, []]
  },

  init(wg, p) {
    const seed = wg.setSeed(p.seed)
    const all = [...wg.settings.keys()]
    // 指定的不存在时：有原版主世界就用原版，否则用 demo 的简化地形
    settingsId = all.includes(p.settings)
      ? p.settings
      : (['minecraft:overworld', 'demo:overworld_lite'].find((id) => all.includes(id)) ?? all[0])
    settings = wg.getSettings(settingsId)
    return [
      {
        seed: seed.toString(),
        settings: settingsId,
        allSettings: all,
        routerFields: Object.keys(settings.router),
        minY: settings.minY,
        height: settings.height,
        seaLevel: settings.seaLevel,
        hasSkyLight: hasSkyLight(settingsId),
        packs: wg.packs
      },
      []
    ]
  },

  async vanillaChunk(_wg, p) {
    if (!settings) throw new Error('还没有 init')
    const mapper = new BlockMapper()
    const d = decodeChunk(await chunkNbt(p.compression, p.data), settings.minY, settings.height, mapper)
    if (!d.full) return [{ chunk: null, substituted: {}, unknown: {} }, []]
    const chunk = chunkFromBlocks(_wg, settingsId, settings, p.cx, p.cz, d.blocks)
    const buffers: ArrayBufferLike[] = [chunk.tints.buffer, chunk.blocks.buffer]
    for (const s of chunk.sections) if (s.data) buffers.push(s.data.buffer)
    return [{ chunk, substituted: Object.fromEntries(mapper.substituted), unknown: Object.fromEntries(mapper.unknown) }, buffers as Transferable[]]
  },

  chunk(wg, p) {
    if (!settings) throw new Error('还没有 init')
    const r = generateChunk(wg, settingsId, settings, p.cx, p.cz, { mesh: false })
    // 所有数组的底层内存直接“转移”给主线程，不复制
    const buffers: ArrayBufferLike[] = [r.fluidUpdates.buffer, r.tints.buffer, r.blocks.buffer]
    for (const s of r.sections) if (s.data) buffers.push(s.data.buffer)
    const { meshes: _, ...data } = r
    return [data, buffers as Transferable[]]
  },

  light(_wg, p) {
    if (!settings) throw new Error('还没有 init')
    const t0 = performance.now()
    // v7：先“落定”（树叶的 distance，见 settle.ts），改了哪些格子要告诉主线程
    const before = p.chunks[4].slice()
    settleLeaves(p.chunks, settings.height)
    const changes: number[] = []
    for (let i = 0; i < before.length; i++) if (before[i] !== p.chunks[4][i]) changes.push(i, p.chunks[4][i])
    const r = { ...meshChunk(p.chunks, settings.height, hasSkyLight(settingsId), { greedy: p.greedy }, [p.cx * 16, settings.minY, p.cz * 16]), changes: Int32Array.from(changes) }
    const buffers: ArrayBufferLike[] = [r.light.buffer, r.changes.buffer]
    for (const m of r.meshes) {
      if (!m) continue
      for (const part of [m.opaque, m.water]) buffers.push(part.positions.buffer, part.uv.buffer, part.info.buffer, part.light.buffer, part.indices.buffer)
    }
    return [{ ...r, ms: performance.now() - t0 }, buffers as Transferable[]]
  },

  skyColors(wg, p) {
    const biomes = wg.biomes(settingsId)
    // 原版 ClientLevel.getSkyColor / FogRenderer：(位置 - 2) / 4 换成 quart 坐标，周围 6×6×6 个群系按高斯核加权
    const at = (pick: (b: ReturnType<Worldgen['biome']>) => number) =>
      gaussianSampleRgb((p.x - 2) * 0.25, (p.y - 2) * 0.25, (p.z - 2) * 0.25, (qx, qy, qz) => pick(wg.biome(biomes.noiseBiome(qx, qy, qz))))
    return [{ sky: at((b) => b.skyColor), fog: at((b) => b.fogColor) }, []]
  },

  f3(wg, p) {
    // 与游戏里 F3 调试屏同格式；原版用 DecimalFormat("0.000")
    const fmt = (v: number) => (Object.is(v, -0) ? 0 : v).toFixed(3)
    const ctx = { blockX: p.x, blockY: p.y, blockZ: p.z }
    const fields = [
      ['T', 'temperature'],
      ['V', 'vegetation'],
      ['C', 'continents'],
      ['E', 'erosion'],
      ['D', 'depth'],
      ['W', 'ridges'],
      ['AS', 'initial_density_without_jaggedness'],
      ['N', 'final_density']
    ] as const
    const parts: string[] = []
    for (const [label, field] of fields) {
      const v = wg.router(settingsId, field).compute(ctx)
      parts.push(`${label}: ${fmt(v)}`)
      if (label === 'W') parts.push(`PV: ${fmt(peaksAndValleys(v))}`) // F3 里的 PV 是拿 W 现算的
    }
    // 生物群系：和原版 F3 的 "Biome: minecraft:plains" 一样，是脚下这个方块位置的群系
    return [{ line: 'NoiseRouter ' + parts.join(' '), biome: wg.biomes(settingsId).getBiome(p.x, p.y, p.z) }, []]
  },

  slice(wg, p) {
    const f = wg.sampler({ kind: 'router', settings: settingsId, field: p.field })
    const values = new Float32Array(p.size * p.size)
    const ctx = { blockX: 0, blockY: p.cy, blockZ: 0 }
    let min = Infinity
    let max = -Infinity
    for (let j = 0; j < p.size; j++) {
      for (let i = 0; i < p.size; i++) {
        ctx.blockX = Math.floor(p.cx + (i - p.size / 2) * p.step)
        ctx.blockZ = Math.floor(p.cz + (j - p.size / 2) * p.step)
        const v = f(ctx)
        values[j * p.size + i] = v
        if (v < min) min = v
        if (v > max) max = v
      }
    }
    return [{ values, min, max }, [values.buffer]]
  }
}

self.onmessage = async (e: MessageEvent<RequestMessage>) => {
  const { id, method, params } = e.data
  let reply: ResponseMessage
  let transfer: Transferable[] = []
  try {
    const wg = await ready
    const [result, t] = await (handlers[method] as Handler<Method>)(wg, params)
    reply = { id, ok: true, result }
    transfer = t
  } catch (err) {
    reply = { id, ok: false, error: (err as Error).message }
  }
  self.postMessage(reply, { transfer })
}
