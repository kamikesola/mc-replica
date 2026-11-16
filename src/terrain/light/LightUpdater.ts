import { columnSource, LIGHT_BLOCK, LIGHT_EMISSION, OCCLUDE_DOWN } from './LightEngine'

/**
 * 挖 / 放方块后的光照增量更新（v6，主线程）。
 *
 * 区块第一次点亮是在 Worker 里整块算的（LightEngine.lightChunk）；之后改一个方块，不值得把 3×3 个区块重算一遍，
 * 只更新受影响的那一小片——原版 LightEngine 也是这么做的，分两步：
 *
 *   1. 熄灭（propagateDecrease）：从改动的那一格出发，把“可能是从这里照过去的”亮度清零。
 *      邻居比自己暗 → 它的光可能来自这里，清零并继续往外；邻居不比自己暗 → 它有别的光源，留着，等第 2 步从它重新照回来
 *   2. 点亮（propagateIncrease）：从光源、以及第 1 步留下的边界重新扩散，和整块计算时的规则一样
 *
 * 天空光还要看光源有没有变：在露天的地方放一个方块，它下面整列原来的 15 都不再是光源（先熄灭再从旁边照进来）；
 * 挖掉顶上的方块，下面一段变成新的光源（直接设成 15 再扩散）。
 */

export interface LightWorld {
  minY: number
  maxY: number
  hasSky: boolean
  block(x: number, y: number, z: number): number
  /** 打包的亮度（低 4 位天空、高 4 位方块）；区块没点亮、或者超出世界高度时返回 -1（不能读写） */
  get(x: number, y: number, z: number): number
  set(x: number, y: number, z: number, packed: number): void
}

const DIRS = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 0, 1],
  [0, 0, -1],
  [0, 1, 0],
  [0, -1, 0]
] as const

/**
 * 方块 (x, y, z) 从 oldBlock 变成了 newBlock（已经写进世界）之后，更新两种光。
 * 光照属性没变（比如石头换成泥土）时什么都不做。
 */
export function updateLight(w: LightWorld, x: number, y: number, z: number, oldBlock: number, newBlock: number): void {
  if (LIGHT_BLOCK[oldBlock] === LIGHT_BLOCK[newBlock] && LIGHT_EMISSION[oldBlock] === LIGHT_EMISSION[newBlock] && OCCLUDE_DOWN[oldBlock] === OCCLUDE_DOWN[newBlock]) return
  if (w.get(x, y, z) < 0) return
  channel(w, x, y, z, oldBlock, false)
  if (w.hasSky) channel(w, x, y, z, oldBlock, true)
}

function channel(w: LightWorld, x: number, y: number, z: number, oldBlock: number, sky: boolean): void {
  const shift = sky ? 0 : 4
  const get = (x: number, y: number, z: number) => {
    const p = w.get(x, y, z)
    return p < 0 ? -1 : (p >> shift) & 15
  }
  const set = (x: number, y: number, z: number, v: number) => {
    const p = w.get(x, y, z)
    if (p < 0) return
    w.set(x, y, z, sky ? (p & 0xf0) | v : (p & 15) | (v << 4))
  }
  const H = w.maxY - w.minY
  // 天空光源：每列算一次（只有改动的那一列会变，其他列缓存）
  const sources = new Map<string, number>()
  const source = (x: number, z: number, override?: number) => {
    const k = `${x},${z}`
    let s = override === undefined ? sources.get(k) : undefined
    if (s === undefined) {
      const col = new Uint8Array(H)
      for (let i = 0; i < H; i++) col[i] = w.minY + i === y && x === x0 && z === z0 && override !== undefined ? override : w.block(x, w.minY + i, z)
      s = w.minY + columnSource(col, (i) => i, H)
      if (override === undefined) sources.set(k, s)
    }
    return s
  }
  const x0 = x
  const z0 = z
  const isSource = (x: number, y: number, z: number) => (sky ? y >= source(x, z) : LIGHT_EMISSION[w.block(x, y, z)] > 0)
  const sourceLevel = (x: number, y: number, z: number) => (sky ? 15 : LIGHT_EMISSION[w.block(x, y, z)])

  const dec: number[] = [] // x, y, z, 原来的亮度
  const inc: number[] = [] // x, y, z

  if (sky) {
    const oldSrc = source(x, z, oldBlock)
    const newSrc = source(x, z)
    // 不再是光源的一段：熄灭；新的光源：设成 15
    for (let yy = oldSrc; yy < newSrc; yy++) {
      const l = get(x, yy, z)
      if (l > 0) {
        set(x, yy, z, 0)
        dec.push(x, yy, z, l)
      }
    }
    for (let yy = newSrc; yy < oldSrc; yy++) {
      set(x, yy, z, 15)
      inc.push(x, yy, z)
    }
  }
  // 改动的这一格自己：先熄灭（新方块可能挡光），是光源就重新设成光源亮度
  const here = get(x, y, z)
  if (!(sky && y >= source(x, z)) && here > 0) {
    set(x, y, z, 0)
    dec.push(x, y, z, here)
  }
  if (!sky && LIGHT_EMISSION[w.block(x, y, z)] > 0) {
    set(x, y, z, LIGHT_EMISSION[w.block(x, y, z)])
    inc.push(x, y, z)
  }

  // ---- 1. 熄灭
  for (let k = 0; k < dec.length; k += 4) {
    const qx = dec[k]
    const qy = dec[k + 1]
    const qz = dec[k + 2]
    const ql = dec[k + 3]
    for (const [dx, dy, dz] of DIRS) {
      const nx = qx + dx
      const ny = qy + dy
      const nz = qz + dz
      const nl = get(nx, ny, nz)
      if (nl <= 0) continue
      if (isSource(nx, ny, nz) && nl === sourceLevel(nx, ny, nz)) {
        inc.push(nx, ny, nz) // 光源：不熄灭，等会儿从它重新照
        continue
      }
      if (nl < ql) {
        set(nx, ny, nz, 0)
        dec.push(nx, ny, nz, nl)
        // 被清零的格子如果自己发光，恢复成发光亮度
        if (!sky && LIGHT_EMISSION[w.block(nx, ny, nz)] > 0) {
          set(nx, ny, nz, LIGHT_EMISSION[w.block(nx, ny, nz)])
          inc.push(nx, ny, nz)
        }
      } else inc.push(nx, ny, nz)
    }
  }
  // 改动的这一格变透明了：让周围的光照进来
  for (const [dx, dy, dz] of DIRS) if (get(x + dx, y + dy, z + dz) > 0) inc.push(x + dx, y + dy, z + dz)

  // ---- 2. 点亮
  for (let k = 0; k < inc.length; k += 3) {
    const qx = inc[k]
    const qy = inc[k + 1]
    const qz = inc[k + 2]
    const ql = get(qx, qy, qz)
    if (ql <= 1) continue
    const qb = w.block(qx, qy, qz)
    for (const [dx, dy, dz] of DIRS) {
      const nx = qx + dx
      const ny = qy + dy
      const nz = qz + dz
      const nl = get(nx, ny, nz)
      if (nl < 0 || ql - 1 <= nl) continue
      const nb = w.block(nx, ny, nz)
      // 底面挡光的方块（雪层）：光不能从它往下走，也不能从下面走进它
      if ((dy === -1 && OCCLUDE_DOWN[qb]) || (dy === 1 && OCCLUDE_DOWN[nb])) continue
      const v = ql - Math.max(1, LIGHT_BLOCK[nb])
      if (v > nl) {
        set(nx, ny, nz, v)
        inc.push(nx, ny, nz)
      }
    }
  }
}
