/**
 * 找地下的水面 / 岩浆面，用来和游戏本体对比含水层是否一致。
 *
 *   npx tsx tools/aquifer-probe.ts [种子=42] [中心 x=0] [中心 z=0] [半径（区块）=4]
 *
 * 输出 y < 50 的“流体表面”（流体方块上面是空气）。在游戏里用同一个种子
 * /tp 到列出的坐标，应该能看到同样高度的地下湖 / 岩浆湖。需要原版数据（datapacks/）。
 */
import { BlockType } from '../src/terrain/blocks'
import Section from '../src/terrain/chunk/Section'
import { generateChunk } from '../src/terrain/worker/surface'
import { Worldgen } from '../src/terrain/worldgen/Worldgen'
import { builtinPack, vanillaPack } from '../tests/loadDatapack'

const [seed = '42', cxs = '0', czs = '0', rs = '4'] = process.argv.slice(2)
const vanilla = vanillaPack()
if (!vanilla) {
  console.error('需要原版数据：把 1.21.1 的 worldgen 数据放进 datapacks/')
  process.exit(1)
}
const wg = new Worldgen([builtinPack(), vanilla])
wg.setSeed(seed)
const id = 'minecraft:overworld'
const s = wg.getSettings(id)
const R = Number(rs)
const c0x = Math.floor(Number(cxs) / 16)
const c0z = Math.floor(Number(czs) / 16)

interface Pool {
  fluid: string
  y: number
  blocks: number
  x: number
  z: number
}
const pools = new Map<string, Pool>()
for (let cx = c0x - R; cx < c0x + R; cx++) {
  for (let cz = c0z - R; cz < c0z + R; cz++) {
    const c = generateChunk(wg, id, s, cx, cz)
    const secs = c.sections.map((d) => Section.fromData(d))
    const get = (lx: number, y: number, lz: number) => {
      const ry = y - s.minY
      if (ry < 0 || ry >= s.height) return BlockType.air
      return secs[ry >> 4].get(lx, ry & 15, lz)
    }
    for (let lx = 0; lx < 16; lx++)
      for (let lz = 0; lz < 16; lz++)
        for (let y = s.minY; y < 50; y++) {
          const b = get(lx, y, lz)
          if ((b !== BlockType.water && b !== BlockType.lava) || get(lx, y + 1, lz) !== BlockType.air) continue
          const fluid = b === BlockType.water ? '水' : '岩浆'
          // 按 (流体, 水面高度, 所在的 32×32 区域) 粗略归成一个“湖”
          const key = `${fluid},${y},${Math.floor((cx * 16 + lx) / 32)},${Math.floor((cz * 16 + lz) / 32)}`
          const p = pools.get(key) ?? { fluid, y: y + 1, blocks: 0, x: cx * 16 + lx, z: cz * 16 + lz }
          p.blocks++
          pools.set(key, p)
        }
  }
}
const list = [...pools.values()].filter((p) => p.blocks >= 4).sort((a, b) => b.blocks - a.blocks)
console.log(`种子 ${seed}，以 (${cxs}, ${czs}) 为中心 ${R * 2}×${R * 2} 个区块，y < 50 的地下流体表面：`)
console.log('| 流体 | 液面 y | 水面面积（格） | 坐标（/tp x y z） |')
console.log('| --- | --- | --- | --- |')
for (const p of list.slice(0, 20)) console.log(`| ${p.fluid} | ${p.y} | ${p.blocks} | ${p.x} ${p.y} ${p.z} |`)
