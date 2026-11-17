import { AABB, collide, type ShapeFn, type Vec3 } from '../control/physics'
import type { ItemStack } from './items'

/**
 * 掉在地上的物品（v10，原版 ItemEntity）：一个 0.25 × 0.25 的小盒子，有重力、会被方块挡住、落地会弹一下、在地上滑一段停下来。
 * 玩家碰到就捡起来（见 Control）。这里只管物理，画在 items/render.ts。
 */
export class ItemEntity {
  static readonly SIZE = 0.25
  pos: Vec3
  prev: Vec3
  vel: Vec3
  onGround = false
  /** 存在了多少 tick（原版 6000 tick = 5 分钟后消失） */
  age = 0
  /** 还要多少 tick 才能被捡起来：方块掉的 10，玩家扔的 40 */
  pickupDelay: number
  /** 画的时候上下浮动的相位（原版 bobOffs） */
  readonly bob = Math.random() * Math.PI * 2
  removed = false

  constructor(
    public stack: ItemStack,
    pos: Vec3,
    vel: Vec3,
    pickupDelay = 10
  ) {
    this.pos = { ...pos }
    this.prev = { ...pos }
    this.vel = { ...vel }
    this.pickupDelay = pickupDelay
  }

  get box(): AABB {
    return AABB.body(this.pos, ItemEntity.SIZE, ItemEntity.SIZE)
  }

  /**
   * 原版 ItemEntity.tick：
   *   在水里往上浮（速度 × 0.99，向上加一点），否则重力 0.04
   *   移动并碰撞；摩擦：空中 0.98，地上 0.6（方块的滑度）× 0.98；落地时竖直速度 × -0.5（弹一下）
   */
  tick(shape: ShapeFn, inWater: (p: Vec3) => boolean): void {
    this.prev = { ...this.pos }
    if (this.pickupDelay > 0) this.pickupDelay--
    if (inWater({ x: this.pos.x, y: this.pos.y + 0.1, z: this.pos.z })) {
      this.vel.x *= 0.99
      this.vel.z *= 0.99
      this.vel.y = this.vel.y * 0.99 + (this.vel.y < 0.06 ? 5e-4 : 0)
    } else this.vel.y -= 0.04
    const moved = !this.onGround || this.vel.x * this.vel.x + this.vel.z * this.vel.z > 1e-5 || this.age % 4 === 0
    if (moved) {
      const m = collide(this.box, this.vel, shape, 0, this.onGround)
      this.pos.x += m.x
      this.pos.y += m.y
      this.pos.z += m.z
      this.onGround = m.y !== this.vel.y && this.vel.y < 0
      if (m.x !== this.vel.x) this.vel.x = 0
      if (m.z !== this.vel.z) this.vel.z = 0
      if (m.y !== this.vel.y) this.vel.y = 0
      const f = this.onGround ? 0.6 * 0.98 : 0.98
      this.vel.x *= f
      this.vel.y *= 0.98
      this.vel.z *= f
      if (this.onGround && this.vel.y < 0) this.vel.y *= -0.5
    }
    if (++this.age >= 6000) this.removed = true
  }
}

/**
 * 方块掉东西（原版 Block.popResource）：方块中心附近 ±0.25 的随机位置，往上 0.2、水平随机 ±0.1 的速度
 */
export function popResource(x: number, y: number, z: number, stack: ItemStack, random = Math.random): ItemEntity {
  const r = (a: number, b: number) => a + random() * (b - a)
  const half = ItemEntity.SIZE / 2
  return new ItemEntity(stack, { x: x + 0.5 + r(-0.25, 0.25), y: y + 0.5 + r(-0.25, 0.25) - half, z: z + 0.5 + r(-0.25, 0.25) }, { x: r(-0.1, 0.1), y: 0.2, z: r(-0.1, 0.1) })
}

/**
 * 玩家扔东西（原版 Player.drop）：从眼睛下面 0.3 格扔出去，沿视线 0.3 的速度，再加一点随机偏移；40 tick 内捡不起来
 */
export function throwItem(eye: Vec3, yaw: number, pitch: number, stack: ItemStack, random = Math.random): ItemEntity {
  const dir = { x: -Math.sin(yaw) * Math.cos(pitch), y: Math.sin(pitch), z: -Math.cos(yaw) * Math.cos(pitch) }
  const a = random() * Math.PI * 2
  const s = 0.02 * random()
  const vel = { x: dir.x * 0.3 + Math.cos(a) * s, y: dir.y * 0.3 + 0.1 + (random() - random()) * 0.1, z: dir.z * 0.3 + Math.sin(a) * s }
  return new ItemEntity(stack, { x: eye.x, y: eye.y - 0.3, z: eye.z }, vel, 40)
}
