import { BLOCK_BY_NAME, BLOCK_OF, BlockType, COLLISION, FLUIDS, FluidKind, NAME_BY_STATE, propOf, stateOf, STURDY, withState } from './blocks'
import TAGS from './worldgen/feature/blockTags.json'

/**
 * 放方块、方块更新（v9）：原版的 getStateForPlacement 和 updateShape。
 *
 * 原版放一个方块分两步：
 *   1. getStateForPlacement：按点的哪一面、点在面上哪个位置、玩家朝哪边，定出这个方块的状态
 *      （楼梯朝哪、上半还是下半，原木的轴，火把插在墙上还是地上……）
 *   2. 放下以后通知 6 个邻居：每个邻居调用 updateShape(自己, 方向, 新邻居)，按新邻居改自己的状态
 *      （栅栏连过来，楼梯拐弯，门的另一半跟着开关、跟着被挖掉……）。邻居改了又会通知它的邻居
 * 挖方块也一样，只是放的是空气。
 *
 * 这里照抄了常见的几类方块；红石线、箱子拼成大箱子、能不能“存活”（比如火把底下的方块被挖掉）还没做。
 */

/** 读方块的接口：没加载的地方返回 null */
export interface PlaceWorld {
  get(x: number, y: number, z: number): number | null
}

// ---------------------------------------------------------------- 方向（原版 Direction 的顺序）

export const enum Dir {
  down = 0,
  up = 1,
  north = 2,
  south = 3,
  west = 4,
  east = 5
}
export const DIR_NAMES = ['down', 'up', 'north', 'south', 'west', 'east'] as const
export const DIR_VEC: readonly [number, number, number][] = [
  [0, -1, 0],
  [0, 1, 0],
  [0, 0, -1],
  [0, 0, 1],
  [-1, 0, 0],
  [1, 0, 0]
]
const HORIZONTAL = [Dir.north, Dir.east, Dir.south, Dir.west] // 顺时针
export const opposite = (d: Dir): Dir => (d ^ 1) as Dir
export const clockwise = (d: Dir): Dir => HORIZONTAL[(HORIZONTAL.indexOf(d) + 1) % 4]
export const counterClockwise = (d: Dir): Dir => HORIZONTAL[(HORIZONTAL.indexOf(d) + 3) % 4]
const axisOf = (d: Dir) => (d < 2 ? 'y' : d < 4 ? 'z' : 'x')
const dirByName = (n: string | undefined): Dir => DIR_NAMES.indexOf(n as (typeof DIR_NAMES)[number]) as Dir

/** 法线 → 方向 */
export function dirOf(nx: number, ny: number, nz: number): Dir {
  return DIR_VEC.findIndex(([x, y, z]) => x === nx && y === ny && z === nz) as Dir
}

/**
 * 玩家的朝向 → 原版的 yRot（角度）。我们的 yaw 0 朝北、逆时针增加；原版 0 朝南、顺时针增加（见 save/WorldSave.vanillaPlayer）
 */
export const vanillaYaw = (yaw: number) => 180 - (yaw * 180) / Math.PI

/** 原版 Direction.fromYRot：玩家面朝的水平方向 */
export function horizontalDir(yaw: number): Dir {
  return [Dir.south, Dir.west, Dir.north, Dir.east][Math.floor(vanillaYaw(yaw) / 90 + 0.5) & 3]
}

/** 原版 nearestLookingDirection：视线最接近的方向（包括上下） */
export function lookDir(yaw: number, pitch: number): Dir {
  const v = [-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch)]
  let best = Dir.north
  let bestDot = -Infinity
  for (let d = 0; d < 6; d++) {
    const dot = v[0] * DIR_VEC[d][0] + v[1] * DIR_VEC[d][1] + v[2] * DIR_VEC[d][2]
    if (dot > bestDot) {
      bestDot = dot
      best = d as Dir
    }
  }
  return best
}

// ---------------------------------------------------------------- 方块分类

const T = TAGS as unknown as Record<string, string[]>
const tagSets = new Map<string, Set<string>>()
/** 方块在不在原版的方块标签里 */
export function inTag(tag: string, s: number): boolean {
  let set = tagSets.get(tag)
  if (!set) tagSets.set(tag, (set = new Set(T[tag] ?? [])))
  return set.has(nameOf(s))
}
/** 不带命名空间的方块名 */
const nameOf = (s: number) => (NAME_BY_STATE[s] ?? '').slice(10)
const block = (name: string) => BLOCK_BY_NAME[`minecraft:${name}`]
const isBlock = (s: number, name: string) => BLOCK_OF[s] === block(name)

/** 原版 IronBarsBlock：铁栏杆和所有玻璃板 */
const isPane = (s: number) => /^(iron_bars|glass_pane|.+_stained_glass_pane)$/.test(nameOf(s))
/** 原版 Block.isExceptionForConnection：这些方块的面再坚固，栅栏、墙、玻璃板也不连过去 */
const isConnectionException = (s: number) => /_leaves$|^(barrier|carved_pumpkin|jack_o_lantern|melon|pumpkin)$/.test(nameOf(s)) || inTag('shulker_boxes', s)
/** 方向 d 上的邻居 n，朝着我们的那一面坚固吗 */
const sturdyToward = (n: number, d: Dir) => (STURDY[n] >> opposite(d)) & 1
/** 原版 FenceGateBlock.connectsToDirection：栅栏门横着挡在这个方向上 */
const gateConnects = (gate: number, d: Dir) => inTag('fence_gates', gate) && axisOf(dirByName(propOf(gate, 'facing'))) === axisOf(clockwise(d))
/** 能被直接替换掉：空气、水、岩浆（流动的也算）、草、雪层……（原版 replaceable 标签） */
const replaceable = (s: number) => s === BlockType.air || inTag('replaceable', s) || NAME_BY_STATE[s] === 'minecraft:water' || NAME_BY_STATE[s] === 'minecraft:lava'
const isWaterSource = (s: number) => FLUIDS[s].kind === FluidKind.water && FLUIDS[s].source

// ---------------------------------------------------------------- 连接（栅栏、墙、玻璃板）

/** 原版 FenceBlock.connectsTo */
function fenceConnects(self: number, n: number, d: Dir): boolean {
  const sameFence = inTag('fences', n) && inTag('wooden_fences', n) === inTag('wooden_fences', self)
  return (!isConnectionException(n) && sturdyToward(n, d) === 1) || sameFence || gateConnects(n, d)
}
/** 原版 WallBlock.connectsTo */
function wallConnects(n: number, d: Dir): boolean {
  return inTag('walls', n) || (!isConnectionException(n) && sturdyToward(n, d) === 1) || isPane(n) || gateConnects(n, d)
}
/** 原版 IronBarsBlock.attachsTo */
function paneConnects(n: number, d: Dir): boolean {
  return (!isConnectionException(n) && sturdyToward(n, d) === 1) || isPane(n) || inTag('walls', n)
}

/**
 * 墙（原版 WallBlock.makeWallState）：每一边 none / low / tall，中间的柱子 up。
 * 原版按“上面那个方块的底面形状盖没盖住这一边”判断 tall；这里简化成：上面是底面完整的方块，或者是同一边也连着的墙
 */
function wallState(w: PlaceWorld, x: number, y: number, z: number, s: number): number {
  const above = w.get(x, y + 1, z) ?? BlockType.air
  const aboveFull = (STURDY[above] >> Dir.down) & 1
  const sides: Record<string, string> = {}
  for (const d of HORIZONTAL) {
    const [dx, , dz] = DIR_VEC[d]
    const n = w.get(x + dx, y, z + dz) ?? BlockType.air
    const name = DIR_NAMES[d]
    const connected = wallConnects(n, d)
    const tall = aboveFull || (inTag('walls', above) && propOf(above, name) !== 'none')
    sides[name] = connected ? (tall ? 'tall' : 'low') : 'none'
  }
  // 原版 shouldRaisePost：上面是有柱子的墙 → 有；不是一条直线（或者四面都不连）→ 有；两边都是 tall 的直线 → 没有；
  // 否则看上面的方块（火把、告示牌之类，或者底面完整的方块）
  const none = (k: string) => sides[k] === 'none'
  let up: boolean
  if (inTag('walls', above) && propOf(above, 'up') === 'true') up = true
  else if ((none('north') && none('south') && none('east') && none('west')) || none('north') !== none('south') || none('east') !== none('west')) up = true
  else if ((sides.north === 'tall' && sides.south === 'tall') || (sides.east === 'tall' && sides.west === 'tall')) up = false
  else up = aboveFull === 1 || /torch|sign|banner|lantern|skull|head$|candle/.test(nameOf(above))
  return withState(s, { ...sides, up })
}

// ---------------------------------------------------------------- 楼梯

const isStairs = (s: number) => inTag('stairs', s)

/** 原版 StairBlock.getStairsShape */
function stairsShape(w: PlaceWorld, x: number, y: number, z: number, s: number): string {
  const facing = dirByName(propOf(s, 'facing'))
  const half = propOf(s, 'half')
  const at = (d: Dir) => {
    const [dx, dy, dz] = DIR_VEC[d]
    return w.get(x + dx, y + dy, z + dz) ?? BlockType.air
  }
  // 原版 canTakeShape：那一边不是同朝向、同上下的楼梯
  const canTake = (d: Dir) => {
    const o = at(d)
    return !isStairs(o) || propOf(o, 'facing') !== propOf(s, 'facing') || propOf(o, 'half') !== half
  }
  const front = at(facing)
  if (isStairs(front) && propOf(front, 'half') === half) {
    const d1 = dirByName(propOf(front, 'facing'))
    if (axisOf(d1) !== axisOf(facing) && canTake(opposite(d1))) return d1 === counterClockwise(facing) ? 'outer_left' : 'outer_right'
  }
  const back = at(opposite(facing))
  if (isStairs(back) && propOf(back, 'half') === half) {
    const d2 = dirByName(propOf(back, 'facing'))
    if (axisOf(d2) !== axisOf(facing) && canTake(d2)) return d2 === counterClockwise(facing) ? 'inner_left' : 'inner_right'
  }
  return 'straight'
}

// ---------------------------------------------------------------- updateShape

/**
 * 原版 updateShape：方块 s 在 (x,y,z)，方向 d 上的邻居变成了 n，s 要变成什么（可能变成空气：门的另一半没了）
 */
export function updateShape(w: PlaceWorld, x: number, y: number, z: number, s: number, d: Dir, n: number): number {
  const name = nameOf(s)
  // 含水的方块：原版在这里安排水的计划刻，我们的流体按格子更新，不用管
  if (inTag('doors', s)) {
    // 原版 DoorBlock.updateShape：上下两半互相抄状态；另一半没了自己也没了
    const half = propOf(s, 'half')
    if (d < 2 && (half === 'lower') === (d === Dir.up)) {
      return inTag('doors', n) && propOf(n, 'half') !== half ? withState(n, { half: half! }) : BlockType.air
    }
    return s
  }
  const half = propOf(s, 'half')
  if ((half === 'lower' || half === 'upper') && !inTag('doors', s)) {
    // 原版 DoublePlantBlock.updateShape：两格高的花草，另一半没了自己也没了
    if (d < 2 && (half === 'lower') === (d === Dir.up) && !(BLOCK_OF[n] === BLOCK_OF[s] && propOf(n, 'half') !== half)) return BlockType.air
    return s
  }
  if (inTag('beds', s)) {
    // 原版 BedBlock.updateShape：脚朝 facing 是头，头朝反方向是脚
    const facing = dirByName(propOf(s, 'facing'))
    const toOther = propOf(s, 'part') === 'foot' ? facing : opposite(facing)
    if (d === toOther) return BLOCK_OF[n] === BLOCK_OF[s] && propOf(n, 'part') !== propOf(s, 'part') ? withState(s, { occupied: propOf(n, 'occupied') ?? 'false' }) : BlockType.air
    return s
  }
  if (d >= 2) {
    const side = DIR_NAMES[d]
    if (inTag('fences', s)) return withState(s, { [side]: fenceConnects(s, n, d) })
    if (isPane(s)) return withState(s, { [side]: paneConnects(n, d) })
    if (inTag('fence_gates', s)) {
      // 原版 FenceGateBlock：两边（垂直于门的方向）有墙时门矮一截
      const facing = dirByName(propOf(s, 'facing'))
      if (axisOf(clockwise(facing)) !== axisOf(d)) return s
      const [ax, , az] = DIR_VEC[clockwise(facing)]
      const a = w.get(x + ax, y, z + az) ?? BlockType.air
      const b = w.get(x - ax, y, z - az) ?? BlockType.air
      return withState(s, { in_wall: inTag('walls', a) || inTag('walls', b) })
    }
  }
  if (inTag('walls', s) && d !== Dir.down) return wallState(w, x, y, z, s)
  if (isStairs(s) && d >= 2) return withState(s, { shape: stairsShape(w, x, y, z, s) })
  if (d === Dir.up && propOf(s, 'snowy') !== undefined && /^(grass_block|podzol|mycelium)$/.test(name)) {
    // 原版 SnowyDirtBlock：上面是雪（雪块或雪层）就是 snowy
    return withState(s, { snowy: isBlock(n, 'snow') || isBlock(n, 'snow_block') || isBlock(n, 'powder_snow') })
  }
  return s
}

// ---------------------------------------------------------------- 放方块

export interface PlaceContext {
  /** 要放的方块（默认状态） */
  block: number
  /** 点到的方块 */
  clicked: [number, number, number]
  /** 点到的面（从点到的方块指向外面） */
  face: Dir
  /** 点在哪：世界坐标 */
  hit: [number, number, number]
  /** 玩家的朝向（我们的弧度，见 control） */
  yaw: number
  pitch: number
}

/** 放下去要改的格子：[x, y, z, 状态]。放不了返回 null */
export type Placement = [number, number, number, number][]

/** 立着的 → 贴墙的：火把、告示牌、旗帜、头颅、珊瑚扇 */
function wallVariant(name: string): number | undefined {
  const map: [RegExp, string][] = [
    [/^torch$/, 'wall_torch'],
    [/^soul_torch$/, 'soul_wall_torch'],
    [/^redstone_torch$/, 'redstone_wall_torch'],
    [/^(.+)_sign$/, '$1_wall_sign'],
    [/^(.+)_hanging_sign$/, '$1_wall_hanging_sign'],
    [/^(.+)_banner$/, '$1_wall_banner'],
    [/^(.+)_skull$/, '$1_wall_skull'],
    [/^(.+)_head$/, '$1_wall_head'],
    [/^(.+)_coral_fan$/, '$1_coral_wall_fan']
  ]
  for (const [re, to] of map) if (re.test(name)) return block(name.replace(re, to))
  return undefined
}

/**
 * 原版 getStateForPlacement（+ BlockItem 的几种特殊情况：台阶叠成双层、雪层加厚、门 / 床 / 两格高的花放两格）。
 * 放下以后还要调用 neighborUpdates 通知邻居（见 Control.placeBlock）
 */
export function placement(w: PlaceWorld, ctx: PlaceContext): Placement | null {
  const [cx, cy, cz] = ctx.clicked
  const clickedState = w.get(cx, cy, cz)
  if (clickedState === null) return null
  const b = ctx.block
  const name = nameOf(b)
  const player = horizontalDir(ctx.yaw)

  // 点到的方块能不能直接被替换（原版 canBeReplaced）：同种下半台阶点顶面 → 双层；雪层点顶面 → 加一层；草之类本来就能替换
  let [x, y, z] = [cx + DIR_VEC[ctx.face][0], cy + DIR_VEC[ctx.face][1], cz + DIR_VEC[ctx.face][2]]
  const slabMerge = (s: number, face: Dir) =>
    BLOCK_OF[s] === BLOCK_OF[b] && inTag('slabs', s) && ((propOf(s, 'type') === 'bottom' && face === Dir.up) || (propOf(s, 'type') === 'top' && face === Dir.down))
  if (slabMerge(clickedState, ctx.face) || (isBlock(b, 'snow') && isBlock(clickedState, 'snow') && ctx.face === Dir.up && Number(propOf(clickedState, 'layers')) < 8) || (inTag('replaceable', clickedState) && !isBlock(clickedState, 'snow'))) {
    ;[x, y, z] = [cx, cy, cz]
  }
  const here = w.get(x, y, z)
  if (here === null) return null
  const hitY = ctx.hit[1] - y // 点在这一格的哪个高度（0..1）

  // 台阶：放进已经有同种台阶的格子 → 双层
  if (inTag('slabs', b)) {
    if (BLOCK_OF[here] === BLOCK_OF[b] && propOf(here, 'type') !== 'double') return [[x, y, z, withState(here, { type: 'double', waterlogged: false })]]
    if (!replaceable(here)) return null
    const top = ctx.face === Dir.down || (ctx.face !== Dir.up && hitY > 0.5)
    return [[x, y, z, withState(b, { type: top ? 'top' : 'bottom', waterlogged: isWaterSource(here) })]]
  }
  // 雪层：点到雪层的顶面 → 多一层
  if (isBlock(b, 'snow') && isBlock(here, 'snow')) {
    const layers = Number(propOf(here, 'layers'))
    return layers < 8 ? [[x, y, z, withState(here, { layers: layers + 1 })]] : null
  }
  if (!replaceable(here)) return null
  const water = isWaterSource(here)
  const finish = (s: number): number => {
    if (propOf(s, 'waterlogged') !== undefined) s = withState(s, { waterlogged: water })
    return s
  }

  // 贴墙的变体：点侧面放贴墙的（朝外），点顶面放立着的，点底面放不了（火把）/ 立着的
  const wall = wallVariant(name)
  if (wall !== undefined) {
    if (ctx.face >= 2) return [[x, y, z, finish(stateOf(wall, { facing: DIR_NAMES[ctx.face] }))]]
    if (ctx.face === Dir.down && /torch/.test(name)) return null
    // 立着的告示牌、旗帜、头颅：16 个方向（原版 RotationSegment.convertToSegment(yRot + 180)）
    const rotation = Math.floor((vanillaYaw(ctx.yaw) + 180) / 22.5 + 0.5) & 15
    return [[x, y, z, finish(propOf(b, 'rotation') !== undefined ? withState(b, { rotation }) : b)]]
  }

  // 两格的方块：门、床、两格高的花草
  if (inTag('doors', b)) {
    const above = w.get(x, y + 1, z)
    if (above === null || !replaceable(above)) return null
    const hinge = doorHinge(w, x, y, z, player, b, ctx.hit)
    const lower = withState(b, { facing: DIR_NAMES[player], hinge, half: 'lower', open: false, powered: false })
    return [
      [x, y, z, lower],
      [x, y + 1, z, withState(lower, { half: 'upper' })]
    ]
  }
  if (inTag('beds', b)) {
    const [dx, , dz] = DIR_VEC[player]
    const head = w.get(x + dx, y, z + dz)
    if (head === null || !replaceable(head)) return null
    const foot = withState(b, { facing: DIR_NAMES[player], part: 'foot' })
    return [
      [x, y, z, foot],
      [x + dx, y, z + dz, withState(foot, { part: 'head' })]
    ]
  }
  if (propOf(b, 'half') === 'lower') {
    const above = w.get(x, y + 1, z)
    if (above === null || !replaceable(above)) return null
    let lower = finish(b)
    if (propOf(b, 'facing') !== undefined) lower = withState(lower, { facing: DIR_NAMES[opposite(player)] }) // 小型垂滴叶
    const aboveWater = isWaterSource(above)
    let upper = withState(lower, { half: 'upper' })
    if (propOf(upper, 'waterlogged') !== undefined) upper = withState(upper, { waterlogged: aboveWater })
    return [
      [x, y, z, lower],
      [x, y + 1, z, upper]
    ]
  }

  let s = b
  // 楼梯：朝玩家看的方向，点上半 / 底面 → 倒过来
  if (inTag('stairs', b)) {
    const top = ctx.face === Dir.down || (ctx.face !== Dir.up && hitY > 0.5)
    s = withState(b, { facing: DIR_NAMES[player], half: top ? 'top' : 'bottom' })
  } else if (inTag('trapdoors', b)) {
    // 原版 TrapDoorBlock：点侧面 → 朝那一面，按点的高度分上下；点顶面 / 底面 → 朝玩家，顶面放下半、底面放上半
    s =
      ctx.face >= 2
        ? withState(b, { facing: DIR_NAMES[ctx.face], half: hitY > 0.5 ? 'top' : 'bottom' })
        : withState(b, { facing: DIR_NAMES[opposite(player)], half: ctx.face === Dir.up ? 'bottom' : 'top' })
  } else if (inTag('fence_gates', b)) {
    s = withState(b, { facing: DIR_NAMES[player] })
  } else if (isBlock(b, 'ladder')) {
    if (ctx.face < 2) return null
    s = withState(b, { facing: DIR_NAMES[ctx.face] })
  } else if (propOf(b, 'face') !== undefined) {
    // 按钮、拉杆、砂轮：地上 / 天花板上朝玩家，墙上朝外
    s = ctx.face >= 2 ? withState(b, { face: 'wall', facing: DIR_NAMES[ctx.face] }) : withState(b, { face: ctx.face === Dir.up ? 'floor' : 'ceiling', facing: DIR_NAMES[player] })
  } else if (propOf(b, 'axis') !== undefined) {
    s = withState(b, { axis: axisOf(ctx.face) })
  } else if (propOf(b, 'facing') !== undefined) {
    s = withState(b, { facing: facingFor(b, name, ctx, player) })
  }
  // 连接、形状：按周围的方块算一遍（和放下以后邻居通知自己的结果一样）
  s = finish(s)
  for (let d = 0; d < 6; d++) {
    const [dx, dy, dz] = DIR_VEC[d]
    const n = w.get(x + dx, y + dy, z + dz)
    if (n !== null) s = updateShape(w, x, y, z, s, d as Dir, n)
  }
  return [[x, y, z, s]]
}

/** 有 facing 属性的其他方块 */
function facingFor(b: number, name: string, ctx: PlaceContext, player: Dir): string {
  const six = propOf(withState(b, { facing: 'up' }), 'facing') === 'up' && propOf(withState(b, { facing: 'down' }), 'facing') === 'down'
  // 朝着点的那一面：紫水晶芽、末地烛、避雷针、潜影盒
  if (/amethyst|_bud$|end_rod|lightning_rod|shulker_box/.test(name)) return DIR_NAMES[ctx.face]
  // 漏斗：朝点的那一面的反方向，点顶面时朝下
  if (name === 'hopper') return ctx.face === Dir.up || ctx.face === Dir.down ? 'down' : DIR_NAMES[opposite(ctx.face)]
  if (six) {
    const look = lookDir(ctx.yaw, ctx.pitch)
    // 侦测器的“脸”朝玩家看的方向；活塞、发射器、投掷器、木桶的“脸”朝玩家
    return name === 'observer' ? DIR_NAMES[look] : DIR_NAMES[opposite(look)]
  }
  // 铁砧侧着放
  if (/anvil$/.test(name)) return DIR_NAMES[clockwise(player)]
  // 其余水平朝向的（熔炉、箱子、南瓜、中继器……）：脸朝玩家
  return DIR_NAMES[opposite(player)]
}

/** 原版 DoorBlock.getHinge：门轴放在哪边 */
function doorHinge(w: PlaceWorld, x: number, y: number, z: number, facing: Dir, door: number, hit: [number, number, number]): string {
  const left = counterClockwise(facing)
  const right = clockwise(facing)
  const at = (d: Dir, dy: number) => w.get(x + DIR_VEC[d][0], y + dy, z + DIR_VEC[d][2]) ?? BlockType.air
  const full = (s: number) => (COLLISION[s] === 1 ? 1 : 0)
  const i = -full(at(left, 0)) - full(at(left, 1)) + full(at(right, 0)) + full(at(right, 1))
  const isLowerDoor = (s: number) => BLOCK_OF[s] === BLOCK_OF[door] && propOf(s, 'half') === 'lower'
  const doorLeft = isLowerDoor(at(left, 0))
  const doorRight = isLowerDoor(at(right, 0))
  if ((!doorLeft || doorRight) && i <= 0) {
    if ((!doorRight || doorLeft) && i >= 0) {
      const [j, , k] = DIR_VEC[facing]
      const hx = hit[0] - x
      const hz = hit[2] - z
      return (j >= 0 || hz >= 0.5) && (j <= 0 || hz <= 0.5) && (k >= 0 || hx <= 0.5) && (k <= 0 || hx >= 0.5) ? 'left' : 'right'
    }
    return 'left'
  }
  return 'right'
}

// ---------------------------------------------------------------- 用方块（右键）

/** 右键能“用”的方块：木门、木活板门、栅栏门（铁的要红石）。返回用了之后的状态，不能用返回 null */
export function useBlock(s: number, yaw: number): number | null {
  if (inTag('wooden_doors', s) || inTag('wooden_trapdoors', s)) return withState(s, { open: propOf(s, 'open') !== 'true' })
  if (inTag('fence_gates', s)) {
    const open = propOf(s, 'open') === 'true'
    if (open) return withState(s, { open: false })
    // 原版：打开时如果玩家在门的另一边，门转过来朝玩家这边开
    const player = horizontalDir(yaw)
    const facing = dirByName(propOf(s, 'facing'))
    return withState(s, { open: true, facing: facing === opposite(player) ? DIR_NAMES[player] : DIR_NAMES[facing] })
  }
  return null
}

// ---------------------------------------------------------------- 通知邻居

/**
 * 原版 updateNeighbourShapes：(x,y,z) 变了，6 个邻居各自 updateShape；变了的邻居再通知它的邻居（最多 depth 层）。
 * set 负责真正写进世界（会顺便重建网格、更新光照）
 */
export function neighborUpdates(w: PlaceWorld, set: (x: number, y: number, z: number, s: number) => void, x: number, y: number, z: number, depth = 16): void {
  if (depth <= 0) return
  const s = w.get(x, y, z)
  if (s === null) return
  for (let d = 0; d < 6; d++) {
    const [dx, dy, dz] = DIR_VEC[d]
    const nx = x + dx
    const ny = y + dy
    const nz = z + dz
    const n = w.get(nx, ny, nz)
    if (n === null || n === BlockType.air) continue
    const next = updateShape(w, nx, ny, nz, n, opposite(d as Dir), s)
    if (next !== n) {
      set(nx, ny, nz, next)
      neighborUpdates(w, set, nx, ny, nz, depth - 1)
    }
  }
}
