/**
 * 玩家和方块的碰撞（AABB = 轴对齐包围盒）。
 *
 * 做法是“分轴移动”：先动 y，再动 x，再动 z。每动一个轴就检查碰撞箱有没有和实心方块重叠，
 * 重叠了就退回到紧贴方块的位置，并把这个轴的速度清零。分轴的好处是贴着墙走时会自然“滑”过去。
 *
 * 速度很快（下落、飞行冲刺）时一帧可能移动好几格，直接移动会穿墙，
 * 所以把一帧拆成若干小步，每步不超过 0.45 格。
 *
 * 原版也是分轴处理，只是它每秒 20 次固定步长；v2 会改成和原版一致的 tick 物理。
 */
export interface Vec3 {
  x: number
  y: number
  z: number
}

export interface Body {
  /** 碰撞箱半宽（原版 0.3）和高度（1.8） */
  half: number
  height: number
}

type SolidFn = (x: number, y: number, z: number) => boolean

const EPS = 1e-4

/** 碰撞箱（脚底中心在 pos）是否和任何实心方块重叠 */
export function collides(pos: Vec3, body: Body, solid: SolidFn): boolean {
  const x0 = Math.floor(pos.x - body.half)
  const x1 = Math.floor(pos.x + body.half - EPS)
  const y0 = Math.floor(pos.y)
  const y1 = Math.floor(pos.y + body.height - EPS)
  const z0 = Math.floor(pos.z - body.half)
  const z1 = Math.floor(pos.z + body.half - EPS)
  for (let x = x0; x <= x1; x++)
    for (let y = y0; y <= y1; y++)
      for (let z = z0; z <= z1; z++)
        if (solid(x, y, z)) return true
  return false
}

/**
 * 按速度移动 dt 秒，处理碰撞。会直接修改 pos 和 vel。
 * @returns onGround：这一帧是否落在了方块上；hitWall：水平方向是否撞到了方块
 */
export function moveAndCollide(pos: Vec3, vel: Vec3, dt: number, body: Body, solid: SolidFn): { onGround: boolean; hitWall: boolean } {
  let onGround = false
  let hitWall = false
  const maxDelta = Math.max(Math.abs(vel.x), Math.abs(vel.y), Math.abs(vel.z)) * dt
  const steps = Math.max(1, Math.ceil(maxDelta / 0.45))
  const h = dt / steps

  for (let s = 0; s < steps; s++) {
    // ---- y
    const dy = vel.y * h
    pos.y += dy
    if (collides(pos, body, solid)) {
      if (dy < 0) {
        pos.y = Math.floor(pos.y) + 1 // 落到脚下方块的顶面
        onGround = true
      } else {
        pos.y = Math.floor(pos.y + body.height) - body.height - EPS // 头顶撞到方块
      }
      vel.y = 0
    }

    // ---- x
    const dx = vel.x * h
    pos.x += dx
    if (collides(pos, body, solid)) {
      pos.x = dx > 0 ? Math.floor(pos.x + body.half) - body.half - EPS : Math.floor(pos.x - body.half) + 1 + body.half + EPS
      vel.x = 0
      hitWall = true
    }

    // ---- z
    const dz = vel.z * h
    pos.z += dz
    if (collides(pos, body, solid)) {
      pos.z = dz > 0 ? Math.floor(pos.z + body.half) - body.half - EPS : Math.floor(pos.z - body.half) + 1 + body.half + EPS
      vel.z = 0
      hitWall = true
    }
  }
  return { onGround, hitWall }
}
