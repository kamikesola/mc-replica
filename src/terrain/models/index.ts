import { BLOCK_OF, FluidKind, NAME_BY_BLOCK, propOf, SOLID, STATE_COUNT, STATES, BlockType, FACE_TEXTURES } from '../blocks'
import { propsOf } from '../states'
import { TEXTURE_COUNT, TEXTURE_LAYER, TINT_BY_LAYER } from '../textures/painters'
import { bakeModels, type BakedModels, type BakedQuad, type PackSource } from './bakery'

/**
 * 网格生成用的模型表（v7.1）。主线程和每个 Worker 各有一份，内容一样：
 * 主线程读资源包、烘焙（bakery.ts），把结果 postMessage 给 Worker，两边都调用 setModels。
 * 没有资源包时 setModels(null)：所有方块都用 v7 的画法（程序画的纹理 + 立方体 / 十字 / 薄片）。
 *
 * 纹理数组的层号：先是 v1~v7 程序画的那些纹理（0..TEXTURE_COUNT-1），后面接资源包里的纹理。
 * 这样没有模型的方块（箱子、末地折跃门这种原版用“方块实体”画的）仍然能用原来的纹理画出来。
 */

export let MODELS: BakedModels | null = null

/** 资源包纹理在纹理数组里的起始层号 */
export const PACK_LAYER0 = TEXTURE_COUNT

/**
 * 顶点里的“染色”字段（info 的第 4 个数）：
 *   低 5 位   颜色：0 不染色，1 草，2 树叶，3 水（按生物群系），4.. 固定颜色（TINT_COLORS[n - 4]）
 *   +32       镂空：alpha < 0.5 的像素丢掉
 *   +64       只染 alpha < 1 的部分（v4 程序画的纹理用 alpha 标记要染色的像素）
 *   +128      输出纹理自己的 alpha（资源包的半透明纹理：水、冰、染色玻璃）；不加就用材质的 opacity
 */
export const TINT_CUTOUT = 32
export const TINT_MASK = 64
export const TINT_ALPHA = 128

/**
 * 原版 BlockColors 里写死的颜色（染色字段 4..31 → 这里的第 0..27 项）：
 *   4 云杉树叶、5 白桦树叶、6 睡莲
 *   7..22 红石线，按信号强度 0..15（v8.1，RedStoneWireBlock.COLORS）
 *   23..30 南瓜梗 / 西瓜梗，按生长阶段 0..7（v8.1）；31 已经结果的梗
 */
export const TINT_COLORS = [
  0x619961,
  0x80a755,
  0x208030,
  ...Array.from({ length: 16 }, (_, i) => {
    const f = i / 15
    const c = (v: number) => Math.min(1, Math.max(0, v))
    const r = f * 0.6 + (f > 0 ? 0.4 : 0.3)
    const g = c(f * f * 0.7 - 0.5)
    const b = c(f * f * 0.6 - 0.7)
    return (Math.floor(r * 255) << 16) | (Math.floor(g * 255) << 8) | Math.floor(b * 255)
  }),
  ...Array.from({ length: 8 }, (_, a) => ((a * 32) << 16) | ((255 - a * 8) << 8) | (a * 4)),
  0xe0c71c
]

const GRASS_TINT = /^(grass_block|short_grass|tall_grass|fern|large_fern|potted_fern|sugar_cane|pink_petals)$/
const FOLIAGE_TINT = /^(oak_leaves|jungle_leaves|acacia_leaves|dark_oak_leaves|mangrove_leaves|vine)$/
const WATER_TINT = /^(water|bubble_column|water_cauldron)$/
const CONST_TINT: Record<string, number> = { spruce_leaves: 4, birch_leaves: 5, lily_pad: 6 }

/** 原版 ItemBlockRenderTypes 里是 translucent 的方块：画进半透明网格 */
const TRANSLUCENT = /^(ice|frosted_ice|.*stained_glass(_pane)?|tinted_glass|slime_block|honey_block|nether_portal|water|bubble_column)$/
/**
 * 不挡住邻居的完整方块（原版 noOcclusion）：树叶、玻璃、冰……
 * 它们旁边的方块面照样要画，不然从树叶的缝里会看到“虚空”
 */
const NO_OCCLUSION = /leaves$|glass|^ice$|frosted_ice|mangrove_roots|spawner|slime_block|honey_block|^chest$|end_gateway|cactus|chorus|grate$|barrier/
/** 和同种方块挨着时不画中间那一面（原版 HalfTransparentBlock / TransparentBlock.skipRendering） */
const SKIP_SAME = /glass$|^ice$|frosted_ice|slime_block|honey_block/

/** 每个状态：0 用 v7 的画法，1 用模型 */
export const USE_MODEL = new Uint8Array(STATE_COUNT)
/** 挡住邻居的面（cullface 判断用）。没有模型时就是 SOLID */
export const OCCLUDES = new Uint8Array(STATE_COUNT)
/** 和同种方块之间不画 */
export const SKIPS_SAME = new Uint8Array(STATE_COUNT)
/** 随机偏移（原版 OffsetType）：0 无，1 XZ，2 XYZ；最大水平偏移另存 */
export const OFFSET_TYPE = new Uint8Array(STATE_COUNT)
export const OFFSET_MAX = new Float32Array(STATE_COUNT)

/**
 * “面的样子”表：贪婪合并只合并样子完全相同的面。
 * 一项 = [纹理层, 染色字段, m00, m01, m10, m11, c0, c1]：
 *   纹理坐标 (u, v) = M · D + c，D 是这个面在世界里的“默认纹理坐标”（defaultUV，单位一格），
 *   M 是 90° 的旋转 / 镜像（每项 -1、0、1），c 是平移。整面的模型面都能写成这样，
 *   所以合并成 w×h 的大矩形后，只要把 4 个角的 D 代进去，纹理照样一格一张地重复。
 */
export const FACE_LOOKS: number[][] = []
const lookIds = new Map<string, number>()
export function lookId(look: number[]): number {
  const key = look.join(',')
  let id = lookIds.get(key)
  if (id === undefined) {
    id = FACE_LOOKS.length + 1 // 0 留给“没有面”
    FACE_LOOKS.push(look)
    lookIds.set(key, id)
  }
  return id
}

/** 一个候选模型拆开后的结果：能贪婪合并的整面（每个方向一个 look id，0 = 没有）+ 剩下的四边形 */
export interface SplitModel {
  faces: Int32Array
  rest: BakedQuad[]
}

/** 每个状态：只有一个部分时，它的每个候选拆开后的样子（null：多部分，全部按四边形画） */
export let SPLIT: (SplitModel[] | null)[] = []

/** 没有模型的状态：v7 的面（程序纹理） */
export const PROC_FACE = new Int32Array(STATE_COUNT * 6)

/** 程序纹理的染色字段（v4 的规则：alpha 标记染色；+4 是镂空） */
export function procTint(layer: number): number {
  const t = TINT_BY_LAYER[layer]
  const kind = t & 3
  const cut = (t & 4) !== 0
  return kind | (cut ? TINT_CUTOUT : kind ? TINT_MASK : 0)
}

const blockName = (s: number) => (NAME_BY_BLOCK[BLOCK_OF[s]] ?? '').replace(/^minecraft:/, '')

/** 状态 s 的 tintindex 对应的染色字段（原版 BlockColors） */
export function tintFor(s: number, tintIndex: number, texName: string): number {
  const name = blockName(s)
  let kind = 0
  if (tintIndex >= 0) {
    if (GRASS_TINT.test(name)) kind = 1
    else if (FOLIAGE_TINT.test(name)) kind = 2
    else if (WATER_TINT.test(name)) kind = 3
    else if (CONST_TINT[name]) kind = CONST_TINT[name]
    else if (name === 'redstone_wire') kind = 7 + Number(propOf(s, 'power') ?? 0)
    else if (name === 'melon_stem' || name === 'pumpkin_stem') kind = 23 + Number(propOf(s, 'age') ?? 0)
    else if (name === 'attached_melon_stem' || name === 'attached_pumpkin_stem') kind = 31
  }
  return kind | TINT_CUTOUT | (TRANSLUCENT.test(name) || /water_(still|flow)/.test(texName) ? TINT_ALPHA : 0)
}

export const isTranslucent = (s: number) => TRANSLUCENT.test(blockName(s))

// 原版 OffsetType：花、草、蕨这些每格随机挪一点（Mth.getSeed(x, 0, z)），看起来不那么整齐
const OFFSET_XZ = /^(dandelion|poppy|blue_orchid|allium|azure_bluet|.*_tulip|oxeye_daisy|cornflower|lily_of_the_valley|wither_rose|torchflower|open_eyeblossom|closed_eyeblossom|sunflower|lilac|rose_bush|peony|tall_grass|large_fern|crimson_roots|warped_roots|nether_sprouts|mangrove_propagule|bamboo_sapling|bamboo|pointed_dripstone|hanging_roots)$/
const OFFSET_XYZ = /^(short_grass|fern|small_dripleaf)$/

/** 装上（或去掉）模型。主线程和 Worker 都要调用，传进来的数据要一样 */
export function setModels(m: BakedModels | null): void {
  MODELS = m
  FACE_LOOKS.length = 0
  lookIds.clear()
  SPLIT = new Array(STATE_COUNT).fill(null)
  for (let s = 0; s < STATE_COUNT; s++) {
    const name = blockName(s)
    const parts = m?.states[s] ?? null
    USE_MODEL[s] = parts ? 1 : 0
    SKIPS_SAME[s] = m && SKIP_SAME.test(name) ? 1 : 0
    OFFSET_TYPE[s] = m ? (OFFSET_XYZ.test(name) ? 2 : OFFSET_XZ.test(name) ? 1 : 0) : 0
    OFFSET_MAX[s] = /^(pointed_dripstone|bamboo)$/.test(name) ? 0.125 : 0.25
    for (let f = 0; f < 6; f++) {
      const layer = FACE_TEXTURES[s * 6 + f]
      PROC_FACE[s * 6 + f] = lookId([layer, procTint(layer), 1, 0, 0, 1, 0, 0])
    }
    OCCLUDES[s] = SOLID[s]
    if (!USE_MODEL[s]) continue
    if (parts!.length === 1) SPLIT[s] = parts![0].choices.map((q) => split(s, q))
    // 挡不挡邻居：每个候选都是 6 个整面（贪婪面）、不是 noOcclusion 的方块
    OCCLUDES[s] = SOLID[s] && !NO_OCCLUSION.test(name) && SPLIT[s] !== null && SPLIT[s]!.every((sm) => sm.faces.every((f) => f > 0)) ? 1 : 0
  }
}

/**
 * 把一个候选模型拆成“贪婪面”和“其他四边形”。
 * 一个方向上只有一个面、这个面正好盖满方块的那一面、cullface 就是这个方向、纹理是一整张（可以转 90° 或镜像），
 * 才算贪婪面 —— 草方块的侧面有两层（泥土 + 草的覆盖层），不算，顶面算。
 */
function split(s: number, quads: BakedQuad[]): SplitModel {
  const faces = new Int32Array(6)
  const count = new Int32Array(6)
  for (const q of quads) count[q.face]++
  const rest: BakedQuad[] = []
  for (const q of quads) {
    const look = count[q.face] === 1 && q.cull === q.face && q.shade && q.ao ? fullFaceLook(s, q) : null
    if (look) faces[q.face] = lookId(look)
    else rest.push(q)
  }
  return { faces, rest }
}

/** 整面的纹理映射：解出 uv = M·D + c（M 是 90° 旋转 / 镜像）；不是整面返回 null */
function fullFaceLook(s: number, q: BakedQuad): number[] | null {
  const axis = q.face >> 1
  const plane = q.face & 1 ? 1 : 0
  for (let i = 0; i < 4; i++) {
    if (q.pos[i * 3 + axis] !== plane) return null
    for (let a = 0; a < 3; a++) if (a !== axis && q.pos[i * 3 + a] !== 0 && q.pos[i * 3 + a] !== 1) return null
  }
  // 4 个顶点的 D 和 uv，解 2×2 的 M 和 c（用三个顶点，第四个验证）
  const D = [0, 1, 2, 3].map((i) => worldUV(q.face, q.pos[i * 3], q.pos[i * 3 + 1], q.pos[i * 3 + 2]))
  const U = [0, 1, 2, 3].map((i) => [q.uv[i * 2], q.uv[i * 2 + 1]])
  const d1 = [D[1][0] - D[0][0], D[1][1] - D[0][1]]
  const d2 = [D[3][0] - D[0][0], D[3][1] - D[0][1]]
  const det = d1[0] * d2[1] - d1[1] * d2[0]
  if (Math.abs(det) < 1e-9) return null
  const M = [0, 0, 0, 0]
  for (const k of [0, 1]) {
    const e1 = U[1][k] - U[0][k]
    const e2 = U[3][k] - U[0][k]
    M[k * 2] = (e1 * d2[1] - e2 * d1[1]) / det
    M[k * 2 + 1] = (d1[0] * e2 - d2[0] * e1) / det
  }
  if (!M.every((x) => x === 0 || x === 1 || x === -1)) return null
  const c = [U[0][0] - M[0] * D[0][0] - M[1] * D[0][1], U[0][1] - M[2] * D[0][0] - M[3] * D[0][1]]
  for (let i = 0; i < 4; i++)
    for (const k of [0, 1]) if (Math.abs(M[k * 2] * D[i][0] + M[k * 2 + 1] * D[i][1] + c[k] - U[i][k]) > 1e-6) return null
  if (!c.every((x) => Math.abs(x - Math.round(x)) < 1e-6)) return null
  const texName = MODELS!.textures[q.tex]
  return [PACK_LAYER0 + q.tex, tintFor(s, q.tint, texName), M[0], M[1], M[2], M[3], Math.round(c[0]), Math.round(c[1])]
}

/**
 * 面上一点的“世界纹理坐标”，单位一格（原版默认 uv 除以 16，见 bakery.defaultUV），对位置是线性的：
 * 一个大矩形 4 个角代进去，纹理就自动按格重复
 */
export function worldUV(face: number, x: number, y: number, z: number): [number, number] {
  switch (face) {
    case 0:
      return [z, -y]
    case 1:
      return [-z, -y]
    case 2:
      return [x, -z]
    case 3:
      return [x, z]
    case 4:
      return [-x, -y]
    default:
      return [x, -y]
  }
}

/** 流体的纹理层：资源包里的 water_still / lava_still（第一帧），没有就用程序画的 */
export function fluidLayer(kind: number): { layer: number; tint: number } {
  const name = kind === FluidKind.water ? 'block/water_still' : 'block/lava_still'
  const i = MODELS ? MODELS.textures.indexOf(name) : -1
  if (i < 0) {
    const layer = kind === FluidKind.water ? TEXTURE_LAYER.water : TEXTURE_LAYER.lava
    return { layer, tint: procTint(layer) }
  }
  return { layer: PACK_LAYER0 + i, tint: kind === FluidKind.water ? 3 | TINT_ALPHA : 0 }
}

/** 烘焙这个项目里所有方块状态（空气、流体跳过） */
export function bakeAll(src: PackSource): BakedModels {
  const blocks = Array.from({ length: STATE_COUNT }, (_, s) => {
    const b = BLOCK_OF[s]
    // 空气、水和岩浆（流体自己的画法见 mesher.ts）不要模型；含水的方块（海草、含水的滴水石锥）照常要
    const name = NAME_BY_BLOCK[b]
    if (b === BlockType.air || !name || name === 'minecraft:water' || name === 'minecraft:lava') return null
    return { name: name.replace(/^minecraft:/, ''), props: propsOf(STATES, s) }
  })
  const m = bakeModels(src, blocks)
  // 流体的纹理也放进纹理数组
  for (const t of ['block/water_still', 'block/lava_still']) if (!m.textures.includes(t)) m.textures.push(t)
  return m
}

// 一开始没有资源包：所有方块用 v7 的画法
setModels(null)
