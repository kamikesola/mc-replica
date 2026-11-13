/**
 * 游戏部分里不依赖浏览器的逻辑：射线选方块、区块生成。碰撞和移动见 movement.test.ts。
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { raycast } from '../src/control/raycast'
import { BlockType } from '../src/terrain/blocks'
import Section from '../src/terrain/chunk/Section'
import { generateChunk } from '../src/terrain/worker/surface'
import { Worldgen } from '../src/terrain/worldgen/Worldgen'
import { builtinPack } from './loadDatapack'

test('射线：往下看能打到脚下方块的顶面', () => {
  const ground = (_x: number, y: number) => y <= 63
  const hit = raycast(0.5, 65.62, 0.5, 0, -1, 0, 5, ground)
  assert.deepEqual([hit?.x, hit?.y, hit?.z, hit?.ny], [0, 63, 0, 1])
})

test('射线：斜着看，命中面的法线正确；够不着时返回 null', () => {
  const wall = (x: number) => x >= 3
  const d = Math.SQRT1_2
  const hit = raycast(0.5, 0.5, 0.5, d, 0, d, 10, wall)
  assert.equal(hit?.x, 3)
  assert.equal(hit?.nx, -1)
  assert.equal(raycast(0.5, 0.5, 0.5, d, 0, d, 2, wall), null)
})

test('区块生成：底部是基岩，地表有草或沙，海平面以下有水', () => {
  const wg = new Worldgen([builtinPack()])
  wg.setSeed(42n)
  const s = wg.getSettings('demo:overworld_lite')
  const H = s.height
  const counts = new Map<number, number>()
  for (const [cx, cz] of [
    [0, 0],
    [3, -2],
    [-10, 7]
  ]) {
    const c = generateChunk(wg, 'demo:overworld_lite', s, cx, cz)
    assert.equal(c.sections.length, H / 16)
    const bottom = Section.fromData(c.sections[0])
    for (let i = 0; i < 256; i++) assert.equal(bottom.blocks.get(i), BlockType.bedrock) // y = minY 一层全是基岩
    for (const d of c.sections) {
      const sec = Section.fromData(d)
      for (let i = 0; i < 4096; i++) counts.set(sec.blocks.get(i), (counts.get(sec.blocks.get(i)) ?? 0) + 1)
    }
    assert.ok(c.meshes.some((m) => m && m.opaque.indices.length > 0))
  }
  assert.ok((counts.get(BlockType.grass) ?? 0) + (counts.get(BlockType.sand) ?? 0) > 0)
  assert.ok((counts.get(BlockType.stone) ?? 0) > 0)
  assert.ok((counts.get(BlockType.deepslate) ?? 0) > 0)
})
