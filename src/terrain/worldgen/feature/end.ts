/**
 * 末地的地物（v5.2）：黑曜石柱、出生平台、末地小岛、紫颂植物、末地折跃门（返回用）。
 * 末影水晶是实体，不放；但原版放水晶时取了一次随机数（朝向），这里照样取。
 */
import { isAir, type WorldGenLevel } from './core'
import type { FeaturePlacer } from './placement'
import { shuffle } from './vegetation'
import { LegacyRandomSource } from '../random/LegacyRandomSource'
import type { RandomSource } from '../random/RandomSource'

const f32 = Math.fround
const OBSIDIAN = 'minecraft:obsidian'
const END_STONE = 'minecraft:end_stone'
const BEDROCK = 'minecraft:bedrock'
const AIR = 'minecraft:air'

// ---------------------------------------------------------------- 黑曜石柱

interface Spike {
  x: number
  z: number
  radius: number
  height: number
  guarded: boolean
}

const spikeCache = new Map<bigint, Spike[]>()
/** 原版 EndSpikeFeature.getSpikesForLevel：10 根柱子的半径和高度由世界种子打乱决定 */
export function spikesFor(seed: bigint): Spike[] {
  let s = spikeCache.get(seed)
  if (s) return s
  const key = new LegacyRandomSource(seed).nextLong() & 65535n
  const order = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], new LegacyRandomSource(key))
  s = order.map((l, i) => ({
    x: Math.floor(42.0 * Math.cos(2.0 * (-Math.PI + (Math.PI / 10) * i))),
    z: Math.floor(42.0 * Math.sin(2.0 * (-Math.PI + (Math.PI / 10) * i))),
    radius: 2 + ((l / 3) | 0),
    height: 76 + l * 3,
    guarded: l === 1 || l === 2
  }))
  spikeCache.set(seed, s)
  return s
}

export function endSpike(): FeaturePlacer {
  return (l, r, x, _y, z) => {
    for (const s of spikesFor(l.seed)) {
      if (s.x >> 4 !== x >> 4 || s.z >> 4 !== z >> 4) continue
      const i = s.radius
      for (let pz = s.z - i; pz <= s.z + i; pz++)
        for (let py = l.minY; py <= s.height + 10; py++)
          for (let px = s.x - i; px <= s.x + i; px++) {
            if ((px - s.x) ** 2 + (pz - s.z) ** 2 <= i * i + 1 && py < s.height) l.setBlock(px, py, pz, OBSIDIAN)
            else if (py > 65) l.setBlock(px, py, pz, AIR)
          }
      if (s.guarded)
        for (let k = -2; k <= 2; k++)
          for (let m = -2; m <= 2; m++)
            for (let n = 0; n <= 3; n++) if (Math.abs(k) === 2 || Math.abs(m) === 2 || n === 3) l.setBlock(s.x + k, s.height + n, s.z + m, 'minecraft:iron_bars')
      r.nextFloat() // 末影水晶的朝向
      l.setBlock(s.x, s.height, s.z, BEDROCK)
      l.setBlock(s.x, s.height + 1, s.z, 'minecraft:fire')
    }
    return true
  }
}

// ---------------------------------------------------------------- 出生平台（5×5 黑曜石，上面 3 格清空）

export function endPlatform(): FeaturePlacer {
  return (l, _r, x, y, z) => {
    for (let i = -2; i <= 2; i++)
      for (let j = -2; j <= 2; j++)
        for (let k = -1; k < 3; k++) {
          const b = k === -1 ? OBSIDIAN : AIR
          if (l.getBlock(x + j, y + k, z + i) !== b) l.setBlock(x + j, y + k, z + i, b)
        }
    return true
  }
}

// ---------------------------------------------------------------- 末地小岛

export function endIsland(): FeaturePlacer {
  return (l, r, x, y, z) => {
    let f = f32(r.nextInt(3) + 4.0)
    for (let i = 0; f > 0.5; i--) {
      for (let j = Math.floor(-f); j <= Math.ceil(f); j++)
        for (let k = Math.floor(-f); k <= Math.ceil(f); k++) if (j * j + k * k <= f32(f32(f + 1) * f32(f + 1))) l.setBlock(x + j, y + i, z + k, END_STONE)
      f = f32(f - f32(r.nextInt(2) + 0.5))
    }
    return true
  }
}

// ---------------------------------------------------------------- 紫颂植物（原版 ChorusFlowerBlock.generatePlant）

const HORIZONTAL: [number, number][] = [[0, -1], [1, 0], [0, 1], [-1, 0]]

export function chorusPlant(): FeaturePlacer {
  const PLANT = 'minecraft:chorus_plant'
  const allNeighborsEmpty = (l: WorldGenLevel, x: number, y: number, z: number, except: number) => {
    for (let d = 0; d < 4; d++) if (d !== except && !isAir(l.getBlock(x + HORIZONTAL[d][0], y, z + HORIZONTAL[d][1]))) return false
    return true
  }
  const grow = (l: WorldGenLevel, r: RandomSource, bx: number, by: number, bz: number, ox: number, oz: number, maxDist: number, iter: number): void => {
    let i = r.nextInt(4) + 1
    if (iter === 0) i++
    for (let j = 0; j < i; j++) {
      const py = by + j + 1
      if (!allNeighborsEmpty(l, bx, py, bz, -1)) return
      l.setBlock(bx, py, bz, PLANT)
      l.setBlock(bx, py - 1, bz, PLANT)
    }
    let branched = false
    if (iter < 4) {
      let k = r.nextInt(4)
      if (iter === 0) k++
      for (let n = 0; n < k; n++) {
        const d = r.nextInt(4)
        const px = bx + HORIZONTAL[d][0]
        const py = by + i
        const pz = bz + HORIZONTAL[d][1]
        const back = (d + 2) & 3
        if (
          Math.abs(px - ox) < maxDist &&
          Math.abs(pz - oz) < maxDist &&
          isAir(l.getBlock(px, py, pz)) &&
          isAir(l.getBlock(px, py - 1, pz)) &&
          allNeighborsEmpty(l, px, py, pz, back)
        ) {
          branched = true
          l.setBlock(px, py, pz, PLANT)
          l.setBlock(px + HORIZONTAL[back][0], py, pz + HORIZONTAL[back][1], PLANT)
          grow(l, r, px, py, pz, ox, oz, maxDist, iter + 1)
        }
      }
    }
    if (!branched) l.setBlock(bx, by + i, bz, 'minecraft:chorus_flower')
  }
  return (l, r, x, y, z) => {
    if (!isAir(l.getBlock(x, y, z)) || l.getBlock(x, y - 1, z) !== END_STONE) return false
    l.setBlock(x, y, z, PLANT)
    grow(l, r, x, y, z, x, z, 8, 0)
    return true
  }
}

// ---------------------------------------------------------------- 末地折跃门（外岛上返回用的那种）

export function endGateway(): FeaturePlacer {
  return (l, _r, x, y, z) => {
    for (let pz = z - 1; pz <= z + 1; pz++)
      for (let py = y - 2; py <= y + 2; py++)
        for (let px = x - 1; px <= x + 1; px++) {
          const bx = px === x
          const by = py === y
          const bz = pz === z
          const tip = Math.abs(py - y) === 2
          let b: string
          if (bx && by && bz) b = 'minecraft:end_gateway'
          else if (by) b = AIR
          else if (tip && bx && bz) b = BEDROCK
          else if ((bx || bz) && !tip) b = BEDROCK
          else b = AIR
          l.setBlock(px, py, pz, b)
        }
    return true
  }
}
