/**
 * 按区域比较（v5.1）：areas 文件每行“群系名 区块x 区块z”，比较以它为中心的 4×4 个区块。
 *
 *   tsx tools/vanilla/diff-areas.ts <原版存档> <areas 文件>... [--top N] [--only 名字]
 *
 * 每个区域输出一致比例和差别最多的几组；最后输出全部区域合起来的差别。
 */
import { readFileSync } from 'node:fs'
import { Worldgen } from '../../src/terrain/worldgen/Worldgen'
import { vanillaPack } from '../../tests/loadDatapack'
import { diffChunks } from './diff'

const args = process.argv.slice(2)
const flag = (name: string) => {
  const i = args.indexOf(name)
  if (i < 0) return undefined
  const v = args[i + 1]
  args.splice(i, 2)
  return v
}
const top = Number(flag('--top') ?? 6)
const only = flag('--only')
const [world, ...files] = args
const wg = new Worldgen([vanillaPack()!])
wg.setSeed(42n)
const all = new Map<string, number>()
const blocks = new Map<string, [number, number, number]>()
let same = 0
let total = 0
for (const f of files)
  for (const line of readFileSync(f, 'utf8').split('\n')) {
    const [name, a, b] = line.trim().split(/\s+/)
    if (!name || (only && !only.split(',').includes(name))) continue
    const chunks: [number, number][] = []
    for (let x = Number(a) - 2; x < Number(a) + 2; x++) for (let z = Number(b) - 2; z < Number(b) + 2; z++) chunks.push([x, z])
    const r = diffChunks(world, wg, chunks)
    same += r.same
    total += r.total
    for (const [k, n] of r.pairs) all.set(k, (all.get(k) ?? 0) + n)
    for (const [k, v] of r.perBlock) {
      const e = blocks.get(k) ?? [0, 0, 0]
      blocks.set(k, [e[0] + v[0], e[1] + v[1], e[2] + v[2]])
    }
    console.log(`${name.padEnd(24)} ${r.compared} 区块 ${((r.same / r.total) * 100).toFixed(3)}%  ${r.pairs.slice(0, top).map(([k, n]) => `${k}×${n}`).join('  ')}`)
  }
console.log(`\n合计 一致 ${((same / total) * 100).toFixed(4)}%`)
for (const [k, n] of [...all].sort((x, y) => y[1] - x[1]).slice(0, 50)) console.log(String(n).padStart(8), k)

// 每种方块：原版几格、我们几格、位置对上的比例（只列有差别的）
console.log('\n方块                       原版      我们      位置一致')
for (const [k, [v, o, m]] of [...blocks].sort((x, y) => y[1][0] - x[1][0]))
  if (v !== m || o !== m) console.log(`${k.replace('minecraft:', '').padEnd(24)} ${String(v).padStart(8)}  ${String(o).padStart(8)}  ${v ? ((m / v) * 100).toFixed(1).padStart(6) + '%' : '     -'}`)
