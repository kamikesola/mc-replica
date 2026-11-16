/**
 * 把我们生成的区块和原版存档里的区块逐格比较。
 *
 *   tsx tools/vanilla/diff.ts <原版存档的 world 目录> <cx0> <cz0> [cx1 cz1]
 *
 * 输出：完全一致的比例；不一致的按“我们 → 原版”分组计数，前 40 组。
 * v7：同时比较完整的方块状态（带属性）。STATES=1 时，不一致的分组也按状态列（方块名一样、属性不一样的也列出来）。
 * 原版存档要用同一个种子、关掉结构（generate-structures=false）生成，并且区块状态是 full。
 */
import { fullStateName, NAME_BY_STATE } from '../../src/terrain/blocks'
import { chunkSource } from '../../src/terrain/worker/surface'
import { settleLeaves } from '../../src/terrain/worldgen/feature/settle'
import { Worldgen } from '../../src/terrain/worldgen/Worldgen'
import { vanillaPack } from '../../tests/loadDatapack'
import { loadChunk } from './anvil'

/** 维度 → 存档里的子目录（v5.2） */
export const DIM_DIR: Record<string, string> = { 'minecraft:overworld': '', 'minecraft:nether': '/DIM-1', 'minecraft:end': '/DIM1' }

export function diffChunks(world: string, wg: Worldgen, chunks: [number, number][], opts: { features?: boolean; dim?: string; states?: boolean } = {}) {
  const dim = opts.dim ?? 'minecraft:overworld'
  const s = wg.getSettings(dim)
  const pairs = new Map<string, number>()
  /** 每种方块：[原版有几格, 我们有几格, 两边都是它的格数, 其中状态也一样的格数] */
  const perBlock = new Map<string, [number, number, number, number]>()
  const pb = (n: string) => {
    let e = perBlock.get(n)
    if (!e) perBlock.set(n, (e = [0, 0, 0, 0]))
    return e
  }
  let same = 0
  /** 完整状态一致（v7） */
  let sameState = 0
  let total = 0
  let compared = 0
  for (const [cx, cz] of chunks) {
    const v = loadChunk(world + DIM_DIR[dim], cx, cz)
    if (!v || v.status !== 'minecraft:full') continue
    compared++
    // v7：放完地物的区块还要“落定”（树叶的 distance，见 settle.ts），要用到周围 3×3 个区块
    const src = chunkSource(wg, dim, s)
    const features = opts.features !== false && src.hasFeatures
    let flat: Uint16Array
    if (features) {
      const nine: Uint16Array[] = []
      for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) nine.push(src.withDecorations(cx + dx, cz + dz).slice())
      settleLeaves(nine, s.height)
      flat = nine[4]
    } else flat = src.proto(cx, cz).blocks
    {
      for (let fi = 0; fi < flat.length; fi++) {
        const y = s.minY + (fi >> 8)
        const vi = (y - v.minY) * 256 + (fi & 255)
        const id = flat[fi]
        let a = NAME_BY_STATE[id]
        let b = v.blocks[vi] ?? 'minecraft:air'
        if (b === 'minecraft:cave_air') b = 'minecraft:air'
        if (a === 'minecraft:cave_air') a = 'minecraft:air'
        total++
        pb(b)[0]++
        pb(a)[1]++
        let key: string | null = null
        if (a === b) {
          pb(a)[2]++
          same++
          const sa = fullStateName(id)
          const sb = (v.states[vi] ?? 'minecraft:air').replace('cave_air', 'air')
          if (sa === sb) {
            pb(a)[3]++
            sameState++
          } else if (opts.states) key = `${sa.replace('minecraft:', '')} → ${sb.slice(sb.indexOf('['))}`
        } else key = opts.states ? `${fullStateName(id).replace('minecraft:', '')} → ${(v.states[vi] ?? b).replace('minecraft:', '')}` : `${a.replace('minecraft:', '')} → ${b.replace('minecraft:', '')}`
        if (key) pairs.set(key, (pairs.get(key) ?? 0) + 1)
      }
    }
  }
  return { compared, total, same, sameState, pairs: [...pairs].sort((x, y) => y[1] - x[1]), perBlock }
}

if (process.argv[1]?.endsWith('diff.ts')) {
  const [world, a, b, c, d] = process.argv.slice(2)
  const [cx0, cz0] = [Number(a), Number(b)]
  const [cx1, cz1] = c === undefined ? [cx0, cz0] : [Number(c), Number(d)]
  const chunks: [number, number][] = []
  for (let x = cx0; x <= cx1; x++) for (let z = cz0; z <= cz1; z++) chunks.push([x, z])
  const wg = new Worldgen([vanillaPack()!])
  wg.setSeed(42n)
  const r = diffChunks(world, wg, chunks, { features: process.env.FEATURES !== '0', states: process.env.STATES === '1' })
  console.log(`比较了 ${r.compared} 个区块，${r.total} 格，方块一致 ${((r.same / r.total) * 100).toFixed(3)}%，状态也一致 ${((r.sameState / r.total) * 100).toFixed(3)}%`)
  for (const [k, n] of r.pairs.slice(0, 40)) console.log(String(n).padStart(8), k)
}
