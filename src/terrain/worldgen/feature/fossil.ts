/**
 * 化石（v5.2）：原版 FossilFeature + 结构模板（StructureTemplate.placeInWorld）+ 两种结构处理器。
 * 模板来自原版 jar 的 data/minecraft/structure/fossil/*.nbt，用 tools/vanilla/structures-to-json.ts 转成 JSON 放进 datapacks。
 */
import { blockName, isAir, parseState, propOfState, withProp, type WorldGenLevel } from './core'
import { inTag } from './tags'
import type { FeaturePlacer } from './placement'
import type { RandomSource } from '../random/RandomSource'

interface Template {
  size: [number, number, number]
  palette: { Name: string; Properties?: Record<string, string> }[]
  blocks: [number, number, number, number][]
}

/** 旋转：原版 Rotation.values() 的顺序 */
const enum Rot {
  none,
  cw90,
  cw180,
  ccw90
}
/** 原版 StructureTemplate.transform（不镜像，旋转中心是原点） */
function transform(x: number, z: number, r: Rot): [number, number] {
  switch (r) {
    case Rot.ccw90:
      return [z, -x]
    case Rot.cw90:
      return [-z, x]
    case Rot.cw180:
      return [-x, -z]
    default:
      return [x, z]
  }
}

type Processor = (l: WorldGenLevel, r: RandomSource, x: number, y: number, z: number, state: string) => string | null

function processors(json: unknown): Processor[] {
  const list = ((json as { processors?: unknown[] }).processors ?? (json as unknown[])) as Record<string, unknown>[]
  return list.map((p) => {
    const type = String(p.processor_type).replace('minecraft:', '')
    switch (type) {
      case 'block_rot': {
        const integrity = Math.fround(p.integrity as number)
        const rottable = p.rottable_blocks as string | undefined
        return (_l, r, _x, _y, _z, s) => ((rottable && !inTag(s, rottable)) || !(r.nextFloat() > integrity) ? s : null)
      }
      case 'protected_blocks': {
        const tag = String(p.value)
        return (l, _r, x, y, z, s) => (inTag(l.getBlock(x, y, z), tag) ? null : s)
      }
      case 'rule': {
        // 只实现了化石用到的：block_match + always_true（不用地物的随机数）
        const rules = (p.rules as Record<string, Record<string, unknown>>[]).map((ru) => ({
          input: String(ru.input_predicate.block),
          output: parseState(ru.output_state)
        }))
        return (_l, _r, _x, _y, _z, s) => rules.find((ru) => ru.input === blockName(s))?.output ?? s
      }
      default:
        throw new Error(`不支持的结构处理器：${type}`)
    }
  })
}

/** 原版 StructureTemplate.placeInWorld（只放方块，没有实体、方块实体、含水） */
function placeTemplate(l: WorldGenLevel, r: RandomSource, t: Template, ox: number, oy: number, oz: number, rot: Rot, procs: Processor[], box: [number, number, number, number]) {
  r.nextInt(1) // getRandomPalette：只有一个调色板也要取一次随机数
  // 原版加载模板时按 y、x、z 排好序（化石的方块都是完整方块，在同一个列表里）
  const blocks = t.blocks.slice().sort((a, b) => a[1] - b[1] || a[0] - b[0] || a[2] - b[2])
  const out: [number, number, number, string][] = []
  for (const [bx, by, bz, si] of blocks) {
    const [tx, tz] = transform(bx, bz, rot)
    const x = ox + tx
    const y = oy + by
    const z = oz + tz
    // v7：调色板带属性（骨块的 axis），转 90° 时 x、z 轴互换（原版 RotatedPillarBlock.rotate）
    let s: string | null = parseState(t.palette[si])
    if ((rot === Rot.cw90 || rot === Rot.ccw90) && /\[.*axis=[xz]/.test(s)) s = withProp(s, 'axis', propOfState(s, 'axis') === 'x' ? 'z' : 'x')
    for (const p of procs) {
      s = p(l, r, x, y, z, s)
      if (s === null) break
    }
    if (s !== null) out.push([x, y, z, s])
  }
  for (const [x, y, z, s] of out) if (x >= box[0] && x <= box[1] && z >= box[2] && z <= box[3]) l.setBlock(x, y, z, s)
}

export function fossil(cfg: Record<string, unknown>, structure: (id: string) => unknown, processorList: (id: string) => unknown): FeaturePlacer {
  const load = (ids: string[]) => ids.map((id) => structure(id.includes(':') ? id : `minecraft:${id}`) as Template | undefined)
  const fossils = load(cfg.fossil_structures as string[])
  const overlays = load(cfg.overlay_structures as string[])
  const procList = (j: unknown) => processors(typeof j === 'string' ? processorList(j.includes(':') ? j : `minecraft:${j}`) : j)
  const fossilProcs = procList(cfg.fossil_processors)
  const overlayProcs = procList(cfg.overlay_processors)
  const maxEmpty = cfg.max_empty_corners_allowed as number
  if (fossils.some((f) => !f) || overlays.some((f) => !f)) throw new Error('缺少化石的结构模板（datapacks/vanilla/structure/fossil/，见 tools/vanilla/README.md）')
  return (l, r, x0, y0, z0) => {
    const rot = r.nextInt(4) as Rot
    const i = r.nextInt(fossils.length)
    const t = fossils[i]!
    const o = overlays[i]!
    const cx = x0 >> 4
    const cz = z0 >> 4
    const box: [number, number, number, number] = [cx * 16 - 16, cx * 16 + 15 + 16, cz * 16 - 16, cz * 16 + 15 + 16]
    const swap = rot === Rot.cw90 || rot === Rot.ccw90
    const sx = swap ? t.size[2] : t.size[0]
    const sz = swap ? t.size[0] : t.size[2]
    const px = x0 - Math.trunc(sx / 2)
    const pz = z0 - Math.trunc(sz / 2)
    let j = y0
    for (let a = 0; a < sx; a++) for (let b = 0; b < sz; b++) j = Math.min(j, l.getHeight('OCEAN_FLOOR_WG', px + a, pz + b))
    const k = Math.max(j - 15 - r.nextInt(10), l.minY + 10)
    // 原版 getZeroPositionWithTransform：旋转后模板的“原点”挪到哪
    const ux = t.size[0] - 1
    const uz = t.size[2] - 1
    const [zx, zz] = rot === Rot.ccw90 ? [0, ux] : rot === Rot.cw90 ? [uz, 0] : rot === Rot.cw180 ? [ux, uz] : [0, 0]
    const qx = px + zx
    const qz = pz + zz
    // 包围盒的 8 个角里，空气 / 水 / 岩浆太多就不放
    const [ax, az] = transform(0, 0, rot)
    const [bx, bz] = transform(t.size[0] - 1, t.size[2] - 1, rot)
    let empty = 0
    for (const x of [qx + Math.min(ax, bx), qx + Math.max(ax, bx)])
      for (const y of [k, k + t.size[1] - 1])
        for (const z of [qz + Math.min(az, bz), qz + Math.max(az, bz)]) {
          const s = l.getBlock(x, y, z)
          if (isAir(s) || s === 'minecraft:lava' || s === 'minecraft:water') empty++
        }
    if (empty > maxEmpty) return false
    placeTemplate(l, r, t, qx, k, qz, rot, fossilProcs, box)
    placeTemplate(l, r, o, qx, k, qz, rot, overlayProcs, box)
    return true
  }
}
