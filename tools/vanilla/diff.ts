/**
 * 把我们生成的区块和原版存档里的区块逐格比较。
 *
 *   tsx tools/vanilla/diff.ts <原版存档的 world 目录> <cx0> <cz0> [cx1 cz1]
 *
 * 输出：完全一致的比例；不一致的按“我们 → 原版”分组计数，前 40 组。
 * 原版存档要用同一个种子、关掉结构（generate-structures=false）生成，并且区块状态是 full。
 */
import { NAME_BY_BLOCK } from '../../src/terrain/blocks'
import Section from '../../src/terrain/chunk/Section'
import { generateChunk } from '../../src/terrain/worker/surface'
import { Worldgen } from '../../src/terrain/worldgen/Worldgen'
import { vanillaPack } from '../../tests/loadDatapack'
import { loadChunk } from './anvil'

export function diffChunks(world: string, wg: Worldgen, chunks: [number, number][], opts: { features?: boolean } = {}) {
  const s = wg.getSettings('minecraft:overworld')
  const pairs = new Map<string, number>()
  let same = 0
  let total = 0
  let compared = 0
  for (const [cx, cz] of chunks) {
    const v = loadChunk(world, cx, cz)
    if (!v || v.status !== 'minecraft:full') continue
    compared++
    const c = generateChunk(wg, 'minecraft:overworld', s, cx, cz, { features: opts.features })
    c.sections.forEach((d, sy) => {
      const sec = Section.fromData(d)
      for (let i = 0; i < 4096; i++) {
        const y = s.minY + sy * 16 + (i >> 8)
        const vi = (y - v.minY) * 256 + (i & 255)
        let a = NAME_BY_BLOCK[sec.blocks.get(i)]
        let b = v.blocks[vi] ?? 'minecraft:air'
        if (b === 'minecraft:cave_air') b = 'minecraft:air'
        if (a === 'minecraft:cave_air') a = 'minecraft:air'
        total++
        if (a === b) same++
        else pairs.set(`${a.replace('minecraft:', '')} → ${b.replace('minecraft:', '')}`, (pairs.get(`${a.replace('minecraft:', '')} → ${b.replace('minecraft:', '')}`) ?? 0) + 1)
      }
    })
  }
  return { compared, total, same, pairs: [...pairs].sort((x, y) => y[1] - x[1]) }
}

if (process.argv[1]?.endsWith('diff.ts')) {
  const [world, a, b, c, d] = process.argv.slice(2)
  const [cx0, cz0] = [Number(a), Number(b)]
  const [cx1, cz1] = c === undefined ? [cx0, cz0] : [Number(c), Number(d)]
  const chunks: [number, number][] = []
  for (let x = cx0; x <= cx1; x++) for (let z = cz0; z <= cz1; z++) chunks.push([x, z])
  const wg = new Worldgen([vanillaPack()!])
  wg.setSeed(42n)
  const r = diffChunks(world, wg, chunks, { features: process.env.FEATURES !== '0' })
  console.log(`比较了 ${r.compared} 个区块，${r.total} 格，一致 ${((r.same / r.total) * 100).toFixed(3)}%`)
  for (const [k, n] of r.pairs.slice(0, 40)) console.log(String(n).padStart(8), k)
}
