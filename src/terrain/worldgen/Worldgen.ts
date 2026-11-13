import type { DensityFunction, FunctionContext } from './density/DensityFunction'
import {
  DensityFunctionParser,
  type NoiseSettingsInfo,
  parseNoiseSettings,
  type RouterField
} from './density/DensityFunctionParser'
import { describe, type TreeNode } from './density/describe'
import { withPointCache } from './density/PointCache'
import { RandomState } from './density/RandomState'
import { parseWorldSeed } from './math/Mth'
import { normalizeId, Registry } from './registry/Registry'
import { type FunctionKey, parseKey } from './FunctionKey'
import {
  type Aquifer,
  chunkLocal,
  createFluidPicker,
  disabledAquifer,
  Fluid,
  NoiseBasedAquifer,
  preliminarySurfaceSampler
} from './aquifer/Aquifer'
import type { PositionalRandomFactory } from './random/RandomSource'

/**
 * 世界生成的“总入口”。把四个步骤串起来，外部只需要和这一个类打交道：
 *
 *   1. 数据包     addPack()        JSON 文件 → Registry
 *   2. 解析       （自动）          Registry → 未绑定种子的密度函数树
 *   3. 绑定种子   setSeed()        树 + 种子 → RandomState → 可求值的树
 *   4. 求值       sampler(key)     (x, y, z) → double
 *
 * demo 的 Worker 和 Node 端测试都用它，所以两边的行为完全一致。
 */
export interface PackInput {
  name: string
  files: Record<string, unknown>
}

export class Worldgen {
  readonly registry = new Registry()
  readonly packs: { name: string; count: number }[] = []
  private parser = new DensityFunctionParser(this.registry)
  private settingsCache: Map<string, NoiseSettingsInfo> | null = null
  private settingsErrors: string[] = []
  private state: RandomState | null = null
  /** 已绑定种子的 router 字段缓存，换种子时清空 */
  private wiredRouter = new Map<string, DensityFunction>()
  /** sampler() 用的“带单点缓存”的版本，换种子时清空 */
  private cachedSamplers = new Map<string, DensityFunction>()
  /** 预估地表高度的缓存（每个 noise_settings 一张），换种子时清空 */
  private surfaceCaches = new Map<string, Map<number, number>>()
  private aquiferRandom: PositionalRandomFactory | null = null

  constructor(packs: PackInput[] = []) {
    for (const p of packs) this.addPack(p)
  }

  // ---------------------------------------------------------------- 1. 数据包

  /** 后加入的数据包覆盖先加入的同名 ID。加入后之前的解析结果全部作废 */
  addPack(pack: PackInput): number {
    const count = this.registry.addFiles(pack.files, pack.name)
    this.packs.push({ name: pack.name, count })
    this.parser = new DensityFunctionParser(this.registry)
    this.settingsCache = null
    if (this.state) this.setSeed(this.state.seed)
    return count
  }

  /** 所有 noise_settings，按 ID 排序；某个文件解析失败不影响其他文件 */
  get settings(): Map<string, NoiseSettingsInfo> {
    if (!this.settingsCache) {
      this.settingsCache = new Map()
      this.settingsErrors = []
      for (const id of [...this.registry.noiseSettings.keys()].sort()) {
        try {
          this.settingsCache.set(id, parseNoiseSettings(this.parser, id))
        } catch (e) {
          this.settingsErrors.push(`${id}: ${(e as Error).message}`)
        }
      }
    }
    return this.settingsCache
  }

  /** 解析过程中的错误和警告（给界面显示） */
  get warnings(): string[] {
    void this.settings // 确保已经解析过
    return [...this.settingsErrors, ...this.parser.warnings]
  }

  getSettings(id: string): NoiseSettingsInfo {
    const s = this.settings.get(normalizeId(id))
    if (!s) throw new Error(`找不到 noise_settings ${id}`)
    return s
  }

  // ---------------------------------------------------------------- 3. 种子

  /** 接受数字、bigint 或任意文本（文本按原版规则取 hashCode） */
  setSeed(seed: string | bigint): bigint {
    const value = typeof seed === 'bigint' ? seed : parseWorldSeed(seed)
    this.state = new RandomState(this.parser, value)
    this.wiredRouter.clear()
    this.cachedSamplers.clear()
    this.surfaceCaches.clear()
    this.aquiferRandom = null
    return value
  }

  get seed(): bigint {
    return this.randomState.seed
  }

  /**
   * 某个区块的含水层（见 aquifer/Aquifer.ts）。noise_settings 关了含水层时，返回只用全局流体的版本。
   * pad：区块四周多覆盖几格（Worker 会多生成一圈方块，用来判断邻居）。
   * 原版：aquiferRandom = random.fromHashOf("minecraft:aquifer").forkPositional()
   */
  aquifer(settingsId: string, chunkX: number, chunkZ: number, pad = 1): Aquifer {
    const s = this.getSettings(settingsId)
    const fluid = s.defaultFluid === 'lava' ? Fluid.lava : s.defaultFluid === 'water' ? Fluid.water : Fluid.air
    const picker = createFluidPicker(s.seaLevel, fluid)
    const r = s.router
    if (!s.aquifersEnabled || !r.barrier || !r.erosion || !r.depth || !r.initial_density_without_jaggedness) return disabledAquifer(picker)

    const id = normalizeId(settingsId)
    let cache = this.surfaceCaches.get(id)
    if (!cache || cache.size > 500_000) {
      cache = new Map()
      this.surfaceCaches.set(id, cache)
    }
    this.aquiferRandom ??= this.randomState.random.fromHashOf('minecraft:aquifer').forkPositional()
    const sample = (field: RouterField) => this.sampler({ kind: 'router', settings: id, field })
    const erosion = chunkLocal(this.router(id, 'erosion'), chunkX, chunkZ)
    const depth = chunkLocal(this.router(id, 'depth'), chunkX, chunkZ)
    return new NoiseBasedAquifer(
      {
        barrier: sample('barrier'),
        floodedness: sample('fluid_level_floodedness'),
        spread: sample('fluid_level_spread'),
        lava: sample('lava'),
        erosion: (c) => erosion.compute(c),
        depth: (c) => depth.compute(c),
        preliminarySurfaceLevel: preliminarySurfaceSampler(sample('initial_density_without_jaggedness'), s.minY, s.height, s.cellHeight, cache)
      },
      this.aquiferRandom,
      picker,
      // 区块本身，四周再多 pad 格（Worker 会多生成一圈用来判断邻居）
      {
        minX: chunkX * 16 - pad,
        maxX: chunkX * 16 + 15 + pad,
        minY: s.minY,
        maxY: s.minY + s.height - 1,
        minZ: chunkZ * 16 - pad,
        maxZ: chunkZ * 16 + 15 + pad
      }
    )
  }

  get randomState(): RandomState {
    if (!this.state) throw new Error('还没有设置种子：先调用 setSeed()')
    return this.state
  }

  // ---------------------------------------------------------------- 4. 求值

  /** 取某个 noise_settings 的 router 字段，已绑定种子 */
  router(settingsId: string, field: RouterField | string): DensityFunction {
    const key = `${normalizeId(settingsId)}|${field}`
    let fn = this.wiredRouter.get(key)
    if (!fn) {
      const raw = this.getSettings(settingsId).router[field as RouterField]
      if (!raw) throw new Error(`${settingsId} 的 noise_router 里没有 ${field}`)
      fn = this.randomState.wire(raw)
      this.wiredRouter.set(key, fn)
    }
    return fn
  }

  /**
   * 按 key 拿到一个求值函数（key 的写法见 FunctionKey.ts）。
   *
   * 密度函数会套一层 withPointCache：数值与直接 compute() 完全相同，
   * 但同一个点内被多次引用的子树只算一次（原版主世界 final_density 快约 3 倍）。
   * 要按原版 NoiseChunk 的插值规则求值时，用 router() 拿原始树再交给 NoiseChunk。
   */
  sampler(key: string | FunctionKey): (ctx: FunctionContext) => number {
    const k = typeof key === 'string' ? parseKey(key) : key
    if (k.kind === 'noise') {
      const noise = this.randomState.getOrCreateNoise(k.id)
      return (c) => noise.getValue(c.blockX, c.blockY, c.blockZ)
    }
    const cacheKey = k.kind === 'router' ? `router|${k.settings}|${k.field}` : `df|${k.id}`
    let fn = this.cachedSamplers.get(cacheKey)
    if (!fn) {
      fn = withPointCache(k.kind === 'router' ? this.router(k.settings, k.field) : this.randomState.get(k.id))
      this.cachedSamplers.set(cacheKey, fn)
    }
    const f = fn
    return (c) => f.compute(c)
  }

  // ---------------------------------------------------------------- 给界面用的

  /** 函数的原始 JSON（数据包里写的样子） */
  sourceJson(key: string): unknown {
    const k = parseKey(key)
    if (k.kind === 'df') return this.registry.densityFunction.get(normalizeId(k.id))
    if (k.kind === 'noise') return this.registry.noise.get(normalizeId(k.id))
    const settings = this.registry.noiseSettings.get(normalizeId(k.settings))
    return (settings?.noise_router as Record<string, unknown> | undefined)?.[k.field]
  }

  /** 函数解析后的结构树（引用不展开） */
  structure(key: string): TreeNode {
    const k = parseKey(key)
    if (k.kind === 'noise') {
      const p = this.registry.getNoise(k.id)
      return { type: 'noise', detail: `firstOctave=${p.firstOctave} amplitudes=[${p.amplitudes.join(', ')}]`, children: [] }
    }
    const fn =
      k.kind === 'df'
        ? this.parser.get(k.id)
        : this.getSettings(k.settings).router[k.field as RouterField]
    if (!fn) throw new Error(`${key} 不存在`)
    return describe(fn)
  }
}
