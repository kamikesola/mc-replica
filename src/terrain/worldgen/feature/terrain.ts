/**
 * 地形类地物（v5.1）：熔岩湖、泉、冰刺、蓝冰、森林岩、沙漠井、地牢、水下岩浆、晶洞、滴水石。
 * 都对应原版同名的 Feature 类，随机数的消耗顺序照字节码（见 docs/notes/v5.1-notes.md）。
 */
import { blocksMotion, intProvider, intRange, floatProvider, isAir, isLiquid, isSolidRender, parseState, withProp, stateProvider, type WorldGenLevel } from './core'
import { inTag } from './tags'
import type { FeaturePlacer } from './placement'
import { cos, sin } from '../math/Mth'
import { NormalNoise } from '../noise/NormalNoise'
import { LegacyRandomSource } from '../random/LegacyRandomSource'
import type { RandomSource } from '../random/RandomSource'

const f32 = Math.fround
const AIR = 'minecraft:air'
const WATER = 'minecraft:water'
const LAVA = 'minecraft:lava'
/** 原版 Direction.values()：下、上、北、南、西、东 */
const DIRS: [number, number, number][] = [[0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1], [-1, 0, 0], [1, 0, 0]]
/** 原版 Direction.Plane.HORIZONTAL：北、东、南、西 */
const HORIZONTAL: [number, number][] = [[0, -1], [1, 0], [0, 1], [-1, 0]]
/**
 * 原版 StructurePiece.reorient（v7）：箱子背靠唯一的那面墙；不止一面就从默认的朝北开始，挡住了就转
 */
function reorientChest(l: WorldGenLevel, x: number, y: number, z: number): string {
  const names = ['north', 'east', 'south', 'west']
  const solid = (d: number) => isSolidRender(l.getBlock(x + HORIZONTAL[d][0], y, z + HORIZONTAL[d][1]))
  let dir = -1
  for (let d = 0; d < 4; d++) {
    const b = l.getBlock(x + HORIZONTAL[d][0], y, z + HORIZONTAL[d][1])
    if (b === 'minecraft:chest') return 'north'
    if (isSolidRender(b)) {
      if (dir >= 0) {
        dir = -1
        break
      }
      dir = d
    }
  }
  if (dir >= 0) return names[(dir + 2) & 3]
  let d2 = 0 // 默认朝北
  if (solid(d2)) d2 = (d2 + 2) & 3
  if (solid(d2)) d2 = (d2 + 1) & 3
  if (solid(d2)) d2 = (d2 + 2) & 3
  return names[d2]
}

/** 原版 Feature.isReplaceable(FEATURES_CANNOT_REPLACE) */
const canReplace = (b: string) => !inTag(b, 'minecraft:features_cannot_replace')
const isDirt = (b: string) => inTag(b, 'minecraft:dirt')
const isStone = (b: string) => inTag(b, 'minecraft:base_stone_overworld')
const blockSet = (json: unknown) => new Set((typeof json === 'string' ? [json] : (json as string[])).map((n) => parseState({ Name: n })))
const matches = (json: unknown): ((b: string) => boolean) => {
  if (typeof json === 'string' && json.startsWith('#')) return (b) => inTag(b, json)
  const set = blockSet(json)
  return (b) => set.has(b)
}

// ---------------------------------------------------------------- Column.scan（原版 net.minecraft.world.level.levelgen.Column）

interface Column {
  floor: number | null
  ceiling: number | null
}

/** 从 (x,y,z) 往上、往下找“柱子”的两端：inside 是柱子里面，edge 是两端的方块 */
function scanColumn(l: WorldGenLevel, x: number, y: number, z: number, range: number, inside: (b: string) => boolean, edge: (b: string) => boolean): Column | null {
  if (!inside(l.getBlock(x, y, z))) return null
  const dir = (d: number) => {
    let py = y
    for (let i = 1; i < range && inside(l.getBlock(x, py, z)); i++) py += d
    return edge(l.getBlock(x, py, z)) ? py : null
  }
  const ceiling = dir(1)
  const floor = dir(-1)
  return { floor, ceiling }
}
const columnHeight = (c: Column) => (c.floor !== null && c.ceiling !== null ? c.ceiling - c.floor - 1 : null)

// ---------------------------------------------------------------- lake（熔岩湖）

export function lake(cfg: Record<string, unknown>): FeaturePlacer {
  const fluidP = stateProvider(cfg.fluid)
  const barrierP = stateProvider(cfg.barrier)
  return (l, r, x, y0, z) => {
    if (y0 <= l.minY + 4) return false
    const y = y0 - 4
    const bs = new Uint8Array(2048)
    const n = r.nextInt(4) + 4
    for (let j = 0; j < n; j++) {
      const d = r.nextDouble() * 6.0 + 3.0
      const e = r.nextDouble() * 4.0 + 2.0
      const f = r.nextDouble() * 6.0 + 3.0
      const g = r.nextDouble() * (16.0 - d - 2.0) + 1.0 + d / 2.0
      const h = r.nextDouble() * (8.0 - e - 4.0) + 2.0 + e / 2.0
      const k = r.nextDouble() * (16.0 - f - 2.0) + 1.0 + f / 2.0
      for (let a = 1; a < 15; a++)
        for (let b = 1; b < 15; b++)
          for (let c = 1; c < 7; c++) {
            const o = (a - g) / (d / 2.0)
            const p = (c - h) / (e / 2.0)
            const q = (b - k) / (f / 2.0)
            if (o * o + p * p + q * q < 1.0) bs[(a * 16 + b) * 8 + c] = 1
          }
    }
    const at = (s: number, t: number, u: number) => bs[(s * 16 + t) * 8 + u] === 1
    const border = (s: number, t: number, u: number) =>
      !at(s, t, u) &&
      ((s < 15 && at(s + 1, t, u)) || (s > 0 && at(s - 1, t, u)) || (t < 15 && at(s, t + 1, u)) || (t > 0 && at(s, t - 1, u)) || (u < 7 && at(s, t, u + 1)) || (u > 0 && at(s, t, u - 1)))
    const fluid = fluidP(r, x, y, z)
    for (let s = 0; s < 16; s++)
      for (let t = 0; t < 16; t++)
        for (let u = 0; u < 8; u++) {
          if (!border(s, t, u)) continue
          const b = l.getBlock(x + s, y + u, z + t)
          if (u >= 4 && isLiquid(b)) return false
          if (u < 4 && !blocksMotion(b) && b !== fluid) return false
        }
    for (let s = 0; s < 16; s++)
      for (let t = 0; t < 16; t++)
        for (let u = 0; u < 8; u++) {
          if (!at(s, t, u)) continue
          if (canReplace(l.getBlock(x + s, y + u, z + t))) l.setBlock(x + s, y + u, z + t, u >= 4 ? AIR : fluid)
        }
    const barrier = barrierP(r, x, y, z)
    if (!isAir(barrier)) {
      for (let s = 0; s < 16; s++)
        for (let t = 0; t < 16; t++)
          for (let u = 0; u < 8; u++) {
            if (!border(s, t, u) || !(u < 4 || r.nextInt(2) !== 0)) continue
            const b = l.getBlock(x + s, y + u, z + t)
            if (blocksMotion(b) && !inTag(b, 'minecraft:lava_pool_stone_cannot_replace')) l.setBlock(x + s, y + u, z + t, barrier)
          }
    }
    // 原版水湖还会在冻结的群系结冰；1.21 里只剩熔岩湖，这里不做
    return true
  }
}

// ---------------------------------------------------------------- spring_feature（泉）

export function spring(cfg: Record<string, unknown>): FeaturePlacer {
  const state = parseState(cfg.state)
  const valid = matches(cfg.valid_blocks)
  const requiresBelow = (cfg.requires_block_below as boolean | undefined) ?? true
  const rockCount = (cfg.rock_count as number | undefined) ?? 4
  const holeCount = (cfg.hole_count as number | undefined) ?? 1
  return (l, _r, x, y, z) => {
    if (!valid(l.getBlock(x, y + 1, z))) return false
    if (requiresBelow && !valid(l.getBlock(x, y - 1, z))) return false
    const cur = l.getBlock(x, y, z)
    if (!isAir(cur) && !valid(cur)) return false
    const around = [l.getBlock(x - 1, y, z), l.getBlock(x + 1, y, z), l.getBlock(x, y, z - 1), l.getBlock(x, y, z + 1), l.getBlock(x, y - 1, z)]
    const rocks = around.filter(valid).length
    const holes = around.filter(isAir).length
    if (rocks !== rockCount || holes !== holeCount) return false
    l.setBlock(x, y, z, state)
    return true
  }
}

// ---------------------------------------------------------------- ice_spike（冰刺）

export function iceSpike(): FeaturePlacer {
  const PACKED = 'minecraft:packed_ice'
  const ok = (b: string) => isAir(b) || isDirt(b) || b === 'minecraft:snow_block' || b === 'minecraft:ice'
  return (l, r, x, y0, z) => {
    let y = y0
    while (isAir(l.getBlock(x, y, z)) && y > l.minY + 2) y--
    if (l.getBlock(x, y, z) !== 'minecraft:snow_block') return false
    y += r.nextInt(4)
    const i = r.nextInt(4) + 7
    const j = ((i / 4) | 0) + r.nextInt(2)
    if (j > 1 && r.nextInt(60) === 0) y += 10 + r.nextInt(30)
    for (let k = 0; k < i; k++) {
      const f = f32(f32(1.0 - f32(k / i)) * j)
      const n = Math.ceil(f)
      for (let m = -n; m <= n; m++) {
        const g = f32(Math.abs(m) - 0.25)
        for (let o = -n; o <= n; o++) {
          const h = f32(Math.abs(o) - 0.25)
          if (!((m === 0 && o === 0) || !(f32(f32(g * g) + f32(h * h)) > f32(f * f)))) continue
          if ((m === -n || m === n || o === -n || o === n) && r.nextFloat() > 0.75) continue
          if (ok(l.getBlock(x + m, y + k, z + o))) l.setBlock(x + m, y + k, z + o, PACKED)
          if (k !== 0 && n > 1 && ok(l.getBlock(x + m, y - k, z + o))) l.setBlock(x + m, y - k, z + o, PACKED)
        }
      }
    }
    const k = Math.min(Math.max(j - 1, 0), 1)
    for (let a = -k; a <= k; a++)
      for (let b = -k; b <= k; b++) {
        let py = y - 1
        let p = 50
        if (Math.abs(a) === 1 && Math.abs(b) === 1) p = r.nextInt(5)
        while (py > 50) {
          const s = l.getBlock(x + a, py, z + b)
          if (!ok(s) && s !== PACKED) break
          l.setBlock(x + a, py, z + b, PACKED)
          py--
          if (--p <= 0) {
            py -= r.nextInt(5) + 1
            p = r.nextInt(5)
          }
        }
      }
    return true
  }
}

// ---------------------------------------------------------------- blue_ice（冰山里的蓝冰）

export function blueIce(): FeaturePlacer {
  const BLUE = 'minecraft:blue_ice'
  return (l, r, x, y, z) => {
    if (y > l.seaLevel - 1) return false
    if (l.getBlock(x, y, z) !== WATER && l.getBlock(x, y - 1, z) !== WATER) return false
    let touches = false
    for (let d = 1; d < 6; d++) if (l.getBlock(x + DIRS[d][0], y + DIRS[d][1], z + DIRS[d][2]) === 'minecraft:packed_ice') touches = true
    if (!touches) return false
    l.setBlock(x, y, z, BLUE)
    for (let i = 0; i < 200; i++) {
      const j = r.nextInt(5) - r.nextInt(6)
      let k = 3
      if (j < 2) k += (j / 2) | 0
      if (k < 1) continue
      const px = x + r.nextInt(k) - r.nextInt(k)
      const py = y + j
      const pz = z + r.nextInt(k) - r.nextInt(k)
      const s = l.getBlock(px, py, pz)
      if (!(isAir(s) || s === WATER || s === 'minecraft:packed_ice' || s === 'minecraft:ice')) continue
      for (const [dx, dy, dz] of DIRS)
        if (l.getBlock(px + dx, py + dy, pz + dz) === BLUE) {
          l.setBlock(px, py, pz, BLUE)
          break
        }
    }
    return true
  }
}

// ---------------------------------------------------------------- forest_rock（原版 BlockBlobFeature：苔石堆）

export function forestRock(cfg: Record<string, unknown>): FeaturePlacer {
  const state = parseState(cfg.state)
  return (l, r, x0, y0, z0) => {
    let x = x0
    let y = y0
    let z = z0
    for (; y > l.minY + 3; y--) {
      const below = l.getBlock(x, y - 1, z)
      if (!isAir(below) && (isDirt(below) || isStone(below))) break
    }
    if (y <= l.minY + 3) return false
    for (let i = 0; i < 3; i++) {
      const j = r.nextInt(2)
      const k = r.nextInt(2)
      const m = r.nextInt(2)
      const f = f32(f32((j + k + m) * f32(0.333)) + 0.5)
      const ff = f32(f * f)
      for (let pz = z - m; pz <= z + m; pz++)
        for (let py = y - k; py <= y + k; py++)
          for (let px = x - j; px <= x + j; px++) if ((px - x) ** 2 + (py - y) ** 2 + (pz - z) ** 2 <= ff) l.setBlock(px, py, pz, state)
      x += -1 + r.nextInt(2)
      y += -r.nextInt(2)
      z += -1 + r.nextInt(2)
    }
    return true
  }
}

// ---------------------------------------------------------------- desert_well（沙漠井）

export function desertWell(): FeaturePlacer {
  const SANDSTONE = 'minecraft:sandstone'
  const SLAB = 'minecraft:sandstone_slab'
  const SAND = 'minecraft:sand'
  return (l, r, x, y0, z) => {
    let y = y0 + 1
    while (isAir(l.getBlock(x, y, z)) && y > l.minY + 2) y--
    if (l.getBlock(x, y, z) !== SAND) return false
    for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) if (isAir(l.getBlock(x + i, y - 1, z + j)) && isAir(l.getBlock(x + i, y - 2, z + j))) return false
    const set = (dx: number, dy: number, dz: number, s: string) => l.setBlock(x + dx, y + dy, z + dz, s)
    for (let i = -2; i <= 0; i++) for (let j = -2; j <= 2; j++) for (let k = -2; k <= 2; k++) set(j, i, k, SANDSTONE)
    set(0, 0, 0, WATER)
    for (const [dx, dz] of HORIZONTAL) set(dx, 0, dz, WATER)
    set(0, -1, 0, SAND)
    for (const [dx, dz] of HORIZONTAL) set(dx, -1, dz, SAND)
    for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) if (i === -2 || i === 2 || j === -2 || j === 2) set(i, 1, j, SANDSTONE)
    set(2, 1, 0, SLAB)
    set(-2, 1, 0, SLAB)
    set(0, 1, 2, SLAB)
    set(0, 1, -2, SLAB)
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) set(i, 4, j, i === 0 && j === 0 ? SANDSTONE : SLAB)
    for (let i = 1; i <= 3; i++) {
      set(-1, i, -1, SANDSTONE)
      set(-1, i, 1, SANDSTONE)
      set(1, i, -1, SANDSTONE)
      set(1, i, 1, SANDSTONE)
    }
    // 两格可疑的沙子：井中心或者四周之一，往下 1 格和 2 格
    const list: [number, number][] = [[0, 0], [1, 0], [0, 1], [-1, 0], [0, -1]]
    const a = list[r.nextInt(5)]
    set(a[0], -1, a[1], 'minecraft:suspicious_sand')
    const b = list[r.nextInt(5)]
    set(b[0], -2, b[1], 'minecraft:suspicious_sand')
    return true
  }
}

// ---------------------------------------------------------------- monster_room（地牢）

export function monsterRoom(): FeaturePlacer {
  return (l, r, x, y, z) => {
    const j = r.nextInt(2) + 2
    const k = -j - 1
    const lx = j + 1
    const o = r.nextInt(2) + 2
    const p = -o - 1
    const q = o + 1
    let holes = 0
    for (let s = k; s <= lx; s++)
      for (let t = -1; t <= 4; t++)
        for (let u = p; u <= q; u++) {
          const solid = blocksMotion(l.getBlock(x + s, y + t, z + u))
          if ((t === -1 || t === 4) && !solid) return false
          if ((s === k || s === lx || u === p || u === q) && t === 0 && isAir(l.getBlock(x + s, y, z + u)) && isAir(l.getBlock(x + s, y + 1, z + u))) holes++
        }
    if (holes < 1 || holes > 5) return false
    const safe = (px: number, py: number, pz: number, st: string) => {
      if (canReplace(l.getBlock(px, py, pz))) l.setBlock(px, py, pz, st)
    }
    for (let s = k; s <= lx; s++)
      for (let t = 3; t >= -1; t--)
        for (let u = p; u <= q; u++) {
          const px = x + s
          const py = y + t
          const pz = z + u
          const b = l.getBlock(px, py, pz)
          if (s === k || t === -1 || u === p || s === lx || u === q) {
            if (py >= l.minY && !blocksMotion(l.getBlock(px, py - 1, pz))) l.setBlock(px, py, pz, AIR)
            else if (blocksMotion(b) && b !== 'minecraft:chest') {
              if (t === -1 && r.nextInt(4) !== 0) safe(px, py, pz, 'minecraft:mossy_cobblestone')
              else safe(px, py, pz, 'minecraft:cobblestone')
            }
          } else if (b !== 'minecraft:chest' && b !== 'minecraft:spawner') safe(px, py, pz, AIR)
        }
    // 两个箱子，各试 3 次：贴着正好一面墙
    for (let s = 0; s < 2; s++)
      for (let t = 0; t < 3; t++) {
        const px = x + r.nextInt(j * 2 + 1) - j
        const pz = z + r.nextInt(o * 2 + 1) - o
        if (!isAir(l.getBlock(px, y, pz))) continue
        let walls = 0
        for (const [dx, dz] of HORIZONTAL) if (blocksMotion(l.getBlock(px + dx, y, pz + dz))) walls++
        if (walls !== 1) continue
        safe(px, y, pz, `minecraft:chest[facing=${reorientChest(l, px, y, pz)}]`)
        if (l.getBlock(px, y, pz) === 'minecraft:chest') r.nextLong() // 战利品表的种子
        break
      }
    safe(x, y, z, 'minecraft:spawner')
    if (l.getBlock(x, y, z) === 'minecraft:spawner') r.nextInt(4) // 刷什么怪
    return true
  }
}

// ---------------------------------------------------------------- underwater_magma（海底的岩浆块）

export function underwaterMagma(cfg: Record<string, unknown>): FeaturePlacer {
  const range = cfg.floor_search_range as number
  const radius = cfg.placement_radius_around_floor as number
  const prob = f32(cfg.placement_probability_per_valid_position as number)
  const waterOrAir = (b: string) => b === WATER || isAir(b)
  return (l, r, x, y, z) => {
    const col = scanColumn(l, x, y, z, range, (b) => b === WATER, (b) => b !== WATER)
    if (!col || col.floor === null) return false
    const fy = col.floor
    let placed = 0
    for (let pz = z - radius; pz <= z + radius; pz++)
      for (let py = fy - radius; py <= fy + radius; py++)
        for (let px = x - radius; px <= x + radius; px++) {
          if (!(r.nextFloat() < prob)) continue
          if (waterOrAir(l.getBlock(px, py, pz)) || waterOrAir(l.getBlock(px, py - 1, pz))) continue
          if (HORIZONTAL.some(([dx, dz]) => waterOrAir(l.getBlock(px + dx, py, pz + dz)))) continue
          l.setBlock(px, py, pz, 'minecraft:magma_block')
          placed++
        }
    return placed > 0
  }
}

// ---------------------------------------------------------------- geode（紫水晶晶洞）

export function geode(cfg: Record<string, unknown>): FeaturePlacer {
  const blocks = cfg.blocks as Record<string, unknown>
  const layers = cfg.layers as Record<string, number>
  const crack = cfg.crack as Record<string, number>
  const filling = stateProvider(blocks.filling_provider)
  const inner = stateProvider(blocks.inner_layer_provider)
  const alternate = stateProvider(blocks.alternate_inner_layer_provider)
  const middle = stateProvider(blocks.middle_layer_provider)
  const outer = stateProvider(blocks.outer_layer_provider)
  const placements = (blocks.inner_placements as unknown[]).map(parseState)
  const cannotReplace = matches(blocks.cannot_replace)
  const invalid = matches(blocks.invalid_blocks)
  const outerWall = intProvider(cfg.outer_wall_distance)
  const outerWallMax = intRange(cfg.outer_wall_distance)[1]
  const distribution = intProvider(cfg.distribution_points)
  const pointOffset = intProvider(cfg.point_offset)
  const minOff = (cfg.min_gen_offset as number | undefined) ?? -16
  const maxOff = (cfg.max_gen_offset as number | undefined) ?? 16
  const noiseMul = (cfg.noise_multiplier as number | undefined) ?? 0.05
  const threshold = (cfg.invalid_blocks_threshold as number) ?? 0
  const potentialChance = (cfg.use_potential_placements_chance as number | undefined) ?? 0.35
  const altChance = (cfg.use_alternate_layer0_chance as number | undefined) ?? 0
  const requireAlt = (cfg.placements_require_layer0_alternate as boolean | undefined) ?? true
  const crackChance = crack.generate_crack_chance ?? 1.0
  const baseCrack = crack.base_crack_size ?? 2.0
  const crackOffset = crack.crack_point_offset ?? 2
  let noise: NormalNoise | null = null
  let noiseSeed: bigint | null = null
  return (l, r, x, y, z) => {
    if (noiseSeed !== l.seed) {
      noise = NormalNoise.create(new LegacyRandomSource(l.seed), { firstOctave: -4, amplitudes: [1.0] })
      noiseSeed = l.seed
    }
    const k = distribution(r)
    const d = k / outerWallMax
    const e = 1.0 / Math.sqrt(layers.filling)
    const f = 1.0 / Math.sqrt(layers.inner_layer + d)
    const g = 1.0 / Math.sqrt(layers.middle_layer + d)
    const h = 1.0 / Math.sqrt(layers.outer_layer + d)
    const lc = 1.0 / Math.sqrt(baseCrack + r.nextDouble() / 2.0 + (k > 3 ? d : 0.0))
    const hasCrack = r.nextFloat() < crackChance
    let bad = 0
    const points: [number, number, number, number][] = []
    for (let n = 0; n < k; n++) {
      const px = x + outerWall(r)
      const py = y + outerWall(r)
      const pz = z + outerWall(r)
      const s = l.getBlock(px, py, pz)
      if (isAir(s) || invalid(s)) if (++bad > threshold) return false
      points.push([px, py, pz, pointOffset(r)])
    }
    const cracks: [number, number, number][] = []
    if (hasCrack) {
      const n = r.nextInt(4)
      const o = k * 2 + 1
      const [cx, cz] = n === 0 ? [o, 0] : n === 1 ? [0, o] : n === 2 ? [o, o] : [0, 0]
      for (const dy of [7, 5, 1]) cracks.push([x + cx, y + dy, z + cz])
    }
    const potential: [number, number, number][] = []
    const safe = (px: number, py: number, pz: number, s: string) => {
      if (!cannotReplace(l.getBlock(px, py, pz))) l.setBlock(px, py, pz, s)
    }
    for (let pz = z + minOff; pz <= z + maxOff; pz++)
      for (let py = y + minOff; py <= y + maxOff; py++)
        for (let px = x + minOff; px <= x + maxOff; px++) {
          const rr = noise!.getValue(px, py, pz) * noiseMul
          let s = 0.0
          let t = 0.0
          for (const [qx, qy, qz, off] of points) s += 1.0 / Math.sqrt((px - qx) ** 2 + (py - qy) ** 2 + (pz - qz) ** 2 + off) + rr
          for (const [qx, qy, qz] of cracks) t += 1.0 / Math.sqrt((px - qx) ** 2 + (py - qy) ** 2 + (pz - qz) ** 2 + crackOffset) + rr
          if (s < h) continue
          if (hasCrack && t >= lc && s < e) safe(px, py, pz, AIR)
          else if (s >= e) safe(px, py, pz, filling(r, px, py, pz))
          else if (s >= f) {
            const alt = r.nextFloat() < altChance
            safe(px, py, pz, alt ? alternate(r, px, py, pz) : inner(r, px, py, pz))
            if ((!requireAlt || alt) && r.nextFloat() < potentialChance) potential.push([px, py, pz])
          } else if (s >= g) safe(px, py, pz, middle(r, px, py, pz))
          else safe(px, py, pz, outer(r, px, py, pz))
        }
    // 紫水晶芽：贴着母岩，朝第一个空着（空气或水源）的方向长
    // v7：芽的 facing = 长出去的方向；长进水源里的含水（原版按 Direction.values() 的顺序试）
    const FACING = ['down', 'up', 'north', 'south', 'west', 'east']
    for (const [px, py, pz] of potential) {
      const s = placements[r.nextInt(placements.length)]
      for (let d = 0; d < 6; d++) {
        const [dx, dy, dz] = DIRS[d]
        const b = l.getBlock(px + dx, py + dy, pz + dz)
        if (isAir(b) || b === WATER) {
          let st = s
          if (/_bud|amethyst_cluster/.test(st)) st = withProp(withProp(st, 'facing', FACING[d]), 'waterlogged', l.getState(px + dx, py + dy, pz + dz) === 'minecraft:water[level=0]')
          safe(px + dx, py + dy, pz + dz, st)
          break
        }
      }
    }
    return true
  }
}

// ---------------------------------------------------------------- 滴水石（原版 DripstoneUtils + 三个 Feature）

const isDripstoneBase = (b: string) => b === 'minecraft:dripstone_block' || inTag(b, 'minecraft:dripstone_replaceable_blocks')
const isDripstoneBaseOrLava = (b: string) => isDripstoneBase(b) || b === LAVA
const isEmptyOrWater = (b: string) => isAir(b) || b === WATER
const isNeitherEmptyNorWater = (b: string) => !isAir(b) && b !== WATER
const isEmptyOrWaterOrLava = (b: string) => isAir(b) || b === WATER || b === LAVA
const placeDripstoneBlock = (l: WorldGenLevel, x: number, y: number, z: number) => {
  if (!inTag(l.getBlock(x, y, z), 'minecraft:dripstone_replaceable_blocks')) return false
  l.setBlock(x, y, z, 'minecraft:dripstone_block')
  return true
}
/**
 * 原版 growPointedDripstone：从根往 dir 方向长一根 height 格的滴水石锥（根的反方向要是滴水石块）。
 * v7：每格的状态按原版 buildBaseToTipColumn——根部 base、中间 middle、倒数第二格 frustum、尖 tip
 * （上下两根连在一起时尖是 tip_merge）；朝向 up / down；在水里的含水
 */
function growPointedDripstone(l: WorldGenLevel, x: number, y: number, z: number, dir: 1 | -1, height: number, mergeTips = false) {
  if (!isDripstoneBase(l.getBlock(x, y - dir, z))) return
  const parts: string[] = []
  if (height >= 3) {
    parts.push('base')
    for (let i = 0; i < height - 3; i++) parts.push('middle')
  }
  if (height >= 2) parts.push('frustum')
  if (height >= 1) parts.push(mergeTips ? 'tip_merge' : 'tip')
  const vd = dir > 0 ? 'up' : 'down'
  parts.forEach((t, i) => {
    const py = y + i * dir
    const wet = l.getState(x, py, z) === 'minecraft:water[level=0]'
    l.setBlock(x, py, z, `minecraft:pointed_dripstone[thickness=${t},vertical_direction=${vd},waterlogged=${wet}]`)
  })
}

export function pointedDripstone(cfg: Record<string, unknown>): FeaturePlacer {
  const taller = f32((cfg.chance_of_taller_dripstone as number | undefined) ?? 0.2)
  const spread = f32((cfg.chance_of_directional_spread as number | undefined) ?? 0.7)
  const r2 = f32((cfg.chance_of_spread_radius2 as number | undefined) ?? 0.5)
  const r3 = f32((cfg.chance_of_spread_radius3 as number | undefined) ?? 0.5)
  return (l, r, x, y, z) => {
    const up = isDripstoneBase(l.getBlock(x, y + 1, z))
    const down = isDripstoneBase(l.getBlock(x, y - 1, z))
    let dir: 1 | -1
    if (up && down) dir = r.nextBoolean() ? -1 : 1
    else if (up) dir = -1
    else if (down) dir = 1
    else return false
    // 根上铺一小片滴水石块
    const ry = y - dir
    placeDripstoneBlock(l, x, ry, z)
    for (const [dx, dz] of HORIZONTAL) {
      if (r.nextFloat() > spread) continue
      const px = x + dx
      const pz = z + dz
      placeDripstoneBlock(l, px, ry, pz)
      if (r.nextFloat() > r2) continue
      const d2 = DIRS[r.nextInt(6)]
      const qx = px + d2[0]
      const qy = ry + d2[1]
      const qz = pz + d2[2]
      placeDripstoneBlock(l, qx, qy, qz)
      if (r.nextFloat() > r3) continue
      const d3 = DIRS[r.nextInt(6)]
      placeDripstoneBlock(l, qx + d3[0], qy + d3[1], qz + d3[2])
    }
    const n = r.nextFloat() < taller && isEmptyOrWater(l.getBlock(x, y + dir, z)) ? 2 : 1
    growPointedDripstone(l, x, y, z, dir, n)
    return true
  }
}

/** 原版 Mth.clampedMap（float 版） */
const clampedMapF = (v: number, a: number, b: number, c: number, d: number) => {
  const t = f32(f32(v - a) / f32(b - a))
  return t < 0 ? c : t > 1 ? d : f32(c + f32(t * f32(d - c)))
}

export function dripstoneCluster(cfg: Record<string, unknown>): FeaturePlacer {
  const searchRange = cfg.floor_to_ceiling_search_range as number
  const heightP = intProvider(cfg.height)
  const radiusP = intProvider(cfg.radius)
  const maxDiff = cfg.max_stalagmite_stalactite_height_diff as number
  const heightDeviation = cfg.height_deviation as number
  const layerThickness = intProvider(cfg.dripstone_block_layer_thickness)
  const densityP = floatProvider(cfg.density)
  const wetnessP = floatProvider(cfg.wetness)
  const chanceAtMax = f32(cfg.chance_of_dripstone_column_at_max_distance_from_center as number)
  const maxEdge = cfg.max_distance_from_edge_affecting_chance_of_dripstone_column as number
  const maxCenter = cfg.max_distance_from_center_affecting_height_bias as number

  const replaceWithDripstone = (l: WorldGenLevel, x: number, y: number, z: number, n: number, dir: number) => {
    for (let i = 0; i < n; i++) if (!placeDripstoneBlock(l, x, y + i * dir, z)) return
  }
  const dripstoneHeight = (r: RandomSource, dx: number, dz: number, density: number, height: number) => {
    if (r.nextFloat() > density) return 0
    const i = Math.abs(dx) + Math.abs(dz)
    const t = Math.min(Math.max(i / maxCenter, 0), 1)
    const mean = f32(i >= maxCenter ? 0 : height / 2.0 + t * (0.0 - height / 2.0))
    const v = Math.min(Math.max(f32(mean + f32(f32(r.nextGaussian()) * heightDeviation)), 0), height)
    return Math.trunc(v)
  }
  const canPlacePool = (l: WorldGenLevel, x: number, y: number, z: number) => {
    const b = l.getBlock(x, y, z)
    if (b === WATER || b === 'minecraft:dripstone_block' || b === 'minecraft:pointed_dripstone') return false
    if (l.getBlock(x, y + 1, z) === WATER) return false
    const adjacentOk = (n: string) => isStone(n) || n === WATER
    for (const [dx, dz] of HORIZONTAL) if (!adjacentOk(l.getBlock(x + dx, y, z + dz))) return false
    // 下面也要是石头或水（v5.2：v5.1 漏了这一条）
    return adjacentOk(l.getBlock(x, y - 1, z))
  }

  return (l, r, x, y, z) => {
    if (!isEmptyOrWater(l.getBlock(x, y, z))) return false
    const height = heightP(r)
    const wetness = wetnessP(r)
    const density = densityP(r)
    const xr = radiusP(r)
    const zr = radiusP(r)
    for (let dx = -xr; dx <= xr; dx++)
      for (let dz = -zr; dz <= zr; dz++) {
        const chance = clampedMapF(Math.min(xr - Math.abs(dx), zr - Math.abs(dz)), 0, maxEdge, chanceAtMax, 1)
        const px = x + dx
        const pz = z + dz
        const col = scanColumn(l, px, y, pz, searchRange, isEmptyOrWater, isNeitherEmptyNorWater)
        if (!col) continue
        const ceil = col.ceiling
        const floor0 = col.floor
        if (ceil === null && floor0 === null) continue
        const wet = r.nextFloat() < wetness
        let floor = floor0
        if (wet && floor0 !== null && canPlacePool(l, px, floor0, pz)) {
          floor = floor0 - 1
          l.setBlock(px, floor0, pz, WATER)
        }
        const column = { floor, ceiling: ceil }
        let j = 0
        if (ceil !== null && r.nextDouble() < chance && l.getBlock(px, ceil, pz) !== LAVA) {
          replaceWithDripstone(l, px, ceil, pz, layerThickness(r), 1)
          j = dripstoneHeight(r, dx, dz, density, floor !== null ? Math.min(height, ceil - floor) : height)
        }
        let m = 0
        if (floor !== null && r.nextDouble() < chance && l.getBlock(px, floor, pz) !== LAVA) {
          replaceWithDripstone(l, px, floor, pz, layerThickness(r), -1)
          m = ceil !== null ? Math.max(0, j + (r.nextInt(maxDiff * 2 + 1) - maxDiff)) : dripstoneHeight(r, dx, dz, density, height)
        }
        let t: number
        let u: number
        if (ceil !== null && floor !== null && ceil - j <= floor + m) {
          const p = Math.max(ceil - j, floor + 1)
          const q = Math.min(floor + m, ceil - 1)
          const rr = p + r.nextInt(q + 1 - p + 1)
          t = ceil - rr
          u = rr - 1 - floor
        } else {
          t = j
          u = m
        }
        // 两根正好连起来时，尖是 tip_merge（v7）
        const merge = r.nextBoolean() && t > 0 && u > 0 && ceil !== null && floor !== null && t + u === ceil - floor - 1
        void columnHeight(column)
        if (ceil !== null) growPointedDripstone(l, px, ceil - 1, pz, -1, t, merge)
        if (floor !== null) growPointedDripstone(l, px, floor + 1, pz, 1, u, merge)
      }
    return true
  }
}

export function largeDripstone(cfg: Record<string, unknown>): FeaturePlacer {
  const searchRange = (cfg.floor_to_ceiling_search_range as number | undefined) ?? 30
  const [rMin, rMax] = intRange(cfg.column_radius)
  const heightScale = floatProvider(cfg.height_scale)
  const ratio = f32(cfg.max_column_radius_to_cave_height_ratio as number)
  const stalactiteBluntness = floatProvider(cfg.stalactite_bluntness)
  const stalagmiteBluntness = floatProvider(cfg.stalagmite_bluntness)
  const windSpeed = floatProvider(cfg.wind_speed)
  const minRadiusWind = cfg.min_radius_for_wind as number
  const minBluntnessWind = f32(cfg.min_bluntness_for_wind as number)

  const dripHeight = (rad: number, radius: number, scale: number, bluntness: number) => {
    const rr = rad < bluntness ? bluntness : rad
    const f = (rr / radius) * 0.384
    const g = 0.75 * Math.pow(f, 1.3333333333333333)
    const h = Math.pow(f, 0.6666666666666666)
    const i = 0.3333333333333333 * Math.log(f)
    const j = Math.max(scale * (g - h - i), 0.0)
    return (j / 0.384) * radius
  }
  type Wind = ((x: number, y: number, z: number) => [number, number]) | null
  const offset = (w: Wind, x: number, y: number, z: number): [number, number] => (w ? w(x, y, z) : [x, z])
  const embedded = (l: WorldGenLevel, x: number, y: number, z: number, radius: number) => {
    if (isEmptyOrWaterOrLava(l.getBlock(x, y, z))) return false
    const f = f32(6.0 / radius)
    for (let g = 0; g < f32(Math.PI * 2); g = f32(g + f)) {
      const i = Math.trunc(f32(cos(g) * radius))
      const j = Math.trunc(f32(sin(g) * radius))
      if (isEmptyOrWaterOrLava(l.getBlock(x + i, y, z + j))) return false
    }
    return true
  }
  interface Drip {
    x: number
    y: number
    z: number
    up: boolean
    radius: number
    bluntness: number
    scale: number
  }
  const heightAt = (d: Drip, rad: number) => Math.trunc(dripHeight(rad, d.radius, d.scale, d.bluntness))
  const moveBack = (l: WorldGenLevel, d: Drip, w: Wind) => {
    while (d.radius > 1) {
      let y = d.y
      const n = Math.min(10, heightAt(d, 0))
      for (let j = 0; j < n; j++) {
        if (l.getBlock(d.x, y, d.z) === LAVA) return false
        const [ox, oz] = offset(w, d.x, y, d.z)
        if (embedded(l, ox, y, oz, d.radius)) {
          d.y = y
          return true
        }
        y += d.up ? -1 : 1
      }
      d.radius = (d.radius / 2) | 0
    }
    return false
  }
  const placeBlocks = (l: WorldGenLevel, r: RandomSource, d: Drip, w: Wind) => {
    for (let i = -d.radius; i <= d.radius; i++)
      for (let j = -d.radius; j <= d.radius; j++) {
        const f = f32(Math.sqrt(f32(i * i + j * j)))
        if (f > d.radius) continue
        let k = heightAt(d, f)
        if (k <= 0) continue
        if (r.nextFloat() < 0.2) k = Math.trunc(f32(k * f32(f32(r.nextFloat() * f32(1 - f32(0.8))) + f32(0.8))))
        const x = d.x + i
        const z = d.z + j
        let y = d.y
        let placed = false
        const top = d.up ? l.getHeight('WORLD_SURFACE_WG', x, z) : 2147483647
        for (let n = 0; n < k && y < top; n++) {
          const [ox, oz] = offset(w, x, y, z)
          const b = l.getBlock(ox, y, oz)
          if (isEmptyOrWaterOrLava(b)) {
            placed = true
            l.setBlock(ox, y, oz, 'minecraft:dripstone_block')
          } else if (placed && isStone(b)) break
          y += d.up ? 1 : -1
        }
      }
  }
  return (l, r, x, y, z) => {
    if (!isEmptyOrWater(l.getBlock(x, y, z))) return false
    const col = scanColumn(l, x, y, z, searchRange, isEmptyOrWater, isDripstoneBaseOrLava)
    if (!col || col.floor === null || col.ceiling === null) return false
    const ch = col.ceiling - col.floor - 1
    if (ch < 4) return false
    const i = Math.trunc(f32(ch * ratio))
    const jj = Math.min(Math.max(i, rMin), rMax)
    const k = rMin + r.nextInt(jj - rMin + 1)
    const a: Drip = { x, y: col.ceiling - 1, z, up: false, radius: k, bluntness: stalactiteBluntness(r), scale: heightScale(r) }
    const b: Drip = { x, y: col.floor + 1, z, up: true, radius: k, bluntness: stalagmiteBluntness(r), scale: heightScale(r) }
    let w: Wind = null
    const suitable = (d: Drip) => d.radius >= minRadiusWind && d.bluntness >= minBluntnessWind
    if (suitable(a) && suitable(b)) {
      const speed = windSpeed(r)
      const g = f32(r.nextFloat() * f32(Math.PI))
      const vx = f32(cos(g) * speed)
      const vz = f32(sin(g) * speed)
      w = (px, py, pz) => [px + Math.floor(vx * (y - py)), pz + Math.floor(vz * (y - py))]
    }
    const okA = moveBack(l, a, w)
    const okB = moveBack(l, b, w)
    if (okA) placeBlocks(l, r, a, w)
    if (okB) placeBlocks(l, r, b, w)
    return true
  }
}


// ---------------------------------------------------------------- iceberg（冰山）

export function iceberg(cfg: Record<string, unknown>): FeaturePlacer {
  const state = parseState(cfg.state)
  const PACKED = 'minecraft:packed_ice'
  const SNOW_BLOCK = 'minecraft:snow_block'
  const isIcebergState = (b: string) => b === PACKED || b === SNOW_BLOCK || b === 'minecraft:blue_ice'
  const pow2 = (v: number) => v * v
  const ceilF = (v: number) => Math.ceil(v)

  const radiusRound = (r: RandomSource, y: number, height: number, value: number) => {
    const f = f32(3.5 - r.nextFloat())
    let g = f32(f32(1.0 - f32(f32(pow2(y)) / f32(height * f))) * value)
    if (height > 15 + r.nextInt(5)) {
      const i = y < 3 + r.nextInt(6) ? (y / 2) | 0 : y
      g = f32(f32(1.0 - f32(i / f32(f32(height * f) * f32(0.4)))) * value)
    }
    return ceilF(f32(g / 2))
  }
  const radiusEllipse = (y: number, height: number, value: number) => ceilF(f32(f32(f32(1.0 - f32(f32(pow2(y)) / f32(height))) * value) / 2))
  const radiusSteep = (r: RandomSource, y: number, height: number, value: number) => {
    const f = f32(1.0 + f32(r.nextFloat() / 2))
    return ceilF(f32(f32(f32(1.0 - f32(y / f32(height * f))) * value) / 2))
  }
  const ellipseC = (y: number, height: number, value: number) => (y > 0 && height - y <= 3 ? value - (4 - (height - y)) : value)
  const distCircle = (x: number, z: number, radius: number, r: RandomSource) => {
    const f = f32(f32(10.0 * Math.min(Math.max(r.nextFloat(), f32(0.2)), f32(0.8))) / radius)
    return f + pow2(x) + pow2(z) - pow2(radius)
  }
  const distEllipse = (x: number, z: number, ox: number, oz: number, a: number, c: number, angle: number) =>
    pow2(((x - ox) * Math.cos(angle) - (z - oz) * Math.sin(angle)) / a) + pow2(((x - ox) * Math.sin(angle) + (z - oz) * Math.cos(angle)) / c) - 1.0

  const setIcebergBlock = (l: WorldGenLevel, r: RandomSource, x: number, y: number, z: number, remaining: number, height: number, ellipse: boolean, snow: boolean) => {
    const s = l.getBlock(x, y, z)
    if (!(isAir(s) || s === SNOW_BLOCK || s === 'minecraft:ice' || s === WATER)) return
    const bl3 = !ellipse || r.nextDouble() > 0.05
    const i = ellipse ? 3 : 2
    if (snow && s !== WATER && remaining <= r.nextInt(Math.max(1, (height / i) | 0)) + height * 0.6 && bl3) l.setBlock(x, y, z, SNOW_BLOCK)
    else l.setBlock(x, y, z, state)
  }
  const generateBlock = (l: WorldGenLevel, r: RandomSource, px: number, py: number, pz: number, height: number, x: number, y: number, z: number, radius: number, o: number, ellipse: boolean, j: number, angle: number, snow: boolean) => {
    const d = ellipse ? distEllipse(x, z, 0, 0, o, ellipseC(y, height, j), angle) : distCircle(x, z, radius, r)
    if (!(d < 0.0)) return
    const e = ellipse ? -0.5 : -6 - r.nextInt(3)
    if (d > e && r.nextDouble() > 0.9) return
    setIcebergBlock(l, r, px + x, py + y, pz + z, height - y, height, ellipse, snow)
  }
  const carve = (l: WorldGenLevel, radius: number, y: number, px: number, py: number, pz: number, water: boolean, angle: number, ox: number, oz: number, i: number, j: number) => {
    const k = radius + 1 + ((i / 3) | 0)
    const m = Math.min(radius - 3, 3) + ((j / 2) | 0) - 1
    for (let a = -k; a < k; a++)
      for (let b = -k; b < k; b++) {
        if (!(distEllipse(a, b, ox, oz, k, m, angle) < 0.0)) continue
        const s = l.getBlock(px + a, py + y, pz + b)
        if (!isIcebergState(s) && s !== SNOW_BLOCK) continue
        if (water) l.setBlock(px + a, py + y, pz + b, WATER)
        else {
          l.setBlock(px + a, py + y, pz + b, AIR)
          if (l.getBlock(px + a, py + y + 1, pz + b) === 'minecraft:snow') l.setBlock(px + a, py + y + 1, pz + b, AIR)
        }
      }
  }
  const cutOut = (l: WorldGenLevel, r: RandomSource, width: number, height: number, px: number, py: number, pz: number, ellipse: boolean, i: number, angle: number, j: number) => {
    const sx = r.nextBoolean() ? -1 : 1
    const sz = r.nextBoolean() ? -1 : 1
    const half = (width / 2) | 0
    let n = r.nextInt(Math.max(half - 2, 1))
    if (r.nextBoolean()) n = half + 1 - r.nextInt(Math.max(width - half - 1, 1))
    let o = r.nextInt(Math.max(half - 2, 1))
    if (r.nextBoolean()) o = half + 1 - r.nextInt(Math.max(width - half - 1, 1))
    if (ellipse) n = o = r.nextInt(Math.max(i - 5, 1))
    const ox = sx * n
    const oz = sz * o
    const d = ellipse ? angle + 1.5707963267948966 : r.nextDouble() * 2.0 * Math.PI
    for (let p = 0; p < height - 3; p++) carve(l, radiusRound(r, p, height, width), p, px, py, pz, false, d, ox, oz, i, j)
    for (let p = -1; p > -height + r.nextInt(5); p--) carve(l, radiusSteep(r, -p, height, width), p, px, py, pz, true, d, ox, oz, i, j)
  }
  const smooth = (l: WorldGenLevel, px: number, py: number, pz: number, width: number, height: number, ellipse: boolean, i: number) => {
    const j = ellipse ? i : (width / 2) | 0
    for (let a = -j; a <= j; a++)
      for (let b = -j; b <= j; b++)
        for (let m = 0; m <= height; m++) {
          const x = px + a
          const y = py + m
          const z = pz + b
          const s = l.getBlock(x, y, z)
          if (!isIcebergState(s) && s !== 'minecraft:snow') continue
          if (isAir(l.getBlock(x, y - 1, z))) {
            l.setBlock(x, y, z, AIR)
            l.setBlock(x, y + 1, z, AIR)
          } else if (isIcebergState(s)) {
            const n = [l.getBlock(x - 1, y, z), l.getBlock(x + 1, y, z), l.getBlock(x, y, z - 1), l.getBlock(x, y, z + 1)].filter((b2) => !isIcebergState(b2)).length
            if (n >= 3) l.setBlock(x, y, z, AIR)
          }
        }
  }

  return (l, r, x, _y, z) => {
    const y = l.seaLevel
    const snow = r.nextDouble() > 0.7
    const d = r.nextDouble() * 2.0 * Math.PI
    const i = 11 - r.nextInt(5)
    const j = 3 + r.nextInt(3)
    const ellipse = r.nextDouble() > 0.7
    let h = ellipse ? r.nextInt(6) + 6 : r.nextInt(15) + 3
    if (!ellipse && r.nextDouble() > 0.9) h += r.nextInt(19) + 7
    const m = Math.min(h + r.nextInt(11), 18)
    const n = Math.min(h + r.nextInt(7) - r.nextInt(5), 11)
    const o = ellipse ? i : 11
    for (let p = -o; p < o; p++)
      for (let q = -o; q < o; q++)
        for (let rr = 0; rr < h; rr++) {
          const s = ellipse ? radiusEllipse(rr, h, n) : radiusRound(r, rr, h, n)
          if (ellipse || p < s) generateBlock(l, r, x, y, z, h, p, rr, q, s, o, ellipse, j, d, snow)
        }
    smooth(l, x, y, z, n, h, ellipse, i)
    for (let p = -o; p < o; p++)
      for (let q = -o; q < o; q++)
        for (let rr = -1; rr > -m; rr--) {
          const s = ellipse ? Math.ceil(f32(o * f32(1.0 - f32(f32(pow2(rr)) / f32(m * 8.0))))) : o
          const t = radiusSteep(r, -rr, m, n)
          if (p < t) generateBlock(l, r, x, y, z, m, p, rr, q, t, s, ellipse, j, d, snow)
        }
    const cut = ellipse ? r.nextDouble() > 0.1 : r.nextDouble() > 0.7
    if (cut) cutOut(l, r, n, h, x, y, z, ellipse, i, d, j)
    return true
  }
}
