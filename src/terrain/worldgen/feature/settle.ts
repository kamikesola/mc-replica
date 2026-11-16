import { NAME_BY_STATE, propOfStateId, STATE_COUNT, withState } from '../../blocks'
import { inTag } from './tags'

/**
 * 区块“落定”（v7）：原版的区块生成完、开始被游戏刻处理以后，计划刻会把一些方块状态再改一遍。
 * 原版存档里看到的是改完之后的样子，所以和原版对照、以及游戏里看到的，都应该是这一步之后的结果。
 *
 * 目前只有树叶的 distance：
 *   树放完时，原版在这棵树的包围盒里算一次 distance（TreeFeature.updateLeaves，见 tree.ts）。
 *   盒子边上的树叶会被安排一次方块刻，刻到时 distance = min(6 个邻居) + 1（原木算 0），变了就通知邻居再刻……
 *   最后基本等于“沿着树叶走到最近的原木要几步”（最多 7）。这里直接算这个最短路。
 *   原版存档里有约 1.4% 的树叶没有被刻到、保持着盒子里算的值（只在盒子里算，比最短路大），这部分我们对不上。
 *
 * 输入周围 3×3 个区块的方块（先 z 后 x，每个下标 (y * 16 + z) * 16 + x），只改中间那个区块，返回改了几格。
 * 树叶离原木最多 6 步，3×3 足够。
 */

const NONE = 255
/** 状态 → 树叶的 distance（不是有 distance 的树叶：255；persistent=true 的树叶也不改：255） */
const LEAF_DIST = new Uint8Array(STATE_COUNT).fill(NONE)
/** 状态 → 是不是原木（minecraft:logs 标签） */
const IS_LOG = new Uint8Array(STATE_COUNT)
for (let s = 0; s < STATE_COUNT; s++) {
  if (inTag(NAME_BY_STATE[s] ?? '', 'minecraft:logs')) IS_LOG[s] = 1
  const d = propOfStateId(s, 'distance')
  if (d !== undefined && propOfStateId(s, 'persistent') !== 'true') LEAF_DIST[s] = Number(d)
}

export function settleLeaves(nine: Uint16Array[], H: number): number {
  const W = 48
  const plane = W * W
  const dist = new Uint8Array(W * W * H).fill(7)
  const q: number[] = []
  const at = (x: number, y: number, z: number) => nine[(z >> 4) * 3 + (x >> 4)][(y * 16 + (z & 15)) * 16 + (x & 15)]
  for (let y = 0; y < H; y++)
    for (let z = 0; z < W; z++)
      for (let x = 0; x < W; x++)
        if (IS_LOG[at(x, y, z)]) {
          const i = (y * W + z) * W + x
          dist[i] = 0
          q.push(i)
        }
  for (let k = 0; k < q.length; k++) {
    const i = q[k]
    const d = dist[i]
    if (d >= 6) continue
    const x = i % W
    const z = Math.floor(i / W) % W
    const y = Math.floor(i / plane)
    const visit = (nx: number, ny: number, nz: number) => {
      if (nx < 0 || nx >= W || nz < 0 || nz >= W || ny < 0 || ny >= H) return
      const j = (ny * W + nz) * W + nx
      if (dist[j] <= d + 1 || LEAF_DIST[at(nx, ny, nz)] === NONE) return
      dist[j] = d + 1
      q.push(j)
    }
    visit(x - 1, y, z)
    visit(x + 1, y, z)
    visit(x, y - 1, z)
    visit(x, y + 1, z)
    visit(x, y, z - 1)
    visit(x, y, z + 1)
  }
  const center = nine[4]
  let changed = 0
  for (let y = 0; y < H; y++)
    for (let z = 0; z < 16; z++)
      for (let x = 0; x < 16; x++) {
        const ci = (y * 16 + z) * 16 + x
        const s = center[ci]
        const cur = LEAF_DIST[s]
        if (cur === NONE) continue
        const want = dist[(y * W + z + 16) * W + x + 16]
        if (want !== cur) {
          center[ci] = withState(s, { distance: want })
          changed++
        }
      }
  return changed
}
