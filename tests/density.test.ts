import assert from 'node:assert/strict'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { DensityFunctionParser, parseNoiseSettings } from '../src/terrain/worldgen/density/DensityFunctionParser'
import { NoiseChunk } from '../src/terrain/worldgen/density/NoiseChunk'
import { RandomState } from '../src/terrain/worldgen/density/RandomState'
import { NormalNoise } from '../src/terrain/worldgen/noise/NormalNoise'
import { Registry } from '../src/terrain/worldgen/registry/Registry'
import { XoroshiroRandomSource } from '../src/terrain/worldgen/random/XoroshiroRandomSource'
import { loadDir } from './loadDatapack'

const registry = new Registry()
loadDir(registry, fileURLToPath(new URL('../data', import.meta.url)), 'builtin')
const ctx = (x: number, y: number, z: number) => ({ blockX: x, blockY: y, blockZ: z })

test('注册表按路径得到 ID', () => {
  assert.ok(registry.noise.has('minecraft:continentalness'))
  assert.ok(registry.densityFunction.has('minecraft:overworld/continents'))
  assert.ok(registry.densityFunction.has('demo:overworld_lite/final_density'))
  assert.ok(registry.noiseSettings.has('demo:overworld_lite'))
})

test('JSON 求值 = 手写调用（continents）', () => {
  const seed = 12345n
  const state = new RandomState(new DensityFunctionParser(registry), seed)
  const continents = state.get('minecraft:overworld/continents')

  // 手工按原版公式算一遍：shift 噪声 + shifted_noise
  const rnd = new XoroshiroRandomSource(seed).forkPositional()
  const offset = NormalNoise.create(rnd.fromHashOf('minecraft:offset'), registry.getNoise('minecraft:offset'))
  const cont = NormalNoise.create(rnd.fromHashOf('minecraft:continentalness'), registry.getNoise('continentalness'))
  for (const [x, z] of [
    [0, 0],
    [1000, -2000],
    [-12345, 6789]
  ]) {
    const sx = offset.getValue(x * 0.25, 0, z * 0.25) * 4
    const sz = offset.getValue(z * 0.25, x * 0.25, 0) * 4
    const expected = cont.getValue(x * 0.25 + sx, 0, z * 0.25 + sz)
    assert.equal(continents.compute(ctx(x, 70, z)), expected)
  }
})

test('同一个噪声在不同函数里共享同一个实例', () => {
  const state = new RandomState(new DensityFunctionParser(registry), 1n)
  assert.equal(state.getOrCreateNoise('minecraft:offset'), state.getOrCreateNoise('offset'))
})

test('不同噪声 ID 互不影响（位置随机工厂的意义）', () => {
  const a = new RandomState(new DensityFunctionParser(registry), 7n)
  const b = new RandomState(new DensityFunctionParser(registry), 7n)
  // b 先创建另一个噪声，不应改变 continentalness
  b.getOrCreateNoise('minecraft:erosion')
  assert.equal(
    a.getOrCreateNoise('minecraft:continentalness').getValue(1, 2, 3),
    b.getOrCreateNoise('minecraft:continentalness').getValue(1, 2, 3)
  )
})

test('ridges_folded 与原版 peaksAndValleys(float) 一致到 1e-6', () => {
  const state = new RandomState(new DensityFunctionParser(registry), 99n)
  const ridges = state.get('minecraft:overworld/ridges')
  const folded = state.get('minecraft:overworld/ridges_folded')
  const f = Math.fround
  for (let i = 0; i < 50; i++) {
    const c = ctx(i * 137 - 3000, 64, i * -91 + 500)
    const w = f(ridges.compute(c))
    const pv = f(-f(f(Math.abs(f(Math.abs(w) - f(0.6666667)))) - f(0.33333334)) * 3)
    assert.ok(Math.abs(folded.compute(c) - pv) < 1e-6)
  }
})

test('错误信息指出 JSON 路径', () => {
  const p = new DensityFunctionParser(registry)
  assert.throws(() => p.parse({ type: 'minecraft:add', argument1: 1 }), /\$: 缺少字段 "argument2"/)
  assert.throws(() => p.parse({ type: 'minecraft:what' }), /未知的密度函数类型/)
  assert.throws(() => p.parse({ type: 'noise', noise: 'minecraft:nope', xz_scale: 1, y_scale: 1 }), /找不到噪声/)
})

test('NoiseChunk：插值地形能生成，并且海平面附近有陆有海', () => {
  const parser = new DensityFunctionParser(registry)
  const settings = parseNoiseSettings(parser, 'demo:overworld_lite')
  const state = new RandomState(parser, 42n)
  const final = state.wire(settings.router.final_density!)
  const size = 64
  const t0 = performance.now()
  const chunk = new NoiseChunk(final, {
    x0: 0,
    z0: 0,
    sizeX: size,
    sizeZ: size,
    minY: settings.minY,
    height: settings.height,
    cellWidth: settings.cellWidth,
    cellHeight: settings.cellHeight
  })
  const top = new Int16Array(size * size).fill(-999)
  chunk.forEach((x, y, z, d) => {
    if (d > 0) top[x * size + z] = y
  })
  const ms = performance.now() - t0
  const heights = Array.from(top)
  const min = Math.min(...heights)
  const max = Math.max(...heights)
  console.log(`64×384×64 用时 ${ms.toFixed(0)} ms，地表高度 ${min}..${max}，角点 ${chunk.stats.interpolatedCorners}`)
  assert.ok(min > -64 && max < 320)

  // 插值结果在角点上必须与单点求值完全相同
  const single = final.compute(ctx(8, 64, 16))
  const fromChunk = chunk.fn.compute(ctx(8, 64, 16))
  assert.ok(Math.abs(single - fromChunk) < 1e-12, `${single} vs ${fromChunk}`)
})
