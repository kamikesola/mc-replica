/**
 * v1：section 存储（位压缩数组、调色板容器）和贪婪网格。
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { BLOCK_BITS, BlockType, FACE_TEXTURES } from '../src/terrain/blocks'
import BitStorage from '../src/terrain/chunk/BitStorage'
import Chunk from '../src/terrain/chunk/Chunk'
import PalettedContainer from '../src/terrain/chunk/PalettedContainer'
import Section from '../src/terrain/chunk/Section'
import { meshSection, N, nIndex, POSITION_SCALE, type SectionMesh } from '../src/terrain/mesh/mesher'
import { paintAll, TEXTURE_COUNT } from '../src/terrain/textures/painters'

/** 和 Math.random 无关的固定随机数，测试结果每次一样 */
function rand(seed: number) {
  let a = seed
  return () => ((a = (Math.imul(a, 1103515245) + 12345) >>> 0) / 4294967296)
}

test('BitStorage：每种位数写入再读出都一致，值不会跨两个整数', () => {
  for (const bits of [1, 2, 4, 5, 6, 7, 8, 13, 15]) {
    const s = new BitStorage(bits, 4096)
    assert.equal(s.data.length, Math.ceil(4096 / Math.floor(32 / bits)))
    const r = rand(bits)
    const ref = Array.from({ length: 4096 }, () => Math.floor(r() * (1 << bits)))
    ref.forEach((v, i) => s.set(i, v))
    ref.forEach((v, i) => assert.equal(s.get(i), v, `bits=${bits} i=${i}`))
  }
})

test('调色板：单值 → 4 位 → 5 位 → 直接模式，数据始终正确', () => {
  const c = new PalettedContainer(9, 0) // 假设全局有 2^9 种方块，能测到直接模式
  assert.equal(c.bits, 0)
  assert.equal(c.byteSize, 1) // 单值：只有调色板里的 1 项

  const ref = new Array(4096).fill(0)
  const r = rand(7)
  const write = (kinds: number, n: number) => {
    for (let k = 0; k < n; k++) {
      const i = Math.floor(r() * 4096)
      const v = Math.floor(r() * kinds)
      c.set(i, v)
      ref[i] = v
    }
  }
  write(2, 50)
  assert.equal(c.bits, 4) // 至少 4 位（原版规则）
  write(16, 2000)
  assert.equal(c.bits, 4) // 16 种以内还是 4 位
  write(20, 3000)
  assert.equal(c.bits, 5) // 超过 16 种 → 5 位
  write(300, 4000)
  assert.equal(c.bits, 9) // 超过 256 种 → 直接存全局 ID
  assert.equal(c.palette.length, 0)
  ref.forEach((v, i) => assert.equal(c.get(i), v))
})

test('调色板：fromValues 一次选出最小位数；toData / fromData 往返不变', () => {
  const r = rand(3)
  const values = Uint8Array.from({ length: 4096 }, () => (r() < 0.9 ? BlockType.stone : BlockType.dirt))
  const c = PalettedContainer.fromValues(values, BLOCK_BITS)
  assert.equal(c.bits, 4)
  assert.equal(c.byteSize, 2048 + 2)
  const d = PalettedContainer.fromData(c.toData(), BLOCK_BITS)
  for (let i = 0; i < 4096; i++) assert.equal(d.get(i), values[i])

  const air = PalettedContainer.fromValues(new Uint8Array(4096), BLOCK_BITS)
  assert.ok(air.isSingle)
  assert.equal(air.byteSize, 1)
})

test('Section 统计非空气方块数；Chunk 跨 section 读写', () => {
  const s = new Section()
  assert.ok(s.isEmpty)
  s.set(1, 2, 3, BlockType.stone)
  s.set(1, 2, 3, BlockType.dirt)
  s.set(0, 0, 0, BlockType.stone)
  assert.equal(s.nonAir, 2)
  s.set(0, 0, 0, BlockType.air)
  assert.equal(s.nonAir, 1)

  const c = new Chunk(0, 0, -64, 384)
  assert.equal(c.sections.length, 24)
  c.set(5, -64, 5, BlockType.bedrock)
  c.set(5, 319, 5, BlockType.glowstone)
  c.set(5, 0, 5, BlockType.planks)
  assert.equal(c.get(5, -64, 5), BlockType.bedrock)
  assert.equal(c.get(5, 319, 5), BlockType.glowstone)
  assert.equal(c.get(5, 0, 5), BlockType.planks)
  assert.equal(c.sectionIndex(0), 4)
  assert.equal(c.get(5, 320, 5), BlockType.air) // 世界外面当空气
})

// ---------------------------------------------------------------- 网格

const hood = () => new Uint8Array(N * N * N)
const quads = (m: SectionMesh) => m.indices.length / 6

test('贪婪网格：一整层平地只要 1 个四边形，逐面要 256 个', () => {
  const b = hood()
  for (let z = -1; z <= 16; z++) for (let x = -1; x <= 16; x++) b[nIndex(x, 0, z)] = BlockType.stone
  const greedy = meshSection(b)
  const naive = meshSection(b, { greedy: false })
  // 顶面 1 个 + 底面 1 个（section 下面是空气）。侧面被邻居挡住
  assert.equal(quads(greedy.opaque), 2)
  assert.equal(quads(naive.opaque), 512)
  // 合并后的矩形覆盖整个 16×16（坐标放大了 16 倍）
  const ys = new Set<number>()
  let maxX = 0
  for (let i = 0; i < greedy.opaque.positions.length; i += 3) {
    maxX = Math.max(maxX, greedy.opaque.positions[i])
    ys.add(greedy.opaque.positions[i + 1])
  }
  assert.equal(maxX, 16 * POSITION_SCALE)
  assert.deepEqual([...ys].sort((a, b) => a - b), [0, POSITION_SCALE])
})

test('贪婪网格：不同纹理不合并；AO 不均匀的面保持 1×1', () => {
  const b = hood()
  for (let z = 0; z < 16; z++) for (let x = 0; x < 16; x++) b[nIndex(x, 0, z)] = x < 8 ? BlockType.stone : BlockType.dirt
  // 在 (3,1,3) 放一个方块：它周围 8 个格子的顶面角会变暗
  b[nIndex(3, 1, 3)] = BlockType.stone
  const top = (m: SectionMesh) => {
    let n = 0
    for (let q = 0; q < m.indices.length / 6; q++) if (m.info[m.indices[q * 6] * 4] === 3) n++
    return n
  }
  const m = meshSection(b).opaque
  const naiveTop = top(meshSection(b, { greedy: false }).opaque)
  assert.equal(naiveTop, 256) // 255 个地面 + 1 个小方块的顶
  // 合并后：石头、泥土两块大区域被小方块周围的 8 个暗角面切开，但远少于 256
  assert.ok(top(m) > 2 && top(m) < 20, `顶面四边形 ${top(m)}`)
})

test('贪婪网格：合并前后，每种纹理、每个方向覆盖的面积完全相同', () => {
  // 随机的“洞穴”方块，覆盖各种情况
  const r = rand(42)
  const kinds = [BlockType.air, BlockType.air, BlockType.stone, BlockType.dirt, BlockType.grass, BlockType.log]
  const b = hood()
  for (let i = 0; i < b.length; i++) b[i] = kinds[Math.floor(r() * kinds.length)]
  // 再加一大块实心，让合并真正发生
  for (let y = 0; y < 8; y++) for (let z = 0; z < 16; z++) for (let x = 0; x < 16; x++) b[nIndex(x, y, z)] = BlockType.stone
  for (let z = -1; z <= 16; z++) for (let x = -1; x <= 16; x++) b[nIndex(x, 8, z)] = BlockType.air

  const area = (m: SectionMesh) => {
    const out = new Map<string, number>()
    for (let q = 0; q < m.indices.length / 6; q++) {
      const v0 = m.indices[q * 6]
      const face = m.info[v0 * 4]
      const layer = m.info[v0 * 4 + 1]
      // 四个顶点的包围盒（四边形都和坐标轴对齐）
      const vs = new Set<number>()
      for (let k = 0; k < 6; k++) vs.add(m.indices[q * 6 + k])
      const lo = [Infinity, Infinity, Infinity]
      const hi = [-Infinity, -Infinity, -Infinity]
      for (const v of vs) for (let a = 0; a < 3; a++) {
        lo[a] = Math.min(lo[a], m.positions[v * 3 + a])
        hi[a] = Math.max(hi[a], m.positions[v * 3 + a])
      }
      const ext = [0, 1, 2].filter((a) => a !== face >> 1).map((a) => (hi[a] - lo[a]) / POSITION_SCALE)
      const key = `${face}:${layer}`
      out.set(key, (out.get(key) ?? 0) + ext[0] * ext[1])
    }
    return out
  }
  const g = meshSection(b)
  const n = meshSection(b, { greedy: false })
  assert.deepEqual(area(g.opaque), area(n.opaque))
  assert.ok(quads(g.opaque) < quads(n.opaque), `合并后 ${quads(g.opaque)}，合并前 ${quads(n.opaque)}`)
})

test('贪婪网格：三角形从外面看是逆时针（法线朝外）', () => {
  const b = hood()
  b[nIndex(5, 5, 5)] = BlockType.stone
  const m = meshSection(b).opaque
  assert.equal(quads(m), 6)
  const p = (v: number) => [0, 1, 2].map((a) => m.positions[v * 3 + a])
  for (let t = 0; t < m.indices.length; t += 3) {
    const [a, bb, c] = [p(m.indices[t]), p(m.indices[t + 1]), p(m.indices[t + 2])]
    const e1 = a.map((_, i) => bb[i] - a[i])
    const e2 = a.map((_, i) => c[i] - a[i])
    const normal = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]]
    const face = m.info[m.indices[t] * 4]
    const axis = face >> 1
    const sign = face & 1 ? 1 : -1
    assert.ok(normal[axis] * sign > 0, `face ${face}`)
  }
})

test('水：只在挨着空气的地方画，水源的水面在 8/9 高度（原版）', () => {
  const b = hood()
  for (let z = -1; z <= 16; z++) for (let x = -1; x <= 16; x++) for (let y = -1; y <= 3; y++) b[nIndex(x, y, z)] = BlockType.water
  const w = meshSection(b).water
  assert.equal(quads(w), 1) // 只有最上面一层的顶面
  for (let i = 1; i < w.positions.length; i += 3) assert.equal(w.positions[i], Math.round((3 + 8 / 9) * POSITION_SCALE))
})

test('纹理：每个方块每个面都指向一张存在的纹理', () => {
  const pixels = paintAll()
  assert.equal(pixels.length, TEXTURE_COUNT * 16 * 16 * 4)
  for (let b = 1; b < FACE_TEXTURES.length / 6; b++) {
    for (let f = 0; f < 6; f++) {
      const layer = FACE_TEXTURES[b * 6 + f]
      assert.ok(layer >= 1 && layer < TEXTURE_COUNT)
      assert.equal(pixels[(layer * 256 + 0) * 4 + 3], 255) // 不透明
    }
  }
  assert.deepEqual(paintAll(), pixels) // 每次画出来都一样
})
