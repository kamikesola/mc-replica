/**
 * 光照对照（v6）：把我们算的天空光、方块光和原版存档里的逐格比较。
 *
 *   tsx tools/vanilla/diff-light.ts <原版存档> --range cx0 cz0 cx1 cz1 [--bare] [--dim nether|end]
 *   tsx tools/vanilla/diff-light.ts <原版存档> --areas <areas 文件>... [--only 区域名]
 *
 *   --bare     原版存档是 make-world.py 的 bare 模式（没有地物、没有雕刻器）：我们也去掉
 *   --vanilla-blocks  不用我们生成的方块，直接拿原版存档里的方块（精确到状态）算光照：只检验光照引擎本身
 *   --areas    和 diff-areas.ts 一样的区域文件，每个区域只比较中间 2×2 个区块（边上的区块，原版的邻居可能还没算光照）
 *
 * 输出：天空光、方块光各自一致的比例；不一致的按“我们 → 原版”分组；以及不一致的格子里方块本身就不一样的有多少
 * （方块不一样，光照当然可能不一样）。
 */
import { readFileSync } from 'node:fs'
import { NAME_BY_STATE } from '../../src/terrain/blocks'
import { lightChunk, LP } from '../../src/terrain/light/LightEngine'
import { chunkSource } from '../../src/terrain/worker/surface'
import { Worldgen, type PackInput } from '../../src/terrain/worldgen/Worldgen'
import { vanillaPack } from '../../tests/loadDatapack'
import { loadChunk, vanillaLight, type Region, type VanillaChunk } from './anvil'
import { DIM_DIR } from './diff'

const args = process.argv.slice(2)
const flag = (name: string, n = 1) => {
  const i = args.indexOf(name)
  if (i < 0) return undefined
  const v = args.slice(i + 1, i + 1 + n)
  args.splice(i, n + 1)
  return v
}
const has = (name: string) => {
  const i = args.indexOf(name)
  if (i >= 0) args.splice(i, 1)
  return i >= 0
}
const bare = has('--bare')
const useVanillaBlocks = has('--vanilla-blocks')
/**
 * 原版每个状态的 [lightBlock, lightEmission]（gen-blocks.py 导出），以及底面挡光（雪层、下半台阶……）。
 * 网格里存“组合号”，三张表按组合号查
 */
const STATE_PROPS = new Map<string, number>()
const COMBO_LB = new Uint8Array(256)
const COMBO_EM = new Uint8Array(256)
const COMBO_OCC = new Uint8Array(256)
const combos = new Map<string, number>()
const occludesDown = (st: string) => /^minecraft:snow\[layers=[1-7]\]$|_slab\[type=bottom|^minecraft:(calibrated_)?sculk_sensor\[|^minecraft:sculk_shrieker\[/.test(st)
for (const line of readFileSync(new URL('./out/light-states.tsv', import.meta.url), 'utf8').split('\n')) {
  const [st, a, b] = line.split('\t')
  if (!st) continue
  const key = `${a},${b},${occludesDown(st) ? 1 : 0}`
  let c = combos.get(key)
  if (c === undefined) {
    c = combos.size
    combos.set(key, c)
    COMBO_LB[c] = Number(a)
    COMBO_EM[c] = Number(b)
    COMBO_OCC[c] = occludesDown(st) ? 1 : 0
  }
  STATE_PROPS.set(st, c)
}
const OPAQUE = combos.get('15,0,0')!
function vanillaGrid(dir: string, cx: number, cz: number, minY: number, H: number): Uint16Array {
  const c = vchunk(dir, cx, cz)
  const out = new Uint16Array(H * 256).fill(OPAQUE) // 没有这个区块：当成不透明
  if (!c) return out
  for (let y = minY; y < minY + H; y++)
    for (let i = 0; i < 256; i++) {
      const st = c.states[(y - c.minY) * 256 + i] ?? 'minecraft:air'
      const v = STATE_PROPS.get(st)
      if (v === undefined) throw new Error('不认识的状态 ' + st)
      out[(y - minY) * 256 + i] = v
    }
  return out
}
const dimArg = flag('--dim')?.[0]
const range = flag('--range', 4)?.map(Number)
const only = flag('--only')?.[0]
const areasAt = args.indexOf('--areas')
const areaFiles = areasAt >= 0 ? args.splice(areasAt).slice(1) : []
const world = args[0]

const vanilla = vanillaPack()!
const packs: PackInput[] = [vanilla]
if (bare) {
  const files: Record<string, unknown> = {}
  for (const [p, b] of Object.entries(vanilla.files))
    if (/worldgen\/biome\/[^/]+\.json$/.test(p)) files[`/bare/worldgen/biome/${p.split('/').pop()}`] = { ...(b as object), carvers: [], features: [] }
  packs.push({ name: 'bare', files })
}
const wg = new Worldgen(packs)
wg.setSeed(42n)

/** [维度, 区块列表, 名字] */
const jobs: [string, [number, number][], string][] = []
const dimId = (d?: string) => (d === 'nether' ? 'minecraft:nether' : d === 'end' ? 'minecraft:end' : 'minecraft:overworld')
if (range) {
  const list: [number, number][] = []
  for (let x = range[0]; x <= range[2]; x++) for (let z = range[1]; z <= range[3]; z++) list.push([x, z])
  jobs.push([dimId(dimArg), list, 'range'])
}
for (const f of areaFiles)
  for (const line of readFileSync(f, 'utf8').split('\n')) {
    const [name, a, b] = line.trim().split(/\s+/)
    if (!name || (only && !only.split(',').includes(name))) continue
    const dim = name.startsWith('nether:') ? 'nether' : name.startsWith('end:') ? 'end' : undefined
    const list: [number, number][] = []
    for (let x = Number(a) - 1; x <= Number(a); x++) for (let z = Number(b) - 1; z <= Number(b); z++) list.push([x, z])
    jobs.push([dimId(dim), list, name])
  }

/**
 * 原版自己的数据是不是“算完了”：一格的亮度应该等于 max(光源亮度, 6 个邻居的亮度 − max(1, 这格的 lightBlock))。
 * 原版存档里偶尔有几片还没算完的（比如石头里的天空光是 15），这些格子的差别不算我们的错。
 */
const vcache = new Map<string, VanillaChunk | null>()
const regions = new Map<string, Region>()
function vchunk(dir: string, cx: number, cz: number) {
  const k = `${dir}|${cx},${cz}`
  if (!vcache.has(k)) vcache.set(k, loadChunk(dir, cx, cz, regions))
  return vcache.get(k)!
}
function settled(dir: string, x: number, y: number, z: number, k: 'sky' | 'block', minY: number, maxY: number): boolean {
  const at = (x: number, y: number, z: number) => {
    const c = vchunk(dir, x >> 4, z >> 4)
    if (!c) return null
    const st = c.states[(y - c.minY) * 256 + (z & 15) * 16 + (x & 15)] ?? 'minecraft:air'
    const v = STATE_PROPS.get(st) ?? OPAQUE
    return { light: y >= maxY ? { sky: 15, block: 0 } : y < minY ? { sky: 0, block: 0 } : vanillaLight(c, x & 15, y, z & 15), lb: COMBO_LB[v], em: COMBO_EM[v] }
  }
  const me = at(x, y, z)!
  const p = [me.lb, me.em]
  let best = k === 'block' ? p[1] : 0
  for (const [dx, dy, dz] of [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]) {
    const n = at(x + dx, y + dy, z + dz)
    if (n) best = Math.max(best, n.light[k] - Math.max(1, p[0]))
  }
  // 天空光源（这一格和上面一路都透明）：15 是对的
  if (k === 'sky' && me.light.sky === 15) {
    let yy = y
    while (yy < maxY && at(x, yy, z)!.lb === 0) yy++
    if (yy >= maxY) return true
  }
  return me.light[k] <= Math.max(best, 0)
}

const total = { sky: [0, 0], block: [0, 0], blockDiffCells: 0, unsettled: 0 }
/** 去掉“原版有没算完的格子”的区块之后 */
const samples = new Map<string, number>()
const clean = { sky: [0, 0], block: [0, 0], skipped: 0 }
const pairs = { sky: new Map<string, number>(), block: new Map<string, number>() }
for (const [dim, list, name] of jobs) {
  const s = wg.getSettings(dim)
  const src = chunkSource(wg, dim, s)
  const hasSky = dim === 'minecraft:overworld'
  const blocksOf = (cx: number, cz: number) => (bare ? src.proto(cx, cz).blocks : src.withDecorations(cx, cz))
  const r = { sky: [0, 0], block: [0, 0] }
  for (const [cx, cz] of list) {
    const v = loadChunk(world + DIM_DIR[dim], cx, cz)
    if (!v || v.status !== 'minecraft:full') continue
    const nine: Uint16Array[] = []
    for (let dz = -1; dz <= 1; dz++)
      for (let dx = -1; dx <= 1; dx++) nine.push(useVanillaBlocks ? vanillaGrid(world + DIM_DIR[dim], cx + dx, cz + dz, s.minY, s.height) : blocksOf(cx + dx, cz + dz))
    const light = useVanillaBlocks ? lightChunk(nine, s.height, hasSky, COMBO_LB, COMBO_EM, COMBO_OCC) : lightChunk(nine, s.height, hasSky)
    const ours = nine[4]
    const mine1 = { sky: [0, 0], block: [0, 0] }
    let dirty = false
    for (let y = s.minY; y < s.minY + s.height; y++)
      for (let z = 0; z < 16; z++)
        for (let x = 0; x < 16; x++) {
          const l = light[((y - s.minY) * LP + z + 1) * LP + x + 1]
          const mine = { sky: l & 15, block: l >> 4 }
          const theirs = vanillaLight(v, x, y, z)
          if (!hasSky) theirs.sky = 0
          const vb = v.blocks[(y - v.minY) * 256 + z * 16 + x]?.replace(/cave_air|void_air/, 'air')
          const sameBlock = useVanillaBlocks || NAME_BY_STATE[ours[(y - s.minY) * 256 + z * 16 + x]] === vb
          for (const k of ['sky', 'block'] as const) {
            r[k][1]++
            total[k][1]++
            mine1[k][1]++
            if (mine[k] === theirs[k]) {
              r[k][0]++
              total[k][0]++
              mine1[k][0]++
            } else {
              const bad = sameBlock && !settled(world + DIM_DIR[dim], cx * 16 + x, y, cz * 16 + z, k, s.minY, s.minY + s.height)
              if (process.env.SAMPLE && !bad && sameBlock && (samples.get(`${k}${mine[k]}${theirs[k]}`) ?? 0) < Number(process.env.SAMPLE)) {
                samples.set(`${k}${mine[k]}${theirs[k]}`, (samples.get(`${k}${mine[k]}${theirs[k]}`) ?? 0) + 1)
                const st = (yy: number) => v.states[(yy - v.minY) * 256 + z * 16 + x]?.replace('minecraft:', '')
                console.log(`  ${k} ${mine[k]}→${theirs[k]} @${cx * 16 + x},${y},${cz * 16 + z}  ${st(y + 1)} / [${st(y)}] / ${st(y - 1)}`)
              }
              if (bad) {
                total.unsettled++
                dirty = true
              }
              const key = `${mine[k]} → ${theirs[k]}${sameBlock ? (bad ? '（原版没算完）' : '') : '（方块不同）'}`
              pairs[k].set(key, (pairs[k].get(key) ?? 0) + 1)
              if (!sameBlock) total.blockDiffCells++
            }
          }
        }
    if (dirty) clean.skipped++
    else for (const k of ['sky', 'block'] as const) for (const j of [0, 1]) clean[k][j] += mine1[k][j]
  }
  const pct = (a: number[]) => (a[1] ? ((a[0] / a[1]) * 100).toFixed(3) + '%' : '-')
  console.log(`${name.padEnd(28)} 天空光 ${pct(r.sky).padStart(8)}  方块光 ${pct(r.block).padStart(8)}`)
}
const pct = (a: number[]) => (a[1] ? ((a[0] / a[1]) * 100).toFixed(4) + '%' : '-')
console.log(`\n合计  天空光 ${pct(total.sky)}  方块光 ${pct(total.block)}  （不一致里方块本身不同的 ${total.blockDiffCells} 格，原版自己没算完的 ${total.unsettled} 格）`)
console.log(`去掉原版没算完的 ${clean.skipped} 个区块：天空光 ${pct(clean.sky)}  方块光 ${pct(clean.block)}`)
for (const k of ['sky', 'block'] as const) {
  console.log(`\n${k === 'sky' ? '天空光' : '方块光'}（我们 → 原版）`)
  for (const [key, n] of [...pairs[k]].sort((a, b) => b[1] - a[1]).slice(0, 25)) console.log(String(n).padStart(8), key)
}
