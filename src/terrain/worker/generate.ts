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
import { generateChunk } from './surface'

const ready: Promise<Worldgen> = loadPacks().then((packs) => new Worldgen(packs))

let settingsId = ''
let settings: NoiseSettingsInfo | null = null

type Handler<M extends Method> = (wg: Worldgen, p: Params<M>) => [Result<M>, Transferable[]]

const handlers: { [M in Method]: Handler<M> } = {
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
        packs: wg.packs
      },
      []
    ]
  },

  chunk(wg, p) {
    if (!settings) throw new Error('还没有 init')
    const r = generateChunk(wg, settingsId, settings, p.cx, p.cz, { greedy: p.greedy })
    // 所有数组的底层内存直接“转移”给主线程，不复制
    const buffers: ArrayBufferLike[] = [r.fluidUpdates.buffer]
    for (const s of r.sections) if (s.data) buffers.push(s.data.buffer)
    for (const m of r.meshes) {
      if (!m) continue
      for (const part of [m.opaque, m.water]) buffers.push(part.positions.buffer, part.info.buffer, part.indices.buffer)
    }
    return [r, buffers as Transferable[]]
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
    return [{ line: 'NoiseRouter ' + parts.join(' ') }, []]
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
    const [result, t] = (handlers[method] as Handler<Method>)(wg, params)
    reply = { id, ok: true, result }
    transfer = t
  } catch (err) {
    reply = { id, ok: false, error: (err as Error).message }
  }
  self.postMessage(reply, { transfer })
}
