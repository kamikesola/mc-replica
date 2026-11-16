import { NAME_BY_BLOCK } from '../blocks'
import PROPS from './lightProps.json'

/**
 * 光照引擎（v6）：天空光和方块光，移植自原版 1.21.4 的 SkyLightEngine / BlockLightEngine。
 *
 * 每个方块有两个光照属性（从原版 jar 导出，见 tools/vanilla/gen-light.py）：
 *   lightBlock     光穿过它要减多少：完全不透明的方块 15；水、树叶、冰 1；空气、花草 0
 *   lightEmission  自己发多亮的光：岩浆、萤石 15；发光地衣 7；岩浆块 3
 *
 * 光从亮处往 6 个方向扩散，每走一格：新亮度 = 亮度 − max(1, 目标方块的 lightBlock)。
 * 一格的最终亮度 = 所有光源沿所有路径传过来的最大值（这是一个“不动点”，和计算顺序无关——
 * 所以虽然原版是多线程、边加载边算的，我们也能逐格对上）。
 *
 * 光源：
 *   方块光  发光方块自己那一格 = lightEmission
 *   天空光  每一列从世界顶往下，第一个 lightBlock ≠ 0 的方块之上全是 15（原版 ChunkSkyLightSources）。
 *           注意水面：水的 lightBlock 是 1，所以最上面一格水是 14，往下每格再减 1
 *
 * 形状遮挡：原版有几种不完整的方块按形状挡光（useShapeForLightOcclusion）。我们用到的只有底面是完整的一种情况——
 * 雪层、下半台阶、幽匿感测体 / 尖啸体：光不能从它往下走，也不能从下面走进它（树叶上的雪层下面会暗 1 级）；
 * 天空光的光源也停在它这一格。侧面只有一部分，挡不住；顶面是空的。
 *
 * 实现：按亮度分桶的广度优先（先处理 15 的，再 14 的……）。代价都是正整数，所以一格第一次被取出来时亮度就是最终值，
 * 每格最多展开一次。
 */

/** 方块 ID → lightBlock / lightEmission。原版名不在表里的（不应该有）按“不透明、不发光”算 */
export const LIGHT_BLOCK = new Uint8Array(256).fill(15)
export const LIGHT_EMISSION = new Uint8Array(256)
for (let b = 0; b < 256; b++) {
  const p = (PROPS as Record<string, number[]>)[NAME_BY_BLOCK[b] ?? '']
  if (!p) continue
  LIGHT_BLOCK[b] = p[0]
  LIGHT_EMISSION[b] = p[1]
}

/** 底面完整、按形状挡光的方块（原版 useShapeForLightOcclusion，见上） */
export const OCCLUDE_DOWN = new Uint8Array(256)
for (let b = 0; b < 256; b++) if (/^minecraft:(snow|sandstone_slab|sculk_sensor|sculk_shrieker)$/.test(NAME_BY_BLOCK[b] ?? '')) OCCLUDE_DOWN[b] = 1

/**
 * 一个区域的光照。
 * @param grid  方块，下标 (y * D + z) * W + x，宽 W、深 D、高 H
 * @param sky   是否有天空光（原版 dimension_type 的 has_skylight：主世界有，下界和末地没有）
 * @returns     每格一个字节：低 4 位天空光，高 4 位方块光
 */
export function lightRegion(grid: Uint8Array, W: number, D: number, H: number, sky: boolean, lb = LIGHT_BLOCK, em = LIGHT_EMISSION, occ = OCCLUDE_DOWN): Uint8Array {
  const out = new Uint8Array(grid.length)
  const level = new Uint8Array(grid.length)
  const buckets = new Buckets()

  // ---- 方块光：发光方块是光源
  for (let i = 0; i < grid.length; i++) {
    const e = em[grid[i]]
    if (e > 0) {
      level[i] = e
      buckets.push(e, i)
    }
  }
  spread(grid, level, buckets, W, D, H, lb, occ)
  for (let i = 0; i < grid.length; i++) out[i] = level[i] << 4

  if (!sky) return out

  // ---- 天空光：每列的光源下界（这一格和它上面都是 15）
  level.fill(0)
  const src = skySources(grid, W, D, H, lb, occ)
  for (let z = 0; z < D; z++)
    for (let x = 0; x < W; x++) {
      const s = src[z * W + x]
      for (let y = s; y < H; y++) level[(y * D + z) * W + x] = 15
    }
  // 只有挨着“不是 15”的格子的光源格才需要往外扩：每列最下面那一格（往下），以及比旁边那一列的光源高出来的部分（往旁边）
  for (let z = 0; z < D; z++)
    for (let x = 0; x < W; x++) {
      const s = src[z * W + x]
      let top = s
      if (x > 0) top = Math.max(top, src[z * W + x - 1])
      if (x < W - 1) top = Math.max(top, src[z * W + x + 1])
      if (z > 0) top = Math.max(top, src[(z - 1) * W + x])
      if (z < D - 1) top = Math.max(top, src[(z + 1) * W + x])
      for (let y = s; y < Math.min(top, H); y++) buckets.push(15, (y * D + z) * W + x)
      if (s > 0 && s === top && s < H) buckets.push(15, (s * D + z) * W + x)
    }
  spread(grid, level, buckets, W, D, H, lb, occ)
  for (let i = 0; i < grid.length; i++) out[i] |= level[i]
  return out
}

/**
 * 每一列的天空光源下界：从上往下第一个 lightBlock ≠ 0 的方块的上面一格；整列都透明则是 0。
 * 底面挡光的方块（雪层）：光源停在它这一格
 */
export function skySources(grid: Uint8Array, W: number, D: number, H: number, lb = LIGHT_BLOCK, occ = OCCLUDE_DOWN): Int16Array {
  const src = new Int16Array(W * D)
  for (let z = 0; z < D; z++)
    for (let x = 0; x < W; x++) src[z * W + x] = columnSource(grid, (y) => (y * D + z) * W + x, H, lb, occ)
  return src
}

/** 一列的天空光源下界（at(y) 给出这一列第 y 格的下标） */
export function columnSource(grid: Uint8Array, at: (y: number) => number, H: number, lb = LIGHT_BLOCK, occ = OCCLUDE_DOWN): number {
  let y = H - 1
  while (y >= 0 && lb[grid[at(y)]] === 0 && (y === H - 1 || !occ[grid[at(y + 1)]])) y--
  return y + 1
}

/** 按亮度从高到低扩散（原版 LightEngine.propagateIncrease） */
function spread(grid: Uint8Array, level: Uint8Array, buckets: Buckets, W: number, D: number, H: number, lb: Uint8Array, occ: Uint8Array): void {
  const plane = W * D
  for (let l = 15; l >= 2; l--) {
    const q = buckets.take(l)
    for (let k = 0; k < q.length; k++) {
      const i = q[k]
      if (level[i] !== l) continue // 后来又被更亮的光照到了，这条作废
      const x = i % W
      const z = Math.floor(i / W) % D
      const y = Math.floor(i / plane)
      if (x > 0) relax(i - 1)
      if (x < W - 1) relax(i + 1)
      if (z > 0) relax(i - W)
      if (z < D - 1) relax(i + W)
      if (y > 0 && !occ[grid[i]]) relax(i - plane) // 往下：从底面挡光的方块出不去
      if (y < H - 1 && !occ[grid[i + plane]]) relax(i + plane) // 往上：进不了底面挡光的方块
    }
    function relax(n: number) {
      if (l - 1 <= level[n]) return
      const nl = l - Math.max(1, lb[grid[n]])
      if (nl > level[n]) {
        level[n] = nl
        if (nl > 1) buckets.push(nl, n) // 1 再往外就是 0，不用再扩
      }
    }
  }
}

/** 16 个桶，每个是一段可增长的 Int32Array */
class Buckets {
  private data: Int32Array[] = Array.from({ length: 16 }, () => new Int32Array(1024))
  private len = new Int32Array(16)
  push(l: number, i: number): void {
    let a = this.data[l]
    if (this.len[l] === a.length) {
      const b = new Int32Array(a.length * 2)
      b.set(a)
      this.data[l] = a = b
    }
    a[this.len[l]++] = i
  }
  /** 取出一个桶（处理期间新进来的同级元素也会被取到：桶在处理时只会收到更低的级别） */
  take(l: number): Int32Array {
    const a = this.data[l].subarray(0, this.len[l])
    this.len[l] = 0
    return a
  }
}

/** 区块光照的布局：16×16 加四周各 1 格（网格生成要用到邻居的亮度），下标 ((y * 18) + z + 1) * 18 + x + 1 */
export const LP = 18

/**
 * 一个区块的光照：输入周围 3×3 个区块的最终方块（下标 (y * 16 + z) * 16 + x，顺序先 z 后 x），
 * 输出中心区块加四周一圈（18×18 列）的光照。
 * 光最多传 15 格，3×3 足够让中心区块和它外面的一圈都是精确值。
 */
export function lightChunk(chunks: Uint8Array[], H: number, sky: boolean, lb = LIGHT_BLOCK, em = LIGHT_EMISSION, occ = OCCLUDE_DOWN): Uint8Array {
  const W = 48
  const grid = new Uint8Array(W * W * H)
  for (let dz = 0; dz < 3; dz++)
    for (let dx = 0; dx < 3; dx++) {
      const c = chunks[dz * 3 + dx]
      for (let y = 0; y < H; y++)
        for (let z = 0; z < 16; z++) grid.set(c.subarray((y * 16 + z) * 16, (y * 16 + z) * 16 + 16), (y * W + dz * 16 + z) * W + dx * 16)
    }
  const all = lightRegion(grid, W, W, H, sky, lb, em, occ)
  const out = new Uint8Array(LP * LP * H)
  for (let y = 0; y < H; y++)
    for (let z = 0; z < LP; z++) out.set(all.subarray((y * W + 15 + z) * W + 15, (y * W + 15 + z) * W + 15 + LP), (y * LP + z) * LP)
  return out
}

/**
 * 网格生成要的 18³ 光照邻域（下标同 mesher 的 nIndex）：从区块的 18×18 列光照里取第 sy 个 section 和上下各一层。
 * 世界底下当成全黑，世界顶上面是露天（有天空光的维度是 15）
 */
export function fillLightHood(light: Uint8Array, H: number, sy: number, sky: boolean, out: Uint8Array): void {
  const N = 18
  for (let ly = -1; ly <= 16; ly++) {
    const y = sy * 16 + ly
    const dst = (ly + 1) * N * N
    if (y < 0) out.fill(0, dst, dst + N * N)
    else if (y >= H) out.fill(sky ? 15 : 0, dst, dst + N * N)
    else out.set(light.subarray(y * LP * LP, (y + 1) * LP * LP), dst)
  }
}
