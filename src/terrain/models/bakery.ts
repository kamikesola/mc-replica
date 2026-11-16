/**
 * 方块模型烘焙（v7.1）：把原版资源包里的 blockstates/*.json 和 models/block/*.json
 * 变成“每个方块状态由哪些四边形组成”。对应原版的 ModelBakery + FaceBakery + BlockModelRotation。
 *
 * 一个方块状态怎么找到它的样子：
 *
 *   blockstates/oak_log.json            "axis=x" → { model: "block/oak_log_horizontal", x: 90, y: 90 }
 *        │（variants：按属性挑一个；multipart：所有条件满足的部分叠在一起）
 *        ▼
 *   models/block/oak_log_horizontal.json  parent: block/cube_column_horizontal，textures: { end, side }
 *        │（沿 parent 一路往上：textures 合并，elements 用最近的那个）
 *        ▼
 *   models/block/cube_column_horizontal → cube → block   elements：一个 0..16 的盒子，6 个面
 *        │
 *        ▼
 *   每个面 → 一个四边形：4 个顶点的位置（先按 element 自己的 rotation 转，再按 blockstate 的 x/y 转）、
 *   4 个顶点的纹理坐标、纹理名、cullface（挨着哪一面的邻居挡住时不画）、tintindex（染色）、shade（要不要按朝向变暗）
 *
 * 输出全是普通对象和数组，可以直接 postMessage 给 Worker（主线程烘焙一次，Worker 不用自己再读几千个 JSON）。
 *
 * 这个文件不依赖浏览器，测试里直接读磁盘上的资源包来用。
 */

/** 面的编号和网格生成一致：-x 西, +x 东, -y 下, +y 上, -z 北, +z 南 */
export const FACE_NAMES = ['west', 'east', 'down', 'up', 'north', 'south'] as const
const FACE_INDEX: Record<string, number> = Object.fromEntries(FACE_NAMES.map((n, i) => [n, i]))
const NORMALS: [number, number, number][] = [
  [-1, 0, 0],
  [1, 0, 0],
  [0, -1, 0],
  [0, 1, 0],
  [0, 0, -1],
  [0, 0, 1]
]

export interface BakedQuad {
  /** 4 个顶点的位置（方块内坐标，一格 = 1），原版顶点顺序：从正面看逆时针 */
  pos: number[]
  /** 4 个顶点的纹理坐标，单位是“一张纹理”（原版 JSON 里的 0..16 除以 16） */
  uv: number[]
  /** 纹理：BakedModels.textures 的下标 */
  tex: number
  /** 朝向（按法线取最近的方向，原版 FaceBakery.calculateFacing），光照和明暗用 */
  face: number
  /** cullface：这一面的邻居是不透明的完整方块时不画；-1 表示总是画 */
  cull: number
  /** tintindex：-1 不染色，否则按方块查颜色（原版 BlockColors） */
  tint: number
  /** false：不按朝向变暗（原版 "shade": false） */
  shade: boolean
  /** 模型的 ambientocclusion：false 时用 flat 光照（十字形植物之类） */
  ao: boolean
}

/** 一个“部分”：多个带权重的候选，按位置随机挑一个（原版 WeightedBakedModel） */
export interface BakedPart {
  weights: number[]
  choices: BakedQuad[][]
}

export interface BakedModels {
  /** 用到的纹理名（"block/stone"），纹理数组按这个顺序一层一张 */
  textures: string[]
  /** 每个方块状态的部分列表；null：资源包里没有它（或者模型没有任何面，比如箱子），退回 v7 的画法 */
  states: (BakedPart[] | null)[]
}

/** 资源包：按名字取 JSON，取不到返回 undefined */
export interface PackSource {
  blockstate(name: string): unknown
  model(name: string): unknown
}

/** "minecraft:block/stone" / "block/stone" → "block/stone" */
export const resourceName = (s: string) => (s.includes(':') ? s.slice(s.indexOf(':') + 1) : s)

// ------------------------------------------------------------------ 模型解析（parent 链）

interface RawFace {
  uv?: number[]
  texture: string
  cullface?: string
  rotation?: number
  tintindex?: number
}
interface RawElement {
  from: number[]
  to: number[]
  rotation?: { origin: number[]; axis: 'x' | 'y' | 'z'; angle: number; rescale?: boolean }
  shade?: boolean
  faces: Record<string, RawFace>
}
interface RawModel {
  parent?: string
  ambientocclusion?: boolean
  textures?: Record<string, string>
  elements?: RawElement[]
}
interface ResolvedModel {
  elements: RawElement[]
  textures: Record<string, string>
  ao: boolean
}

function resolveModel(src: PackSource, name: string, cache: Map<string, ResolvedModel | null>): ResolvedModel | null {
  const key = resourceName(name)
  if (cache.has(key)) return cache.get(key)!
  cache.set(key, null) // 防止 parent 成环
  const chain: RawModel[] = []
  let cur: string | undefined = key
  while (cur && chain.length < 32) {
    const m = src.model(cur) as RawModel | undefined
    if (!m) break
    chain.push(m)
    cur = m.parent ? resourceName(m.parent) : undefined
  }
  if (chain.length === 0) return null
  // 纹理：从最远的祖先开始合并，子模型覆盖父模型
  const textures: Record<string, string> = {}
  for (let i = chain.length - 1; i >= 0; i--) Object.assign(textures, chain[i].textures)
  // elements：离自己最近的那个有 elements 的模型；ambientocclusion 同理（都没写就是 true）
  const elements = chain.find((m) => m.elements)?.elements ?? []
  const ao = chain.find((m) => m.ambientocclusion !== undefined)?.ambientocclusion ?? true
  const r = { elements, textures, ao }
  cache.set(key, r)
  return r
}

/** "#side" → 沿着引用一直找到真正的纹理名 */
function resolveTexture(textures: Record<string, string>, ref: string): string | null {
  let r = ref
  for (let i = 0; i < 16 && r.startsWith('#'); i++) {
    const next: string | undefined = textures[r.slice(1)]
    if (next === undefined) return null
    r = next
  }
  return r.startsWith('#') ? null : resourceName(r)
}

// ------------------------------------------------------------------ 几何

type V3 = [number, number, number]

/**
 * 原版 FaceInfo：每个方向的 4 个顶点取盒子的哪个角（从正面看逆时针）。
 * 每项是 [x 取 min/max, y, z]，0 = min，1 = max
 */
const FACE_CORNERS: Record<string, [number, number, number][]> = {
  down: [
    [0, 0, 1],
    [0, 0, 0],
    [1, 0, 0],
    [1, 0, 1]
  ],
  up: [
    [0, 1, 0],
    [0, 1, 1],
    [1, 1, 1],
    [1, 1, 0]
  ],
  north: [
    [1, 1, 0],
    [1, 0, 0],
    [0, 0, 0],
    [0, 1, 0]
  ],
  south: [
    [0, 1, 1],
    [0, 0, 1],
    [1, 0, 1],
    [1, 1, 1]
  ],
  west: [
    [0, 1, 0],
    [0, 0, 0],
    [0, 0, 1],
    [0, 1, 1]
  ],
  east: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 0],
    [1, 1, 0]
  ]
}

/**
 * 没写 uv 时的默认纹理坐标（原版 BlockElement.uvsByFace），也是“纹理贴在世界上”的标准方向：
 * 一个面上的点 p（0..16）对应的纹理坐标。uvlock 也用它（见 bake 里的说明）
 */
export function defaultUV(face: string, p: V3): [number, number] {
  const [x, y, z] = p
  switch (face) {
    case 'down':
      return [x, 16 - z]
    case 'up':
      return [x, z]
    case 'north':
      return [16 - x, 16 - y]
    case 'south':
      return [x, 16 - y]
    case 'west':
      return [z, 16 - y]
    default:
      return [16 - z, 16 - y]
  }
}

/** 绕轴旋转（右手定则，角度制） */
function rotateAxis(v: V3, axis: 'x' | 'y' | 'z', deg: number): V3 {
  const a = (deg * Math.PI) / 180
  // 90 度的倍数直接取整，避免 cos(90°) = 6e-17 这种误差让“正好在边界上”的判断失败
  const r = (n: number) => (Math.abs(n - Math.round(n)) < 1e-9 ? Math.round(n) : n)
  const c = r(Math.cos(a))
  const s = r(Math.sin(a))
  const [x, y, z] = v
  if (axis === 'x') return [x, y * c - z * s, y * s + z * c]
  if (axis === 'y') return [x * c + z * s, y, -x * s + z * c]
  return [x * c - y * s, x * s + y * c, z]
}

/**
 * blockstate 的 x / y 旋转（原版 BlockModelRotation：Quaternionf.rotateYXZ(-y, -x, 0)），
 * 也就是先绕 X 轴转 -x 度，再绕 Y 轴转 -y 度，中心是方块中心
 */
function rotateBlock(p: V3, rx: number, ry: number): V3 {
  let v: V3 = [p[0] - 0.5, p[1] - 0.5, p[2] - 0.5]
  if (rx) v = rotateAxis(v, 'x', -rx)
  if (ry) v = rotateAxis(v, 'y', -ry)
  return [v[0] + 0.5, v[1] + 0.5, v[2] + 0.5]
}

function rotateDir(face: number, rx: number, ry: number): number {
  let v = NORMALS[face] as V3
  if (rx) v = rotateAxis(v, 'x', -rx)
  if (ry) v = rotateAxis(v, 'y', -ry)
  return nearestFace(v)
}

/** 原版 Direction.getNearest：法线最接近哪个方向 */
function nearestFace(n: V3): number {
  let best = 0
  let bestDot = -Infinity
  for (let f = 0; f < 6; f++) {
    const d = n[0] * NORMALS[f][0] + n[1] * NORMALS[f][1] + n[2] * NORMALS[f][2]
    if (d > bestDot + 1e-6) {
      bestDot = d
      best = f
    }
  }
  return best
}

const RESCALE_22_5 = 1 / Math.cos(Math.PI / 8) - 1
const RESCALE_45 = 1 / Math.cos(Math.PI / 4) - 1

interface Variant {
  model: string
  x?: number
  y?: number
  uvlock?: boolean
  weight?: number
}

/** 一个 variant（模型 + 旋转）→ 四边形 */
function bakeVariant(src: PackSource, v: Variant, cache: Map<string, ResolvedModel | null>, texIndex: (name: string) => number): BakedQuad[] {
  const m = resolveModel(src, v.model, cache)
  if (!m) return []
  const rx = v.x ?? 0
  const ry = v.y ?? 0
  const quads: BakedQuad[] = []
  for (const el of m.elements) {
    const from = el.from
    const to = el.to
    for (const [faceName, f] of Object.entries(el.faces)) {
      const tex = resolveTexture(m.textures, f.texture)
      if (!tex || !FACE_CORNERS[faceName]) continue
      // 1. 4 个顶点（0..16）
      const pts: V3[] = FACE_CORNERS[faceName].map((c) => [c[0] ? to[0] : from[0], c[1] ? to[1] : from[1], c[2] ? to[2] : from[2]])
      // 2. 纹理坐标：uv 矩形 [u1, v1, u2, v2]，face.rotation 把 4 个角轮换（原版 BlockFaceUV.getU/getV）
      const uvRect = f.uv ?? (() => {
        const a = defaultUV(faceName, from as V3)
        const b = defaultUV(faceName, to as V3)
        return [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.max(a[0], b[0]), Math.max(a[1], b[1])]
      })()
      const shift = ((f.rotation ?? 0) / 90) | 0
      let uv = pts.map((_, i) => {
        const j = (i + shift) % 4
        return [uvRect[j === 0 || j === 1 ? 0 : 2], uvRect[j === 0 || j === 3 ? 1 : 3]] as [number, number]
      })
      // 3. element 自己的旋转（只有一个轴，±22.5 / ±45 度），rescale 时把另外两个轴拉长，让斜着的面仍然撑满方块
      let positions: V3[] = pts.map((p) => [p[0] / 16, p[1] / 16, p[2] / 16])
      if (el.rotation && el.rotation.angle) {
        const { origin, axis, angle, rescale } = el.rotation
        const o: V3 = [origin[0] / 16, origin[1] / 16, origin[2] / 16]
        const k = rescale ? (Math.abs(angle) === 22.5 ? RESCALE_22_5 : RESCALE_45) + 1 : 1
        const scale: V3 = [axis === 'x' ? 1 : k, axis === 'y' ? 1 : k, axis === 'z' ? 1 : k]
        positions = positions.map((p) => {
          const r = rotateAxis([p[0] - o[0], p[1] - o[1], p[2] - o[2]], axis, angle)
          return [r[0] * scale[0] + o[0], r[1] * scale[1] + o[1], r[2] * scale[2] + o[2]]
        })
      }
      // 4. blockstate 的旋转
      positions = positions.map((p) => rotateBlock(p, rx, ry))
      const faceDir = nearestFace(normalOf(positions))
      // 5. uvlock：纹理不跟着方块转，而是“钉”在世界上 —— 按转完之后的位置和朝向重新取默认纹理坐标。
      //    原版是把 uv 矩形反向旋转回去（FaceBakery.recomputeUVs），对没写 uv 的整面结果一样；
      //    写了局部 uv 的面（很少见），这里会和原版有出入。
      if (v.uvlock && (rx || ry)) {
        const fn = FACE_NAMES[faceDir]
        uv = positions.map((p) => defaultUV(fn, [p[0] * 16, p[1] * 16, p[2] * 16]))
        // 平移到 0..16 之内（同一块纹理整体挪几格看起来一样，纹理是重复平铺的）
        for (const k of [0, 1]) {
          const lo = Math.floor(Math.min(...uv.map((t) => t[k])) / 16 + 1e-6) * 16
          for (const t of uv) t[k] -= lo
        }
      }
      const cull = f.cullface && FACE_INDEX[f.cullface === 'bottom' ? 'down' : f.cullface] !== undefined ? rotateDir(FACE_INDEX[f.cullface === 'bottom' ? 'down' : f.cullface], rx, ry) : -1
      quads.push({
        pos: positions.flatMap((p) => p.map(clean)),
        uv: uv.flatMap((t) => [clean(t[0] / 16), clean(t[1] / 16)]),
        tex: texIndex(tex),
        face: faceDir,
        cull,
        tint: f.tintindex ?? -1,
        shade: el.shade ?? true,
        ao: m.ao
      })
    }
  }
  return quads
}

/** 去掉浮点误差（0.9999999 → 1），后面判断“是不是整面”时要精确比较 */
const clean = (n: number) => {
  const r = Math.round(n * 4096) / 4096
  return Object.is(r, -0) ? 0 : r
}

function normalOf(p: V3[]): V3 {
  const a: V3 = [p[1][0] - p[0][0], p[1][1] - p[0][1], p[1][2] - p[0][2]]
  const b: V3 = [p[2][0] - p[0][0], p[2][1] - p[0][1], p[2][2] - p[0][2]]
  let n: V3 = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
  // 退化（零宽的面）时用另一组顶点
  if (Math.hypot(...n) < 1e-9) {
    const c: V3 = [p[3][0] - p[0][0], p[3][1] - p[0][1], p[3][2] - p[0][2]]
    n = [b[1] * c[2] - b[2] * c[1], b[2] * c[0] - b[0] * c[2], b[0] * c[1] - b[1] * c[0]]
  }
  return n
}

// ------------------------------------------------------------------ blockstates

type When = Record<string, string | boolean> | { OR: When[] } | { AND: When[] }

function matches(when: When | undefined, props: Record<string, string>): boolean {
  if (!when) return true
  if ('OR' in when) return (when.OR as When[]).some((w) => matches(w, props))
  if ('AND' in when) return (when.AND as When[]).every((w) => matches(w, props))
  return Object.entries(when).every(([k, v]) => String(v).split('|').includes(props[k]))
}

/** variants 的键 "axis=x,half=lower"：列出的属性都相等才算匹配（"" 匹配任何状态） */
function variantMatches(key: string, props: Record<string, string>): boolean {
  if (key === '' || key === 'normal') return true
  return key.split(',').every((kv) => {
    const [k, v] = kv.split('=')
    return props[k] === v
  })
}

function toPart(apply: Variant | Variant[], bake: (v: Variant) => BakedQuad[]): BakedPart {
  const list = Array.isArray(apply) ? apply : [apply]
  return { weights: list.map((v) => v.weight ?? 1), choices: list.map(bake) }
}

/**
 * 烘焙所有方块状态。
 * @param blocks 每个状态的方块名（不带命名空间，比如 "oak_log"）和属性；null 表示跳过（空气、流体）
 */
export function bakeModels(src: PackSource, blocks: ({ name: string; props: Record<string, string> } | null)[]): BakedModels {
  const textures: string[] = []
  const texMap = new Map<string, number>()
  const texIndex = (name: string) => {
    let i = texMap.get(name)
    if (i === undefined) {
      i = textures.length
      textures.push(name)
      texMap.set(name, i)
    }
    return i
  }
  const modelCache = new Map<string, ResolvedModel | null>()
  // 同一个 variant（模型 + 旋转）只烤一次，很多状态共用
  const variantCache = new Map<string, BakedQuad[]>()
  const bake = (v: Variant) => {
    const key = `${resourceName(v.model)}|${v.x ?? 0}|${v.y ?? 0}|${v.uvlock ? 1 : 0}`
    let q = variantCache.get(key)
    if (!q) variantCache.set(key, (q = bakeVariant(src, v, modelCache, texIndex)))
    return q
  }
  const partCache = new Map<unknown, BakedPart>()
  const part = (apply: Variant | Variant[]) => {
    let p = partCache.get(apply)
    if (!p) partCache.set(apply, (p = toPart(apply, bake)))
    return p
  }

  const states = blocks.map((b) => {
    if (!b) return null
    const def = src.blockstate(b.name) as { variants?: Record<string, Variant | Variant[]>; multipart?: { when?: When; apply: Variant | Variant[] }[] } | undefined
    if (!def) return null
    let parts: BakedPart[] = []
    if (def.variants) {
      const key = Object.keys(def.variants).find((k) => variantMatches(k, b.props))
      if (key !== undefined) parts = [part(def.variants[key])]
    } else if (def.multipart) {
      parts = def.multipart.filter((c) => matches(c.when, b.props)).map((c) => part(c.apply))
    }
    // 没有任何面的模型（箱子、末地折跃门：原版用方块实体渲染器画）→ null，退回 v7 的画法
    return parts.some((p) => p.choices.some((c) => c.length > 0)) ? parts : null
  })
  return { textures, states }
}
