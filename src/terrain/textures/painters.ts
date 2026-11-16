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

/** 雪地草方块的侧面（v7，snowy=true）：泥土，上面一圈雪，不染色 */
function grassSnowSide(c: Canvas, r: () => number) {
  dirt(c, r)
  for (let x = 0; x < TEX; x++) {
    const depth = 2 + Math.floor(r() * 3) + (r() < 0.2 ? 1 : 0)
    for (let y = 0; y < depth; y++) c.set(x, y, shade(hex(0xf0f6f8), 0.92 + r() * 0.1))
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

// ---------------------------------------------------------------- v5：矿石、石头、树木、装饰

/** 一种颜色的“石头类”纹理：底色 + 明暗斑点 */
const rocky = (base: number, spots = 0.85, light = 1.12) => (c: Canvas, r: () => number) => {
  speckle(c, hex(base), 0.07, r)
  blotches(c, () => shade(hex(base), spots + r() * 0.06), 12, 3, r)
  blotches(c, () => shade(hex(base), light), 8, 2, r)
}

/** 矿石：石头 / 深板岩底，加几团矿物颜色（每团 2~4 个像素，中间亮、边上暗） */
const ore = (deep: boolean, color: number, clusters = 5) => (c: Canvas, r: () => number) => {
  ;(deep ? deepslate : stone)(c, r)
  for (let i = 0; i < clusters; i++) {
    const x0 = 2 + Math.floor(r() * 12)
    const y0 = 2 + Math.floor(r() * 12)
    const n = 2 + Math.floor(r() * 3)
    for (let k = 0; k < n; k++) {
      const x = x0 + Math.floor(r() * 3) - 1
      const y = y0 + Math.floor(r() * 3) - 1
      c.set(x, y, shade(hex(color), 0.8 + r() * 0.4))
    }
    c.set(x0, y0, shade(hex(color), 1.15))
  }
}

/** 粗矿块 */
const rawBlock = (color: number) => (c: Canvas, r: () => number) => {
  const { owner, edge } = voronoi(6, r)
  const shades = Array.from({ length: 6 }, () => 0.8 + r() * 0.35)
  c.fill((x, y) => {
    const i = y * TEX + x
    return edge[i] < 0.8 ? shade(hex(color), 0.55) : shade(hex(color), shades[owner[i]] * (1 + (r() - 0.5) * 0.08))
  })
}

/** 原木侧面：竖条纹的树皮 */
const logSide = (bark: number, stripe = 0.6) => (c: Canvas, r: () => number) => {
  const base = hex(bark)
  const cols = Array.from({ length: TEX }, () => 0.8 + r() * 0.35)
  c.fill((x) => shade(base, cols[x] * (1 + (r() - 0.5) * 0.12)))
  blotches(c, () => shade(base, stripe), 5, 3, r)
}

/** 白桦的树皮：白底黑斑 */
function birchLog(c: Canvas, r: () => number) {
  speckle(c, hex(0xd8d7d2), 0.05, r)
  for (let i = 0; i < 7; i++) {
    const x = Math.floor(r() * TEX)
    const y = Math.floor(r() * TEX)
    const w = 2 + Math.floor(r() * 4)
    for (let k = 0; k < w; k++) c.set(x + k, y, shade(hex(0x2e2b28), 0.9 + r() * 0.3))
  }
}

/** 原木顶面：方形年轮 + 一圈树皮 */
const logEnd = (wood: number, bark: number) => (c: Canvas, r: () => number) => {
  c.fill((x, y) => {
    const d = Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5))
    if (d > 7) return shade(hex(bark), 0.9 + r() * 0.2)
    const ring = Math.floor(d) % 2 === 0 ? 1 : 0.86
    return shade(hex(wood), ring * (1 + (r() - 0.5) * 0.05))
  })
}

/** 树叶：有颜色的（不染色）版本；tinted = true 时画成灰色、由生物群系染色 */
const leavesOf = (color: number, tinted: boolean, flowers?: number) => (c: Canvas, r: () => number) => {
  const base = hex(color)
  c.fill(() => (r() < 0.18 ? shade(base, 0.55) : shade(base, 0.85 + r() * 0.35)))
  if (flowers !== undefined) blotches(c, () => shade(hex(flowers), 0.9 + r() * 0.2), 9, 2, r)
  if (tinted) tintAll(c)
}

/** 蘑菇方块的菌盖：底色 + 白点 */
const mushroomCap = (color: number, dots: boolean) => (c: Canvas, r: () => number) => {
  speckle(c, hex(color), 0.06, r)
  if (dots) blotches(c, () => hex(0xe8e0d0), 6, 4, r)
}

/** 蘑菇方块的里面（v7，没有“皮”的那几面）：米色带小孔 */
function mushroomInside(c: Canvas, r: () => number) {
  speckle(c, hex(0xd9c9a8), 0.05, r)
  for (let i = 0; i < 14; i++) c.set(Math.floor(r() * TEX), Math.floor(r() * TEX), hex(0xb8a283))
}

function mushroomStem(c: Canvas, r: () => number) {
  const cols = Array.from({ length: TEX }, () => 0.9 + r() * 0.15)
  c.fill((x) => shade(hex(0xcfc6b5), cols[x] * (1 + (r() - 0.5) * 0.06)))
}

function beeNestSide(c: Canvas, r: () => number) {
  planksLike(c, r, 0xc39a4c)
  for (let x = 0; x < TEX; x++) c.set(x, 7, shade(hex(0x7a5a2a), 0.9))
}

function beeNestTop(c: Canvas, r: () => number) {
  const { edge } = voronoi(8, r)
  c.fill((x, y) => (edge[y * TEX + x] < 0.8 ? hex(0x8a6a2a) : shade(hex(0xd4a640), 0.9 + r() * 0.2)))
}

function planksLike(c: Canvas, r: () => number, color: number) {
  const base = hex(color)
  for (let y = 0; y < TEX; y++) for (let x = 0; x < TEX; x++) c.set(x, y, shade(base, (y % 4 === 3 ? 0.7 : 1) * (0.94 + r() * 0.1)))
}

function creakingHeart(c: Canvas, r: () => number) {
  logSide(0x5b534c)(c, r)
  for (let y = 5; y < 11; y++) for (let x = 5; x < 11; x++) c.set(x, y, Math.abs(x - 7.5) + Math.abs(y - 7.5) < 3 ? hex(0xe07a2a) : hex(0x3a322c))
}

function mangroveRoots(c: Canvas, r: () => number) {
  c.fill(() => hex(0x2c2a24))
  for (let i = 0; i < 6; i++) {
    const vertical = r() < 0.5
    const k = Math.floor(r() * TEX)
    for (let t = 0; t < TEX; t++) c.set(vertical ? k : t, vertical ? t : k, shade(hex(0x4a3b2a), 0.85 + r() * 0.3))
  }
}

function muddyMangroveRoots(c: Canvas, r: () => number) {
  mud(c, r)
  for (let i = 0; i < 4; i++) {
    const k = Math.floor(r() * TEX)
    for (let t = 0; t < TEX; t++) c.set(k, t, shade(hex(0x4a3b2a), 0.85 + r() * 0.3))
  }
}

function rootedDirt(c: Canvas, r: () => number) {
  dirt(c, r)
  blotches(c, () => hex(0xa7835a), 8, 4, r)
}

/** 苔藓地毯 */
const carpet = (color: number) => (c: Canvas, r: () => number) => {
  speckle(c, hex(color), 0.1, r)
  blotches(c, () => shade(hex(color), 0.8), 10, 2, r)
}

/** 十字形的植物类纹理：透明底，画一些像素（cutout） */
const sprite = (color: number, draw: (set: (x: number, y: number, k?: number) => void, r: () => number) => void, tinted = false) => (c: Canvas, r: () => number) => {
  for (let i = 3; i < c.data.length; i += 4) c.data[i] = 0
  draw((x, y, k = 1) => c.set(x, y, shade(hex(color), k * (0.85 + r() * 0.3)), 255), r)
  if (tinted) for (let i = 0; i < c.data.length; i += 4) if (c.data[i + 3] === 0) c.data[i] = c.data[i + 1] = c.data[i + 2] = 0
}

const vine = sprite(
  0x9a9a9a,
  (set, r) => {
    for (let x = 0; x < TEX; x += 3) {
      const len = 6 + Math.floor(r() * 10)
      let xx = x
      for (let y = 0; y < len; y++) {
        set(xx, y)
        if (r() < 0.4) set(xx + 1, y, 0.8)
        if (r() < 0.2) xx += r() < 0.5 ? 1 : -1
      }
    }
  },
  true
)

const hangingMoss = sprite(0xb7bdb0, (set, r) => {
  for (let x = 2; x < 14; x += 2) {
    const len = 5 + Math.floor(r() * 10)
    for (let y = 0; y < len; y++) set(x + (y % 3 === 0 ? 1 : 0), y)
  }
})

const propagule = sprite(0x6aa84f, (set) => {
  for (let y = 0; y < 12; y++) set(7, y + 2, 0.9)
  for (let x = 5; x < 10; x++) set(x, 2)
  set(7, 14, 0.6)
})

const cocoa = sprite(0xb06a2e, (set) => {
  for (let y = 4; y < 12; y++) for (let x = 5; x < 11; x++) if ((x - 7.5) ** 2 / 9 + (y - 7.5) ** 2 / 16 < 1) set(x, y, x === 7 ? 0.7 : 1)
  set(7, 2, 0.6)
  set(7, 3, 0.6)
})

// ---------------------------------------------------------------- v5.1：植物、洞穴、地形类地物的方块

/** 草叶：从底部长出来的几根竖线 */
const grassBlades = (color: number, top = 12) => (c: Canvas, r: () => number) =>
  sprite(color, (set, rr) => {
    for (let x = 1; x < 15; x += 2) {
      const h = Math.floor(top * (0.45 + rr() * 0.55))
      let xx = x
      for (let y = 15; y > 15 - h; y--) {
        set(xx, y, 0.8 + (15 - y) / 40)
        if (rr() < 0.15) xx += rr() < 0.5 ? 1 : -1
      }
    }
  }, true)(c, r)

const fernSprite = (color: number, top = 13) => (c: Canvas, r: () => number) =>
  sprite(color, (set) => {
    for (let y = 15; y > 15 - top; y--) {
      set(7, y)
      const w = Math.floor(((y - (15 - top)) / top) * 5)
      if (y % 2 === 0) for (let k = 1; k <= w; k++) {
        set(7 - k, y - (k >> 1), 0.9)
        set(7 + k, y - (k >> 1), 0.9)
      }
    }
  }, true)(c, r)

const deadBush = sprite(0x8a6a3a, (set, r) => {
  for (let i = 0; i < 5; i++) {
    let x = 7
    for (let y = 15; y > 4; y--) {
      set(x, y)
      if (r() < 0.4) x += i % 2 ? 1 : -1
      if (x < 1 || x > 14) break
    }
  }
})

/** 花：绿色的茎 + 花朵；tall 表示两格高的花（向日葵等，上下两半用同一张图） */
const flower = (color: number, tall = 0) => (c: Canvas, r: () => number) => {
  for (let i = 3; i < c.data.length; i += 4) c.data[i] = 0
  const stemTop = tall ? 2 : 6
  for (let y = 15; y >= stemTop; y--) c.set(7, y, shade(hex(0x3f8a2a), 0.85 + r() * 0.3), 255)
  c.set(6, 11, hex(0x4f9a3a), 255)
  c.set(8, 9, hex(0x4f9a3a), 255)
  const cy = tall ? 4 : 5
  for (let y = cy - 2; y <= cy + 2; y++)
    for (let x = 5; x <= 9; x++) if (Math.abs(x - 7) + Math.abs(y - cy) <= 3) c.set(x, y, shade(hex(color), 0.8 + r() * 0.35), 255)
  c.set(7, cy, shade(hex(color), 0.6), 255)
}

/** 两格高的花的下半格（v7）：只有茎和叶子 */
const tallFlowerBottom = (c: Canvas, r: () => number) => {
  for (let i = 3; i < c.data.length; i += 4) c.data[i] = 0
  for (let y = 0; y < 16; y++) c.set(7, y, shade(hex(0x3f8a2a), 0.85 + r() * 0.3), 255)
  for (const [x, y] of [[6, 4], [5, 5], [8, 8], [9, 9], [10, 10], [6, 12], [5, 13]]) c.set(x, y, shade(hex(0x4f9a3a), 0.85 + r() * 0.3), 255)
}

const mushroomSprite = (color: number) =>
  sprite(color, (set) => {
    for (let y = 9; y < 15; y++) set(7, y, 0.7)
    for (let x = 4; x <= 10; x++) for (let y = 5; y <= 8; y++) if (Math.abs(x - 7) <= 3 - Math.max(0, 6 - y)) set(x, y)
  })

const berryBush = (c: Canvas, r: () => number) => {
  sprite(0x3f6a2a, (set, rr) => {
    for (let i = 0; i < 70; i++) set(Math.floor(rr() * 14) + 1, Math.floor(rr() * 10) + 5)
  })(c, r)
  for (let i = 0; i < 5; i++) c.set(2 + Math.floor(r() * 12), 6 + Math.floor(r() * 8), hex(0xb0202a), 255)
}

const sugarCane = sprite(0xa0a0a0, (set) => {
  for (const x of [3, 7, 11]) for (let y = 0; y < 16; y++) set(x, y, y % 5 === 0 ? 0.7 : 1)
}, true)

const bambooSprite = sprite(0x5d9a2a, (set) => {
  for (let y = 0; y < 16; y++) {
    set(7, y, y % 6 === 0 ? 0.6 : 1)
    set(8, y, y % 6 === 0 ? 0.6 : 0.9)
  }
  for (let x = 9; x < 13; x++) set(x, 3, 1.1)
})

const bush = (color: number, flowers?: number) => (c: Canvas, r: () => number) => {
  sprite(color, (set, rr) => {
    for (let i = 0; i < 120; i++) set(Math.floor(rr() * 16), Math.floor(rr() * 12) + 2)
  })(c, r)
  if (flowers !== undefined) for (let i = 0; i < 8; i++) c.set(Math.floor(r() * 16), 2 + Math.floor(r() * 10), hex(flowers), 255)
}

const petals = (c: Canvas, r: () => number) => {
  for (let i = 3; i < c.data.length; i += 4) c.data[i] = 0
  for (let i = 0; i < 14; i++) {
    const x = Math.floor(r() * 14) + 1
    const y = Math.floor(r() * 14) + 1
    c.set(x, y, hex(0xf2a8c8), 255)
    c.set(x + 1, y, hex(0xe890b8), 255)
  }
}

const lilyPad = (c: Canvas, r: () => number) => {
  c.fill((x, y) => ((x - 7.5) ** 2 + (y - 7.5) ** 2 < 49 && !(x > 7 && Math.abs(y - 7.5) < 1) ? shade(hex(0x9a9a9a), 0.85 + r() * 0.3) : [0, 0, 0]))
  for (let i = 0; i < c.data.length; i += 4) c.data[i + 3] = c.data[i] === 0 ? 0 : 255
}

const pumpkinSide = (c: Canvas, r: () => number) => c.fill((x) => shade(hex(0xd8892a), (x % 4 === 0 ? 0.75 : 1) * (0.92 + r() * 0.1)))
const pumpkinTop = (c: Canvas, r: () => number) => c.fill((x, y) => (Math.abs(x - 7.5) < 1.5 && Math.abs(y - 7.5) < 1.5 ? hex(0x5a7a2a) : shade(hex(0xd08228), 0.9 + r() * 0.12)))
const melonSide = (c: Canvas, r: () => number) => c.fill((x) => shade(hex(x % 4 < 2 ? 0x6fa12a : 0x8bb83a), 0.92 + r() * 0.1))
const melonTop = (c: Canvas, r: () => number) => c.fill((x, y) => shade(hex(Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5)) % 3 < 1.5 ? 0x6fa12a : 0x8bb83a), 0.92 + r() * 0.1))
const cactusSide = (c: Canvas, r: () => number) => c.fill((x, y) => (x === 0 || x === 15 ? hex(0x2c5a1c) : (x + y) % 5 === 0 ? hex(0xd8d8b0) : shade(hex(0x4c8a2c), 0.88 + r() * 0.14)))
const cactusTop = (c: Canvas, r: () => number) => c.fill((x, y) => (x === 0 || x === 15 || y === 0 || y === 15 ? hex(0x2c5a1c) : shade(hex(0x5c9a3c), 0.9 + r() * 0.12)))

const kelpSprite = sprite(0x5a8a2a, (set, r) => {
  let x = 7
  for (let y = 0; y < 16; y++) {
    set(x, y)
    set(x + 1, y, 0.85)
    if (y % 4 === 1) for (let k = 1; k < 4; k++) set(x + (y % 8 === 1 ? k + 1 : -k), y + (k >> 1), 0.9)
    if (r() < 0.2) x += r() < 0.5 ? 1 : -1
    x = Math.max(4, Math.min(10, x))
  }
})

const seaPickle = sprite(0x6a8a2a, (set) => {
  for (const x0 of [4, 9]) for (let y = 9; y < 16; y++) for (let x = x0; x < x0 + 3; x++) set(x, y, y < 11 ? 1.2 : 1)
})

const lichenColor = (color: number) =>
  sprite(color, (set, r) => {
    for (let i = 0; i < 60; i++) set(Math.floor(r() * 16), Math.floor(r() * 16), 0.8 + r() * 0.4)
  })
const lichen = lichenColor(0x7a9a7a)

const hangingRoots = sprite(0xa07a5a, (set, r) => {
  for (let x = 2; x < 14; x += 2) {
    const len = 6 + Math.floor(r() * 9)
    for (let y = 0; y < len; y++) set(x + (y % 4 === 3 ? 1 : 0), y)
  }
})

const sporeBlossom = sprite(0xd864a8, (set) => {
  for (let x = 3; x < 13; x++) for (let y = 0; y < 3; y++) set(x, y, Math.abs(x - 7.5) < 2 ? 0.7 : 1)
  for (let x = 5; x < 11; x++) set(x, 3, 0.8)
})

const caveVines = (berries: boolean) => (c: Canvas, r: () => number) => {
  sprite(0x4a7a2a, (set) => {
    for (const x of [5, 10]) for (let y = 0; y < 16; y++) set(x + (y % 5 === 0 ? 1 : 0), y)
  })(c, r)
  if (berries) for (const [x, y] of [[4, 6], [11, 10], [6, 13]]) c.set(x, y, hex(0xf2a02a), 255)
}

const dripleaf = sprite(0x5a9a2a, (set) => {
  for (let y = 6; y < 16; y++) set(7, y, 0.8)
  for (let x = 1; x < 15; x++) for (let y = 2; y < 6; y++) if (Math.abs(x - 7.5) < 7 - (5 - y)) set(x, y)
})
const dripleafStem = sprite(0x5a9a2a, (set) => {
  for (let y = 0; y < 16; y++) set(7, y, 0.85)
})

const dripstoneSprite = sprite(0x86685a, (set) => {
  for (let y = 0; y < 16; y++) {
    const w = Math.max(0, 3 - Math.floor(y / 5))
    for (let x = 7 - w; x <= 8 + w; x++) set(x, y)
  }
})

const crystal = (color: number) =>
  sprite(color, (set) => {
    for (let y = 4; y < 16; y++) {
      set(7, y, 1.15)
      set(8, y, 0.95)
      if (y > 8) {
        set(5, y, 0.9)
        set(10, y, 1)
      }
    }
  })

const sculkBlock = (c: Canvas, r: () => number) => {
  c.fill(() => shade(hex(0x0c2c3a), 0.8 + r() * 0.4))
  blotches(c, () => hex(0x2ac8d8), 5, 1, r)
}

const mossyCobble = (c: Canvas, r: () => number) => {
  cobblestone(c, r)
  blotches(c, () => shade(hex(0x5a7a2c), 0.85 + r() * 0.3), 8, 3, r)
}

const magma = (c: Canvas, r: () => number) => {
  const { edge } = voronoi(7, r)
  c.fill((x, y) => (edge[y * TEX + x] < 0.9 ? hex(0xe8781a) : shade(hex(0x6a2a12), 0.8 + r() * 0.4)))
}

const spawner = (c: Canvas) => c.fill((x, y) => (x % 4 === 0 || y % 4 === 0 ? hex(0x2a3a4a) : [12, 16, 22]))
const chestSide = (c: Canvas, r: () => number) => c.fill((x, y) => (y === 5 || x === 0 || x === 15 || y === 0 || y === 15 ? hex(0x4a3014) : (x >= 7 && x <= 8 && y >= 4 && y <= 7 ? hex(0xb8b8b8) : shade(hex(0xa8742a), 0.9 + r() * 0.12))))
const boneSide = (c: Canvas, r: () => number) => c.fill((x) => shade(hex(0xe2dcc4), (x % 5 === 0 ? 0.85 : 1) * (0.94 + r() * 0.08)))
const boneTop = (c: Canvas, r: () => number) => c.fill((x, y) => (Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5)) < 3 ? hex(0xb8b09a) : shade(hex(0xe2dcc4), 0.94 + r() * 0.08)))

const coral = (color: number) =>
  sprite(color, (set) => {
    for (const [x0, h] of [[4, 10], [8, 13], [11, 8]]) for (let y = 15; y > 15 - h; y--) set(x0 + (y % 4 === 0 ? 1 : 0), y)
  })
const coralFan = (color: number) =>
  sprite(color, (set) => {
    for (let y = 6; y < 16; y++) for (let x = 0; x < 16; x++) if (Math.abs(x - 7.5) < (16 - y) * 0.75 && (x + y) % 3 !== 0) set(x, y)
  })

// ---------------------------------------------------------------- v5.2：下界、末地、气泡柱

const netherrack = (c: Canvas, r: () => number) => {
  speckle(c, hex(0x6e2a2a), 0.12, r)
  blotches(c, () => shade(hex(0x6e2a2a), 0.7 + r() * 0.1), 14, 2, r)
  blotches(c, () => shade(hex(0x8e3a36), 1.05), 8, 2, r)
}
const soulSand = (c: Canvas, r: () => number) => {
  speckle(c, hex(0x52402e), 0.1, r)
  // 灵魂沙上的“脸”：几个暗色的小坑
  for (let i = 0; i < 4; i++) {
    const x = 2 + Math.floor(r() * 11)
    const y = 2 + Math.floor(r() * 11)
    c.set(x, y, hex(0x2e2218), 255)
    c.set(x + 2, y, hex(0x2e2218), 255)
    c.set(x + 1, y + 2, hex(0x2e2218), 255)
  }
}
const basaltSide = (c: Canvas, r: () => number) => c.fill((x) => shade(hex(0x4a4a50), (x % 4 === 0 ? 0.75 : 1) * (0.9 + r() * 0.15)))
const basaltTop = (c: Canvas, r: () => number) => c.fill((x, y) => shade(hex(0x5a5a60), (Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5)) % 3 < 1 ? 0.8 : 1) * (0.92 + r() * 0.1)))
const netherOre = (color: number) => (c: Canvas, r: () => number) => {
  netherrack(c, r)
  for (let i = 0; i < 6; i++) {
    const x = 2 + Math.floor(r() * 12)
    const y = 2 + Math.floor(r() * 12)
    c.set(x, y, shade(hex(color), 0.9 + r() * 0.3))
    c.set(x + 1, y, shade(hex(color), 0.8))
  }
}
const debrisSide = (c: Canvas, r: () => number) => c.fill((x, y) => shade(hex(0x5e4238), ((x + y * 3) % 7 < 2 ? 0.7 : 1) * (0.9 + r() * 0.15)))
const debrisTop = (c: Canvas, r: () => number) => c.fill((x, y) => shade(hex(0x6a4c40), (Math.hypot(x - 7.5, y - 7.5) % 4 < 1.2 ? 0.75 : 1) * (0.9 + r() * 0.12)))
const nyliumTop = (color: number) => (c: Canvas, r: () => number) => {
  speckle(c, hex(color), 0.12, r)
  blotches(c, () => shade(hex(color), 1.2), 6, 2, r)
}
const nyliumSide = (color: number) => (c: Canvas, r: () => number) => {
  netherrack(c, r)
  for (let x = 0; x < 16; x++) {
    const h = 3 + Math.floor(r() * 3)
    for (let y = 0; y < h; y++) c.set(x, y, shade(hex(color), 0.85 + r() * 0.3))
  }
}
const stemSide = (bark: number, glow: number) => (c: Canvas, r: () => number) => {
  logSide(bark)(c, r)
  for (let i = 0; i < 10; i++) c.set(Math.floor(r() * 16), Math.floor(r() * 16), shade(hex(glow), 0.9 + r() * 0.3))
}
const fungus = (color: number) =>
  sprite(color, (set) => {
    for (let y = 9; y < 16; y++) set(7, y, 0.7)
    for (let x = 3; x <= 11; x++) for (let y = 4; y <= 8; y++) if (Math.abs(x - 7) <= 4 - Math.max(0, 6 - y)) set(x, y)
  })
const netherRoots = (color: number) =>
  sprite(color, (set, r) => {
    for (let x = 2; x < 14; x += 2) {
      const h = 6 + Math.floor(r() * 8)
      for (let y = 15; y > 15 - h; y--) set(x + (y % 3 === 0 ? 1 : 0), y)
    }
  })
const netherVines = (color: number) =>
  sprite(color, (set) => {
    for (const x of [5, 9]) for (let y = 0; y < 16; y++) set(x + (y % 4 < 2 ? 0 : 1), y)
  })
const fire = (color: number) =>
  sprite(color, (set, r) => {
    for (let x = 1; x < 15; x++) {
      const h = 6 + Math.floor(r() * 9)
      for (let y = 15; y > 15 - h; y--) set(x, y, 0.75 + (15 - y) / 30)
    }
  })
const ironBars = sprite(0x9a9a9a, (set) => {
  for (const x of [1, 6, 9, 14]) for (let y = 0; y < 16; y++) set(x, y)
  for (const y of [0, 15]) for (let x = 0; x < 16; x++) set(x, y)
})
/** 气泡柱只画水，这张纹理用不到（形状是 none） */
const bubbles = sprite(0xd8e8ff, (set, r) => {
  for (let i = 0; i < 8; i++) set(Math.floor(r() * 16), Math.floor(r() * 16))
})

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
  light_gray_terracotta: terracotta(0x876a61),
  // v5
  granite: rocky(0x9a6b58),
  diorite: rocky(0xbdbcbc, 0.8, 1.06),
  andesite: rocky(0x8a8a8c),
  tuff: rocky(0x6d6d65),
  clay: rocky(0xa0a6b3, 0.92, 1.06),
  coal_ore: ore(false, 0x2b2b2b),
  deepslate_coal_ore: ore(true, 0x1f1f1f),
  iron_ore: ore(false, 0xd8af93),
  deepslate_iron_ore: ore(true, 0xc9a083),
  copper_ore: ore(false, 0xc1714b),
  deepslate_copper_ore: ore(true, 0xb36a44),
  gold_ore: ore(false, 0xf3d64a),
  deepslate_gold_ore: ore(true, 0xe8c63c),
  redstone_ore: ore(false, 0xb4120e),
  deepslate_redstone_ore: ore(true, 0xa8100c),
  emerald_ore: ore(false, 0x17c544, 3),
  deepslate_emerald_ore: ore(true, 0x14b43c, 3),
  lapis_ore: ore(false, 0x2349a8),
  deepslate_lapis_ore: ore(true, 0x2040a0),
  diamond_ore: ore(false, 0x5decde, 4),
  deepslate_diamond_ore: ore(true, 0x4fdccf, 4),
  raw_iron_block: rawBlock(0xa6876b),
  raw_copper_block: rawBlock(0x9a5a3e),
  oak_log: logSide(0x6b5132),
  spruce_log: logSide(0x3b2a19),
  spruce_log_top: logEnd(0x735532, 0x3b2a19),
  birch_log: birchLog,
  birch_log_top: logEnd(0xc4b07b, 0xd8d7d2),
  jungle_log: logSide(0x56451f, 0.5),
  jungle_log_top: logEnd(0xa7784c, 0x56451f),
  acacia_log: logSide(0x676157),
  acacia_log_top: logEnd(0xb2603a, 0x676157),
  dark_oak_log: logSide(0x3c2e1a, 0.7),
  dark_oak_log_top: logEnd(0x4f3b22, 0x3c2e1a),
  mangrove_log: logSide(0x54432f),
  mangrove_log_top: logEnd(0x6e3a32, 0x54432f),
  cherry_log: logSide(0x37202a),
  cherry_log_top: logEnd(0xd59b98, 0x37202a),
  pale_oak_log: logSide(0x5b534c),
  pale_oak_log_top: logEnd(0xe6dbd5, 0x5b534c),
  spruce_leaves: leavesOf(0x5f945f, false),
  birch_leaves: leavesOf(0x7da353, false),
  jungle_leaves: leavesOf(0xa8a8a8, true),
  acacia_leaves: leavesOf(0x9a9a9a, true),
  dark_oak_leaves: leavesOf(0x9a9a9a, true),
  mangrove_leaves: leavesOf(0xa0a0a0, true),
  cherry_leaves: leavesOf(0xeaa9c8, false),
  pale_oak_leaves: leavesOf(0xa6aa9e, false),
  azalea_leaves: leavesOf(0x5c7c2c, false),
  flowering_azalea_leaves: leavesOf(0x5c7c2c, false, 0xd77fd2),
  mushroom_stem: mushroomStem,
  red_mushroom_block: mushroomCap(0xc02a26, true),
  brown_mushroom_block: mushroomCap(0x957155, false),
  mangrove_roots: mangroveRoots,
  muddy_mangrove_roots: muddyMangroveRoots,
  rooted_dirt: rootedDirt,
  bee_nest: beeNestSide,
  bee_nest_top: beeNestTop,
  creaking_heart: creakingHeart,
  moss_carpet: carpet(0x5a7a2c),
  pale_moss_carpet: carpet(0x9da396),
  vine,
  pale_hanging_moss: hangingMoss,
  mangrove_propagule: propagule,
  cocoa,
  // v5.1
  short_grass: grassBlades(0x9a9a9a),
  fern: fernSprite(0x9a9a9a),
  tall_grass: grassBlades(0x9a9a9a, 16),
  large_fern: fernSprite(0x9a9a9a, 16),
  dead_bush: deadBush,
  dandelion: flower(0xf3d93a),
  poppy: flower(0xd8322a),
  blue_orchid: flower(0x30a8e6),
  allium: flower(0xb35fe0),
  azure_bluet: flower(0xe8ecf2),
  red_tulip: flower(0xe03a2a),
  orange_tulip: flower(0xf08a2a),
  white_tulip: flower(0xf2f2ee),
  pink_tulip: flower(0xf2a8c8),
  oxeye_daisy: flower(0xf4f4ea),
  cornflower: flower(0x4a6ee8),
  lily_of_the_valley: flower(0xffffff),
  closed_eyeblossom: flower(0x8a8a8a),
  open_eyeblossom: flower(0xf09a3a),
  sunflower: flower(0xf6d21e, 16),
  lilac: flower(0xd2a0dc, 16),
  rose_bush: flower(0xd23a3a, 16),
  peony: flower(0xf0b6d8, 16),
  brown_mushroom: mushroomSprite(0x957155),
  red_mushroom: mushroomSprite(0xd8322a),
  sweet_berry_bush: berryBush,
  sugar_cane: sugarCane,
  bamboo: bambooSprite,
  azalea: bush(0x6a8a2c),
  flowering_azalea: bush(0x6a8a2c, 0xd77fd2),
  pink_petals: petals,
  lily_pad: lilyPad,
  pumpkin: pumpkinSide,
  pumpkin_top: pumpkinTop,
  melon: melonSide,
  melon_top: melonTop,
  cactus: cactusSide,
  cactus_top: cactusTop,
  seagrass: grassBlades(0x3f8a2a),
  tall_seagrass: grassBlades(0x3f8a2a, 16),
  kelp: kelpSprite,
  kelp_plant: kelpSprite,
  sea_pickle: seaPickle,
  glow_lichen: lichen,
  hanging_roots: hangingRoots,
  spore_blossom: sporeBlossom,
  cave_vines: caveVines(false),
  cave_vines_plant: caveVines(false),
  // v7：按方块状态换的纹理
  cave_vines_lit: caveVines(true),
  cave_vines_plant_lit: caveVines(true),
  grass_snow_side: grassSnowSide,
  mushroom_block_inside: mushroomInside,
  tall_flower_bottom: tallFlowerBottom,
  small_dripleaf: dripleaf,
  big_dripleaf: dripleaf,
  big_dripleaf_stem: dripleafStem,
  moss_block: carpet(0x5a7a2c),
  pale_moss_block: carpet(0x9da396),
  dripstone_block: rocky(0x86685a),
  pointed_dripstone: dripstoneSprite,
  smooth_basalt: rocky(0x48484e, 0.9, 1.05),
  amethyst_block: rocky(0x8a63c8, 0.85, 1.15),
  budding_amethyst: rocky(0x7a55b8, 0.8, 1.2),
  small_amethyst_bud: crystal(0xb88ae8),
  medium_amethyst_bud: crystal(0xb88ae8),
  large_amethyst_bud: crystal(0xb88ae8),
  amethyst_cluster: crystal(0xb88ae8),
  sculk: sculkBlock,
  sculk_vein: lichenColor(0x0c3c4c),
  sculk_sensor: sculkBlock,
  sculk_shrieker: rocky(0xc8c0a8),
  sculk_catalyst: sculkBlock,
  blue_ice: rocky(0x74a8f0, 0.92, 1.06),
  mossy_cobblestone: mossyCobble,
  magma_block: magma,
  spawner: spawner,
  chest: chestSide,
  bone_block: boneSide,
  bone_block_top: boneTop,
  suspicious_sand: sand,
  suspicious_gravel: gravel,
  sandstone_slab: sandstoneSide(0xd8cb9b),
  tube_coral_block: rocky(0x3355dd, 0.85, 1.12),
  tube_coral: coral(0x3355dd),
  tube_coral_fan: coralFan(0x3355dd),
  tube_coral_wall_fan: coralFan(0x3355dd),
  brain_coral_block: rocky(0xd85aa8, 0.85, 1.12),
  brain_coral: coral(0xd85aa8),
  brain_coral_fan: coralFan(0xd85aa8),
  brain_coral_wall_fan: coralFan(0xd85aa8),
  bubble_coral_block: rocky(0xa82ad0, 0.85, 1.12),
  bubble_coral: coral(0xa82ad0),
  bubble_coral_fan: coralFan(0xa82ad0),
  bubble_coral_wall_fan: coralFan(0xa82ad0),
  fire_coral_block: rocky(0xd8302a, 0.85, 1.12),
  fire_coral: coral(0xd8302a),
  fire_coral_fan: coralFan(0xd8302a),
  fire_coral_wall_fan: coralFan(0xd8302a),
  horn_coral_block: rocky(0xe0c83a, 0.85, 1.12),
  horn_coral: coral(0xe0c83a),
  horn_coral_fan: coralFan(0xe0c83a),
  horn_coral_wall_fan: coralFan(0xe0c83a),
  // v5.2
  netherrack: netherrack,
  soul_sand: soulSand,
  soul_soil: rocky(0x4a3a2e, 0.85, 1.1),
  basalt: basaltSide,
  basalt_top: basaltTop,
  blackstone: rocky(0x2a2428, 0.8, 1.25),
  nether_gold_ore: netherOre(0xf6d03a),
  nether_quartz_ore: netherOre(0xece4dc),
  ancient_debris: debrisSide,
  ancient_debris_top: debrisTop,
  crimson_nylium: nyliumSide(0x9a2626),
  crimson_nylium_top: nyliumTop(0x9a2626),
  warped_nylium: nyliumSide(0x2b8a7c),
  warped_nylium_top: nyliumTop(0x2b8a7c),
  crimson_stem: stemSide(0x6a2a3a, 0xc8323a),
  crimson_stem_top: logEnd(0x8e3a4a, 0x6a2a3a),
  warped_stem: stemSide(0x3a3a4e, 0x2ac8b8),
  warped_stem_top: logEnd(0x3a8a80, 0x3a3a4e),
  nether_wart_block: rocky(0x7a0e0e, 0.8, 1.2),
  warped_wart_block: rocky(0x167a78, 0.8, 1.2),
  shroomlight: rocky(0xf09a4a, 0.85, 1.2),
  crimson_fungus: fungus(0xb02a2a),
  warped_fungus: fungus(0x2ab0a0),
  crimson_roots: netherRoots(0x9a1e2a),
  warped_roots: netherRoots(0x1e9a8a),
  nether_sprouts: grassBlades(0x1e9a8a, 8),
  weeping_vines: netherVines(0xa0242a),
  weeping_vines_plant: netherVines(0xa0242a),
  twisting_vines: netherVines(0x1e9a8a),
  twisting_vines_plant: netherVines(0x1e9a8a),
  fire: fire(0xf08a1a),
  soul_fire: fire(0x3ad8e8),
  end_stone: rocky(0xdcdca0, 0.88, 1.06),
  chorus_plant: rocky(0x6a4a6a, 0.8, 1.25),
  chorus_flower: rocky(0x9a7a9a, 0.85, 1.15),
  end_gateway: spawner,
  iron_bars: ironBars,
  bubble_column: bubbles
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

/** 第 3 位：镂空纹理（v5，十字形植物）。alpha < 0.5 的像素丢弃，其余整张按染色种类染色 */
export const CUTOUT = 4

/** 纹理层号 → 染色种类（| CUTOUT） */
export const TINT_BY_LAYER: Uint8Array = (() => {
  const t = new Uint8Array(TEXTURE_COUNT)
  t[TEXTURE_LAYER.grass_top] = Tint.grass
  t[TEXTURE_LAYER.grass_side] = Tint.grass
  t[TEXTURE_LAYER.leaves] = Tint.foliage
  t[TEXTURE_LAYER.water] = Tint.water
  for (const n of ['jungle_leaves', 'acacia_leaves', 'dark_oak_leaves', 'mangrove_leaves'] as const) t[TEXTURE_LAYER[n]] = Tint.foliage
  t[TEXTURE_LAYER.vine] = Tint.foliage | CUTOUT
  for (const n of ['pale_hanging_moss', 'mangrove_propagule', 'cocoa'] as const) t[TEXTURE_LAYER[n]] = CUTOUT
  for (const n of ['cave_vines_lit', 'cave_vines_plant_lit', 'tall_flower_bottom'] as const) t[TEXTURE_LAYER[n]] = CUTOUT
  // v5.1
  t[TEXTURE_LAYER.short_grass] = Tint.grass | CUTOUT
  t[TEXTURE_LAYER.fern] = Tint.grass | CUTOUT
  t[TEXTURE_LAYER.tall_grass] = Tint.grass | CUTOUT
  t[TEXTURE_LAYER.large_fern] = Tint.grass | CUTOUT
  t[TEXTURE_LAYER.dead_bush] = CUTOUT
  t[TEXTURE_LAYER.dandelion] = CUTOUT
  t[TEXTURE_LAYER.poppy] = CUTOUT
  t[TEXTURE_LAYER.blue_orchid] = CUTOUT
  t[TEXTURE_LAYER.allium] = CUTOUT
  t[TEXTURE_LAYER.azure_bluet] = CUTOUT
  t[TEXTURE_LAYER.red_tulip] = CUTOUT
  t[TEXTURE_LAYER.orange_tulip] = CUTOUT
  t[TEXTURE_LAYER.white_tulip] = CUTOUT
  t[TEXTURE_LAYER.pink_tulip] = CUTOUT
  t[TEXTURE_LAYER.oxeye_daisy] = CUTOUT
  t[TEXTURE_LAYER.cornflower] = CUTOUT
  t[TEXTURE_LAYER.lily_of_the_valley] = CUTOUT
  t[TEXTURE_LAYER.closed_eyeblossom] = CUTOUT
  t[TEXTURE_LAYER.open_eyeblossom] = CUTOUT
  t[TEXTURE_LAYER.sunflower] = CUTOUT
  t[TEXTURE_LAYER.lilac] = CUTOUT
  t[TEXTURE_LAYER.rose_bush] = CUTOUT
  t[TEXTURE_LAYER.peony] = CUTOUT
  t[TEXTURE_LAYER.brown_mushroom] = CUTOUT
  t[TEXTURE_LAYER.red_mushroom] = CUTOUT
  t[TEXTURE_LAYER.sweet_berry_bush] = CUTOUT
  t[TEXTURE_LAYER.sugar_cane] = Tint.grass | CUTOUT
  t[TEXTURE_LAYER.bamboo] = CUTOUT
  t[TEXTURE_LAYER.azalea] = CUTOUT
  t[TEXTURE_LAYER.flowering_azalea] = CUTOUT
  t[TEXTURE_LAYER.pink_petals] = CUTOUT
  t[TEXTURE_LAYER.lily_pad] = Tint.foliage | CUTOUT
  t[TEXTURE_LAYER.seagrass] = CUTOUT
  t[TEXTURE_LAYER.tall_seagrass] = CUTOUT
  t[TEXTURE_LAYER.kelp] = CUTOUT
  t[TEXTURE_LAYER.kelp_plant] = CUTOUT
  t[TEXTURE_LAYER.sea_pickle] = CUTOUT
  t[TEXTURE_LAYER.glow_lichen] = CUTOUT
  t[TEXTURE_LAYER.hanging_roots] = CUTOUT
  t[TEXTURE_LAYER.spore_blossom] = CUTOUT
  t[TEXTURE_LAYER.cave_vines] = CUTOUT
  t[TEXTURE_LAYER.cave_vines_plant] = CUTOUT
  t[TEXTURE_LAYER.small_dripleaf] = CUTOUT
  t[TEXTURE_LAYER.big_dripleaf] = CUTOUT
  t[TEXTURE_LAYER.big_dripleaf_stem] = CUTOUT
  t[TEXTURE_LAYER.pointed_dripstone] = CUTOUT
  t[TEXTURE_LAYER.small_amethyst_bud] = CUTOUT
  t[TEXTURE_LAYER.medium_amethyst_bud] = CUTOUT
  t[TEXTURE_LAYER.large_amethyst_bud] = CUTOUT
  t[TEXTURE_LAYER.amethyst_cluster] = CUTOUT
  t[TEXTURE_LAYER.sculk_vein] = CUTOUT
  t[TEXTURE_LAYER.tube_coral] = CUTOUT
  t[TEXTURE_LAYER.tube_coral_fan] = CUTOUT
  t[TEXTURE_LAYER.tube_coral_wall_fan] = CUTOUT
  t[TEXTURE_LAYER.brain_coral] = CUTOUT
  t[TEXTURE_LAYER.brain_coral_fan] = CUTOUT
  t[TEXTURE_LAYER.brain_coral_wall_fan] = CUTOUT
  t[TEXTURE_LAYER.bubble_coral] = CUTOUT
  t[TEXTURE_LAYER.bubble_coral_fan] = CUTOUT
  t[TEXTURE_LAYER.bubble_coral_wall_fan] = CUTOUT
  t[TEXTURE_LAYER.fire_coral] = CUTOUT
  t[TEXTURE_LAYER.fire_coral_fan] = CUTOUT
  t[TEXTURE_LAYER.fire_coral_wall_fan] = CUTOUT
  t[TEXTURE_LAYER.horn_coral] = CUTOUT
  t[TEXTURE_LAYER.horn_coral_fan] = CUTOUT
  t[TEXTURE_LAYER.horn_coral_wall_fan] = CUTOUT
  // v5.2
  t[TEXTURE_LAYER.bubble_column] = CUTOUT
  t[TEXTURE_LAYER.crimson_fungus] = CUTOUT
  t[TEXTURE_LAYER.warped_fungus] = CUTOUT
  t[TEXTURE_LAYER.crimson_roots] = CUTOUT
  t[TEXTURE_LAYER.warped_roots] = CUTOUT
  t[TEXTURE_LAYER.nether_sprouts] = CUTOUT
  t[TEXTURE_LAYER.weeping_vines] = CUTOUT
  t[TEXTURE_LAYER.weeping_vines_plant] = CUTOUT
  t[TEXTURE_LAYER.twisting_vines] = CUTOUT
  t[TEXTURE_LAYER.twisting_vines_plant] = CUTOUT
  t[TEXTURE_LAYER.fire] = CUTOUT
  t[TEXTURE_LAYER.soul_fire] = CUTOUT
  t[TEXTURE_LAYER.iron_bars] = CUTOUT
  return t
})()
