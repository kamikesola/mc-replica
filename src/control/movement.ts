import Player, { PHYSICS as P, POSES } from '../player'
import { AABB, backOffFromEdge, collide, collides, noCollision, type ShapeFn, type Vec3 } from './physics'

/**
 * 玩家的一个 tick（1/20 秒）。按原版的顺序和公式写，出处标在每一段上：
 *
 *   tickPlayer
 *     1. 更新水的状态         Entity.updateInWaterStateAndDoFluidPushing
 *     2. 姿势（站 / 蹲）      Player.updatePlayerPose
 *     3. 疾跑开始 / 结束      LocalPlayer.aiStep
 *     4. 输入：潜行 ×0.3      LocalPlayer.aiStep
 *     5. 飞行的上升 / 下降    LocalPlayer.aiStep
 *     6. 速度太小归零、跳跃   LivingEntity.aiStep
 *     7. 输入 ×0.98，然后 travel：水里 / 地上 / 空中 / 飞行 各一套
 *     8. 视角摇晃的幅度       Player.aiStep
 *
 * 不依赖 three 和 DOM，Node 里的测试可以直接跑。
 */

/** 一个 tick 的输入。前后、左右是 -1..1；yaw 是相机绕 y 轴的角度（three.js 的约定，0 = 朝 -z） */
export interface MoveInput {
  forward: number
  left: number
  jump: boolean
  sneak: boolean
  /** 疾跑键按着，或者双击了前进 */
  sprint: boolean
  yaw: number
}

/** 移动需要知道的世界信息 */
export interface MoveWorld {
  /** 方块的碰撞形状（没加载的区块当作实心） */
  shape: ShapeFn
  isWater: (x: number, y: number, z: number) => boolean
}

const f32 = Math.fround

export function tickPlayer(p: Player, input: MoveInput, world: MoveWorld): void {
  p.prevPos = { ...p.pos }
  p.prevWalkDist = p.walkDist
  p.prevBob = p.bob

  // ---- 1. 水
  updateWater(p, world)

  // ---- 2. 姿势：按着 Shift（且没在飞）就蹲下；站不起来（头顶只有 1.5 格）也保持蹲着
  const wantCrouch = input.sneak && !p.flying
  if (wantCrouch) p.pose = 'crouching'
  else if (p.pose === 'crouching') {
    const s = POSES.standing
    if (!collides(p.pos, s.width, s.height, world.shape)) p.pose = 'standing'
  }

  // ---- 4. 输入（先算出来，疾跑判断要用）
  let forward = input.forward
  let left = input.left
  if (p.pose === 'crouching') {
    forward *= P.SNEAK_MULTIPLIER
    left *= P.SNEAK_MULTIPLIER
  }

  // ---- 3. 疾跑：往前的输入至少 0.8（潜行时只有 0.3，所以蹲着跑不起来），不在水面
  const swimmingAtSurface = p.inWater && !p.underWater
  if (!p.sprinting && input.sprint && forward >= 0.8 && !swimmingAtSurface && !p.inWater) p.sprinting = true
  if (p.sprinting && (forward <= 1e-5 || p.horizontalCollision || swimmingAtSurface || p.pose === 'crouching')) p.sprinting = false

  const v = p.velocity

  // ---- 5. 飞行：按住跳 / 潜行，竖直速度每 tick 加减 0.15
  if (p.flying) {
    const m = (input.jump ? 1 : 0) - (input.sneak ? 1 : 0)
    if (m !== 0) v.y += m * P.FLY_SPEED * 3
  }

  // ---- 6. LivingEntity.aiStep
  if (p.noJumpDelay > 0) p.noJumpDelay--
  if (Math.abs(v.x) < P.MIN_VELOCITY) v.x = 0
  if (Math.abs(v.y) < P.MIN_VELOCITY) v.y = 0
  if (Math.abs(v.z) < P.MIN_VELOCITY) v.z = 0

  if (input.jump && !p.flying) {
    const k = p.waterHeight
    const inWater = p.inWater && k > 0
    if (!inWater || (p.onGround && k <= P.WATER_JUMP_THRESHOLD)) {
      // 在陆地上，或者在很浅的水里站着：正常起跳
      if (p.onGround && p.noJumpDelay === 0) {
        jumpFromGround(p, input.yaw)
        p.noJumpDelay = P.JUMP_DELAY
      }
    } else {
      // 在水里：往上游
      v.y += P.WATER_JUMP
    }
  } else p.noJumpDelay = 0

  // ---- 7. travel
  travel(p, left * 0.98, forward * 0.98, input, world)
  if (p.onGround && p.flying) p.flying = false // 飞着落地就不飞了

  // ---- 8. 视角摇晃的幅度：在地上走得越快摇得越厉害，最多 0.1
  const target = p.onGround && !p.flying ? Math.min(0.1, Math.hypot(v.x, v.z)) : 0
  p.bob += (target - p.bob) * 0.4
}

/** 起跳：竖直速度设为 0.42；疾跑时再朝面向的方向推 0.2（所以疾跑跳特别远） */
function jumpFromGround(p: Player, yaw: number): void {
  p.velocity.y = P.JUMP_POWER
  if (p.sprinting) {
    p.velocity.x += -Math.sin(yaw) * P.SPRINT_JUMP_BOOST
    p.velocity.z += -Math.cos(yaw) * P.SPRINT_JUMP_BOOST
  }
}

/**
 * 把输入变成加速度加到速度上（原版 Entity.moveRelative）。
 * 输入向量长度超过 1 时先归一化（斜着走不会更快），再乘以 speed，最后按朝向转到世界坐标。
 */
function moveRelative(p: Player, speed: number, left: number, forward: number, yaw: number): void {
  const len2 = left * left + forward * forward
  if (len2 < 1e-7) return
  const k = (len2 > 1 ? 1 / Math.sqrt(len2) : 1) * speed
  const l = left * k
  const f = forward * k
  // three.js：yaw = 0 时朝 -z；前方 (-sin, -cos)，左方 (-cos, +sin)
  const sin = Math.sin(yaw)
  const cos = Math.cos(yaw)
  p.velocity.x += -sin * f - cos * l
  p.velocity.z += -cos * f + sin * l
}

function travel(p: Player, left: number, forward: number, input: MoveInput, world: MoveWorld): void {
  const v = p.velocity

  if (p.inWater && !p.flying) {
    // ---- 水里（LivingEntity.travel 的水分支）
    const y0 = p.pos.y
    const drag = p.sprinting ? P.WATER_SPRINT_DRAG : P.WATER_DRAG
    moveRelative(p, P.WATER_SPEED, left, forward, input.yaw)
    move(p, input, world)
    v.x *= drag
    v.y *= 0.8
    v.z *= drag
    v.y -= P.GRAVITY / 16 // 水里的重力只有 1/16，慢慢下沉
    // 游向一格高的岸边：抬高 0.6 格后前面是空的，就往上蹿（0.3 格/tick）
    if (p.horizontalCollision) {
      const b = p.body
      const bb = AABB.body(p.pos, b.width, b.height).move(v.x, v.y + 0.6 - p.pos.y + y0, v.z)
      if (noCollision(bb, world.shape)) v.y = 0.3
    }
    return
  }

  // ---- 地上 / 空中 / 飞行（LivingEntity.travel 的普通分支 + Player.travel 的飞行处理）
  const yBefore = v.y
  const friction = f32(P.BLOCK_FRICTION)
  const drag = p.onGround ? f32(friction * f32(P.AIR_FRICTION)) : f32(P.AIR_FRICTION)
  // 地上的加速度 = 速度属性 × 0.216 / 滑度³。普通方块滑度 0.6，0.6³ = 0.216，正好是 1 倍；冰上加速度很小
  const speed = p.onGround
    ? f32(p.speedAttribute * f32(0.21600002 / (friction * friction * friction)))
    : p.flying
      ? P.FLY_SPEED * (p.sprinting ? 2 : 1)
      : p.sprinting
        ? P.AIR_SPRINT_SPEED
        : P.AIR_SPEED
  moveRelative(p, speed, left, forward, input.yaw)
  move(p, input, world)
  v.x *= drag
  v.z *= drag
  v.y = (v.y - P.GRAVITY) * f32(P.VERTICAL_DRAG)
  if (p.flying) v.y = yBefore * P.FLY_VERTICAL_DRAG // 飞行没有重力，竖直速度每 tick ×0.6
}

/** 按速度移动一 tick，处理碰撞（原版 Entity.move） */
function move(p: Player, input: MoveInput, world: MoveWorld): void {
  const b = p.body
  const bb = AABB.body(p.pos, b.width, b.height)
  let m: Vec3 = { ...p.velocity }
  // 潜行防掉落：按着 Shift、没在飞、在地上
  if (input.sneak && !p.flying && p.onGround) m = backOffFromEdge(bb, m, world.shape, P.STEP_HEIGHT)

  const r = collide(bb, m, world.shape, P.STEP_HEIGHT, p.onGround)
  p.pos.x += r.x
  p.pos.y += r.y
  p.pos.z += r.z

  const hitX = Math.abs(m.x - r.x) > 1e-5
  const hitZ = Math.abs(m.z - r.z) > 1e-5
  const hitY = m.y !== r.y
  // 疾跑撞墙会停下来，但贴着墙斜着跑（方向只偏了一点点）不算，原版叫 minorHorizontalCollision
  const intended = Math.hypot(m.x, m.z)
  const actual = Math.hypot(r.x, r.z)
  const minor = intended > 1e-5 && actual > 1e-5 && Math.acos(Math.min(1, (m.x * r.x + m.z * r.z) / (intended * actual))) < 0.13962634
  p.horizontalCollision = (hitX || hitZ) && !minor
  p.onGround = hitY && m.y < 0
  if (hitX) p.velocity.x = 0
  if (hitZ) p.velocity.z = 0
  if (hitY) p.velocity.y = 0
  p.walkDist += Math.hypot(r.x, r.z) * 0.6
}

/**
 * 水的状态（原版 updateFluidHeightAndDoFluidPushing）。
 * 碰撞箱稍微缩小一点，看它碰到的每个水方块：水面高度 = 方块 y + 水高
 * （上面还是水 → 1；否则 8/9），脚底泡在水里的深度取最大值。
 */
function updateWater(p: Player, world: MoveWorld): void {
  const b = p.body
  const bb = AABB.body(p.pos, b.width, b.height).deflate(0.001)
  let depth = 0
  for (let x = Math.floor(bb.minX); x < Math.ceil(bb.maxX); x++)
    for (let y = Math.floor(bb.minY); y < Math.ceil(bb.maxY); y++)
      for (let z = Math.floor(bb.minZ); z < Math.ceil(bb.maxZ); z++) {
        if (!world.isWater(x, y, z)) continue
        const top = y + (world.isWater(x, y + 1, z) ? 1 : 8 / 9)
        if (top >= bb.minY) depth = Math.max(depth, top - bb.minY)
      }
  p.waterHeight = depth
  // 眼睛在不在水下
  const eye = p.pos.y + b.eye
  const ex = Math.floor(p.pos.x)
  const ey = Math.floor(eye)
  const ez = Math.floor(p.pos.z)
  p.underWater = world.isWater(ex, ey, ez) && eye < ey + (world.isWater(ex, ey + 1, ez) ? 1 : 8 / 9)
}
