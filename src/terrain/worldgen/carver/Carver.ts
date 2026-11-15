/**
 * 洞穴雕刻器（原版 WorldCarver / CaveWorldCarver / CanyonWorldCarver，v5.1）。
 *
 * 1.18 以后的“奶酪洞、面条洞”在密度函数里（v0 就有了）；雕刻器是更老的那种：
 *   cave：从起点出发、随机转向的“蠕虫”隧道，有时先挖一个大房间，隧道中途会分叉
 *   canyon：又长又深的峡谷，每一层的宽度随机
 *
 * 每个区块要看周围 ±8 个区块（17×17）有没有隧道的起点：起点区块的群系（y = 0 处）决定有哪些雕刻器，
 * 每个雕刻器一个随机种子（setLargeFeatureSeed），按概率决定这里有没有起点。
 * 隧道一路挖椭球，只有落在当前区块里的部分真的挖掉。挖出来的格子交给含水层决定是空气、水还是岩浆，
 * y ≤ lava_level（−56）一律是岩浆。
 *
 * 细节都用 javap 对照过 1.21.4 的字节码（区块“中点”是 minX + 8，不是 + 7）。
 */
import { anchor, floatProvider, heightProvider, type HeightProvider } from '../feature/core'
import { inTag } from '../feature/tags'
import { cos, sin } from '../math/Mth'
import { FastLegacyRandom } from '../random/FastLegacyRandom'
import type { RandomSource } from '../random/RandomSource'
import { toLong } from '../random/RandomSource'

const f32 = Math.fround

export interface CarveTarget {
  cx: number
  cz: number
  minY: number
  height: number
  get(x: number, y: number, z: number): string
  set(x: number, y: number, z: number, block: string): void
  /** 含水层：密度 0 的位置是什么（null = 不挖，含水层的“墙”） */
  substance(x: number, y: number, z: number): { block: string; scheduleFluidUpdate: boolean } | null
  /** 生成后要“流一下”的流体 */
  markFluid(x: number, y: number, z: number): void
  /** 雕刻器挖开地表后，下面露出来的土换成什么（原版 SurfaceSystem.topMaterial） */
  topMaterial(x: number, y: number, z: number, hasFluid: boolean): string | null
}

type Rand = FastLegacyRandom
type SkipChecker = (relX: number, relY: number, relZ: number, y: number) => boolean

interface Common {
  probability: number
  y: HeightProvider
  yScale: (r: RandomSource) => number
  lavaLevel: unknown
  replaceable: string
}

/** 一个配置好的雕刻器：判断起点 + 在目标区块里挖 */
export interface ConfiguredCarver {
  isStartChunk(r: Rand): boolean
  carve(t: CarveTarget, r: Rand, startX: number, startZ: number, mask: Uint8Array): void
}

/** 世界高度信息（原版 WorldGenerationContext） */
const levelOf = (t: CarveTarget) => ({ minY: t.minY, height: t.height }) as never

export function configuredCarver(json: unknown): ConfiguredCarver | null {
  const o = json as { type: string; config: Record<string, unknown> }
  const type = o.type.replace('minecraft:', '')
  const c = o.config
  const common: Common = {
    probability: f32(c.probability as number),
    y: heightProvider(c.y),
    yScale: floatProvider(c.yScale),
    lavaLevel: c.lava_level,
    replaceable: String(c.replaceable)
  }
  if (type === 'cave') return caveCarver(common, c)
  if (type === 'canyon') return canyonCarver(common, c)
  return null // nether_cave 等（主世界用不到）
}

// ---------------------------------------------------------------- 公共：挖椭球（原版 WorldCarver.carveEllipsoid / carveBlock）

function carveEllipsoid(t: CarveTarget, cm: Common, x: number, y: number, z: number, hr: number, vr: number, mask: Uint8Array, skip: SkipChecker): boolean {
  const minX = t.cx * 16
  const minZ = t.cz * 16
  const midX = minX + 8
  const midZ = minZ + 8
  const f = 16.0 + hr * 2.0
  if (Math.abs(x - midX) > f || Math.abs(z - midZ) > f) return false
  const k = Math.max(Math.floor(x - hr) - minX - 1, 0)
  const l = Math.min(Math.floor(x + hr) - minX, 15)
  const m = Math.max(Math.floor(y - vr) - 1, t.minY + 1)
  const o = Math.min(Math.floor(y + vr) + 1, t.minY + t.height - 1 - 7)
  const p = Math.max(Math.floor(z - hr) - minZ - 1, 0)
  const q = Math.min(Math.floor(z + hr) - minZ, 15)
  const lava = anchor(cm.lavaLevel, levelOf(t))
  let carved = false
  for (let r = k; r <= l; r++) {
    const s = minX + r
    const g = (s + 0.5 - x) / hr
    for (let tz = p; tz <= q; tz++) {
      const u = minZ + tz
      const h = (u + 0.5 - z) / hr
      if (g * g + h * h >= 1.0) continue
      let reachedSurface = false
      for (let v = o; v > m; v--) {
        const w = (v - 0.5 - y) / vr
        if (skip(g, w, h, v)) continue
        const mi = ((v - t.minY) * 16 + tz) * 16 + r
        if (mask[mi]) continue
        mask[mi] = 1
        // carveBlock
        const cur = t.get(s, v, u)
        if (cur === 'minecraft:grass_block' || cur === 'minecraft:mycelium') reachedSurface = true
        if (!inTag(cur, cm.replaceable)) continue
        let state: string
        let fluidUpdate = false
        if (v <= lava) state = 'minecraft:lava'
        else {
          const sub = t.substance(s, v, u)
          if (sub === null) continue
          state = sub.block
          fluidUpdate = sub.scheduleFluidUpdate
        }
        t.set(s, v, u, state)
        const isFluid = state === 'minecraft:water' || state === 'minecraft:lava'
        if (fluidUpdate && isFluid) t.markFluid(s, v, u)
        carved = true
        if (reachedSurface && t.get(s, v - 1, u) === 'minecraft:dirt') {
          const top = t.topMaterial(s, v - 1, u, isFluid)
          if (top !== null) {
            t.set(s, v - 1, u, top)
            if (top === 'minecraft:water' || top === 'minecraft:lava') t.markFluid(s, v - 1, u)
          }
        }
      }
    }
  }
  return carved
}

/** 原版 WorldCarver.canReach：隧道剩下的长度还能不能够到这个区块 */
function canReach(t: CarveTarget, x: number, z: number, branchIndex: number, branchCount: number, width: number): boolean {
  const d = t.cx * 16 + 8
  const e = t.cz * 16 + 8
  const f = x - d
  const g = z - e
  const h = branchCount - branchIndex
  const i = width + 2.0 + 16.0
  return f * f + g * g - h * h <= i * i
}

// ---------------------------------------------------------------- 洞穴（CaveWorldCarver）

function caveCarver(cm: Common, c: Record<string, unknown>): ConfiguredCarver {
  const hMul = floatProvider(c.horizontal_radius_multiplier)
  const vMul = floatProvider(c.vertical_radius_multiplier)
  const floor = floatProvider(c.floor_level)
  const RANGE = 4
  const CAVE_BOUND = 15

  const thicknessOf = (r: Rand) => {
    let f = f32(f32(r.nextFloat() * 2.0) + r.nextFloat())
    if (r.nextInt(10) === 0) f = f32(f * f32(f32(f32(r.nextFloat() * r.nextFloat()) * 3.0) + 1.0))
    return f
  }

  const tunnel = (t: CarveTarget, seed: bigint, x: number, y: number, z: number, hm: number, vm: number, thickness: number, yaw: number, pitch: number, branchIndex: number, branchCount: number, ratio: number, mask: Uint8Array, skip: SkipChecker): void => {
    const r = new FastLegacyRandom(seed)
    const i = r.nextInt(Math.trunc(branchCount / 2)) + Math.trunc(branchCount / 4)
    const steep = r.nextInt(6) === 0
    let f = 0
    let g = 0
    for (let j = branchIndex; j < branchCount; j++) {
      const d = 1.5 + f32(sin(f32(f32(f32(Math.PI) * j) / branchCount)) * thickness)
      const e = d * ratio
      const h = cos(pitch)
      x += f32(cos(yaw) * h)
      y += sin(pitch)
      z += f32(sin(yaw) * h)
      pitch = f32(pitch * (steep ? f32(0.92) : f32(0.7)))
      pitch = f32(pitch + f32(g * f32(0.1)))
      yaw = f32(yaw + f32(f * f32(0.1)))
      g = f32(g * f32(0.9))
      f = f32(f * f32(0.75))
      g = f32(g + f32(f32(f32(r.nextFloat() - r.nextFloat()) * r.nextFloat()) * 2.0))
      f = f32(f + f32(f32(f32(r.nextFloat() - r.nextFloat()) * r.nextFloat()) * 4.0))
      if (j === i && thickness > 1.0) {
        tunnel(t, r.nextLong(), x, y, z, hm, vm, f32(f32(r.nextFloat() * 0.5) + 0.5), f32(yaw - f32(1.5707964)), f32(pitch / 3.0), j, branchCount, 1.0, mask, skip)
        tunnel(t, r.nextLong(), x, y, z, hm, vm, f32(f32(r.nextFloat() * 0.5) + 0.5), f32(yaw + f32(1.5707964)), f32(pitch / 3.0), j, branchCount, 1.0, mask, skip)
        return
      }
      if (r.nextInt(4) === 0) continue
      if (!canReach(t, x, z, j, branchCount, thickness)) return
      carveEllipsoid(t, cm, x, y, z, d * hm, e * vm, mask, skip)
    }
  }

  return {
    isStartChunk: (r) => r.nextFloat() <= cm.probability,
    carve(t, r, sx, sz, mask) {
      const i = (RANGE * 2 - 1) * 16
      const j = r.nextInt(r.nextInt(r.nextInt(CAVE_BOUND) + 1) + 1)
      for (let k = 0; k < j; k++) {
        const d = sx * 16 + r.nextInt(16)
        const e = cm.y(r as never, levelOf(t))
        const f = sz * 16 + r.nextInt(16)
        const g = hMul(r as never)
        const h = vMul(r as never)
        const l = floor(r as never)
        const skip: SkipChecker = (relX, relY, relZ) => relY <= l || relX * relX + relY * relY + relZ * relZ >= 1.0
        let m = 1
        if (r.nextInt(4) === 0) {
          const n = cm.yScale(r as never)
          const o = f32(1.0 + f32(r.nextFloat() * 6.0))
          // createRoom
          const rd = 1.5 + f32(sin(f32(1.5707964)) * o)
          carveEllipsoid(t, cm, d + 1.0, e, f, rd, rd * n, mask, skip)
          m += r.nextInt(4)
        }
        for (let p = 0; p < m; p++) {
          const q = f32(r.nextFloat() * f32(f32(Math.PI) * 2))
          const o = f32(f32(r.nextFloat() - 0.5) / 4.0)
          const thick = thicknessOf(r)
          const s = i - r.nextInt(Math.trunc(i / 4))
          tunnel(t, r.nextLong(), d, e, f, g, h, thick, q, o, 0, s, 1.0, mask, skip)
        }
      }
    }
  }
}

// ---------------------------------------------------------------- 峡谷（CanyonWorldCarver）

function canyonCarver(cm: Common, c: Record<string, unknown>): ConfiguredCarver {
  const vRot = floatProvider(c.vertical_rotation)
  const shape = c.shape as Record<string, unknown>
  const distanceFactor = floatProvider(shape.distance_factor)
  const thickness = floatProvider(shape.thickness)
  const widthSmoothness = shape.width_smoothness as number
  const hRadius = floatProvider(shape.horizontal_radius_factor)
  const vDefault = f32(shape.vertical_radius_default_factor as number)
  const vCenter = f32(shape.vertical_radius_center_factor as number)
  const RANGE = 4

  const doCarve = (t: CarveTarget, seed: bigint, x: number, y: number, z: number, thick: number, yaw: number, pitch: number, branchIndex: number, branchCount: number, ratio: number, mask: Uint8Array) => {
    const r = new FastLegacyRandom(seed)
    // 每一层的宽度系数
    const widths = new Float32Array(t.height)
    let wf = 1.0
    for (let j = 0; j < t.height; j++) {
      if (j === 0 || r.nextInt(widthSmoothness) === 0) wf = f32(1.0 + f32(r.nextFloat() * r.nextFloat()))
      widths[j] = f32(wf * wf)
    }
    const skip: SkipChecker = (relX, relY, relZ, yy) => (relX * relX + relZ * relZ) * widths[yy - t.minY - 1] + (relY * relY) / 6.0 >= 1.0
    let f = 0
    let g = 0
    for (let i = branchIndex; i < branchCount; i++) {
      let d = 1.5 + f32(sin(f32(f32(i * f32(Math.PI)) / branchCount)) * thick)
      let e = d * ratio
      d *= hRadius(r as never)
      // updateVerticalRadius
      const ff = f32(1.0 - f32(Math.abs(f32(0.5 - f32(i / branchCount))) * 2))
      const gg = f32(vDefault + f32(vCenter * ff))
      e = gg * e * f32(f32(r.nextFloat() * f32(0.25)) + f32(0.75))
      const h = cos(pitch)
      const jj = sin(pitch)
      x += f32(cos(yaw) * h)
      y += jj
      z += f32(sin(yaw) * h)
      pitch = f32(pitch * f32(0.7))
      pitch = f32(pitch + f32(g * f32(0.05)))
      yaw = f32(yaw + f32(f * f32(0.05)))
      g = f32(g * f32(0.8))
      f = f32(f * 0.5)
      g = f32(g + f32(f32(f32(r.nextFloat() - r.nextFloat()) * r.nextFloat()) * 2.0))
      f = f32(f + f32(f32(f32(r.nextFloat() - r.nextFloat()) * r.nextFloat()) * 4.0))
      if (r.nextInt(4) === 0) continue
      if (!canReach(t, x, z, i, branchCount, thick)) return
      carveEllipsoid(t, cm, x, y, z, d, e, mask, skip)
    }
  }

  return {
    isStartChunk: (r) => r.nextFloat() <= cm.probability,
    carve(t, r, sx, sz, mask) {
      const i = (RANGE * 2 - 1) * 16
      const d = sx * 16 + r.nextInt(16)
      const j = cm.y(r as never, levelOf(t))
      const e = sz * 16 + r.nextInt(16)
      const f = f32(r.nextFloat() * f32(f32(Math.PI) * 2))
      const g = vRot(r as never)
      const h = cm.yScale(r as never)
      const k = thickness(r as never)
      const l = Math.trunc(f32(i * distanceFactor(r as never)))
      doCarve(t, r.nextLong(), d, j, e, k, f, g, 0, l, h, mask)
    }
  }
}

/** 原版 WorldgenRandom.setLargeFeatureSeed（雕刻器的起点种子） */
export function setLargeFeatureSeed(r: FastLegacyRandom, seed: bigint, x: number, z: number): void {
  r.setSeed(seed)
  const a = r.nextLong()
  const b = r.nextLong()
  r.setSeed(toLong((BigInt(x) * a) ^ (BigInt(z) * b) ^ seed))
}
