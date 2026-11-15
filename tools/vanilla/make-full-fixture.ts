/**
 * 从原版“完整地物”存档生成 tests/fixtures/features51.json（v5.1）。
 *
 *   tsx tools/vanilla/make-full-fixture.ts <full 存档> tools/vanilla/areas.txt tools/vanilla/areas51.txt
 *
 * 按方块类别（晶洞、地牢、冰山、发光地衣……）挑出“我们现在和原版逐格一致”的区块，
 * 每类最多 3 个区块。存的是方块坐标和方块名，不是原版的文件。
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { NAME_BY_BLOCK } from '../../src/terrain/blocks'
import { chunkSource } from '../../src/terrain/worker/surface'
import { Worldgen } from '../../src/terrain/worldgen/Worldgen'
import { repoPath, vanillaPack } from '../../tests/loadDatapack'
import { loadChunk } from './anvil'
import { CATEGORIES } from '../../tests/featureCategories'

const [world, ...files] = process.argv.slice(2)
// 维度（v5.2）：区域名前面的 nether: / end:
const DIMS: Record<string, [string, string]> = { overworld: ['minecraft:overworld', ''], nether: ['minecraft:nether', '/DIM-1'], end: ['minecraft:end', '/DIM1'] }
const wg = new Worldgen([vanillaPack()!])
wg.setSeed(42n)
const sources = new Map<string, ReturnType<typeof chunkSource>>()
const sourceOf = (dim: string) => {
  if (!sources.has(dim)) sources.set(dim, chunkSource(wg, dim, wg.getSettings(dim)))
  return sources.get(dim)!
}
const out: Record<string, Record<string, Record<string, number[]>>> = {}
const taken: Record<string, number> = {}
for (const f of files)
  for (const line of readFileSync(f, 'utf8').split('\n')) {
    const [name, a, b] = line.trim().split(/\s+/)
    if (!name) continue
    const prefix = name.includes(':') ? name.split(':')[0] : 'overworld'
    const [dim, dir] = DIMS[prefix]
    const src = sourceOf(dim)
    for (let cx = Number(a) - 1; cx < Number(a) + 1; cx++)
      for (let cz = Number(b) - 1; cz < Number(b) + 1; cz++) {
        const v = world.split(',').map((w) => loadChunk(w + dir, cx, cz)).find((c) => c && c.status === 'minecraft:full')
        if (!v) continue
        const o = src.withDecorations(cx, cz)
        for (const [cat, re] of Object.entries(CATEGORIES)) {
          if ((taken[cat] ?? 0) >= 3) continue
          const list: Record<string, number[]> = {}
          let n = 0
          let bad = false
          for (let i = 0; i < o.length; i++) {
            const p = NAME_BY_BLOCK[o[i]]
            const q = v.blocks[i] ?? 'minecraft:air'
            if (!re.test(p) && !re.test(q)) continue
            if (p !== q) {
              bad = true
              break
            }
            ;(list[q] ??= []).push(i)
            n++
          }
          if (bad || n === 0) continue
          ;(out[cat] ??= {})[`${prefix === 'overworld' ? '' : prefix + ':'}${cx},${cz}`] = list
          taken[cat] = (taken[cat] ?? 0) + 1
          console.log(cat, cx, cz, n)
        }
      }
  }
writeFileSync(repoPath('tests/fixtures/features51.json'), JSON.stringify(out))
