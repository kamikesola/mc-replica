/**
 * v3：含水层和流体。
 *   - 流体：在一个假世界里跑计划刻，检查原版的规则（流 7 格、往坑流、无限水、岩浆遇水……）
 *   - 网格：流体表面的角高度
 *   - 含水层：有原版数据时，生成几个区块检查洞穴里有水、有岩浆、深层有岩浆湖
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { BlockType, FLUIDS, FluidKind, fluidBlock } from '../src/terrain/blocks'
import Section from '../src/terrain/chunk/Section'
import { FluidTicker } from '../src/terrain/fluid/FluidTicker'
import { fluidHeights, N, nIndex } from '../src/terrain/mesh/mesher'
import { generateChunk } from '../src/terrain/worker/surface'
import { Worldgen } from '../src/terrain/worldgen/Worldgen'
import { builtinPack, vanillaPack } from './loadDatapack'

/** 一个用 Map 存方块的小世界：y < 0 是石头，其他默认空气 */
function makeWorld(extra: (x: number, y: number, z: number) => BlockType | undefined = () => undefined) {
  const blocks = new Map<string, BlockType>()
  const world = {
    get: (x: number, y: number, z: number) => blocks.get(`${x},${y},${z}`) ?? extra(x, y, z) ?? (y < 0 ? BlockType.stone : BlockType.air),
    set: (x: number, y: number, z: number, b: BlockType) => void blocks.set(`${x},${y},${z}`, b)
  }
  const fluids = new FluidTicker(world)
  const place = (x: number, y: number, z: number, b: BlockType) => {
    world.set(x, y, z, b)
    fluids.blockChanged(x, y, z)
  }
  const run = (ticks: number) => {
    for (let i = 0; i < ticks; i++) fluids.tick()
  }
  return { world, fluids, place, run }
}

test('水源在平地上流 7 格，量依次减 1', () => {
  const { world, place, run } = makeWorld()
  place(0, 0, 0, BlockType.water)
  run(200)
  for (let d = 1; d <= 7; d++) {
    const f = FLUIDS[world.get(d, 0, 0)]
    assert.equal(f.kind, FluidKind.water, `x = ${d}`)
    assert.equal(f.amount, 8 - d)
  }
  assert.equal(world.get(8, 0, 0), BlockType.air)
  assert.equal(FLUIDS[world.get(3, 0, 4)].amount, 1) // 曼哈顿距离 7
})

test('拿走水源后，流动的水会消失', () => {
  const { world, place, run } = makeWorld()
  place(0, 0, 0, BlockType.water)
  run(200)
  place(0, 0, 0, BlockType.air)
  run(400)
  for (let d = 0; d <= 8; d++) assert.equal(world.get(d, 0, 0), BlockType.air)
})

test('水往下流成一柱“下落的水”，落地后再散开', () => {
  // 一个 5 格高的石柱，水源放在柱顶
  const { world, place, run } = makeWorld((x, y, z) => (x === 0 && z === 0 && y < 5 ? BlockType.stone : undefined))
  place(0, 5, 0, BlockType.water)
  run(300)
  for (let y = 0; y <= 4; y++) assert.equal(world.get(1, y, 0), fluidBlock(FluidKind.water, 8, true), `y = ${y}`) // 柱子旁边是下落的水
  assert.equal(FLUIDS[world.get(4, 0, 0)].amount, 5) // 落地后重新从 7 开始往外减
})

test('只往最近的坑流（原版 getSlopeDistance）', () => {
  // x = 3 处有一个坑：水应该只往 +x 流，不往 -x、±z 流
  const { world, place, run } = makeWorld((x, y, z) => (x === 3 && z === 0 && y === -1 ? BlockType.air : undefined))
  place(0, 0, 0, BlockType.water)
  run(10) // 只跑一轮：第一次往外流的时候
  assert.equal(FLUIDS[world.get(1, 0, 0)].kind, FluidKind.water)
  assert.equal(world.get(-1, 0, 0), BlockType.air)
  assert.equal(world.get(0, 0, 1), BlockType.air)
})

test('无限水：两个水源中间的空格变成水源', () => {
  const { world, place, run } = makeWorld()
  place(0, 0, 0, BlockType.water)
  place(2, 0, 0, BlockType.water)
  run(100)
  assert.equal(world.get(1, 0, 0), BlockType.water)
})

test('岩浆在主世界只流 3 格（每格减 2），而且不会形成无限岩浆', () => {
  const { world, place, run } = makeWorld()
  place(0, 0, 0, BlockType.lava)
  run(2000)
  assert.deepEqual([1, 2, 3].map((d) => FLUIDS[world.get(d, 0, 0)].amount), [6, 4, 2])
  assert.equal(world.get(4, 0, 0), BlockType.air)
  const two = makeWorld()
  two.place(0, 0, 0, BlockType.lava)
  two.place(2, 0, 0, BlockType.lava)
  two.run(2000)
  assert.notEqual(two.world.get(1, 0, 0), BlockType.lava)
})

test('岩浆遇水：岩浆源变黑曜石，流动的岩浆变圆石', () => {
  const a = makeWorld()
  a.place(0, 0, 0, BlockType.lava)
  a.place(1, 0, 0, BlockType.water)
  assert.equal(a.world.get(0, 0, 0), BlockType.obsidian)
  const b = makeWorld()
  b.place(0, 0, 0, BlockType.lava)
  b.run(2000)
  b.place(2, 1, 0, BlockType.water) // 在流动的岩浆（x=2，量 4）上面放水
  assert.equal(b.world.get(2, 0, 0), BlockType.cobblestone)
})

test('流体表面的角高度：水源 8/9，旁边的流动水往外越来越低', () => {
  const hood = new Uint8Array(N * N * N)
  for (let z = -1; z <= 16; z++) for (let x = -1; x <= 16; x++) hood[nIndex(x, 0, z)] = BlockType.stone
  hood[nIndex(5, 1, 5)] = BlockType.water
  hood[nIndex(6, 1, 5)] = fluidBlock(FluidKind.water, 7)
  hood[nIndex(7, 1, 5)] = fluidBlock(FluidKind.water, 6)
  const src = fluidHeights(hood, 5, 1, 5, FluidKind.water)
  const flow = fluidHeights(hood, 6, 1, 5, FluidKind.water)
  // 源四周大多是空气，角往下塌；靠流动水那一侧（东边的两个角）比靠空气那一侧高
  assert.ok(src[1] > src[0] && src[0] < 8 / 9, `${src}`)
  // 流动的水：靠源的西边两个角高，往东越来越低
  assert.ok(flow[1] < flow[0], `往 +x 方向变低：${flow}`)
  // 上面有水：4 个角都是 1
  hood[nIndex(5, 2, 5)] = BlockType.water
  assert.deepEqual(fluidHeights(hood, 5, 1, 5, FluidKind.water), [1, 1, 1, 1])
})

const vanilla = vanillaPack()
test('含水层（原版数据）：洞穴里有水也有空气；y < -54 的空处是岩浆', { skip: !vanilla && '没有原版数据' }, () => {
  const wg = new Worldgen([builtinPack(), vanilla!])
  wg.setSeed(42n)
  const s = wg.getSettings('minecraft:overworld')
  const count = { caveAir: 0, caveWater: 0, deepLava: 0, deepAir: 0 }
  let updates = 0
  for (const [cx, cz] of [
    [0, 0],
    [3, -2],
    [-5, 4],
    [8, 8]
  ]) {
    const c = generateChunk(wg, 'minecraft:overworld', s, cx, cz)
    updates += c.fluidUpdates.length
    c.sections.forEach((d, sy) => {
      const sec = Section.fromData(d)
      for (let i = 0; i < 4096; i++) {
        const y = s.minY + sy * 16 + (i >> 8)
        const b = sec.blocks.get(i)
        if (y >= -50 && y < 30) {
          if (b === BlockType.air) count.caveAir++
          if (b === BlockType.water) count.caveWater++
        }
        if (y < -54 && y > -60) {
          if (b === BlockType.lava) count.deepLava++
          if (b === BlockType.air) count.deepAir++
        }
      }
    })
  }
  // 有了含水层，洞穴里有水（地下湖），但大部分仍是空气
  assert.ok(count.caveAir > count.caveWater && count.caveWater > 0, JSON.stringify(count))
  assert.equal(count.deepAir, 0) // y < -54 的空处一定是岩浆（全局流体）
  assert.ok(updates > 0)
})
