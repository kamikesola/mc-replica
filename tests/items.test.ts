/**
 * v10：物品、背包、战利品表、地上的物品、挖掘进度。
 * 战利品表要 datapacks/vanilla/loot_table/blocks（从你自己的 jar 里拷，见 datapacks/README.md），没有就跳过那几个。
 */
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { test } from 'node:test'
import { BlockType, HARDNESS, NEEDS_TOOL, parseState } from '../src/terrain/blocks'
import { EMPTY, FULL_CUBE } from '../src/control/physics'
import { ItemEntity, popResource } from '../src/items/entities'
import { Inventory } from '../src/items/inventory'
import { blockOfItem, itemOfBlock, maxStack } from '../src/items/items'
import { LootTables } from '../src/items/loot'
import { destroyProgress } from '../src/items/mining'
import { repoPath } from './loadDatapack'

const S = (n: string) => parseState(`minecraft:${n}`)!

test('物品 ↔ 方块：大部分同名；红石粉 → 红石线、小麦种子 → 小麦；贴墙的火把选出来是火把', () => {
  assert.equal(blockOfItem('minecraft:stone'), BlockType.stone)
  assert.equal(blockOfItem('minecraft:redstone'), S('redstone_wire[east=none,north=none,power=0,south=none,west=none]'))
  assert.equal(blockOfItem('minecraft:wheat_seeds'), S('wheat[age=0]'))
  assert.equal(blockOfItem('minecraft:stick'), undefined)
  assert.equal(itemOfBlock(S('wall_torch[facing=north]')), 'minecraft:torch')
  assert.equal(itemOfBlock(S('oak_wall_sign[facing=north,waterlogged=false]')), 'minecraft:oak_sign')
  assert.equal(itemOfBlock(S('redstone_wire[east=none,north=none,power=3,south=none,west=none]')), 'minecraft:redstone')
  assert.equal(itemOfBlock(S('tube_coral_wall_fan[facing=north,waterlogged=true]')), 'minecraft:tube_coral_fan')
  assert.equal(maxStack('minecraft:oak_sign'), 16)
  assert.equal(maxStack('minecraft:diamond_sword'), 1)
})

test('背包：先叠到已有的同种物品上（从物品栏开始），再放空格；满了剩下的返回', () => {
  const inv = new Inventory()
  inv.slots[3] = { item: 'minecraft:dirt', count: 60 }
  assert.equal(inv.add('minecraft:dirt', 10), 0)
  assert.deepEqual(inv.slots[3], { item: 'minecraft:dirt', count: 64 })
  assert.deepEqual(inv.slots[0], { item: 'minecraft:dirt', count: 6 })
  assert.equal(inv.add('minecraft:oak_sign', 20), 0)
  assert.deepEqual([inv.slots[1]?.count, inv.slots[2]?.count], [16, 4])
  for (let i = 0; i < 36; i++) inv.slots[i] = { item: 'minecraft:stone', count: 64 }
  assert.equal(inv.add('minecraft:dirt', 5), 5)
})

test('背包界面的点击：拿起整组 / 一半，放下全部 / 一个，不同种交换', () => {
  const inv = new Inventory()
  inv.slots[0] = { item: 'minecraft:dirt', count: 9 }
  let cur = inv.click(0, null, true) // 右键拿一半（向上取整）
  assert.deepEqual(cur, { item: 'minecraft:dirt', count: 5 })
  assert.equal(inv.slots[0]!.count, 4)
  cur = inv.click(5, cur, true) // 右键放一个
  assert.deepEqual([inv.slots[5], cur], [{ item: 'minecraft:dirt', count: 1 }, { item: 'minecraft:dirt', count: 4 }])
  cur = inv.click(0, cur) // 左键放下全部
  assert.equal(cur, null)
  assert.equal(inv.slots[0]!.count, 8)
  inv.slots[1] = { item: 'minecraft:stone', count: 2 }
  cur = inv.click(0, null)
  cur = inv.click(1, cur) // 不同种：交换
  assert.deepEqual([inv.slots[1], cur], [{ item: 'minecraft:dirt', count: 8 }, { item: 'minecraft:stone', count: 2 }])
})

test('挖掘进度：泥土 15 tick；石头空手 150 tick（而且不掉东西）；在空中慢 5 倍；花一下就掉；基岩挖不动', () => {
  const ticks = (s: number, onGround = true) => Math.ceil(1 / destroyProgress(HARDNESS[s], NEEDS_TOOL[s] === 1, onGround, false))
  assert.equal(ticks(BlockType.dirt), 15)
  assert.equal(NEEDS_TOOL[BlockType.stone], 1)
  assert.equal(ticks(BlockType.stone), 150)
  assert.equal(ticks(BlockType.dirt, false), 75)
  assert.equal(ticks(BlockType.poppy), 1)
  assert.equal(destroyProgress(HARDNESS[BlockType.bedrock], false, true, false), 0)
  assert.equal(ticks(BlockType.log), 60) // 原木硬度 2
})

test('地上的物品：掉下来停在地面上，落地后滑一段停住；方块掉的东西从方块中心附近出来', () => {
  const ground = (_x: number, y: number) => (y < 64 ? FULL_CUBE : EMPTY)
  const e = popResource(0, 70, 0, { item: 'minecraft:dirt', count: 1 }, () => 0.5)
  assert.equal(e.pos.y, 70.5 - 0.125)
  for (let i = 0; i < 100; i++) e.tick(ground, () => false)
  assert.ok(Math.abs(e.pos.y - 64) < 1e-6, `y = ${e.pos.y}`)
  assert.ok(e.onGround)
  const x = e.pos.x
  e.tick(ground, () => false)
  assert.ok(Math.abs(e.pos.x - x) < 1e-3)
  // 6000 tick 后消失
  const f = new ItemEntity({ item: 'minecraft:dirt', count: 1 }, { x: 0, y: 64, z: 0 }, { x: 0, y: 0, z: 0 })
  for (let i = 0; i < 6000; i++) f.tick(ground, () => false)
  assert.ok(f.removed)
})

const LOOT = repoPath('datapacks/vanilla/loot_table/blocks')
const skip = existsSync(LOOT) ? false : '没有 datapacks/vanilla/loot_table/blocks，跳过'
function tables(random: () => number) {
  const m = new Map<string, Record<string, unknown>>()
  if (existsSync(LOOT)) for (const f of readdirSync(LOOT)) m.set(`minecraft:blocks/${f.replace('.json', '')}`, JSON.parse(readFileSync(`${LOOT}/${f}`, 'utf8')))
  return new LootTables(m, random)
}
/** 可重复的随机数 */
function rng(seed: number) {
  return () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x80000000)
}

test('战利品表：石头掉圆石、草方块掉泥土、门只有下半掉、雪层按层数掉雪球', { skip }, () => {
  const t = tables(rng(1))
  assert.deepEqual(t.blockDrops(BlockType.stone), [{ item: 'minecraft:cobblestone', count: 1 }])
  assert.deepEqual(t.blockDrops(BlockType.grass), [{ item: 'minecraft:dirt', count: 1 }])
  assert.deepEqual(t.blockDrops(S('oak_door[facing=north,half=upper,hinge=left,open=false,powered=false]')), [])
  assert.deepEqual(t.blockDrops(S('oak_door[facing=north,half=lower,hinge=left,open=false,powered=false]')), [{ item: 'minecraft:oak_door', count: 1 }])
  assert.deepEqual(t.blockDrops(S('snow[layers=3]')), [{ item: 'minecraft:snowball', count: 3 }])
  assert.deepEqual(t.blockDrops(S('oak_slab[type=double,waterlogged=false]')), [{ item: 'minecraft:oak_slab', count: 2 }])
})

test('战利品表的概率：矮草 1/8 掉种子；橡树树叶 5% 树苗、2% 木棍（1~2 根）、0.5% 苹果；成熟的小麦掉小麦和 1~4 颗种子', { skip }, () => {
  const t = tables(rng(42))
  const N = 40000
  const count = (s: number) => {
    const c = new Map<string, number>()
    for (let i = 0; i < N; i++) for (const st of t.blockDrops(s)!) c.set(st.item, (c.get(st.item) ?? 0) + st.count)
    return c
  }
  const near = (got: number, want: number, tol: number) => assert.ok(Math.abs(got - want) < tol, `${got} ≈ ${want}`)
  near(count(BlockType.short_grass).get('minecraft:wheat_seeds')! / N, 1 / 8, 0.01)
  const leaves = count(S('oak_leaves[distance=7,persistent=false,waterlogged=false]'))
  near(leaves.get('minecraft:oak_sapling')! / N, 0.05, 0.005)
  near(leaves.get('minecraft:stick')! / N, 0.02 * 1.5, 0.006)
  near(leaves.get('minecraft:apple')! / N, 0.005, 0.0015)
  const wheat = count(S('wheat[age=7]'))
  assert.equal(wheat.get('minecraft:wheat'), N)
  // 种子：1 颗 + 二项分布(3, 0.5714)，平均 1 + 1.714
  near(wheat.get('minecraft:wheat_seeds')! / N, 1 + 3 * 0.5714, 0.05)
})
