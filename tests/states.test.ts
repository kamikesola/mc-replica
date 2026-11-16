/**
 * v7：方块状态。
 *
 * 和原版逐格对照的数据（tests/fixtures/states7.json）来自原版 1.21.4 服务端的完整存档：按状态的类别
 * （树叶 distance、原木朝向、藤蔓的面、两格高植物……）挑出我们和原版连属性都一致的区块，存方块下标和完整状态。
 * 生成方法见 tools/vanilla/make-state-fixture.ts。需要 datapacks/vanilla，没有就跳过那一项。
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import {
  BLOCK_COUNT,
  BLOCK_OF,
  BlockType,
  FACE_MASK,
  FACE_TEXTURES,
  fullStateName,
  NAME_BY_STATE,
  parseState,
  propOf,
  STATE_BITS,
  STATE_COUNT,
  STATES,
  stateOf,
  withState
} from '../src/terrain/blocks'
import { stateAt } from '../src/terrain/states'
import { TEXTURE_LAYER } from '../src/terrain/textures/painters'
import { chunkSource } from '../src/terrain/worker/surface'
import { settleLeaves } from '../src/terrain/worldgen/feature/settle'
import { Worldgen } from '../src/terrain/worldgen/Worldgen'
import DEFS from '../src/terrain/stateDefs.json'
import { repoPath, vanillaPack } from './loadDatapack'

test('状态编号：方块 b 的默认状态就是 b，其余状态排在后面；v8.1 起是原版全部方块，一共不到 32768 个（15 位）', () => {
  for (let b = 0; b < BLOCK_COUNT; b++) assert.equal(BLOCK_OF[b], b)
  assert.ok(STATE_COUNT > BLOCK_COUNT && STATE_COUNT <= 32768)
  assert.equal(STATE_BITS, 15)
  // 每个状态都能还原成同一个编号（名字 → 状态 → 名字）
  for (let s = 0; s < STATE_COUNT; s++) assert.equal(parseState(fullStateName(s)), s, fullStateName(s))
})

test('属性：默认值、改属性、名字的写法和原版存档一样（按属性名排序）', () => {
  assert.equal(fullStateName(BlockType.leaves), 'minecraft:oak_leaves[distance=7,persistent=false,waterlogged=false]')
  const s = withState(BlockType.leaves, { distance: 3 })
  assert.equal(propOf(s, 'distance'), '3')
  assert.equal(BLOCK_OF[s], BlockType.leaves)
  assert.equal(withState(s, { distance: 7 }), BlockType.leaves)
  assert.equal(fullStateName(stateOf(BlockType.log, { axis: 'x' })), 'minecraft:oak_log[axis=x]')
  // 流动的水：level 按原版规则（源 0，流动 8 − 量，下落 8）
  assert.equal(fullStateName(BlockType.water), 'minecraft:water[level=0]')
  // 一直含水的方块：有 waterlogged 属性的写 true，没有的（海草）不写
  assert.equal(fullStateName(BlockType.seagrass), 'minecraft:seagrass')
  assert.equal(fullStateName(BlockType.tube_coral), 'minecraft:tube_coral[waterlogged=true]')
  // 不认识的属性、取值忽略
  assert.equal(withState(BlockType.stone, { axis: 'x' }), BlockType.stone)
})

test('同一个方块内部的状态顺序和原版状态 ID 一样（最后一个属性变得最快）', () => {
  const raw = DEFS as unknown as Record<string, { props: [string, string[]][] }>
  const b = BlockType.leaves
  const def = STATES.defs[b]
  assert.deepEqual(
    def.props.map(([k]) => k),
    raw['minecraft:oak_leaves'].props.map(([k]) => k)
  )
  // 原版 oak_leaves：252 = distance=1,persistent=true,waterlogged=true；253 = …waterlogged=false
  assert.equal(fullStateName(stateAt(STATES, b, 0)), 'minecraft:oak_leaves[distance=1,persistent=true,waterlogged=true]')
  assert.equal(fullStateName(stateAt(STATES, b, 1)), 'minecraft:oak_leaves[distance=1,persistent=true,waterlogged=false]')
})

test('按状态的表：多面方块贴着哪几面、横着的原木两头是年轮、雪地草方块、有浆果的洞穴藤蔓', () => {
  const lichen = stateOf(BlockType.glow_lichen, { down: true, east: true })
  assert.equal(FACE_MASK[lichen], (1 << 1) | (1 << 2)) // +x、-y
  const logX = stateOf(BlockType.log, { axis: 'x' })
  assert.equal(FACE_TEXTURES[logX * 6 + 0], TEXTURE_LAYER.log_top)
  assert.equal(FACE_TEXTURES[logX * 6 + 3], TEXTURE_LAYER.log)
  assert.equal(FACE_TEXTURES[stateOf(BlockType.grass, { snowy: true }) * 6 + 4], TEXTURE_LAYER.grass_snow_side)
  assert.equal(FACE_TEXTURES[stateOf(BlockType.cave_vines, { berries: true }) * 6], TEXTURE_LAYER.cave_vines_lit)
  assert.equal(NAME_BY_STATE[logX], 'minecraft:oak_log')
})

// ---------------------------------------------------------------- 和原版存档对照

const vanilla = vanillaPack()
test('和原版对照：各类方块的状态（含属性）逐格一致', { skip: vanilla ? false : '没有 datapacks/vanilla，跳过' }, () => {
  const fixture = JSON.parse(readFileSync(repoPath('tests/fixtures/states7.json'), 'utf8')) as Record<string, Record<string, Record<string, number[]>>>
  const wg = new Worldgen([vanilla!])
  wg.setSeed(42n)
  const dim = 'minecraft:overworld'
  const s = wg.getSettings(dim)
  const src = chunkSource(wg, dim, s)
  const cache = new Map<string, Uint16Array>()
  const settled = (cx: number, cz: number) => {
    const k = `${cx},${cz}`
    if (!cache.has(k)) {
      const nine: Uint16Array[] = []
      for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) nine.push(src.withDecorations(cx + dx, cz + dz).slice())
      settleLeaves(nine, s.height)
      cache.set(k, nine[4])
    }
    return cache.get(k)!
  }
  for (const [cat, chunks] of Object.entries(fixture))
    for (const [key, states] of Object.entries(chunks)) {
      const [cx, cz] = key.split(',').map(Number)
      const ours = settled(cx, cz)
      for (const [st, idx] of Object.entries(states))
        for (const i of idx) assert.equal(fullStateName(ours[i]), st, `${cat}：区块 ${key} 第 ${i} 格`)
    }
})
