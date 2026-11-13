/**
 * 碰撞（AABB = 轴对齐包围盒）。v2 按原版 Entity.collide 的做法重写。
 *
 * v0 的做法是“先移动，撞了再退回来”。原版的做法是“先算能走多远，再移动”：
 *
 *   1. 把这一 tick 要走的范围内所有方块的碰撞箱收集起来
 *   2. 一个轴一个轴地“裁剪”位移：沿 y 走 d 格，途中最先碰到的方块挡在哪，d 就缩到哪
 *   3. 轴的顺序：先 y；再看 x、z 哪个位移小，小的先走（原版 Shapes.collide 的顺序）
 *
 * 每个 tick 最多走零点几格，不会穿墙，所以不需要 v0 那样拆小步。
 *
 * 另外两件原版的事也在这里：
 *   抬步（step up）：在地上横着撞到矮于 0.6 格的东西（台阶、半砖），自动走上去
 *   潜行防掉落：潜行时，如果再往前走脚下会悬空超过 0.6 格，就把这一步缩短
 */

export interface Vec3 {
  x: number
  y: number
  z: number
}

/** 轴对齐包围盒。所有方法都返回新的盒子，不修改自己 */
export class AABB {
  constructor(
    public minX: number,
    public minY: number,
    public minZ: number,
    public maxX: number,
    public maxY: number,
    public maxZ: number
  ) {}

  /** 以脚底中心为原点的身体碰撞箱 */
  static body(pos: Vec3, width: number, height: number): AABB {
    const h = width / 2
    return new AABB(pos.x - h, pos.y, pos.z - h, pos.x + h, pos.y + height, pos.z + h)
  }

  move(x: number, y: number, z: number): AABB {
    return new AABB(this.minX + x, this.minY + y, this.minZ + z, this.maxX + x, this.maxY + y, this.maxZ + z)
  }

  /** 朝位移方向扩大（用来收集“这一步可能碰到”的方块） */
  expandTowards(x: number, y: number, z: number): AABB {
    return new AABB(
      x < 0 ? this.minX + x : this.minX,
      y < 0 ? this.minY + y : this.minY,
      z < 0 ? this.minZ + z : this.minZ,
      x > 0 ? this.maxX + x : this.maxX,
      y > 0 ? this.maxY + y : this.maxY,
      z > 0 ? this.maxZ + z : this.maxZ
    )
  }

  /** 各边往里缩 d */
  deflate(d: number): AABB {
    return new AABB(this.minX + d, this.minY + d, this.minZ + d, this.maxX - d, this.maxY - d, this.maxZ - d)
  }

  intersects(o: AABB): boolean {
    return this.minX < o.maxX && this.maxX > o.minX && this.minY < o.maxY && this.maxY > o.minY && this.minZ < o.maxZ && this.maxZ > o.minZ
  }

  min(axis: 0 | 1 | 2): number {
    return axis === 0 ? this.minX : axis === 1 ? this.minY : this.minZ
  }

  max(axis: 0 | 1 | 2): number {
    return axis === 0 ? this.maxX : axis === 1 ? this.maxY : this.maxZ
  }
}

/** 原版用的容差：小于它的位移当作 0 */
export const EPS = 1e-7

/**
 * 一个方块的碰撞形状（相对方块原点，0..1）。普通方块是一个完整的立方体，空气是空数组。
 * 以后台阶、半砖、栅栏就是返回不同的盒子（v7）。
 */
export type ShapeFn = (x: number, y: number, z: number) => readonly AABB[]

export const FULL_CUBE: readonly AABB[] = [new AABB(0, 0, 0, 1, 1, 1)]
export const EMPTY: readonly AABB[] = []

/** 收集和 region 相交的所有方块碰撞箱（已经换成世界坐标） */
export function collectColliders(region: AABB, shape: ShapeFn): AABB[] {
  const out: AABB[] = []
  const x0 = Math.floor(region.minX - EPS)
  const x1 = Math.floor(region.maxX + EPS)
  // 往下多看一格：栅栏这种比 1 格高的形状会伸进上面那一格（原版也是这样）
  const y0 = Math.floor(region.minY - EPS) - 1
  const y1 = Math.floor(region.maxY + EPS)
  const z0 = Math.floor(region.minZ - EPS)
  const z1 = Math.floor(region.maxZ + EPS)
  for (let x = x0; x <= x1; x++)
    for (let y = y0; y <= y1; y++)
      for (let z = z0; z <= z1; z++)
        for (const b of shape(x, y, z)) {
          const w = b.move(x, y, z)
          if (w.intersects(region)) out.push(w)
        }
  return out
}

/**
 * 沿一个轴裁剪位移：bb 想沿 axis 走 d，被 boxes 挡住的话返回实际能走的距离。
 * 只看在另外两个轴上和 bb 有重叠的盒子（贴着边的不算重叠，所以能贴着墙滑动）。
 */
export function clipAxis(axis: 0 | 1 | 2, bb: AABB, boxes: readonly AABB[], d: number): number {
  if (Math.abs(d) < EPS) return 0
  const a1 = ((axis + 1) % 3) as 0 | 1 | 2
  const a2 = ((axis + 2) % 3) as 0 | 1 | 2
  for (const b of boxes) {
    if (b.max(a1) - EPS <= bb.min(a1) || b.min(a1) + EPS >= bb.max(a1)) continue
    if (b.max(a2) - EPS <= bb.min(a2) || b.min(a2) + EPS >= bb.max(a2)) continue
    if (d > 0 && b.min(axis) >= bb.max(axis) - EPS) d = Math.min(d, b.min(axis) - bb.max(axis))
    else if (d < 0 && b.max(axis) <= bb.min(axis) + EPS) d = Math.max(d, b.max(axis) - bb.min(axis))
  }
  return Math.abs(d) < EPS ? 0 : d
}

/** 按原版顺序（y，然后 x / z 里位移小的先走）裁剪整个位移。对应 Entity.collideWithShapes */
export function collideWithShapes(m: Vec3, bb: AABB, boxes: readonly AABB[]): Vec3 {
  let { x, y, z } = m
  if (y !== 0) {
    y = clipAxis(1, bb, boxes, y)
    if (y !== 0) bb = bb.move(0, y, 0)
  }
  const zFirst = Math.abs(x) < Math.abs(z)
  if (zFirst && z !== 0) {
    z = clipAxis(2, bb, boxes, z)
    if (z !== 0) bb = bb.move(0, 0, z)
  }
  if (x !== 0) {
    x = clipAxis(0, bb, boxes, x)
    if (!zFirst && x !== 0) bb = bb.move(x, 0, 0)
  }
  if (!zFirst && z !== 0) z = clipAxis(2, bb, boxes, z)
  return { x, y, z }
}

/**
 * 实际位移 = 想走的位移经过碰撞裁剪。对应原版 Entity.collide（含抬步）。
 *
 * 抬步：如果（站在地上，或者这一步落到了地上）并且水平方向被挡住了，
 * 就试着“先抬高 h 再走”，h 依次取挡路方块的顶面高度（不超过 stepHeight）。
 * 抬高后能走得更远就采用。
 * 完整方块高 1 格 > 0.6，所以普通方块不会触发；v7 有了台阶和半砖才会用上。
 */
export function collide(bb: AABB, m: Vec3, shape: ShapeFn, stepHeight: number, onGround: boolean): Vec3 {
  const boxes = collectColliders(bb.expandTowards(m.x, m.y, m.z), shape)
  const r = collideWithShapes(m, bb, boxes)
  const hitX = m.x !== r.x
  const hitZ = m.z !== r.z
  const landing = m.y !== r.y && m.y < 0
  if (stepHeight <= 0 || !(landing || onGround) || !(hitX || hitZ)) return r

  const base = landing ? bb.move(0, r.y, 0) : bb
  let region = base.expandTowards(m.x, stepHeight, m.z)
  if (!landing) region = region.expandTowards(0, -1e-5, 0)
  const boxes2 = collectColliders(region, shape)
  // 候选的抬升高度：各个碰撞箱的顶面相对脚底的高度，在 (r.y, stepHeight] 之间，从低到高
  const heights: number[] = []
  for (const b of boxes2) {
    const h = b.maxY - base.minY
    if (h > r.y + EPS && h <= stepHeight + EPS && !heights.includes(h)) heights.push(h)
  }
  heights.sort((a, b) => a - b)
  const horiz = r.x * r.x + r.z * r.z
  for (const h of heights) {
    const s = collideWithShapes({ x: m.x, y: h, z: m.z }, base, boxes2)
    if (s.x * s.x + s.z * s.z > horiz + EPS) {
      // 走上去了：s.y 是相对 base 抬高的量，再加上 base 相对原位置的下落量
      return { x: s.x, y: s.y + (base.minY - bb.minY), z: s.z }
    }
  }
  return r
}

/** 区域里没有任何碰撞箱 */
export function noCollision(region: AABB, shape: ShapeFn): boolean {
  return collectColliders(region, shape).length === 0
}

/**
 * 潜行防掉落（原版 Player.maybeBackOffFromEdge）。
 * 如果按 (x, z) 走完之后，身体正下方 stepHeight 范围内什么都没有（会掉下去），
 * 就把 x、z 每次往回缩 0.05，直到不会掉下去为止。
 */
export function backOffFromEdge(bb: AABB, m: Vec3, shape: ShapeFn, stepHeight: number): Vec3 {
  if (m.y > 0) return m
  const canFall = (dx: number, dz: number) =>
    noCollision(new AABB(bb.minX + EPS + dx, bb.minY - stepHeight - EPS, bb.minZ + EPS + dz, bb.maxX - EPS + dx, bb.minY, bb.maxZ - EPS + dz), shape)
  const STEP = 0.05
  let { x, z } = m
  const sx = Math.sign(x) * STEP
  const sz = Math.sign(z) * STEP
  while (x !== 0 && canFall(x, 0)) {
    if (Math.abs(x) <= STEP) {
      x = 0
      break
    }
    x -= sx
  }
  while (z !== 0 && canFall(0, z)) {
    if (Math.abs(z) <= STEP) {
      z = 0
      break
    }
    z -= sz
  }
  while (x !== 0 && z !== 0 && canFall(x, z)) {
    x = Math.abs(x) <= STEP ? 0 : x - sx
    z = Math.abs(z) <= STEP ? 0 : z - sz
  }
  return { x, y: m.y, z }
}

/** 身体碰撞箱（脚底中心在 pos）是否和任何方块重叠。放方块、站起来之前检查用 */
export function collides(pos: Vec3, width: number, height: number, shape: ShapeFn): boolean {
  return !noCollision(AABB.body(pos, width, height).deflate(EPS), shape)
}
