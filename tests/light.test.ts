/**
 * v6：光照引擎、增量更新、昼夜公式。
 *
 * 和原版逐格对照的数据（tests/fixtures/light6.json）来自原版 1.21.4 服务端 bare 模式（没有地物、没有雕刻器）的存档，
 * 生成方法见 tools/vanilla/make-light-fixture.ts。需要 datapacks/vanilla，没有就跳过那一项。
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { inflateSync } from 'node:zlib'
import { BlockType } from '../src/terrain/blocks'
import { LIGHT_BLOCK, LIGHT_EMISSION, lightChunk, lightRegion, LP } from '../src/terrain/light/LightEngine'
import { updateLight, type LightWorld } from '../src/terrain/light/LightUpdater'
import { meshSection, N, nIndex } from '../src/terrain/mesh/mesher'
import { chunkSource } from '../src/terrain/worker/surface'
import { Worldgen } from '../src/terrain/worldgen/Worldgen'
import { LegacyRandomSource } from '../src/terrain/worldgen/random/LegacyRandomSource'
import { lightmap, moonPhase, skyDarken, starQuads, sunriseColor, timeOfDay } from '../src/sky/formulas'
import { barePack } from './featurePacks'
import { repoPath, vanillaPack } from './loadDatapack'

// ---------------------------------------------------------------- 方块的光照属性

test('光照属性表（从原版 jar 导出）：石头挡光、水和树叶减 1、萤石和岩浆发光', () => {
  assert.equal(LIGHT_BLOCK[BlockType.stone], 15)
  assert.equal(LIGHT_BLOCK[BlockType.air], 0)
  assert.equal(LIGHT_BLOCK[BlockType.water], 1)
  assert.equal(LIGHT_BLOCK[BlockType.leaves], 1)
  assert.equal(LIGHT_BLOCK[BlockType.ice], 1)
  assert.equal(LIGHT_BLOCK[BlockType.short_grass], 0)
  assert.equal(LIGHT_EMISSION[BlockType.glowstone], 15)
  assert.equal(LIGHT_EMISSION[BlockType.lava], 15)
  assert.equal(LIGHT_EMISSION[BlockType.glow_lichen], 7)
  assert.equal(LIGHT_EMISSION[BlockType.magma_block], 3)
})

// ---------------------------------------------------------------- 小场景

/** W×D×H 的小世界，下标 (y * D + z) * W + x */
function box(W: number, D: number, H: number, fill: BlockType) {
  const g = new Uint8Array(W * D * H).fill(fill)
  return { g, at: (x: number, y: number, z: number) => (y * D + z) * W + x }
}

test('方块光：萤石在黑暗里每走一格减 1（曼哈顿距离），穿过水多减', () => {
  const { g, at } = box(31, 31, 31, BlockType.air)
  g[at(15, 15, 15)] = BlockType.glowstone
  const l = lightRegion(g, 31, 31, 31, false)
  const block = (x: number, y: number, z: number) => l[at(x, y, z)] >> 4
  assert.equal(block(15, 15, 15), 15)
  assert.equal(block(16, 15, 15), 14)
  assert.equal(block(18, 16, 15), 11) // 距离 4
  assert.equal(block(15, 15, 29), 1) // 距离 14
  assert.equal(block(15, 15, 30), 0)
  // 一整层水：从水里穿过去每格减 1（水的 lightBlock = 1，代价 max(1, 1) = 1，和空气一样）
  const w = box(5, 1, 20, BlockType.water)
  w.g[w.at(2, 19, 0)] = BlockType.glowstone
  const lw = lightRegion(w.g, 5, 1, 20, false)
  assert.equal(lw[w.at(2, 10, 0)] >> 4, 6)
})

test('天空光：露天 15；水面往下每格减 1；树叶下面 14；石头下面靠旁边照进来', () => {
  const { g, at } = box(9, 9, 20, BlockType.air)
  for (let x = 0; x < 9; x++) for (let z = 0; z < 9; z++) for (let y = 0; y < 5; y++) g[at(x, y, z)] = BlockType.stone
  for (let y = 5; y < 10; y++) g[at(2, y, 2)] = BlockType.water // 一根水柱（周围是空气）
  g[at(6, 9, 6)] = BlockType.leaves
  g[at(4, 12, 4)] = BlockType.stone // 悬空的一块石头
  const l = lightRegion(g, 9, 9, 20, true)
  const sky = (x: number, y: number, z: number) => l[at(x, y, z)] & 15
  assert.equal(sky(0, 10, 0), 15)
  assert.equal(sky(2, 9, 2), 14) // 最上面一格水
  assert.equal(sky(2, 8, 2), 14) // 旁边是露天的空气（15）横着照进来 15 − 1
  assert.equal(sky(6, 9, 6), 14) // 树叶本身
  assert.equal(sky(6, 8, 6), 14) // 树叶下面：旁边的空气是 15，横着照过来
  assert.equal(sky(4, 11, 4), 14) // 悬空石头下面
  assert.equal(sky(4, 12, 4), 0) // 石头里面
  assert.equal(sky(4, 4, 4), 0)
})

test('雪层（底面挡光）：下面的树叶只能从旁边照进来', () => {
  const { g, at } = box(3, 3, 6, BlockType.stone)
  g[at(1, 3, 1)] = BlockType.leaves
  g[at(1, 4, 1)] = BlockType.snow
  g[at(1, 5, 1)] = BlockType.air
  g[at(0, 3, 1)] = BlockType.air // 树叶旁边开一个口
  for (let y = 4; y < 6; y++) g[at(0, y, 1)] = BlockType.air
  const l = lightRegion(g, 3, 3, 6, true)
  assert.equal(l[at(1, 4, 1)] & 15, 15) // 雪层本身是光源
  assert.equal(l[at(1, 3, 1)] & 15, 14) // 从旁边 (0,3,1)=15 照进来，而不是从上面
  // 堵上旁边的口：树叶就是 0（上面的雪层挡住了）
  g[at(0, 3, 1)] = BlockType.stone
  const l2 = lightRegion(g, 3, 3, 6, true)
  assert.equal(l2[at(1, 3, 1)] & 15, 0)
})

// ---------------------------------------------------------------- 增量更新 = 重新整块算

test('增量更新：随机挖放 300 次，每次都和重新整块计算的结果一样', () => {
  const W = 40
  const H = 48
  const { g, at } = box(W, W, H, BlockType.air)
  let seed = 12345
  const rand = (n: number) => ((seed = (Math.imul(seed, 1103515245) + 12345) >>> 0) % n)
  // 地面 + 起伏 + 洞
  for (let x = 0; x < W; x++)
    for (let z = 0; z < W; z++) {
      const top = 20 + ((x * 7 + z * 13) % 9)
      for (let y = 0; y < top; y++) g[at(x, y, z)] = BlockType.stone
    }
  for (let i = 0; i < 400; i++) g[at(rand(W), 5 + rand(20), rand(W))] = BlockType.air
  const palette = [BlockType.air, BlockType.air, BlockType.stone, BlockType.glowstone, BlockType.water, BlockType.leaves, BlockType.snow, BlockType.lava, BlockType.glow_lichen]
  const light = lightRegion(g, W, W, H, true)
  const world: LightWorld = {
    minY: 0,
    maxY: H,
    hasSky: true,
    block: (x, y, z) => (x < 0 || z < 0 || x >= W || z >= W || y < 0 || y >= H ? BlockType.air : g[at(x, y, z)]),
    get: (x, y, z) => (x < 0 || z < 0 || x >= W || z >= W || y < 0 || y >= H ? -1 : light[at(x, y, z)]),
    set: (x, y, z, v) => (light[at(x, y, z)] = v)
  }
  for (let k = 0; k < 300; k++) {
    const x = 5 + rand(W - 10)
    const z = 5 + rand(W - 10)
    const y = 10 + rand(25)
    const old = g[at(x, y, z)]
    const nb = palette[rand(palette.length)]
    g[at(x, y, z)] = nb
    updateLight(world, x, y, z, old, nb)
    const full = lightRegion(g, W, W, H, true)
    for (let i = 0; i < full.length; i++)
      if (full[i] !== light[i]) {
        const xx = i % W
        const zz = Math.floor(i / W) % W
        const yy = Math.floor(i / W / W)
        assert.fail(`第 ${k} 次（${x},${y},${z} ${old}→${nb}）后 (${xx},${yy},${zz}) 增量 ${light[i]} 整块 ${full[i]}`)
      }
  }
})

// ---------------------------------------------------------------- 平滑光照

test('平滑光照：贴墙的地面，靠墙的两个角暗、远离墙的两个角亮', () => {
  const blocks = new Uint8Array(N * N * N)
  const light = new Uint8Array(N * N * N).fill(15)
  for (let x = -1; x <= 16; x++) for (let z = -1; z <= 16; z++) blocks[nIndex(x, 0, z)] = BlockType.stone
  // 一面墙（x = 5，y = 1..3），墙里亮度 0
  for (let z = -1; z <= 16; z++)
    for (let y = 1; y <= 3; y++) {
      blocks[nIndex(5, y, z)] = BlockType.stone
      light[nIndex(5, y, z)] = 0
    }
  // 墙边那一格地面的上方暗一些（天空光 12）
  for (let z = -1; z <= 16; z++) light[nIndex(4, 1, z)] = 12
  const m = meshSection(blocks, { light }).opaque
  // 找 x = 4 那格地面的顶面（face 3），四个顶点的天空光之和
  const sums: number[] = []
  for (let q = 0; q < m.indices.length / 6; q++) {
    const v = m.indices[q * 6]
    if (m.info[v * 4] !== 3) continue
    const xs = [0, 1, 2, 3].map((k) => m.positions[(v + k) * 3] / 256)
    if (Math.min(...xs) !== 4 || Math.max(...xs) !== 5) continue
    for (let k = 0; k < 4; k++) sums.push(m.light[(v + k) * 2])
  }
  assert.ok(sums.length >= 4)
  // 靠墙的角：墙里是 0（换成中心 12），4 格 = 12 + 12 + 12 + 12 = 48；远离墙的角：12 + 15 + 15 + 12 = 54
  assert.ok(sums.includes(48) && sums.includes(54), `角上的天空光之和 ${sums}`)
})

// ---------------------------------------------------------------- 和原版存档对照

const vanilla = vanillaPack()
test('和原版对照：bare 存档里的天空光、方块光逐格一致（主世界、下界、末地）', { skip: vanilla ? false : '没有 datapacks/vanilla，跳过' }, () => {
  const fixture = JSON.parse(readFileSync(repoPath('tests/fixtures/light6.json'), 'utf8')) as { dim: string; cx: number; cz: number; light: string }[]
  const wg = new Worldgen([vanilla!, barePack(vanilla!)])
  wg.setSeed(42n)
  for (const f of fixture) {
    const s = wg.getSettings(f.dim)
    const src = chunkSource(wg, f.dim, s)
    const nine: Uint8Array[] = []
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) nine.push(src.proto(f.cx + dx, f.cz + dz).blocks)
    const ours = lightChunk(nine, s.height, f.dim === 'minecraft:overworld')
    const theirs = inflateSync(Buffer.from(f.light, 'base64'))
    let diff = 0
    for (let y = 0; y < s.height; y++)
      for (let i = 0; i < 256; i++) if (ours[(y * LP + (i >> 4) + 1) * LP + (i & 15) + 1] !== theirs[y * 256 + i]) diff++
    assert.equal(diff, 0, `${f.dim} ${f.cx},${f.cz}：${diff} 格不一致`)
  }
})

// ---------------------------------------------------------------- 昼夜公式

test('时间：dayTime 6000 正午（太阳在头顶）、18000 午夜、0 日出；月相每天换一个', () => {
  assert.equal(timeOfDay(6000), 0)
  assert.equal(timeOfDay(18000), 0.5)
  assert.ok(Math.abs(timeOfDay(0) - 0.7845) < 1e-3)
  assert.equal(skyDarken(timeOfDay(6000)), 1)
  assert.ok(Math.abs(skyDarken(timeOfDay(18000)) - 0.2) < 1e-6)
  assert.equal(sunriseColor(timeOfDay(6000)), null)
  assert.ok(sunriseColor(timeOfDay(12500)))
  assert.equal(moonPhase(0), 0)
  assert.equal(moonPhase(24000 * 9 + 5), 1)
})

test('光照贴图：白天露天接近白色，夜里偏蓝变暗，方块光偏暖', () => {
  const day = lightmap({ dim: 'overworld', t: timeOfDay(6000), flicker: 0, gamma: 0.5 })
  const night = lightmap({ dim: 'overworld', t: timeOfDay(18000), flicker: 0, gamma: 0.5 })
  const px = (a: Uint8Array, sky: number, block: number) => [...a.subarray((sky * 16 + block) * 3, (sky * 16 + block) * 3 + 3)]
  const noon = px(day, 15, 0)
  assert.ok(noon.every((c) => c > 240), `正午 ${noon}`)
  const mid = px(night, 15, 0)
  assert.ok(mid[2] > mid[0] && mid[0] < 120, `午夜 ${mid}`)
  // 方块光：亮的地方（14）几乎是白的，暗一些的地方偏黄
  const dim = px(night, 0, 8)
  assert.ok(dim[0] > dim[1] && dim[1] > dim[2], `方块光 ${dim}`)
  // 全黑的地方也不是纯黑（原版往 0.75 灰混了 4%）
  assert.ok(px(night, 0, 0)[0] > 0)
})

test('星星：种子 10842，在半径 100 的球面上；1500 个随机点里落在单位球内的留下（约一半）', () => {
  const q = starQuads(new LegacyRandomSource(10842n))
  const n = q.length / 12
  assert.equal(n, 780)
  const r = Math.hypot(q[0], q[1], q[2])
  assert.ok(Math.abs(r - 100) < 0.5)
})
