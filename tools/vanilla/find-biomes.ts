import { Worldgen } from '../../src/terrain/worldgen/Worldgen'
import { vanillaPack, builtinPack } from '../../tests/loadDatapack'
const wg = new Worldgen([builtinPack(), vanillaPack()!]); wg.setSeed(42n)
const bs = wg.biomes('minecraft:overworld')
const want = process.argv.slice(2)
const found: Record<string, [number, number]> = {}
const used = new Set<string>()
outer: for (let r = 0; r < 120; r++) {
  for (let i = -r; i <= r; i++) for (const [a, b] of [[i, -r], [i, r], [-r, i], [r, i]]) {
    const cx = a * 8, cz = b * 8
    for (const [name, qy] of want.map((w) => w.split('@')).map(([n, y]) => [n, y ? +y >> 2 : 16] as const)) {
      if (found[name]) continue
      // 4x4 区块的中心以及四角都是这个群系
      let ok = true
      for (const [dx, dz] of [[0, 0], [-1, -1], [2, 2], [-1, 2], [2, -1]]) if (bs.noiseBiome((cx + dx) * 4 + 2, qy, (cz + dz) * 4 + 2) !== 'minecraft:' + name) ok = false
      if (ok) { found[name] = [cx, cz]; console.log(name, cx, cz) }
    }
    if (want.every((w) => found[w.split('@')[0]])) break outer
  }
}
