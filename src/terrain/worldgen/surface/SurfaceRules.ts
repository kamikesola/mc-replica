import type { NormalNoise } from '../noise/NormalNoise'
import type { PositionalRandomFactory } from '../random/RandomSource'

/**
 * 地表规则（原版 SurfaceRules）：noise_settings 里的 surface_rule 是一棵 JSON 树，
 * 对地表附近的每个石头方块从上到下问一遍“这里该换成什么”。和密度函数一样，先解析成函数再执行。
 *
 *   规则（rule）                         条件（condition）
 *   block      → 固定方块               biome            这个位置的生物群系在列表里
 *   sequence   → 依次试，第一个有结果的  noise_threshold  某个 2D 噪声在区间里
 *   condition  → 条件成立才执行子规则    vertical_gradient y 越低越可能成立（基岩、深板岩的过渡）
 *   bandlands  → 恶地的彩色陶瓦条纹      y_above / water   在某个高度 / 水面以上
 *                                        stone_depth      离地表（或洞顶）有几格
 *                                        steep            陡坡；hole 没有表层；not 取反
 *                                        temperature      冷到会下雪
 *                                        above_preliminary_surface 在“预估地表”以上（不是洞里）
 *
 * 方块名在这里是字符串，由调用方（surface.ts）换成自己的方块 ID。
 */

/** 规则执行时能看到的信息（原版 SurfaceRules.Context） */
export interface SurfaceContext {
  blockX: number
  blockY: number
  blockZ: number
  /** 表层厚度：由 surface 噪声决定，大约 2~6 格 */
  surfaceDepth: number
  /** 从上往下数，这是这段石头的第几格（第一格是 1） */
  stoneDepthAbove: number
  /** 从下往上数，这是这段石头的第几格（洞顶用） */
  stoneDepthBelow: number
  /** 这一列上方最近的水面 y + 1；没有水时是 Number.MIN_SAFE_INTEGER */
  waterHeight: number
  /** 下面这些按需计算 */
  biome(): string
  surfaceSecondary(): number
  minSurfaceLevel(): number
  steep(): boolean
  coldEnoughToSnow(): boolean
  /** 世界最低 / 最高的 y（解析高度锚点用） */
  minY: number
  maxY: number
}

export interface SurfaceDeps {
  noise(id: string): NormalNoise
  random(id: string): PositionalRandomFactory
  /** 恶地的陶瓦条纹（原版 SurfaceSystem.getBand） */
  band(x: number, y: number, z: number): string
}

export type Rule = (ctx: SurfaceContext) => string | null
type Condition = (ctx: SurfaceContext) => boolean

const id = (s: string) => (s.includes(':') ? s : `minecraft:${s}`)
const strip = (t: unknown) => id(String(t))
const NO_WATER = Number.MIN_SAFE_INTEGER

/** 高度锚点：{absolute: y} / {above_bottom: n} / {below_top: n} */
function anchor(json: unknown, ctx: SurfaceContext): number {
  const o = json as Record<string, number>
  if ('absolute' in o) return o.absolute
  if ('above_bottom' in o) return ctx.minY + o.above_bottom
  if ('below_top' in o) return ctx.maxY - o.below_top
  throw new Error(`无法解析的高度锚点：${JSON.stringify(json)}`)
}

/** 原版 Mth.map */
const map = (v: number, a: number, b: number, c: number, d: number) => c + ((v - a) / (b - a)) * (d - c)

export function parseRule(json: unknown, deps: SurfaceDeps): Rule {
  const o = json as Record<string, unknown>
  switch (strip(o.type)) {
    case 'minecraft:block': {
      const state = o.result_state as { Name: string }
      const name = id(state.Name)
      return () => name
    }
    case 'minecraft:sequence': {
      const list = (o.sequence as unknown[]).map((r) => parseRule(r, deps))
      return (ctx) => {
        for (const r of list) {
          const v = r(ctx)
          if (v !== null) return v
        }
        return null
      }
    }
    case 'minecraft:condition': {
      const cond = parseCondition(o.if_true, deps)
      const then = parseRule(o.then_run, deps)
      return (ctx) => (cond(ctx) ? then(ctx) : null)
    }
    case 'minecraft:bandlands':
      return (ctx) => deps.band(ctx.blockX, ctx.blockY, ctx.blockZ)
    default:
      throw new Error(`不支持的地表规则类型：${String(o.type)}`)
  }
}

export function parseCondition(json: unknown, deps: SurfaceDeps): Condition {
  const o = json as Record<string, unknown>
  switch (strip(o.type)) {
    case 'minecraft:biome': {
      const set = new Set((o.biome_is as string[]).map(id))
      return (ctx) => set.has(ctx.biome())
    }
    case 'minecraft:noise_threshold': {
      const noise = deps.noise(id(String(o.noise)))
      const min = Number(o.min_threshold)
      const max = Number(o.max_threshold)
      return (ctx) => {
        const v = noise.getValue(ctx.blockX, 0, ctx.blockZ)
        return v >= min && v <= max
      }
    }
    case 'minecraft:vertical_gradient': {
      const random = deps.random(id(String(o.random_name)))
      return (ctx) => {
        const i = ctx.blockY
        const top = anchor(o.true_at_and_below, ctx)
        const bottom = anchor(o.false_at_and_above, ctx)
        if (i <= top) return true
        if (i >= bottom) return false
        const d = map(i, top, bottom, 1.0, 0.0)
        return random.at(ctx.blockX, i, ctx.blockZ).nextFloat() < d
      }
    }
    case 'minecraft:y_above': {
      const mul = Number(o.surface_depth_multiplier)
      const add = o.add_stone_depth === true
      return (ctx) => ctx.blockY + (add ? ctx.stoneDepthAbove : 0) >= anchor(o.anchor, ctx) + ctx.surfaceDepth * mul
    }
    case 'minecraft:water': {
      const offset = Number(o.offset)
      const mul = Number(o.surface_depth_multiplier)
      const add = o.add_stone_depth === true
      return (ctx) => ctx.waterHeight === NO_WATER || ctx.blockY + (add ? ctx.stoneDepthAbove : 0) >= ctx.waterHeight + offset + ctx.surfaceDepth * mul
    }
    case 'minecraft:temperature':
      return (ctx) => ctx.coldEnoughToSnow()
    case 'minecraft:steep':
      return (ctx) => ctx.steep()
    case 'minecraft:not': {
      const c = parseCondition(o.invert, deps)
      return (ctx) => !c(ctx)
    }
    case 'minecraft:hole':
      return (ctx) => ctx.surfaceDepth <= 0
    case 'minecraft:above_preliminary_surface':
      return (ctx) => ctx.blockY >= ctx.minSurfaceLevel()
    case 'minecraft:stone_depth': {
      const offset = Number(o.offset)
      const addSurface = o.add_surface_depth === true
      const range = Number(o.secondary_depth_range)
      const ceiling = o.surface_type === 'ceiling'
      return (ctx) => {
        const i = ceiling ? ctx.stoneDepthBelow : ctx.stoneDepthAbove
        const j = addSurface ? ctx.surfaceDepth : 0
        const k = range === 0 ? 0 : Math.trunc(map(ctx.surfaceSecondary(), -1.0, 1.0, 0.0, range))
        return i <= 1 + offset + j + k
      }
    }
    default:
      throw new Error(`不支持的地表条件类型：${String(o.type)}`)
  }
}

export { NO_WATER }
