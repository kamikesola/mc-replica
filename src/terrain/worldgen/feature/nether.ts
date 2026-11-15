/**
 * 下界的地物（v5.2）：萤石、玄武岩柱、玄武岩柱群、三角洲、替换团块、分散矿石（远古残骸）、巨型菌、下界植被、
 * 垂泪藤、缠怨藤。都对应原版同名的 Feature 类。
 */
import { blockPredicate, canSurvive, intProvider, isAir, parseState, ruleTest, stateProvider, type WorldGenLevel } from './core'
import { inTag } from './tags'
import type { FeaturePlacer } from './placement'
import { nextIntBetween } from '../math/Mth'
import type { RandomSource } from '../random/RandomSource'

const f32 = Math.fround
const DIRS: [number, number, number][] = [[0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1], [-1, 0, 0], [1, 0, 0]]
const NETHERRACK = 'minecraft:netherrack'
const BASALT = 'minecraft:basalt'
const WART = 'minecraft:nether_wart_block'
const minecraft = (n: string) => (n.includes(':') ? n : `minecraft:${n}`)
const canBeReplaced = (b: string) => inTag(b, 'minecraft:replaceable')

/** 原版 BlockPos.withinManhattan 的遍历顺序：按曼哈顿距离一圈一圈往外，z 正负成对 */
export function* withinManhattan(cx: number, cy: number, cz: number, xs: number, ys: number, zs: number): Generator<[number, number, number]> {
  const total = xs + ys + zs
  let depth = 0
  let maxX = 0
  let maxY = 0
  let x = 0
  let y = 0
  for (;;) {
    let found: [number, number, number] | null = null
    let mirror = false
    for (; found === null; y++) {
      if (y > maxY) {
        x++
        if (x > maxX) {
          depth++
          if (depth > total) return
          maxX = Math.min(xs, depth)
          x = -maxX
        }
        maxY = Math.min(ys, depth - Math.abs(x))
        y = -maxY
      }
      const k = depth - Math.abs(x) - Math.abs(y)
      if (k <= zs) {
        mirror = k !== 0
        found = [cx + x, cy + y, cz + k]
      }
    }
    yield found
    if (mirror) yield [found[0], found[1], cz - (found[2] - cz)]
  }
}
const manhattan = (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => Math.abs(ax - bx) + Math.abs(ay - by) + Math.abs(az - bz)

// ---------------------------------------------------------------- 萤石

export function glowstoneBlob(): FeaturePlacer {
  const G = 'minecraft:glowstone'
  return (l, r, x, y, z) => {
    if (!isAir(l.getBlock(x, y, z))) return false
    const above = l.getBlock(x, y + 1, z)
    if (above !== NETHERRACK && above !== BASALT && above !== 'minecraft:blackstone') return false
    l.setBlock(x, y, z, G)
    for (let i = 0; i < 1500; i++) {
      const px = x + r.nextInt(8) - r.nextInt(8)
      const py = y - r.nextInt(12)
      const pz = z + r.nextInt(8) - r.nextInt(8)
      if (!isAir(l.getBlock(px, py, pz))) continue
      let j = 0
      for (const [dx, dy, dz] of DIRS) {
        if (l.getBlock(px + dx, py + dy, pz + dz) === G) j++
        if (j > 1) break
      }
      if (j === 1) l.setBlock(px, py, pz, G)
    }
    return true
  }
}

// ---------------------------------------------------------------- 玄武岩柱（从天花板垂到地面）

export function basaltPillar(): FeaturePlacer {
  return (l, r, x, y0, z) => {
    if (!isAir(l.getBlock(x, y0, z)) || isAir(l.getBlock(x, y0 + 1, z))) return false
    let y = y0
    let n = true
    let s = true
    let w = true
    let e = true
    const hang = (px: number, py: number, pz: number) => {
      if (r.nextInt(10) !== 0) {
        l.setBlock(px, py, pz, BASALT)
        return true
      }
      return false
    }
    while (isAir(l.getBlock(x, y, z))) {
      if (y < l.minY || y >= l.minY + l.height) return true
      l.setBlock(x, y, z, BASALT)
      n = n && hang(x, y, z - 1)
      s = s && hang(x, y, z + 1)
      w = w && hang(x - 1, y, z)
      e = e && hang(x + 1, y, z)
      y--
    }
    y++
    for (const [dx, dz] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) if (r.nextBoolean()) l.setBlock(x + dx, y, z + dz, BASALT)
    y--
    for (let i = -3; i < 4; i++)
      for (let j = -3; j < 4; j++) {
        const k = Math.abs(i) * Math.abs(j)
        if (r.nextInt(10) >= 10 - k) continue
        let py = y
        const px = x + i
        const pz = z + j
        let left = 3
        while (isAir(l.getBlock(px, py - 1, pz))) {
          py--
          if (--left <= 0) break
        }
        if (!isAir(l.getBlock(px, py - 1, pz))) l.setBlock(px, py, pz, BASALT)
      }
    return true
  }
}

// ---------------------------------------------------------------- 玄武岩柱群（玄武岩三角洲）

const CANNOT_PLACE_ON = new Set(['lava', 'bedrock', 'magma_block', 'soul_sand', 'nether_bricks', 'nether_brick_fence', 'nether_brick_stairs', 'nether_wart', 'chest', 'spawner'].map(minecraft))

export function basaltColumns(cfg: Record<string, unknown>): FeaturePlacer {
  const reach = intProvider(cfg.reach)
  const height = intProvider(cfg.height)
  return (l, r, x, y, z) => {
    const sea = l.seaLevel
    const airOrLavaOcean = (px: number, py: number, pz: number) => {
      const b = l.getBlock(px, py, pz)
      return isAir(b) || (b === 'minecraft:lava' && py <= sea)
    }
    const canPlaceAt = (px: number, py: number, pz: number) => {
      if (!airOrLavaOcean(px, py, pz)) return false
      const below = l.getBlock(px, py - 1, pz)
      return !isAir(below) && !CANNOT_PLACE_ON.has(below)
    }
    const findSurface = (px: number, py: number, pz: number, d: number) => {
      while (py > l.minY + 1 && d > 0) {
        d--
        if (canPlaceAt(px, py, pz)) return py
        py--
      }
      return null
    }
    const findAir = (px: number, py: number, pz: number, d: number) => {
      while (py < l.minY + l.height - 1 && d > 0) {
        d--
        const b = l.getBlock(px, py, pz)
        if (CANNOT_PLACE_ON.has(b)) return null
        if (isAir(b)) return py
        py++
      }
      return null
    }
    const placeColumn = (cx: number, cy: number, cz: number, h: number, rch: number) => {
      let placed = false
      for (let pz = cz - rch; pz <= cz + rch; pz++)
        for (let px = cx - rch; px <= cx + rch; px++) {
          const d = Math.abs(px - cx) + Math.abs(pz - cz)
          const start = airOrLavaOcean(px, cy, pz) ? findSurface(px, cy, pz, d) : findAir(px, cy, pz, d)
          if (start === null) continue
          let py = start
          for (let j = h - ((d / 2) | 0); j >= 0; j--) {
            if (airOrLavaOcean(px, py, pz)) {
              l.setBlock(px, py, pz, BASALT)
              py++
              placed = true
            } else {
              if (l.getBlock(px, py, pz) !== BASALT) break
              py++
            }
          }
        }
      return placed
    }
    if (!canPlaceAt(x, y, z)) return false
    const j = height(r)
    const big = r.nextFloat() < f32(0.9)
    const k = Math.min(j, big ? 5 : 8)
    const n = big ? 50 : 15
    let placed = false
    const w = 2 * k + 1
    for (let i = 0; i < n; i++) {
      // 原版 BlockPos.randomBetweenClosed：每次 x、y、z 各取一次随机数（y 范围只有 1 也要取）
      const px = x - k + r.nextInt(w)
      const py = y + r.nextInt(1)
      const pz = z - k + r.nextInt(w)
      const m = j - manhattan(px, py, pz, x, y, z)
      if (m >= 0) placed = placeColumn(px, py, pz, m, reach(r)) || placed
    }
    return placed
  }
}

// ---------------------------------------------------------------- 三角洲（岩浆池 + 岩浆块边）

const DELTA_CANNOT_REPLACE = new Set(['bedrock', 'nether_bricks', 'nether_brick_fence', 'nether_brick_stairs', 'nether_wart', 'chest', 'spawner'].map(minecraft))

export function delta(cfg: Record<string, unknown>): FeaturePlacer {
  const contents = parseState(cfg.contents)
  const rim = parseState(cfg.rim)
  const size = intProvider(cfg.size)
  const rimSize = intProvider(cfg.rim_size)
  const isClear = (l: WorldGenLevel, x: number, y: number, z: number) => {
    const b = l.getBlock(x, y, z)
    if (b === contents || DELTA_CANNOT_REPLACE.has(b)) return false
    for (let d = 0; d < 6; d++) {
      const air = isAir(l.getBlock(x + DIRS[d][0], y + DIRS[d][1], z + DIRS[d][2]))
      if ((air && d !== 1) || (!air && d === 1)) return false
    }
    return true
  }
  return (l, r, x, y, z) => {
    let placed = false
    const withRim = r.nextDouble() < 0.9
    const i = withRim ? rimSize(r) : 0
    const j = withRim ? rimSize(r) : 0
    const rimOn = withRim && i !== 0 && j !== 0
    const k = size(r)
    const m = size(r)
    const max = Math.max(k, m)
    for (const [px, py, pz] of withinManhattan(x, y, z, k, 0, m)) {
      if (manhattan(px, py, pz, x, y, z) > max) break
      if (!isClear(l, px, py, pz)) continue
      if (rimOn) {
        placed = true
        l.setBlock(px, py, pz, rim)
      }
      if (isClear(l, px + i, py, pz + j)) {
        placed = true
        l.setBlock(px + i, py, pz + j, contents)
      }
    }
    return placed
  }
}

// ---------------------------------------------------------------- 替换团块（玄武岩 / 黑石团）

export function replaceBlobs(cfg: Record<string, unknown>): FeaturePlacer {
  const target = parseState(cfg.target)
  const state = parseState(cfg.state)
  const radius = intProvider(cfg.radius)
  return (l, r, x, y0, z) => {
    let y = Math.min(Math.max(y0, l.minY + 1), l.minY + l.height - 1)
    while (y > l.minY + 1 && l.getBlock(x, y, z) !== target) y--
    if (y <= l.minY + 1) return false
    const i = radius(r)
    const j = radius(r)
    const k = radius(r)
    const max = Math.max(i, j, k)
    let placed = false
    for (const [px, py, pz] of withinManhattan(x, y, z, i, j, k)) {
      if (manhattan(px, py, pz, x, y, z) > max) break
      if (l.getBlock(px, py, pz) === target) {
        l.setBlock(px, py, pz, state)
        placed = true
      }
    }
    return placed
  }
}

// ---------------------------------------------------------------- 分散的矿石（远古残骸）

export function scatteredOre(cfg: Record<string, unknown>): FeaturePlacer {
  const size = cfg.size as number
  const discard = f32(cfg.discard_chance_on_air_exposure as number)
  const targets = (cfg.targets as { state: unknown; target: unknown }[]).map((t) => ({ state: parseState(t.state), test: ruleTest(t.target) }))
  const nearAir = (l: WorldGenLevel, x: number, y: number, z: number) => DIRS.some(([dx, dy, dz]) => isAir(l.getBlock(x + dx, y + dy, z + dz)))
  const axis = (r: RandomSource, range: number) => Math.floor(f32(f32(r.nextFloat() - r.nextFloat()) * range) + 0.5)
  return (l, r, x, y, z) => {
    const n = r.nextInt(size + 1)
    for (let j = 0; j < n; j++) {
      const range = Math.min(j, 7)
      const px = x + axis(r, range)
      const py = y + axis(r, range)
      const pz = z + axis(r, range)
      const b = l.getBlock(px, py, pz)
      for (const t of targets) {
        if (!t.test(b, r)) continue
        const skipAir = discard <= 0 ? true : discard >= 1 ? false : r.nextFloat() >= discard
        if (!skipAir && nearAir(l, px, py, pz)) continue
        l.setBlock(px, py, pz, t.state)
        break
      }
    }
    return true
  }
}

// ---------------------------------------------------------------- 垂泪藤、缠怨藤

/** 原版 WeepingVinesFeature.placeWeepingVinesColumn：往下长 */
function weepingColumn(l: WorldGenLevel, r: RandomSource, x: number, y: number, z: number, length: number, minAge: number, maxAge: number) {
  for (let i = 0; i <= length; i++) {
    if (isAir(l.getBlock(x, y, z))) {
      if (i === length || !isAir(l.getBlock(x, y - 1, z))) {
        nextIntBetween(r, minAge, maxAge)
        l.setBlock(x, y, z, 'minecraft:weeping_vines')
        break
      }
      l.setBlock(x, y, z, 'minecraft:weeping_vines_plant')
    }
    y--
  }
}
/** 原版 TwistingVinesFeature.placeWeepingVinesColumn：往上长 */
function twistingColumn(l: WorldGenLevel, r: RandomSource, x: number, y: number, z: number, length: number, minAge: number, maxAge: number) {
  for (let i = 1; i <= length; i++) {
    if (isAir(l.getBlock(x, y, z))) {
      if (i === length || !isAir(l.getBlock(x, y + 1, z))) {
        nextIntBetween(r, minAge, maxAge)
        l.setBlock(x, y, z, 'minecraft:twisting_vines')
        break
      }
      l.setBlock(x, y, z, 'minecraft:twisting_vines_plant')
    }
    y++
  }
}

export function weepingVines(): FeaturePlacer {
  return (l, r, x, y, z) => {
    if (!isAir(l.getBlock(x, y, z))) return false
    const above = l.getBlock(x, y + 1, z)
    if (above !== NETHERRACK && above !== WART) return false
    l.setBlock(x, y, z, WART)
    for (let i = 0; i < 200; i++) {
      const px = x + r.nextInt(6) - r.nextInt(6)
      const py = y + r.nextInt(2) - r.nextInt(5)
      const pz = z + r.nextInt(6) - r.nextInt(6)
      if (!isAir(l.getBlock(px, py, pz))) continue
      let j = 0
      for (const [dx, dy, dz] of DIRS) {
        const b = l.getBlock(px + dx, py + dy, pz + dz)
        if (b === NETHERRACK || b === WART) j++
        if (j > 1) break
      }
      if (j === 1) l.setBlock(px, py, pz, WART)
    }
    for (let i = 0; i < 100; i++) {
      const px = x + r.nextInt(8) - r.nextInt(8)
      const py = y + r.nextInt(2) - r.nextInt(7)
      const pz = z + r.nextInt(8) - r.nextInt(8)
      if (!isAir(l.getBlock(px, py, pz))) continue
      const b = l.getBlock(px, py + 1, pz)
      if (b !== NETHERRACK && b !== WART) continue
      let len = nextIntBetween(r, 1, 8)
      if (r.nextInt(6) === 0) len *= 2
      if (r.nextInt(5) === 0) len = 1
      weepingColumn(l, r, px, py, pz, len, 17, 25)
    }
    return true
  }
}

export function twistingVines(cfg: Record<string, unknown>): FeaturePlacer {
  const w = cfg.spread_width as number
  const h = cfg.spread_height as number
  const maxH = cfg.max_height as number
  const invalid = (l: WorldGenLevel, x: number, y: number, z: number) => {
    if (!isAir(l.getBlock(x, y, z))) return true
    const b = l.getBlock(x, y - 1, z)
    return b !== NETHERRACK && b !== 'minecraft:warped_nylium' && b !== 'minecraft:warped_wart_block'
  }
  return (l, r, x, y, z) => {
    if (invalid(l, x, y, z)) return false
    for (let i = 0; i < w * w; i++) {
      const px = x + nextIntBetween(r, -w, w)
      let py = y + nextIntBetween(r, -h, h)
      const pz = z + nextIntBetween(r, -w, w)
      // findFirstAirBlockAboveGround：往下走到第一个不是空气的方块，再回到它上面
      let ok = true
      do {
        py--
        if (py < l.minY || py >= l.minY + l.height) {
          ok = false
          break
        }
      } while (isAir(l.getBlock(px, py, pz)))
      if (!ok) continue
      py++
      if (invalid(l, px, py, pz)) continue
      let len = nextIntBetween(r, 1, maxH)
      if (r.nextInt(6) === 0) len *= 2
      if (r.nextInt(5) === 0) len = 1
      twistingColumn(l, r, px, py, pz, len, 17, 25)
    }
    return true
  }
}

// ---------------------------------------------------------------- 巨型菌（绯红菌、诡异菌）

export function hugeFungus(cfg: Record<string, unknown>): FeaturePlacer {
  const validBase = parseState(cfg.valid_base_block)
  const stem = parseState(cfg.stem_state)
  const hat = parseState(cfg.hat_state)
  const decor = parseState(cfg.decor_state)
  const replaceable = blockPredicate(cfg.replaceable_blocks)
  const planted = (cfg.planted as boolean | undefined) ?? false
  const weeping = hat === WART
  const isReplaceable = (l: WorldGenLevel, x: number, y: number, z: number, checkConfig: boolean) => canBeReplaced(l.getBlock(x, y, z)) || (checkConfig && replaceable(l, x, y, z))

  const tryVines = (l: WorldGenLevel, r: RandomSource, x: number, y: number, z: number) => {
    if (!isAir(l.getBlock(x, y - 1, z))) return
    let len = nextIntBetween(r, 1, 5)
    if (r.nextInt(7) === 0) len *= 2
    weepingColumn(l, r, x, y - 1, z, len, 23, 25)
  }
  const hatBlock = (l: WorldGenLevel, r: RandomSource, x: number, y: number, z: number, decorChance: number, hatChance: number, vineChance: number) => {
    if (r.nextFloat() < decorChance) l.setBlock(x, y, z, decor)
    else if (r.nextFloat() < hatChance) {
      l.setBlock(x, y, z, hat)
      if (r.nextFloat() < vineChance) tryVines(l, r, x, y, z)
    }
  }
  const hatDrop = (l: WorldGenLevel, r: RandomSource, x: number, y: number, z: number) => {
    if (l.getBlock(x, y - 1, z) === hat) l.setBlock(x, y, z, hat)
    else if (r.nextFloat() < 0.15) {
      l.setBlock(x, y, z, hat)
      if (weeping && r.nextInt(11) === 0) tryVines(l, r, x, y, z)
    }
  }
  return (l, r, x, y, z) => {
    if (l.getBlock(x, y - 1, z) !== validBase) return false
    let height = nextIntBetween(r, 4, 13)
    if (r.nextInt(12) === 0) height *= 2
    // 原版：不是玩家种的，顶要在生成深度以内（getGenDepth = noise 的 height）
    if (!planted && y + height + 1 >= l.minY + l.height) return false
    const huge = !planted && r.nextFloat() < f32(0.06)
    l.setBlock(x, y, z, 'minecraft:air')
    // 菌柄
    const s = huge ? 1 : 0
    for (let j = -s; j <= s; j++)
      for (let k = -s; k <= s; k++) {
        const corner = huge && Math.abs(j) === s && Math.abs(k) === s
        for (let h = 0; h < height; h++) {
          if (!isReplaceable(l, x + j, y + h, z + k, true)) continue
          if (corner) {
            if (r.nextFloat() < f32(0.1)) l.setBlock(x + j, y + h, z + k, stem)
          } else l.setBlock(x + j, y + h, z + k, stem)
        }
      }
    // 菌盖
    const i = Math.min(r.nextInt(1 + ((height / 3) | 0)) + 5, height)
    const j0 = height - i
    for (let k = j0; k <= height; k++) {
      let rad = k < height - r.nextInt(3) ? 2 : 1
      if (i > 8 && k < j0 + 4) rad = 3
      if (huge) rad++
      for (let n = -rad; n <= rad; n++)
        for (let o = -rad; o <= rad; o++) {
          const edgeN = n === -rad || n === rad
          const edgeO = o === -rad || o === rad
          const inner = !edgeN && !edgeO && k !== height
          const corner = edgeN && edgeO
          const low = k < j0 + 3
          const px = x + n
          const py = y + k
          const pz = z + o
          if (!isReplaceable(l, px, py, pz, false)) continue
          if (low) {
            if (!inner) hatDrop(l, r, px, py, pz)
          } else if (inner) hatBlock(l, r, px, py, pz, f32(0.1), f32(0.2), weeping ? f32(0.1) : 0)
          else if (corner) hatBlock(l, r, px, py, pz, f32(0.01), f32(0.7), weeping ? f32(0.083) : 0)
          else hatBlock(l, r, px, py, pz, f32(5.0e-4), f32(0.98), weeping ? f32(0.07) : 0)
        }
    }
    return true
  }
}

// ---------------------------------------------------------------- 下界植被（菌、菌索、下界苗）

export function netherForestVegetation(cfg: Record<string, unknown>): FeaturePlacer {
  const provider = stateProvider(cfg.state_provider)
  const w = cfg.spread_width as number
  const h = cfg.spread_height as number
  return (l, r, x, y, z) => {
    if (!inTag(l.getBlock(x, y - 1, z), 'minecraft:nylium')) return false
    if (!(y >= l.minY + 1 && y + 1 <= l.minY + l.height - 1)) return false
    let placed = 0
    for (let k = 0; k < w * w; k++) {
      const px = x + r.nextInt(w) - r.nextInt(w)
      const py = y + r.nextInt(h) - r.nextInt(h)
      const pz = z + r.nextInt(w) - r.nextInt(w)
      const s = provider(r, px, py, pz)
      if (isAir(l.getBlock(px, py, pz)) && py > l.minY && canSurvive(s, l, px, py, pz)) {
        l.setBlock(px, py, pz, s)
        placed++
      }
    }
    return placed > 0
  }
}
