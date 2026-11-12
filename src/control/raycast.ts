/**
 * 射线选方块：从眼睛沿视线方向，一格一格地往前走，碰到第一个方块就停。
 *
 * 用的是体素游戏里最经典的 DDA 算法（Amanatides & Woo, 1987）：
 * 每一步只跨过 x、y、z 三个方向里“最先碰到的那条格子边界”，所以不会漏掉任何一格，
 * 也不用像原项目那样对 three.js 的网格做三角形求交。
 *
 * 返回命中的方块坐标，以及射线是从哪个面进去的（放方块时放在这个面的外侧）。
 */
export interface RayHit {
  x: number
  y: number
  z: number
  /** 命中面的法线，例如 (0, 1, 0) 表示打在顶面 */
  nx: number
  ny: number
  nz: number
  distance: number
}

export function raycast(
  ox: number,
  oy: number,
  oz: number,
  dx: number,
  dy: number,
  dz: number,
  maxDistance: number,
  hitTest: (x: number, y: number, z: number) => boolean
): RayHit | null {
  let x = Math.floor(ox)
  let y = Math.floor(oy)
  let z = Math.floor(oz)
  const stepX = Math.sign(dx)
  const stepY = Math.sign(dy)
  const stepZ = Math.sign(dz)
  // 沿射线走多远会跨过一整格（方向分量为 0 时永远跨不过）
  const tDeltaX = stepX !== 0 ? Math.abs(1 / dx) : Infinity
  const tDeltaY = stepY !== 0 ? Math.abs(1 / dy) : Infinity
  const tDeltaZ = stepZ !== 0 ? Math.abs(1 / dz) : Infinity
  // 走到下一条格子边界的距离
  const frac = (v: number, s: number) => (s > 0 ? Math.floor(v) + 1 - v : v - Math.floor(v))
  let tMaxX = stepX !== 0 ? frac(ox, stepX) * tDeltaX : Infinity
  let tMaxY = stepY !== 0 ? frac(oy, stepY) * tDeltaY : Infinity
  let tMaxZ = stepZ !== 0 ? frac(oz, stepZ) * tDeltaZ : Infinity
  let nx = 0
  let ny = 0
  let nz = 0
  let t = 0

  while (t <= maxDistance) {
    if (hitTest(x, y, z)) return { x, y, z, nx, ny, nz, distance: t }
    if (tMaxX < tMaxY && tMaxX < tMaxZ) {
      x += stepX
      t = tMaxX
      tMaxX += tDeltaX
      nx = -stepX
      ny = nz = 0
    } else if (tMaxY < tMaxZ) {
      y += stepY
      t = tMaxY
      tMaxY += tDeltaY
      ny = -stepY
      nx = nz = 0
    } else {
      z += stepZ
      t = tMaxZ
      tMaxZ += tDeltaZ
      nz = -stepZ
      nx = ny = 0
    }
  }
  return null
}
