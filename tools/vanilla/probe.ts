/**
 * 找某种方块在哪些格子上和原版对不上（v5.1 调地物用）。
 *
 *   tsx tools/vanilla/probe.ts <原版存档> <cx> <cz> <方块名> [最多几个]
 *
 * 列出“我们有、原版没有”和“原版有、我们没有”的格子，带上下左右前后六个邻居（我们 / 原版）。
 */
import { NAME_BY_BLOCK } from '../../src/terrain/blocks'
import Section from '../../src/terrain/chunk/Section'
import { generateChunk } from '../../src/terrain/worker/surface'
import { Worldgen } from '../../src/terrain/worldgen/Worldgen'
import { vanillaPack } from '../../tests/loadDatapack'
import { loadChunk } from './anvil'
import { DIM_DIR } from './diff'
import { onlyPack } from '../../tests/featurePacks'

const [world, a, b, name, max] = process.argv.slice(2)
const cx = Number(a)
const cz = Number(b)
const want = `minecraft:${name}`
const vanilla = vanillaPack()!
// FEATURES=a,b：只放这几个地物（和 make-world.py 的 only: 模式对应）
const wg = new Worldgen(process.env.FEATURES ? [vanilla, onlyPack(vanilla, process.env.FEATURES.split(','))] : [vanilla])
wg.setSeed(42n)
// DIM=minecraft:nether / minecraft:end（v5.2）
const dim = process.env.DIM ?? 'minecraft:overworld'
const s = wg.getSettings(dim)
const v = loadChunk(world + DIM_DIR[dim], cx, cz)!
const c = generateChunk(wg, dim, s, cx, cz, {})
const ours = new Map<number, string>()
c.sections.forEach((d, sy) => {
  const sec = Section.fromData(d)
  for (let i = 0; i < 4096; i++) ours.set((sy * 16 + (i >> 8)) * 256 + (i & 255), NAME_BY_BLOCK[sec.blocks.get(i)])
})
const norm = (n: string | undefined) => (n ?? 'air').replace('minecraft:', '').replace('cave_air', 'air')
const o = (lx: number, y: number, lz: number) => (lx < 0 || lx > 15 || lz < 0 || lz > 15 ? '?' : norm(ours.get((y - s.minY) * 256 + lz * 16 + lx)))
const van = (lx: number, y: number, lz: number) => (lx < 0 || lx > 15 || lz < 0 || lz > 15 ? '?' : norm(v.blocks[(y - v.minY) * 256 + lz * 16 + lx]))
let n = 0
for (let y = s.minY; y < s.minY + s.height; y++)
  for (let lz = 0; lz < 16; lz++)
    for (let lx = 0; lx < 16; lx++) {
      const A = o(lx, y, lz)
      const B = van(lx, y, lz)
      if (A === B || (A !== norm(want) && B !== norm(want))) continue
      if (n++ >= Number(max ?? 20)) continue
      const nb = [[0, -1, 0, 'D'], [0, 1, 0, 'U'], [0, 0, -1, 'N'], [0, 0, 1, 'S'], [-1, 0, 0, 'W'], [1, 0, 0, 'E']] as const
      console.log(`${cx * 16 + lx} ${y} ${cz * 16 + lz}  我们 ${A}  原版 ${B}   ` + nb.map(([dx, dy, dz, t]) => `${t}:${o(lx + dx, y + dy, lz + dz)}/${van(lx + dx, y + dy, lz + dz)}`).join(' '))
    }
console.log('共', n)
