/**
 * 区块源（v5）：缓存区块原型和装饰结果，把它们拼成最终的区块。
 *
 * 原版的地物写入范围是以当前区块为中心的 3×3 区块（WorldGenRegion），树、矿石都可能伸到邻居区块里。
 * 所以一个区块的最终方块 = 自己的原型 + 自己和周围 8 个区块的装饰结果。
 *
 *   原型 proto(cx, cz)：地形 + 地表（protoChunk）
 *   装饰 decoration(cx, cz)：在周围 3×3 个原型的副本上放这个区块的地物，记下改了哪些格子
 *   最终 withDecorations(cx, cz)：原型 + 周围 3×3 个区块的装饰，按固定顺序叠上去
 *
 * 和原版的差别：原版放某个区块的地物时，邻居区块可能已经放过自己的地物（顺序取决于玩家怎么走，
 * 所以原版自己在不同的生成顺序下，区块边上的树也不一样）。这里用 4×4 区块的“装饰区域”：
 * 区域里按“先 z 后 x”依次装饰，后面的看得到前面的；不同区域之间只看原型。
 * 这样结果和加载顺序无关，多个 Worker 各算各的也能拼上（同一个区域固定交给同一个 Worker，缓存才能复用）。
 */
import { BLOCK_BY_NAME, BlockType, NAME_BY_BLOCK } from '../blocks'
import type { NoiseSettingsInfo, Worldgen } from '../worldgen'
import { blocksMotion, isLeaves, type HeightmapType, type WorldGenLevel } from '../worldgen/feature/core'
import { applyBiomeDecoration, buildFeaturesPerStep } from '../worldgen/feature/decorate'
import { FeatureRegistry } from '../worldgen/feature/features'
import { protoChunk, type ProtoChunk } from './surface'

/** 简单的 LRU：Map 的插入顺序就是使用顺序 */
class Lru<V> {
  private readonly map = new Map<string, V>()
  constructor(private readonly max: number) {}
  get(k: string): V | undefined {
    const v = this.map.get(k)
    if (v !== undefined) {
      this.map.delete(k)
      this.map.set(k, v)
    }
    return v
  }
  set(k: string, v: V) {
    this.map.set(k, v)
    if (this.map.size > this.max) this.map.delete(this.map.keys().next().value!)
  }
}

interface Proto extends ProtoChunk {
  /** 原版 WORLD_SURFACE_WG / OCEAN_FLOOR_WG：地表之后就不再更新（放地物时也不变） */
  worldSurfaceWG: Int16Array
  oceanFloorWG: Int16Array
}

/** 一个区块的装饰结果：对周围 3×3 每个区块，改了哪些格子、改成什么 */
type Decoration = { idx: Int32Array; ids: Uint8Array }[]

const NAMES = NAME_BY_BLOCK
/** 按方块 ID 预先算好的性质（高度图用） */
const MOTION = Uint8Array.from(NAMES.map((n) => (blocksMotion(n) ? 1 : 0)))
const FLUID = Uint8Array.from(NAMES.map((n) => (n === 'minecraft:water' || n === 'minecraft:lava' ? 1 : 0)))
const LEAF = Uint8Array.from(NAMES.map((n) => (isLeaves(n) ? 1 : 0)))

/**
 * 装饰区域的边长（区块）。区域里的区块按“先 z 后 x”的顺序依次装饰，后面的能看到前面的结果；
 * 不同区域之间互相看不到（只看原型），所以任何一个区块的结果都只取决于它所在的区域，和生成顺序无关。
 */
export const REGION = 4

/** 周围 3×3 的偏移 */
const NEIGHBORS: [number, number][] = [-1, 0, 1].flatMap((dz) => [-1, 0, 1].map((dx) => [dx, dz] as [number, number]))

export class ChunkSource {

  /** 调试用：装饰直接写进原型（共享一个世界、按调用顺序生效），tools 里做“生成顺序”的实验时打开 */
  shared = false
  private readonly protos = new Lru<Proto>(160)
  private readonly decorations = new Lru<Decoration>(400)
  private readonly features: FeatureRegistry | null
  private readonly steps: string[][] = []
  private readonly biomeFeatures = new Map<string, Set<string>>()

  constructor(
    private readonly wg: Worldgen,
    private readonly settingsId: string,
    private readonly s: NoiseSettingsInfo
  ) {
    const biomes = wg.biomes(settingsId)
    const reg = wg.registry
    const hasData = reg.placedFeature.size > 0 && biomes.possible.some((b) => reg.biome.has(b))
    this.features = hasData ? new FeatureRegistry(reg) : null
    if (this.features) {
      const featuresOf = (b: string) => {
        const json = reg.biome.get(b) as { features?: string[][] } | undefined
        return (json?.features ?? []).map((l) => l.map((id) => (id.includes(':') ? id : `minecraft:${id}`)))
      }
      for (const b of biomes.possible) this.biomeFeatures.set(b, new Set(featuresOf(b).flat()))
      this.steps = buildFeaturesPerStep(biomes.possible, featuresOf)
    }
  }

  get hasFeatures(): boolean {
    return this.features !== null
  }

  /** 没实现的地物类型 → 遇到的次数（调试） */
  get unsupported(): Map<string, number> {
    return this.features?.unsupported ?? new Map()
  }

  proto(cx: number, cz: number): Proto {
    const k = `${cx},${cz}`
    let p = this.protos.get(k)
    if (!p) {
      const base = protoChunk(this.wg, this.settingsId, this.s, cx, cz)
      const H = this.s.height
      const ws = new Int16Array(256)
      const of = new Int16Array(256)
      for (let i = 0; i < 256; i++) {
        let y = H - 1
        while (y >= 0 && base.blocks[y * 256 + i] === BlockType.air) y--
        ws[i] = y + 1
        y = H - 1
        while (y >= 0 && !MOTION[base.blocks[y * 256 + i]]) y--
        of[i] = y + 1
      }
      p = { ...base, worldSurfaceWG: ws, oceanFloorWG: of }
      this.protos.set(k, p)
    }
    return p
  }

  /** 在 (cx, cz) 为中心的 3×3 原型上放 (cx, cz) 的地物 */
  decoration(cx: number, cz: number): Decoration {
    const k = `${cx},${cz}`
    let d = this.decorations.get(k)
    if (d) return d
    const s = this.s
    const H = s.height
    const minY = s.minY
    const protos: Proto[] = []
    const blocks: Uint8Array[] = []
    for (let dz = -1; dz <= 1; dz++)
      for (let dx = -1; dx <= 1; dx++) {
        const p = this.proto(cx + dx, cz + dz)
        protos.push(p)
        blocks.push(this.shared ? p.blocks : p.blocks.slice())
      }
    // 同一个“装饰区域”里排在前面、离得够近（2 个区块以内）的区块先放完，我们在它们的结果上接着放，
    // 就像原版按顺序生成区块时，后生成的区块能看到先生成的邻居放下的树
    const rx = Math.floor(cx / REGION)
    const rz = Math.floor(cz / REGION)
    for (let ez = Math.max(rz * REGION, cz - 2); ez <= cz; ez++)
      for (let ex = Math.max(rx * REGION, cx - 2); ex <= Math.min(rx * REGION + REGION - 1, cx + 2); ex++) {
        if (ez === cz && ex >= cx) break
        const e = this.decoration(ex, ez)
        for (let dz = -1; dz <= 1; dz++)
          for (let dx = -1; dx <= 1; dx++) {
            const x = cx + dx
            const z = cz + dz
            if (Math.abs(x - ex) > 1 || Math.abs(z - ez) > 1) continue
            const part = e[(z - ez + 1) * 3 + (x - ex + 1)]
            const target = blocks[(dz + 1) * 3 + dx + 1]
            for (let j = 0; j < part.idx.length; j++) target[part.idx[j]] = part.ids[j]
          }
      }
    const before = blocks.map((b) => b.slice())
    const biomes = this.wg.biomes(this.settingsId)
    const slot = (x: number, z: number) => {
      const sx = (x >> 4) - cx + 1
      const sz = (z >> 4) - cz + 1
      return sx < 0 || sx > 2 || sz < 0 || sz > 2 ? -1 : sz * 3 + sx
    }
    const index = (x: number, y: number, z: number) => (y - minY) * 256 + (z & 15) * 16 + (x & 15)
    const scan = (b: Uint8Array, col: number, test: (id: number) => boolean) => {
      let y = H - 1
      while (y >= 0 && !test(b[y * 256 + col])) y--
      return y + 1 + minY
    }
    const level: WorldGenLevel = {
      minY,
      height: H,
      seaLevel: s.seaLevel,
      getBlock: (x, y, z) => {
        const i = slot(x, z)
        if (i < 0 || y < minY || y >= minY + H) return 'minecraft:air'
        return NAMES[blocks[i][index(x, y, z)]]
      },
      canWrite: (x, y, z) => slot(x, z) >= 0 && y >= minY && y < minY + H,
      setBlock: (x, y, z, state) => {
        const i = slot(x, z)
        if (i < 0 || y < minY || y >= minY + H) return false
        const id = BLOCK_BY_NAME[state]
        if (id === undefined) return false // 我们没有的方块（还没实现的地物才会放）
        blocks[i][index(x, y, z)] = id
        return true
      },
      getHeight: (type: HeightmapType, x, z) => {
        const i = slot(x, z)
        if (i < 0) return minY
        const col = (z & 15) * 16 + (x & 15)
        const b = blocks[i]
        switch (type) {
          case 'WORLD_SURFACE_WG':
            return protos[i].worldSurfaceWG[col] + minY
          case 'OCEAN_FLOOR_WG':
            return protos[i].oceanFloorWG[col] + minY
          case 'WORLD_SURFACE':
            return scan(b, col, (id) => id !== BlockType.air)
          case 'OCEAN_FLOOR':
            return scan(b, col, (id) => MOTION[id] === 1)
          case 'MOTION_BLOCKING':
            return scan(b, col, (id) => MOTION[id] === 1 || FLUID[id] === 1)
          case 'MOTION_BLOCKING_NO_LEAVES':
            return scan(b, col, (id) => (MOTION[id] === 1 || FLUID[id] === 1) && LEAF[id] === 0)
        }
      },
      getBiome: (x, y, z) => biomes.getBiome(x, y, z),
      temperature: (b, x, y, z) => biomes.temperature(b, x, y, z)
    }
    if (this.features) {
      applyBiomeDecoration({
        level,
        seed: this.wg.seed,
        minX: cx * 16,
        minZ: cz * 16,
        steps: this.steps,
        features: this.features,
        biomeHasFeature: (b, f) => this.biomeFeatures.get(b)?.has(f) ?? false
      })
    }
    // 只记下变化的格子
    d = protos.map((_p, i) => {
      const idx: number[] = []
      const ids: number[] = []
      const a = before[i]
      const b = blocks[i]
      for (let j = 0; j < a.length; j++)
        if (a[j] !== b[j]) {
          idx.push(j)
          ids.push(b[j])
        }
      return { idx: Int32Array.from(idx), ids: Uint8Array.from(ids) }
    })
    this.decorations.set(k, d)
    return d
  }

  /**
   * 区块 (cx, cz) 的方块：原型 + 装饰。
   * 中心区块 (ox, oz) 周围 3×3 的装饰都叠上去（按 z、x 从小到大的固定顺序）；
   * 拿邻居区块（只用来补网格边上一圈）时，只叠和中心共享的那些装饰，避免再去算更远的区块。
   */
  withDecorations(cx: number, cz: number, ox = cx, oz = cz): Uint8Array {
    const out = this.proto(cx, cz).blocks.slice()
    // 叠的顺序：先按区域、再按区域里的先后（和装饰时“谁先放”的顺序一致）
    const key = ([dx, dz]: [number, number]) => {
      const x = cx + dx
      const z = cz + dz
      return [Math.floor(z / REGION), Math.floor(x / REGION), z, x]
    }
    const order = NEIGHBORS.slice().sort((p, q) => {
      const a = key(p)
      const b = key(q)
      return a[0] - b[0] || a[1] - b[1] || a[2] - b[2] || a[3] - b[3]
    })
    for (const [dx, dz] of order) {
        const sx = cx + dx
        const sz = cz + dz
        if (Math.abs(sx - ox) > 1 || Math.abs(sz - oz) > 1) continue
        const d = this.decoration(sx, sz)
        // 这个装饰里，(cx, cz) 在它的 3×3 的哪一格
        const part = d[(cz - sz + 1) * 3 + (cx - sx + 1)]
        for (let j = 0; j < part.idx.length; j++) out[part.idx[j]] = part.ids[j]
      }
    return out
  }
}
