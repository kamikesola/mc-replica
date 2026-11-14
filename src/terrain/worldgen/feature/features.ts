/**
 * 地物本身（原版 Feature 的各个子类），以及按 ID 查找 placed_feature / configured_feature 的注册表。
 *
 * v5 实现了：ore（矿石、石头团、土团……）、freeze_top_layer（积雪和冰）、tree（见 tree.ts）、
 * huge_red_mushroom / huge_brown_mushroom，以及三种“随机选一个”的选择器。
 * 其他类型（花草、湖、晶洞……）暂时当成“什么也不放”，见 FeatureRegistry.unsupported。
 */
import { blockPredicate, blocksMotion, canBeReplaced, hasFullTopFace, intProvider, isAir, isLeaves, isOutsideBuildHeight, parseState, ruleTest, stateProvider, type WorldGenLevel } from './core'
import { inTag } from './tags'
import { PlacedFeature, placementModifier, type FeaturePlacer, type PlacementContext } from './placement'
import { treeFeature } from './tree'
import { lerp, sin } from '../math/Mth'
import type { RandomSource } from '../random/RandomSource'
import type { Registry } from '../registry/Registry'
import { normalizeId } from '../registry/Registry'

const f32 = Math.fround

// ---------------------------------------------------------------- 矿石（原版 OreFeature）

function oreFeature(cfg: Record<string, unknown>): FeaturePlacer {
  const size = cfg.size as number
  const discard = f32(cfg.discard_chance_on_air_exposure as number)
  const targets = (cfg.targets as { state: unknown; target: unknown }[]).map((t) => ({ state: parseState(t.state), test: ruleTest(t.target) }))

  const isAdjacentToAir = (l: WorldGenLevel, x: number, y: number, z: number) =>
    isAir(l.getBlock(x, y - 1, z)) || isAir(l.getBlock(x, y + 1, z)) || isAir(l.getBlock(x, y, z - 1)) || isAir(l.getBlock(x, y, z + 1)) || isAir(l.getBlock(x - 1, y, z)) || isAir(l.getBlock(x + 1, y, z))

  const shouldSkipAirCheck = (r: RandomSource) => {
    if (discard <= 0) return true
    if (discard >= 1) return false
    return r.nextFloat() >= discard
  }

  const doPlace = (l: WorldGenLevel, r: RandomSource, minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number, x: number, y: number, z: number, width: number, height: number) => {
    let placed = 0
    const done = new Uint8Array(width * height * width)
    const ds = new Float64Array(size * 4)
    for (let k = 0; k < size; k++) {
      const t = f32(k / size)
      const d = lerp(t, minX, maxX)
      const e = lerp(t, minY, maxY)
      const g = lerp(t, minZ, maxZ)
      const h = (r.nextDouble() * size) / 16.0
      const sinPart = f32(sin(f32(f32(Math.PI) * t)) + 1.0) // (Mth.sin((float)Math.PI * f) + 1.0F)，float
      const rad = (sinPart * h + 1.0) / 2.0
      ds[k * 4] = d
      ds[k * 4 + 1] = e
      ds[k * 4 + 2] = g
      ds[k * 4 + 3] = rad
    }
    // 互相包含的球只留大的
    for (let k = 0; k < size - 1; k++) {
      if (ds[k * 4 + 3] <= 0) continue
      for (let m = k + 1; m < size; m++) {
        if (ds[m * 4 + 3] <= 0) continue
        const d = ds[k * 4] - ds[m * 4]
        const e = ds[k * 4 + 1] - ds[m * 4 + 1]
        const g = ds[k * 4 + 2] - ds[m * 4 + 2]
        const h = ds[k * 4 + 3] - ds[m * 4 + 3]
        if (!(h * h > d * d + e * e + g * g)) continue
        if (h > 0) ds[m * 4 + 3] = -1
        else ds[k * 4 + 3] = -1
      }
    }
    for (let m = 0; m < size; m++) {
      const d = ds[m * 4 + 3]
      if (d < 0) continue
      const e = ds[m * 4]
      const g = ds[m * 4 + 1]
      const h = ds[m * 4 + 2]
      const n = Math.max(Math.floor(e - d), x)
      const o = Math.max(Math.floor(g - d), y)
      const p = Math.max(Math.floor(h - d), z)
      const q = Math.max(Math.floor(e + d), n)
      const s = Math.max(Math.floor(g + d), o)
      const t = Math.max(Math.floor(h + d), p)
      for (let bx = n; bx <= q; bx++) {
        const u = (bx + 0.5 - e) / d
        if (!(u * u < 1.0)) continue
        for (let by = o; by <= s; by++) {
          const w = (by + 0.5 - g) / d
          if (!(u * u + w * w < 1.0)) continue
          next: for (let bz = p; bz <= t; bz++) {
            const ab = (bz + 0.5 - h) / d
            if (!(u * u + w * w + ab * ab < 1.0) || isOutsideBuildHeight(l, by)) continue
            const idx = bx - x + (by - y) * width + (bz - z) * width * height
            if (done[idx]) continue
            done[idx] = 1
            if (!l.canWrite(bx, by, bz)) continue
            const cur = l.getBlock(bx, by, bz)
            for (const tg of targets) {
              if (!tg.test(cur, r)) continue
              if (!shouldSkipAirCheck(r) && isAdjacentToAir(l, bx, by, bz)) continue
              l.setBlock(bx, by, bz, tg.state)
              placed++
              continue next
            }
          }
        }
      }
    }
    return placed > 0
  }

  return (l, r, x0, y0, z0) => {
    const f = f32(r.nextFloat() * f32(Math.PI))
    const g = f32(size / 8.0)
    const i = Math.ceil(f32(f32(f32(f32(size / 16.0) * 2.0) + 1.0) / 2.0))
    const d = x0 + Math.sin(f) * g
    const e = x0 - Math.sin(f) * g
    const h = z0 + Math.cos(f) * g
    const j = z0 - Math.cos(f) * g
    const l1 = y0 + r.nextInt(3) - 2
    const m1 = y0 + r.nextInt(3) - 2
    const n = x0 - Math.ceil(g) - i
    const o = y0 - 2 - i
    const p = z0 - Math.ceil(g) - i
    const q = 2 * (Math.ceil(g) + i)
    const rr = 2 * (2 + i)
    for (let s = n; s <= n + q; s++) {
      for (let t = p; t <= p + q; t++) {
        if (o > l.getHeight('OCEAN_FLOOR_WG', s, t)) continue
        return doPlace(l, r, d, e, h, j, l1, m1, n, o, p, q, rr)
      }
    }
    return false
  }
}

// ---------------------------------------------------------------- 圆盘（原版 DiskFeature：水下的沙、黏土、沙砾团）

function diskFeature(cfg: Record<string, unknown>): FeaturePlacer {
  const half = cfg.half_height as number
  const radius = intProvider(cfg.radius)
  const target = blockPredicate(cfg.target)
  const sp = cfg.state_provider as { fallback: unknown; rules: { if_true: unknown; then: unknown }[] }
  const fallback = stateProvider(sp.fallback)
  const rules = sp.rules.map((r) => ({ test: blockPredicate(r.if_true), then: stateProvider(r.then) }))
  // 原版 RuleBasedBlockStateProvider：第一条满足的规则，否则用 fallback
  const state = (l: WorldGenLevel, r: RandomSource, x: number, y: number, z: number) => {
    for (const rule of rules) if (rule.test(l, x, y, z)) return rule.then(r, x, y, z)
    return fallback(r, x, y, z)
  }
  return (l, r, x0, y0, z0) => {
    let placed = false
    const top = y0 + half
    const bottom = y0 - half - 1
    const rad = radius(r)
    for (let z = z0 - rad; z <= z0 + rad; z++)
      for (let x = x0 - rad; x <= x0 + rad; x++) {
        const n = x - x0
        const o = z - z0
        if (n * n + o * o > rad * rad) continue
        for (let y = top; y > bottom; y--) {
          if (!target(l, x, y, z)) continue
          l.setBlock(x, y, z, state(l, r, x, y, z))
          placed = true
        }
      }
    return placed
  }
}

// ---------------------------------------------------------------- 积雪和冰（原版 SnowAndFreezeFeature）

/** 原版 Biome.shouldFreeze / shouldSnow 的温度条件：温度 < 0.15 */
const cold = (l: WorldGenLevel, b: string, x: number, y: number, z: number) => l.temperature(b, x, y, z) < f32(0.15)

function freezeTopLayer(): FeaturePlacer {
  return (l, _r, x0, _y, z0) => {
    for (let i = 0; i < 16; i++)
      for (let j = 0; j < 16; j++) {
        const x = x0 + i
        const z = z0 + j
        const y = l.getHeight('MOTION_BLOCKING', x, z)
        const biome = l.getBiome(x, y, z)
        // 水面结冰：下面那一格是水源，并且够冷（没有光源，方块光照总是 0）
        const inWorld = (yy: number) => yy >= l.minY && yy < l.minY + l.height
        if (inWorld(y - 1) && cold(l, biome, x, y - 1, z) && l.getBlock(x, y - 1, z) === 'minecraft:water') l.setBlock(x, y - 1, z, 'minecraft:ice')
        // 下雪：这一格是空气，下面能放雪
        if (!inWorld(y) || !cold(l, biome, x, y, z)) continue
        const here = l.getBlock(x, y, z)
        if (!(isAir(here) || here === 'minecraft:snow')) continue
        const below = l.getBlock(x, y - 1, z)
        if (inTag(below, 'minecraft:snow_layer_cannot_survive_on')) continue
        if (!inTag(below, 'minecraft:snow_layer_can_survive_on') && !hasFullTopFace(below)) continue
        l.setBlock(x, y, z, 'minecraft:snow')
        // 原版还会把下面的草方块设成 snowy=true（显示成雪地草方块），我们的方块没有这个属性
      }
    return true
  }
}

// ---------------------------------------------------------------- 巨型蘑菇（原版 AbstractHugeMushroomFeature）

/** 原版 isSolidRender：不透明的完整方块 */
const isSolidRender = (b: string) => blocksMotion(b) && !isLeaves(b) && b !== 'minecraft:snow' && !b.endsWith('_carpet') && !b.endsWith('glass')

function hugeMushroom(cfg: Record<string, unknown>, red: boolean): FeaturePlacer {
  const cap = stateProvider(cfg.cap_provider)
  const stem = stateProvider(cfg.stem_provider)
  const radius = (cfg.foliage_radius as number) ?? 2
  const radiusAt = (k: number, i: number) => (red ? (k < i && k >= i - 3 ? radius : k === i ? radius : 0) : k <= 3 ? 0 : radius)
  return (l, r, x, y, z) => {
    let i = r.nextInt(3) + 4
    if (r.nextInt(12) === 0) i *= 2
    if (y < l.minY + 1 || y + i + 1 > l.minY + l.height - 1) return false
    const below = l.getBlock(x, y - 1, z)
    if (!inTag(below, 'minecraft:dirt') && below !== 'minecraft:mycelium' && below !== 'minecraft:podzol') return false
    for (let k = 0; k <= i; k++) {
      const rad = red ? radiusAt(k, -1) : radiusAt(k, i)
      for (let n = -rad; n <= rad; n++)
        for (let o = -rad; o <= rad; o++) {
          const b = l.getBlock(x + n, y + k, z + o)
          if (!(isAir(b) || isLeaves(b))) return false
        }
    }
    // 菌盖
    if (red) {
      for (let j = i - 3; j <= i; j++) {
        const k = j < i ? radius : radius - 1
        for (let m = -k; m <= k; m++)
          for (let n = -k; n <= k; n++) {
            const e5 = m === -k || m === k
            const e6 = n === -k || n === k
            if (j < i && e5 === e6) continue
            if (isSolidRender(l.getBlock(x + m, y + j, z + n))) continue
            l.setBlock(x + m, y + j, z + n, cap(r, x, y, z))
          }
      }
    } else {
      for (let k = -radius; k <= radius; k++)
        for (let m = -radius; m <= radius; m++) {
          const e5 = k === -radius || k === radius
          const e6 = m === -radius || m === radius
          if (e5 && e6) continue
          if (isSolidRender(l.getBlock(x + k, y + i, z + m))) continue
          l.setBlock(x + k, y + i, z + m, cap(r, x, y, z))
        }
    }
    // 菌柄
    for (let j = 0; j < i; j++) {
      if (isSolidRender(l.getBlock(x, y + j, z))) continue
      l.setBlock(x, y + j, z, stem(r, x, y, z))
    }
    return true
  }
}

// ---------------------------------------------------------------- 注册表

export class FeatureRegistry {
  private readonly placed = new Map<string, PlacedFeature>()
  private readonly configured = new Map<string, FeaturePlacer>()
  /** 放了也什么都不会发生的地物（类型没实现）：跳过，省掉它的放置修饰器（很多要查生物群系） */
  private readonly noop = new WeakSet<FeaturePlacer>()
  /** 遇到的、还没实现的地物类型 → 次数（调试用） */
  readonly unsupported = new Map<string, number>()

  constructor(private readonly registry: Registry) {}

  /** placed_feature：ID 或内联 JSON */
  placedFeature(ref: unknown): PlacedFeature {
    if (typeof ref === 'string') {
      const id = normalizeId(ref)
      let p = this.placed.get(id)
      if (!p) {
        const json = this.registry.placedFeature.get(id)
        if (!json) throw new Error(`找不到 placed_feature ${id}`)
        p = this.build(id, json)
        this.placed.set(id, p)
      }
      return p
    }
    return this.build('(内联)', ref)
  }

  private build(id: string, json: unknown): PlacedFeature {
    const o = json as { feature: unknown; placement: unknown[] }
    const f = this.configuredFeature(o.feature)
    return new PlacedFeature(id, o.placement.map(placementModifier), f, this.noop.has(f))
  }

  configuredFeature(ref: unknown): FeaturePlacer {
    if (typeof ref === 'string') {
      const id = normalizeId(ref)
      let f = this.configured.get(id)
      if (!f) {
        const json = this.registry.configuredFeature.get(id)
        if (!json) throw new Error(`找不到 configured_feature ${id}`)
        // 先放一个占位，防止互相引用时无限递归
        this.configured.set(id, (...a) => f!(...a))
        f = this.buildConfigured(json)
        this.configured.set(id, f)
      }
      return f
    }
    return this.buildConfigured(ref)
  }

  private markNoop(type: string): FeaturePlacer {
    const f: FeaturePlacer = () => false
    this.noop.add(f)
    this.unsupported.set(type, (this.unsupported.get(type) ?? 0) + 1)
    return f
  }

  private buildConfigured(json: unknown): FeaturePlacer {
    const o = json as { type: string; config: Record<string, unknown> }
    const type = o.type.replace('minecraft:', '')
    const cfg = o.config
    // 嵌套的 placed_feature 没有 topFeature
    const nestedNoop = (refs: unknown[]) => refs.every((ref) => this.placedFeature(ref).noop)
    const nested = (ref: unknown) => {
      const p = this.placedFeature(ref)
      return (l: WorldGenLevel, r: RandomSource, x: number, y: number, z: number) => p.place({ level: l, topFeature: null, biomeHasFeature: () => false } as PlacementContext, r, x, y, z)
    }
    switch (type) {
      case 'ore':
        return oreFeature(cfg)
      case 'disk':
        return diskFeature(cfg)
      case 'freeze_top_layer':
        return freezeTopLayer()
      case 'tree':
        return treeFeature(cfg, { place: (id, l, r, x, y, z) => this.configuredFeature(id)(l, r, x, y, z) })
      case 'huge_red_mushroom':
        return hugeMushroom(cfg, true)
      case 'huge_brown_mushroom':
        return hugeMushroom(cfg, false)
      case 'random_selector': {
        if (nestedNoop([...(cfg.features as { feature: unknown }[]).map((e) => e.feature), cfg.default])) return this.markNoop(type)
        const items = (cfg.features as { chance: number; feature: unknown }[]).map((e) => ({ chance: f32(e.chance), place: nested(e.feature) }))
        const def = nested(cfg.default)
        return (l, r, x, y, z) => {
          for (const e of items) if (r.nextFloat() < e.chance) return e.place(l, r, x, y, z)
          return def(l, r, x, y, z)
        }
      }
      case 'simple_random_selector': {
        if (nestedNoop(cfg.features as unknown[])) return this.markNoop(type)
        const items = (cfg.features as unknown[]).map(nested)
        return (l, r, x, y, z) => items[r.nextInt(items.length)](l, r, x, y, z)
      }
      case 'random_boolean_selector': {
        if (nestedNoop([cfg.feature_true, cfg.feature_false])) return this.markNoop(type)
        const t = nested(cfg.feature_true)
        const f = nested(cfg.feature_false)
        return (l, r, x, y, z) => (r.nextBoolean() ? t : f)(l, r, x, y, z)
      }
      default:
        return this.markNoop(type)
    }
  }
}

export { canBeReplaced }
