/**
 * v10.1：合成（配方匹配、合成格子、剩余物）和工具（挖掘速度、对的工具才掉东西、耐久、match_tool）。
 */
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { test } from 'node:test'
import { BlockType, HARDNESS, NEEDS_TOOL, parseState } from '../src/terrain/blocks'
import { CraftingGrid } from '../src/items/crafting'
import { Inventory } from '../src/items/inventory'
import type { ItemStack } from '../src/items/items'
import { LootTables } from '../src/items/loot'
import { destroyProgress } from '../src/items/mining'
import { recipeBook } from '../src/items/recipes'
import { canBreakInCreative, damageTool, isCorrectTool, maxDamage, miningSpeed, TOOLS } from '../src/items/tools'
import { repoPath } from './loadDatapack'

const S = (n: string) => parseState(`minecraft:${n}`)!
const st = (n: string, count = 1): ItemStack => ({ item: `minecraft:${n}`, count })
/** 用字符串摆格子：'p' → 橡木木板……，'.' 空 */
function grid(width: number, layout: string, legend: Record<string, string>): CraftingGrid {
  const g = new CraftingGrid(width)
  ;[...layout.replace(/\s/g, '')].forEach((c, i) => (g.slots[i] = c === '.' ? null : st(legend[c], 1)))
  return g
}

test('配方表：964 个工作台配方（有序 655、无序 277、换色 32）', () => {
  const n = { shaped: 0, shapeless: 0, transmute: 0 }
  for (const r of recipeBook.recipes) n[r.type]++
  assert.deepEqual(n, { shaped: 655, shapeless: 277, transmute: 32 })
})

test('每个配方按它自己的摆法（每格放原料里的第一种物品）都能做出它的结果，没有被别的配方抢走', () => {
  const bad: string[] = []
  for (const r of recipeBook.recipes) {
    const g: (ItemStack | null)[] = new Array(9).fill(null)
    const first = (s: Set<string>) => ({ item: [...s][0], count: 1 })
    if (r.type === 'shaped') r.cells.forEach((c, i) => c && (g[Math.floor(i / r.w) * 3 + (i % r.w)] = first(c)))
    else if (r.type === 'shapeless') r.ingredients.forEach((c, i) => (g[i] = first(c)))
    else [g[0], g[1]] = [first(r.input), first(r.material)]
    const f = recipeBook.find(g, 3)
    if (f?.result.item !== r.result.item || f.result.count !== r.result.count) bad.push(r.id)
  }
  assert.deepEqual(bad, [])
})

test('无序配方：任意一种原木 → 4 个对应的木板；木板放在格子哪里都行', () => {
  const g = new CraftingGrid(2)
  g.slots[3] = st('oak_log')
  assert.deepEqual(g.result(), st('oak_planks', 4))
  g.slots[3] = null
  g.slots[0] = st('stripped_birch_wood')
  assert.deepEqual(g.result(), st('birch_planks', 4))
  g.slots[1] = st('dirt')
  assert.equal(g.result(), null)
})

test('有序配方：图案可以挪位置（2 个木板竖着 → 4 根木棍），木镐要 3×3，左右镜像也算（弓）', () => {
  const L = { p: 'oak_planks', b: 'birch_planks', s: 'stick', t: 'string' }
  assert.deepEqual(grid(2, 'p. p.', L).result(), st('stick', 4))
  assert.deepEqual(grid(2, '.b .p', L).result(), st('stick', 4)) // 不同的木板混着也行（#planks）
  assert.deepEqual(grid(3, '... .p. .p.', L).result(), st('stick', 4))
  assert.deepEqual(grid(2, 'pp ..', L).result(), st('oak_pressure_plate')) // 横着是压力板
  assert.deepEqual(grid(3, 'ppp .s. .s.', L).result(), st('wooden_pickaxe'))
  assert.deepEqual(grid(2, 'pp pp', L).result(), st('crafting_table'))
  // 弓的图案 " #X / # X / " #X"，镜像 "X# / X # / X# "
  assert.deepEqual(grid(3, '.st s.t .st', L).result(), st('bow'))
  assert.deepEqual(grid(3, 'ts. t.s ts.', L).result(), st('bow'))
  // 斧头：左右不对称，两种朝向都行
  assert.deepEqual(grid(3, 'pp. ps. .s.', L).result(), st('wooden_axe'))
  assert.deepEqual(grid(3, 'pp. sp. s..', L).result(), st('wooden_axe'))
  // 多一个东西就不行
  assert.equal(grid(3, 'ppp .s. .sp', L).result(), null)
})

test('换色配方：潜影盒 + 染料 → 染色的潜影盒；三样东西不行', () => {
  const g = new CraftingGrid(3)
  g.slots[4] = st('shulker_box')
  g.slots[0] = st('red_dye')
  assert.deepEqual(g.result(), st('red_shulker_box'))
  g.slots[8] = st('red_dye')
  assert.equal(g.result(), null)
})

test('合成格子：拿走结果，每格少一个；牛奶桶留下空桶；Shift 一直做到材料用完', () => {
  const inv = new Inventory()
  const g = new CraftingGrid(2)
  g.slots[0] = st('oak_log', 3)
  let [cursor] = g.clickResult(null, inv)
  assert.deepEqual(cursor, st('oak_planks', 4))
  assert.deepEqual(g.slots[0], st('oak_log', 2))
  ;[cursor] = g.clickResult(cursor, inv)
  assert.deepEqual(cursor, st('oak_planks', 8))
  // 手上拿着别的东西：点结果格没反应
  const [same] = g.clickResult(st('dirt'), inv)
  assert.deepEqual(same, st('dirt'))
  assert.deepEqual(g.slots[0], st('oak_log', 1))

  const cake = grid(3, 'mmm aea www', { m: 'milk_bucket', a: 'sugar', e: 'egg', w: 'wheat' })
  const [made] = cake.clickResult(null, inv)
  assert.deepEqual(made, st('cake'))
  assert.deepEqual(cake.slots.slice(0, 3), [st('bucket'), st('bucket'), st('bucket')])
  assert.ok(cake.slots.slice(3).every((s) => s === null))

  const g2 = new CraftingGrid(2)
  g2.slots[1] = st('oak_planks', 9)
  g2.slots[3] = st('oak_planks', 5)
  const [n] = g2.quickCraft(inv)
  assert.equal(n, 5)
  assert.deepEqual(inv.slots[0], st('stick', 20))
  assert.deepEqual(g2.slots[1], st('oak_planks', 4))
  // 关界面：格子里的东西回背包
  assert.deepEqual(g2.clear(inv), [])
  assert.deepEqual(inv.slots[1], st('oak_planks', 4))
})

test('工具的挖掘速度和对不对：木镐挖石头 1.15 秒、铁镐挖钻石矿能掉、木镐挖铁矿不掉；斧头砍木头、剑砍蜘蛛网', () => {
  const ticks = (tool: string | undefined, s: number) => {
    const t = tool && `minecraft:${tool}`
    return Math.ceil(1 / destroyProgress(HARDNESS[s], NEEDS_TOOL[s] === 1 && !isCorrectTool(t, s), true, false, miningSpeed(t, s)))
  }
  assert.equal(TOOLS.size, 33)
  assert.equal(ticks(undefined, BlockType.stone), 150)
  assert.equal(ticks('wooden_pickaxe', BlockType.stone), 23) // 2 / 1.5 / 30
  assert.equal(ticks('stone_pickaxe', BlockType.stone), 12)
  assert.equal(ticks('iron_pickaxe', BlockType.stone), 8)
  assert.equal(ticks('diamond_pickaxe', BlockType.stone), 6)
  assert.equal(ticks('netherite_pickaxe', BlockType.stone), 5)
  assert.equal(ticks('golden_pickaxe', BlockType.stone), 4)
  const iron = S('iron_ore')
  const diamond = S('diamond_ore')
  assert.equal(isCorrectTool('minecraft:wooden_pickaxe', iron), false)
  assert.equal(isCorrectTool('minecraft:stone_pickaxe', iron), true)
  assert.equal(isCorrectTool('minecraft:iron_pickaxe', diamond), true)
  assert.equal(isCorrectTool('minecraft:stone_pickaxe', diamond), false)
  assert.equal(isCorrectTool('minecraft:golden_pickaxe', iron), false) // 金镐快，但只算木头级别
  assert.equal(ticks('wooden_pickaxe', iron), 150) // 速度 2，但不算对的工具：2 / 3 / 100
  assert.equal(ticks('stone_pickaxe', iron), 23) // 4 / 3 / 30
  assert.equal(miningSpeed('minecraft:iron_axe', BlockType.log), 6)
  assert.equal(miningSpeed('minecraft:iron_axe', BlockType.stone), 1)
  assert.equal(miningSpeed('minecraft:iron_shovel', BlockType.dirt), 6)
  assert.equal(miningSpeed('minecraft:stick', BlockType.dirt), 1)
  assert.equal(miningSpeed('minecraft:wooden_sword', S('cobweb')), 15)
  assert.equal(isCorrectTool('minecraft:wooden_sword', S('cobweb')), true)
  assert.equal(miningSpeed('minecraft:shears', S('oak_leaves[distance=7,persistent=false,waterlogged=false]')), 15)
  assert.equal(ticks('shears', S('white_wool')), 5) // 羊毛硬度 0.8，剪刀 5 → 0.25 秒
})

test('耐久：木镐 59 次就坏；剑挖一块掉 2；硬度 0 的不掉耐久；创造模式拿剑挖不动', () => {
  assert.equal(maxDamage('minecraft:wooden_pickaxe'), 59)
  assert.equal(maxDamage('minecraft:diamond_pickaxe'), 1561)
  const pick = st('wooden_pickaxe')
  let n = 0
  while (damageTool(pick, 1.5)) n++
  assert.equal(n + 1, 59)
  const sword = st('iron_sword')
  damageTool(sword, 1.5)
  assert.equal(sword.damage, 2)
  damageTool(sword, 0)
  assert.equal(sword.damage, 2)
  assert.equal(canBreakInCreative('minecraft:iron_sword'), false)
  assert.equal(canBreakInCreative('minecraft:iron_pickaxe'), true)
  assert.equal(canBreakInCreative(undefined), true)
  // 用过的工具和新的不叠在一起
  const inv = new Inventory()
  inv.addStack({ item: 'minecraft:shears', count: 1, damage: 3 })
  inv.addStack(st('shears'))
  assert.deepEqual([inv.slots[0]?.damage, inv.slots[1]?.damage], [3, undefined])
})

test('背包 Shift + 点：物品栏 ↔ 背包', () => {
  const inv = new Inventory()
  inv.slots[0] = st('dirt', 10)
  inv.slots[12] = st('dirt', 60)
  inv.quickMove(0)
  assert.equal(inv.slots[0], null)
  assert.deepEqual(inv.slots[12], st('dirt', 64))
  assert.deepEqual(inv.slots[9], st('dirt', 6))
  inv.quickMove(9)
  assert.deepEqual(inv.slots[0], st('dirt', 6))
})

const LOOT = repoPath('datapacks/vanilla/loot_table/blocks')
const skip = existsSync(LOOT) ? false : '没有 datapacks/vanilla/loot_table/blocks，跳过'

test('战利品表的 match_tool：剪刀剪树叶掉树叶、剪草掉草；紫水晶簇用镐掉 4 个，空手掉 2 个', { skip }, () => {
  const m = new Map<string, Record<string, unknown>>()
  for (const n of ['oak_leaves', 'short_grass', 'amethyst_cluster'])
    m.set(`minecraft:blocks/${n}`, JSON.parse(readFileSync(`${LOOT}/${n}.json`, 'utf8')))
  const loot = new LootTables(m, () => 0.99)
  const leaves = S('oak_leaves[distance=7,persistent=false,waterlogged=false]')
  assert.deepEqual(loot.blockDrops(leaves, 'minecraft:shears'), [st('oak_leaves')])
  assert.deepEqual(loot.blockDrops(leaves), [])
  assert.deepEqual(loot.blockDrops(S('short_grass'), 'minecraft:shears'), [st('short_grass')])
  const cluster = S('amethyst_cluster[facing=up,waterlogged=false]')
  assert.deepEqual(loot.blockDrops(cluster, 'minecraft:iron_pickaxe'), [st('amethyst_shard', 4)])
  assert.deepEqual(loot.blockDrops(cluster), [st('amethyst_shard', 2)])
})
