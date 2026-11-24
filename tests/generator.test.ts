/**
 * v10.2：区块生成拆成 原型 / 装饰 / 组装 三种任务以后，结果必须和 v10.1 一个 Worker 从头算到尾（generateChunk）逐格相同，
 * 而且调度器发过去的依赖必须是全的：Worker 缺了什么会自己悄悄补算（结果照样对，但又回到了重复计算），
 * 所以这里让“缺了还去算”直接报错。
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { chunkSource, generateChunk } from '../src/terrain/worker/surface'
import { decorationDeps, type Decoration, type Proto } from '../src/terrain/worker/pipeline'
import { AROUND, assembleTask, decorateTask, protoTask } from '../src/terrain/worker/tasks'
import { Worldgen, type PackInput } from '../src/terrain/worldgen/Worldgen'
import { builtinPack, vanillaPack } from './loadDatapack'

const vanilla = vanillaPack()

/** 用三种任务生成一批区块（同步地模拟主线程的调度器：要什么先递归算什么，每样只算一次） */
function viaTasks(wg: Worldgen, id: string, chunks: [number, number][]) {
  const s = wg.getSettings(id)
  const src = chunkSource(wg, id, s)
  const features = src.hasFeatures
  // 缺了原型还去算 → 报错（protoTask 自己算的时候放行）
  let allow = false
  const orig = src.proto.bind(src)
  src.proto = (cx, cz) => {
    if (!allow && !(src as unknown as { protos: { has(k: string): boolean } }).protos.has(`${cx},${cz}`)) throw new Error(`任务缺少原型 ${cx},${cz}`)
    return orig(cx, cz)
  }
  const protos = new Map<string, Proto>()
  const decos = new Map<string, Decoration>()
  let protoCount = 0
  let decoCount = 0
  const proto = (cx: number, cz: number): Proto => {
    const k = `${cx},${cz}`
    let p = protos.get(k)
    if (!p) {
      allow = true
      p = protoTask(wg, id, s, cx, cz)
      allow = false
      protoCount++
      protos.set(k, p)
    }
    return p
  }
  const deco = (cx: number, cz: number): Decoration => {
    const k = `${cx},${cz}`
    let d = decos.get(k)
    if (!d) {
      const priors = decorationDeps(cx, cz).map(([ex, ez]) => [ex, ez, deco(ex, ez)] as [number, number, Decoration])
      d = decorateTask(wg, id, s, cx, cz, AROUND.map(([dx, dz]) => proto(cx + dx, cz + dz)), priors)
      decoCount++
      decos.set(k, d)
    }
    return d
  }
  const out = chunks.map(([cx, cz]) =>
    assembleTask(
      wg,
      id,
      s,
      cx,
      cz,
      AROUND.map(([dx, dz]) => proto(cx + dx, cz + dz)),
      features ? AROUND.map(([dx, dz]) => deco(cx + dx, cz + dz)) : null
    )
  )
  return { out, protoCount, decoCount }
}

function compare(packs: PackInput[], id: string, chunks: [number, number][]) {
  const ref = new Worldgen(packs)
  ref.setSeed(42n)
  const wg = new Worldgen(packs)
  wg.setSeed(42n)
  const r = viaTasks(wg, id, chunks)
  const s = ref.getSettings(id)
  chunks.forEach(([cx, cz], i) => {
    const a = generateChunk(ref, id, s, cx, cz, { mesh: false })
    const b = r.out[i]
    assert.deepEqual(b.blocks, a.blocks, `区块 ${cx},${cz} 的方块不同`)
    assert.deepEqual(b.fluidUpdates, a.fluidUpdates, `区块 ${cx},${cz} 的流体更新不同`)
    assert.deepEqual(b.tints, a.tints, `区块 ${cx},${cz} 的颜色不同`)
    assert.equal(b.sections.length, a.sections.length)
  })
  return r
}

// 跨过装饰区域（4×4）的边界，又有区域中间的
const CHUNKS: [number, number][] = [
  [0, 0],
  [-1, 0],
  [3, 3],
  [4, 4],
  [-5, 2],
  [2, -5]
]

test('三段任务：原版主世界（有地物），和一次算完的结果逐格相同，依赖不缺', { skip: vanilla ? false : '没有 datapacks/vanilla，跳过' }, () => {
  const r = compare([builtinPack(), vanilla!], 'minecraft:overworld', CHUNKS)
  // 每样只算一次：原型、装饰的个数就是用到的不同区块数
  assert.ok(r.protoCount > 0 && r.decoCount > 0)
})

test('三段任务：下界（地物、雕刻器不同）', { skip: vanilla ? false : '没有 datapacks/vanilla，跳过' }, () => {
  compare([builtinPack(), vanilla!], 'minecraft:nether', CHUNKS.slice(0, 3))
})

test('三段任务：demo 地形（没有地物，只要原型）', () => {
  const r = compare([builtinPack()], 'demo:overworld_lite', CHUNKS.slice(0, 3))
  assert.equal(r.decoCount, 0)
})

test('decorationDeps：区域里排在前面、2 个区块以内；区域的第一个区块没有依赖', () => {
  assert.deepEqual(decorationDeps(0, 0), [])
  assert.deepEqual(decorationDeps(1, 0), [[0, 0]])
  assert.deepEqual(decorationDeps(0, 1), [[0, 0], [1, 0], [2, 0]])
  // 不跨区域：(4, 4) 是新区域的第一个
  assert.deepEqual(decorationDeps(4, 4), [])
  // 负坐标：区域 [-4, -1]
  assert.deepEqual(decorationDeps(-4, -4), [])
  assert.deepEqual(decorationDeps(-1, -4), [[-3, -4], [-2, -4]])
})
