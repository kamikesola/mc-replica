import type { NoiseParameters } from '../noise/NormalNoise'

/**
 * 数据包注册表：把一堆 JSON 文件按“资源 ID”收起来，供解析器按 ID 取用。
 *
 * 在整个流程中的位置：
 *
 *   JSON 文件 ──► 【Registry】 ──► DensityFunctionParser ──► RandomState(种子) ──► 求值
 *
 * 只收 worldgen 下的三类文件，其他（配方、战利品表、结构……）一律忽略：
 *
 *   worldgen/noise/<路径>.json            → 噪声参数   { firstOctave, amplitudes }
 *   worldgen/density_function/<路径>.json → 密度函数   数字 / 字符串 / { type, ... }
 *   worldgen/noise_settings/<路径>.json   → 噪声设置   含 noise_router 和世界高度等
 *
 * 文件路径决定 ID，支持两种目录结构：
 *
 *   标准数据包：  .../data/<命名空间>/worldgen/density_function/overworld/continents.json
 *                 → minecraft:overworld/continents（命名空间取目录名）
 *   省略外层：    .../worldgen/density_function/overworld/continents.json
 *                 → minecraft:overworld/continents（命名空间默认 minecraft）
 *
 * 第二种是直接把 jar 里的 data/minecraft 下的内容拷出来时常见的结构。
 */
export type WorldgenKind = 'noise' | 'density_function' | 'noise_settings' | 'biome'

export interface ResourceLocation {
  kind: WorldgenKind
  /** 完整 ID，如 "minecraft:overworld/continents" */
  id: string
}

const KINDS = 'noise|density_function|noise_settings|biome'
const WITH_NAMESPACE = new RegExp(`(?:^|/)data/([a-z0-9_.-]+)/worldgen/(${KINDS})/(.+)\\.json$`)
const WITHOUT_NAMESPACE = new RegExp(`(?:^|/)worldgen/(${KINDS})/(.+)\\.json$`)

/**
 * 文件路径 → 资源位置；不是这几类 worldgen 文件时返回 null。
 * 先匹配带 data/<命名空间>/ 的写法，匹配不到再按省略写法处理。
 */
export function resourceFromPath(path: string): ResourceLocation | null {
  const p = path.replace(/\\/g, '/')
  let m = WITH_NAMESPACE.exec(p)
  if (m) return { kind: m[2] as WorldgenKind, id: `${m[1]}:${m[3]}` }
  m = WITHOUT_NAMESPACE.exec(p)
  if (m) return { kind: m[1] as WorldgenKind, id: `minecraft:${m[2]}` }
  return null
}

/** 补全命名空间："overworld/continents" → "minecraft:overworld/continents" */
export function normalizeId(id: string): string {
  return id.includes(':') ? id : `minecraft:${id}`
}

export class Registry {
  readonly noise = new Map<string, NoiseParameters>()
  readonly densityFunction = new Map<string, unknown>()
  readonly noiseSettings = new Map<string, Record<string, unknown>>()
  /** 生物群系（v4）：温度、湿度、颜色 */
  readonly biome = new Map<string, unknown>()
  /** "kind|id" → 来自哪个数据包。后加载的覆盖先加载的，与原版数据包的优先级规则一致 */
  private readonly source = new Map<string, string>()

  /**
   * 批量加入一个数据包的文件。
   * @param files 路径 → 已解析的 JSON（浏览器里来自 import.meta.glob，Node 里来自 fs）
   * @param packName 数据包名字，只用于显示“这个 ID 来自哪里”
   * @returns 实际收录的文件数
   */
  addFiles(files: Record<string, unknown>, packName: string): number {
    let count = 0
    for (const [path, json] of Object.entries(files)) {
      const res = resourceFromPath(path)
      if (!res) continue
      this.add(res.kind, res.id, json)
      this.source.set(`${res.kind}|${res.id}`, packName)
      count++
    }
    return count
  }

  add(kind: WorldgenKind, id: string, json: unknown): void {
    id = normalizeId(id)
    switch (kind) {
      case 'noise':
        this.noise.set(id, parseNoiseParameters(json, id))
        break
      case 'density_function':
        this.densityFunction.set(id, json)
        break
      case 'noise_settings':
        this.noiseSettings.set(id, json as Record<string, unknown>)
        break
      case 'biome':
        this.biome.set(id, json)
        break
    }
  }

  getNoise(id: string): NoiseParameters {
    const p = this.noise.get(normalizeId(id))
    if (!p) throw new Error(`找不到噪声 ${id}（需要 worldgen/noise/<路径>.json）`)
    return p
  }

  sourceOf(kind: WorldgenKind, id: string): string | undefined {
    return this.source.get(`${kind}|${normalizeId(id)}`)
  }
}

/** 校验并读取 worldgen/noise/*.json */
export function parseNoiseParameters(json: unknown, where = 'noise'): NoiseParameters {
  const o = json as { firstOctave?: unknown; amplitudes?: unknown }
  if (typeof o !== 'object' || o === null || typeof o.firstOctave !== 'number' || !Array.isArray(o.amplitudes)) {
    throw new Error(`${where}: 噪声参数必须是 { "firstOctave": int, "amplitudes": [double…] }`)
  }
  return { firstOctave: o.firstOctave, amplitudes: o.amplitudes.map(Number) }
}
