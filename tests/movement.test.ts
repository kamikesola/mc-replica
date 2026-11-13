/**
 * v2：玩家移动。每个数字都和原版（Java 版 1.21.1）实测 / 公认的值对照。
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { tickPlayer, type MoveInput, type MoveWorld } from '../src/control/movement'
import { AABB, collide, EMPTY, FULL_CUBE, type ShapeFn } from '../src/control/physics'
import Player from '../src/player'

/** 用一个函数描述世界：solid(x,y,z) 为真就是完整方块；water 同理 */
function world(solid: (x: number, y: number, z: number) => boolean, water: (x: number, y: number, z: number) => boolean = () => false): MoveWorld {
  return { shape: (x, y, z) => (solid(x, y, z) ? FULL_CUBE : EMPTY), isWater: water }
}
const flat = world((_x, y) => y < 64)
const input = (o: Partial<MoveInput> = {}): MoveInput => ({ forward: 0, left: 0, jump: false, sneak: false, sprint: false, yaw: 0, ...o })

function spawn(x = 0.5, y = 64, z = 0.5): Player {
  const p = new Player()
  p.pos = { x, y, z }
  p.onGround = true
  return p
}

/** 跑 n 个 tick，返回最后 20 个 tick 的平均水平速度（格/秒） */
function speed(p: Player, inp: MoveInput, w: MoveWorld, n = 200): number {
  let start = { ...p.pos }
  for (let i = 0; i < n; i++) {
    if (i === n - 20) start = { ...p.pos }
    tickPlayer(p, inp, w)
  }
  return Math.hypot(p.pos.x - start.x, p.pos.z - start.z)
}

test('地面速度：走 4.317、疾跑 5.612、潜行 1.295 格/秒（原版的公认数值）', () => {
  assert.ok(Math.abs(speed(spawn(), input({ forward: 1 }), flat) - 4.317) < 0.002)
  assert.ok(Math.abs(speed(spawn(), input({ forward: 1, sprint: true }), flat) - 5.612) < 0.002)
  assert.ok(Math.abs(speed(spawn(), input({ forward: 1, sneak: true }), flat) - 1.295) < 0.002)
})

test('斜着走不会更快：输入向量先归一化', () => {
  const s = speed(spawn(), input({ forward: 1, left: 1 }), flat)
  assert.ok(Math.abs(s - 4.317 / 0.98) < 0.01, `斜走 ${s}`) // 归一化后是 1 而不是 0.98，略快 2%，原版也是
})

test('跳跃：最高 1.2522 格，12 tick 后落地；按住跳在地上会连续起跳', () => {
  const p = spawn()
  let maxY = 0
  let landed = -1
  tickPlayer(p, input({ jump: true }), flat)
  for (let t = 1; t < 40; t++) {
    tickPlayer(p, input(), flat)
    maxY = Math.max(maxY, p.pos.y - 64)
    if (p.onGround && landed < 0) landed = t + 1
  }
  assert.ok(Math.abs(maxY - 1.2522) < 1e-3, `最高 ${maxY}`)
  assert.equal(landed, 12)
})

test('连续疾跑跳：平均 7.127 格/秒（原版的公认数值），比疾跑 5.612 快', () => {
  const p = spawn()
  for (let i = 0; i < 240; i++) tickPlayer(p, input({ forward: 1, sprint: true, jump: true }), flat)
  const z0 = p.pos.z
  for (let i = 0; i < 120; i++) tickPlayer(p, input({ forward: 1, sprint: true, jump: true }), flat) // 10 次跳跃
  const s = (z0 - p.pos.z) / 6 // yaw 0 朝 -z；120 tick = 6 秒
  assert.ok(Math.abs(s - 7.127) < 0.01, `疾跑跳 ${s}`)
})

test('下落：终端速度 3.92 格/tick（78.4 格/秒）', () => {
  const p = spawn(0.5, 2000, 0.5)
  p.onGround = false
  for (let i = 0; i < 400; i++) tickPlayer(p, input(), world(() => false))
  assert.ok(Math.abs(p.velocity.y + 3.92) < 0.01, `vy = ${p.velocity.y}`)
})

test('创造飞行：水平 10.92、疾跑 21.78 格/秒；按住跳上升 7.5 格/秒', () => {
  const fly = (_o: Partial<MoveInput>) => {
    const p = spawn(0.5, 100, 0.5)
    p.flying = true
    p.onGround = false
    return p
  }
  const air = world(() => false)
  assert.ok(Math.abs(speed(fly({}), input({ forward: 1 }), air) - 10.89) < 0.05)
  assert.ok(Math.abs(speed(fly({}), input({ forward: 1, sprint: true }), air) - 21.78) < 0.1)
  const p = fly({})
  for (let i = 0; i < 100; i++) tickPlayer(p, input({ jump: true }), air)
  const y0 = p.pos.y
  tickPlayer(p, input({ jump: true }), air)
  assert.ok(Math.abs((p.pos.y - y0) * 20 - 7.5) < 0.01) // 每 tick 先加 0.15 再移动，速度稳定在 0.375 格/tick
})

test('潜行不会掉下方块边缘；不潜行会掉下去', () => {
  const pillar = world((x, y, z) => x === 0 && z === 0 && y < 64)
  const sneak = spawn()
  for (let i = 0; i < 100; i++) tickPlayer(sneak, input({ forward: 1, sneak: true }), pillar)
  assert.equal(sneak.pos.y, 64)
  assert.ok(sneak.pos.z < 0 && sneak.pos.z > -0.31, `z = ${sneak.pos.z}`) // 最多探出去 0.3（半个身子）
  const walk = spawn()
  for (let i = 0; i < 100; i++) tickPlayer(walk, input({ forward: 1 }), pillar)
  assert.ok(walk.pos.y < 60)
})

test('蹲着能钻进 1.5 格高的缝；在缝里松开 Shift 站不起来', () => {
  // z < -2 的地方头顶 y = 65.5 有一块“半砖”顶棚（1.5 格高的空间）
  const shape: ShapeFn = (_x, y, z) => (y < 64 ? FULL_CUBE : y === 65 && z < -2 ? [new AABB(0, 0.5, 0, 1, 1, 1)] : EMPTY)
  const w: MoveWorld = { shape, isWater: () => false }
  const stand = spawn()
  for (let i = 0; i < 60; i++) tickPlayer(stand, input({ forward: 1 }), w)
  assert.ok(stand.pos.z > -2.31, `站着进不去，z = ${stand.pos.z}`)
  const crouch = spawn()
  for (let i = 0; i < 100; i++) tickPlayer(crouch, input({ forward: 1, sneak: true }), w)
  assert.ok(crouch.pos.z < -3, `蹲着能进去，z = ${crouch.pos.z}`)
  tickPlayer(crouch, input(), w)
  assert.equal(crouch.pose, 'crouching')
})

test('抬步：能直接走上 0.5 格的台阶，走不上 1 格的方块', () => {
  const slab: ShapeFn = (_x, y, z) => (y < 64 ? FULL_CUBE : y === 64 && z < -1 ? [new AABB(0, 0, 0, 1, 0.5, 1)] : EMPTY)
  const p = spawn()
  for (let i = 0; i < 40; i++) tickPlayer(p, input({ forward: 1 }), { shape: slab, isWater: () => false })
  assert.equal(p.pos.y, 64.5)
  const wall = spawn()
  for (let i = 0; i < 40; i++) tickPlayer(wall, input({ forward: 1 }), world((_x, y, z) => y < 64 || (y === 64 && z < -1)))
  assert.equal(wall.pos.y, 64)
  assert.ok(wall.pos.z >= -0.7 - 1e-6)
})

test('碰撞：贴着墙斜走会沿墙滑动；先 y 后水平', () => {
  const w = world((x, y) => y < 64 || x >= 2)
  const bb = AABB.body({ x: 1.6, y: 64, z: 0.5 }, 0.6, 1.8)
  const r = collide(bb, { x: 0.5, y: -0.1, z: 0.5 }, w.shape, 0.6, true)
  assert.ok(Math.abs(r.x - 0.1) < 1e-6) // 撞墙停在 x = 1.7
  assert.equal(r.z, 0.5) // z 方向照常滑动
  assert.equal(r.y, 0) // 站在地上
})

test('水：水底走 1.96 格/秒；水面按住跳会上下浮动；能游上一格高的岸', () => {
  // 海平面 63：y ≤ 62 是水，水底 y = 58；z < -3 是岸（顶面 63）
  const sea = (_x: number, y: number, z: number) => y >= 58 && y <= 62 && z >= -3
  const ground = (_x: number, y: number, z: number) => y < 58 || (z < -3 && y < 63)
  const w = world(ground, sea)
  const p = spawn(0.5, 60, 0.5)
  p.onGround = false
  // 不按跳：沉到水底，在水底往 +z（远离岸）走。加速度 0.02 × 0.98，阻力 ×0.8 → 0.098 格/tick
  const s = speed(p, input({ forward: 1, yaw: Math.PI }), w, 200)
  assert.ok(Math.abs(s - 1.96) < 0.01, `水底 ${s}`)
  // 浮在水面：y 在 62.x 附近小幅起伏
  for (let i = 0; i < 100; i++) tickPlayer(p, input({ jump: true }), w) // 先浮上来
  let lo = Infinity
  let hi = -Infinity
  for (let i = 0; i < 100; i++) {
    tickPlayer(p, input({ jump: true }), w)
    lo = Math.min(lo, p.pos.y)
    hi = Math.max(hi, p.pos.y)
  }
  assert.ok(lo > 62 && hi < 63.5 && hi - lo > 0.05, `起伏 ${lo} ~ ${hi}`)
  // 往岸边游（-z）：最后站到岸上
  p.pos.z = 0.5
  for (let i = 0; i < 200; i++) tickPlayer(p, input({ forward: 1, jump: true }), w)
  assert.ok(p.pos.z < -4 && p.pos.y >= 63 && !p.inWater, `pos ${JSON.stringify(p.pos)}`)
})
