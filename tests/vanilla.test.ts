/**
 * 用你自己放进 datapacks/vanilla 的原版 1.21.1 数据做的测试。
 * 没有这份数据时整组跳过（CI 上就是这样）。
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { NoiseChunk } from '../src/terrain/worldgen/density/NoiseChunk'
import { ROUTER_FIELDS } from '../src/terrain/worldgen/density/DensityFunctionParser'
import { Worldgen } from '../src/terrain/worldgen/Worldgen'
import { withPointCache } from '../src/terrain/worldgen/density/PointCache'
import { builtinPack, vanillaPack } from './loadDatapack'

const vanilla = vanillaPack()
const skip = vanilla ? false : '没有 datapacks/vanilla，跳过'

test('原版数据：7 个 noise_settings 全部能解析，没有警告', { skip }, () => {
  const wg = new Worldgen([vanilla!])
  assert.deepEqual(
    [...wg.settings.keys()],
    ['amplified', 'caves', 'end', 'floating_islands', 'large_biomes', 'nether', 'overworld'].map((s) => 'minecraft:' + s)
  )
  assert.deepEqual(wg.warnings, [])
  for (const s of wg.settings.values()) assert.equal(Object.keys(s.router).length, ROUTER_FIELDS.length)
})

test('原版数据：仓库里手抄的噪声参数与原版一致', { skip }, () => {
  const mine = new Worldgen([builtinPack()])
  const real = new Worldgen([vanilla!])
  for (const [id, params] of mine.registry.noise) {
    if (!id.startsWith('minecraft:')) continue
    assert.deepEqual(params, real.registry.getNoise(id), id)
  }
  for (const [id, json] of mine.registry.densityFunction) {
    if (!id.startsWith('minecraft:')) continue
    assert.deepEqual(json, real.registry.densityFunction.get(id), id)
  }
})

test('原版数据：主世界每个 router 字段都能求值且是有限数', { skip }, () => {
  const wg = new Worldgen([vanilla!])
  wg.setSeed(42n)
  for (const field of ROUTER_FIELDS) {
    const f = wg.sampler({ kind: 'router', settings: 'minecraft:overworld', field })
    for (const [x, y, z] of [
      [0, 64, 0],
      [-1234, -40, 5678],
      [30000, 200, -30000]
    ]) {
      const v = f({ blockX: x, blockY: y, blockZ: z })
      assert.ok(Number.isFinite(v), `${field} @ ${x},${y},${z} = ${v}`)
    }
  }
})

test('原版数据：主世界一个区块的地表高度在合理范围', { skip }, () => {
  const wg = new Worldgen([vanilla!])
  wg.setSeed(42n)
  const s = wg.getSettings('minecraft:overworld')
  const chunk = new NoiseChunk(wg.router('minecraft:overworld', 'final_density'), {
    x0: 0,
    z0: 0,
    sizeX: 16,
    sizeZ: 16,
    minY: s.minY,
    height: s.height,
    cellWidth: s.cellWidth,
    cellHeight: s.cellHeight
  })
  const top = new Int16Array(256).fill(-999)
  chunk.forEach((x, y, z, d) => {
    if (d > 0) top[x * 16 + z] = y
  })
  for (const h of top) assert.ok(h > -64 && h < 320, `高度 ${h}`)
})

test('原版数据：末地外岛（end_islands）有主岛和外岛', { skip }, () => {
  const wg = new Worldgen([vanilla!])
  wg.setSeed(42n)
  const f = wg.sampler('df|minecraft:end/sloped_cheese')
  // 原点是主岛（密度为正）；300、700 格处是主岛和外岛之间的虚空（负）
  assert.ok(f({ blockX: 0, blockY: 60, blockZ: 0 }) > 0)
  assert.ok(f({ blockX: 300, blockY: 60, blockZ: 0 }) < 0)
  assert.ok(f({ blockX: 700, blockY: 60, blockZ: 0 }) < 0)
  // 1100 格以外开始出现外岛：抽样里应该既有正值也有负值
  let positive = 0
  let total = 0
  for (let x = 1100; x < 5000; x += 37) {
    for (let z = -2000; z < 2000; z += 41) {
      total++
      if (f({ blockX: x, blockY: 60, blockZ: z }) > 0) positive++
    }
  }
  assert.ok(positive > 0 && positive < total, `外岛比例 ${positive}/${total}`)
})

test('原版数据：单点缓存（withPointCache）不改变任何数值', { skip }, () => {
  const wg = new Worldgen([vanilla!])
  wg.setSeed(42n)
  const plain = wg.router('minecraft:overworld', 'final_density')
  const cached = withPointCache(plain)
  for (let i = 0; i < 2000; i++) {
    const c = { blockX: i * 13 - 30000, blockY: (i % 380) - 64, blockZ: i * -7 }
    assert.equal(cached.compute({ ...c }), plain.compute(c))
  }
})
