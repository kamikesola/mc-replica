/**
 * v8：存档。
 *
 * tests/fixtures/save8/ 是从原版 1.21.4 服务端存档里剪下来的一小块（level.dat + 一个只有 9 个区块的区域文件，
 * 见 tools/vanilla/make-save-fixture.ts）。检查：
 *   - NBT、level.dat、区域文件的读取
 *   - 区块解码：和 tools/vanilla/anvil.ts（Node 版，v5 起所有对照工具都用它）逐格一致
 *   - 原版的区块和我们按同一个种子生成的区块逐格对照
 *   - 改动的保存和读取（内存版存储）、导入原版存档
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { BLOCK_OF, BlockType, fullStateName, NAME_BY_STATE, parseState, propOf, STATE_COUNT, stateOf } from '../src/terrain/blocks'
import { chunkNbt, decodeChunk, readLevelDat, regionChunk } from '../src/save/anvil'
import { BlockMapper } from '../src/save/blockMap'
import { readNbt } from '../src/save/nbt'
import { MemoryStore } from '../src/save/store'
import { decodeEdits, encodeEdits, vanillaPlayer, WorldSave } from '../src/save/WorldSave'
import { chunkSource } from '../src/terrain/worker/surface'
import { settleLeaves } from '../src/terrain/worldgen/feature/settle'
import { Worldgen } from '../src/terrain/worldgen/Worldgen'
import { loadChunk } from '../tools/vanilla/anvil'
import { repoPath, vanillaPack } from './loadDatapack'

const DIR = repoPath('tests/fixtures/save8')
const region = new Uint8Array(readFileSync(`${DIR}/region/r.0.-1.mca`))
const levelDat = new Uint8Array(readFileSync(`${DIR}/level.dat`))
const CHUNKS: [number, number][] = []
for (let cz = -18; cz <= -16; cz++) for (let cx = 16; cx <= 18; cx++) CHUNKS.push([cx, cz])

test('NBT：各种类型都能读（手写一个小文件）', () => {
  // { "": { b: 1b, s: 300s, i: -5, l: 2^40, f: 1.5f, d: 0.25, str: "方块", list: [1, 2], ints: [7], longs: [-1] } }
  const parts: number[] = [10, 0, 0]
  const name = (s: string) => {
    const b = new TextEncoder().encode(s)
    parts.push(b.length >> 8, b.length & 255, ...b)
  }
  const tag = (t: number, n: string, payload: number[]) => {
    parts.push(t)
    name(n)
    parts.push(...payload)
  }
  const be = (n: number, bytes: number) => Array.from({ length: bytes }, (_, i) => (n / 2 ** (8 * (bytes - 1 - i))) & 255)
  tag(1, 'b', [1])
  tag(2, 's', be(300, 2))
  tag(3, 'i', [0xff, 0xff, 0xff, 0xfb])
  tag(4, 'l', [0, 0, 1, 0, 0, 0, 0, 0])
  tag(5, 'f', [0x3f, 0xc0, 0, 0])
  tag(6, 'd', [0x3f, 0xd0, 0, 0, 0, 0, 0, 0])
  const str = new TextEncoder().encode('方块')
  tag(8, 'str', [0, str.length, ...str])
  tag(9, 'list', [3, ...be(2, 4), ...be(1, 4), ...be(2, 4)])
  tag(11, 'ints', [...be(1, 4), ...be(7, 4)])
  tag(12, 'longs', [...be(1, 4), 255, 255, 255, 255, 255, 255, 255, 255])
  parts.push(0)
  const n = readNbt(new Uint8Array(parts))
  assert.equal(n.b, 1)
  assert.equal(n.s, 300)
  assert.equal(n.i, -5)
  assert.equal(n.l, 2n ** 40n)
  assert.equal(n.f, 1.5)
  assert.equal(n.d, 0.25)
  assert.equal(n.str, '方块')
  assert.deepEqual(n.list, [1, 2])
  assert.deepEqual([...(n.ints as Int32Array)], [7])
  assert.deepEqual([...(n.longs as BigInt64Array)], [-1n])
})

test('level.dat：种子、出生点、数据版本（1.21.4 = 4189）', async () => {
  const info = await readLevelDat(levelDat)
  assert.equal(info.seed, 42n)
  assert.equal(info.dataVersion, 4189)
  assert.ok(Number.isInteger(info.spawn.x) && Number.isInteger(info.spawn.z))
  assert.equal(info.player, null) // 服务端存档：玩家不在 level.dat 里
})

test('区块解码：和 Node 版的读取工具逐格一致（9 个区块，带属性）', async () => {
  const mapper = new BlockMapper()
  for (const [cx, cz] of CHUNKS) {
    const raw = regionChunk(region, cx, cz)
    assert.ok(raw, `${cx},${cz}`)
    const d = decodeChunk(await chunkNbt(raw.compression, raw.data), -64, 384, mapper)
    assert.ok(d.full)
    const ref = loadChunk(DIR, cx, cz)!
    let diff = 0
    for (let i = 0; i < 384 * 256; i++) {
      const want = parseState(ref.states[i]) ?? BlockType.air
      if (d.blocks[i] !== want) diff++
    }
    assert.equal(diff, 0, `${cx},${cz}`)
  }
  // 区域文件里没有的区块
  assert.equal(regionChunk(region, 0, -1), null)
  // 这一块地形里的方块我们都认识
  assert.deepEqual([...mapper.unknown.keys()], [])
})

const vanilla = vanillaPack()
test('原版的区块 = 我们按同一个种子生成的区块（森林，9 个区块里中间那个）', { skip: vanilla ? false : '没有 datapacks/vanilla，跳过' }, async () => {
  const wg = new Worldgen([vanilla!])
  wg.setSeed(42n)
  const s = wg.getSettings('minecraft:overworld')
  const src = chunkSource(wg, 'minecraft:overworld', s)
  const nine: Uint16Array[] = []
  for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) nine.push(src.withDecorations(17 + dx, -17 + dz).slice())
  settleLeaves(nine, s.height)
  const raw = regionChunk(region, 17, -17)!
  const d = decodeChunk(await chunkNbt(raw.compression, raw.data), s.minY, s.height, new BlockMapper())
  let same = 0
  for (let i = 0; i < d.blocks.length; i++) if (d.blocks[i] === nine[4][i]) same++
  const ratio = same / d.blocks.length
  assert.ok(ratio > 0.995, `一致 ${(ratio * 100).toFixed(3)}%`)
})

test('原版方块 → 我们的：认识的原样，不认识的找代替品或当空气，并且计数', () => {
  const m = new BlockMapper()
  assert.equal(m.map('minecraft:oak_log[axis=x]'), stateOf(BlockType.log, { axis: 'x' }))
  assert.equal(m.map('minecraft:oak_stairs[facing=east,half=bottom,shape=straight,waterlogged=false]'), BlockType.planks)
  const birch = m.map('minecraft:stripped_birch_log[axis=z]')
  assert.equal(BLOCK_OF[birch], BlockType.log)
  assert.equal(propOf(birch, 'axis'), 'z')
  assert.equal(m.map('minecraft:torch'), BlockType.glowstone)
  assert.equal(m.map('minecraft:barrier', 3), BlockType.air)
  assert.equal(m.unknown.get('minecraft:barrier'), 3)
  assert.equal(m.substituted.get('minecraft:oak_stairs'), 1)
  // 水的 level：流动的水
  assert.equal(m.map('minecraft:water[level=0]'), BlockType.water)
})

test('改动的编码：状态写成字符串的调色板，解回来完全一样（所有状态）', () => {
  const e = new Map<number, number>()
  for (let s = 0; s < STATE_COUNT; s++) e.set(s * 37, s)
  const c = encodeEdits(e)
  assert.ok(c.palette.every((p) => p.startsWith('minecraft:')))
  assert.equal(c.palette.length, new Set(c.palette).size)
  const back = decodeEdits(c)
  // 水、岩浆的流动状态名字一样（原版的 level），编号也要一样
  for (const [i, s] of e) assert.equal(back.get(i), s, `${fullStateName(s)} ${NAME_BY_STATE[s]}`)
})

test('存档：新建 → 改方块 → 保存 → 重新打开，改动和玩家都在', async () => {
  const store = new MemoryStore()
  await WorldSave.ensure(store, { id: 'w1', name: '测试', seed: '42', settings: 'minecraft:overworld' })
  const a = (await WorldSave.open(store, 'w1'))!
  assert.equal(a.edits.size, 0)
  const edits = new Map([['3,-2', new Map([[100, BlockType.glowstone], [200, stateOf(BlockType.log, { axis: 'z' })]])]])
  a.world.dirty.add('3,-2')
  const player = { x: 1.5, y: 70, z: -3.25, yaw: 0.5, pitch: -0.2, flying: true }
  await a.world.save(edits, { player, dayTime: 1234, daylightCycle: false })
  assert.equal(a.world.dirty.size, 0)
  const b = (await WorldSave.open(store, 'w1'))!
  assert.deepEqual(b.edits, edits)
  assert.deepEqual(b.world.meta.player, player)
  assert.equal(b.world.meta.dayTime, 1234)
  assert.equal(b.world.meta.daylightCycle, false)
  // ensure 不会覆盖已有的世界
  await WorldSave.ensure(store, { id: 'w1', name: '别的', seed: '1', settings: '' })
  assert.equal((await store.getWorld('w1'))!.name, '测试')
  await store.deleteWorld('w1')
  assert.equal(await WorldSave.open(store, 'w1'), null)
  assert.equal(store.chunks.size, 0)
})

test('导入原版存档：存下 level.dat 里的种子和区域文件，按区块坐标找回区域文件', async () => {
  const store = new MemoryStore()
  const files = [
    { path: 'level.dat', data: levelDat.slice().buffer },
    { path: 'region/r.0.-1.mca', data: region.slice().buffer },
    { path: 'playerdata/x.dat', data: new ArrayBuffer(4) } // 用不上的文件不存
  ]
  const meta = await WorldSave.importVanilla(store, files)
  assert.equal(meta.source, 'vanilla')
  assert.equal(meta.seed, '42')
  assert.deepEqual(await store.listFiles(meta.id), ['region/r.0.-1.mca'])
  const w = (await WorldSave.open(store, meta.id))!.world
  const r = await w.region(17, -17)
  assert.ok(r && regionChunk(r, 17, -17))
  assert.equal(await w.region(40, 0), null) // 别的区域：没有文件
  await assert.rejects(WorldSave.importVanilla(store, files.slice(1)), /level\.dat/)
})

test('原版玩家的朝向：yaw 0 朝南（+z），pitch 正数往下看', () => {
  const p = vanillaPlayer({ x: 0, y: 0, z: 0, yaw: 0, pitch: 30, flying: false })
  // three.js：相机朝 (-sin yaw, 0, -cos yaw)
  assert.ok(Math.abs(-Math.sin(p.yaw)) < 1e-9 && -Math.cos(p.yaw) > 0.99)
  assert.ok(p.pitch < 0)
  const east = vanillaPlayer({ x: 0, y: 0, z: 0, yaw: -90, pitch: 0, flying: false }) // 原版 yaw -90 朝东（+x）
  assert.ok(-Math.sin(east.yaw) > 0.99)
})
