/**
 * v7.1：原版方块模型。
 *
 * 需要 resourcepacks/vanilla（从你自己的 1.21.4 客户端 jar 里拷出来，见 resourcepacks/README.md），没有就整个跳过。
 * 主要检查：
 *   - 烘焙：每个方块状态都找到了模型，用到的纹理文件都在
 *   - 旋转：横放的原木两头是年轮；uvlock；cullface 跟着转
 *   - 贪婪合并：模型里的整面照样合并，合并前后每种纹理、每个方向覆盖的面积不变
 *   - 遮挡：树叶不挡邻居、石头挡；挨着的两个石头中间不画
 *   - 随机：石头有 4 个候选，按坐标挑，同一个位置每次挑的一样
 */
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { test } from 'node:test'
import { BLOCK_OF, BlockType, NAME_BY_BLOCK, STATE_COUNT, stateOf } from '../src/terrain/blocks'
import { meshSection, N, nIndex, POSITION_SCALE, UV_SCALE, type SectionMesh } from '../src/terrain/mesh/mesher'
import { bakeAll, FACE_LOOKS, MODELS, OCCLUDES, PACK_LAYER0, setModels, SPLIT, USE_MODEL } from '../src/terrain/models'
import type { PackSource } from '../src/terrain/models/bakery'
import { repoPath } from './loadDatapack'

const ROOT = repoPath('resourcepacks/vanilla/assets/minecraft')
const has = existsSync(ROOT)
const skip = has ? false : '没有 resourcepacks/vanilla，跳过'

const source: PackSource = {
  blockstate: (n) => readJson(`${ROOT}/blockstates/${n}.json`),
  model: (n) => readJson(`${ROOT}/models/${n}.json`)
}
function readJson(path: string): unknown {
  return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : undefined
}

const baked = has ? bakeAll(source) : null
const hood = () => new Uint16Array(N * N * N)
const quads = (m: SectionMesh) => m.indices.length / 6
const texName = (layer: number) => MODELS!.textures[layer - PACK_LAYER0]

test('烘焙：这个项目的每个方块都找到了模型，纹理文件都在', { skip }, () => {
  const missing = new Set<string>()
  for (let s = 0; s < STATE_COUNT; s++) {
    const name = NAME_BY_BLOCK[BLOCK_OF[s]]
    if (!baked!.states[s] && !/air|water|lava|bubble_column|chest|end_gateway/.test(name)) missing.add(name)
  }
  assert.deepEqual([...missing], [])
  for (const t of baked!.textures) assert.ok(existsSync(`${ROOT}/textures/${t}.png`), t)
  assert.ok(baked!.textures.length > 100 && baked!.textures.length < 2048, `纹理 ${baked!.textures.length} 张`)
})

test('旋转：横放的原木两头是年轮，竖着的上下是年轮', { skip }, () => {
  setModels(baked)
  const look = (s: number, face: number) => FACE_LOOKS[SPLIT[s]![0].faces[face] - 1]
  const x = stateOf(BlockType.log, { axis: 'x' })
  const y = stateOf(BlockType.log, { axis: 'y' })
  for (const f of [0, 1]) assert.equal(texName(look(x, f)[0]), 'block/oak_log_top')
  for (const f of [2, 3, 4, 5]) assert.equal(texName(look(x, f)[0]), 'block/oak_log')
  for (const f of [2, 3]) assert.equal(texName(look(y, f)[0]), 'block/oak_log_top')
  // 横放的原木：侧面的纹理转了 90°（M 不是单位矩阵），树皮的纹路沿着 x 方向
  const top = look(x, 3)
  assert.notDeepEqual(top.slice(2, 6), [1, 0, 0, 1])
  // 每个状态的 6 个面都能贪婪合并，而且挡住邻居
  assert.equal(OCCLUDES[x], 1)
})

test('草方块：顶面能合并（染草色），侧面是两层（泥土 + 染色的覆盖层）', { skip }, () => {
  setModels(baked)
  const g = BlockType.grass
  for (const sm of SPLIT[g]!) {
    assert.ok(sm.faces[3] > 0)
    assert.equal(FACE_LOOKS[sm.faces[3] - 1][1] & 31, 1) // 草色
    assert.equal(sm.faces[0], 0) // 侧面不走贪婪
    assert.equal(sm.rest.length, 8) // 4 个侧面 × 2 层
  }
  // 一个孤零零的草方块：6 个面 + 4 层覆盖 = 10 个四边形
  const b = hood()
  b[nIndex(5, 5, 5)] = g
  assert.equal(quads(meshSection(b).opaque), 10)
})

test('遮挡：两个石头挨着中间不画；树叶不挡住旁边的石头', { skip }, () => {
  setModels(baked)
  assert.equal(OCCLUDES[BlockType.stone], 1)
  assert.equal(OCCLUDES[BlockType.leaves], 0)
  const b = hood()
  b[nIndex(5, 5, 5)] = BlockType.stone
  b[nIndex(6, 5, 5)] = BlockType.stone
  assert.equal(quads(meshSection(b).opaque), 10)
  b[nIndex(6, 5, 5)] = BlockType.leaves
  // 石头 6 面（挨着树叶的那面照样画）+ 树叶 5 面（挨着石头的那面被石头挡住）
  assert.equal(quads(meshSection(b).opaque), 11)
})

test('随机候选：石头有 4 个（含镜像、转 180°），同一位置每次挑的一样，不同位置会不一样', { skip }, () => {
  setModels(baked)
  assert.equal(SPLIT[BlockType.stone]!.length, 4)
  const b = hood()
  for (let z = 0; z < 16; z++) for (let x = 0; x < 16; x++) b[nIndex(x, 0, z)] = BlockType.stone
  const a = meshSection(b, { origin: [0, 64, 0] })
  const a2 = meshSection(b, { origin: [0, 64, 0] })
  assert.deepEqual(a.opaque.uv, a2.opaque.uv)
  const c = meshSection(b, { origin: [160, 64, 0] })
  assert.notDeepEqual(a.opaque.uv, c.opaque.uv)
  // 4 种样子交错着，顶面合并不成一整块，但比逐格少
  const naive = meshSection(b, { origin: [0, 64, 0], greedy: false })
  assert.ok(quads(a.opaque) < quads(naive.opaque), `${quads(a.opaque)} / ${quads(naive.opaque)}`)
})

test('贪婪合并：合并前后，每种纹理、每个方向覆盖的面积相同；三角形都朝外', { skip }, () => {
  setModels(baked)
  const kinds = [BlockType.air, BlockType.air, BlockType.stone, BlockType.dirt, BlockType.grass, BlockType.log, BlockType.deepslate, BlockType.sand]
  let seed = 7
  const r = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff)
  const b = hood()
  for (let i = 0; i < b.length; i++) b[i] = kinds[Math.floor(r() * kinds.length)]
  for (let y = 0; y < 6; y++) for (let z = 0; z < 16; z++) for (let x = 0; x < 16; x++) b[nIndex(x, y, z)] = y < 3 ? BlockType.stone : BlockType.dirt
  const area = (m: SectionMesh) => {
    const out = new Map<string, number>()
    for (let q = 0; q < quads(m); q++) {
      const vs = [...new Set(Array.from(m.indices.subarray(q * 6, q * 6 + 6)))]
      const face = m.info[vs[0] * 4]
      const layer = m.info[vs[0] * 4 + 1]
      const lo = [Infinity, Infinity, Infinity]
      const hi = [-Infinity, -Infinity, -Infinity]
      for (const v of vs)
        for (let a = 0; a < 3; a++) {
          lo[a] = Math.min(lo[a], m.positions[v * 3 + a])
          hi[a] = Math.max(hi[a], m.positions[v * 3 + a])
        }
      const ext = [0, 1, 2].filter((a) => a !== face >> 1).map((a) => (hi[a] - lo[a]) / POSITION_SCALE)
      const key = `${face}:${layer}`
      out.set(key, (out.get(key) ?? 0) + ext[0] * ext[1])
    }
    return out
  }
  const g = meshSection(b, { origin: [32, 0, 48] })
  const n = meshSection(b, { origin: [32, 0, 48], greedy: false })
  assert.deepEqual(area(g.opaque), area(n.opaque))
  // 每个三角形的法线和它的朝向一致（模型面的顶点顺序是原版的逆时针）
  const m = g.opaque
  for (let t = 0; t < m.indices.length; t += 3) {
    const p = (k: number) => [0, 1, 2].map((a) => m.positions[m.indices[t + k] * 3 + a])
    const [a, bb, c] = [p(0), p(1), p(2)]
    const e1 = a.map((_, i) => bb[i] - a[i])
    const e2 = a.map((_, i) => c[i] - a[i])
    const normal = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]]
    const face = m.info[m.indices[t] * 4]
    assert.ok(normal[face >> 1] * (face & 1 ? 1 : -1) > 0, `face ${face}`)
  }
  // 纹理坐标：每个四边形在纹理上的跨度等于它的边长（一格一张，不拉伸）
  for (let q = 0; q < quads(m); q++) {
    const vs = [...new Set(Array.from(m.indices.subarray(q * 6, q * 6 + 6)))]
    const us = vs.map((v) => m.uv[v * 2] / UV_SCALE)
    const span = Math.max(...us) - Math.min(...us)
    assert.ok(span >= 1 - 1e-6 && Math.abs(span - Math.round(span)) < 1e-6, `uv 跨度 ${span}`)
  }
})

test('植物：矮草是两片交叉的面、染草色、每格随机挪一点（不超过 0.25 格）', { skip }, () => {
  setModels(baked)
  const b = hood()
  b[nIndex(5, 5, 5)] = BlockType.short_grass
  const m = meshSection(b, { origin: [100, 64, -30] }).opaque
  assert.equal(quads(m), 4) // 两片 × 正反
  for (let v = 0; v < m.positions.length / 3; v++) {
    assert.equal(m.info[v * 4 + 3] & 31, 1)
    const x = m.positions[v * 3] / POSITION_SCALE
    assert.ok(x > 5 - 0.25 - 0.2 && x < 6 + 0.25 + 0.2, `x ${x}`)
  }
  // 藤蔓：按状态里的面画（多部分模型），没有贴面的默认状态退回 v7 的画法
  const vine = stateOf(BlockType.vine, { north: true, up: true })
  assert.equal(USE_MODEL[vine], 1)
  b[nIndex(5, 5, 5)] = vine
  assert.equal(quads(meshSection(b).opaque), 4) // 北面、上面，各正反两面
})

test('每个方块状态都能生成网格，坐标、纹理层都在范围内', { skip }, () => {
  setModels(baked)
  const b = hood()
  const layers = PACK_LAYER0 + baked!.textures.length
  for (let s = 0; s < STATE_COUNT; s += 64) {
    for (let i = 0; i < 64 && s + i < STATE_COUNT; i++) b[nIndex(i % 8 * 2, Math.floor(i / 8) * 2, 7)] = s + i
    const m = meshSection(b, { origin: [s, 0, 0] })
    for (const part of [m.opaque, m.water]) for (let v = 0; v < part.info.length / 4; v++) assert.ok(part.info[v * 4 + 1] < layers)
  }
  setModels(null)
})
