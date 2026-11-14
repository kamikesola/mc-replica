/**
 * 区块装饰（原版 ChunkGenerator.applyBiomeDecoration）。
 *
 * 1. 地物顺序（FeatureSorter）：把所有可能出现的生物群系的地物列表合成一张有向图——同一个群系里
 *    “A 在 B 前面”就连一条边——做拓扑排序，得到每个步骤（step 0~10）里所有地物的全局顺序。
 *    地物在这个顺序里的序号决定它的随机种子，所以必须和原版一模一样。
 * 2. 每个区块：装饰种子 = f(世界种子, 区块最小角)；每个步骤里按序号放地物，地物种子 = 装饰种子 + 序号 + 10000 × 步骤。
 *
 * 原版只放“这个区块和周围 8 个区块里出现过的群系”的地物；所有群系引用的地物都带 biome 过滤，
 * 群系不对的位置本来就放不下，所以这里直接把每个步骤的所有地物都跑一遍，结果完全一样。
 */
import type { WorldGenLevel } from './core'
import type { FeatureRegistry } from './features'
import type { PlacedFeature } from './placement'
import { WorldgenRandom } from '../random/WorldgenRandom'

/** 调试：每个地物花的时间（毫秒） */
export let PROFILE: Map<string, number> | null = null
export function enableProfile() {
  PROFILE = new Map()
  return PROFILE
}

interface FeatureData {
  index: number
  step: number
  feature: string
}

/**
 * 原版 FeatureSorter.buildFeaturesPerStep。
 * @param biomes 可能出现的群系（按原版 possibleBiomes 的顺序：气候参数表里第一次出现的顺序）
 * @param featuresOf 群系 → 每个步骤的 placed_feature ID 列表
 */
export function buildFeaturesPerStep(biomes: string[], featuresOf: (biome: string) => string[][]): string[][] {
  const indexOf = new Map<string, number>()
  const key = (d: FeatureData) => `${d.step}|${d.index}`
  const nodes = new Map<string, FeatureData>()
  const edges = new Map<string, Set<string>>()
  let steps = 0
  for (const biome of biomes) {
    const lists = featuresOf(biome)
    steps = Math.max(steps, lists.length)
    const flat: FeatureData[] = []
    lists.forEach((list, step) => {
      for (const f of list) {
        if (!indexOf.has(f)) indexOf.set(f, indexOf.size)
        flat.push({ index: indexOf.get(f)!, step, feature: f })
      }
    })
    flat.forEach((d, j) => {
      const k = key(d)
      if (!nodes.has(k)) nodes.set(k, d)
      if (!edges.has(k)) edges.set(k, new Set())
      if (j < flat.length - 1) {
        const n = flat[j + 1]
        nodes.set(key(n), nodes.get(key(n)) ?? n)
        edges.get(k)!.add(key(n))
      }
    })
  }
  // TreeMap / TreeSet 的顺序：先按步骤，再按序号
  const cmp = (a: string, b: string) => {
    const x = nodes.get(a)!
    const y = nodes.get(b)!
    return x.step - y.step || x.index - y.index
  }
  const done = new Set<string>()
  const path = new Set<string>()
  const out: FeatureData[] = []
  const dfs = (k: string): boolean => {
    if (done.has(k)) return false
    if (path.has(k)) return true
    path.add(k)
    for (const n of [...(edges.get(k) ?? [])].sort(cmp)) if (dfs(n)) return true
    path.delete(k)
    done.add(k)
    out.push(nodes.get(k)!)
    return false
  }
  for (const k of [...edges.keys()].sort(cmp)) {
    if (done.has(k)) continue
    if (dfs(k)) throw new Error('地物顺序有环（原版 FeatureSorter 会报 "Feature order cycle found"）')
  }
  out.reverse()
  const result: string[][] = []
  for (let s = 0; s < steps; s++) result.push(out.filter((d) => d.step === s).map((d) => d.feature))
  return result
}

export interface DecorationInput {
  level: WorldGenLevel
  seed: bigint
  /** 区块最小角的方块坐标 */
  minX: number
  minZ: number
  steps: string[][]
  features: FeatureRegistry
  biomeHasFeature: (biome: string, feature: string) => boolean
  /** 只跑这些步骤（调试用），默认全部 */
  onlySteps?: Set<number>
}

/** 原版 applyBiomeDecoration（不含结构） */
export function applyBiomeDecoration(input: DecorationInput): void {
  const { level, seed, minX, minZ, steps, features } = input
  const r = new WorldgenRandom(0n)
  const decorationSeed = r.setDecorationSeed(seed, minX, minZ)
  const placed: PlacedFeature[][] = steps.map((list) => list.map((id) => features.placedFeature(id)))
  for (let step = 0; step < placed.length; step++) {
    if (input.onlySteps && !input.onlySteps.has(step)) continue
    const list = placed[step]
    for (let i = 0; i < list.length; i++) {
      if (list[i].noop) continue // 每个地物有自己的种子，跳过不影响别的地物
      r.setFeatureSeed(decorationSeed, i, step)
      const t0 = PROFILE ? performance.now() : 0
      list[i].place({ level, topFeature: list[i].id, biomeHasFeature: input.biomeHasFeature }, r, minX, level.minY, minZ)
      if (PROFILE) PROFILE.set(list[i].id, (PROFILE.get(list[i].id) ?? 0) + performance.now() - t0)
    }
  }
}
