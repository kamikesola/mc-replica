/**
 * 把原版 jar 里的结构模板（.nbt）转成 JSON（v5.2：化石要用）。
 *
 *   tsx tools/vanilla/structures-to-json.ts <解压出来的 data/minecraft/structure 目录> datapacks/vanilla/structure
 *
 * 只转换给出目录下的 .nbt（递归），写到 datapacks（被 git 忽略，和原版的其他数据一样留在你自己的电脑上）。
 * 输出：{ size: [x, y, z], palette: [{Name, Properties?}], blocks: [[x, y, z, 调色板下标], ...] }
 */
import { gunzipSync } from 'node:zlib'
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { readNbt, type Nbt } from './anvil'

const [src, out] = process.argv.slice(2)
function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    return statSync(p).isDirectory() ? walk(p) : n.endsWith('.nbt') ? [p] : []
  })
}
let n = 0
for (const f of walk(src)) {
  const root = readNbt(gunzipSync(readFileSync(f))) as Record<string, Nbt>
  const size = root.size as number[]
  const palette = ((root.palette ?? (root.palettes as Nbt[][])[0]) as Record<string, Nbt>[]).map((p) => ({ Name: p.Name, ...(p.Properties ? { Properties: p.Properties } : {}) }))
  const blocks = (root.blocks as Record<string, Nbt>[]).map((b) => [...(b.pos as number[]), b.state as number])
  const dest = join(out, relative(src, f)).replace(/\.nbt$/, '.json')
  mkdirSync(dirname(dest), { recursive: true })
  writeFileSync(dest, JSON.stringify({ size, palette, blocks }))
  n++
}
console.log('转换了', n, '个结构模板')
