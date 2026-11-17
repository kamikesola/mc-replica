/**
 * v9.1：红石。世界是一个 Map（y < 0 是石头），方块用 v9 的 placement 放（和游戏里一样），
 * 改动之后调用 Redstone.changed + process，时间用 Redstone.tick 推进。
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { BlockType, fullStateName, parseState } from '../src/terrain/blocks'
import { Dir, neighborUpdates, placement } from '../src/terrain/placement'
import { Redstone, useRedstone } from '../src/terrain/redstone'

const S = (name: string) => {
  const s = parseState(`minecraft:${name}`)
  if (s === undefined) throw new Error(name)
  return s
}
const YAW = { north: 0, west: Math.PI / 2, south: Math.PI, east: -Math.PI / 2 }

class World {
  cells = new Map<string, number>()
  rs = new Redstone(this)
  get = (x: number, y: number, z: number) => this.cells.get(`${x},${y},${z}`) ?? (y < 0 ? BlockType.stone : BlockType.air)
  set = (x: number, y: number, z: number, s: number) => void this.cells.set(`${x},${y},${z}`, s)
  name = (x: number, y: number, z: number) => fullStateName(this.get(x, y, z)).replace('minecraft:', '')
  prop = (x: number, y: number, z: number, k: string) => new RegExp(`${k}=([a-z0-9_]+)`).exec(this.name(x, y, z))?.[1]
  /** 和 Terrain.updateBlock 一样：写、形状更新、红石 */
  update(x: number, y: number, z: number, s: number) {
    this.set(x, y, z, s)
    this.rs.changed(x, y, z)
    neighborUpdates(this, (a, b, c, t) => {
      this.set(a, b, c, t)
      this.rs.changed(a, b, c)
    }, x, y, z)
    this.rs.process()
  }
  place(block: string, clicked: [number, number, number], face: Dir, yaw = YAW.north) {
    const n = [[0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1], [-1, 0, 0], [1, 0, 0]][face]
    const [cx, cy, cz] = clicked
    const r = placement(this, { block: S(block), clicked, face, hit: [cx + 0.5 + n[0] / 2, cy + 0.5 + n[1] / 2, cz + 0.5 + n[2] / 2], yaw, pitch: 0 })
    assert.ok(r, `放不下 ${block}`)
    for (const [x, y, z, s] of r) this.update(x, y, z, s)
  }
  use(x: number, y: number, z: number) {
    this.update(x, y, z, useRedstone(this.get(x, y, z))!)
  }
  ticks(n: number) {
    for (let i = 0; i < n; i++) this.rs.tick()
  }
}

test('红石线：拉杆旁边一排 16 格，强度 15、14 … 0；拉杆关了全灭', () => {
  const w = new World()
  w.set(0, 0, 0, BlockType.stone)
  w.place('lever', [0, 0, 0], Dir.up) // 拉杆放在石头顶上 (0,1,0)；红石线从 (1,0,0) 往东
  for (let x = 1; x <= 17; x++) w.place('redstone_wire', [x, -1, 0], Dir.up)
  assert.equal(w.prop(1, 0, 0, 'power'), '0')
  w.use(0, 1, 0)
  // 拉杆强充能下面的石头，石头给旁边的红石线 15
  for (let x = 1; x <= 16; x++) assert.equal(w.prop(x, 0, 0, 'power'), String(16 - x), `x=${x}`)
  assert.equal(w.prop(17, 0, 0, 'power'), '0')
  w.use(0, 1, 0)
  for (let x = 1; x <= 17; x++) assert.equal(w.prop(x, 0, 0, 'power'), '0')
})

test('红石线的形状：单独一格是十字，连上一边变成直线，能沿方块侧面爬上去', () => {
  const w = new World()
  w.place('redstone_wire', [0, -1, 0], Dir.up)
  assert.equal(w.name(0, 0, 0), 'redstone_wire[east=side,north=side,power=0,south=side,west=side]')
  w.place('redstone_wire', [1, -1, 0], Dir.up)
  assert.equal(w.name(0, 0, 0), 'redstone_wire[east=side,north=none,power=0,south=none,west=side]')
  // 东边放一块石头，石头上面放红石线 → (1,0,0) 往东爬上去
  w.set(2, 0, 0, BlockType.stone)
  w.place('redstone_wire', [2, 0, 0], Dir.up)
  assert.equal(w.prop(1, 0, 0, 'east'), 'up')
})

test('红石灯：通电马上亮，断电 4 tick 后才灭', () => {
  const w = new World()
  w.place('redstone_lamp', [0, -1, 0], Dir.up)
  w.place('lever', [0, 0, 0], Dir.east) // 拉杆贴在灯的东面
  assert.equal(w.prop(0, 0, 0, 'lit'), 'false')
  w.use(1, 0, 0)
  assert.equal(w.prop(0, 0, 0, 'lit'), 'true')
  w.use(1, 0, 0)
  w.ticks(3)
  assert.equal(w.prop(0, 0, 0, 'lit'), 'true')
  w.ticks(1)
  assert.equal(w.prop(0, 0, 0, 'lit'), 'false')
})

test('红石火把：插着的方块有信号时 2 tick 后熄灭（非门）', () => {
  const w = new World()
  w.set(0, 0, 0, BlockType.stone)
  w.place('redstone_torch', [0, 0, 0], Dir.east) // 插在石头东面 → (1,0,0)
  assert.equal(w.name(1, 0, 0), 'redstone_wall_torch[facing=east,lit=true]')
  w.place('lever', [0, 0, 0], Dir.west) // 拉杆在石头西面
  w.use(-1, 0, 0)
  w.ticks(1)
  assert.equal(w.prop(1, 0, 0, 'lit'), 'true')
  w.ticks(1)
  assert.equal(w.prop(1, 0, 0, 'lit'), 'false')
  w.use(-1, 0, 0)
  w.ticks(2)
  assert.equal(w.prop(1, 0, 0, 'lit'), 'true')
})

test('中继器：延迟 delay×2 tick，输出总是 15；右键调延迟', () => {
  const w = new World()
  // 拉杆 → 15 格红石线（尾巴只剩 1）→ 中继器 → 红石线
  w.set(0, 0, 0, BlockType.stone)
  w.place('lever', [0, 0, 0], Dir.up)
  for (let x = 1; x <= 15; x++) w.place('redstone_wire', [x, -1, 0], Dir.up)
  w.place('repeater', [16, -1, 0], Dir.up, YAW.east) // 玩家朝东放：facing=west（输入在西边）
  assert.match(w.name(16, 0, 0), /facing=west/)
  w.place('redstone_wire', [17, -1, 0], Dir.up)
  w.use(0, 1, 0)
  assert.equal(w.prop(15, 0, 0, 'power'), '1')
  w.ticks(1)
  assert.equal(w.prop(16, 0, 0, 'powered'), 'false')
  w.ticks(1)
  assert.equal(w.prop(16, 0, 0, 'powered'), 'true')
  assert.equal(w.prop(17, 0, 0, 'power'), '15')
  w.use(16, 0, 0)
  assert.equal(w.prop(16, 0, 0, 'delay'), '2')
})

test('强充能：拉杆贴着的方块对旁边的红石线是 15；红石线指着的方块能点亮旁边的灯，但不能给另一根红石线充能', () => {
  const w = new World()
  w.set(0, 0, 0, BlockType.stone)
  w.place('lever', [0, 0, 0], Dir.north) // 拉杆在石头北面
  w.place('redstone_wire', [1, -1, 0], Dir.up)
  w.use(0, 0, -1)
  assert.equal(w.prop(1, 0, 0, 'power'), '15')
  // 红石线指进一块石头，石头另一边是灯 → 亮；石头另一边是红石线 → 不亮
  const v = new World()
  v.set(0, 0, 0, S('redstone_block'))
  v.place('redstone_wire', [1, -1, 0], Dir.up)
  v.place('redstone_wire', [2, -1, 0], Dir.up)
  v.set(3, 0, 0, BlockType.stone)
  v.place('redstone_lamp', [4, -1, 0], Dir.up)
  v.place('redstone_wire', [3, -1, 1], Dir.up) // 石头南边（下面一层）放根线：拿不到石头的信号
  v.update(3, 0, 0, BlockType.stone)
  assert.equal(v.prop(4, 0, 0, 'lit'), 'true')
  assert.equal(v.prop(3, 0, 1, 'power'), '0')
})

test('活塞：通电推出去（前面一排方块挪一格），断电缩回；粘性活塞把方块拉回来', () => {
  const w = new World()
  w.place('piston', [0, -1, 0], Dir.up, YAW.west) // 玩家朝西看 → 活塞脸朝东
  assert.match(w.name(0, 0, 0), /facing=east/)
  w.set(1, 0, 0, BlockType.dirt)
  w.set(2, 0, 0, BlockType.cobblestone)
  w.set(3, 0, 0, BlockType.short_grass) // 会被推碎
  w.place('lever', [0, 0, 0], Dir.west)
  w.use(-1, 0, 0)
  assert.match(w.name(0, 0, 0), /extended=true/)
  assert.match(w.name(1, 0, 0), /piston_head/)
  assert.equal(w.get(2, 0, 0), BlockType.dirt)
  assert.equal(w.get(3, 0, 0), BlockType.cobblestone)
  w.use(-1, 0, 0)
  assert.match(w.name(0, 0, 0), /extended=false/)
  assert.equal(w.get(1, 0, 0), BlockType.air)
  assert.equal(w.get(2, 0, 0), BlockType.dirt)
  // 粘性活塞
  const v = new World()
  v.place('sticky_piston', [0, -1, 0], Dir.up, YAW.west)
  v.set(1, 0, 0, BlockType.dirt)
  v.place('lever', [0, 0, 0], Dir.west)
  v.use(-1, 0, 0)
  assert.equal(v.get(2, 0, 0), BlockType.dirt)
  v.use(-1, 0, 0)
  assert.equal(v.get(1, 0, 0), BlockType.dirt)
  // 推不动黑曜石
  const u = new World()
  u.place('piston', [0, -1, 0], Dir.up, YAW.west)
  u.set(1, 0, 0, BlockType.obsidian)
  u.place('lever', [0, 0, 0], Dir.west)
  u.use(-1, 0, 0)
  assert.match(u.name(0, 0, 0), /extended=false/)
})

test('门：按钮按下门开（两半一起），石头按钮 20 tick 后弹起，门关上', () => {
  const w = new World()
  w.place('oak_door', [0, -1, 0], Dir.up)
  w.set(1, 0, 0, BlockType.stone)
  w.place('stone_button', [1, 0, 0], Dir.south) // 按钮在门旁边那块石头的南面
  w.use(1, 0, 1)
  assert.equal(w.prop(0, 0, 0, 'open'), 'true')
  assert.equal(w.prop(0, 1, 0, 'open'), 'true')
  w.ticks(19)
  assert.equal(w.prop(0, 0, 0, 'open'), 'true')
  w.ticks(1)
  assert.equal(w.prop(1, 0, 1, 'powered'), 'false')
  assert.equal(w.prop(0, 0, 0, 'open'), 'false')
})
