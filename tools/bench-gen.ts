/**
 * 区块生成的耗时：按游戏里的方式，从中心往外一圈一圈生成区块，再给每个区块算光照 + 网格。
 *
 *   npx tsx tools/bench-gen.ts [半径=4] [种子=42] [noise_settings=minecraft:overworld]
 *   npx tsx tools/bench-gen.ts 4 42 minecraft:overworld --tasks
 *
 * 默认是 v10.1 的做法：一个 ChunkSource 自己算一切（缓存有上限，会挤掉再重算；游戏里每个 Worker 各有一个，互相不共享）。
 * --workers=3 模拟 v10.1 游戏里的 3 个 Worker：每个 Worker 一个 Worldgen + ChunkSource，区块按装饰区域固定分配（regionAffinity），互不共享缓存。
 * --tasks 是 v10.2 的做法：拆成原型 / 装饰 / 组装三种任务，每样只算一次（同步地模拟 terrain/generator.ts）。
 *
 * 输出：平均每个区块“生成”（地形 + 地物，generateChunk）和“光照 + 网格”（meshChunk）各要多少毫秒。
 * 生成里还分出了原型（地形、含水层、地表、雕刻器）和装饰（地物）两部分。
 * 需要 datapacks/vanilla；没有时用 demo:overworld_lite（数字没有参考意义）。
 *
 * 加 --cpu-prof 跑可以看每个函数的耗时：
 *   node --cpu-prof --cpu-prof-dir=out --import tsx tools/bench-gen.ts
 */
import { chunkSource, generateChunk, meshChunk } from '../src/terrain/worker/surface'
import { decorationDeps, type Decoration, type Proto } from '../src/terrain/worker/pipeline'
import { AROUND, assembleTask, decorateTask, protoTask } from '../src/terrain/worker/tasks'
import { Worldgen } from '../src/terrain/worldgen/Worldgen'
import { builtinPack, vanillaPack } from '../tests/loadDatapack'

const R = Number(process.argv[2] ?? 4)
const seed = BigInt(process.argv[3] ?? 42)
const vanilla = vanillaPack()
const wg = new Worldgen(vanilla ? [builtinPack(), vanilla] : [builtinPack()])
wg.setSeed(seed)
const tasks = process.argv.includes('--tasks')
const workers = Number(process.argv.find((a) => a.startsWith('--workers='))?.slice(10) ?? 1)
const id = (process.argv[4]?.startsWith('--') ? undefined : process.argv[4]) ?? (vanilla ? 'minecraft:overworld' : 'demo:overworld_lite')
const s = wg.getSettings(id)
const src = chunkSource(wg, id, s)
// --workers：另外几个“Worker”，各有自己的 Worldgen 和 ChunkSource（只统计算了多少次，不细分计时）
const extra = Array.from({ length: Math.max(0, workers - 1) }, () => {
  const w = new Worldgen(vanilla ? [builtinPack(), vanilla] : [builtinPack()])
  w.setSeed(seed)
  return w
})
const counted = new Set<ChunkSourceLike>()
type ChunkSourceLike = { proto: (cx: number, cz: number) => unknown; decoration: (cx: number, cz: number) => unknown }
let extraProto = 0
let extraDeco = 0
const affinity = (cx: number, cz: number) => ((Math.imul(Math.floor(cx / 4), 73856093) ^ Math.imul(Math.floor(cz / 4), 19349663)) >>> 0) % workers
for (const w of extra) {
  const x = chunkSource(w, id, s) as unknown as ChunkSourceLike & { protos: { get(k: string): unknown }; decorations: { get(k: string): unknown } }
  if (counted.has(x)) continue
  counted.add(x)
  const p = x.proto.bind(x)
  const d = x.decoration.bind(x)
  x.proto = (cx, cz) => (x.protos.get(`${cx},${cz}`) ? p(cx, cz) : (extraProto++, p(cx, cz)))
  x.decoration = (cx, cz) => (x.decorations.get(`${cx},${cz}`) ? d(cx, cz) : (extraDeco++, d(cx, cz)))
}

// 把 ChunkSource 的两个阶段包一层计时（不改它的代码）
let protoMs = 0
let protoCount = 0
let decoMs = 0
let decoCount = 0
let depth = 0 // decoration 会递归调用自己和 proto，只算最外层，免得重复计时
// 只在 v10.1 模式下包（--tasks 模式在下面自己计时）
if (!tasks) {
  const proto = src.proto.bind(src)
  const decoration = src.decoration.bind(src)
  src.proto = (cx, cz) => {
    const t = performance.now()
    const cached = (src as unknown as { protos: { get(k: string): unknown } }).protos.get(`${cx},${cz}`)
    const r = proto(cx, cz)
    if (!cached) {
      protoCount++
      const dt = performance.now() - t
      protoMs += dt
      if (depth > 0) decoChild += dt
    }
    return r
}
let decoChild = 0
src.decoration = (cx, cz) => {
  const outer = depth === 0
  if (outer) decoChild = 0
  depth++
  const t = performance.now()
  const cached = (src as unknown as { decorations: { get(k: string): unknown } }).decorations.get(`${cx},${cz}`)
  const r = decoration(cx, cz)
  depth--
  if (!cached) decoCount++
  if (outer) decoMs += performance.now() - t - decoChild
  return r
}
}

// 从中心往外：和游戏里按距离排序加载一样
const order: [number, number][] = []
for (let cx = -R; cx <= R; cx++) for (let cz = -R; cz <= R; cz++) order.push([cx, cz])
order.sort((a, b) => Math.max(Math.abs(a[0]), Math.abs(a[1])) - Math.max(Math.abs(b[0]), Math.abs(b[1])))

// v10.2 的三段任务：原型、装饰各只算一次
const tProtos = new Map<string, Proto>()
const tDecos = new Map<string, Decoration>()
let assembleMs = 0
const tProto = (cx: number, cz: number): Proto => {
  const k = `${cx},${cz}`
  let p = tProtos.get(k)
  if (!p) {
    const t = performance.now()
    tProtos.set(k, (p = protoTask(wg, id, s, cx, cz)))
    protoMs += performance.now() - t
    protoCount++
  }
  return p
}
const tDeco = (cx: number, cz: number): Decoration => {
  const k = `${cx},${cz}`
  let d = tDecos.get(k)
  if (!d) {
    const priors = decorationDeps(cx, cz).map(([ex, ez]) => [ex, ez, tDeco(ex, ez)] as [number, number, Decoration])
    const protos = AROUND.map(([dx, dz]) => tProto(cx + dx, cz + dz))
    const t = performance.now()
    tDecos.set(k, (d = decorateTask(wg, id, s, cx, cz, protos, priors)))
    decoMs += performance.now() - t
    decoCount++
  }
  return d
}

const t0 = performance.now()
let genMs = 0
const flats = new Map<string, Uint16Array>()
for (const [cx, cz] of order) {
  const t = performance.now()
  if (tasks) {
    const protos = AROUND.map(([dx, dz]) => tProto(cx + dx, cz + dz))
    const decos = src.hasFeatures ? AROUND.map(([dx, dz]) => tDeco(cx + dx, cz + dz)) : null
    const ta = performance.now()
    flats.set(`${cx},${cz}`, assembleTask(wg, id, s, cx, cz, protos, decos).blocks)
    assembleMs += performance.now() - ta
  } else {
    const k = affinity(cx, cz)
    const w = k === 0 ? wg : extra[k - 1]
    flats.set(`${cx},${cz}`, generateChunk(w, id, s, cx, cz, { mesh: false }).blocks)
  }
  genMs += performance.now() - t
}
// 光照 + 网格：要周围 3×3 都生成完，只算里面一圈
let meshMs = 0
let meshCount = 0
const sky = !/nether|end/.test(id)
for (const [cx, cz] of order) {
  if (Math.abs(cx) === R || Math.abs(cz) === R) continue
  const chunks: Uint16Array[] = []
  for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) chunks.push(flats.get(`${cx + dx},${cz + dz}`)!.slice())
  const t = performance.now()
  meshChunk(chunks, s.height, sky, { greedy: true }, [cx * 16, s.minY, cz * 16])
  meshMs += performance.now() - t
  meshCount++
}
const total = performance.now() - t0
const n = order.length
const f = (v: number) => v.toFixed(1)
console.log(`${tasks ? 'v10.2 三段任务' : `v10.1 ChunkSource × ${workers} 个 Worker`} · ${id} 种子 ${seed}，${n} 个区块（半径 ${R}），总共 ${f(total / 1000)} 秒`)
console.log(`生成（generateChunk）  平均 ${f(genMs / n)} ms/区块`)
console.log(`  原型（地形+地表+雕刻器）${f(protoMs / Math.max(1, protoCount))} ms × ${protoCount} 个`)
console.log(`  装饰（地物）          ${f(decoMs / Math.max(1, decoCount))} ms × ${decoCount} 个`)
if (workers === 1) console.log(`  其余（拼邻居、颜色、压缩）${f((tasks ? assembleMs : genMs - protoMs - decoMs) / n)} ms/区块`)
if (workers > 1) console.log(`  所有 Worker 合计：原型 ${protoCount + extraProto} 个，装饰 ${decoCount + extraDeco} 个（上面两行只是第 1 个 Worker 的）`)
console.log(`光照 + 网格（meshChunk） 平均 ${f(meshMs / Math.max(1, meshCount))} ms/区块（${meshCount} 个）`)
