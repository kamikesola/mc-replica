/**
 * 植物类地物（v5.1）：花草、甘蔗、海草、海带、海泡菜、竹子、藤蔓、发光地衣……
 * 都对应原版 net.minecraft.world.level.levelgen.feature 下的同名类，随机数的消耗顺序和原版一致
 * （用 javap 对过字节码，见 docs/notes/v5.1-notes.md）。
 */
import { blockName, blockPredicate, blocksMotion, propOfState, withProp, canSurvive, intProvider, isAir, isDoublePlant, isSturdy, parseState, stateProvider, type WorldGenLevel } from './core'
import { inTag } from './tags'
import type { FeaturePlacer } from './placement'
import { javaHashOrder } from './tree'
import type { RandomSource } from '../random/RandomSource'

type Nested = (l: WorldGenLevel, r: RandomSource, x: number, y: number, z: number) => boolean
type Dir = [number, number, number]

const f32 = Math.fround
const WATER = 'minecraft:water'
/** 原版 Direction.values() 的顺序：下、上、北、南、西、东 */
export const DIRECTIONS: Dir[] = [[0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1], [-1, 0, 0], [1, 0, 0]]
const UP = 1
const DOWN = 0
/** 原版 Direction.Plane.HORIZONTAL 的顺序：北、东、南、西（下标是 DIRECTIONS 里的） */
const HORIZONTAL_PLANE = [2, 5, 3, 4]
const opposite = (d: number) => d ^ 1
const axis = (d: number) => d >> 1

/** 原版 Util.shuffle：从后往前，每次和 [0, i) 里随机一个交换 */
export function shuffle<T>(list: T[], r: RandomSource): T[] {
  for (let i = list.length; i > 1; i--) {
    const j = r.nextInt(i)
    const t = list[i - 1]
    list[i - 1] = list[j]
    list[j] = t
  }
  return list
}

/** 原版 DoublePlantBlock.placeAt：下半格 + 上半格（v7：上半格 half=upper） */
export function placePlant(l: WorldGenLevel, state: string, x: number, y: number, z: number) {
  l.setBlock(x, y, z, state)
  if (isDoublePlant(state)) l.setBlock(x, y + 1, z, withProp(state, 'half', 'upper'))
}

/** 多面方块（藤蔓、发光地衣、幽匿脉络）的面对应的属性，按 DIRECTIONS 的顺序 */
const FACE_PROPS = ['down', 'up', 'north', 'south', 'west', 'east']

/** 这一格的多面方块贴着哪几面（v7：从方块状态读；不是这种方块就是 0），6 位掩码按 DIRECTIONS 的顺序 */
export function faceMask(l: WorldGenLevel, x: number, y: number, z: number, block: string): number {
  const s = l.getState(x, y, z)
  if (blockName(s) !== block) return 0
  let m = 0
  for (let d = 0; d < 6; d++) if (propOfState(s, FACE_PROPS[d]) === 'true') m |= 1 << d
  return m
}

/**
 * 把这一格设成贴着 mask 这几面的多面方块（v7）。
 * 原版 MultifaceBlock.getStateForPlacement：放进水源里的是含水的；原来就是这种方块的保留含水
 */
export function setFaces(l: WorldGenLevel, x: number, y: number, z: number, block: string, mask: number): boolean {
  const cur = l.getState(x, y, z)
  let s = block
  if (cur === 'minecraft:water[level=0]' || (blockName(cur) === block && propOfState(cur, 'waterlogged') === 'true')) s = withProp(s, 'waterlogged', 'true')
  for (let d = 0; d < 6; d++) if (mask & (1 << d)) s = withProp(s, FACE_PROPS[d], 'true')
  return l.setBlock(x, y, z, s)
}

// ---------------------------------------------------------------- random_patch / flower / no_bonemeal_flower

export function randomPatch(cfg: Record<string, unknown>, nested: (ref: unknown) => Nested): FeaturePlacer {
  const tries = (cfg.tries as number | undefined) ?? 128
  const j = ((cfg.xz_spread as number | undefined) ?? 7) + 1
  const k = ((cfg.y_spread as number | undefined) ?? 3) + 1
  const feature = nested(cfg.feature)
  return (l, r, x, y, z) => {
    let placed = 0
    for (let n = 0; n < tries; n++) {
      const dx = r.nextInt(j) - r.nextInt(j)
      const dy = r.nextInt(k) - r.nextInt(k)
      const dz = r.nextInt(j) - r.nextInt(j)
      if (feature(l, r, x + dx, y + dy, z + dz)) placed++
    }
    return placed > 0
  }
}

// ---------------------------------------------------------------- simple_block

export function simpleBlock(cfg: Record<string, unknown>): FeaturePlacer {
  const toPlace = stateProvider(cfg.to_place)
  return (l, r, x, y, z) => {
    const state = toPlace(r, x, y, z)
    if (!canSurvive(state, l, x, y, z)) return false
    if (isDoublePlant(state)) {
      if (!isAir(l.getBlock(x, y + 1, z))) return false
      placePlant(l, state, x, y, z)
    } else {
      // 苍白苔藓地毯原版还会随机在上面再放一层（用的是 WorldGenRegion 自己的随机数，不是地物的），这里不放
      l.setBlock(x, y, z, state)
    }
    return true
  }
}

// ---------------------------------------------------------------- block_column（甘蔗、仙人掌、大垂滴叶、洞穴藤蔓）

const DIR_BY_NAME: Record<string, Dir> = { down: [0, -1, 0], up: [0, 1, 0], north: [0, 0, -1], south: [0, 0, 1], west: [-1, 0, 0], east: [1, 0, 0] }

export function blockColumn(cfg: Record<string, unknown>): FeaturePlacer {
  const layers = (cfg.layers as { height: unknown; provider: unknown }[]).map((e) => ({ height: intProvider(e.height), provider: stateProvider(e.provider) }))
  const [dx, dy, dz] = DIR_BY_NAME[cfg.direction as string]
  const allowed = blockPredicate(cfg.allowed_placement)
  const prioritizeTip = cfg.prioritize_tip as boolean
  return (l, r, x, y, z) => {
    const hs = layers.map((e) => e.height(r))
    const total = hs.reduce((a, b) => a + b, 0)
    if (total === 0) return false
    // 先往前探，被挡住就截短（prioritize_tip：先砍前面的层，保住最后一层“尖”）
    let px = x + dx
    let py = y + dy
    let pz = z + dz
    for (let i = 0; i < total; i++) {
      if (!allowed(l, px, py, pz)) {
        let left = total - i
        const step = prioritizeTip ? 1 : -1
        const end = prioritizeTip ? hs.length : -1
        for (let o = prioritizeTip ? 0 : hs.length - 1; o !== end && left > 0; o += step) {
          const q = Math.min(hs[o], left)
          left -= q
          hs[o] -= q
        }
        break
      }
      px += dx
      py += dy
      pz += dz
    }
    let cx = x
    let cy = y
    let cz = z
    for (let i = 0; i < layers.length; i++) {
      for (let n = 0; n < hs[i]; n++) {
        l.setBlock(cx, cy, cz, layers[i].provider(r, cx, cy, cz))
        cx += dx
        cy += dy
        cz += dz
      }
    }
    return true
  }
}

// ---------------------------------------------------------------- 海草、海带、海泡菜

export function seagrass(cfg: Record<string, unknown>): FeaturePlacer {
  const probability = f32(cfg.probability as number)
  return (l, r, x0, _y, z0) => {
    const x = x0 + r.nextInt(8) - r.nextInt(8)
    const z = z0 + r.nextInt(8) - r.nextInt(8)
    const y = l.getHeight('OCEAN_FLOOR', x, z)
    if (l.getBlock(x, y, z) !== WATER) return false
    const tall = r.nextDouble() < probability
    const state = tall ? 'minecraft:tall_seagrass' : 'minecraft:seagrass'
    if (!canSurvive(state, l, x, y, z)) return false
    if (tall) {
      if (l.getBlock(x, y + 1, z) === WATER) {
        l.setBlock(x, y, z, state)
        l.setBlock(x, y + 1, z, withProp(state, 'half', 'upper'))
      }
    } else l.setBlock(x, y, z, state)
    return true
  }
}

export function kelp(): FeaturePlacer {
  return (l, r, x, _y, z) => {
    let placed = 0
    let y = l.getHeight('OCEAN_FLOOR', x, z)
    if (l.getBlock(x, y, z) !== WATER) return false
    const k = 1 + r.nextInt(10)
    for (let i = 0; i <= k; i++) {
      if (l.getBlock(x, y, z) === WATER && l.getBlock(x, y + 1, z) === WATER && canSurvive('minecraft:kelp_plant', l, x, y, z)) {
        if (i === k) {
          l.setBlock(x, y, z, `minecraft:kelp[age=${r.nextInt(4) + 20}]`) // 顶端的 age 20..23
          placed++
        } else l.setBlock(x, y, z, 'minecraft:kelp_plant')
      } else if (i > 0) {
        if (canSurvive('minecraft:kelp', l, x, y - 1, z) && l.getBlock(x, y - 2, z) !== 'minecraft:kelp') {
          l.setBlock(x, y - 1, z, `minecraft:kelp[age=${r.nextInt(4) + 20}]`)
          placed++
        }
        break
      }
      y++
    }
    return placed > 0
  }
}

export function seaPickle(cfg: Record<string, unknown>): FeaturePlacer {
  const count = intProvider(cfg.count)
  return (l, r, x0, _y, z0) => {
    let placed = 0
    const n = count(r)
    for (let j = 0; j < n; j++) {
      const dx = r.nextInt(8) - r.nextInt(8)
      const dz = r.nextInt(8) - r.nextInt(8)
      const x = x0 + dx
      const z = z0 + dz
      const y = l.getHeight('OCEAN_FLOOR', x, z)
      const pickles = r.nextInt(4) + 1 // 几个海泡菜（v7：写进 pickles 属性，越多越亮）
      if (l.getBlock(x, y, z) === WATER && canSurvive('minecraft:sea_pickle', l, x, y, z)) {
        l.setBlock(x, y, z, `minecraft:sea_pickle[pickles=${pickles}]`)
        placed++
      }
    }
    return placed > 0
  }
}

// ---------------------------------------------------------------- 竹子

export function bamboo(cfg: Record<string, unknown>): FeaturePlacer {
  const probability = f32(cfg.probability as number)
  return (l, r, x, y0, z) => {
    if (!isAir(l.getBlock(x, y0, z))) return false
    if (canSurvive('minecraft:bamboo', l, x, y0, z)) {
      const j = r.nextInt(12) + 5
      if (r.nextFloat() < probability) {
        // 底下铺一圈灰化土
        const k = r.nextInt(4) + 1
        for (let px = x - k; px <= x + k; px++)
          for (let pz = z - k; pz <= z + k; pz++) {
            const n = px - x
            const o = pz - z
            if (n * n + o * o > k * k) continue
            const py = l.getHeight('WORLD_SURFACE', px, pz) - 1
            if (inTag(l.getBlock(px, py, pz), 'minecraft:dirt')) l.setBlock(px, py, pz, 'minecraft:podzol')
          }
      }
      // v7：原版的竹子状态——茎 age=1；最上面一格大叶子、stage=1，下面两格大叶子、小叶子
      const TRUNK = 'minecraft:bamboo[age=1,leaves=none,stage=0]'
      let y = y0
      for (let i = 0; i < j && isAir(l.getBlock(x, y, z)); i++) l.setBlock(x, y++, z, TRUNK)
      if (y - y0 >= 3) {
        l.setBlock(x, y, z, 'minecraft:bamboo[age=1,leaves=large,stage=1]')
        l.setBlock(x, y - 1, z, 'minecraft:bamboo[age=1,leaves=large,stage=0]')
        l.setBlock(x, y - 2, z, 'minecraft:bamboo[age=1,leaves=small,stage=0]')
      }
    }
    return true
  }
}

// ---------------------------------------------------------------- 藤蔓

export function vines(): FeaturePlacer {
  return (l, _r, x, y, z) => {
    if (!isAir(l.getBlock(x, y, z))) return false
    for (let d = 1; d < 6; d++) {
      const [dx, dy, dz] = DIRECTIONS[d]
      const b = l.getBlock(x + dx, y + dy, z + dz)
      if (isSturdy(b)) {
        l.setBlock(x, y, z, `minecraft:vine[${FACE_PROPS[d]}=true]`) // 只贴第一面（原版 VinesFeature）
        return true
      }
    }
    return false
  }
}

// ---------------------------------------------------------------- multiface_growth（发光地衣、幽匿脉络）

/**
 * 原版 MultifaceGrowthFeature + MultifaceSpreader（默认配置）。
 * 我们的方块不记录“贴在哪几个面上”，所以只关心“这一格要不要变成地衣”；随机数照原版消耗。
 */
export function multifaceGrowth(cfg: Record<string, unknown>): FeaturePlacer {
  const block = parseState({ Name: cfg.block })
  const searchRange = (cfg.search_range as number | undefined) ?? 10
  const floor = (cfg.can_place_on_floor as boolean | undefined) ?? false
  const ceiling = (cfg.can_place_on_ceiling as boolean | undefined) ?? false
  const wall = (cfg.can_place_on_wall as boolean | undefined) ?? false
  const chance = f32((cfg.chance_of_spreading as number | undefined) ?? 0.5)
  const placeOn = new Set((typeof cfg.can_be_placed_on === 'string' ? [cfg.can_be_placed_on] : (cfg.can_be_placed_on as string[])).map((n) => parseState({ Name: n })))
  const canPlaceOn = (b: string) => placeOn.has(b)
  const valid: number[] = []
  if (ceiling) valid.push(UP)
  if (floor) valid.push(DOWN)
  if (wall) valid.push(...HORIZONTAL_PLANE)
  const isAirOrWater = (b: string) => isAir(b) || b === WATER
  const addFace = (l: WorldGenLevel, x: number, y: number, z: number, d: number) => setFaces(l, x, y, z, block, faceMask(l, x, y, z, block) | (1 << d))
  const at = (l: WorldGenLevel, x: number, y: number, z: number, d: number) => l.getBlock(x + DIRECTIONS[d][0], y + DIRECTIONS[d][1], z + DIRECTIONS[d][2])
  /** 原版 MultifaceBlock.isValidStateForPlacement：这一面还没有，并且贴着的方块是满的（v7：已有的面从方块状态读） */
  const canAttach = (l: WorldGenLevel, x: number, y: number, z: number, d: number) => !(faceMask(l, x, y, z, block) & (1 << d)) && isSturdy(at(l, x, y, z, d))

  /** 原版 MultifaceSpreader.spreadFromFaceTowardRandomDirection：从刚放下的这一面往随机方向蔓延一格 */
  const spread = (l: WorldGenLevel, r: RandomSource, x: number, y: number, z: number, face: number) => {
    const order = shuffle([0, 1, 2, 3, 4, 5], r)
    for (const d of order) {
      if (axis(d) === axis(face)) continue
      // 三种蔓延方式：同一格换一面、同一平面的邻格、绕过边角
      const [dx, dy, dz] = DIRECTIONS[d]
      const [fx, fy, fz] = DIRECTIONS[face]
      const cands: [number, number, number, number][] = [
        [x, y, z, d],
        [x + dx, y + dy, z + dz, face],
        [x + dx + fx, y + dy + fy, z + dz + fz, opposite(d)]
      ]
      for (const [sx, sy, sz, sf] of cands) {
        const b = l.getBlock(sx, sy, sz)
        // 原版 stateCanBeReplaced：空气、同种方块、水源
        if (!(isAir(b) || b === block || l.getState(sx, sy, sz) === 'minecraft:water[level=0]')) continue
        if (!canAttach(l, sx, sy, sz, sf)) continue
        addFace(l, sx, sy, sz, sf)
        return
      }
    }
  }

  const placeIfPossible = (l: WorldGenLevel, r: RandomSource, x: number, y: number, z: number, dirs: number[]) => {
    for (const d of dirs) {
      if (!canPlaceOn(at(l, x, y, z, d))) continue
      if (!canAttach(l, x, y, z, d)) return false
      addFace(l, x, y, z, d)
      if (r.nextFloat() < chance) spread(l, r, x, y, z, d)
      return true
    }
    return false
  }

  return (l, r, x, y, z) => {
    if (!isAirOrWater(l.getBlock(x, y, z))) return false
    const dirs = shuffle(valid.slice(), r)
    if (placeIfPossible(l, r, x, y, z, dirs)) return true
    for (const d of dirs) {
      const dirs2 = shuffle(valid.filter((e) => e !== opposite(d)), r)
      // 原版写的是 setWithOffset(origin, d)：每次都是 origin 旁边那一格，并不会越走越远
      const px = x + DIRECTIONS[d][0]
      const py = y + DIRECTIONS[d][1]
      const pz = z + DIRECTIONS[d][2]
      for (let i = 0; i < searchRange; i++) {
        const b = l.getBlock(px, py, pz)
        if (!isAirOrWater(b) && b !== block) break
        if (placeIfPossible(l, r, px, py, pz, dirs2)) return true
      }
    }
    return false
  }
}


// ---------------------------------------------------------------- vegetation_patch / waterlogged_vegetation_patch（苔藓、黏土池）

const SURFACE_DIR: Record<string, number> = { floor: DOWN, ceiling: UP }

/** 原版 VegetationPatchFeature；waterlogged = WaterloggedVegetationPatchFeature（中间灌水的黏土池） */
export function vegetationPatch(cfg: Record<string, unknown>, nested: (ref: unknown) => Nested, waterlogged: boolean): FeaturePlacer {
  const replaceable = String(cfg.replaceable)
  const ground = stateProvider(cfg.ground_state)
  const vegetation = nested(cfg.vegetation_feature)
  const dir = SURFACE_DIR[cfg.surface as string]
  const [sx, sy, sz] = DIRECTIONS[dir]
  const depth = intProvider(cfg.depth)
  const extraBottom = f32(cfg.extra_bottom_block_chance as number)
  const verticalRange = cfg.vertical_range as number
  const vegetationChance = f32(cfg.vegetation_chance as number)
  const xzRadius = intProvider(cfg.xz_radius)
  const extraEdge = f32(cfg.extra_edge_column_chance as number)
  const isReplaceable = (b: string) => inTag(b, replaceable)

  /** 原版 placeGround：从地面往里铺 depth 层；遇到同种方块不算一层也不往里走（原版就是这样写的） */
  const placeGround = (l: WorldGenLevel, r: RandomSource, p: [number, number, number], n: number) => {
    for (let i = 0; i < n; i++) {
      const s = ground(r, p[0], p[1], p[2])
      const cur = l.getBlock(p[0], p[1], p[2])
      if (s === cur) continue
      if (!isReplaceable(cur)) return i !== 0
      l.setBlock(p[0], p[1], p[2], s)
      p[0] += sx
      p[1] += sy
      p[2] += sz
    }
    return true
  }

  return (l, r, x0, y0, z0) => {
    const xr = xzRadius(r) + 1
    const zr = xzRadius(r) + 1
    let set: [number, number, number][] = []
    for (let k = -xr; k <= xr; k++) {
      const edgeX = k === -xr || k === xr
      for (let m = -zr; m <= zr; m++) {
        const edgeZ = m === -zr || m === zr
        const corner = edgeX && edgeZ
        const edge = (edgeX || edgeZ) && !corner
        if (corner) continue
        if (edge && (extraEdge === 0 || r.nextFloat() > extraEdge)) continue
        const x = x0 + k
        const z = z0 + m
        let y = y0
        for (let n = 0; isAir(l.getBlock(x, y, z)) && n < verticalRange; n++) y += sy
        for (let n = 0; !isAir(l.getBlock(x, y, z)) && n < verticalRange; n++) y -= sy
        const gy = y + sy
        if (!isAir(l.getBlock(x, y, z)) || !isSturdy(l.getBlock(x, gy, z))) continue
        const n = depth(r) + (extraBottom > 0 && r.nextFloat() < extraBottom ? 1 : 0)
        if (placeGround(l, r, [x, gy, z], n)) set.push([x, gy, z])
      }
    }
    if (waterlogged) {
      // 四周（北东南西）和下面都被“撑住”的格子才灌水
      const ordered = javaHashOrder(set)
      const inner = ordered.filter(([x, y, z]) => !([[0, 0, -1], [1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, -1, 0]] as Dir[]).some(([dx, dy, dz]) => !isSturdy(l.getBlock(x + dx, y + dy, z + dz))))
      for (const [x, y, z] of javaHashOrder(inner)) l.setBlock(x, y, z, WATER)
      set = inner
    }
    for (const [x, y, z] of javaHashOrder(set)) {
      if (!(vegetationChance > 0 && r.nextFloat() < vegetationChance)) continue
      // 植物放在地面“外面”一格；灌水的版本在水面上（再往外一格）
      if (waterlogged) vegetation(l, r, x - sx, y - sy - 1, z - sz)
      else vegetation(l, r, x - sx, y - sy, z - sz)
    }
    return set.length > 0
  }
}

// ---------------------------------------------------------------- root_system（杜鹃树：树 + 底下的缠根泥土 + 垂根）

export function rootSystem(cfg: Record<string, unknown>, nested: (ref: unknown) => Nested): FeaturePlacer {
  const tree = nested(cfg.feature)
  const requiredSpace = cfg.required_vertical_space_for_tree as number
  const rootRadius = cfg.root_radius as number
  const rootReplaceable = String(cfg.root_replaceable)
  const rootState = stateProvider(cfg.root_state_provider)
  const rootAttempts = cfg.root_placement_attempts as number
  const rootColumnMaxHeight = cfg.root_column_max_height as number
  const hangingRadius = cfg.hanging_root_radius as number
  const hangingSpan = cfg.hanging_roots_vertical_span as number
  const hangingState = stateProvider(cfg.hanging_root_state_provider)
  const hangingAttempts = cfg.hanging_root_placement_attempts as number
  const allowedWater = cfg.allowed_vertical_water_for_tree as number
  const allowedTreePos = blockPredicate(cfg.allowed_tree_position)

  const spaceForTree = (l: WorldGenLevel, x: number, y: number, z: number) => {
    for (let i = 1; i <= requiredSpace; i++) {
      const b = l.getBlock(x, y + i, z)
      if (isAir(b)) continue
      if (!(i + 1 <= allowedWater && b === WATER)) return false
    }
    return true
  }
  const placeRootedDirt = (l: WorldGenLevel, r: RandomSource, x: number, y: number, z: number) => {
    for (let j = 0; j < rootAttempts; j++) {
      const px = x + r.nextInt(rootRadius) - r.nextInt(rootRadius)
      const pz = z + r.nextInt(rootRadius) - r.nextInt(rootRadius)
      if (inTag(l.getBlock(px, y, pz), rootReplaceable)) l.setBlock(px, y, pz, rootState(r, px, y, pz))
    }
  }
  return (l, r, x, y0, z) => {
    if (!isAir(l.getBlock(x, y0, z))) return false
    let ok = false
    for (let i = 0, y = y0; i < rootColumnMaxHeight; i++) {
      y++
      if (!allowedTreePos(l, x, y, z) || !spaceForTree(l, x, y, z)) continue
      const below = l.getBlock(x, y - 1, z)
      if (below === 'minecraft:lava' || !blocksMotion(below)) break
      if (tree(l, r, x, y, z)) {
        for (let k = y0; k < y0 + i; k++) placeRootedDirt(l, r, x, k, z)
        ok = true
        break
      }
    }
    if (ok) {
      for (let k = 0; k < hangingAttempts; k++) {
        const px = x + r.nextInt(hangingRadius) - r.nextInt(hangingRadius)
        const py = y0 + r.nextInt(hangingSpan) - r.nextInt(hangingSpan)
        const pz = z + r.nextInt(hangingRadius) - r.nextInt(hangingRadius)
        if (!isAir(l.getBlock(px, py, pz))) continue
        const s = hangingState(r, px, py, pz)
        if (isSturdy(l.getBlock(px, py + 1, pz))) l.setBlock(px, py, pz, s)
      }
    }
    return true
  }
}
