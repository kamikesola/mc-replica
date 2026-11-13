import type { Vec3 } from '../control/physics'

/**
 * Player：玩家的状态和参数。和原项目一样只存数据，移动规则在 control/movement.ts。
 *
 * v2 起和原版一样按 tick 计算（每秒 20 次），所以速度的单位是“格 / tick”，
 * 下面的常数都是原版的原始数值（LivingEntity、Player、LocalPlayer 里的数）。
 * 换算成每秒：× 20。比如走路稳定后 0.21585 格/tick = 4.317 格/秒。
 */
export const PHYSICS = {
  /** 1 tick = 0.05 秒 */
  TICK: 0.05,

  /** 移动速度属性：走 0.1；疾跑 ×1.3 */
  WALK_SPEED: 0.1,
  SPRINT_MULTIPLIER: 1.3,
  /** 潜行时输入 ×0.3（原版的 sneaking_speed 属性） */
  SNEAK_MULTIPLIER: 0.3,
  /** 空中的加速度：普通 0.02，疾跑 0.026 */
  AIR_SPEED: 0.02,
  AIR_SPRINT_SPEED: 0.026,
  /** 创造模式飞行：加速度 0.05（疾跑 ×2）；上升 / 下降每 tick 加 0.05 × 3 */
  FLY_SPEED: 0.05,

  /** 方块滑度：普通方块 0.6（冰 0.98，以后有了再加） */
  BLOCK_FRICTION: 0.6,
  /** 每 tick 水平速度乘的系数：地面 = 滑度 × 0.91，空中 = 0.91 */
  AIR_FRICTION: 0.91,
  /** 重力：每 tick 竖直速度 -0.08，然后 ×0.98（空气阻力） */
  GRAVITY: 0.08,
  VERTICAL_DRAG: 0.98,
  /** 飞行时竖直速度每 tick ×0.6 */
  FLY_VERTICAL_DRAG: 0.6,

  /** 跳跃初速度 0.42 格/tick（能跳 1.2522 格高）；疾跑跳往前额外推 0.2 */
  JUMP_POWER: 0.42,
  SPRINT_JUMP_BOOST: 0.2,
  /** 按住跳时两次起跳之间至少隔 10 tick */
  JUMP_DELAY: 10,

  /** 水：加速度 0.02，阻力 ×0.8，重力 0.08 / 16，按住跳每 tick +0.04 */
  WATER_SPEED: 0.02,
  WATER_DRAG: 0.8,
  WATER_SPRINT_DRAG: 0.9,
  WATER_JUMP: 0.04,
  /** 水深不超过它时，站在地上按跳是正常起跳（原版 getFluidJumpThreshold） */
  WATER_JUMP_THRESHOLD: 0.4,

  /** 能自动走上去的高度 */
  STEP_HEIGHT: 0.6,
  /** 速度分量小于它时直接归零 */
  MIN_VELOCITY: 0.003
} as const

/** 姿势：站立 / 潜行。不同姿势碰撞箱高度和眼高不同 */
export const POSES = {
  standing: { width: 0.6, height: 1.8, eye: 1.62 },
  crouching: { width: 0.6, height: 1.5, eye: 1.27 }
} as const
export type Pose = keyof typeof POSES

export default class Player {
  /** 脚底中心的位置（tick 结束时的值） */
  pos: Vec3 = { x: 0.5, y: 120, z: 0.5 }
  /** 上一个 tick 的位置：渲染时在 prevPos 和 pos 之间插值，画面才平滑 */
  prevPos: Vec3 = { x: 0.5, y: 120, z: 0.5 }
  /** 速度，单位 格/tick（原版叫 deltaMovement） */
  velocity: Vec3 = { x: 0, y: 0, z: 0 }

  onGround = false
  /** 这一 tick 水平方向撞到了东西 */
  horizontalCollision = false
  flying = false
  sprinting = false
  pose: Pose = 'standing'
  /** 起跳冷却（tick） */
  noJumpDelay = 0

  /** 脚底泡在水里多深（格），0 = 没碰到水 */
  waterHeight = 0
  /** 眼睛在不在水里 */
  underWater = false

  /** 走过的距离（视角摇晃用），以及摇晃幅度 bob（原版 Player.bob） */
  walkDist = 0
  prevWalkDist = 0
  bob = 0
  prevBob = 0

  get body() {
    return POSES[this.pose]
  }

  get inWater() {
    return this.waterHeight > 0
  }

  /** 当前移动速度属性：疾跑时 0.13 */
  get speedAttribute() {
    return PHYSICS.WALK_SPEED * (this.sprinting ? PHYSICS.SPRINT_MULTIPLIER : 1)
  }

  /** 状态描述（F3 用） */
  get state(): string {
    if (this.flying) return this.sprinting ? '飞行（疾跑）' : '飞行'
    const parts: string[] = []
    if (this.inWater) parts.push(this.underWater ? '水下' : '水中')
    if (this.pose === 'crouching') parts.push('潜行')
    else if (this.sprinting) parts.push('疾跑')
    else parts.push('行走')
    return parts.join(' · ')
  }
}
