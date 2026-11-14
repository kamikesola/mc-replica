/**
 * 从原版对照存档生成 tests/fixtures/features.json（v5）。
 *
 *   tsx tools/vanilla/make-feature-fixture.ts <treetest 存档> <treetest2 存档> <oretest 存档> tools/vanilla/areas.txt <bare 存档>
 *
 * 对照存档由原版 1.21.4 服务端用 tests/featurePacks.ts 里同样的数据包、种子 42、关掉结构生成。
 * 只收录“我们现在和原版逐格一致”的区块：测试保证以后改代码不会把它们改坏。
 * 存的是方块坐标和方块名（事实数据），不是原版的任何文件。
 */
import { writeFileSync, readFileSync } from 'node:fs'
import { NAME_BY_BLOCK } from '../../src/terrain/blocks'
import { chunkSource } from '../../src/terrain/worker/surface'
import { Worldgen, type PackInput } from '../../src/terrain/worldgen/Worldgen'
import { oresOnlyPack, ORE_BLOCKS, TREE_BLOCKS, treesOnlyPack } from '../../tests/featurePacks'
import { repoPath, vanillaPack } from '../../tests/loadDatapack'
import { loadChunk } from './anvil'

const [treeWorld, treeWorld2, oreWorld, listFile, bareWorld] = process.argv.slice(2)
const vanilla = vanillaPack()!
/** 每个区块：方块名 → 区块内下标（((y - minY) * 16 + z) * 16 + x）的列表 */
const out: Record<string, Record<string, Record<string, number[]>>> = {}

function collect(kind: string, pack: PackInput | null, worlds: string[], chunks: [number, number][], re: RegExp) {
  const wg = new Worldgen(pack ? [vanilla, pack] : [vanilla])
  wg.setSeed(42n)
  const src = chunkSource(wg, 'minecraft:overworld', wg.getSettings('minecraft:overworld'))
  const res: Record<string, Record<string, number[]>> = {}
  for (const [cx, cz] of chunks) {
    const v = worlds.map((w) => loadChunk(w, cx, cz)).find((c) => c)
    if (!v) continue
    const o = pack ? src.withDecorations(cx, cz) : src.proto(cx, cz).blocks
    const list: Record<string, number[]> = {}
    let n = 0
    let bad = 0
    for (let i = 0; i < o.length; i++) {
      const p = NAME_BY_BLOCK[o[i]]
      const q = v.blocks[i] ?? 'minecraft:air'
      if (!re.test(p) && !re.test(q)) continue
      if (p !== q) bad++
      if (re.test(q)) {
        ;(list[q.replace('minecraft:', '')] ??= []).push(i)
        n++
      }
    }
    if (bad === 0 && n > 0) res[`${cx},${cz}`] = list
  }
  out[kind] = res
  console.log(kind, Object.keys(res).length, '个区块', Object.values(res).reduce((a, b) => a + Object.values(b).reduce((x, y) => x + y.length, 0), 0), '个方块')
}

const list = readFileSync(listFile, 'utf8').trim().split('\n').map((l) => l.split(' ').slice(1).map(Number) as [number, number])
const treeChunks: [number, number][] = []
for (let x = -3; x <= 2; x++) for (let z = -3; z <= 2; z++) treeChunks.push([x, z])
for (const [x, z] of list) for (const [dx, dz] of [[-1, -1], [0, -1], [-1, 0], [0, 0]]) treeChunks.push([x + dx, z + dz])
collect('trees', treesOnlyPack(vanilla), [treeWorld, treeWorld2], treeChunks, TREE_BLOCKS)
const oreChunks: [number, number][] = []
for (let x = -3; x <= 2; x++) for (let z = -3; z <= 2; z++) oreChunks.push([x, z])
collect('ores', oresOnlyPack(vanilla), [oreWorld], oreChunks, ORE_BLOCKS)
// 矿脉（噪声阶段，不是地物）：用关掉所有地物的存档
const veinChunks: [number, number][] = []
for (let x = -3; x <= 2; x++) for (let z = -3; z <= 2; z++) veinChunks.push([x, z])
collect('veins', null, [bareWorld], veinChunks, /^minecraft:(tuff|raw_iron_block|raw_copper_block|deepslate_iron_ore|copper_ore|granite)$/)
writeFileSync(repoPath('tests/fixtures/features.json'), JSON.stringify(out))
