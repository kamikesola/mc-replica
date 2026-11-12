import type { BlendedNoiseParams } from '../noise/BlendedNoise'
import { normalizeId, parseNoiseParameters, type Registry } from '../registry/Registry'
import {
  Ap2,
  type Ap2Type,
  BlendDensity,
  BlendedNoiseFunction,
  Clamp,
  Constant,
  type DensityFunction,
  EndIslands,
  FixedValue,
  Mapped,
  type MappedType,
  Marker,
  type MarkerType,
  Noise,
  NoiseHolder,
  RangeChoice,
  Reference,
  ShiftedNoise,
  ShiftNoise,
  Spline,
  type SplineNode,
  WeirdScaledSampler,
  YClampedGradient
} from './DensityFunction'

/**
 * 把 JSON 解析成密度函数树 —— 相当于原版 DensityFunction.DIRECT_CODEC。
 *
 * JSON 值有三种写法：
 *   1. 数字         → constant
 *   2. 字符串       → 引用注册表里的另一个密度函数
 *   3. { "type": … } → 具体类型，字段名与原版完全一致
 *
 * 解析得到的树还没有绑定种子（噪声都是空的），要交给 RandomState 才能真正求值。
 */
export class DensityFunctionParser {
  private readonly cache = new Map<string, DensityFunction>()
  /** 解析过程中的提示（目前 1.21.1 的类型都已实现，预留给以后的新类型） */
  readonly warnings: string[] = []

  constructor(readonly registry: Registry) {}

  /** 按 ID 取注册表里的密度函数（解析结果会缓存） */
  get(id: string): DensityFunction {
    id = normalizeId(id)
    let fn = this.cache.get(id)
    if (fn === undefined) {
      const json = this.registry.densityFunction.get(id)
      if (json === undefined) throw new Error(`找不到密度函数 ${id}`)
      fn = this.parse(json, id)
      this.cache.set(id, fn)
    }
    return fn
  }

  parse(json: unknown, path = '$'): DensityFunction {
    if (typeof json === 'number') return new Constant(json)
    if (typeof json === 'string') {
      const id = normalizeId(json)
      return new Reference(id, (rid) => this.get(rid))
    }
    if (typeof json !== 'object' || json === null || Array.isArray(json)) {
      throw new Error(`${path}: 密度函数必须是数字、字符串或对象`)
    }
    const o = json as Record<string, unknown>
    if (typeof o.type !== 'string') throw new Error(`${path}: 缺少 "type"`)
    const type = normalizeId(o.type)
    if (!type.startsWith('minecraft:')) throw new Error(`${path}: 未知类型 ${type}`)
    const t = type.slice('minecraft:'.length)

    const df = (key: string) => this.parse(req(o, key, path), `${path}.${key}`)
    const num = (key: string) => reqNumber(o, key, path)
    const noise = (key: string) => this.noiseHolder(req(o, key, path), `${path}.${key}`)

    switch (t) {
      case 'constant':
        return new Constant(num('argument'))
      case 'y_clamped_gradient':
        return new YClampedGradient(num('from_y'), num('to_y'), num('from_value'), num('to_value'))
      case 'noise':
        return new Noise(noise('noise'), num('xz_scale'), num('y_scale'))
      case 'shifted_noise':
        return new ShiftedNoise(df('shift_x'), df('shift_y'), df('shift_z'), num('xz_scale'), num('y_scale'), noise('noise'))
      case 'shift_a':
      case 'shift_b':
      case 'shift':
        return new ShiftNoise(t, noise('argument'))
      case 'old_blended_noise': {
        const params: BlendedNoiseParams = {
          xzScale: num('xz_scale'),
          yScale: num('y_scale'),
          xzFactor: num('xz_factor'),
          yFactor: num('y_factor'),
          smearScaleMultiplier: num('smear_scale_multiplier')
        }
        return new BlendedNoiseFunction(params)
      }
      case 'interpolated':
      case 'flat_cache':
      case 'cache_2d':
      case 'cache_once':
      case 'cache_all_in_cell':
        return new Marker(t as MarkerType, df('argument'))
      case 'blend_density':
        return new BlendDensity(df('argument'))
      case 'blend_alpha':
        return new FixedValue('blend_alpha', 1.0)
      case 'blend_offset':
        return new FixedValue('blend_offset', 0.0)
      case 'beardifier':
        return new FixedValue('beardifier', 0.0)
      case 'end_islands':
        // 解析时用种子 0（原版 codec 也是这样），绑定种子时由 RandomState 换成真正的种子
        return new EndIslands(0n)
      case 'abs':
      case 'square':
      case 'cube':
      case 'half_negative':
      case 'quarter_negative':
      case 'squeeze':
        return new Mapped(t as MappedType, df('argument'))
      case 'add':
      case 'mul':
      case 'min':
      case 'max':
        return new Ap2(t as Ap2Type, df('argument1'), df('argument2'))
      case 'clamp':
        return new Clamp(df('input'), num('min'), num('max'))
      case 'range_choice':
        return new RangeChoice(
          df('input'),
          num('min_inclusive'),
          num('max_exclusive'),
          df('when_in_range'),
          df('when_out_of_range')
        )
      case 'weird_scaled_sampler': {
        const mapper = req(o, 'rarity_value_mapper', path)
        if (mapper !== 'type_1' && mapper !== 'type_2') {
          throw new Error(`${path}.rarity_value_mapper: 只能是 type_1 或 type_2`)
        }
        return new WeirdScaledSampler(df('input'), noise('noise'), mapper)
      }
      case 'spline':
        return new Spline(this.splineNode(req(o, 'spline', path), `${path}.spline`))
      default:
        throw new Error(`${path}: 未知的密度函数类型 ${type}`)
    }
  }

  private noiseHolder(json: unknown, path: string): NoiseHolder {
    if (typeof json === 'string') {
      const id = normalizeId(json)
      return new NoiseHolder(id, this.registry.getNoise(id))
    }
    // 原版允许内联参数，但 RandomState 需要 ID 来派生种子，内联噪声会直接崩溃；这里给出明确提示
    parseNoiseParameters(json, path)
    throw new Error(`${path}: 内联噪声没有 ID，无法派生种子（原版同样不支持），请放到 worldgen/noise 里再引用`)
  }

  private splineNode(json: unknown, path: string): SplineNode {
    if (typeof json === 'number') return json
    if (typeof json !== 'object' || json === null) throw new Error(`${path}: 样条必须是数字或对象`)
    const o = json as Record<string, unknown>
    const coordinate = this.parse(req(o, 'coordinate', path), `${path}.coordinate`)
    const points = req(o, 'points', path)
    if (!Array.isArray(points)) throw new Error(`${path}.points 必须是数组`)
    const locations: number[] = []
    const values: SplineNode[] = []
    const derivatives: number[] = []
    points.forEach((p, i) => {
      const pp = p as Record<string, unknown>
      const pth = `${path}.points[${i}]`
      locations.push(reqNumber(pp, 'location', pth))
      values.push(this.splineNode(req(pp, 'value', pth), `${pth}.value`))
      derivatives.push(reqNumber(pp, 'derivative', pth))
    })
    return { coordinate, locations, values, derivatives }
  }
}

function req(o: Record<string, unknown>, key: string, path: string): unknown {
  if (!(key in o)) throw new Error(`${path}: 缺少字段 "${key}"`)
  return o[key]
}

function reqNumber(o: Record<string, unknown>, key: string, path: string): number {
  const v = req(o, key, path)
  if (typeof v !== 'number') throw new Error(`${path}.${key}: 必须是数字`)
  return v
}

/** noise_settings 里 noise_router 的 15 个字段（1.21.1） */
export const ROUTER_FIELDS = [
  'barrier',
  'fluid_level_floodedness',
  'fluid_level_spread',
  'lava',
  'temperature',
  'vegetation',
  'continents',
  'erosion',
  'depth',
  'ridges',
  'initial_density_without_jaggedness',
  'final_density',
  'vein_toggle',
  'vein_ridged',
  'vein_gap'
] as const
export type RouterField = (typeof ROUTER_FIELDS)[number]

export interface NoiseSettingsInfo {
  minY: number
  height: number
  /** 原版 cellWidth = size_horizontal * 4，cellHeight = size_vertical * 4 */
  cellWidth: number
  cellHeight: number
  seaLevel: number
  legacyRandomSource: boolean
  router: Partial<Record<RouterField, DensityFunction>>
}

export function parseNoiseSettings(parser: DensityFunctionParser, id: string): NoiseSettingsInfo {
  const json = parser.registry.noiseSettings.get(normalizeId(id))
  if (!json) throw new Error(`找不到 noise_settings ${id}`)
  const noise = (json.noise ?? {}) as Record<string, number>
  const routerJson = (json.noise_router ?? {}) as Record<string, unknown>
  const router: Partial<Record<RouterField, DensityFunction>> = {}
  for (const f of ROUTER_FIELDS) {
    if (f in routerJson) router[f] = parser.parse(routerJson[f], `${id}.noise_router.${f}`)
  }
  return {
    minY: noise.min_y ?? -64,
    height: noise.height ?? 384,
    cellWidth: (noise.size_horizontal ?? 1) * 4,
    cellHeight: (noise.size_vertical ?? 2) * 4,
    seaLevel: typeof json.sea_level === 'number' ? json.sea_level : 63,
    legacyRandomSource: json.legacy_random_source === true,
    router
  }
}
