/**
 * v1 对比数据：同一批区块，分别用“每格 1 字节 + 逐面网格”（v0 的做法）和
 * “section 调色板 + 贪婪网格”（v1）统计内存、四边形数和耗时。
 *
 *   npx tsx tools/bench-v1.ts [半径=4] [种子=42]
 *
 * 有原版数据时用 minecraft:overworld，否则用 demo:overworld_lite。
 */
import { generateChunk } from '../src/terrain/worker/surface'
import { Worldgen } from '../src/terrain/worldgen/Worldgen'
import { builtinPack, vanillaPack } from '../tests/loadDatapack'

const R = Number(process.argv[2] ?? 4)
const seed = BigInt(process.argv[3] ?? 42)
const vanilla = vanillaPack()
const wg = new Worldgen(vanilla ? [builtinPack(), vanilla] : [builtinPack()])
wg.setSeed(seed)
const id = vanilla ? 'minecraft:overworld' : 'demo:overworld_lite'
const s = wg.getSettings(id)

function run(greedy: boolean) {
  let blockBytes = 0
  let quads = 0
  let vertexBytes = 0
  let ms = 0
  let meshes = 0
  let single = 0
  let sections = 0
  const bitsHist = new Map<number, number>()
  for (let cx = -R; cx < R; cx++) {
    for (let cz = -R; cz < R; cz++) {
      const c = generateChunk(wg, id, s, cx, cz, { greedy })
      ms += c.ms
      for (const d of c.sections) {
        sections++
        blockBytes += (d.data?.byteLength ?? 0) + d.palette.length
        if (d.bits === 0) single++
        bitsHist.set(d.bits, (bitsHist.get(d.bits) ?? 0) + 1)
      }
      for (const m of c.meshes) {
        if (!m) continue
        for (const part of [m.opaque, m.water]) {
          if (part.indices.length === 0) continue
          meshes++
          quads += part.indices.length / 6
          vertexBytes += part.positions.byteLength + part.info.byteLength + part.indices.byteLength
        }
      }
    }
  }
  return { blockBytes, quads, vertexBytes, ms, meshes, single, sections, bitsHist }
}

const n = (2 * R) ** 2
run(true) // 预热（JIT）
const g = run(true)
const v = run(false)
// v0 的网格格式：每个顶点 position(3 float) + color(3 float) = 24 字节，索引 Uint32
const v0VertexBytes = v.quads * (4 * 24 + 6 * 4)
const v0BlockBytes = n * 16 * 16 * s.height
const mb = (b: number) => (b / 1048576).toFixed(2) + ' MB'
console.log(`${id}，种子 ${seed}，${n} 个区块（${2 * R}×${2 * R}），共 ${g.sections} 个 section`)
console.log(`section 位数分布：${[...g.bitsHist].sort((a, b) => a[0] - b[0]).map(([b, c]) => `${b} 位 ${c} 个`).join('，')}`)
console.log()
console.log(`| 项目 | v0 做法 | v1 | 比例 |`)
console.log(`| --- | --- | --- | --- |`)
console.log(`| 方块数据 | ${mb(v0BlockBytes)} | ${mb(g.blockBytes)} | ${((g.blockBytes / v0BlockBytes) * 100).toFixed(1)}% |`)
console.log(`| 每个区块平均 | ${(v0BlockBytes / n / 1024).toFixed(1)} KB | ${(g.blockBytes / n / 1024).toFixed(1)} KB | |`)
console.log(`| 四边形 | ${v.quads.toLocaleString()} | ${g.quads.toLocaleString()} | ${((g.quads / v.quads) * 100).toFixed(1)}% |`)
console.log(`| 三角形 | ${(v.quads * 2).toLocaleString()} | ${(g.quads * 2).toLocaleString()} | |`)
console.log(`| 网格显存 | ${mb(v0VertexBytes)} | ${mb(g.vertexBytes)} | ${((g.vertexBytes / v0VertexBytes) * 100).toFixed(1)}% |`)
console.log(`| 每个区块生成耗时（含网格） | ${(v.ms / n).toFixed(1)} ms | ${(g.ms / n).toFixed(1)} ms | |`)
console.log(`| 网格对象数（绘制调用上限） | ${n * 2}（每区块 2 个） | ${g.meshes} | |`)
