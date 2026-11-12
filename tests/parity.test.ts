/**
 * 与 Java 参照实现逐位对拍（数据由 tools/parity/Parity.java 生成）。
 * double 一律比较 IEEE754 原始位，不允许任何误差。
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { getSeed, javaStringHashCode } from '../src/terrain/worldgen/math/Mth'
import { LegacyRandomSource } from '../src/terrain/worldgen/random/LegacyRandomSource'
import type { RandomSource } from '../src/terrain/worldgen/random/RandomSource'
import { seedFromHashOf, upgradeSeedTo128bit } from '../src/terrain/worldgen/random/RandomSupport'
import { XoroshiroRandomSource } from '../src/terrain/worldgen/random/XoroshiroRandomSource'
import { ImprovedNoise } from '../src/terrain/worldgen/noise/ImprovedNoise'
import { NormalNoise } from '../src/terrain/worldgen/noise/NormalNoise'
import { BlendedNoise } from '../src/terrain/worldgen/noise/BlendedNoise'
import { CubicSpline } from '../src/terrain/worldgen/density/CubicSpline'
import { EndIslands } from '../src/terrain/worldgen/density/DensityFunction'
import { SimplexNoise } from '../src/terrain/worldgen/noise/SimplexNoise'

const fx = JSON.parse(readFileSync(new URL('./fixtures/parity.json', import.meta.url), 'utf8'))
const seeds: bigint[] = fx.seeds.map(BigInt)

const buf = new DataView(new ArrayBuffer(8))
const bits = (v: number): string => {
  buf.setFloat64(0, v)
  return buf.getBigInt64(0).toString()
}
const num = (b: string): number => {
  buf.setBigInt64(0, BigInt(b))
  return buf.getFloat64(0)
}

function seq(r: RandomSource): (number | string)[] {
  const xs: (number | string)[] = []
  for (let i = 0; i < 4; i++) xs.push(r.nextInt())
  for (const b of [1, 2, 7, 100, 256, 1000, 1 << 20, 2147483647]) xs.push(r.nextInt(b))
  for (let i = 0; i < 3; i++) xs.push(r.nextLong().toString())
  for (let i = 0; i < 3; i++) xs.push(bits(r.nextDouble()))
  for (let i = 0; i < 3; i++) xs.push(bits(r.nextFloat()))
  r.consumeCount(5)
  xs.push(r.nextLong().toString())
  return xs
}

test('LegacyRandomSource 序列', () => {
  seeds.forEach((s, i) => assert.deepEqual(seq(new LegacyRandomSource(s)), fx.legacy[i], `seed ${s}`))
})

test('XoroshiroRandomSource 序列', () => {
  seeds.forEach((s, i) => assert.deepEqual(seq(new XoroshiroRandomSource(s)), fx.xoroshiro[i], `seed ${s}`))
})

test('upgradeSeedTo128bit', () => {
  seeds.forEach((s, i) => {
    const u = upgradeSeedTo128bit(s)
    assert.deepEqual([u.lo.toString(), u.hi.toString()], fx.upgrade[i])
  })
})

test('MD5 / seedFromHashOf / String.hashCode', () => {
  fx.hashNames.forEach((n: string, i: number) => {
    const u = seedFromHashOf(n)
    assert.deepEqual([u.lo.toString(), u.hi.toString()], fx.hashSeeds[i], n)
    assert.equal(javaStringHashCode(n), fx.stringHash[i], n)
  })
})

test('Mth.getSeed', () => {
  fx.coords.forEach((c: number[], i: number) => assert.equal(getSeed(c[0], c[1], c[2]).toString(), fx.getSeed[i]))
})

test('位置随机工厂', () => {
  seeds.forEach((s, i) => {
    const px = new XoroshiroRandomSource(s).forkPositional()
    const pl = new LegacyRandomSource(s).forkPositional()
    const got = [
      px.fromHashOf('minecraft:continentalness').nextLong(),
      px.at(1, 2, 3).nextLong(),
      px.at(-30000000, -64, 29999999).nextLong(),
      pl.fromHashOf('minecraft:continentalness').nextLong(),
      pl.at(1, 2, 3).nextLong()
    ].map(String)
    assert.deepEqual(got, fx.positional[i])
  })
})

const points: number[][] = fx.points.map((p: string[]) => p.map(num))

test('ImprovedNoise', () => {
  seeds.forEach((s, i) => {
    const n = new ImprovedNoise(new XoroshiroRandomSource(s))
    const m = new ImprovedNoise(new LegacyRandomSource(s))
    const got: string[] = []
    for (const [x, y, z] of points) {
      got.push(bits(n.noise(x, y, z)), bits(m.noise(x, y, z)), bits(n.noise(x, y, z, 0.7, 0.3)))
    }
    assert.deepEqual(got, fx.improved[i])
  })
})

test('NormalNoise（minecraft:continentalness 路径）', () => {
  seeds.forEach((s, i) => {
    const f = new XoroshiroRandomSource(s).forkPositional()
    const n = NormalNoise.create(f.fromHashOf('minecraft:continentalness'), {
      firstOctave: -9,
      amplitudes: [1, 1, 2, 2, 2, 1, 1, 1, 1]
    })
    const got = [bits(n.maxValue), ...points.map(([x, y, z]) => bits(n.getValue(x, y, z)))]
    assert.deepEqual(got, fx.normal[i])
  })
})

test('BlendedNoise（old_blended_noise）', () => {
  const bp = [
    [0, 0, 0],
    [17, 64, -33],
    [-1000, -64, 2000],
    [123456, 200, -654321]
  ]
  seeds.forEach((s, i) => {
    const f = new XoroshiroRandomSource(s).forkPositional()
    const b = new BlendedNoise(f.fromHashOf('minecraft:terrain'), {
      xzScale: 0.25,
      yScale: 0.125,
      xzFactor: 80,
      yFactor: 160,
      smearScaleMultiplier: 8
    })
    assert.deepEqual(
      bp.map(([x, y, z]) => bits(b.compute(x, y, z))),
      fx.blended[i]
    )
  })
})

test('CubicSpline 的 float 舍入', () => {
  const f = Math.fround
  const loc = [-1.1, -1.02, -0.51, -0.44, -0.18, -0.16, -0.15, 0.03, 0.06, 1.0].map(f)
  const val = [0.044, -0.2222, -0.2222, -0.12, -0.12, -0.05, -0.05, 0.0, 0.3, 0.6].map(f)
  const der = [0, 0, 0, 0, 0, 0.1, 0, 0.5, 0.2, 0].map(f)
  const spline = CubicSpline.multipoint(
    (c: number) => c,
    loc,
    val.map((v) => CubicSpline.constant(v)),
    der
  )
  for (const [inp, expected] of fx.spline as string[][]) {
    assert.equal(bits(spline.apply(num(inp))), expected, `input ${num(inp)}`)
  }
})

test('SimplexNoise 与末地外岛高度（end_islands）', () => {
  const ep = [
    [0, 0],
    [100, 0],
    [1000, -1000],
    [-5000, 3000],
    [123457, -98765],
    [12345678, 7654321]
  ]
  seeds.forEach((s, i) => {
    const r = new LegacyRandomSource(s)
    r.consumeCount(17292)
    const sx = new SimplexNoise(r)
    const got = [
      ...points.map(([x, , z]) => bits(sx.getValue(x, z))),
      ...ep.map(([x, z]) => bits(EndIslands.heightValue(sx, Math.trunc(x / 8), Math.trunc(z / 8))))
    ]
    assert.deepEqual(got, fx.simplex[i])
  })
})
