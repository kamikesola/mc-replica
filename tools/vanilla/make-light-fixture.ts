/**
 * 生成 tests/fixtures/light6.json（v6）：原版 bare 存档（没有地物、没有雕刻器）里几个区块的天空光、方块光。
 *
 *   tsx tools/vanilla/make-light-fixture.ts <bare 存档> <bare52 存档>
 *
 * 每个区块存 16×16×高度 个字节（低 4 位天空光、高 4 位方块光），deflate 后 base64。
 * 测试里用同样的 bare 数据包生成周围 3×3 个区块、算光照，应该逐格一致。
 */
import { writeFileSync } from 'node:fs'
import { deflateSync } from 'node:zlib'
import { loadChunk, vanillaLight } from './anvil'
import { DIM_DIR } from './diff'

const [bare, bare52] = process.argv.slice(2)
const picks: [string, string, number, number, number, number][] = [
  // 世界目录, 维度, 区块 x, z, minY, 高度
  [bare, 'minecraft:overworld', 0, 0, -64, 384],
  [bare, 'minecraft:overworld', 1, 1, -64, 384],
  [bare52, 'minecraft:nether', 0, 0, 0, 256],
  [bare52, 'minecraft:end', 0, 0, 0, 256]
]
const out: { dim: string; cx: number; cz: number; light: string }[] = []
for (const [world, dim, cx, cz, minY, H] of picks) {
  const v = loadChunk(world + DIM_DIR[dim], cx, cz)!
  const a = new Uint8Array(H * 256)
  for (let y = minY; y < minY + H; y++)
    for (let i = 0; i < 256; i++) {
      const l = vanillaLight(v, i & 15, y, i >> 4)
      a[(y - minY) * 256 + i] = (dim === 'minecraft:overworld' ? l.sky : 0) | (l.block << 4)
    }
  out.push({ dim, cx, cz, light: deflateSync(a).toString('base64') })
}
writeFileSync(new URL('../../tests/fixtures/light6.json', import.meta.url), JSON.stringify(out, null, 1) + '\n')
console.log('写了', out.length, '个区块')
