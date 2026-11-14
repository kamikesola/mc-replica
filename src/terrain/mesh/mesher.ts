import { FACE_TEXTURES, FLUID_KIND, FLUIDS, FluidKind, SHAPE, SHAPE_HEIGHT, SOLID } from '../blocks'
import { TEXTURE_LAYER, TINT_BY_LAYER } from '../textures/painters'

/**
 * 网格生成（v1：贪婪网格）。输入一个 section（16³）连同四周一圈邻居，输出三角形。
 *
 * v0 的做法：每个露在外面的面画一个四边形（2 个三角形）。一片平地 16×16 个方块就是 256 个四边形。
 * v1 的做法：**相邻的、长得一样的面合并成一个大矩形**。同一片平地只要 1 个四边形。
 *
 * 怎么合并（贪婪网格，Greedy Meshing）：
 *   对 6 个方向分别处理。以“朝上的面”为例，一层一层往上扫：
 *     1. 把这一层 16×16 个位置填进 mask：这里有朝上的面就记下它的“样子”（纹理 + 四个角的 AO），没有就记 0
 *     2. 从左上角开始找第一个非 0 的格子，先向右尽量延伸（样子相同就继续），
 *        再整行整行地向下延伸，得到一个最大的矩形
 *     3. 输出这个矩形，把 mask 里对应的格子清零，继续找下一个
 *
 * 什么样的面能合并：纹理相同，并且四个角的 AO 也完全相同。再细分一下：
 *   - 四个角 AO 都一样（最常见：完全不遮挡）→ 两个方向都能合并
 *   - 只沿一个方向变暗（比如贴着墙根的一排地面：靠墙的两个角暗、另两个角亮）
 *     → 只能顺着墙的方向合并成一长条，这样每个位置的明暗和不合并时完全一样
 *   - 其他情况（墙角的单个暗角）保持 1×1，否则阴影会被拉伸变形
 * 纹理靠 GPU 的“重复平铺”铺满大矩形（见 materials.ts），所以合并后看起来和原来一模一样。
 *
 * 流体（v3）：水和岩浆的表面不是平的。每个角的高度按原版 LiquidBlockRenderer 的规则，
 * 由这一格和周围三格的“液面高度”加权平均得到（见 fluidHeights）。只有完全水平的流体面才合并。
 * 水画在半透明的 water 网格里，岩浆不透明，画在 opaque 网格里。
 *
 * 这个文件既在 Worker 里用（第一次生成），也在主线程里用（挖 / 放方块后重建），不依赖 three 和 DOM。
 */

/** 邻域边长：section 16 格 + 两边各 1 格邻居 */
export const N = 18

/** 邻域数组的下标，x/y/z 是 section 内的坐标，范围 -1..16 */
export const nIndex = (x: number, y: number, z: number) => ((y + 1) * N + (z + 1)) * N + (x + 1)

/**
 * 一个 section 的网格数据。为了省显存，每个顶点只有 10 个字节：
 *   positions  Uint16 ×3   section 内的坐标 × 256（流体表面的高度不是整数格，1/256 格的精度足够）
 *   info       Uint8  ×4   [面的方向 0..5, 纹理层号, AO 等级 0..3, 染色种类（v4：0 无 / 1 草 / 2 树叶 / 3 水）]
 * 纹理坐标、明暗都在着色器里根据这两项算出来（见 materials.ts）。
 * v0 每个顶点是 6 个 float（位置 + 颜色）= 24 字节。
 */
export interface SectionMesh {
  positions: Uint16Array
  info: Uint8Array
  indices: Uint16Array
}

/** 坐标放大倍数：存进 Uint16 之前乘 16 */
export const POSITION_SCALE = 256

/** 6 个面的方向：-x, +x, -y, +y, -z, +z。axis = 法线所在的轴，sign = 正方向还是负方向 */
export const FACE_DIRS: readonly [number, number, number][] = [
  [-1, 0, 0],
  [1, 0, 0],
  [0, -1, 0],
  [0, 1, 0],
  [0, 0, -1],
  [0, 0, 1]
]

// mask 里的标记位：这个面可以往哪个方向合并
const MERGE_U = 1 << 16 // AO 只沿 v 方向变化（ao0 = ao1 且 ao2 = ao3），可以沿 u 方向拉长
const MERGE_V = 1 << 17 // AO 只沿 u 方向变化（ao0 = ao2 且 ao1 = ao3），可以沿 v 方向拉长
const FLUID_LAYER = [0, TEXTURE_LAYER.water, TEXTURE_LAYER.lava]

/** 可增长的输出缓冲 */
class Builder {
  pos = new Uint16Array(4096 * 3)
  inf = new Uint8Array(4096 * 4)
  ind = new Uint16Array(4096 * 1.5)
  vertices = 0
  indexCount = 0

  private grow(): void {
    const g = <T extends Uint16Array | Uint8Array>(a: T, n: number): T => {
      const b = new (a.constructor as { new (n: number): T })(n)
      b.set(a)
      return b
    }
    this.pos = g(this.pos, this.pos.length * 2)
    this.inf = g(this.inf, this.inf.length * 2)
    this.ind = g(this.ind, this.ind.length * 2)
  }

  /** corners: 4 个角（x,y,z ×4），顺序 (u-,v-) (u+,v-) (u-,v+) (u+,v+) */
  quad(corners: number[], face: number, layer: number, ao: number[], positive: boolean, flip: boolean): void {
    if ((this.vertices + 4) * 4 > this.inf.length || this.indexCount + 6 > this.ind.length) this.grow()
    const n = this.vertices
    for (let i = 0; i < 4; i++) {
      this.pos.set([corners[i * 3], corners[i * 3 + 1], corners[i * 3 + 2]], (n + i) * 3)
      this.inf.set([face, layer, ao[i], TINT_BY_LAYER[layer]], (n + i) * 4)
    }
    // 两个三角形。positive：从外面看是逆时针（three.js 默认只画正面）。
    // flip：沿另一条对角线切，让 AO 的过渡更自然（见 README 里 0fps 的文章）
    const tri = flip ? [0, 1, 3, 0, 3, 2] : [0, 1, 2, 2, 1, 3]
    for (let t = 0; t < 6; t += 3) {
      const a = tri[t]
      const b = positive ? tri[t + 1] : tri[t + 2]
      const c = positive ? tri[t + 2] : tri[t + 1]
      this.ind[this.indexCount++] = n + a
      this.ind[this.indexCount++] = n + b
      this.ind[this.indexCount++] = n + c
    }
    this.vertices += 4
  }

  build(): SectionMesh {
    return {
      positions: this.pos.slice(0, this.vertices * 3),
      info: this.inf.slice(0, this.vertices * 4),
      indices: this.ind.slice(0, this.indexCount)
    }
  }
}

export interface MeshOptions {
  /** false：不合并，每个面单独一个四边形（v0 的做法，F3 里按 G 可以切换对比） */
  greedy?: boolean
}

/**
 * @param blocks 18³ 的邻域，下标见 nIndex()；section 外面的那一圈只用来判断遮挡和 AO
 */
export function meshSection(blocks: Uint8Array, opts: MeshOptions = {}): { opaque: SectionMesh; water: SectionMesh } {
  const greedy = opts.greedy ?? true
  const opaque = new Builder()
  const water = new Builder()
  const maskO = new Int32Array(256)
  /** 流体面的 mask：key 编码了流体种类和 4 个角的高度（数字可能超过 32 位，用 Float64） */
  const maskF = new Float64Array(256)
  /** 每个格子 4 个角的高度（NW, NE, SW, SE），输出时用 */
  const heightsF = new Float32Array(256 * 4)
  const hood = blocks
  const solid = (x: number, y: number, z: number) => SOLID[blocks[nIndex(x, y, z)]]
  const p = [0, 0, 0]
  const q = [0, 0, 0]

  for (let face = 0; face < 6; face++) {
    const n = FACE_DIRS[face]
    const axis = face >> 1
    const u = (axis + 1) % 3 // 面内的两个方向，u × v = 法线方向的正轴
    const v = (axis + 2) % 3
    const positive = (face & 1) === 1

    for (let k = 0; k < 16; k++) {
      // ---- 1. 填 mask
      let any = false
      for (let j = 0; j < 16; j++) {
        for (let i = 0; i < 16; i++) {
          p[axis] = k
          p[u] = i
          p[v] = j
          const b = blocks[nIndex(p[0], p[1], p[2])]
          const nb = blocks[nIndex(p[0] + n[0], p[1] + n[1], p[2] + n[2])]
          const m = j * 16 + i
          maskO[m] = 0
          maskF[m] = 0
          if (SOLID[b]) {
            if (SOLID[nb]) continue // 被挡住，不画
            // 四个角的 AO：看面外侧那一层里，角旁边的两个方块和斜对角的一个方块
            q[0] = p[0] + n[0]
            q[1] = p[1] + n[1]
            q[2] = p[2] + n[2]
            let packed = 0
            for (let c = 0; c < 4; c++) {
              const du = c & 1 ? 1 : -1
              const dv = c & 2 ? 1 : -1
              const s1 = solid(q[0] + (u === 0 ? du : 0), q[1] + (u === 1 ? du : 0), q[2] + (u === 2 ? du : 0))
              const s2 = solid(q[0] + (v === 0 ? dv : 0), q[1] + (v === 1 ? dv : 0), q[2] + (v === 2 ? dv : 0))
              const cc = solid(
                q[0] + (u === 0 ? du : 0) + (v === 0 ? dv : 0),
                q[1] + (u === 1 ? du : 0) + (v === 1 ? dv : 0),
                q[2] + (u === 2 ? du : 0) + (v === 2 ? dv : 0)
              )
              const ao = s1 && s2 ? 0 : 3 - (s1 + s2 + cc)
              packed |= ao << (c * 2)
            }
            const a0 = packed & 3
            const a1 = (packed >> 2) & 3
            const a2 = (packed >> 4) & 3
            const a3 = (packed >> 6) & 3
            const flags = (a0 === a1 && a2 === a3 ? MERGE_U : 0) | (a0 === a2 && a1 === a3 ? MERGE_V : 0)
            maskO[m] = FACE_TEXTURES[b * 6 + face] | (packed << 8) | flags
            any = true
          } else if (FLUID_KIND[b] !== FluidKind.none) {
            // 流体：挨着同一种流体不画；侧面和底面挨着实心方块也不画；顶面只要上面不是同种流体就画
            const kind = FLUID_KIND[b]
            if (FLUID_KIND[nb] === kind) continue
            if (face !== 3 && SOLID[nb]) continue
            const hs = fluidHeights(hood, p[0], p[1], p[2], kind)
            heightsF.set(hs, m * 4)
            // 哪几个角决定这个面的形状：顶面 4 个角；侧面是靠这一侧的 2 个角；底面是平的
            const edge = face === 3 ? hs : face === 2 ? null : face === 0 ? [hs[0], hs[2]] : face === 1 ? [hs[1], hs[3]] : face === 4 ? [hs[0], hs[1]] : [hs[2], hs[3]]
            const flat = !edge || edge.every((h) => h === edge[0])
            let key = kind
            for (const h of edge ?? []) key = key * 257 + Math.round(h * POSITION_SCALE)
            maskF[m] = key * 2 + (flat ? 1 : 0)
            any = true
          }
        }
      }
      if (!any) continue

      // ---- 2. 在 mask 里找矩形
      for (const mask of [maskO, maskF]) {
        for (let j = 0; j < 16; j++) {
          for (let i = 0; i < 16; ) {
            const key = mask[j * 16 + i]
            if (key === 0) {
              i++
              continue
            }
            const isFluid = mask === maskF
            // 流体：只有平的面能合并（两个方向都行）；方块：看 AO 的合并标记
            const mergeU = greedy && (isFluid ? key % 2 === 1 : (key & MERGE_U) !== 0)
            const mergeV = greedy && (isFluid ? key % 2 === 1 : (key & MERGE_V) !== 0)
            let w = 1
            let h = 1
            if (mergeU) while (i + w < 16 && mask[j * 16 + i + w] === key) w++
            if (mergeV) {
              grow: while (j + h < 16) {
                for (let t = 0; t < w; t++) if (mask[(j + h) * 16 + i + t] !== key) break grow
                h++
              }
            }
            if (isFluid) emitFluid(opaque, water, blocks, heightsF.subarray((j * 16 + i) * 4, (j * 16 + i) * 4 + 4), face, axis, u, v, positive, k, i, j, w, h)
            else emit(opaque, key, face, axis, u, v, positive, k, i, j, w, h)
            for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) mask[(j + y) * 16 + i + x] = 0
            i += w
          }
        }
      }
    }
  }
  shapedBlocks(opaque, blocks)
  return { opaque: opaque.build(), water: water.build() }
}

/**
 * 不是完整方块的方块（v5）：逐个输出，不参与贪婪合并。
 *   slab（雪层、地毯）：一个扁盒子，顶面总是画，其他面看邻居是不是实心
 *   cross（藤蔓、垂须……）：两片对角线方向的面，正反两面都画（face 6、7，着色器里按对角线算纹理坐标）
 */
function shapedBlocks(out: Builder, blocks: Uint8Array): void {
  const S = POSITION_SCALE
  for (let y = 0; y < 16; y++)
    for (let z = 0; z < 16; z++)
      for (let x = 0; x < 16; x++) {
        const b = blocks[nIndex(x, y, z)]
        const shape = SHAPE[b]
        if (shape === 0) continue
        if (shape === 1) {
          const h = SHAPE_HEIGHT[b] / 16
          for (let face = 0; face < 6; face++) {
            const n = FACE_DIRS[face]
            if (face !== 3 && SOLID[blocks[nIndex(x + n[0], y + n[1], z + n[2])]]) continue
            const axis = face >> 1
            const u = (axis + 1) % 3
            const v = (axis + 2) % 3
            const positive = (face & 1) === 1
            const corners = rectCorners(axis, u, v, positive, [x, y, z][axis], [x, y, z][u], [x, y, z][v], 1, 1)
            // 把 y 压扁：顶面放到 y + h，侧面的上边也压到 y + h
            for (let c = 0; c < 4; c++) if (corners[c * 3 + 1] > y * S) corners[c * 3 + 1] = Math.round((y + h) * S)
            out.quad(corners, face, FACE_TEXTURES[b * 6 + face], [3, 3, 3, 3], positive, false)
          }
        } else {
          const layer = FACE_TEXTURES[b * 6]
          const x0 = x * S
          const x1 = (x + 1) * S
          const z0 = z * S
          const z1 = (z + 1) * S
          const y0 = y * S
          const y1 = (y + 1) * S
          // (u-,v-) (u+,v-) (u-,v+) (u+,v+)：u 沿对角线，v 向上
          const a = [x0, y0, z0, x1, y0, z1, x0, y1, z0, x1, y1, z1]
          const c = [x0, y0, z1, x1, y0, z0, x0, y1, z1, x1, y1, z0]
          for (const [corners, face] of [
            [a, 6],
            [c, 7]
          ] as const) {
            out.quad([...corners], face, layer, [3, 3, 3, 3], true, false)
            out.quad([...corners], face, layer, [3, 3, 3, 3], false, false)
          }
        }
      }
}

/** 矩形的 4 个角（x,y,z ×4，已乘 POSITION_SCALE），顺序 (u-,v-) (u+,v-) (u-,v+) (u+,v+) */
function rectCorners(axis: number, u: number, v: number, positive: boolean, k: number, i: number, j: number, w: number, h: number): number[] {
  const S = POSITION_SCALE
  const corners: number[] = []
  for (let c = 0; c < 4; c++) {
    const pt = [0, 0, 0]
    pt[axis] = (k + (positive ? 1 : 0)) * S
    pt[u] = (i + (c & 1 ? w : 0)) * S
    pt[v] = (j + (c & 2 ? h : 0)) * S
    corners.push(pt[0], pt[1], pt[2])
  }
  return corners
}

/** 输出一个 w×h 的方块面矩形 */
function emit(out: Builder, key: number, face: number, axis: number, u: number, v: number, positive: boolean, k: number, i: number, j: number, w: number, h: number): void {
  const corners = rectCorners(axis, u, v, positive, k, i, j, w, h)
  const layer = key & 0xff
  const ao = [0, 1, 2, 3].map((c) => (key >> (8 + c * 2)) & 3)
  // 沿“两端更亮”的那条对角线切：单个暗角时，阴影只留在角落的那个三角形里，不会拉成一条斜线
  const flip = ao[0] + ao[3] > ao[1] + ao[2]
  out.quad(corners, face, layer, ao, positive, flip)
}

/**
 * 输出一个流体面。先当成完整方块的面算出 4 个角，再把“上边”的角按液面高度往下压：
 * 顶面 4 个角都压；侧面只压上边两个角；底面不动。
 * hs 是矩形第一个格子的 4 个角高度（NW, NE, SW, SE）；能合并的流体面都是平的，所以用哪一格的都一样。
 */
function emitFluid(
  opaque: Builder,
  water: Builder,
  blocks: Uint8Array,
  hs: Float32Array,
  face: number,
  axis: number,
  u: number,
  v: number,
  positive: boolean,
  k: number,
  i: number,
  j: number,
  w: number,
  h: number
): void {
  const S = POSITION_SCALE
  const p = [0, 0, 0]
  p[axis] = k
  p[u] = i
  p[v] = j
  const kind = FLUID_KIND[blocks[nIndex(p[0], p[1], p[2])]]
  const corners = rectCorners(axis, u, v, positive, k, i, j, w, h)
  if (face !== 2) {
    const top = Math.max(corners[1], corners[4], corners[7], corners[10])
    for (let c = 0; c < 4; c++) {
      if (corners[c * 3 + 1] !== top) continue
      const east = corners[c * 3] > p[0] * S ? 1 : 0
      const south = corners[c * 3 + 2] > p[2] * S ? 2 : 0
      corners[c * 3 + 1] -= Math.round((1 - hs[east + south]) * S)
    }
  }
  // 水半透明，单独一个网格；岩浆不透明，和方块放在一起
  const out = kind === FluidKind.water ? water : opaque
  out.quad(corners, face, FLUID_LAYER[kind], [3, 3, 3, 3], positive, false)
}

/**
 * 流体表面 4 个角的高度（NW, NE, SW, SE），移植自原版 LiquidBlockRenderer：
 *
 *   一格的液面高度：上面也是同种流体 → 1；否则 = 量 / 9（源是 8/9，流动的越远越低）
 *                   不是这种流体：空的 → 0，实心 → -1（不参与平均）
 *   一个角的高度 = 这一格、两个相邻格、对角那一格的加权平均，高度 ≥ 0.8 的权重是 10
 *   （所以挨着源的角基本和源一样高），相邻格上面有流体时这个角直接是 1
 */
export function fluidHeights(hood: Uint8Array, x: number, y: number, z: number, kind: number): [number, number, number, number] {
  const H = (x: number, y: number, z: number): number => {
    const b = hood[nIndex(x, y, z)]
    if (FLUID_KIND[b] === kind) return FLUID_KIND[hood[nIndex(x, y + 1, z)]] === kind ? 1 : FLUIDS[b].amount / 9
    return SOLID[b] ? -1 : 0
  }
  const f = H(x, y, z)
  if (f >= 1) return [1, 1, 1, 1]
  const north = H(x, y, z - 1)
  const south = H(x, y, z + 1)
  const east = H(x + 1, y, z)
  const west = H(x - 1, y, z)
  const avg = (g: number, h: number, dx: number, dz: number): number => {
    if (h >= 1 || g >= 1) return 1
    let sum = 0
    let weight = 0
    const add = (v: number) => {
      if (v >= 0.8) {
        sum += v * 10
        weight += 10
      } else if (v >= 0) {
        sum += v
        weight += 1
      }
    }
    if (h > 0 || g > 0) {
      const d = H(x + dx, y, z + dz)
      if (d >= 1) return 1
      add(d)
    }
    add(f)
    add(h)
    add(g)
    return sum / weight
  }
  return [avg(north, west, -1, -1), avg(north, east, 1, -1), avg(south, west, -1, 1), avg(south, east, 1, 1)]
}
