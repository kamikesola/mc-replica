/**
 * Player：玩家的状态和参数。和原项目一样只存数据，移动和碰撞在 Control 里做。
 *
 * 数值取自原版（单位：方块/秒）。原版物理是每秒 20 次的固定步长，
 * 这里先按“每帧连续积分”近似，v2 会改成和原版一样的 tick 物理。
 */
export enum Mode {
  walking = 'walking',
  sprinting = 'sprinting',
  sneaking = 'sneaking',
  flying = 'flying',
  sprintFlying = 'sprintFlying'
}

export const Speed: Record<Mode, number> = {
  [Mode.walking]: 4.317,
  [Mode.sprinting]: 5.612,
  [Mode.sneaking]: 1.295,
  [Mode.flying]: 10.92,
  [Mode.sprintFlying]: 21.78
}

export default class Player {
  mode = Mode.walking
  speed = Speed[Mode.walking]

  setMode(mode: Mode) {
    this.mode = mode
    this.speed = Speed[mode]
  }

  get flying() {
    return this.mode === Mode.flying || this.mode === Mode.sprintFlying
  }

  /** 碰撞箱：宽 0.6、高 1.8；眼睛在脚底往上 1.62 */
  body = {
    width: 0.6,
    height: 1.8,
    eye: 1.62
  }

  /** 重力加速度（方块/秒²）和跳跃高度（原版能跳上 1.25 格） */
  gravity = 32
  jumpHeight = 1.2522
  /** 最大下落速度 */
  terminalVelocity = 78.4

  /** 当前速度和是否站在地上，由 Control 每帧更新 */
  velocity = { x: 0, y: 0, z: 0 }
  onGround = false
}
