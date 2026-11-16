import { BlockType, FACE_TEXTURES, FLUID_KIND, FLUIDS, FluidKind, SHAPE, SHAPE_HEIGHT, SOLID } from '../blocks'
import { LIGHT_BLOCK, LIGHT_EMISSION } from '../light/LightEngine'
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
 * 光照（v6）：每个顶点还带天空光、方块光两个亮度，着色器用它们查“光照贴图”（见 materials.ts）。
 * 完整方块的面用原版的“平滑光照”（ModelBlockRenderer.AmbientOcclusionFace）：
 *   面前面那一格叫“中心”，一个角的亮度 = 中心、角旁边的两格、斜对角那一格，四格亮度的平均
 *   （不透明方块里亮度是 0，原版把亮度为 0 的格子换成中心的值；两边都不透明时，斜对角那格用第一边的值代替）。
 * 顶点里存的是 4 格之和（0..60），和原版一样保留 1/4 级的精度。
 * 合并面的条件多了一条：四个角的亮度也要一样（和 AO 的规则相同，只沿一个方向变化时可以顺着那个方向合并）。
 * 发光的方块（萤石、岩浆块……）、十字形植物、流体不用平滑光照：整个面取一格的亮度（原版的 flat 光照）。
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
 *   info       Uint8  ×4   [面的方向 0..7, 纹理层号, AO 等级 0..3（+4：不按方向变暗）, 染色种类（v4：0 无 / 1 草 / 2 树叶 / 3 水）]
 *   light      Uint8  ×2   [天空光, 方块光]，各是 4 格亮度之和 0..60（v6）
 * 纹理坐标、明暗都在着色器里根据这几项算出来（见 materials.ts）。
 * v0 每个顶点是 6 个 float（位置 + 颜色）= 24 字节；现在 12 字节。
 */
export interface SectionMesh {
  positions: Uint16Array
  info: Uint8Array
  light: Uint8Array
  indices: Uint16Array
}

/** info 的 AO 字节里的标记：这个面不按朝向变暗（原版模型里 "shade": false 的面，比如十字形植物、藤蔓） */
export const NO_SHADE = 4

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
  lig = new Uint8Array(4096 * 2)
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
    this.lig = g(this.lig, this.lig.length * 2)
    this.ind = g(this.ind, this.ind.length * 2)
  }

  /**
   * corners: 4 个角（x,y,z ×4），顺序 (u-,v-) (u+,v-) (u-,v+) (u+,v+)
   * light: 4 个角的 [天空光和, 方块光和] ×4（v6）；flags：NO_SHADE
   */
  quad(corners: number[], face: number, layer: number, ao: number[], positive: boolean, flip: boolean, light: ArrayLike<number>, flags = 0): void {
    if ((this.vertices + 4) * 4 > this.inf.length || this.indexCount + 6 > this.ind.length) this.grow()
    const n = this.vertices
    for (let i = 0; i < 4; i++) {
      this.pos.set([corners[i * 3], corners[i * 3 + 1], corners[i * 3 + 2]], (n + i) * 3)
      this.inf.set([face, layer, ao[i] | flags, TINT_BY_LAYER[layer]], (n + i) * 4)
      this.lig[(n + i) * 2] = light[i * 2]
      this.lig[(n + i) * 2 + 1] = light[i * 2 + 1]
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
      light: this.lig.slice(0, this.vertices * 2),
      indices: this.ind.slice(0, this.indexCount)
    }
  }
}

export interface MeshOptions {
  /** false：不合并，每个面单独一个四边形（v0 的做法，F3 里按 G 可以切换对比） */
  greedy?: boolean
  /**
   * 18³ 邻域的光照（v6，下标同 nIndex），每格低 4 位天空光、高 4 位方块光。
   * 不给就当成白天的露天（天空光 15）
   */
  light?: Uint8Array
}

/** 原版 emissiveRendering 的方块：画的时候按最亮算（岩浆块） */
const EMISSIVE = new Uint8Array(256)
EMISSIVE[BlockType.magma_block] = 1

/**
 * 原版 LevelRenderer.getLightColor：一格“看起来”的亮度，打包成 天空光 | 方块光 << 4。
 * 方块光取存的亮度和方块自己发光的较大值；emissiveRendering 的方块直接最亮
 */
function lightColor(blocks: Uint8Array, light: Uint8Array | undefined, i: number): number {
  const b = blocks[i]
  if (EMISSIVE[b]) return 0xff
  const l = light ? light[i] : 15
  const em = LIGHT_EMISSION[b]
  return (l >> 4) >= em ? l : (l & 15) | (em << 4)
}

/**
 * @param blocks 18³ 的邻域，下标见 nIndex()；section 外面的那一圈只用来判断遮挡和 AO
 */
export function meshSection(blocks: Uint8Array, opts: MeshOptions = {}): { opaque: SectionMesh; water: SectionMesh } {
  const greedy = opts.greedy ?? true
  const light = opts.light
  const opaque = new Builder()
  const water = new Builder()
  const maskO = new Int32Array(256)
  /** 方块面 4 个角的亮度（v6）：key 用来比较能不能合并，cornerL 存每格 4 个角的 [天空和, 方块和] */
  const maskL = new Float64Array(256)
  const cornerL = new Uint8Array(256 * 8)
  /** 流体面的 mask：key 编码了流体种类和 4 个角的高度（数字可能超过 32 位，用 Float64） */
  const maskF = new Float64Array(256)
  /** 每个格子 4 个角的高度（NW, NE, SW, SE），输出时用 */
  const heightsF = new Float32Array(256 * 4)
  /** 流体面的亮度（v6） */
  const fluidL = new Uint8Array(256)
  const hood = blocks
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
            const qi = nIndex(q[0], q[1], q[2])
            const center = lightColor(blocks, light, qi)
            // 发光的方块不用平滑光照和 AO（原版：lightEmission ≠ 0 时走 flat），整个面取中心那一格的亮度
            const flat = LIGHT_EMISSION[b] > 0 || EMISSIVE[b] === 1
            let packed = 0
            let lkey = 0
            for (let c = 0; c < 4; c++) {
              const du = c & 1 ? 1 : -1
              const dv = c & 2 ? 1 : -1
              const i1 = nIndex(q[0] + (u === 0 ? du : 0), q[1] + (u === 1 ? du : 0), q[2] + (u === 2 ? du : 0))
              const i2 = nIndex(q[0] + (v === 0 ? dv : 0), q[1] + (v === 1 ? dv : 0), q[2] + (v === 2 ? dv : 0))
              const ic = nIndex(
                q[0] + (u === 0 ? du : 0) + (v === 0 ? dv : 0),
                q[1] + (u === 1 ? du : 0) + (v === 1 ? dv : 0),
                q[2] + (u === 2 ? du : 0) + (v === 2 ? dv : 0)
              )
              const s1 = SOLID[blocks[i1]]
              const s2 = SOLID[blocks[i2]]
              const cc = SOLID[blocks[ic]]
              const ao = flat ? 3 : s1 && s2 ? 0 : 3 - (s1 + s2 + cc)
              packed |= ao << (c * 2)
              // 平滑光照：四格亮度相加（亮度为 0 的换成中心的）；两边都挡光时斜对角用第一边的
              let sky: number
              let blk: number
              if (flat) {
                // 原版取的是“这个方块自己的”发光值和面前那一格的方块光的较大值，所以萤石的面总是最亮
                sky = EMISSIVE[b] ? 60 : (center & 15) * 4
                blk = Math.max(center >> 4, LIGHT_EMISSION[b], EMISSIVE[b] ? 15 : 0) * 4
              } else {
                const open1 = !s1 || LIGHT_BLOCK[blocks[i1]] === 0
                const open2 = !s2 || LIGHT_BLOCK[blocks[i2]] === 0
                const l1 = lightColor(blocks, light, i1) || center
                const l2 = lightColor(blocks, light, i2) || center
                const lc = (open1 || open2 ? lightColor(blocks, light, ic) : lightColor(blocks, light, i1)) || center
                sky = (l1 & 15) + (l2 & 15) + (lc & 15) + (center & 15)
                blk = (l1 >> 4) + (l2 >> 4) + (lc >> 4) + (center >> 4)
              }
              cornerL[m * 8 + c * 2] = sky
              cornerL[m * 8 + c * 2 + 1] = blk
              lkey = lkey * 4096 + sky * 64 + blk
            }
            const a0 = packed & 3
            const a1 = (packed >> 2) & 3
            const a2 = (packed >> 4) & 3
            const a3 = (packed >> 6) & 3
            const L = (c: number) => cornerL[m * 8 + c * 2] * 64 + cornerL[m * 8 + c * 2 + 1]
            const flags =
              (a0 === a1 && a2 === a3 && L(0) === L(1) && L(2) === L(3) ? MERGE_U : 0) | (a0 === a2 && a1 === a3 && L(0) === L(2) && L(1) === L(3) ? MERGE_V : 0)
            maskO[m] = FACE_TEXTURES[b * 6 + face] | (packed << 8) | flags
            maskL[m] = lkey
            any = true
          } else if (FLUID_KIND[b] !== FluidKind.none) {
            // 流体：挨着同一种流体不画；侧面和底面挨着实心方块也不画；顶面只要上面不是同种流体就画
            const kind = FLUID_KIND[b]
            if (FLUID_KIND[nb] === kind) continue
            if (face !== 3 && SOLID[nb]) continue
            const hs = fluidHeights(hood, p[0], p[1], p[2], kind)
            heightsF.set(hs, m * 4)
            // 流体的亮度：这一格和上面一格，天空光、方块光各取较大的（原版 LiquidBlockRenderer.getLightColor）
            const here = lightColor(blocks, light, nIndex(p[0], p[1], p[2]))
            const above = lightColor(blocks, light, nIndex(p[0], p[1] + 1, p[2]))
            const fl = Math.max(here & 15, above & 15) | (Math.max(here >> 4, above >> 4) << 4)
            fluidL[m] = fl
            // 哪几个角决定这个面的形状：顶面 4 个角；侧面是靠这一侧的 2 个角；底面是平的
            const edge = face === 3 ? hs : face === 2 ? null : face === 0 ? [hs[0], hs[2]] : face === 1 ? [hs[1], hs[3]] : face === 4 ? [hs[0], hs[1]] : [hs[2], hs[3]]
            const flat = !edge || edge.every((h) => h === edge[0])
            let key = kind * 256 + fl
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
            const lk = isFluid ? 0 : maskL[j * 16 + i]
            const same = (c: number) => mask[c] === key && (isFluid || maskL[c] === lk)
            if (mergeU) while (i + w < 16 && same(j * 16 + i + w)) w++
            if (mergeV) {
              grow: while (j + h < 16) {
                for (let t = 0; t < w; t++) if (!same((j + h) * 16 + i + t)) break grow
                h++
              }
            }
            const c0 = j * 16 + i
            if (isFluid) emitFluid(opaque, water, blocks, heightsF.subarray(c0 * 4, c0 * 4 + 4), face, axis, u, v, positive, k, i, j, w, h, fluidL[c0])
            else emit(opaque, key, face, axis, u, v, positive, k, i, j, w, h, cornerL.subarray(c0 * 8, c0 * 8 + 8))
            for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) mask[(j + y) * 16 + i + x] = 0
            i += w
          }
        }
      }
    }
  }
  shapedBlocks(opaque, blocks, light)
  return { opaque: opaque.build(), water: water.build() }
}

/**
 * 不是完整方块的方块（v5）：逐个输出，不参与贪婪合并。
 *   slab（雪层、地毯）：一个扁盒子，顶面总是画，其他面看邻居是不是实心
 *   cross（垂须、花草……）：两片对角线方向的面，正反两面都画（face 6、7，着色器里按对角线算纹理坐标）
 *   multiface（藤蔓、发光地衣、幽匿脉络，v5.1）：贴着每个实心邻居的那一面画一片（离开 1/64 格，正反两面）；
 *     原版这些方块记着“贴在哪几面”，我们的方块没有状态，就按“哪几面挨着实心方块”画。一面都没有时画成十字
 */
function shapedBlocks(out: Builder, blocks: Uint8Array, light: Uint8Array | undefined): void {
  const S = POSITION_SCALE
  /** 整个面一个亮度（flat 光照），4 个角都一样 */
  const flatL = (i: number) => {
    const l = lightColor(blocks, light, i)
    const sky = (l & 15) * 4
    const blk = (l >> 4) * 4
    return [sky, blk, sky, blk, sky, blk, sky, blk]
  }
  for (let y = 0; y < 16; y++)
    for (let z = 0; z < 16; z++)
      for (let x = 0; x < 16; x++) {
        const b = blocks[nIndex(x, y, z)]
        const shape = SHAPE[b]
        if (shape === 0 || shape === 4) continue // 4：none（气泡柱，只画水）
        const own = flatL(nIndex(x, y, z))
        if (shape === 1) {
          const h = SHAPE_HEIGHT[b] / 16
          for (let face = 0; face < 6; face++) {
            const n = FACE_DIRS[face]
            const ni = nIndex(x + n[0], y + n[1], z + n[2])
            if (face !== 3 && SOLID[blocks[ni]]) continue
            const axis = face >> 1
            const u = (axis + 1) % 3
            const v = (axis + 2) % 3
            const positive = (face & 1) === 1
            const corners = rectCorners(axis, u, v, positive, [x, y, z][axis], [x, y, z][u], [x, y, z][v], 1, 1)
            // 把 y 压扁：顶面放到 y + h，侧面的上边也压到 y + h
            for (let c = 0; c < 4; c++) if (corners[c * 3 + 1] > y * S) corners[c * 3 + 1] = Math.round((y + h) * S)
            // 顶面在格子里面，取自己这一格的亮度；其他面贴着格子边，取外面那一格的
            out.quad(corners, face, FACE_TEXTURES[b * 6 + face], [3, 3, 3, 3], positive, false, face === 3 ? own : flatL(ni))
          }
        } else if (shape === 3 && multiface(out, blocks, b, x, y, z, own)) {
          continue
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
            out.quad([...corners], face, layer, [3, 3, 3, 3], true, false, own, NO_SHADE)
            out.quad([...corners], face, layer, [3, 3, 3, 3], false, false, own, NO_SHADE)
          }
        }
      }
}

/** 多面方块：每个实心邻居那一面画一片；一片都没画返回 false */
function multiface(out: Builder, blocks: Uint8Array, b: number, x: number, y: number, z: number, own: number[]): boolean {
  const eps = POSITION_SCALE / 64
  let any = false
  for (let face = 0; face < 6; face++) {
    const n = FACE_DIRS[face]
    if (!SOLID[blocks[nIndex(x + n[0], y + n[1], z + n[2])]]) continue
    const axis = face >> 1
    const u = (axis + 1) % 3
    const v = (axis + 2) % 3
    const positive = (face & 1) === 1
    const corners = rectCorners(axis, u, v, positive, [x, y, z][axis], [x, y, z][u], [x, y, z][v], 1, 1)
    for (let c = 0; c < 4; c++) corners[c * 3 + axis] += positive ? -eps : eps
    const layer = FACE_TEXTURES[b * 6 + face]
    out.quad([...corners], face, layer, [3, 3, 3, 3], true, false, own, NO_SHADE)
    out.quad([...corners], face, layer, [3, 3, 3, 3], false, false, own, NO_SHADE)
    any = true
  }
  return any
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
function emit(out: Builder, key: number, face: number, axis: number, u: number, v: number, positive: boolean, k: number, i: number, j: number, w: number, h: number, light: Uint8Array): void {
  const corners = rectCorners(axis, u, v, positive, k, i, j, w, h)
  const layer = key & 0xff
  const ao = [0, 1, 2, 3].map((c) => (key >> (8 + c * 2)) & 3)
  // 沿“两端更亮”的那条对角线切：单个暗角时，阴影只留在角落的那个三角形里，不会拉成一条斜线（亮度也算进去）
  const b = (c: number) => ao[c] * 64 + light[c * 2] + light[c * 2 + 1]
  const flip = b(0) + b(3) > b(1) + b(2)
  out.quad(corners, face, layer, ao, positive, flip, light)
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
  h: number,
  fl: number
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
  const sky = (fl & 15) * 4
  const blk = (fl >> 4) * 4
  out.quad(corners, face, FLUID_LAYER[kind], [3, 3, 3, 3], positive, false, [sky, blk, sky, blk, sky, blk, sky, blk])
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
