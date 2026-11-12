import { BlockType } from '../blocks'
import { buildChunkMesh } from '../mesh/mesher'
import { NoiseChunk, type NoiseSettingsInfo, type Worldgen } from '../worldgen'

/**
 * 生成一个区块：密度 → 方块 → 网格。
 *
 *   1. NoiseChunk 按原版规则算出每个方块的 final_density，> 0 是石头，≤ 0 是空气
 *   2. 临时的“地表规则”：把最上面几层石头换成草/土/沙，海平面以下的空气换成水
 *   3. 面剔除生成网格
 *
 * 第 1 步与原版一致（v0 的成果）；第 2 步是我自己写的近似版，原版的地表规则（surface_rule）
 * 依赖生物群系，留到 v4 再做。含水层也没做，所以洞穴里不会有水。
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

export function generateChunk(wg: Worldgen, settingsId: string, s: NoiseSettingsInfo, cx: number, cz: number) {
  const t0 = performance.now()
  const H = s.height
  const minY = s.minY
  const sea = s.seaLevel

  // padded[((y-minY)*W + pz)*W + px]，px/pz = 局部坐标 + 1
  const padded = new Uint8Array(W * W * H)
  const pidx = (px: number, y: number, pz: number) => ((y - minY) * W + pz) * W + px

  // ---- 1. 密度 → 石头 / 空气
  // NoiseChunk 的区域起点要对齐 cell 宽度（4），所以区域取 24×24，只遍历需要的 18×18 列
  const wx0 = cx * 16 - PAD
  const wz0 = cz * 16 - PAD
  const align = (v: number) => Math.floor(v / s.cellWidth) * s.cellWidth
  const rx0 = align(wx0)
  const rz0 = align(wz0)
  const size = Math.ceil((wx0 + W - rx0) / s.cellWidth) * s.cellWidth
  const sizeZ = Math.ceil((wz0 + W - rz0) / s.cellWidth) * s.cellWidth
  const noise = new NoiseChunk(wg.router(settingsId, 'final_density'), {
    x0: rx0,
    z0: rz0,
    sizeX: size,
    sizeZ,
    minY,
    height: H,
    cellWidth: s.cellWidth,
    cellHeight: s.cellHeight
  })
  noise.forEach(
    (x, y, z, density) => {
      if (density > 0) padded[pidx(x - wx0, y, z - wz0)] = BlockType.stone
    },
    { x0: wx0, x1: wx0 + W, z0: wz0, z1: wz0 + W }
  )

  // ---- 2. 临时地表规则（逐列）
  for (let pz = 0; pz < W; pz++) {
    for (let px = 0; px < W; px++) {
      const wx = wx0 + px
      const wz = wz0 + pz
      // 找这一列最高的石头
      let top = minY - 1
      for (let y = minY + H - 1; y >= minY; y--) {
        if (padded[pidx(px, y, pz)] !== BlockType.air) {
          top = y
          break
        }
      }
      // 地表以上、海平面以下的空气 → 水
      for (let y = Math.max(top + 1, minY); y < sea; y++) padded[pidx(px, y, pz)] = BlockType.water

      // 表层：水下是沙/沙砾，海边是沙滩，其他是草 + 3 层土
      if (top >= minY) {
        const underwater = top < sea - 1
        const beach = !underwater && top <= sea + 1
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

  // ---- 3. 网格（用带外圈的数组判断邻居）
  const { opaque, water } = buildChunkMesh(
    (lx, y, lz) => (y < minY || y >= minY + H ? BlockType.air : padded[pidx(lx + PAD, y, lz + PAD)]),
    minY,
    H,
    cx,
    cz
  )

  // 只把中间 16×16 交给主线程（下标规则与 Chunk.index 相同）
  const blocks = new Uint8Array(16 * 16 * H)
  for (let y = minY; y < minY + H; y++) {
    for (let lz = 0; lz < 16; lz++) {
      for (let lx = 0; lx < 16; lx++) {
        blocks[((y - minY) * 16 + lz) * 16 + lx] = padded[pidx(lx + PAD, y, lz + PAD)]
      }
    }
  }

  return { cx, cz, blocks, opaque, water, ms: performance.now() - t0 }
}
