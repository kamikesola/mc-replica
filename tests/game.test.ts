/**
 * 游戏部分里不依赖浏览器的逻辑：射线选方块、碰撞、区块生成。
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { collides, moveAndCollide } from '../src/control/physics'
import { raycast } from '../src/control/raycast'
import { BlockType } from '../src/terrain/blocks'
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

test('碰撞：从高处落下会停在地面上', () => {
  const body = { half: 0.3, height: 1.8 }
  const solid = (_x: number, y: number) => y < 64
  const pos = { x: 0.5, y: 80, z: 0.5 }
  const vel = { x: 0, y: -40, z: 0 }
  let ground = false
  for (let i = 0; i < 60 && !ground; i++) ground = moveAndCollide(pos, vel, 0.05, body, solid).onGround
  assert.ok(ground)
  assert.equal(pos.y, 64)
  assert.ok(!collides(pos, body, solid))
})

test('碰撞：撞墙会停下但另一个方向可以继续滑动', () => {
  const body = { half: 0.3, height: 1.8 }
  const solid = (x: number, y: number) => y < 64 || x >= 5
  const pos = { x: 4.5, y: 64, z: 0.5 }
  const vel = { x: 4, y: 0, z: 4 }
  moveAndCollide(pos, vel, 0.25, body, solid)
  assert.ok(pos.x < 5 - 0.3 + 1e-3, `x = ${pos.x}`)
  assert.ok(pos.z > 1.4, `z = ${pos.z}`)
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
    assert.equal(c.blocks.length, 16 * 16 * H)
    for (let i = 0; i < 256; i++) assert.equal(c.blocks[i], BlockType.bedrock) // y = minY 一层全是基岩
    for (const b of c.blocks) counts.set(b, (counts.get(b) ?? 0) + 1)
    assert.ok(c.opaque.indices.length > 0)
  }
  assert.ok((counts.get(BlockType.grass) ?? 0) + (counts.get(BlockType.sand) ?? 0) > 0)
  assert.ok((counts.get(BlockType.stone) ?? 0) > 0)
  assert.ok((counts.get(BlockType.deepslate) ?? 0) > 0)
})
