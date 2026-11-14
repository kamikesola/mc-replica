import type { NormalNoise } from '../noise/NormalNoise'
import type { PositionalRandomFactory, RandomSource } from '../random/RandomSource'
import { NO_WATER, parseRule, type Rule, type SurfaceContext } from './SurfaceRules'

/**
 * 把地表规则应用到一个区块上（原版 SurfaceSystem.buildSurface）。
 *
 * 对区块里的每一列，从最高的方块往下走：
 *   - 遇到空气：重新开始数“石头的第几格”（stoneDepthAbove = 0），水面清空
 *   - 遇到流体：记下水面高度（waterHeight），继续往下
 *   - 遇到石头：数一格；算出这段石头下面还有多厚（stoneDepthBelow）；
 *     如果是默认方块（石头），问规则“这里换成什么”
 *
 * 所以规则能写出“草地表面第一格是草、往下 3 格是土”“水下 6 格以内是沙”“洞顶 1 格是……”这样的逻辑。
 * 恶地的石柱、冰冻海洋的冰山是原版硬编码的两个“扩展”，也在这里。
 */

/** 一列方块的读写接口；y 是世界坐标 */
export interface BlockColumn {
  get(y: number): string
  set(y: number, name: string): void
}

export interface SurfaceInput {
  chunkX: number
  chunkZ: number
  minY: number
  height: number
  /** 区块内 (lx, lz) 这一列 */
  column(lx: number, lz: number): BlockColumn
  /** 区块内这一列最高的非空气方块的 y（原版 WORLD_SURFACE_WG 高度图） */
  heightAt(lx: number, lz: number): number
  /** 方块位置的生物群系（原版 BiomeManager.getBiome） */
  biome(x: number, y: number, z: number): string
  coldEnoughToSnow(biome: string, x: number, y: number, z: number): boolean
  /** 这个群系在 (x, seaLevel, z) 温度 > 0.1（冰山稍微融化一点） */
  warmerThan01(biome: string, x: number, y: number, z: number): boolean
  /** 预估地表高度（原版 NoiseChunk.preliminarySurfaceLevel） */
  preliminarySurfaceLevel(x: number, z: number): number
}

const AIR = 'minecraft:air'
const isFluidName = (n: string) => n === 'minecraft:water' || n === 'minecraft:lava'

export class SurfaceSystem {
  private readonly rule: Rule
  private readonly surface: NormalNoise
  private readonly secondary: NormalNoise
  private readonly clayBandsOffset: NormalNoise
  private readonly clayBands: string[]
  private readonly badlandsPillar: NormalNoise
  private readonly badlandsPillarRoof: NormalNoise
  private readonly badlandsSurface: NormalNoise
  private readonly icebergPillar: NormalNoise
  private readonly icebergPillarRoof: NormalNoise
  private readonly icebergSurface: NormalNoise
  private readonly randomFactories = new Map<string, PositionalRandomFactory>()

  /**
   * @param noise   按 ID 取噪声（原版 RandomState.getOrCreateNoise）
   * @param random  原版 RandomState.random：地表深度的随机数、陶瓦条纹、vertical_gradient 都从它派生
   */
  constructor(
    noise: (id: string) => NormalNoise,
    private readonly random: PositionalRandomFactory,
    ruleJson: unknown,
    private readonly defaultBlock: string,
    private readonly seaLevel: number
  ) {
    this.surface = noise('minecraft:surface')
    this.secondary = noise('minecraft:surface_secondary')
    this.clayBandsOffset = noise('minecraft:clay_bands_offset')
    this.badlandsPillar = noise('minecraft:badlands_pillar')
    this.badlandsPillarRoof = noise('minecraft:badlands_pillar_roof')
    this.badlandsSurface = noise('minecraft:badlands_surface')
    this.icebergPillar = noise('minecraft:iceberg_pillar')
    this.icebergPillarRoof = noise('minecraft:iceberg_pillar_roof')
    this.icebergSurface = noise('minecraft:iceberg_surface')
    this.clayBands = generateBands(random.fromHashOf('minecraft:clay_bands'))
    this.rule = parseRule(ruleJson, {
      noise,
      random: (name) => {
        let f = this.randomFactories.get(name)
        if (!f) this.randomFactories.set(name, (f = random.fromHashOf(name).forkPositional()))
        return f
      },
      band: (x, y, z) => this.band(x, y, z)
    })
  }

  /** 表层厚度：surface 噪声 × 2.75 + 3 + 一点随机，取整（原版 getSurfaceDepth） */
  surfaceDepth(x: number, z: number): number {
    const d = this.surface.getValue(x, 0, z)
    return Math.trunc(d * 2.75 + 3.0 + this.random.at(x, 0, z).nextDouble() * 0.25)
  }

  band(x: number, y: number, z: number): string {
    const l = Math.round(this.clayBandsOffset.getValue(x, 0.0, z) * 4.0)
    const n = this.clayBands.length
    return this.clayBands[(((y + l + n) % n) + n) % n]
  }

  buildSurface(input: SurfaceInput): void {
    const { minY, height } = input
    const x0 = input.chunkX * 16
    const z0 = input.chunkZ * 16
    // “预估地表”按 16×16 的格子取四个角，双线性插值（原版 Context.getMinSurfaceLevel）
    let cellKey = ''
    const cell = [0, 0, 0, 0]

    for (let lx = 0; lx < 16; lx++) {
      for (let lz = 0; lz < 16; lz++) {
        const x = x0 + lx
        const z = z0 + lz
        const col = input.column(lx, lz)
        const top = input.heightAt(lx, lz) + 1
        const columnBiome = input.biome(x, top, z)
        if (columnBiome === 'minecraft:eroded_badlands') this.erodedBadlandsExtension(col, x, z, top, minY)
        const start = input.heightAt(lx, lz) + 1

        // ---- 这一列的上下文（按需计算的值都缓存在这一列里）
        const surfaceDepth = this.surfaceDepth(x, z)
        let secondary: number | undefined
        let minSurface: number | undefined
        let steep: boolean | undefined
        const ctx: SurfaceContext = {
          blockX: x,
          blockY: 0,
          blockZ: z,
          surfaceDepth,
          stoneDepthAbove: 0,
          stoneDepthBelow: 0,
          waterHeight: NO_WATER,
          minY,
          maxY: minY + height - 1,
          biome: () => '',
          surfaceSecondary: () => (secondary ??= this.secondary.getValue(x, 0, z)),
          minSurfaceLevel: () => {
            if (minSurface === undefined) {
              const ci = x >> 4
              const cj = z >> 4
              const key = `${ci},${cj}`
              if (key !== cellKey) {
                cellKey = key
                cell[0] = input.preliminarySurfaceLevel(ci << 4, cj << 4)
                cell[1] = input.preliminarySurfaceLevel((ci + 1) << 4, cj << 4)
                cell[2] = input.preliminarySurfaceLevel(ci << 4, (cj + 1) << 4)
                cell[3] = input.preliminarySurfaceLevel((ci + 1) << 4, (cj + 1) << 4)
              }
              const fx = Math.fround((x & 15) / 16)
              const fz = Math.fround((z & 15) / 16)
              const a = cell[0] + fx * (cell[1] - cell[0])
              const b = cell[2] + fx * (cell[3] - cell[2])
              minSurface = Math.floor(a + fz * (b - a)) + surfaceDepth - 8
            }
            return minSurface
          },
          steep: () => (steep ??= this.steep(input, lx, lz)),
          coldEnoughToSnow: () => input.coldEnoughToSnow(ctx.biome(), x, ctx.blockY, z)
        }

        // ---- 从上往下走
        let stoneAbove = 0
        let waterHeight = NO_WATER
        let stoneBottom = Number.MAX_SAFE_INTEGER
        for (let y = start; y >= minY; y--) {
          const b = col.get(y)
          if (b === AIR) {
            stoneAbove = 0
            waterHeight = NO_WATER
            continue
          }
          if (isFluidName(b)) {
            if (waterHeight === NO_WATER) waterHeight = y + 1
            continue
          }
          if (stoneBottom >= y) {
            // 往下找这段石头在哪里结束
            stoneBottom = -2032 << 4
            for (let v = y - 1; v >= minY - 1; v--) {
              const bv = v < minY ? AIR : col.get(v)
              if (bv === AIR || isFluidName(bv)) {
                stoneBottom = v + 1
                break
              }
            }
          }
          stoneAbove++
          ctx.blockY = y
          ctx.stoneDepthAbove = stoneAbove
          ctx.stoneDepthBelow = y - stoneBottom + 1
          ctx.waterHeight = waterHeight
          let biome: string | undefined
          ctx.biome = () => (biome ??= input.biome(x, y, z))
          if (b !== this.defaultBlock) continue
          const r = this.rule(ctx)
          if (r !== null) col.set(y, r)
        }

        if (columnBiome === 'minecraft:frozen_ocean' || columnBiome === 'minecraft:deep_frozen_ocean') {
          this.frozenOceanExtension(ctx.minSurfaceLevel(), columnBiome, input, col, x, z, top)
        }
      }
    }
  }

  /** 陡坡：区块内相邻两列高度差 ≥ 4（原版 Steep 条件，只看区块内） */
  private steep(input: SurfaceInput, lx: number, lz: number): boolean {
    const k = Math.max(lz - 1, 0)
    const l = Math.min(lz + 1, 15)
    if (input.heightAt(lx, l) >= input.heightAt(lx, k) + 4) return true
    const o = Math.max(lx - 1, 0)
    const p = Math.min(lx + 1, 15)
    return input.heightAt(o, lz) >= input.heightAt(p, lz) + 4
  }

  /** 侵蚀恶地的石柱（原版 erodedBadlandsExtension） */
  private erodedBadlandsExtension(col: BlockColumn, x: number, z: number, surfaceY: number, minY: number): void {
    const e = Math.min(Math.abs(this.badlandsSurface.getValue(x, 0.0, z) * 8.25), this.badlandsPillar.getValue(x * 0.2, 0.0, z * 0.2) * 15.0)
    if (e <= 0.0) return
    const g = Math.abs(this.badlandsPillarRoof.getValue(x * 0.75, 0.0, z * 0.75) * 1.5)
    const k = Math.floor(64.0 + Math.min(e * e * 2.5, Math.ceil(g * 50.0) + 24.0))
    if (surfaceY > k) return
    for (let l = k; l >= minY; l--) {
      const b = col.get(l)
      if (b === this.defaultBlock) break
      if (b === 'minecraft:water') return
    }
    for (let l = k; l >= minY && col.get(l) === AIR; l--) col.set(l, this.defaultBlock)
  }

  /** 冰冻海洋的冰山（原版 frozenOceanExtension） */
  private frozenOceanExtension(minSurface: number, biome: string, input: SurfaceInput, col: BlockColumn, x: number, z: number, top: number): void {
    const e = Math.min(Math.abs(this.icebergSurface.getValue(x, 0.0, z) * 8.25), this.icebergPillar.getValue(x * 1.28, 0.0, z * 1.28) * 15.0)
    if (e <= 1.8) return
    const h = Math.abs(this.icebergPillarRoof.getValue(x * 1.17, 0.0, z * 1.17) * 1.5)
    let m = Math.min(e * e * 1.2, Math.ceil(h * 40.0) + 14.0)
    if (input.warmerThan01(biome, x, this.seaLevel, z)) m -= 2.0
    let n: number
    if (m > 2.0) {
      n = this.seaLevel - m - 7.0
      m += this.seaLevel
    } else {
      m = 0.0
      n = 0.0
    }
    const r = this.random.at(x, 0, z)
    const p = 2 + r.nextInt(4)
    const q = this.seaLevel + 18 + r.nextInt(10)
    let count = 0
    for (let s = Math.max(top, Math.trunc(m) + 1); s >= minSurface; s--) {
      const b = col.get(s)
      if (
        (b === AIR && s < Math.trunc(m) && r.nextDouble() > 0.01) ||
        (b === 'minecraft:water' && s > Math.trunc(n) && s < this.seaLevel && n !== 0.0 && r.nextDouble() > 0.15)
      ) {
        if (count <= p && s > q) {
          col.set(s, 'minecraft:snow_block')
          count++
        } else col.set(s, 'minecraft:packed_ice')
      }
    }
  }
}

/** 恶地的陶瓦条纹：192 层，按固定的随机数排好（原版 SurfaceSystem.generateBands） */
export function generateBands(random: RandomSource): string[] {
  const T = (c: string) => `minecraft:${c}terracotta`
  const bs: string[] = new Array(192).fill(T(''))
  for (let i = 0; i < bs.length; i++) {
    i += random.nextInt(5) + 1
    if (i < bs.length) bs[i] = T('orange_')
  }
  const makeBands = (i: number, b: string) => {
    const j = between(random, 6, 15)
    for (let k = 0; k < j; k++) {
      const l = i + random.nextInt(3)
      const m = random.nextInt(bs.length)
      for (let n = 0; m + n < bs.length && n < l; n++) bs[m + n] = b
    }
  }
  makeBands(1, T('yellow_'))
  makeBands(2, T('brown_'))
  makeBands(1, T('red_'))
  const j = between(random, 9, 15)
  let k = 0
  for (let l = 0; k < j && l < bs.length; l += random.nextInt(16) + 4) {
    bs[l] = T('white_')
    if (l - 1 > 0 && random.nextBoolean()) bs[l - 1] = T('light_gray_')
    if (l + 1 < bs.length && random.nextBoolean()) bs[l + 1] = T('light_gray_')
    k++
  }
  return bs
}

/** 原版 RandomSource.nextIntBetweenInclusive */
function between(r: RandomSource, a: number, b: number): number {
  return r.nextInt(b - a + 1) + a
}
