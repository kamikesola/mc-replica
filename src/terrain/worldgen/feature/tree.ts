/**
 * 树（原版 TreeFeature）：树干放置器 + 树叶放置器 + 根放置器 + 装饰器。
 *
 *   高度 = 树干放置器.getTreeHeight()
 *   树叶高度、半径 = 树叶放置器.foliageHeight() / foliageRadius()
 *   检查上方空间（minimum_size），不够就放弃
 *   [根放置器]（红树）→ 树干（返回若干“树叶挂点”）→ 每个挂点长一团树叶 → 装饰器（蜂巢、藤蔓、可可果……）
 *
 * 每一步消耗随机数的顺序都和原版一致，所以同一个种子长出来的树和原版逐格相同。
 * 装饰器遍历原木 / 树叶的顺序来自 Java 的 HashSet（再按 y 稳定排序），这里用 javaHashOrder 模拟。
 */
import { blockName, floatProvider, intProvider, isAir, isLeaves, isOutsideBuildHeight, parseState, stateProvider, type IntProvider, type StateProvider, type WorldGenLevel } from './core'
import { inTag } from './tags'
import type { FeaturePlacer } from './placement'
import { cos, sin } from '../math/Mth'
import type { RandomSource } from '../random/RandomSource'

const f32 = Math.fround
type Pos = [number, number, number]

/** Java 的 (int) / Mth.floor 遇到 NaN 得 0 */
const jfloor = (v: number) => (Number.isNaN(v) ? 0 : Math.floor(v))

// ---------------------------------------------------------------- 水平方向（原版 Direction.Plane.HORIZONTAL：北、东、南、西）

const HORIZONTAL: Pos[] = [
  [0, 0, -1],
  [1, 0, 0],
  [0, 0, 1],
  [-1, 0, 0]
]
const randomDirection = (r: RandomSource) => HORIZONTAL[r.nextInt(4)]
const opposite = (d: Pos): Pos => [-d[0], -d[1], -d[2]]
/** 顺时针（从上往下看）：北 → 东 → 南 → 西 */
const clockWise = (d: Pos): Pos => HORIZONTAL[(HORIZONTAL.findIndex((h) => h[0] === d[0] && h[2] === d[2]) + 1) & 3]

// ---------------------------------------------------------------- Java HashSet<BlockPos> 的遍历顺序

/** 原版 Vec3i.hashCode */
const posHash = (x: number, y: number, z: number) => (Math.imul((y + Math.imul(z, 31)) | 0, 31) + x) | 0

/**
 * Java HashSet 的遍历顺序：按 hash 落在哪个桶排序，同一个桶里按插入顺序。
 * 桶数 = 16 起，元素数超过 0.75 × 桶数就翻倍（扩容时同一个桶里的相对顺序不变，所以最终顺序只取决于最终桶数）。
 */
export function javaHashOrder(list: Pos[]): Pos[] {
  let cap = 16
  while (list.length > cap * 0.75) cap *= 2
  const bucket = (p: Pos) => {
    const h = posHash(p[0], p[1], p[2])
    return (h ^ (h >>> 16)) & (cap - 1)
  }
  return list
    .map((p, i) => ({ p, i, b: bucket(p) }))
    .sort((a, b) => a.b - b.b || a.i - b.i)
    .map((e) => e.p)
}

/** 有插入顺序的位置集合（模拟 HashSet，遍历时用 javaHashOrder） */
class PosSet {
  private readonly map = new Map<string, Pos>()
  add(x: number, y: number, z: number) {
    const k = `${x},${y},${z}`
    if (!this.map.has(k)) this.map.set(k, [x, y, z])
  }
  has(x: number, y: number, z: number) {
    return this.map.has(`${x},${y},${z}`)
  }
  get size() {
    return this.map.size
  }
  /** 原版 TreeDecorator.Context：HashSet 拷进列表，再按 y 稳定排序 */
  sortedByY(): Pos[] {
    return javaHashOrder([...this.map.values()]).sort((a, b) => a[1] - b[1])
  }
  all(): Pos[] {
    return [...this.map.values()]
  }
}

/** 原版 Util.shuffle */
function shuffle<T>(list: T[], r: RandomSource): void {
  for (let i = list.length; i > 1; i--) {
    const j = r.nextInt(i)
    const t = list[i - 1]
    list[i - 1] = list[j]
    list[j] = t
  }
}

// ---------------------------------------------------------------- 公共判断

/** 原版 TreeFeature.validTreePos：空气或 replaceable_by_trees（树叶、花草、水……） */
const validTreePos = (l: WorldGenLevel, x: number, y: number, z: number) => {
  const b = l.getBlock(x, y, z)
  return isAir(b) || inTag(b, 'minecraft:replaceable_by_trees')
}
const isAirOrLeaves = (l: WorldGenLevel, x: number, y: number, z: number) => {
  const b = l.getBlock(x, y, z)
  return isAir(b) || isLeaves(b)
}

interface TreeContext {
  level: WorldGenLevel
  r: RandomSource
  cfg: TreeConfig
  /** 放原木（树干放置器用） */
  setLog: (x: number, y: number, z: number, state: string) => void
  setRoot: (x: number, y: number, z: number, state: string) => void
  setLeaf: (x: number, y: number, z: number, state: string) => void
  isLeafSet: (x: number, y: number, z: number) => boolean
}

interface Attachment {
  x: number
  y: number
  z: number
  radiusOffset: number
  doubleTrunk: boolean
}
const att = (x: number, y: number, z: number, radiusOffset = 0, doubleTrunk = false): Attachment => ({ x, y, z, radiusOffset, doubleTrunk })

// ---------------------------------------------------------------- 树干放置器

interface TrunkPlacer {
  getTreeHeight(r: RandomSource): number
  placeTrunk(t: TreeContext, freeTreeHeight: number, x: number, y: number, z: number): Attachment[]
  isFree(l: WorldGenLevel, x: number, y: number, z: number): boolean
}

function trunkPlacer(json: Record<string, unknown>): TrunkPlacer {
  const type = String(json.type).replace('minecraft:', '')
  const base = json.base_height as number
  const a = json.height_rand_a as number
  const b = json.height_rand_b as number
  let valid = validTreePos
  if (type === 'upwards_branching_trunk_placer') {
    const tag = String(json.can_grow_through)
    valid = (l, x, y, z) => validTreePos(l, x, y, z) || inTag(l.getBlock(x, y, z), tag)
  }
  const isFree = (l: WorldGenLevel, x: number, y: number, z: number) => valid(l, x, y, z) || inTag(l.getBlock(x, y, z), 'minecraft:logs')
  const placeLog = (t: TreeContext, x: number, y: number, z: number) => {
    if (!valid(t.level, x, y, z)) return false
    t.setLog(x, y, z, t.cfg.trunk(t.r, x, y, z))
    return true
  }
  const placeLogIfFree = (t: TreeContext, x: number, y: number, z: number) => {
    if (isFree(t.level, x, y, z)) placeLog(t, x, y, z)
  }
  const getTreeHeight = (r: RandomSource) => base + r.nextInt(a + 1) + r.nextInt(b + 1)
  const p = (place: TrunkPlacer['placeTrunk']): TrunkPlacer => ({ getTreeHeight, placeTrunk: place, isFree })

  switch (type) {
    case 'straight_trunk_placer':
      return p((t, h, x, y, z) => {
        setDirtAt(t, x, y - 1, z)
        for (let i = 0; i < h; i++) placeLog(t, x, y + i, z)
        return [att(x, y + h, z)]
      })

    case 'forking_trunk_placer':
      return p((t, h, x, y, z) => {
        const r = t.r
        setDirtAt(t, x, y - 1, z)
        const list: Attachment[] = []
        const dir = randomDirection(r)
        const i = h - r.nextInt(4) - 1
        let j = 3 - r.nextInt(3)
        let k = x
        let l = z
        let top: number | null = null
        for (let n = 0; n < h; n++) {
          const o = y + n
          if (n >= i && j > 0) {
            k += dir[0]
            l += dir[2]
            j--
          }
          if (placeLog(t, k, o, l)) top = o + 1
        }
        if (top !== null) list.push(att(k, top, l, 1))
        k = x
        l = z
        const dir2 = randomDirection(r)
        if (dir2 !== dir) {
          const o = i - r.nextInt(2) - 1
          let pp = 1 + r.nextInt(3)
          top = null
          for (let q = o; q < h && pp > 0; q++, pp--) {
            if (q < 1) continue
            const rr = y + q
            k += dir2[0]
            l += dir2[2]
            if (placeLog(t, k, rr, l)) top = rr + 1
          }
          if (top !== null) list.push(att(k, top, l, 0))
        }
        return list
      })

    case 'giant_trunk_placer':
    case 'mega_jungle_trunk_placer': {
      const giant = (t: TreeContext, h: number, x: number, y: number, z: number): Attachment[] => {
        setDirtAt(t, x, y - 1, z)
        setDirtAt(t, x + 1, y - 1, z)
        setDirtAt(t, x, y - 1, z + 1)
        setDirtAt(t, x + 1, y - 1, z + 1)
        for (let i = 0; i < h; i++) {
          placeLogIfFree(t, x, y + i, z)
          if (i >= h - 1) continue
          placeLogIfFree(t, x + 1, y + i, z)
          placeLogIfFree(t, x + 1, y + i, z + 1)
          placeLogIfFree(t, x, y + i, z + 1)
        }
        return [att(x, y + h, z, 0, true)]
      }
      if (type === 'giant_trunk_placer') return p(giant)
      return p((t, h, x, y, z) => {
        const r = t.r
        const list = giant(t, h, x, y, z)
        for (let i = h - 2 - r.nextInt(4); i > Math.trunc(h / 2); i -= 2 + r.nextInt(4)) {
          const f = f32(r.nextFloat() * f32(f32(Math.PI) * 2))
          let j = 0
          let k = 0
          for (let l = 0; l < 5; l++) {
            j = Math.trunc(f32(1.5 + f32(cos(f) * l)))
            k = Math.trunc(f32(1.5 + f32(sin(f) * l)))
            placeLog(t, x + j, y + i - 3 + Math.trunc(l / 2), z + k)
          }
          list.push(att(x + j, y + i, z + k, -2))
        }
        return list
      })
    }

    case 'dark_oak_trunk_placer':
      return p((t, h, x, y, z) => {
        const r = t.r
        const list: Attachment[] = []
        setDirtAt(t, x, y - 1, z)
        setDirtAt(t, x + 1, y - 1, z)
        setDirtAt(t, x, y - 1, z + 1)
        setDirtAt(t, x + 1, y - 1, z + 1)
        const dir = randomDirection(r)
        const i = h - r.nextInt(4)
        let j = 2 - r.nextInt(3)
        let n = x
        let o = z
        const top = y + h - 1
        for (let q = 0; q < h; q++) {
          if (q >= i && j > 0) {
            n += dir[0]
            o += dir[2]
            j--
          }
          const yy = y + q
          if (!isAirOrLeaves(t.level, n, yy, o)) continue
          placeLog(t, n, yy, o)
          placeLog(t, n + 1, yy, o)
          placeLog(t, n, yy, o + 1)
          placeLog(t, n + 1, yy, o + 1)
        }
        list.push(att(n, top, o, 0, true))
        for (let q = -1; q <= 2; q++)
          for (let rr = -1; rr <= 2; rr++) {
            if ((q >= 0 && q <= 1 && rr >= 0 && rr <= 1) || r.nextInt(3) > 0) continue
            const s = r.nextInt(3) + 2
            for (let tt = 0; tt < s; tt++) placeLog(t, x + q, top - tt - 1, z + rr)
            list.push(att(x + q, top, z + rr))
          }
        return list
      })

    case 'fancy_trunk_placer':
      return p((t, h, x, y, z) => fancyTrunk(t, h, x, y, z, placeLog, isFree))

    case 'bending_trunk_placer': {
      const minLeaves = json.min_height_for_leaves as number
      const bend = intProvider(json.bend_length)
      return p((t, h, x, y, z) => {
        const r = t.r
        const dir = randomDirection(r)
        const i = h - 1
        let mx = x
        let my = y
        let mz = z
        setDirtAt(t, x, y - 1, z)
        const list: Attachment[] = []
        for (let j = 0; j <= i; j++) {
          if (j + 1 >= i + r.nextInt(2)) {
            mx += dir[0]
            mz += dir[2]
          }
          if (validTreePos(t.level, mx, my, mz)) placeLog(t, mx, my, mz)
          if (j >= minLeaves) list.push(att(mx, my, mz))
          my++
        }
        const n = bend(r)
        for (let k = 0; k <= n; k++) {
          if (validTreePos(t.level, mx, my, mz)) placeLog(t, mx, my, mz)
          list.push(att(mx, my, mz))
          mx += dir[0]
          mz += dir[2]
        }
        return list
      })
    }

    case 'upwards_branching_trunk_placer': {
      const steps = intProvider(json.extra_branch_steps)
      const prob = f32(json.place_branch_per_log_probability as number)
      const len = intProvider(json.extra_branch_length)
      return p((t, h, x, y, z) => {
        const r = t.r
        const list: Attachment[] = []
        for (let i = 0; i < h; i++) {
          const j = y + i
          if (placeLog(t, x, j, z) && i < h - 1 && r.nextFloat() < prob) {
            const dir = randomDirection(r)
            const k = len(r)
            const l = Math.max(0, k - len(r) - 1)
            let n = steps(r)
            // placeBranch
            let kk = j + l
            let bx = x
            let bz = z
            for (let o = l; o < h && n > 0; o++, n--) {
              if (o < 1) continue
              const pY = j + o
              kk = pY
              bx += dir[0]
              bz += dir[2]
              if (placeLog(t, bx, pY, bz)) kk++
              list.push(att(bx, pY, bz))
            }
            if (kk - j > 1) {
              list.push(att(bx, kk, bz))
              list.push(att(bx, kk - 2, bz))
            }
          }
          if (i === h - 1) list.push(att(x, j + 1, z))
        }
        return list
      })
    }

    case 'cherry_trunk_placer': {
      const count = intProvider(json.branch_count)
      const hLen = intProvider(json.branch_horizontal_length)
      const startJson = json.branch_start_offset_from_top as { min_inclusive: number; max_inclusive: number }
      const start = intProvider(startJson)
      const start2 = intProvider({ type: 'minecraft:uniform', min_inclusive: startJson.min_inclusive, max_inclusive: startJson.max_inclusive - 1 })
      const end = intProvider(json.branch_end_offset_from_top)
      return p((t, h, x, y, z) => {
        const r = t.r
        setDirtAt(t, x, y - 1, z)
        const i = Math.max(0, h - 1 + start(r))
        let j = Math.max(0, h - 1 + start2(r))
        if (j >= i) j++
        const k = count(r)
        const three = k === 3
        const two = k >= 2
        const l = three ? h : two ? Math.max(i, j) + 1 : i + 1
        for (let m = 0; m < l; m++) placeLog(t, x, y + m, z)
        const list: Attachment[] = []
        if (three) list.push(att(x, y + l, z))
        const dir = randomDirection(r)
        const branch = (d: Pos, branchStart: number, flag: boolean): Attachment => {
          let mx = x
          let my = y + branchStart
          let mz = z
          const i2 = h - 1 + end(r)
          const bl2 = flag || i2 < branchStart
          const j2 = hLen(r) + (bl2 ? 1 : 0)
          const tx = x + d[0] * j2
          const ty = y + i2
          const tz = z + d[2] * j2
          const k2 = bl2 ? 2 : 1
          for (let q = 0; q < k2; q++) {
            mx += d[0]
            mz += d[2]
            placeLog(t, mx, my, mz)
          }
          const up = ty > my ? 1 : -1
          for (;;) {
            const dist = Math.abs(tx - mx) + Math.abs(ty - my) + Math.abs(tz - mz)
            if (dist === 0) break
            const g = f32(Math.abs(ty - my) / dist)
            const vertical = r.nextFloat() < g
            if (vertical) my += up
            else {
              mx += d[0]
              mz += d[2]
            }
            placeLog(t, mx, my, mz)
          }
          return att(tx, ty + 1, tz)
        }
        list.push(branch(dir, i, i < l - 1))
        if (two) list.push(branch(opposite(dir), j, j < l - 1))
        return list
      })
    }

    default:
      throw new Error(`不支持的树干放置器：${type}`)
  }
}

/** 原版 TrunkPlacer.setDirtAt：树干下面不是土（草方块、菌丝也算“不是”）就换成土 */
function setDirtAt(t: TreeContext, x: number, y: number, z: number): void {
  const b = t.level.getBlock(x, y, z)
  const isDirt = inTag(b, 'minecraft:dirt') && b !== 'minecraft:grass_block' && b !== 'minecraft:mycelium'
  if (t.cfg.forceDirt || !isDirt) t.level.setBlock(x, y, z, t.cfg.dirt(t.r, x, y, z))
}

/** 原版 FancyTrunkPlacer（大橡树） */
function fancyTrunk(
  t: TreeContext,
  freeTreeHeight: number,
  x: number,
  y: number,
  z: number,
  placeLog: (t: TreeContext, x: number, y: number, z: number) => boolean,
  isFree: (l: WorldGenLevel, x: number, y: number, z: number) => boolean
): Attachment[] {
  const r = t.r
  const height = freeTreeHeight + 2
  const trunk = Math.floor(height * 0.618)
  setDirtAt(t, x, y - 1, z)
  const per = Math.min(1, Math.floor(1.382 + Math.pow((1.0 * height) / 13.0, 2.0)))
  const m = y + trunk
  const coords: { pos: Pos; branchBase: number }[] = []
  let n = height - 5
  coords.push({ pos: [x, y + n, z], branchBase: m })

  const makeLimb = (s: Pos, e: Pos, place: boolean) => {
    if (!place && s[0] === e[0] && s[1] === e[1] && s[2] === e[2]) return true
    const dx = e[0] - s[0]
    const dy = e[1] - s[1]
    const dz = e[2] - s[2]
    const steps = Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz))
    const fx = f32(dx / steps)
    const fy = f32(dy / steps)
    const fz = f32(dz / steps)
    for (let j = 0; j <= steps; j++) {
      const px = s[0] + jfloor(f32(0.5 + f32(j * fx)))
      const py = s[1] + jfloor(f32(0.5 + f32(j * fy)))
      const pz = s[2] + jfloor(f32(0.5 + f32(j * fz)))
      if (place) {
        placeLog(t, px, py, pz) // 原版还会按方向设置原木的 axis（横着的树枝），我们的原木没有朝向
        continue
      }
      if (!isFree(t.level, px, py, pz)) return false
    }
    return true
  }
  const trim = (localY: number) => localY >= height * 0.2

  for (; n >= 0; n--) {
    const f = treeShape(height, n)
    if (f < 0) continue
    for (let k = 0; k < per; k++) {
      const g = 1.0 * f * (r.nextFloat() + 0.328)
      const h = f32(r.nextFloat() * 2.0) * Math.PI
      const o = g * Math.sin(h) + 0.5
      const pp = g * Math.cos(h) + 0.5
      const bp: Pos = [x + Math.floor(o), y + n - 1, z + Math.floor(pp)]
      if (!makeLimb(bp, [bp[0], bp[1] + 5, bp[2]], false)) continue
      const q = x - bp[0]
      const rr = z - bp[2]
      const s = bp[1] - Math.sqrt(q * q + rr * rr) * 0.381
      const tt = s > m ? m : Math.trunc(s)
      if (!makeLimb([x, tt, z], bp, false)) continue
      coords.push({ pos: bp, branchBase: tt })
    }
  }
  makeLimb([x, y, z], [x, y + trunk, z], true)
  for (const c of coords) {
    const i = c.branchBase
    if ((x === c.pos[0] && i === c.pos[1] && z === c.pos[2]) || !trim(i - y)) continue
    makeLimb([x, i, z], c.pos, true)
  }
  return coords.filter((c) => trim(c.branchBase - y)).map((c) => att(c.pos[0], c.pos[1], c.pos[2]))
}

function treeShape(height: number, y: number): number {
  if (f32(y) < f32(f32(height) * f32(0.3))) return -1
  const f = f32(height / 2.0)
  const g = f32(f - y)
  let h = f32(Math.sqrt(f32(f32(f * f) - f32(g * g))))
  if (g === 0) h = f
  else if (Math.abs(g) >= f) return 0
  return f32(h * 0.5)
}

// ---------------------------------------------------------------- 树叶放置器

interface FoliagePlacer {
  foliageHeight(r: RandomSource, trunkHeight: number): number
  foliageRadius(r: RandomSource, trunkHeight: number): number
  createFoliage(t: TreeContext, maxFree: number, a: Attachment, foliageHeight: number, foliageRadius: number): void
}

function tryPlaceLeaf(t: TreeContext, x: number, y: number, z: number): boolean {
  if (!validTreePos(t.level, x, y, z)) return false
  t.setLeaf(x, y, z, t.cfg.foliage(t.r, x, y, z))
  return true
}

function foliagePlacer(json: Record<string, unknown>): FoliagePlacer {
  const type = String(json.type).replace('minecraft:', '')
  const radius = intProvider(json.radius)
  const offsetP = intProvider(json.offset)

  /** 每个放置器自己的“跳过这个位置”规则（x、z 已经取了绝对值） */
  let skip: (r: RandomSource, x: number, y: number, z: number, range: number, large: boolean) => boolean = () => false
  let skipSigned = (r: RandomSource, x: number, y: number, z: number, range: number, large: boolean) => {
    const i = large ? Math.min(Math.abs(x), Math.abs(x - 1)) : Math.abs(x)
    const j = large ? Math.min(Math.abs(z), Math.abs(z - 1)) : Math.abs(z)
    return skip(r, i, y, j, range, large)
  }
  const row = (t: TreeContext, px: number, py: number, pz: number, range: number, localY: number, large: boolean) => {
    const i = large ? 1 : 0
    for (let j = -range; j <= range + i; j++)
      for (let k = -range; k <= range + i; k++) {
        if (skipSigned(t.r, j, localY, k, range, large)) continue
        tryPlaceLeaf(t, px + j, py + localY, pz + k)
      }
  }
  let foliageHeight: FoliagePlacer['foliageHeight'] = () => 0
  let foliageRadius: FoliagePlacer['foliageRadius'] = (r) => radius(r)
  let create: (t: TreeContext, a: Attachment, fh: number, fr: number, offset: number) => void

  switch (type) {
    case 'blob_foliage_placer':
    case 'fancy_foliage_placer':
    case 'bush_foliage_placer': {
      const height = json.height as number
      foliageHeight = () => height
      if (type === 'blob_foliage_placer') {
        skip = (r, x, y, z, range) => x === range && z === range && (r.nextInt(2) === 0 || y === 0)
        create = (t, a, fh, fr, off) => {
          for (let i = off; i >= off - fh; i--) row(t, a.x, a.y, a.z, Math.max(fr + a.radiusOffset - 1 - Math.trunc(i / 2), 0), i, a.doubleTrunk)
        }
      } else if (type === 'fancy_foliage_placer') {
        skip = (_r, x, _y, z, range) => f32(f32(f32(x + 0.5) ** 2) + f32(f32(z + 0.5) ** 2)) > range * range
        create = (t, a, fh, fr, off) => {
          for (let i = off; i >= off - fh; i--) row(t, a.x, a.y, a.z, fr + (i === off || i === off - fh ? 0 : 1), i, a.doubleTrunk)
        }
      } else {
        skip = (r, x, _y, z, range) => x === range && z === range && r.nextInt(2) === 0
        create = (t, a, fh, fr, off) => {
          for (let i = off; i >= off - fh; i--) row(t, a.x, a.y, a.z, fr + a.radiusOffset - 1 - i, i, a.doubleTrunk)
        }
      }
      break
    }
    case 'spruce_foliage_placer': {
      const trunkHeight = intProvider(json.trunk_height)
      foliageHeight = (r, h) => Math.max(4, h - trunkHeight(r))
      skip = (_r, x, _y, z, range) => x === range && z === range && range > 0
      create = (t, a, fh, fr, off) => {
        let i = t.r.nextInt(2)
        let j = 1
        let k = 0
        for (let l = off; l >= -fh; l--) {
          row(t, a.x, a.y, a.z, i, l, a.doubleTrunk)
          if (i >= j) {
            i = k
            k = 1
            j = Math.min(j + 1, fr + a.radiusOffset)
            continue
          }
          i++
        }
      }
      break
    }
    case 'pine_foliage_placer': {
      const height = intProvider(json.height)
      foliageHeight = (r) => height(r)
      foliageRadius = (r, h) => radius(r) + r.nextInt(Math.max(h + 1, 1))
      skip = (_r, x, _y, z, range) => x === range && z === range && range > 0
      create = (t, a, fh, fr, off) => {
        let i = 0
        for (let j = off; j >= off - fh; j--) {
          row(t, a.x, a.y, a.z, i, j, a.doubleTrunk)
          if (i >= 1 && j === off - fh + 1) {
            i--
            continue
          }
          if (i >= fr + a.radiusOffset) continue
          i++
        }
      }
      break
    }
    case 'mega_pine_foliage_placer': {
      const crown = intProvider(json.crown_height)
      foliageHeight = (r) => crown(r)
      skip = (_r, x, _y, z, range) => (x + z >= 7 ? true : x * x + z * z > range * range)
      create = (t, a, fh, fr, off) => {
        let prev = 0
        for (let j = a.y - fh + off; j <= a.y + off; j++) {
          const k = a.y - j
          const l = fr + a.radiusOffset + Math.floor(f32(f32(k / fh) * 3.5))
          const m = k > 0 && l === prev && (j & 1) === 0 ? l + 1 : l
          row(t, a.x, j, a.z, m, 0, a.doubleTrunk)
          prev = l
        }
      }
      break
    }
    case 'acacia_foliage_placer':
      skip = (_r, x, y, z, range) => (y === 0 ? (x > 1 || z > 1) && x !== 0 && z !== 0 : x === range && z === range && range > 0)
      create = (t, a, fh, fr, off) => {
        const y = a.y + off
        row(t, a.x, y, a.z, fr + a.radiusOffset, -1 - fh, a.doubleTrunk)
        row(t, a.x, y, a.z, fr - 1, -fh, a.doubleTrunk)
        row(t, a.x, y, a.z, fr + a.radiusOffset - 1, 0, a.doubleTrunk)
      }
      break
    case 'dark_oak_foliage_placer': {
      foliageHeight = () => 4
      skip = (_r, x, y, z, range, large) => {
        if (y === -1 && !large) return x === range && z === range
        if (y === 1) return x + z > range * 2 - 2
        return false
      }
      const base = skipSigned
      skipSigned = (r, x, y, z, range, large) => {
        if (!(y !== 0 || !large || (x !== -range && x < range) || (z !== -range && z < range))) return true
        return base(r, x, y, z, range, large)
      }
      create = (t, a, _fh, fr, off) => {
        const y = a.y + off
        if (a.doubleTrunk) {
          row(t, a.x, y, a.z, fr + 2, -1, true)
          row(t, a.x, y, a.z, fr + 3, 0, true)
          row(t, a.x, y, a.z, fr + 2, 1, true)
          if (t.r.nextBoolean()) row(t, a.x, y, a.z, fr, 2, true)
        } else {
          row(t, a.x, y, a.z, fr + 2, -1, false)
          row(t, a.x, y, a.z, fr + 1, 0, false)
        }
      }
      break
    }
    case 'jungle_foliage_placer': {
      const height = json.height as number
      foliageHeight = () => height
      skip = (_r, x, _y, z, range) => (x + z >= 7 ? true : x * x + z * z > range * range)
      create = (t, a, fh, fr, off) => {
        const i = a.doubleTrunk ? fh : 1 + t.r.nextInt(2)
        for (let j = off; j >= off - i; j--) row(t, a.x, a.y, a.z, fr + a.radiusOffset + 1 - j, j, a.doubleTrunk)
      }
      break
    }
    case 'random_spread_foliage_placer': {
      const fh = intProvider(json.foliage_height)
      const attempts = json.leaf_placement_attempts as number
      foliageHeight = (r) => fh(r)
      create = (t, a, h, fr) => {
        const r = t.r
        for (let i = 0; i < attempts; i++) {
          const dx = r.nextInt(fr) - r.nextInt(fr)
          const dy = r.nextInt(h) - r.nextInt(h)
          const dz = r.nextInt(fr) - r.nextInt(fr)
          tryPlaceLeaf(t, a.x + dx, a.y + dy, a.z + dz)
        }
      }
      break
    }
    case 'cherry_foliage_placer': {
      const height = intProvider(json.height)
      const wideHole = f32(json.wide_bottom_layer_hole_chance as number)
      const cornerHole = f32(json.corner_hole_chance as number)
      const hanging = f32(json.hanging_leaves_chance as number)
      const hangingExt = f32(json.hanging_leaves_extension_chance as number)
      foliageHeight = (r) => height(r)
      skip = (r, x, y, z, range) => {
        if (y === -1 && (x === range || z === range) && r.nextFloat() < wideHole) return true
        const corner = x === range && z === range
        if (range > 2) return corner || (x + z > range * 2 - 2 && r.nextFloat() < cornerHole)
        return corner && r.nextFloat() < cornerHole
      }
      const ext = (t: TreeContext, chance: number, lx: number, ly: number, lz: number, x: number, y: number, z: number) => {
        if (Math.abs(x - lx) + Math.abs(y - ly) + Math.abs(z - lz) >= 7) return false
        if (t.r.nextFloat() > chance) return false
        return tryPlaceLeaf(t, x, y, z)
      }
      const rowHanging = (t: TreeContext, px: number, py: number, pz: number, range: number, localY: number, large: boolean) => {
        row(t, px, py, pz, range, localY, large)
        const i = large ? 1 : 0
        const [lx, ly, lz] = [px, py - 1, pz]
        for (const d of HORIZONTAL) {
          const d2 = clockWise(d)
          const j = d2[0] + d2[2] > 0 ? range + i : range
          let mx = px + d2[0] * j - d[0] * range
          let my = py + localY - 1
          let mz = pz + d2[2] * j - d[2] * range
          for (let k = -range; k < range + i; k++) {
            const set = t.isLeafSet(mx, my + 1, mz)
            if (set && ext(t, hanging, lx, ly, lz, mx, my, mz)) ext(t, hangingExt, lx, ly, lz, mx, my - 1, mz)
            mx += d[0]
            mz += d[2]
          }
          void my
        }
      }
      create = (t, a, fh, fr, off) => {
        const y = a.y + off
        const i = fr + a.radiusOffset - 1
        row(t, a.x, y, a.z, i - 2, fh - 3, a.doubleTrunk)
        row(t, a.x, y, a.z, i - 1, fh - 4, a.doubleTrunk)
        for (let j = fh - 5; j >= 0; j--) row(t, a.x, y, a.z, i, j, a.doubleTrunk)
        rowHanging(t, a.x, y, a.z, i, -1, a.doubleTrunk)
        rowHanging(t, a.x, y, a.z, i - 1, -2, a.doubleTrunk)
      }
      break
    }
    default:
      throw new Error(`不支持的树叶放置器：${type}`)
  }
  return {
    foliageHeight,
    foliageRadius,
    // 原版：offset 在每个挂点长树叶时才采样
    createFoliage: (t, _max, a, fh, fr) => create(t, a, fh, fr, offsetP(t.r))
  }
}

// ---------------------------------------------------------------- 根放置器（红树）

interface RootPlacer {
  trunkOrigin(r: RandomSource, x: number, y: number, z: number): Pos
  placeRoots(t: TreeContext, x: number, y: number, z: number, origin: Pos): boolean
}

function rootPlacer(json: Record<string, unknown>): RootPlacer {
  const type = String(json.type).replace('minecraft:', '')
  if (type !== 'mangrove_root_placer') throw new Error(`不支持的根放置器：${type}`)
  const offsetY = intProvider(json.trunk_offset_y)
  const rootProvider = stateProvider(json.root_provider)
  const above = json.above_root_placement as { above_root_provider: unknown; above_root_placement_chance: number } | undefined
  const aboveProvider = above ? stateProvider(above.above_root_provider) : null
  const aboveChance = above ? f32(above.above_root_placement_chance) : 0
  const m = json.mangrove_root_placement as Record<string, unknown>
  const growTag = String(m.can_grow_through)
  const muddyIn = new Set((typeof m.muddy_roots_in === 'string' ? [m.muddy_roots_in] : (m.muddy_roots_in as string[])).map((n) => parseState({ Name: n })))
  const muddy = stateProvider(m.muddy_roots_provider)
  const maxWidth = m.max_root_width as number
  const maxLength = m.max_root_length as number
  const skew = f32(m.random_skew_chance as number)

  const canPlace = (l: WorldGenLevel, x: number, y: number, z: number) => validTreePos(l, x, y, z) || inTag(l.getBlock(x, y, z), growTag)
  const potential = (r: RandomSource, p: Pos, d: Pos, o: Pos): Pos[] => {
    const below: Pos = [p[0], p[1] - 1, p[2]]
    const rel: Pos = [p[0] + d[0], p[1], p[2] + d[2]]
    const i = Math.abs(p[0] - o[0]) + Math.abs(p[1] - o[1]) + Math.abs(p[2] - o[2])
    if (i > maxWidth - 3 && i <= maxWidth) return r.nextFloat() < skew ? [below, [rel[0], rel[1] - 1, rel[2]]] : [below]
    if (i > maxWidth) return [below]
    if (r.nextFloat() < skew) return [below]
    return r.nextBoolean() ? [rel] : [below]
  }
  const simulate = (l: WorldGenLevel, r: RandomSource, p: Pos, d: Pos, o: Pos, list: Pos[], depth: number): boolean => {
    if (depth === maxLength || list.length > maxLength) return false
    for (const bp of potential(r, p, d, o)) {
      if (!canPlace(l, ...bp)) continue
      list.push(bp)
      if (!simulate(l, r, bp, d, o, list, depth + 1)) return false
    }
    return true
  }
  const placeRoot = (t: TreeContext, x: number, y: number, z: number) => {
    const l = t.level
    if (muddyIn.has(l.getBlock(x, y, z))) {
      t.setRoot(x, y, z, muddy(t.r, x, y, z))
      return
    }
    if (!canPlace(l, x, y, z)) return
    t.setRoot(x, y, z, rootProvider(t.r, x, y, z))
    if (aboveProvider && t.r.nextFloat() < aboveChance && isAir(l.getBlock(x, y + 1, z))) t.setRoot(x, y + 1, z, aboveProvider(t.r, x, y + 1, z))
  }
  return {
    trunkOrigin: (r, x, y, z) => [x, y + offsetY(r), z],
    placeRoots: (t, x, y, z, o) => {
      for (let yy = y; yy < o[1]; yy++) if (!canPlace(t.level, x, yy, z)) return false
      const list: Pos[] = [[o[0], o[1] - 1, o[2]]]
      for (const d of HORIZONTAL) {
        const bp: Pos = [o[0] + d[0], o[1], o[2] + d[2]]
        const list2: Pos[] = []
        if (!simulate(t.level, t.r, bp, d, o, list2, 0)) return false
        list.push(...list2)
        list.push(bp)
      }
      for (const p of list) placeRoot(t, ...p)
      return true
    }
  }
}

// ---------------------------------------------------------------- 装饰器

interface DecoratorContext {
  level: WorldGenLevel
  r: RandomSource
  logs: Pos[]
  leaves: Pos[]
  roots: Pos[]
  set: (x: number, y: number, z: number, state: string) => void
  isAir: (x: number, y: number, z: number) => boolean
}
type Decorator = (c: DecoratorContext) => void

function decorator(json: Record<string, unknown>, features: { place: (id: string, l: WorldGenLevel, r: RandomSource, x: number, y: number, z: number) => boolean }): Decorator {
  const type = String(json.type).replace('minecraft:', '')
  switch (type) {
    case 'beehive': {
      const p = f32(json.probability as number)
      return (c) => {
        const r = c.r
        if (r.nextFloat() >= p) return
        const leaves = c.leaves
        const logs = c.logs
        const i = leaves.length > 0 ? Math.max(leaves[0][1] - 1, logs[0][1] + 1) : Math.min(logs[0][1] + 1 + r.nextInt(3), logs[logs.length - 1][1])
        // 东、南、西（不朝北），蜂巢开口朝南
        const cand: Pos[] = []
        for (const q of logs) if (q[1] === i) for (const d of [HORIZONTAL[1], HORIZONTAL[2], HORIZONTAL[3]]) cand.push([q[0] + d[0], q[1], q[2] + d[2]])
        if (cand.length === 0) return
        shuffle(cand, r)
        const pos = cand.find((q) => c.isAir(...q) && c.isAir(q[0], q[1], q[2] + 1))
        if (!pos) return
        c.set(...pos, 'minecraft:bee_nest')
        // 原版接着给蜂巢放 2~3 只蜜蜂，每只消耗一次随机数（只影响后面的随机数顺序）
        const n = 2 + r.nextInt(2)
        for (let k = 0; k < n; k++) r.nextInt(599)
      }
    }
    case 'trunk_vine':
      return (c) => {
        const r = c.r
        for (const [x, y, z] of c.logs) {
          if (r.nextInt(3) > 0 && c.isAir(x - 1, y, z)) c.set(x - 1, y, z, 'minecraft:vine')
          if (r.nextInt(3) > 0 && c.isAir(x + 1, y, z)) c.set(x + 1, y, z, 'minecraft:vine')
          if (r.nextInt(3) > 0 && c.isAir(x, y, z - 1)) c.set(x, y, z - 1, 'minecraft:vine')
          if (r.nextInt(3) > 0 && c.isAir(x, y, z + 1)) c.set(x, y, z + 1, 'minecraft:vine')
        }
      }
    case 'leave_vine': {
      const p = f32(json.probability as number)
      const hang = (c: DecoratorContext, x: number, y: number, z: number) => {
        c.set(x, y, z, 'minecraft:vine')
        y--
        for (let i = 4; c.isAir(x, y, z) && i > 0; i--) {
          c.set(x, y, z, 'minecraft:vine')
          y--
        }
      }
      return (c) => {
        const r = c.r
        for (const [x, y, z] of c.leaves) {
          if (r.nextFloat() < p && c.isAir(x - 1, y, z)) hang(c, x - 1, y, z)
          if (r.nextFloat() < p && c.isAir(x + 1, y, z)) hang(c, x + 1, y, z)
          if (r.nextFloat() < p && c.isAir(x, y, z - 1)) hang(c, x, y, z - 1)
          if (r.nextFloat() < p && c.isAir(x, y, z + 1)) hang(c, x, y, z + 1)
        }
      }
    }
    case 'cocoa': {
      const p = f32(json.probability as number)
      return (c) => {
        const r = c.r
        if (r.nextFloat() >= p) return
        if (c.logs.length === 0) return
        const i = c.logs[0][1]
        for (const [x, y, z] of c.logs) {
          if (y - i > 2) continue
          for (const d of HORIZONTAL) {
            const o = opposite(d)
            if (!(r.nextFloat() <= f32(0.25))) continue
            if (!c.isAir(x + o[0], y, z + o[2])) continue
            r.nextInt(3) // 可可果的生长阶段
            c.set(x + o[0], y, z + o[2], 'minecraft:cocoa')
          }
        }
      }
    }
    case 'alter_ground': {
      const provider = stateProvider(json.provider)
      const placeAt = (c: DecoratorContext, x: number, y: number, z: number) => {
        for (let i = 2; i >= -3; i--) {
          const b = c.level.getBlock(x, y + i, z)
          if (inTag(b, 'minecraft:dirt')) {
            c.set(x, y + i, z, provider(c.r, x, y, z))
            break
          }
          if (!c.isAir(x, y + i, z) && i < 0) break
        }
      }
      const circle = (c: DecoratorContext, x: number, y: number, z: number) => {
        for (let i = -2; i <= 2; i++)
          for (let j = -2; j <= 2; j++) {
            if (Math.abs(i) === 2 && Math.abs(j) === 2) continue
            placeAt(c, x + i, y, z + j)
          }
      }
      return (c) => {
        let list: Pos[]
        if (c.roots.length === 0) list = [...c.logs]
        else if (c.logs.length > 0 && c.roots[0][1] === c.logs[0][1]) list = [...c.logs, ...c.roots]
        else list = [...c.roots]
        if (list.length === 0) return
        const i = list[0][1]
        for (const [x, y, z] of list) {
          if (y !== i) continue
          circle(c, x - 1, y, z - 1)
          circle(c, x + 2, y, z - 1)
          circle(c, x - 1, y, z + 2)
          circle(c, x + 2, y, z + 2)
          for (let j = 0; j < 5; j++) {
            const k = c.r.nextInt(64)
            const l = k % 8
            const m = Math.trunc(k / 8)
            if (l !== 0 && l !== 7 && m !== 0 && m !== 7) continue
            circle(c, x - 3 + l, y, z - 3 + m)
          }
        }
      }
    }
    case 'attached_to_leaves': {
      const p = f32(json.probability as number)
      const rxz = json.exclusion_radius_xz as number
      const ry = json.exclusion_radius_y as number
      const need = json.required_empty_blocks as number
      const provider = stateProvider(json.block_provider)
      const DIR: Record<string, Pos> = { up: [0, 1, 0], down: [0, -1, 0], north: [0, 0, -1], south: [0, 0, 1], west: [-1, 0, 0], east: [1, 0, 0] }
      const dirs = (json.directions as string[]).map((d) => DIR[d])
      return (c) => {
        const r = c.r
        const excluded = new Set<string>()
        const leaves = [...c.leaves]
        shuffle(leaves, r)
        for (const [x, y, z] of leaves) {
          const d = dirs[r.nextInt(dirs.length)]
          const bx = x + d[0]
          const by = y + d[1]
          const bz = z + d[2]
          if (excluded.has(`${bx},${by},${bz}`) || !(r.nextFloat() < p)) continue
          let ok = true
          for (let i = 1; i <= need; i++) if (!c.isAir(x + d[0] * i, y + d[1] * i, z + d[2] * i)) ok = false
          if (!ok) continue
          for (let ex = -rxz; ex <= rxz; ex++) for (let ey = -ry; ey <= ry; ey++) for (let ez = -rxz; ez <= rxz; ez++) excluded.add(`${bx + ex},${by + ey},${bz + ez}`)
          c.set(bx, by, bz, provider(r, bx, by, bz))
        }
      }
    }
    case 'pale_moss': {
      const ground = f32(json.ground_probability as number)
      const leavesP = f32(json.leaves_probability as number)
      const trunkP = f32(json.trunk_probability as number)
      const hanger = (c: DecoratorContext, x: number, y: number, z: number) => {
        while (c.isAir(x, y - 1, z) && !(c.r.nextFloat() < 0.5)) {
          c.set(x, y, z, 'minecraft:pale_hanging_moss')
          y--
        }
        c.set(x, y, z, 'minecraft:pale_hanging_moss')
      }
      return (c) => {
        const r = c.r
        const list = [...c.logs]
        shuffle(list, r)
        if (list.length === 0) return
        let low = list[0]
        for (const q of list) if (q[1] < low[1]) low = q
        if (r.nextFloat() < ground) features.place('minecraft:pale_moss_patch', c.level, r, low[0], low[1] + 1, low[2])
        for (const [x, y, z] of c.logs) if (r.nextFloat() < trunkP && c.isAir(x, y - 1, z)) hanger(c, x, y - 1, z)
        for (const [x, y, z] of c.leaves) if (r.nextFloat() < leavesP && c.isAir(x, y - 1, z)) hanger(c, x, y - 1, z)
      }
    }
    case 'creaking_heart': {
      const p = f32(json.probability as number)
      const ALL: Pos[] = [[0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1], [-1, 0, 0], [1, 0, 0]]
      return (c) => {
        const r = c.r
        if (c.logs.length === 0) return
        if (r.nextFloat() >= p) return
        const list = [...c.logs]
        shuffle(list, r)
        const pos = list.find(([x, y, z]) => ALL.every((d) => inTag(c.level.getBlock(x + d[0], y + d[1], z + d[2]), 'minecraft:logs')))
        if (pos) c.set(...pos, 'minecraft:creaking_heart')
      }
    }
    default:
      throw new Error(`不支持的树装饰器：${type}`)
  }
}

// ---------------------------------------------------------------- 整棵树

interface TreeConfig {
  trunk: StateProvider
  foliage: StateProvider
  dirt: StateProvider
  forceDirt: boolean
}

/** 原版 FeatureSize：每一层树干周围需要多大的空地 */
function featureSize(json: Record<string, unknown>): { size: (height: number, y: number) => number; minClipped: number | null } {
  const type = String(json.type).replace('minecraft:', '')
  const minClipped = (json.min_clipped_height as number | undefined) ?? null
  const limit = (json.limit as number) ?? 1
  const lower = (json.lower_size as number) ?? 0
  const upper = (json.upper_size as number) ?? 1
  if (type === 'two_layers_feature_size') return { size: (_h, y) => (y < limit ? lower : upper), minClipped }
  const upperLimit = (json.upper_limit as number) ?? 1
  const middle = (json.middle_size as number) ?? 1
  return { size: (h, y) => (y < limit ? lower : y >= h - upperLimit ? upper : middle), minClipped }
}

export function treeFeature(cfgJson: Record<string, unknown>, features: { place: (id: string, l: WorldGenLevel, r: RandomSource, x: number, y: number, z: number) => boolean } = { place: () => false }): FeaturePlacer {
  const cfg: TreeConfig = {
    trunk: stateProvider(cfgJson.trunk_provider),
    foliage: stateProvider(cfgJson.foliage_provider),
    dirt: stateProvider(cfgJson.dirt_provider),
    forceDirt: cfgJson.force_dirt === true
  }
  const trunk = trunkPlacer(cfgJson.trunk_placer as Record<string, unknown>)
  const foliage = foliagePlacer(cfgJson.foliage_placer as Record<string, unknown>)
  const roots = cfgJson.root_placer ? rootPlacer(cfgJson.root_placer as Record<string, unknown>) : null
  const size = featureSize(cfgJson.minimum_size as Record<string, unknown>)
  const ignoreVines = cfgJson.ignore_vines === true
  const decorators = ((cfgJson.decorators as Record<string, unknown>[]) ?? []).map((d) => decorator(d, features))

  const maxFreeHeight = (l: WorldGenLevel, h: number, x: number, y: number, z: number) => {
    for (let i = 0; i <= h + 1; i++) {
      const j = size.size(h, i)
      for (let k = -j; k <= j; k++)
        for (let m = -j; m <= j; m++) {
          if (trunk.isFree(l, x + k, y + i, z + m) && (ignoreVines || l.getBlock(x + k, y + i, z + m) !== 'minecraft:vine')) continue
          return i - 2
        }
    }
    return h
  }

  return (level, r, x, y, z) => {
    const rootSet = new PosSet()
    const logSet = new PosSet()
    const leafSet = new PosSet()
    const t: TreeContext = {
      level,
      r,
      cfg,
      setLog: (px, py, pz, s) => {
        logSet.add(px, py, pz)
        level.setBlock(px, py, pz, blockName(s))
      },
      setRoot: (px, py, pz, s) => {
        rootSet.add(px, py, pz)
        level.setBlock(px, py, pz, blockName(s))
      },
      setLeaf: (px, py, pz, s) => {
        leafSet.add(px, py, pz)
        level.setBlock(px, py, pz, blockName(s))
      },
      isLeafSet: (px, py, pz) => leafSet.has(px, py, pz)
    }

    // doPlace
    const i = trunk.getTreeHeight(r)
    const j = foliage.foliageHeight(r, i)
    const k = i - j
    const l = foliage.foliageRadius(r, k)
    const origin: Pos = roots ? roots.trunkOrigin(r, x, y, z) : [x, y, z]
    const minY = Math.min(y, origin[1])
    const maxY = Math.max(y, origin[1]) + i + 1
    if (minY < level.minY + 1 || maxY > level.minY + level.height) return false
    const o = maxFreeHeight(level, i, origin[0], origin[1], origin[2])
    if (o < i && (size.minClipped === null || o < size.minClipped)) return false
    if (roots && !roots.placeRoots(t, x, y, z, origin)) return false
    const attachments = trunk.placeTrunk(t, o, origin[0], origin[1], origin[2])
    for (const a of attachments) foliage.createFoliage(t, o, a, j, l)
    if (logSet.size === 0 && leafSet.size === 0) return false

    if (decorators.length > 0) {
      const c: DecoratorContext = {
        level,
        r,
        logs: logSet.sortedByY(),
        leaves: leafSet.sortedByY(),
        roots: rootSet.sortedByY(),
        set: (px, py, pz, s) => {
          level.setBlock(px, py, pz, blockName(s))
        },
        isAir: (px, py, pz) => !isOutsideBuildHeight(level, py) && isAir(level.getBlock(px, py, pz))
      }
      for (const d of decorators) d(c)
    }
    return true
  }
}

export type { IntProvider }
void floatProvider
