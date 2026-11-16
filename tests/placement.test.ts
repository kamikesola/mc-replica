/**
 * v9：放方块的状态（原版 getStateForPlacement）和邻居更新（updateShape）。
 * 用一个 Map 当世界：没写的格子是空气，y < 0 是石头。
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { BlockType, fullStateName, parseState } from '../src/terrain/blocks'
import { Dir, horizontalDir, neighborUpdates, placement, useBlock, type PlaceContext } from '../src/terrain/placement'

const S = (name: string) => {
  const s = parseState(name.includes(':') ? name : `minecraft:${name}`)
  if (s === undefined) throw new Error(name)
  return s
}
/** 我们的 yaw：朝北 0、朝西 π/2、朝南 π、朝东 -π/2 */
const YAW = { north: 0, west: Math.PI / 2, south: Math.PI, east: -Math.PI / 2 }

class World {
  cells = new Map<string, number>()
  get = (x: number, y: number, z: number) => this.cells.get(`${x},${y},${z}`) ?? (y < 0 ? BlockType.stone : BlockType.air)
  set = (x: number, y: number, z: number, s: number) => void this.cells.set(`${x},${y},${z}`, s)
  name = (x: number, y: number, z: number) => fullStateName(this.get(x, y, z)).replace('minecraft:', '')
  /** 点 clicked 方块的 face 面放 block（点在面的中心，或者 hitY 指定高度） */
  place(block: string, clicked: [number, number, number], face: Dir, yaw: number, hitY = 0.5, hitXZ?: [number, number]) {
    const [cx, cy, cz] = clicked
    const n = [[0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1], [-1, 0, 0], [1, 0, 0]][face]
    const hit: [number, number, number] = [cx + 0.5 + n[0] * 0.5, cy + (n[1] ? 0.5 + n[1] * 0.5 : hitY), cz + 0.5 + n[2] * 0.5]
    if (hitXZ) [hit[0], hit[2]] = [cx + n[0] + hitXZ[0], cz + n[2] + hitXZ[1]]
    const ctx: PlaceContext = { block: S(block), clicked, face, hit, yaw, pitch: 0 }
    const r = placement(this, ctx)
    if (!r) return false
    for (const [x, y, z, s] of r) this.set(x, y, z, s)
    for (const [x, y, z] of r) neighborUpdates(this, this.set, x, y, z)
    return true
  }
  /** 挖掉 */
  break(x: number, y: number, z: number) {
    this.set(x, y, z, BlockType.air)
    neighborUpdates(this, this.set, x, y, z)
  }
}

test('朝向：原版 Direction.fromYRot', () => {
  assert.equal(horizontalDir(YAW.north), Dir.north)
  assert.equal(horizontalDir(YAW.south), Dir.south)
  assert.equal(horizontalDir(YAW.west), Dir.west)
  assert.equal(horizontalDir(YAW.east), Dir.east)
})

test('楼梯：朝玩家看的方向；点侧面的上半是倒着的；两个楼梯拼成拐角（原版 getStairsShape）', () => {
  const w = new World()
  w.place('oak_stairs', [0, -1, 0], Dir.up, YAW.north)
  assert.equal(w.name(0, 0, 0), 'oak_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]')
  w.place('oak_stairs', [5, -1, 0], Dir.up, YAW.north)
  w.place('oak_stairs', [5, 0, 0], Dir.east, YAW.north, 0.8) // 点 (5,0,0) 东面的上半 → (6,0,0) 倒着
  assert.equal(w.name(6, 0, 0), 'oak_stairs[facing=north,half=top,shape=straight,waterlogged=false]')
  // 朝北的楼梯前面（北边）放一个朝东的 → 外拐角
  const v = new World()
  v.place('stone_stairs', [0, -1, 0], Dir.up, YAW.north)
  v.place('stone_stairs', [0, -1, -1], Dir.up, YAW.east)
  assert.match(v.name(0, 0, 0), /shape=outer_right/)
  // 朝北的楼梯后面（南边）放一个朝东的 → 内拐角
  const u = new World()
  u.place('stone_stairs', [0, -1, 0], Dir.up, YAW.north)
  u.place('stone_stairs', [0, -1, 1], Dir.up, YAW.east)
  assert.match(u.name(0, 0, 0), /shape=inner_right/)
})

test('台阶：点顶面放下半、点底面放上半；同种的下半台阶点顶面叠成双层', () => {
  const w = new World()
  w.place('oak_slab', [0, -1, 0], Dir.up, YAW.north)
  assert.equal(w.name(0, 0, 0), 'oak_slab[type=bottom,waterlogged=false]')
  w.place('oak_slab', [0, 0, 0], Dir.up, YAW.north)
  assert.equal(w.name(0, 0, 0), 'oak_slab[type=double,waterlogged=false]')
  w.set(0, 5, 0, BlockType.stone)
  w.place('stone_slab', [0, 5, 0], Dir.down, YAW.north)
  assert.equal(w.name(0, 4, 0), 'stone_slab[type=top,waterlogged=false]')
})

test('栅栏：连到同类栅栏和坚固的面，不连树叶；下界砖栅栏不连木栅栏（原版 FenceBlock.connectsTo）', () => {
  const w = new World()
  w.set(1, 0, 0, BlockType.stone)
  w.set(-1, 0, 0, S('oak_leaves[distance=1,persistent=true,waterlogged=false]'))
  w.place('oak_fence', [0, -1, 0], Dir.up, YAW.north)
  assert.equal(w.name(0, 0, 0), 'oak_fence[east=true,north=false,south=false,waterlogged=false,west=false]')
  // 南边再放一根：两根互相连上（后放的通知先放的）
  w.place('spruce_fence', [0, -1, 1], Dir.up, YAW.north)
  assert.match(w.name(0, 0, 0), /south=true/)
  assert.match(w.name(0, 0, 1), /north=true/)
  w.place('nether_brick_fence', [0, -1, -1], Dir.up, YAW.north)
  assert.match(w.name(0, 0, 0), /north=false/)
  // 挖掉石头：东边断开
  w.break(1, 0, 0)
  assert.match(w.name(0, 0, 0), /east=false/)
})

test('墙：一条直线中间没有柱子，拐角和尽头有柱子；上面盖着方块时边是 tall', () => {
  const w = new World()
  for (const x of [0, 1, 2]) w.place('cobblestone_wall', [x, -1, 0], Dir.up, YAW.north)
  assert.equal(w.name(1, 0, 0), 'cobblestone_wall[east=low,north=none,south=none,up=false,waterlogged=false,west=low]')
  assert.match(w.name(0, 0, 0), /up=true/) // 尽头
  w.set(1, 1, 0, BlockType.stone)
  neighborUpdates(w, w.set, 1, 1, 0)
  assert.match(w.name(1, 0, 0), /east=tall/)
})

test('玻璃板、铁栏杆：互相连，也连墙', () => {
  const w = new World()
  w.place('glass_pane', [0, -1, 0], Dir.up, YAW.north)
  w.place('iron_bars', [1, -1, 0], Dir.up, YAW.north)
  assert.match(w.name(0, 0, 0), /east=true/)
  assert.match(w.name(1, 0, 0), /west=true/)
})

test('门：放两格，门轴按原版 getHinge；开门两半一起开；挖下半，上半也没了', () => {
  const w = new World()
  assert.ok(w.place('oak_door', [0, -1, 0], Dir.up, YAW.north, 0.5, [0.3, 0.5]))
  assert.equal(w.name(0, 0, 0), 'oak_door[facing=north,half=lower,hinge=left,open=false,powered=false]')
  assert.equal(w.name(0, 1, 0), 'oak_door[facing=north,half=upper,hinge=left,open=false,powered=false]')
  // 点在右半边 → 门轴在右
  const v = new World()
  v.place('oak_door', [0, -1, 0], Dir.up, YAW.north, 0.5, [0.8, 0.5])
  assert.match(v.name(0, 0, 0), /hinge=right/)
  // 左边是墙 → 门轴靠墙（左）
  const u = new World()
  u.set(-1, 0, 0, BlockType.stone)
  u.set(-1, 1, 0, BlockType.stone)
  u.place('oak_door', [0, -1, 0], Dir.up, YAW.north, 0.5, [0.8, 0.5])
  assert.match(u.name(0, 0, 0), /hinge=left/)
  // 开门：点上半，下半跟着开
  w.set(0, 1, 0, useBlock(w.get(0, 1, 0)!, 0)!)
  neighborUpdates(w, w.set, 0, 1, 0)
  assert.match(w.name(0, 0, 0), /open=true/)
  // 铁门右键开不了
  assert.equal(useBlock(S('iron_door[facing=north,half=lower,hinge=left,open=false,powered=false]'), 0), null)
  w.break(0, 0, 0)
  assert.equal(w.name(0, 1, 0), 'air')
  // 上面没地方放不了
  const t = new World()
  t.set(0, 1, 0, BlockType.stone)
  assert.equal(t.place('oak_door', [0, -1, 0], Dir.up, YAW.north), false)
})

test('床：脚在点的那一格，头朝玩家看的方向；挖掉一半，另一半也没了', () => {
  const w = new World()
  w.place('red_bed', [0, -1, 0], Dir.up, YAW.east)
  assert.equal(w.name(0, 0, 0), 'red_bed[facing=east,occupied=false,part=foot]')
  assert.equal(w.name(1, 0, 0), 'red_bed[facing=east,occupied=false,part=head]')
  w.break(1, 0, 0)
  assert.equal(w.name(0, 0, 0), 'air')
})

test('火把、告示牌：点侧面插在墙上（朝外），点顶面立着；火把不能倒挂；告示牌 16 个方向', () => {
  const w = new World()
  w.set(0, 0, 0, BlockType.stone)
  w.place('torch', [0, 0, 0], Dir.east, YAW.west)
  assert.equal(w.name(1, 0, 0), 'wall_torch[facing=east]')
  w.place('torch', [0, 0, 0], Dir.up, YAW.west)
  assert.equal(w.name(0, 1, 0), 'torch')
  assert.equal(w.place('torch', [0, 0, 0], Dir.down, YAW.west), false)
  // 告示牌：玩家朝北站 → 原版 yRot 180 → rotation = (180 + 180) / 22.5 = 16 → 0（字朝南，对着玩家）
  w.place('oak_sign', [5, -1, 5], Dir.up, YAW.north)
  assert.equal(w.name(5, 0, 5), 'oak_sign[rotation=0,waterlogged=false]')
  w.place('oak_sign', [7, -1, 5], Dir.up, YAW.east)
  assert.equal(w.name(7, 0, 5), 'oak_sign[rotation=4,waterlogged=false]')
})

test('其他：原木的轴、熔炉的脸朝玩家、活板门、两格高的花、雪层叠加、草方块被雪盖住', () => {
  const w = new World()
  w.place('birch_log', [0, -1, 0], Dir.up, YAW.north)
  w.place('birch_log', [0, 0, 0], Dir.east, YAW.north)
  assert.match(w.name(1, 0, 0), /axis=x/)
  w.place('furnace', [3, -1, 0], Dir.up, YAW.north)
  assert.match(w.name(3, 0, 0), /facing=south/)
  w.place('oak_trapdoor', [3, 0, 0], Dir.west, YAW.east, 0.7) // 点熔炉西面的上半
  assert.match(w.name(2, 0, 0), /facing=west,half=top/)
  w.place('sunflower', [5, -1, 0], Dir.up, YAW.north)
  assert.match(w.name(5, 1, 0), /sunflower\[half=upper/)
  w.break(5, 1, 0)
  assert.equal(w.name(5, 0, 0), 'air')
  w.set(8, 0, 0, S('grass_block[snowy=false]'))
  w.place('snow', [8, 0, 0], Dir.up, YAW.north)
  assert.equal(w.name(8, 0, 0), 'grass_block[snowy=true]')
  w.place('snow', [8, 1, 0], Dir.up, YAW.north)
  assert.equal(w.name(8, 1, 0), 'snow[layers=2]')
})

test('放进水里的方块含水；草、水可以直接被替换', () => {
  const w = new World()
  w.set(0, 0, 0, BlockType.water)
  w.place('oak_slab', [0, -1, 0], Dir.up, YAW.north)
  assert.equal(w.name(0, 0, 0), 'oak_slab[type=bottom,waterlogged=true]')
  w.set(2, 0, 0, BlockType.short_grass)
  w.place('stone', [2, 0, 0], Dir.up, YAW.north) // 点在草上：草被替换，石头放在草的位置
  assert.equal(w.name(2, 0, 0), 'stone')
})
