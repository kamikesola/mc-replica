/**
 * 方块纹理：全部用代码“画”出来，每张 16×16。
 *
 * 为什么不用原版纹理：原版的贴图归 Mojang 所有，不能放进公开仓库，也不能部署到公开 demo。
 * 自己画的好处是没有版权问题、仓库里没有二进制文件、想调颜色改一个数就行。
 * （v7 做方块模型时会支持读取你自己客户端里的资源包，到时候就能换成原版贴图在本地看。）
 *
 * 每个画家函数拿到一个 16×16 的画布（RGBA，一行一行从上到下）和一个固定种子的随机数，
 * 所以每次生成的纹理都一模一样。纹理左右、上下都能无缝拼接，因为贪婪网格会把同一张纹理平铺很多次。
 *
 * 染色（v4）：草、树叶、水和原版一样画成灰色，显示时乘上生物群系的颜色。
 * 要染色的像素把 alpha 设成 0（TINT），着色器看到 alpha < 1 就乘颜色；草方块侧面只有上面一圈草是染色的。
 */

export const TEX = 16

type RGB = [number, number, number]

/** 一张 16×16 的 RGBA 画布 */
export class Canvas {
  data = new Uint8ClampedArray(TEX * TEX * 4)

  set(x: number, y: number, [r, g, b]: RGB, a = 255): void {
    const i = (((y & 15) * TEX + (x & 15)) * 4) | 0
    this.data[i] = r
    this.data[i + 1] = g
    this.data[i + 2] = b
    this.data[i + 3] = a
  }

  get(x: number, y: number): RGB {
    const i = ((y & 15) * TEX + (x & 15)) * 4
    return [this.data[i], this.data[i + 1], this.data[i + 2]]
  }

  fill(f: (x: number, y: number) => RGB): void {
    for (let y = 0; y < TEX; y++) for (let x = 0; x < TEX; x++) this.set(x, y, f(x, y))
  }
}

/** 固定种子的随机数（mulberry32），只用来画纹理 */
export function rng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const hex = (h: number): RGB => [(h >> 16) & 255, (h >> 8) & 255, h & 255]
/** 颜色整体乘一个亮度系数 */
const shade = ([r, g, b]: RGB, k: number): RGB => [r * k, g * k, b * k]
/** 两个颜色按 t 混合 */
const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]

/** 每个像素在 base 的基础上随机亮一点或暗一点 */
function speckle(c: Canvas, base: RGB, amount: number, r: () => number): void {
  c.fill(() => shade(base, 1 + (r() - 0.5) * 2 * amount))
}

/** 把一些像素换成另一种颜色（斑点），每个斑点 1~size 个像素 */
function blotches(c: Canvas, color: () => RGB, count: number, size: number, r: () => number): void {
  for (let i = 0; i < count; i++) {
    let x = Math.floor(r() * TEX)
    let y = Math.floor(r() * TEX)
    const col = color()
    const n = 1 + Math.floor(r() * size)
    for (let k = 0; k < n; k++) {
      c.set(x, y, col)
      if (r() < 0.5) x += r() < 0.5 ? 1 : -1
      else y += r() < 0.5 ? 1 : -1
    }
  }
}

/**
 * 无缝的 Voronoi 分块：每个像素归到最近的种子点（距离按 16 取模，左右上下能接上）。
 * 返回每个像素属于哪一块，以及它离“边界”有多近（圆石、沙砾、萤石用）。
 */
function voronoi(points: number, r: () => number) {
  const seeds = Array.from({ length: points }, () => [r() * TEX, r() * TEX])
  const owner = new Int32Array(TEX * TEX)
  const edge = new Float32Array(TEX * TEX)
  for (let y = 0; y < TEX; y++) {
    for (let x = 0; x < TEX; x++) {
      let d1 = Infinity
      let d2 = Infinity
      let best = 0
      seeds.forEach(([sx, sy], i) => {
        let dx = Math.abs(x + 0.5 - sx)
        let dy = Math.abs(y + 0.5 - sy)
        dx = Math.min(dx, TEX - dx)
        dy = Math.min(dy, TEX - dy)
        const d = Math.hypot(dx, dy)
        if (d < d1) {
          d2 = d1
          d1 = d
          best = i
        } else if (d < d2) d2 = d
      })
      owner[y * TEX + x] = best
      edge[y * TEX + x] = d2 - d1 // 越小越靠近两块之间的缝
    }
  }
  return { owner, edge }
}

// ---------------------------------------------------------------- 各个纹理

const DIRT = hex(0x866043)
/** 草的灰度底色：乘上平原的草色（#91BD59）后大约是原来的绿色 */
const GRASS = hex(0xb8b8b8)
/** 要染色的像素的 alpha */
const TINT = 0

function stone(c: Canvas, r: () => number) {
  speckle(c, hex(0x7d7d7d), 0.06, r)
  blotches(c, () => shade(hex(0x7d7d7d), 0.82 + r() * 0.06), 10, 4, r)
  blotches(c, () => shade(hex(0x7d7d7d), 1.1), 6, 2, r)
}

function deepslate(c: Canvas, r: () => number) {
  speckle(c, hex(0x505058), 0.07, r)
  // 横向的层理：每隔几行一条断断续续的暗线
  for (const y of [2, 6, 10, 14]) {
    const off = Math.floor(r() * TEX)
    for (let x = 0; x < 11; x++) c.set(x + off, y + (x > 6 ? 1 : 0), shade(hex(0x505058), 0.72))
  }
}

function deepslateTop(c: Canvas, r: () => number) {
  speckle(c, hex(0x56565e), 0.06, r)
  const { edge } = voronoi(5, r)
  c.fill((x, y) => (edge[y * TEX + x] < 1 ? shade(hex(0x56565e), 0.72) : c.get(x, y)))
}

function dirt(c: Canvas, r: () => number) {
  speckle(c, DIRT, 0.07, r)
  blotches(c, () => shade(DIRT, 0.75), 12, 2, r)
  blotches(c, () => shade(DIRT, 1.18), 8, 2, r)
}

/** 把整张图都标成“要染色” */
function tintAll(c: Canvas): void {
  for (let i = 3; i < c.data.length; i += 4) c.data[i] = TINT
}

function grassTop(c: Canvas, r: () => number) {
  speckle(c, GRASS, 0.1, r)
  blotches(c, () => shade(GRASS, 0.8), 14, 2, r)
  blotches(c, () => shade(GRASS, 1.15), 10, 1, r)
  tintAll(c)
}

function grassSide(c: Canvas, r: () => number) {
  dirt(c, r)
  // 上面一圈草，下边缘参差不齐（每一列往下 2~5 格）
  for (let x = 0; x < TEX; x++) {
    const depth = 2 + Math.floor(r() * 3) + (r() < 0.2 ? 1 : 0)
    for (let y = 0; y < depth; y++) c.set(x, y, shade(GRASS, 0.88 + r() * 0.24), TINT)
  }
}

function sand(c: Canvas, r: () => number) {
  speckle(c, hex(0xdbd3a0), 0.04, r)
  blotches(c, () => shade(hex(0xdbd3a0), 0.88), 10, 1, r)
}

function gravel(c: Canvas, r: () => number) {
  const { owner, edge } = voronoi(14, r)
  const shades = Array.from({ length: 14 }, () => shade(hex(0x86807b), 0.75 + r() * 0.45))
  c.fill((x, y) => {
    const i = y * TEX + x
    return edge[i] < 0.7 ? shade(hex(0x86807b), 0.6) : shade(shades[owner[i]], 0.96 + r() * 0.08)
  })
}

function water(c: Canvas, r: () => number) {
  // 灰色，乘上生物群系的水色（海洋 #3F76E4、沼泽 #617B64、暖水海洋 #43D5EE……）
  const base = hex(0xf0f0f0)
  c.fill((x, y) => {
    // 两组斜向的亮纹，模拟水面的波光；sin 的周期是 16 的约数，所以能无缝拼接
    const w = Math.sin(((x + y * 2) / TEX) * Math.PI * 2) + Math.sin(((x * 2 - y) / TEX) * Math.PI * 2)
    return shade(base, 0.92 + w * 0.05 + (r() - 0.5) * 0.04)
  })
  tintAll(c)
}

function bedrock(c: Canvas, r: () => number) {
  c.fill(() => {
    const t = r()
    return t < 0.35 ? hex(0x2a2a2a) : t < 0.7 ? hex(0x575757) : t < 0.9 ? hex(0x7a7a7a) : hex(0x1a1a1a)
  })
}

function planks(c: Canvas, r: () => number) {
  const base = hex(0xa2834f)
  // 4 块木板，每块 4 行；每块的接缝位置不同
  for (let board = 0; board < 4; board++) {
    const seam = Math.floor(r() * TEX)
    const k = 0.94 + r() * 0.12
    for (let y = board * 4; y < board * 4 + 4; y++) {
      for (let x = 0; x < TEX; x++) {
        let col = shade(base, k * (1 + (r() - 0.5) * 0.06))
        if (y === board * 4 + 3) col = shade(base, 0.68) // 板与板之间的缝
        else if (x === seam) col = shade(base, 0.74) // 木板的接头
        c.set(x, y, col)
      }
    }
  }
}

function cobblestone(c: Canvas, r: () => number) {
  const { owner, edge } = voronoi(9, r)
  const shades = Array.from({ length: 9 }, () => 0.8 + r() * 0.35)
  c.fill((x, y) => {
    const i = y * TEX + x
    if (edge[i] < 0.9) return shade(hex(0x7a7a7a), 0.55)
    return shade(hex(0x7a7a7a), shades[owner[i]] * (1 + (r() - 0.5) * 0.08))
  })
}

function log(c: Canvas, r: () => number) {
  const base = hex(0x6b5132)
  // 树皮：竖条纹，每一列亮度不同
  const cols = Array.from({ length: TEX }, () => 0.8 + r() * 0.35)
  c.fill((x) => shade(base, cols[x] * (1 + (r() - 0.5) * 0.12)))
  blotches(c, () => shade(base, 0.6), 5, 3, r)
}

function logTop(c: Canvas, r: () => number) {
  const wood = hex(0xb4935f)
  c.fill((x, y) => {
    const d = Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5)) // 方形的年轮，像原版
    if (d > 7) return shade(hex(0x6b5132), 0.9 + r() * 0.2) // 最外一圈是树皮
    const ring = Math.floor(d) % 2 === 0 ? 1 : 0.86
    return shade(wood, ring * (1 + (r() - 0.5) * 0.05))
  })
}

function leaves(c: Canvas, r: () => number) {
  const base = hex(0x9a9a9a)
  c.fill(() => {
    const t = r()
    return t < 0.18 ? shade(base, 0.55) : shade(base, 0.85 + r() * 0.35)
  })
  tintAll(c)
}

function glowstone(c: Canvas, r: () => number) {
  const { owner, edge } = voronoi(7, r)
  const shades = Array.from({ length: 7 }, () => mix(hex(0xc89a4e), hex(0xffe9a0), r()))
  c.fill((x, y) => {
    const i = y * TEX + x
    return edge[i] < 0.8 ? hex(0x8a6a35) : shade(shades[owner[i]], 0.95 + r() * 0.1)
  })
}

function lava(c: Canvas, r: () => number) {
  // 橙红色底，加上几道亮黄色的“流纹”；和水一样用 sin 保证能无缝拼接
  c.fill((x, y) => {
    const w = Math.sin(((x + y) / TEX) * Math.PI * 4) * 0.5 + Math.sin(((x * 2 - y) / TEX) * Math.PI * 2) * 0.5
    const t = Math.max(0, Math.min(1, 0.5 + w * 0.6 + (r() - 0.5) * 0.25))
    return mix(hex(0xc8400f), hex(0xffc23a), t * t)
  })
  blotches(c, () => hex(0x9a2a08), 6, 3, r)
}

function obsidian(c: Canvas, r: () => number) {
  speckle(c, hex(0x1b1426), 0.12, r)
  blotches(c, () => hex(0x3b2a5a), 10, 3, r)
  blotches(c, () => hex(0x0c0912), 8, 2, r)
}

// ---------------------------------------------------------------- v4：地表规则用到的方块

/** 砂岩侧面：横向的层，最上面一条亮边 */
const sandstoneSide = (base: number) => (c: Canvas, r: () => number) => {
  speckle(c, hex(base), 0.04, r)
  for (const y of [4, 9, 13]) for (let x = 0; x < TEX; x++) if (r() < 0.8) c.set(x, y, shade(hex(base), 0.88))
  for (let x = 0; x < TEX; x++) c.set(x, 0, shade(hex(base), 1.06))
}
const sandstoneTop = (base: number) => (c: Canvas, r: () => number) => {
  speckle(c, hex(base), 0.035, r)
  blotches(c, () => shade(hex(base), 0.93), 8, 2, r)
}
const sandLike = (base: number) => (c: Canvas, r: () => number) => {
  speckle(c, hex(base), 0.05, r)
  blotches(c, () => shade(hex(base), 0.86), 10, 1, r)
}

function snow(c: Canvas, r: () => number) {
  speckle(c, hex(0xf4fafa), 0.025, r)
  blotches(c, () => hex(0xdfe9ef), 6, 2, r)
}

function powderSnow(c: Canvas, r: () => number) {
  speckle(c, hex(0xf7fbfd), 0.02, r)
  blotches(c, () => hex(0xe7eff4), 10, 3, r)
}

function ice(c: Canvas, r: () => number) {
  speckle(c, hex(0x8db4fa), 0.05, r)
  // 几道白色的裂纹
  for (let k = 0; k < 3; k++) {
    let x = Math.floor(r() * TEX)
    let y = Math.floor(r() * TEX)
    for (let n = 0; n < 6; n++) {
      c.set(x, y, hex(0xd8e8ff))
      x += 1
      y += r() < 0.5 ? 1 : 0
    }
  }
}

function packedIce(c: Canvas, r: () => number) {
  const { edge } = voronoi(6, r)
  c.fill((x, y) => (edge[y * TEX + x] < 0.6 ? hex(0xa9c8f5) : shade(hex(0x8aaee8), 0.96 + r() * 0.08)))
}

function mud(c: Canvas, r: () => number) {
  speckle(c, hex(0x3c3a3c), 0.08, r)
  blotches(c, () => hex(0x4b4446), 10, 3, r)
}

function myceliumTop(c: Canvas, r: () => number) {
  speckle(c, hex(0x6f6268), 0.1, r)
  blotches(c, () => hex(0x8d8287), 12, 2, r)
  blotches(c, () => hex(0x5a4c55), 8, 2, r)
}

/** 侧面：土 + 上面一圈别的颜色（菌丝体、灰化土），和草方块侧面一样的形状 */
const toppedSide = (top: number) => (c: Canvas, r: () => number) => {
  dirt(c, r)
  for (let x = 0; x < TEX; x++) {
    const depth = 2 + Math.floor(r() * 3)
    for (let y = 0; y < depth; y++) c.set(x, y, shade(hex(top), 0.88 + r() * 0.24))
  }
}

function podzolTop(c: Canvas, r: () => number) {
  speckle(c, hex(0x5b3f1d), 0.1, r)
  blotches(c, () => hex(0x7a5428), 14, 3, r)
  blotches(c, () => hex(0x3e2a12), 8, 2, r)
}

function coarseDirt(c: Canvas, r: () => number) {
  dirt(c, r)
  blotches(c, () => shade(hex(0x77553b), 0.7), 14, 2, r)
  blotches(c, () => hex(0x8a8a8a), 6, 1, r) // 碎石子
}

function calcite(c: Canvas, r: () => number) {
  speckle(c, hex(0xdfe0dc), 0.03, r)
  const { edge } = voronoi(5, r)
  c.fill((x, y) => (edge[y * TEX + x] < 0.5 ? hex(0xc9cac6) : c.get(x, y)))
}

/** 陶瓦：几乎是纯色，只有很细的颗粒 */
const terracotta = (base: number) => (c: Canvas, r: () => number) => {
  speckle(c, hex(base), 0.03, r)
  blotches(c, () => shade(hex(base), 0.93), 6, 2, r)
}

/**
 * 全部纹理，顺序就是纹理数组的层号（layer）。
 * 0 号留空不用：网格里用 0 表示“这里没有面”。
 */
export const PAINTERS = {
  stone,
  deepslate,
  deepslate_top: deepslateTop,
  dirt,
  grass_top: grassTop,
  grass_side: grassSide,
  sand,
  gravel,
  water,
  bedrock,
  planks,
  cobblestone,
  log,
  log_top: logTop,
  leaves,
  glowstone,
  lava,
  obsidian,
  sandstone: sandstoneSide(0xd8cb9b),
  sandstone_top: sandstoneTop(0xdccf9f),
  red_sand: sandLike(0xbe6621),
  red_sandstone: sandstoneSide(0xb5621f),
  red_sandstone_top: sandstoneTop(0xb9652a),
  snow,
  powder_snow: powderSnow,
  ice,
  packed_ice: packedIce,
  mud,
  mycelium_top: myceliumTop,
  mycelium_side: toppedSide(0x6f6268),
  podzol_top: podzolTop,
  podzol_side: toppedSide(0x6a4a22),
  coarse_dirt: coarseDirt,
  calcite,
  terracotta: terracotta(0x985e43),
  white_terracotta: terracotta(0xd1b2a1),
  orange_terracotta: terracotta(0xa15325),
  yellow_terracotta: terracotta(0xba8523),
  brown_terracotta: terracotta(0x4d3323),
  red_terracotta: terracotta(0x8f3d2e),
  light_gray_terracotta: terracotta(0x876a61)
} satisfies Record<string, (c: Canvas, r: () => number) => void>

export type TextureName = keyof typeof PAINTERS

export const TEXTURE_NAMES = Object.keys(PAINTERS) as TextureName[]

/** 纹理名 → 层号（从 1 开始） */
export const TEXTURE_LAYER = Object.fromEntries(TEXTURE_NAMES.map((n, i) => [n, i + 1])) as Record<TextureName, number>

/** 层数（含空着的 0 号） */
export const TEXTURE_COUNT = TEXTURE_NAMES.length + 1

/** 画出所有纹理，按层号排好：[层0 RGBA][层1 RGBA]…，每层 16×16×4 字节 */
export function paintAll(): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(TEXTURE_COUNT * TEX * TEX * 4)
  TEXTURE_NAMES.forEach((name, i) => {
    const c = new Canvas()
    // 每张纹理用名字算出自己的种子，加新纹理不会影响旧纹理的样子
    let seed = 0
    for (const ch of name) seed = Math.imul(seed, 31) + ch.charCodeAt(0)
    PAINTERS[name](c, rng(seed))
    out.set(c.data, (i + 1) * TEX * TEX * 4)
  })
  return out
}

/** 染色种类（顶点里存的值）：0 不染色，1 草，2 树叶，3 水 */
export const enum Tint {
  none = 0,
  grass = 1,
  foliage = 2,
  water = 3
}

/** 纹理层号 → 染色种类 */
export const TINT_BY_LAYER: Uint8Array = (() => {
  const t = new Uint8Array(TEXTURE_COUNT)
  t[TEXTURE_LAYER.grass_top] = Tint.grass
  t[TEXTURE_LAYER.grass_side] = Tint.grass
  t[TEXTURE_LAYER.leaves] = Tint.foliage
  t[TEXTURE_LAYER.water] = Tint.water
  return t
})()
