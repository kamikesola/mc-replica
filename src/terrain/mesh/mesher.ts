import { BLOCKS, BlockType, isSolid } from '../blocks'

/**
 * 网格生成：把一个区块的方块数组变成 three.js 能画的三角形。
 *
 * 只画“看得见的面”：一个实心方块的某个面，如果紧挨着的是空气或水，才需要画（面剔除）。
 * 地下被石头包住的方块一个面都不画，所以 98304 个方块通常只剩几千个面。
 *
 * 顺带做了两件让画面更像 MC 的事：
 *  - 固定方向光：顶面最亮、南北面次之、东西面再暗、底面最暗（原版就是这样做的）
 *  - 环境光遮蔽（AO）：墙角、缝隙处的顶点变暗，方块立体感一下子就出来了
 *
 * 这个文件既在 Worker 里用（第一次生成），也在主线程里用（挖/放方块后重建），
 * 所以不依赖 three，也不依赖任何 DOM。
 */

/** 读方块的回调：lx/lz 允许 -1 和 16（邻居区块），y 是世界坐标 */
export type BlockGetter = (lx: number, y: number, lz: number) => number

export interface MeshArrays {
  positions: Float32Array
  colors: Float32Array
  indices: Uint32Array
}

/**
 * 6 个面：法线 n、亮度、4 个角（相对方块原点，0 或 1）。
 * 角的顺序配合索引 [0,1,2, 2,1,3]，从外面看是逆时针（three.js 默认只画正面）。
 */
const FACES = [
  { n: [-1, 0, 0], shade: 0.6, side: 'side', c: [[0, 1, 0], [0, 0, 0], [0, 1, 1], [0, 0, 1]] },
  { n: [1, 0, 0], shade: 0.6, side: 'side', c: [[1, 1, 1], [1, 0, 1], [1, 1, 0], [1, 0, 0]] },
  { n: [0, -1, 0], shade: 0.5, side: 'bottom', c: [[1, 0, 1], [0, 0, 1], [1, 0, 0], [0, 0, 0]] },
  { n: [0, 1, 0], shade: 1.0, side: 'top', c: [[0, 1, 1], [1, 1, 1], [0, 1, 0], [1, 1, 0]] },
  { n: [0, 0, -1], shade: 0.8, side: 'side', c: [[1, 0, 0], [0, 0, 0], [1, 1, 0], [0, 1, 0]] },
  { n: [0, 0, 1], shade: 0.8, side: 'side', c: [[0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]] }
] as const

/** AO 等级 0..3 对应的亮度 */
const AO_LEVEL = [0.5, 0.68, 0.84, 1.0]

/** 按坐标哈希出 ±5% 的亮度抖动，让大片同色方块不那么“塑料” */
function jitter(x: number, y: number, z: number): number {
  let h = Math.imul(x, 73856093) ^ Math.imul(y, 19349663) ^ Math.imul(z, 83492791)
  h = Math.imul(h ^ (h >>> 13), 0x5bd1e995)
  return 0.95 + (((h >>> 0) % 1000) / 1000) * 0.1
}

class Builder {
  pos: number[] = []
  col: number[] = []
  ind: number[] = []

  quad(corners: number[][], colors: number[][], flip: boolean): void {
    const n = this.pos.length / 3
    for (let i = 0; i < 4; i++) {
      this.pos.push(corners[i][0], corners[i][1], corners[i][2])
      this.col.push(colors[i][0], colors[i][1], colors[i][2])
    }
    // AO 不均匀时换一条对角线切三角形，避免出现难看的“斜条纹”
    if (flip) this.ind.push(n, n + 1, n + 3, n, n + 3, n + 2)
    else this.ind.push(n, n + 1, n + 2, n + 2, n + 1, n + 3)
  }

  build(): MeshArrays {
    return { positions: new Float32Array(this.pos), colors: new Float32Array(this.col), indices: new Uint32Array(this.ind) }
  }
}

/**
 * @param get     读方块（局部坐标）
 * @param minY    世界最低 y
 * @param height  世界高度
 * @param cx, cz  区块坐标，只用来算颜色抖动
 * @returns opaque 不透明部分，water 水面
 */
export function buildChunkMesh(get: BlockGetter, minY: number, height: number, cx: number, cz: number) {
  const opaque = new Builder()
  const water = new Builder()
  const solidAt = (x: number, y: number, z: number) => isSolid(get(x, y, z))

  for (let y = minY; y < minY + height; y++) {
    for (let lz = 0; lz < 16; lz++) {
      for (let lx = 0; lx < 16; lx++) {
        const type = get(lx, y, lz) as BlockType
        if (type === BlockType.air) continue

        if (type === BlockType.water) {
          addWaterFaces(water, get, lx, y, lz)
          continue
        }

        const info = BLOCKS[type]
        const j = jitter(cx * 16 + lx, y, cz * 16 + lz)
        for (const f of FACES) {
          const [nx, ny, nz] = f.n
          if (solidAt(lx + nx, y + ny, lz + nz)) continue // 被挡住，不画

          const base = info[f.side]
          const corners: number[][] = []
          const colors: number[][] = []
          const ao: number[] = []
          for (const c of f.c) {
            const a = vertexAO(solidAt, lx, y, lz, f.n, c)
            ao.push(a)
            const k = f.shade * AO_LEVEL[a] * j
            corners.push([lx + c[0], y + c[1], lz + c[2]])
            colors.push([base[0] * k, base[1] * k, base[2] * k])
          }
          opaque.quad(corners, colors, ao[0] + ao[3] < ao[1] + ao[2])
        }
      }
    }
  }
  return { opaque: opaque.build(), water: water.build() }
}

/**
 * 一个顶点的 AO：看这个顶点外侧的三个方块（两条边 + 一个角）。
 * 两条边都被挡住 → 最暗（0）；否则 3 - 被挡住的数量。
 * 这是体素游戏里最常见的做法（0fps.net 的 “Ambient occlusion for Minecraft-like worlds”）。
 */
function vertexAO(
  solidAt: (x: number, y: number, z: number) => boolean,
  x: number,
  y: number,
  z: number,
  n: readonly number[],
  c: readonly number[]
): number {
  // 面外侧那一层的坐标
  const ox = x + n[0]
  const oy = y + n[1]
  const oz = z + n[2]
  // 沿面的两个切向轴，按角的位置决定往正方向还是负方向看
  const axes = [0, 1, 2].filter((a) => n[a] === 0)
  const d1 = [0, 0, 0]
  const d2 = [0, 0, 0]
  d1[axes[0]] = c[axes[0]] === 1 ? 1 : -1
  d2[axes[1]] = c[axes[1]] === 1 ? 1 : -1
  const s1 = solidAt(ox + d1[0], oy + d1[1], oz + d1[2]) ? 1 : 0
  const s2 = solidAt(ox + d2[0], oy + d2[1], oz + d2[2]) ? 1 : 0
  if (s1 && s2) return 0
  const corner = solidAt(ox + d1[0] + d2[0], oy + d1[1] + d2[1], oz + d1[2] + d2[2]) ? 1 : 0
  return 3 - (s1 + s2 + corner)
}

/** 水只在挨着空气的地方画面；顶面往下压一点，看起来像原版的水面 */
function addWaterFaces(b: Builder, get: BlockGetter, lx: number, y: number, lz: number): void {
  const [r, g, bl] = BLOCKS[BlockType.water].top
  for (const f of FACES) {
    const [nx, ny, nz] = f.n
    if (get(lx + nx, y + ny, lz + nz) !== BlockType.air) continue
    const corners = f.c.map((c) => [lx + c[0], y + (c[1] === 1 ? 0.875 : 0), lz + c[2]])
    const k = f.shade
    b.quad(corners, [0, 1, 2, 3].map(() => [r * k, g * k, bl * k]), false)
  }
}
