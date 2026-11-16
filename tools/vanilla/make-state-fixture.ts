/**
 * 从原版“完整地物”存档生成 tests/fixtures/states7.json（v7）。
 *
 *   tsx tools/vanilla/make-state-fixture.ts <full 存档> tools/vanilla/areas.txt tools/vanilla/areas51.txt
 *
 * 按状态的类别（树叶 distance、原木朝向、藤蔓的面……）挑出“我们和原版连属性都逐格一致”的区块，每类最多 2 个。
 * 我们这边用周围 3×3 个区块落定之后的结果（settle.ts）。存的是方块下标和完整状态，不是原版的文件。
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fullStateName } from '../../src/terrain/blocks'
import { chunkSource } from '../../src/terrain/worker/surface'
import { settleLeaves } from '../../src/terrain/worldgen/feature/settle'
import { Worldgen } from '../../src/terrain/worldgen/Worldgen'
import { repoPath, vanillaPack } from '../../tests/loadDatapack'
import { loadChunk } from './anvil'

/** 类别 → 匹配完整状态的正则 */
export const STATE_CATEGORIES: Record<string, RegExp> = {
  树叶: /_leaves\[/,
  横着的原木: /_log\[axis=[xz]\]/,
  藤蔓: /:vine\[/,
  发光地衣: /:glow_lichen\[/,
  幽匿脉络: /:sculk_vein\[/,
  两格高植物: /half=upper/,
  雪地草方块: /snowy=true/,
  滴水石锥: /:pointed_dripstone\[/,
  洞穴藤蔓: /:cave_vines/,
  海带: /:kelp\[/,
  竹子: /:bamboo\[/,
  蘑菇方块: /_mushroom_block\[|:mushroom_stem\[/,
  海泡菜: /:sea_pickle\[/,
  珊瑚扇: /_wall_fan\[/,
  紫水晶芽: /_amethyst_bud\[|:amethyst_cluster\[/,
  可可果: /:cocoa\[/,
  骨块: /:bone_block\[/
}

const [world, ...files] = process.argv.slice(2)
const wg = new Worldgen([vanillaPack()!])
wg.setSeed(42n)
const dim = 'minecraft:overworld'
const s = wg.getSettings(dim)
const src = chunkSource(wg, dim, s)
const out: Record<string, Record<string, Record<string, number[]>>> = {}
const taken: Record<string, number> = {}
for (const f of files)
  for (const line of readFileSync(f, 'utf8').split('\n')) {
    const [name, a, b] = line.trim().split(/\s+/)
    if (!name || name.includes(':')) continue
    for (let cx = Number(a) - 1; cx < Number(a) + 1; cx++)
      for (let cz = Number(b) - 1; cz < Number(b) + 1; cz++) {
        if (Object.keys(STATE_CATEGORIES).every((c) => (taken[c] ?? 0) >= 2)) continue
        const v = loadChunk(world, cx, cz)
        if (!v || v.status !== 'minecraft:full') continue
        const nine: Uint16Array[] = []
        for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) nine.push(src.withDecorations(cx + dx, cz + dz).slice())
        settleLeaves(nine, s.height)
        const o = nine[4]
        for (const [cat, re] of Object.entries(STATE_CATEGORIES)) {
          if ((taken[cat] ?? 0) >= 2) continue
          const list: Record<string, number[]> = {}
          let n = 0
          let bad = false
          for (let i = 0; i < o.length; i++) {
            const p = fullStateName(o[i])
            const q = (v.states[i] ?? 'minecraft:air').replace('cave_air', 'air')
            if (!re.test(p) && !re.test(q)) continue
            if (p !== q) {
              bad = true
              break
            }
            ;(list[q] ??= []).push(i)
            n++
          }
          if (bad || n === 0) continue
          ;(out[cat] ??= {})[`${cx},${cz}`] = list
          taken[cat] = (taken[cat] ?? 0) + 1
          console.log(cat, cx, cz, n)
        }
      }
  }
for (const c of Object.keys(STATE_CATEGORIES)) if (!out[c]) console.log('没有找到完全一致的区块：', c)
writeFileSync(repoPath('tests/fixtures/states7.json'), JSON.stringify(out))
