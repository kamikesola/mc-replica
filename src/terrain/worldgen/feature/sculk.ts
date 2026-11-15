/**
 * 幽匿块蔓延（v5.1）：原版 SculkPatchFeature + SculkSpreader（世界生成版）+ SculkBlock / SculkVeinBlock 的行为。
 *
 * 幽匿脉络是“多面”方块（贴在哪几个面上）。我们的方块不带状态，所以这里在地物运行期间
 * 用 veinFaces 记下每格脉络贴着的面；之前别的地物放的、不知道面的脉络，按“周围哪些面是实心的”猜。
 */
import { intProvider, isAir, isSturdy } from './core'
import { inTag } from './tags'
import type { FeaturePlacer } from './placement'
import { DIRECTIONS, faceStore, shuffle } from './vegetation'

const SCULK = 'minecraft:sculk'
const VEIN = 'minecraft:sculk_vein'
const WATER = 'minecraft:water'
const opposite = (d: number) => d ^ 1
const axis = (d: number) => d >> 1
const key = (x: number, y: number, z: number) => `${x},${y},${z}`

/** 原版 SculkSpreader.ChargeCursor.NON_CORNER_NEIGHBOURS：3×3×3 里去掉 8 个角和中心，x 最快、然后 y、z */
const NON_CORNER: [number, number, number][] = []
for (let z = -1; z <= 1; z++) for (let y = -1; y <= 1; y++) for (let x = -1; x <= 1; x++) if ((x === 0 || y === 0 || z === 0) && !(x === 0 && y === 0 && z === 0)) NON_CORNER.push([x, y, z])

interface Cursor {
  x: number
  y: number
  z: number
  charge: number
  updateDelay: number
  decayDelay: number
  /** null = 原版的 Optional.empty()（刚生成的游标） */
  facings: number | null
}

// 世界生成用的 SculkSpreader 参数
const GROWTH_SPAWN_COST = 10
const NO_GROWTH_RADIUS = 4
const CHARGE_DECAY_RATE = 10
const ADDITIONAL_DECAY_RATE = 5
const REPLACEABLE = 'minecraft:sculk_replaceable_world_gen'

export function sculkPatch(cfg: Record<string, unknown>): FeaturePlacer {
  const chargeCount = cfg.charge_count as number
  const amountPerCharge = cfg.amount_per_charge as number
  const spreadAttempts = cfg.spread_attempts as number
  const growthRounds = cfg.growth_rounds as number
  const spreadRounds = cfg.spread_rounds as number
  const extraRare = intProvider(cfg.extra_rare_growths)
  const catalystChance = Math.fround(cfg.catalyst_chance as number)

  return (l, r, ox, oy, oz) => {
    const faces = faceStore(l)
    const at = (x: number, y: number, z: number, d: number) => l.getBlock(x + DIRECTIONS[d][0], y + DIRECTIONS[d][1], z + DIRECTIONS[d][2])
    const canAttach = (x: number, y: number, z: number, d: number) => isSturdy(at(x, y, z, d))
    const getFaces = (x: number, y: number, z: number) => {
      const k = key(x, y, z)
      let m = faces.get(k)
      if (m === undefined) {
        m = 0
        for (let d = 0; d < 6; d++) if (canAttach(x, y, z, d)) m |= 1 << d
        faces.set(k, m)
      }
      return m
    }
    const setVein = (x: number, y: number, z: number, mask: number) => {
      if (l.setBlock(x, y, z, VEIN)) faces.set(key(x, y, z), mask)
    }
    const set = (x: number, y: number, z: number, b: string) => {
      if (l.setBlock(x, y, z, b)) faces.delete(key(x, y, z))
    }
    const isBehaviour = (b: string) => b === SCULK || b === VEIN
    const hasFace = (b: string, x: number, y: number, z: number, d: number) => b === VEIN && (getFaces(x, y, z) & (1 << d)) !== 0

    // ------------------------------------------------ 脉络的蔓延（MultifaceSpreader + SculkVeinSpreaderConfig）
    const stateCanBeReplaced = (fx: number, fy: number, fz: number, sx: number, sy: number, sz: number, d: number, s: string) => {
      const n = at(sx, sy, sz, d)
      if (n === SCULK || n === 'minecraft:sculk_catalyst') return false
      if (Math.abs(fx - sx) + Math.abs(fy - sy) + Math.abs(fz - sz) === 2 && isSturdy(at(fx, fy, fz, opposite(d)))) return false
      if (s === 'minecraft:lava') return false
      if (s === 'minecraft:fire' || s === 'minecraft:soul_fire') return false
      return inTag(s, 'minecraft:replaceable') || isAir(s) || s === VEIN || s === WATER
    }
    const canSpreadInto = (fx: number, fy: number, fz: number, sx: number, sy: number, sz: number, face: number) => {
      const s = l.getBlock(sx, sy, sz)
      if (!stateCanBeReplaced(fx, fy, fz, sx, sy, sz, face, s)) return false
      if (s === VEIN && (getFaces(sx, sy, sz) & (1 << face)) !== 0) return false
      return canAttach(sx, sy, sz, face)
    }
    const placeFace = (sx: number, sy: number, sz: number, face: number) => {
      const s = l.getBlock(sx, sy, sz)
      setVein(sx, sy, sz, (s === VEIN ? getFaces(sx, sy, sz) : 0) | (1 << face))
    }
    /** 原版 spreadAll：samePosition = 只在同一格加面（getSameSpaceSpreader） */
    const spreadAll = (state: string, x: number, y: number, z: number, samePosition: boolean) => {
      let count = 0
      const otherValid = state !== VEIN
      const mask = state === VEIN ? getFaces(x, y, z) : 0
      for (let face = 0; face < 6; face++) {
        if (!otherValid && !(mask & (1 << face))) continue
        for (let d = 0; d < 6; d++) {
          if (axis(d) === axis(face)) continue
          if (!otherValid && (!(mask & (1 << face)) || mask & (1 << d))) continue
          const [dx, dy, dz] = DIRECTIONS[d]
          const [fx, fy, fz] = DIRECTIONS[face]
          const cands: [number, number, number, number][] = [[x, y, z, d]]
          if (!samePosition) cands.push([x + dx, y + dy, z + dz, face], [x + dx + fx, y + dy + fy, z + dz + fz, opposite(d)])
          for (const [sx, sy, sz, sf] of cands) {
            if (!canSpreadInto(x, y, z, sx, sy, sz, sf)) continue
            placeFace(sx, sy, sz, sf)
            count++
            break
          }
        }
      }
      return count
    }
    const regrow = (x: number, y: number, z: number, facings: number) => {
      let m = 0
      for (let d = 0; d < 6; d++) if (facings & (1 << d) && canAttach(x, y, z, d)) m |= 1 << d
      if (!m) return false
      setVein(x, y, z, m)
      return true
    }

    // ------------------------------------------------ 各种方块的 SculkBehaviour
    const attemptSpreadVein = (state: string, x: number, y: number, z: number, facings: number | null) => {
      if (isBehaviour(state)) return spreadAll(state, x, y, z, false) > 0
      // DEFAULT
      if (facings === null) return spreadAll(l.getBlock(x, y, z), x, y, z, true) > 0
      if (facings !== 0) return isAir(state) || state === WATER ? regrow(x, y, z, facings) : false
      return spreadAll(state, x, y, z, false) > 0
    }
    const veinDischarged = (x: number, y: number, z: number) => {
      if (l.getBlock(x, y, z) !== VEIN) return
      let m = getFaces(x, y, z)
      for (let d = 0; d < 6; d++) if (m & (1 << d) && at(x, y, z, d) === SCULK) m &= ~(1 << d)
      if (!m) set(x, y, z, 'minecraft:air')
      else setVein(x, y, z, m)
    }
    const onDischarged = (state: string, x: number, y: number, z: number) => {
      if (state === VEIN) veinDischarged(x, y, z)
    }
    const attemptPlaceSculk = (x: number, y: number, z: number) => {
      const s = l.getBlock(x, y, z)
      for (const d of shuffle([0, 1, 2, 3, 4, 5], r)) {
        if (!hasFace(s, x, y, z, d)) continue
        const [dx, dy, dz] = DIRECTIONS[d]
        const px = x + dx
        const py = y + dy
        const pz = z + dz
        if (!inTag(l.getBlock(px, py, pz), REPLACEABLE)) continue
        set(px, py, pz, SCULK)
        spreadAll(SCULK, px, py, pz, false)
        const e = opposite(d)
        for (let f = 0; f < 6; f++) {
          if (f === e) continue
          const [fx, fy, fz] = DIRECTIONS[f]
          if (l.getBlock(px + fx, py + fy, pz + fz) === VEIN) veinDischarged(px + fx, py + fy, pz + fz)
        }
        return true
      }
      return false
    }
    const canPlaceGrowth = (x: number, y: number, z: number) => {
      const s = l.getBlock(x, y + 1, z)
      if (!(isAir(s) || s === WATER)) return false
      let n = 0
      for (let pz = z - 4; pz <= z + 4; pz++)
        for (let py = y; py <= y + 2; py++)
          for (let px = x - 4; px <= x + 4; px++) {
            const b = l.getBlock(px, py, pz)
            if (b === 'minecraft:sculk_sensor' || b === 'minecraft:sculk_shrieker') n++
            if (n > 2) return false
          }
      return true
    }
    const decayPenalty = (c: Cursor, charge: number) => {
      const f = Math.fround(Math.fround(Math.fround(Math.sqrt((c.x - ox) ** 2 + (c.y - oy) ** 2 + (c.z - oz) ** 2)) - NO_GROWTH_RADIUS) ** 2)
      const j = (24 - NO_GROWTH_RADIUS) ** 2
      const g = Math.min(1, Math.fround(f / j))
      return Math.max(1, Math.trunc(Math.fround(Math.fround(charge * g) * 0.5)))
    }
    const attemptUseCharge = (state: string, c: Cursor, convert: boolean) => {
      if (state === SCULK) {
        const i = c.charge
        if (i === 0 || r.nextInt(CHARGE_DECAY_RATE) !== 0) return i
        const near = (c.x - ox) ** 2 + (c.y - oy) ** 2 + (c.z - oz) ** 2 < NO_GROWTH_RADIUS * NO_GROWTH_RADIUS
        if (!near && canPlaceGrowth(c.x, c.y, c.z)) {
          if (r.nextInt(GROWTH_SPAWN_COST) < i) set(c.x, c.y + 1, c.z, r.nextInt(11) === 0 ? 'minecraft:sculk_shrieker' : 'minecraft:sculk_sensor')
          return Math.max(0, i - GROWTH_SPAWN_COST)
        }
        return r.nextInt(ADDITIONAL_DECAY_RATE) !== 0 ? i : i - (near ? 1 : decayPenalty(c, i))
      }
      if (state === VEIN) {
        if (convert && attemptPlaceSculk(c.x, c.y, c.z)) return c.charge - 1
        return r.nextInt(CHARGE_DECAY_RATE) === 0 ? Math.floor(Math.fround(c.charge * 0.5)) : c.charge
      }
      return c.decayDelay > 0 ? c.charge : 0
    }
    /** 原版 isMovementUnobstructed：斜着走时，至少有一个“拐角”方向没被挡住 */
    const unobstructed = (x: number, y: number, z: number, d: number) => !isSturdy(at(x, y, z, d))
    /** 原版 Direction.fromAxisAndDirection：x → 西/东，y → 下/上，z → 北/南 */
    const dirOf = (ax: 0 | 1 | 2, v: number) => (ax === 0 ? (v < 0 ? 4 : 5) : ax === 1 ? (v < 0 ? 0 : 1) : v < 0 ? 2 : 3)
    const movementOk = (x: number, y: number, z: number, dx: number, dy: number, dz: number) => {
      if (Math.abs(dx) + Math.abs(dy) + Math.abs(dz) === 1) return true
      const ex = dirOf(0, dx)
      const ey = dirOf(1, dy)
      const ez = dirOf(2, dz)
      if (dx === 0) return unobstructed(x, y, z, ey) || unobstructed(x, y, z, ez)
      if (dy === 0) return unobstructed(x, y, z, ex) || unobstructed(x, y, z, ez)
      return unobstructed(x, y, z, ex) || unobstructed(x, y, z, ey)
    }
    const hasSubstrateAccess = (s: string, x: number, y: number, z: number) => {
      if (s !== VEIN) return false
      const m = getFaces(x, y, z)
      for (let d = 0; d < 6; d++) if (m & (1 << d) && inTag(at(x, y, z, d), 'minecraft:sculk_replaceable')) return true
      return false
    }
    const validMovement = (x: number, y: number, z: number): [number, number, number] | null => {
      let best: [number, number, number] | null = null
      for (const [dx, dy, dz] of shuffle(NON_CORNER.slice(), r)) {
        const s = l.getBlock(x + dx, y + dy, z + dz)
        if (!isBehaviour(s) || !movementOk(x, y, z, dx, dy, dz)) continue
        best = [x + dx, y + dy, z + dz]
        if (hasSubstrateAccess(s, x + dx, y + dy, z + dz)) break
      }
      return best
    }

    const update = (c: Cursor, convert: boolean) => {
      if (c.charge <= 0) return
      if (c.updateDelay > 0) {
        c.updateDelay--
        return
      }
      let s = l.getBlock(c.x, c.y, c.z)
      if (convert && attemptSpreadVein(s, c.x, c.y, c.z, c.facings)) {
        // 只有幽匿块“不会因为蔓延改变自己”
        if (s !== SCULK) s = l.getBlock(c.x, c.y, c.z)
      }
      c.charge = attemptUseCharge(s, c, convert)
      if (c.charge <= 0) {
        onDischarged(s, c.x, c.y, c.z)
        return
      }
      const p = validMovement(c.x, c.y, c.z)
      const behaviour = s // 用的是移动前这一格的行为（原版 b）
      if (p) {
        onDischarged(s, c.x, c.y, c.z)
        ;[c.x, c.y, c.z] = p
        if ((c.x - ox) ** 2 + (c.z - oz) ** 2 >= 15 * 15) {
          c.charge = 0
          return
        }
        s = l.getBlock(c.x, c.y, c.z)
      }
      if (isBehaviour(s)) c.facings = s === VEIN ? getFaces(c.x, c.y, c.z) : 0
      c.decayDelay = isBehaviour(behaviour) ? 1 : Math.max(c.decayDelay - 1, 0)
      c.updateDelay = 1
    }

    // ------------------------------------------------ SculkPatchFeature.place
    const origin = l.getBlock(ox, oy, oz)
    if (!isBehaviour(origin)) {
      if (!(isAir(origin) || origin === WATER)) return false
      let any = false
      for (let d = 0; d < 6; d++) if (isSturdy(at(ox, oy, oz, d))) any = true
      if (!any) return false
    }
    let cursors: Cursor[] = []
    const rounds = spreadRounds + growthRounds
    for (let j = 0; j < rounds; j++) {
      for (let k = 0; k < chargeCount; k++) {
        let charge = amountPerCharge
        while (charge > 0) {
          const i = Math.min(charge, 1000)
          if (cursors.length < 32) cursors.push({ x: ox, y: oy, z: oz, charge: i, updateDelay: 1, decayDelay: 0, facings: null })
          charge -= i
        }
      }
      const convert = j < spreadRounds
      for (let a = 0; a < spreadAttempts; a++) {
        const next: Cursor[] = []
        for (const c of cursors) {
          update(c, convert)
          if (c.charge > 0) next.push(c)
        }
        cursors = next
      }
      cursors = []
    }
    if (r.nextFloat() <= catalystChance && isSturdy(l.getBlock(ox, oy - 1, oz))) set(ox, oy, oz, 'minecraft:sculk_catalyst')
    const n = extraRare(r)
    for (let a = 0; a < n; a++) {
      const px = ox + r.nextInt(5) - 2
      const pz = oz + r.nextInt(5) - 2
      if (isAir(l.getBlock(px, oy, pz)) && isSturdy(l.getBlock(px, oy - 1, pz))) set(px, oy, pz, 'minecraft:sculk_shrieker')
    }
    return true
  }
}

