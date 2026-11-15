/**
 * 珊瑚（v5.1）：原版 CoralFeature 和三个子类（珊瑚树、珊瑚爪、珊瑚蘑菇）。
 * 标签里随机挑方块（getRandomElementOf）= nextInt(标签大小)，标签顺序就是原版 JSON 的顺序。
 */
import { TAGS } from './tags'
import type { FeaturePlacer } from './placement'
import { shuffle } from './vegetation'
import type { WorldGenLevel } from './core'
import type { RandomSource } from '../random/RandomSource'

const WATER = 'minecraft:water'
const list = (tag: string) => [...TAGS[tag]]
const CORAL_BLOCKS = list('minecraft:coral_blocks')
const CORALS = list('minecraft:corals')
const WALL_CORALS = list('minecraft:wall_corals')
/** 北、东、南、西 */
const HORIZONTAL: [number, number][] = [[0, -1], [1, 0], [0, 1], [-1, 0]]

function placeCoralBlock(l: WorldGenLevel, r: RandomSource, x: number, y: number, z: number, state: string): boolean {
  const s = l.getBlock(x, y, z)
  if (!((s === WATER || CORALS.includes(s)) && l.getBlock(x, y + 1, z) === WATER)) return false
  l.setBlock(x, y, z, state)
  if (r.nextFloat() < 0.25) l.setBlock(x, y + 1, z, CORALS[r.nextInt(CORALS.length)])
  else if (r.nextFloat() < 0.05) {
    r.nextInt(4)
    l.setBlock(x, y + 1, z, 'minecraft:sea_pickle')
  }
  for (const [dx, dz] of HORIZONTAL) {
    if (!(r.nextFloat() < 0.2)) continue
    if (l.getBlock(x + dx, y, z + dz) === WATER) l.setBlock(x + dx, y, z + dz, WALL_CORALS[r.nextInt(WALL_CORALS.length)])
  }
  return true
}

type Shape = (l: WorldGenLevel, r: RandomSource, x: number, y: number, z: number, state: string) => boolean

const tree: Shape = (l, r, x, y0, z, state) => {
  let y = y0
  const i = r.nextInt(3) + 1
  for (let j = 0; j < i; j++) {
    if (!placeCoralBlock(l, r, x, y, z, state)) return true
    y++
  }
  const k = r.nextInt(3) + 2
  const dirs = shuffle([0, 1, 2, 3], r)
  for (const d of dirs.slice(0, k)) {
    const [dx, dz] = HORIZONTAL[d]
    let mx = x + dx
    let my = y
    let mz = z + dz
    const n = r.nextInt(5) + 2
    let c = 0
    for (let o = 0; o < n && placeCoralBlock(l, r, mx, my, mz, state); o++) {
      c++
      my++
      if (o === 0 || (c >= 2 && r.nextFloat() < 0.25)) {
        mx += dx
        mz += dz
        c = 0
      }
    }
  }
  return true
}

const claw: Shape = (l, r, x, y, z, state) => {
  if (!placeCoralBlock(l, r, x, y, z, state)) return false
  const d = r.nextInt(4)
  const i = r.nextInt(2) + 2
  const dirs = shuffle([d, (d + 1) & 3, (d + 3) & 3], r)
  for (const e of dirs.slice(0, i)) {
    let mx = x + HORIZONTAL[e][0]
    let my = y
    let mz = z + HORIZONTAL[e][1]
    const j = r.nextInt(2) + 1
    let k: number
    // f：-1 = 上，否则是水平方向
    let f: number
    if (e === d) {
      f = d
      k = r.nextInt(3) + 2
    } else {
      my++
      f = [e, -1][r.nextInt(2)]
      k = r.nextInt(3) + 3
    }
    const move = (dir: number, s: number) => {
      if (dir === -1) my += s
      else {
        mx += HORIZONTAL[dir][0] * s
        mz += HORIZONTAL[dir][1] * s
      }
    }
    for (let a = 0; a < j && placeCoralBlock(l, r, mx, my, mz, state); a++) move(f, 1)
    move(f, -1)
    my++
    for (let a = 0; a < k; a++) {
      move(d, 1)
      if (!placeCoralBlock(l, r, mx, my, mz, state)) break
      if (r.nextFloat() < 0.25) my++
    }
  }
  return true
}

const mushroom: Shape = (l, r, x, y, z, state) => {
  const i = r.nextInt(3) + 3
  const j = r.nextInt(3) + 3
  const k = r.nextInt(3) + 3
  const down = r.nextInt(3) + 1
  for (let n = 0; n <= j; n++)
    for (let o = 0; o <= i; o++)
      for (let p = 0; p <= k; p++) {
        const edgeN = n === 0 || n === j
        const edgeO = o === 0 || o === i
        const edgeP = p === 0 || p === k
        // 空心的盒子去掉 12 条棱
        if ((!edgeN || !edgeO) && (!edgeP || !edgeO) && (!edgeN || !edgeP) && (edgeN || edgeO || edgeP) && !(r.nextFloat() < 0.1))
          placeCoralBlock(l, r, x + n, y + o - down, z + p, state)
      }
  return true
}

export function coral(kind: 'tree' | 'claw' | 'mushroom'): FeaturePlacer {
  const shape = kind === 'tree' ? tree : kind === 'claw' ? claw : mushroom
  return (l, r, x, y, z) => shape(l, r, x, y, z, CORAL_BLOCKS[r.nextInt(CORAL_BLOCKS.length)])
}
