/**
 * v10.3 的几项提速都声称“结果完全不变”，这里逐项对照：
 *
 *   含水层：跨区块共享格子状态 + 周围格子一样时直接返回空气（Worldgen.fastAquifer）
 *   查群系：ParameterList.find 改成按距离从近到远访问
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { protoTask } from '../src/terrain/worker/tasks'
import { ParameterList, type TargetPoint } from '../src/terrain/worldgen/biome/Climate'
import { overworldBiomeParameters } from '../src/terrain/worldgen/biome/OverworldBiomeBuilder'
import { Worldgen } from '../src/terrain/worldgen/Worldgen'
import { builtinPack, vanillaPack } from './loadDatapack'

const vanilla = vanillaPack()

test('含水层提速：相邻 3×3 个区块的原型，开和不开逐格相同', { skip: vanilla ? false : '没有 datapacks/vanilla，跳过' }, () => {
  const fast = new Worldgen([builtinPack(), vanilla!])
  const slow = new Worldgen([builtinPack(), vanilla!])
  slow.fastAquifer = false
  fast.setSeed(42n)
  slow.setSeed(42n)
  const id = 'minecraft:overworld'
  const s = fast.getSettings(id)
  // (0, 0) 附近有海、地下湖和岩浆湖（v3 的文章）；相邻区块才会共享格子
  for (let cx = -1; cx <= 1; cx++)
    for (let cz = -1; cz <= 1; cz++) {
      const a = protoTask(slow, id, s, cx, cz)
      const b = protoTask(fast, id, s, cx, cz)
      assert.deepEqual(b.blocks, a.blocks, `区块 ${cx},${cz} 的方块不同`)
      assert.deepEqual(b.fluidUpdates, a.fluidUpdates, `区块 ${cx},${cz} 的流体更新不同`)
    }
})

test('查群系：find 和逐项比较的结果一样（主世界参数表，2 万个随机点 + 边界上的点）', () => {
  const list = new ParameterList(overworldBiomeParameters({ paleGarden: true }))
  // 固定种子的伪随机，失败时能复现
  let r = 12345
  const rand = () => ((r = (Math.imul(r, 1103515245) + 12345) >>> 0) / 4294967296) * 2 - 1
  // 量化后的气候值是 long，范围大约 ±2（×10000）；边界点：正好落在参数区间端点上，最容易出现一样近的情况
  const edges = [-10000, -4500, -1500, -1050, -455, -190, -110, 0, 30, 300, 1050, 1500, 5500, 10000]
  for (let n = 0; n < 20000; n++) {
    const t: TargetPoint =
      n % 4 === 0
        ? (Array.from({ length: 6 }, () => edges[Math.floor(((rand() + 1) / 2) * edges.length)]) as TargetPoint)
        : (Array.from({ length: 6 }, () => Math.round(rand() * 15000)) as TargetPoint)
    assert.equal(list.find(t), list.findBruteForce(t), `目标点 ${t.join(',')}`)
  }
})
