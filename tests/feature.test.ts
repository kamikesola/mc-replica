/**
 * v5：地物（矿石、树、积雪）和矿脉。
 *
 * 和原版逐格对照的数据（tests/fixtures/features.json）来自原版 1.21.4 服务端生成的存档，
 * 生成方法见 tools/vanilla/make-feature-fixture.ts。需要 datapacks/vanilla（含 configured_feature / placed_feature），没有就跳过。
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { NAME_BY_BLOCK } from '../src/terrain/blocks'
import { chunkSource } from '../src/terrain/worker/surface'
import { buildFeaturesPerStep } from '../src/terrain/worldgen/feature/decorate'
import { heightProvider, intProvider } from '../src/terrain/worldgen/feature/core'
import { javaHashOrder } from '../src/terrain/worldgen/feature/tree'
import { WorldgenRandom } from '../src/terrain/worldgen/random/WorldgenRandom'
import { Worldgen, type PackInput } from '../src/terrain/worldgen/Worldgen'
import { oresOnlyPack, treesOnlyPack } from './featurePacks'
import { repoPath, vanillaPack } from './loadDatapack'

const vanilla = vanillaPack()
const hasFeatures = !!vanilla && Object.keys(vanilla.files).some((p) => p.includes('/placed_feature/'))
const skip = hasFeatures ? false : '没有 datapacks/vanilla/worldgen/placed_feature，跳过'
const parity = JSON.parse(readFileSync(repoPath('tests/fixtures/parity.json'), 'utf8'))
const fixture = JSON.parse(readFileSync(repoPath('tests/fixtures/features.json'), 'utf8')) as Record<string, Record<string, Record<string, number[]>>>

// ---------------------------------------------------------------- 基础件

test('地物排序（FeatureSorter）：按群系里的先后连边做拓扑排序，步骤分开', () => {
  const lists: Record<string, string[][]> = {
    a: [['ore1', 'ore2'], ['tree']],
    b: [['ore0', 'ore2'], ['flower', 'tree']],
    c: [['ore1']]
  }
  const steps = buildFeaturesPerStep(['a', 'b', 'c'], (b) => lists[b])
  // ore1 和 ore0 都在 ore2 前面；序号按第一次出现的顺序（ore1=0, ore2=1, tree=2, ore0=3, flower=4）。
  // 深度优先从序号小的开始，后序输出再整体反转，所以没有先后关系的 ore0 和 ore1 里，后访问到的 ore0 排在前面
  assert.deepEqual(steps, [
    ['ore0', 'ore1', 'ore2'],
    ['flower', 'tree']
  ])
  assert.throws(() => buildFeaturesPerStep(['x', 'y'], (b) => (b === 'x' ? [['p', 'q']] : [['q', 'p']])), /环/)
})

test('Java HashSet<BlockPos> 的遍历顺序（树的装饰器按这个顺序走）', () => {
  for (const [inserted, iterated] of parity.hashSetOrder as [number[][], number[][]][]) {
    assert.deepEqual(javaHashOrder(inserted as [number, number, number][]), iterated)
  }
})

test('WorldgenRandom：nextInt 等用 LegacyRandomSource 的算法，位来自 Xoroshiro', () => {
  const r = new WorldgenRandom(0n)
  const d = r.setDecorationSeed(42n, 160, -320)
  r.setFeatureSeed(d, 5, 6)
  const a = [r.nextInt(16), r.nextInt(16), r.nextFloat(), r.nextDouble()]
  r.setFeatureSeed(d, 5, 6)
  assert.deepEqual([r.nextInt(16), r.nextInt(16), r.nextFloat(), r.nextDouble()], a)
  r.setFeatureSeed(d, 6, 6)
  assert.notDeepEqual([r.nextInt(16), r.nextInt(16), r.nextFloat(), r.nextDouble()], a)
})

test('IntProvider / HeightProvider 的范围', () => {
  const r = new WorldgenRandom(7n)
  const u = intProvider({ type: 'minecraft:uniform', min_inclusive: 2, max_inclusive: 6 })
  const b = intProvider({ type: 'minecraft:biased_to_bottom', min_inclusive: 0, max_inclusive: 4 })
  const w = intProvider({ type: 'minecraft:weighted_list', distribution: [{ data: 0, weight: 19 }, { data: 1, weight: 1 }] })
  const level = { minY: -64, height: 384 } as never
  const trap = heightProvider({ type: 'minecraft:trapezoid', min_inclusive: { above_bottom: -80 }, max_inclusive: { above_bottom: 80 } })
  const top = heightProvider({ type: 'minecraft:uniform', min_inclusive: { absolute: 136 }, max_inclusive: { below_top: 0 } })
  let ones = 0
  for (let i = 0; i < 2000; i++) {
    const x = u(r)
    assert.ok(x >= 2 && x <= 6)
    const y = b(r)
    assert.ok(y >= 0 && y <= 4)
    ones += w(r)
    const t = trap(r, level)
    assert.ok(t >= -144 && t <= 16)
    const h = top(r, level)
    assert.ok(h >= 136 && h <= 319)
  }
  assert.ok(ones > 50 && ones < 160, String(ones)) // 约 1/20
})

// ---------------------------------------------------------------- 和原版逐格对照

function compare(kind: string, pack: PackInput | null) {
  const wg = new Worldgen(pack ? [vanilla!, pack] : [vanilla!])
  wg.setSeed(42n)
  const src = chunkSource(wg, 'minecraft:overworld', wg.getSettings('minecraft:overworld'))
  const want = fixture[kind]
  const names = new Set(Object.values(want).flatMap((c) => Object.keys(c)))
  let blocks = 0
  for (const [key, byName] of Object.entries(want)) {
    const [cx, cz] = key.split(',').map(Number)
    const ours = pack ? src.withDecorations(cx, cz) : src.proto(cx, cz).blocks
    const got: Record<string, number[]> = {}
    ours.forEach((id, i) => {
      const n = NAME_BY_BLOCK[id].replace('minecraft:', '')
      if (names.has(n)) (got[n] ??= []).push(i)
    })
    // 原版这个区块里没有的那类方块，我们也不能有
    for (const n of names) assert.deepEqual(got[n] ?? [], byName[n] ?? [], `区块 ${key} 的 ${n}`)
    blocks += Object.values(byName).reduce((s, l) => s + l.length, 0)
  }
  return { chunks: Object.keys(want).length, blocks }
}

test('矿脉和原版逐格一致（噪声阶段，关掉所有地物）', { skip }, () => {
  const r = compare('veins', null)
  assert.ok(r.blocks > 500)
})

test('矿石和原版逐格一致（只留第 6 步地物）', { skip, timeout: 600_000 }, () => {
  const r = compare('ores', oresOnlyPack(vanilla!))
  assert.ok(r.chunks >= 16 && r.blocks > 5000, JSON.stringify(r))
})

test('树和原版逐格一致（36 种树随机挑，覆盖 21 个群系的样本区域）', { skip, timeout: 1_200_000 }, () => {
  const r = compare('trees', treesOnlyPack(vanilla!))
  assert.ok(r.chunks >= 75 && r.blocks > 8000, JSON.stringify(r))
})

test('原版数据：完整的装饰会放下矿石、树和积雪', { skip, timeout: 600_000 }, () => {
  const wg = new Worldgen([vanilla!])
  wg.setSeed(42n)
  const src = chunkSource(wg, 'minecraft:overworld', wg.getSettings('minecraft:overworld'))
  const count = new Map<string, number>()
  // 出生点的黑森林 + 雪原针叶林（种子 42）
  for (const [cx, cz] of [
    [0, 0],
    [-2, -2],
    [-1, -1],
    [309, -31]
  ]) {
    for (const id of src.withDecorations(cx, cz)) count.set(NAME_BY_BLOCK[id], (count.get(NAME_BY_BLOCK[id]) ?? 0) + 1)
  }
  for (const b of ['coal_ore', 'iron_ore', 'dark_oak_log', 'dark_oak_leaves', 'spruce_log', 'snow']) assert.ok((count.get('minecraft:' + b) ?? 0) > 0, b)
})
