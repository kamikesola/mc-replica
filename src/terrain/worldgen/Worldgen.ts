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
import { type BiomeData, coldEnoughToSnow, defaultBiome, parseBiome, temperatureAt } from './biome/Biome'
import { BiomeManager, obfuscateSeed } from './biome/BiomeManager'
import { ParameterList, quantize, sampleClimate, type ClimateSampler, type TargetPoint } from './biome/Climate'
import { netherBiomeParameters, overworldBiomeParameters } from './biome/OverworldBiomeBuilder'
import { SurfaceSystem } from './surface/SurfaceSystem'
import { createOreVeinifier, type Veinifier } from './ore/OreVeinifier'
import { configuredCarver, setLargeFeatureSeed, type CarveTarget, type ConfiguredCarver } from './carver/Carver'
import { FastLegacyRandom } from './random/FastLegacyRandom'

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
  private oreRandom: PositionalRandomFactory | null = null
  private biomeSources = new Map<string, BiomeSource>()
  private surfaceSystems = new Map<string, SurfaceSystem | null>()
  private biomeData = new Map<string, BiomeData>()

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
    this.oreRandom = null
    this.biomeSources.clear()
    this.surfaceSystems.clear()
    return value
  }

  get seed(): bigint {
    return this.randomState.seed
  }

  /** 预估地表高度（原版 NoiseChunk.preliminarySurfaceLevel），按 noise_settings 缓存；含水层和地表规则都要用 */
  preliminarySurface(settingsId: string): (x: number, z: number) => number {
    const s = this.getSettings(settingsId)
    const id = normalizeId(settingsId)
    let cache = this.surfaceCaches.get(id)
    if (!cache || cache.size > 500_000) {
      cache = new Map()
      this.surfaceCaches.set(id, cache)
    }
    if (!s.router.initial_density_without_jaggedness) return () => s.minY
    return preliminarySurfaceSampler(this.sampler({ kind: 'router', settings: id, field: 'initial_density_without_jaggedness' }), s.minY, s.height, s.cellHeight, cache)
  }

  /**
   * 生物群系来源（v4）。主世界系列（overworld / amplified / large_biomes / caves / floating_islands）用原版主世界参数表，
   * 下界用下界参数表，末地和其他（包括 demo 的简化地形）只有一个群系。
   */
  biomes(settingsId: string): BiomeSource {
    const id = normalizeId(settingsId)
    let b = this.biomeSources.get(id)
    if (!b) {
      b = new BiomeSource(this, id)
      this.biomeSources.set(id, b)
    }
    return b
  }

  /** 生物群系的数据（温度、颜色……）；没有原版群系文件时用默认值 */
  biome(id: string): BiomeData {
    let b = this.biomeData.get(id)
    if (!b) {
      const json = this.registry.biome.get(id)
      b = json === undefined ? defaultBiome(id) : parseBiome(id, json)
      this.biomeData.set(id, b)
    }
    return b
  }

  /** 地表规则（v4）；noise_settings 没有 surface_rule 时返回 null（demo 的简化地形用临时规则） */
  surfaceSystem(settingsId: string): SurfaceSystem | null {
    const id = normalizeId(settingsId)
    if (!this.surfaceSystems.has(id)) {
      const s = this.getSettings(id)
      const rs = this.randomState
      this.surfaceSystems.set(
        id,
        s.surfaceRule ? new SurfaceSystem((n) => rs.getOrCreateNoise(n), rs.random, s.surfaceRule, s.defaultBlock, s.seaLevel) : null
      )
    }
    return this.surfaceSystems.get(id)!
  }

  /**
   * 洞穴雕刻器（v5.1，见 carver/Carver.ts）：返回“在某个区块里挖洞”的函数。
   * 起点区块的群系取 (区块最小角, y = 0) 的噪声群系；群系 JSON 没有 carvers 或者不是主世界类的设置时返回 null。
   */
  carversAt(settingsId: string): ((t: CarveTarget) => void) | null {
    const id = normalizeId(settingsId)
    if (!OVERWORLD_LIKE.includes(id.replace('minecraft:', ''))) return null
    const biomes = this.biomes(id)
    const reg = this.registry
    if (!biomes.possible.some((b) => (reg.biome.get(b) as { carvers?: unknown } | undefined)?.carvers)) return null
    const built = new Map<string, ConfiguredCarver | null>()
    const carverOf = (cid: string) => {
      if (!built.has(cid)) {
        const json = reg.configuredCarver.get(cid)
        built.set(cid, json ? configuredCarver(json) : null)
      }
      return built.get(cid)!
    }
    const listOf = new Map<string, string[]>()
    const carversOfBiome = (b: string) => {
      let l = listOf.get(b)
      if (!l) {
        const c = (reg.biome.get(b) as { carvers?: string | string[] } | undefined)?.carvers ?? []
        listOf.set(b, (l = (typeof c === 'string' ? [c] : c).map(normalizeId)))
      }
      return l
    }
    const seed = this.seed
    const r = new FastLegacyRandom(0n)
    return (t) => {
      const mask = new Uint8Array(16 * 16 * t.height)
      for (let j = -8; j <= 8; j++)
        for (let k = -8; k <= 8; k++) {
          const sx = t.cx + j
          const sz = t.cz + k
          const biome = biomes.noiseBiome(sx * 4, 0, sz * 4)
          const list = carversOfBiome(biome)
          for (let l = 0; l < list.length; l++) {
            const c = carverOf(list[l])
            setLargeFeatureSeed(r, seed + BigInt(l), sx, sz)
            if (c && c.isStartChunk(r)) c.carve(t, r, sx, sz, mask)
          }
        }
    }
  }

  /**
   * 矿脉（v5，见 ore/OreVeinifier.ts）。wrap 把 vein_toggle 等包装成和 final_density 同一个 NoiseChunk 里的插值版本。
   * noise_settings 没开矿脉时返回 null。原版：oreRandom = random.fromHashOf("minecraft:ore").forkPositional()
   */
  oreVeinifier(settingsId: string, wrap: (fn: DensityFunction) => DensityFunction): Veinifier | null {
    const s = this.getSettings(settingsId)
    const r = s.router
    if (!s.oreVeinsEnabled || !r.vein_toggle || !r.vein_ridged || !r.vein_gap) return null
    this.oreRandom ??= this.randomState.random.fromHashOf('minecraft:ore').forkPositional()
    const id = normalizeId(settingsId)
    return createOreVeinifier(wrap(this.router(id, 'vein_toggle')), wrap(this.router(id, 'vein_ridged')), wrap(this.router(id, 'vein_gap')), this.oreRandom)
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

const OVERWORLD_LIKE = ['overworld', 'amplified', 'large_biomes', 'caves', 'floating_islands']

/**
 * 一种 noise_settings 对应的生物群系来源：
 *   noiseBiome(qx, qy, qz)  quart 坐标 → 生物群系（查气候参数表，带缓存）
 *   getBiome(x, y, z)       方块坐标 → 生物群系（原版 BiomeManager 的抖动缩放）
 */
export class BiomeSource {
  /** 可能出现的群系（v5） */
  readonly possible: string[]
  readonly manager: BiomeManager
  private readonly list: ParameterList<string> | null
  private readonly single: string
  private readonly climate: ClimateSampler | null
  private readonly cache = new Map<number, string>()
  /**
   * 气候里和 y 无关的 5 个值（温度、湿度、大陆性、侵蚀、奇异度）按列缓存（v5.1）：
   * 原版这几个都是 y_scale = 0 的 shifted_noise / flat_cache，只有 depth 随 y 变。数据包改了就不缓存。
   */
  private readonly flat: boolean
  private readonly columns = new Map<number, number[]>()
  private readonly minQY: number
  private readonly maxQY: number

  constructor(
    readonly wg: Worldgen,
    readonly settingsId: string
  ) {
    const s = wg.getSettings(settingsId)
    const name = settingsId.replace(/^minecraft:/, '')
    const isMinecraft = settingsId.startsWith('minecraft:')
    const params = isMinecraft && OVERWORLD_LIKE.includes(name) ? overworldBiomeParameters({ paleGarden: wg.registry.biome.has('minecraft:pale_garden') }) : isMinecraft && name === 'nether' ? netherBiomeParameters() : null
    this.list = params ? new ParameterList(params) : null
    // 原版 possibleBiomes：参数表里第一次出现的顺序（地物排序要用）
    this.possible = params ? [...new Set(params.map(([, b]) => b))] : [isMinecraft && name === 'end' ? 'minecraft:the_end' : 'minecraft:plains']
    this.single = isMinecraft && name === 'end' ? 'minecraft:the_end' : 'minecraft:plains'
    const r = s.router
    const fields = ['temperature', 'vegetation', 'continents', 'erosion', 'depth', 'ridges'] as const
    this.climate =
      this.list && fields.every((f) => r[f])
        ? (Object.fromEntries(fields.map((f) => [f, wg.sampler({ kind: 'router', settings: settingsId, field: f })])) as unknown as ClimateSampler)
        : null
    const reg = wg.registry.densityFunction
    // router 里是解析过的函数（reference / constant / shifted_noise …），引用的是注册表里的原始 JSON，两种都认
    const is2D = (j: unknown, depth = 0): boolean => {
      if (depth > 8) return false
      if (typeof j === 'number') return true
      if (typeof j === 'string') return reg.has(j) && is2D(reg.get(j), depth + 1)
      const o = j as Record<string, unknown>
      const t = String(o.type).replace('minecraft:', '')
      if (t === 'reference') return is2D(o.id, depth + 1)
      if (t === 'constant' || t === 'flat_cache' || t === 'cache_2d' || t === 'flatCache' || t === 'cache2d') return true
      if (t === 'shifted_noise')
        return (o.y_scale ?? o.yScale) === 0 && is2D(o.shift_x ?? o.shiftX, depth + 1) && is2D(o.shift_y ?? o.shiftY, depth + 1) && is2D(o.shift_z ?? o.shiftZ, depth + 1)
      return false
    }
    this.flat = (['temperature', 'vegetation', 'continents', 'erosion', 'ridges'] as const).every((f) => is2D(r[f]))
    // 原版 ChunkAccess.getNoiseBiome 把 y 限制在世界高度以内
    this.minQY = s.minY >> 2
    this.maxQY = this.minQY + (s.height >> 2) - 1
    this.manager = new BiomeManager(obfuscateSeed(wg.seed), (qx, qy, qz) => this.noiseBiome(qx, qy, qz))
  }

  noiseBiome(qx: number, qy: number, qz: number): string {
    if (!this.list || !this.climate) return this.single
    qy = Math.min(Math.max(qy, this.minQY), this.maxQY)
    const key = ((qx + 0x100000) * 0x200000 + (qz + 0x100000)) * 256 + (qy + 128)
    let b = this.cache.get(key)
    if (b === undefined) {
      if (this.cache.size > 400_000) this.cache.clear()
      b = this.list.find(this.flat ? this.sampleFlat(qx, qy, qz) : sampleClimate(this.climate, qx, qy, qz))
      this.cache.set(key, b)
    }
    return b
  }

  /** sampleClimate 的快速版：5 个平面的值按列缓存，只算 depth */
  private sampleFlat(qx: number, qy: number, qz: number): TargetPoint {
    const c = this.climate!
    const key = (qx + 0x100000) * 0x200000 + (qz + 0x100000)
    let col = this.columns.get(key)
    if (!col) {
      if (this.columns.size > 100_000) this.columns.clear()
      const t = sampleClimate(c, qx, 0, qz)
      col = [t[0], t[1], t[2], t[3], t[5]]
      this.columns.set(key, col)
    }
    return [col[0], col[1], col[2], col[3], quantize(c.depth({ blockX: qx * 4, blockY: qy * 4, blockZ: qz * 4 })), col[4]]
  }

  getBiome(x: number, y: number, z: number): string {
    return this.manager.getBiome(x, y, z)
  }

  coldEnoughToSnow(biome: string, x: number, y: number, z: number): boolean {
    return coldEnoughToSnow(this.wg.biome(biome), x, y, z)
  }

  temperature(biome: string, x: number, y: number, z: number): number {
    return temperatureAt(this.wg.biome(biome), x, y, z)
  }
}
