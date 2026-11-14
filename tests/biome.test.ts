/**
 * v4：生物群系与地表规则。
 */
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { test } from 'node:test'
import { BlockType, NAME_BY_BLOCK } from '../src/terrain/blocks'
import Section from '../src/terrain/chunk/Section'
import { generateChunk } from '../src/terrain/worker/surface'
import { Parameter, ParameterList, parameters, quantize, type TargetPoint } from '../src/terrain/worldgen/biome/Climate'
import { netherBiomeParameters, overworldBiomeParameters } from '../src/terrain/worldgen/biome/OverworldBiomeBuilder'
import { coldEnoughToSnow, foliageColor, grassColor, parseBiome, temperatureAt } from '../src/terrain/worldgen/biome/Biome'
import { NO_WATER, parseCondition, parseRule, type SurfaceContext, type SurfaceDeps } from '../src/terrain/worldgen/surface/SurfaceRules'
import { Worldgen } from '../src/terrain/worldgen/Worldgen'
import { repoPath, vanillaPack } from './loadDatapack'

const vanilla = vanillaPack()
const skip = vanilla ? false : '没有 datapacks/vanilla，跳过'

// ---------------------------------------------------------------- 气候参数表

test('参数表：主世界 7593 项、下界 5 项，区间都已量化', () => {
  const ow = overworldBiomeParameters()
  assert.equal(ow.length, 7593)
  assert.equal(netherBiomeParameters().length, 5)
  for (const [p] of ow) {
    for (const k of ['temperature', 'humidity', 'continentalness', 'erosion', 'depth', 'weirdness'] as const) {
      assert.ok(Number.isInteger(p[k].min) && Number.isInteger(p[k].max) && p[k].min <= p[k].max)
    }
  }
  // 抽查几种：地表、洞穴、1.20 以后新加的都在
  const names = new Set(ow.map(([, b]) => b))
  for (const b of ['plains', 'dark_forest', 'badlands', 'mushroom_fields', 'deep_dark', 'lush_caves', 'dripstone_caves', 'cherry_grove', 'mangrove_swamp', 'stony_shore'])
    assert.ok(names.has('minecraft:' + b), b)
})

/** 原版服务端 --reports 导出的 biome_parameters（放进 datapacks/reports，见 datapacks/README.md）；没有就跳过 */
const reportFile = (name: string) =>
  [`datapacks/reports/biome_parameters/minecraft/${name}.json`, `datapacks/reports/biome_parameters/${name}.json`].map(repoPath).find((p) => existsSync(p))

for (const [name, build] of [
  ['overworld', overworldBiomeParameters],
  ['nether', netherBiomeParameters]
] as const) {
  const file = reportFile(name)
  test(`参数表与原版报告逐项一致（${name}）`, { skip: file ? false : '没有 datapacks/reports/biome_parameters，跳过' }, () => {
    const report = JSON.parse(readFileSync(file!, 'utf8')) as { biomes: { biome: string; parameters: Record<string, number | number[]> }[] }
    // 1.21.4 以后的报告里有苍白之园
    const mine = build({ paleGarden: report.biomes.some((r) => r.biome === 'minecraft:pale_garden') })
    assert.equal(mine.length, report.biomes.length)
    // 报告里写的是 unquantizeCoord(l) = l / 10000F，所以把自己的量化值也换回 float 再比
    const f = Math.fround
    const u = (l: number) => f(l / 10000)
    const q = (v: number | number[]) => (Array.isArray(v) ? [f(v[0]), f(v[1])] : [f(v), f(v)])
    report.biomes.forEach((r, i) => {
      const [p, b] = mine[i]
      assert.equal(b, r.biome, `#${i}`)
      for (const k of ['temperature', 'humidity', 'continentalness', 'erosion', 'depth', 'weirdness'] as const)
        assert.deepEqual([u(p[k].min), u(p[k].max)], q(r.parameters[k]), `#${i} ${k}`)
      assert.equal(u(p.offset), f(r.parameters.offset as number), `#${i} offset`)
    })
  })
}

test('ParameterList：找最近的一项，平局取表里靠前的', () => {
  const pt = (t: number, h: number, off = 0) => parameters(Parameter.point(t), Parameter.point(h), Parameter.point(0), Parameter.point(0), Parameter.point(0), Parameter.point(0), off)
  const list = new ParameterList([
    [pt(-0.5, 0), 'a'],
    [pt(0.5, 0), 'b'],
    [pt(0.5, 0), 'c'], // 和 b 完全一样：永远选不到
    [pt(0, 0, 0.2), 'd'] // 中间那一点，但有偏移
  ])
  const at = (t: number): TargetPoint => [quantize(t), 0, 0, 0, 0, 0]
  assert.equal(list.find(at(-0.6)), 'a')
  assert.equal(list.find(at(0.4)), 'b')
  assert.equal(list.find(at(0)), 'd') // a/b 的距离² 是 0.5² = 0.25，d 只有偏移 0.2² = 0.04
  assert.equal(list.find(at(0.3)), 'b') // b: 0.04；d: 0.09 + 0.04
})

// ---------------------------------------------------------------- 温度与颜色

test('温度：高处变冷（y > 80 每 40 格 −0.05），冰冻修饰器', () => {
  const plains = parseBiome('minecraft:plains', { temperature: 0.8, downfall: 0.4, has_precipitation: true, effects: {} })
  assert.equal(temperatureAt(plains, 0, 64, 0), Math.fround(0.8))
  const high = temperatureAt(plains, 0, 200, 0)
  assert.ok(high < 0.8 - 0.1 && high > 0.8 - 0.25, String(high))
  assert.equal(coldEnoughToSnow(plains, 0, 64, 0), false)
  // 平原要很高才会下雪：0.8 − (y − 80)·0.05/40 < 0.15 → y ≳ 600，世界里不会
  assert.equal(coldEnoughToSnow(plains, 0, 319, 0), false)
  const peaks = parseBiome('minecraft:jagged_peaks', { temperature: -0.7, downfall: 0.9, has_precipitation: true, effects: {} })
  assert.equal(coldEnoughToSnow(peaks, 0, 100, 0), true)
})

test('草的颜色：随温度湿度变化，沼泽 / 黑森林修饰器', () => {
  const b = (t: number, d: number, extra = {}) => parseBiome('x:y', { temperature: t, downfall: d, has_precipitation: true, effects: { ...extra } })
  const hot = grassColor(b(2, 0), 0, 0)
  const wet = grassColor(b(0.95, 0.8), 0, 0)
  assert.notEqual(hot, wet)
  const dark = grassColor(b(0.7, 0.8, { grass_color_modifier: 'dark_forest' }), 0, 0)
  const plain = grassColor(b(0.7, 0.8), 0, 0)
  assert.equal(dark, (((plain & 0xfefefe) + 0x28340a) >> 1) & 0xffffff)
  // 几个原版群系的已知颜色（颜色图是近似的，允许 2 个色阶的误差）
  const near = (a: number, b: number) => [16, 8, 0].every((sh) => Math.abs(((a >> sh) & 255) - ((b >> sh) & 255)) <= 2)
  for (const [t, d, g, f] of [
    [0.8, 0.4, 0x91bd59, 0x77ab2f], // 平原
    [0.7, 0.8, 0x79c05a, 0x59ae30], // 森林
    [0.95, 0.9, 0x59c93c, 0x30bb0b], // 丛林
    [0.25, 0.8, 0x86b783, 0x68a464], // 针叶林
    [2.0, 0.0, 0xbfb755, 0xaea42a] // 沙漠
  ]) {
    assert.ok(near(grassColor(b(t, d), 0, 0), g), `草 ${t}/${d}`)
    assert.ok(near(foliageColor(b(t, d)), f), `树叶 ${t}/${d}`)
  }
  // 定义了 grass_color 的直接用它
  assert.equal(grassColor(b(0.5, 0.5, { grass_color: 0x123456 }), 0, 0), 0x123456)
})

// ---------------------------------------------------------------- 地表规则

const deps: SurfaceDeps = {
  noise: () => ({ getValue: () => 0 }) as never,
  random: () => ({ at: () => ({ nextFloat: () => 0.5 }) }) as never,
  band: (_x, y) => (y % 2 ? 'minecraft:red_terracotta' : 'minecraft:terracotta')
}
const ctx = (o: Partial<SurfaceContext>): SurfaceContext => ({
  blockX: 0,
  blockY: 64,
  blockZ: 0,
  surfaceDepth: 3,
  stoneDepthAbove: 1,
  stoneDepthBelow: 10,
  waterHeight: NO_WATER,
  biome: () => 'minecraft:plains',
  surfaceSecondary: () => 0,
  minSurfaceLevel: () => 60,
  steep: () => false,
  coldEnoughToSnow: () => false,
  minY: -64,
  maxY: 320,
  ...o
})

test('地表条件：stone_depth / water / y_above / vertical_gradient', () => {
  const floor = parseCondition({ type: 'minecraft:stone_depth', offset: 0, add_surface_depth: false, secondary_depth_range: 0, surface_type: 'floor' }, deps)
  assert.equal(floor(ctx({ stoneDepthAbove: 1 })), true)
  assert.equal(floor(ctx({ stoneDepthAbove: 2 })), false)
  const under = parseCondition({ type: 'minecraft:stone_depth', offset: 0, add_surface_depth: true, secondary_depth_range: 0, surface_type: 'floor' }, deps)
  assert.equal(under(ctx({ stoneDepthAbove: 4 })), true) // 1 + 3
  assert.equal(under(ctx({ stoneDepthAbove: 5 })), false)
  const ceiling = parseCondition({ type: 'stone_depth', offset: 0, add_surface_depth: false, secondary_depth_range: 0, surface_type: 'ceiling' }, deps)
  assert.equal(ceiling(ctx({ stoneDepthBelow: 1 })), true)

  const water = parseCondition({ type: 'minecraft:water', offset: -1, surface_depth_multiplier: 0, add_stone_depth: false }, deps)
  assert.equal(water(ctx({})), true) // 没有水
  assert.equal(water(ctx({ waterHeight: 64, blockY: 63 })), true) // 63 >= 64 − 1
  assert.equal(water(ctx({ waterHeight: 64, blockY: 62 })), false)

  const above = parseCondition({ type: 'minecraft:y_above', anchor: { absolute: 62 }, surface_depth_multiplier: 1, add_stone_depth: false }, deps)
  assert.equal(above(ctx({ blockY: 65 })), true) // 65 >= 62 + 3
  assert.equal(above(ctx({ blockY: 64 })), false)

  const bedrock = parseCondition({ type: 'minecraft:vertical_gradient', random_name: 'minecraft:bedrock_floor', true_at_and_below: { above_bottom: 0 }, false_at_and_above: { above_bottom: 5 } }, deps)
  assert.equal(bedrock(ctx({ blockY: -64 })), true)
  assert.equal(bedrock(ctx({ blockY: -59 })), false)
  assert.equal(bedrock(ctx({ blockY: -62 })), true) // map(-62, -64, -59, 1, 0) = 0.6 > 0.5
  assert.equal(bedrock(ctx({ blockY: -61 })), false) // 0.4
})

test('地表规则：sequence 取第一个非空，condition 不满足时继续往下', () => {
  const rule = parseRule(
    {
      type: 'minecraft:sequence',
      sequence: [
        { type: 'minecraft:condition', if_true: { type: 'minecraft:biome', biome_is: ['minecraft:desert'] }, then_run: { type: 'minecraft:block', result_state: { Name: 'minecraft:sand' } } },
        { type: 'minecraft:condition', if_true: { type: 'minecraft:not', invert: { type: 'minecraft:steep' } }, then_run: { type: 'minecraft:block', result_state: { Name: 'grass_block' } } },
        { type: 'minecraft:condition', if_true: { type: 'minecraft:biome', biome_is: ['minecraft:badlands'] }, then_run: { type: 'minecraft:bandlands' } }
      ]
    },
    deps
  )
  assert.equal(rule(ctx({ biome: () => 'minecraft:desert' })), 'minecraft:sand')
  assert.equal(rule(ctx({})), 'minecraft:grass_block')
  assert.equal(rule(ctx({ steep: () => true })), null)
  assert.equal(rule(ctx({ steep: () => true, biome: () => 'minecraft:badlands', blockY: 65 })), 'minecraft:red_terracotta')
})

// ---------------------------------------------------------------- 原版数据

test('原版数据：生物群系查找给出主世界参数表里的群系，地下有洞穴群系', { skip }, () => {
  const wg = new Worldgen([vanilla!])
  wg.setSeed(42n)
  const src = wg.biomes('minecraft:overworld')
  const known = new Set(overworldBiomeParameters().map(([, b]) => b))
  const surface = new Set<string>()
  const deep = new Set<string>()
  for (let x = -2048; x <= 2048; x += 256)
    for (let z = -2048; z <= 2048; z += 256) {
      surface.add(src.getBiome(x, 90, z))
      deep.add(src.getBiome(x, -40, z))
    }
  for (const b of [...surface, ...deep]) assert.ok(known.has(b), b)
  assert.ok(surface.size >= 8, [...surface].join())
  assert.ok([...deep].some((b) => /caves|deep_dark/.test(b)), [...deep].join())
})

test('原版数据：用 surface_rule 生成的区块有草、土、沙、深板岩、基岩', { skip }, () => {
  const wg = new Worldgen([vanilla!])
  wg.setSeed(42n)
  const s = wg.getSettings('minecraft:overworld')
  assert.ok(wg.surfaceSystem('minecraft:overworld'), '原版 overworld 应该有 surface_rule')
  const count = new Map<string, number>()
  for (const [cx, cz] of [
    [0, 0],
    [-30, 12],
    [40, -42],
    [7, 60]
  ]) {
    const c = generateChunk(wg, 'minecraft:overworld', s, cx, cz)
    assert.equal(c.tints.length, 16 * 16 * 3 * 3) // 每列 草 / 树叶 / 水 × RGB
    c.sections.forEach((d) => {
      const sec = Section.fromData(d)
      for (let i = 0; i < 4096; i++) {
        const n = NAME_BY_BLOCK[sec.blocks.get(i) as BlockType]
        count.set(n, (count.get(n) ?? 0) + 1)
      }
    })
  }
  for (const b of ['grass_block', 'dirt', 'stone', 'deepslate', 'bedrock']) assert.ok((count.get('minecraft:' + b) ?? 0) > 0, b + ' ' + JSON.stringify([...count]))
})

test('苍白之园（1.21.4+）：只替换高地变种里原来退回黑森林的格子', () => {
  const a = overworldBiomeParameters()
  const b = overworldBiomeParameters({ paleGarden: true })
  assert.equal(a.length, b.length)
  let changed = 0
  a.forEach(([, x], i) => {
    if (x !== b[i][1]) {
      assert.equal(x, 'minecraft:dark_forest')
      assert.equal(b[i][1], 'minecraft:pale_garden')
      assert.ok(b[i][0].weirdness.max >= 0)
      changed++
    }
  })
  assert.ok(changed > 0)
})
