import { BLOCK_BITS, BLOCK_BY_NAME, BlockType, NAME_BY_BLOCK } from '../blocks'
import PalettedContainer, { type PalettedData } from '../chunk/PalettedContainer'
import { meshSection, N, nIndex, type MeshOptions, type SectionMesh } from '../mesh/mesher'
import { ChunkSource } from './pipeline'
import { type Aquifer, Fluid, foliageColor, grassColor, NoiseChunk, type NoiseSettingsInfo, type Worldgen } from '../worldgen'

/**
 * 生成一个区块：密度 → 方块 → 网格。
 *
 *   1. NoiseChunk 按原版规则算出每个方块的 final_density，> 0 是石头；
 *      ≤ 0 的地方交给含水层（v3）决定是空气、水、岩浆，还是含水层之间的石头墙
 *   2. 临时的“地表规则”：把最上面几层石头换成草/土/沙
 *   3. 切成 16³ 的 section，每段用调色板压缩，并生成贪婪网格
 *
 * 第 1 步与原版一致（v0 的密度函数 + v3 的含水层）；第 2 步是我自己写的近似版，
 * 原版的地表规则（surface_rule）依赖生物群系，留到 v4 再做。
 *
 * 为了让区块边上的面也能正确剔除，这里多算一圈：实际生成 18×18 列（区块 16×16 + 四周各 1），
 * 中间 16×16 交给主线程保存，外面一圈只用来判断“邻居是不是实心”。
 */

const PAD = 1
const W = 16 + PAD * 2 // 18

/** 坐标哈希 → 0..1，用来做基岩、深板岩过渡这种“看起来随机但每次都一样”的东西 */
function hash01(x: number, y: number, z: number): number {
  let h = Math.imul(x, 0x27d4eb2d) ^ Math.imul(y, 0x165667b1) ^ Math.imul(z, 0x9e3779b1)
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b)
  h ^= h >>> 13
  return (h >>> 0) / 4294967296
}

/** 一个 section 的网格；整段没有面时为 null */
export type SectionMeshes = { opaque: SectionMesh; water: SectionMesh } | null

const FLUID_BLOCK = [BlockType.air, BlockType.water, BlockType.lava]

export interface ProtoChunk {
  /** blocks[((y - minY) * 16 + lz) * 16 + lx]：地形 + 含水层 + 矿脉 + 地表，还没有地物 */
  blocks: Uint8Array
  /** 生成完马上要“流一下”的流体（区块内下标） */
  fluidUpdates: Int32Array
}

/**
 * 区块的“原型”（原版 ProtoChunk 在 surface 状态时的样子）：
 *   1. NoiseChunk 按原版规则算出每个方块的 final_density，> 0 是石头；
 *      ≤ 0 的地方交给含水层（v3）决定是空气、水、岩浆；石头里再问一次矿脉（v5）
 *   2. 地表：有原版 surface_rule 就用（v4），否则用 v0~v3 的临时规则
 * 地物（v5）在这之后、由 ChunkSource 用周围 3×3 个原型来放。
 */
export function protoChunk(wg: Worldgen, settingsId: string, s: NoiseSettingsInfo, cx: number, cz: number, aquifer: Aquifer = wg.aquifer(settingsId, cx, cz)): ProtoChunk {
  const H = s.height
  const minY = s.minY
  const sea = s.seaLevel
  const blocks = new Uint8Array(16 * 16 * H)
  const bidx = (lx: number, y: number, lz: number) => ((y - minY) * 16 + lz) * 16 + lx
  const wx0 = cx * 16
  const wz0 = cz * 16

  // ---- 1. 密度 → 石头 / 空气 / 流体 / 矿脉
  const noise = new NoiseChunk(wg.router(settingsId, 'final_density'), {
    x0: wx0,
    z0: wz0,
    sizeX: 16,
    sizeZ: 16,
    minY,
    height: H,
    cellWidth: s.cellWidth,
    cellHeight: s.cellHeight
  })
  const fluidUpdates: number[] = []
  // 矿脉（v5）：密度 > 0 的格子先问矿脉（原版 NoiseChunk 的 MaterialRuleList：含水层 → 矿脉 → 默认方块）
  const vein = wg.oreVeinifier(settingsId, (fn) => noise.wrap(fn))
  const vctx = { blockX: 0, blockY: 0, blockZ: 0 }
  noise.forEach(
    (x, y, z, density) => {
      const f = aquifer.computeSubstance(x, y, z, density)
      let b: number
      if (f !== null) b = FLUID_BLOCK[f]
      else if (vein) {
        vctx.blockX = x
        vctx.blockY = y
        vctx.blockZ = z
        const v = vein(vctx)
        b = v === null ? BlockType.stone : BLOCK_BY_NAME[v]
      } else b = BlockType.stone
      const i = bidx(x - wx0, y, z - wz0)
      blocks[i] = b
      if (f !== null && f !== Fluid.air && aquifer.shouldScheduleFluidUpdate) fluidUpdates.push(i)
    },
    { x0: wx0, x1: wx0 + 16, z0: wz0, z1: wz0 + 16 }
  )

  // ---- 2. 地表
  const surface = wg.surfaceSystem(settingsId)
  const biomes = wg.biomes(settingsId)
  const heights = new Int32Array(256)
  for (let lz = 0; lz < 16; lz++)
    for (let lx = 0; lx < 16; lx++) {
      let y = minY + H - 1
      while (y >= minY && blocks[bidx(lx, y, lz)] === BlockType.air) y--
      heights[lz * 16 + lx] = y
    }
  if (surface) {
    surface.buildSurface({
      chunkX: cx,
      chunkZ: cz,
      minY,
      height: H,
      column: (lx, lz) => ({
        get: (y) => (y < minY || y >= minY + H ? 'minecraft:air' : NAME_BY_BLOCK[blocks[bidx(lx, y, lz)]]),
        set: (y, name) => {
          if (y < minY || y >= minY + H) return
          blocks[bidx(lx, y, lz)] = BLOCK_BY_NAME[name] ?? BlockType.stone
          // 原版 ProtoChunk.setBlockState 会更新高度图：侵蚀恶地的石柱放下去以后，这一列的地表从柱顶开始算
          if (name !== 'minecraft:air' && y > heights[lz * 16 + lx]) heights[lz * 16 + lx] = y
        }
      }),
      heightAt: (lx, lz) => heights[lz * 16 + lx],
      biome: (x, y, z) => biomes.getBiome(x, y, z),
      coldEnoughToSnow: (b, x, y, z) => biomes.coldEnoughToSnow(b, x, y, z),
      warmerThan01: (b, x, y, z) => biomes.temperature(b, x, y, z) > Math.fround(0.1),
      preliminarySurfaceLevel: wg.preliminarySurface(settingsId)
    })
  } else {
    temporarySurface(blocks, wx0, wz0, minY, H, sea)
  }
  return { blocks, fluidUpdates: Int32Array.from(fluidUpdates) }
}

/** generateChunk 的选项 */
export interface ChunkOptions extends MeshOptions {
  /** 放地物（v5，默认放）。false 时等于 v4 的结果 */
  features?: boolean
}

/** 每个 Worldgen 一个区块源（缓存原型和装饰结果） */
const sources = new WeakMap<Worldgen, Map<string, ChunkSource>>()
export function chunkSource(wg: Worldgen, settingsId: string, s: NoiseSettingsInfo): ChunkSource {
  let m = sources.get(wg)
  if (!m) sources.set(wg, (m = new Map()))
  const key = `${settingsId}|${wg.seed}`
  let src = m.get(key)
  if (!src) {
    m.clear()
    m.set(key, (src = new ChunkSource(wg, settingsId, s)))
  }
  return src
}

/**
 * 生成一个区块：原型 → 地物 → 颜色 → 网格。
 *
 * 为了让区块边上的面也能正确剔除，网格用 18×18 列（区块 16×16 + 四周各 1）：
 * 外面一圈来自邻居区块（原型 + 已经算出来的装饰），只用来判断“邻居是不是实心”。
 */
export function generateChunk(wg: Worldgen, settingsId: string, s: NoiseSettingsInfo, cx: number, cz: number, opts: ChunkOptions = {}) {
  const t0 = performance.now()
  const H = s.height
  const minY = s.minY
  const src = chunkSource(wg, settingsId, s)
  const features = opts.features !== false && src.hasFeatures

  // padded[((y-minY)*W + pz)*W + px]，px/pz = 局部坐标 + 1
  const padded = new Uint8Array(W * W * H)
  const pidx = (px: number, y: number, pz: number) => ((y - minY) * W + pz) * W + px
  for (let dz = -1; dz <= 1; dz++)
    for (let dx = -1; dx <= 1; dx++) {
      const blocks = features ? src.withDecorations(cx + dx, cz + dz, cx, cz) : src.proto(cx + dx, cz + dz).blocks
      // 这个邻居在 padded 里占哪些列
      const lx0 = dx < 0 ? 15 : 0
      const lx1 = dx > 0 ? 0 : 15
      const lz0 = dz < 0 ? 15 : 0
      const lz1 = dz > 0 ? 0 : 15
      for (let y = 0; y < H; y++)
        for (let lz = lz0; lz <= lz1; lz++)
          for (let lx = lx0; lx <= lx1; lx++) padded[(y * W + (lz + dz * 16 + PAD)) * W + lx + dx * 16 + PAD] = blocks[(y * 16 + lz) * 16 + lx]
    }
  const fluidUpdates = src.proto(cx, cz).fluidUpdates
  const biomes = wg.biomes(settingsId)
  const wx0 = cx * 16 - PAD
  const wz0 = cz * 16 - PAD
  // 方块位置 → 生物群系（BiomeManager 要算 64 位整数，按位置缓存）
  const biomeMemo = new Map<number, string>()
  const biomeAt = (x: number, y: number, z: number) => {
    const k = ((x - wx0 + 4) * 64 + (z - wz0 + 4)) * 1024 + (y - minY)
    let b = biomeMemo.get(k)
    if (b === undefined) biomeMemo.set(k, (b = biomes.getBiome(x, y, z)))
    return b
  }
  // 每一列最高的非空气方块
  const heights = new Int32Array(W * W)
  for (let pz = 0; pz < W; pz++)
    for (let px = 0; px < W; px++) {
      let y = minY + H - 1
      while (y >= minY && padded[pidx(px, y, pz)] === BlockType.air) y--
      heights[pz * W + px] = y
    }

  // ---- 2.5 每一列草、树叶、水的颜色（v4）：周围 5×5 列的生物群系颜色取平均（原版默认的“生物群系过渡”半径 2）
  const tints = biomeTints(wg, cx, cz, (x, z) => {
    // 这一列用最近的区块内的列的地表高度
    const lx = Math.min(15, Math.max(0, x - cx * 16))
    const lz = Math.min(15, Math.max(0, z - cz * 16))
    return biomeAt(x, Math.max(minY, heights[(lz + PAD) * W + lx + PAD]), z)
  })


  // ---- 3. 切成 section：压缩 + 生成网格
  const sectionCount = H >> 4
  const sections: PalettedData[] = []
  const meshes: SectionMeshes[] = []
  const values = new Uint8Array(4096)
  const hood = new Uint8Array(N * N * N) // 18³ 邻域，给网格生成用
  const at = (px: number, y: number, pz: number) => (y < minY || y >= minY + H ? BlockType.air : padded[pidx(px, y, pz)])

  for (let sy = 0; sy < sectionCount; sy++) {
    const y0 = minY + sy * 16
    // 中间 16³ → 调色板容器（段内下标 (y*16+z)*16+x）
    for (let ly = 0; ly < 16; ly++)
      for (let lz = 0; lz < 16; lz++)
        for (let lx = 0; lx < 16; lx++) values[(ly * 16 + lz) * 16 + lx] = padded[pidx(lx + PAD, y0 + ly, lz + PAD)]
    const container = PalettedContainer.fromValues(values, BLOCK_BITS)
    sections.push(container.toData())

    // 整段都是空气：没有任何面，跳过网格
    if (container.isSingle && container.palette[0] === BlockType.air) {
      meshes.push(null)
      continue
    }
    for (let ly = -1; ly <= 16; ly++)
      for (let lz = -1; lz <= 16; lz++)
        for (let lx = -1; lx <= 16; lx++) hood[nIndex(lx, ly, lz)] = at(lx + PAD, y0 + ly, lz + PAD)
    const m = meshSection(hood, opts)
    meshes.push(m.opaque.indices.length + m.water.indices.length > 0 ? m : null)
  }

  return { cx, cz, sections, meshes, fluidUpdates: Int32Array.from(fluidUpdates), tints, ms: performance.now() - t0 }
}

/**
 * v0~v3 的临时地表规则，现在只给没有 surface_rule 的 noise_settings（demo 的简化地形）用：
 * 水下是沙 / 沙砾，海边是沙滩，其他是草 + 3 层土；y < 0 深板岩（0..7 过渡），最底下几层基岩。
 */
function temporarySurface(padded: Uint8Array, wx0: number, wz0: number, minY: number, H: number, sea: number) {
  const pidx = (px: number, y: number, pz: number) => ((y - minY) * 16 + pz) * 16 + px
  for (let pz = 0; pz < 16; pz++) {
    for (let px = 0; px < 16; px++) {
      const wx = wx0 + px
      const wz = wz0 + pz
      // 找这一列最高的石头（水、岩浆不算）
      let top = minY - 1
      for (let y = minY + H - 1; y >= minY; y--) {
        if (padded[pidx(px, y, pz)] === BlockType.stone) {
          top = y
          break
        }
      }

      // 表层：水下是沙/沙砾，海边是沙滩，其他是草 + 3 层土
      if (top >= minY) {
        const underwater = top + 1 < minY + H && padded[pidx(px, top + 1, pz)] === BlockType.water
        const beach = !underwater && top <= sea + 1 && top >= sea - 2
        for (let d = 0; d < 4 && top - d >= minY; d++) {
          const y = top - d
          if (padded[pidx(px, y, pz)] !== BlockType.stone) break // 碰到洞穴就停
          let b: BlockType
          if (underwater) b = top < sea - 8 ? BlockType.gravel : BlockType.sand
          else if (beach) b = BlockType.sand
          else b = d === 0 ? BlockType.grass : BlockType.dirt
          padded[pidx(px, y, pz)] = b
        }
      }

      // 深层：y<0 换成深板岩（0..7 之间随机过渡），最底下几层基岩
      for (let y = minY; y < Math.min(8, minY + H); y++) {
        const i = pidx(px, y, pz)
        if (padded[i] !== BlockType.stone) continue
        if (y < 0 || hash01(wx, y, wz) < (8 - y) / 8) padded[i] = BlockType.deepslate
      }
      for (let y = minY; y < minY + 5; y++) {
        if (y === minY || hash01(wx, y + 1000, wz) < (minY + 5 - y) / 5) padded[pidx(px, y, pz)] = BlockType.bedrock
      }
    }
  }
}

/** 每一列草 / 树叶 / 水的颜色：5×5 列取平均，结果是 16×16×3 种×RGB */
function biomeTints(wg: Worldgen, cx: number, cz: number, biomeOf: (x: number, z: number) => string): Uint8Array {
  const R = 2
  const S = 16 + R * 2
  const colors = new Int32Array(S * S * 3)
  for (let dz = 0; dz < S; dz++) {
    for (let dx = 0; dx < S; dx++) {
      const x = cx * 16 - R + dx
      const z = cz * 16 - R + dz
      const b = wg.biome(biomeOf(x, z))
      const i = (dz * S + dx) * 3
      colors[i] = grassColor(b, x, z)
      colors[i + 1] = foliageColor(b)
      colors[i + 2] = b.waterColor
    }
  }
  const out = new Uint8Array(16 * 16 * 9)
  const n = (2 * R + 1) * (2 * R + 1)
  for (let lz = 0; lz < 16; lz++)
    for (let lx = 0; lx < 16; lx++)
      for (let k = 0; k < 3; k++) {
        let r = 0
        let g = 0
        let b = 0
        for (let dz = -R; dz <= R; dz++)
          for (let dx = -R; dx <= R; dx++) {
            const c = colors[((lz + R + dz) * S + (lx + R + dx)) * 3 + k]
            r += (c >> 16) & 255
            g += (c >> 8) & 255
            b += c & 255
          }
        const o = ((lz * 16 + lx) * 3 + k) * 3
        out[o] = Math.floor(r / n)
        out[o + 1] = Math.floor(g / n)
        out[o + 2] = Math.floor(b / n)
      }
  return out
}
