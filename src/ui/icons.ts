import { BLOCKS, type BlockType } from '../terrain/blocks'
import { blockOfItem } from '../items/items'
import { resourceName } from '../terrain/models/bakery'
import type { LoadedPack } from '../terrain/models/pack'
import { paintAll, TEX, TEXTURE_LAYER, TINT_BY_LAYER } from '../terrain/textures/painters'

/** 物品栏里的默认颜色（原版物品图标用的也是固定颜色）：草、树叶、水 */
const ICON_TINT = [0, 0x91bd59, 0x48b518, 0x3f76e4]

/**
 * 物品栏图标：用方块自己的纹理画一个斜 45° 的小立方体（和原版物品栏里的方块图标一样）。
 *
 * 做法：把顶面、侧面纹理各画到一个 16×16 的小画布上，再用 setTransform 把它们
 * “压扁 + 斜切”贴到立方体的三个可见面上，左右两面调暗一点。结果转成图片地址给 <img> 用。
 */
let pixels: Uint8Array | null = null

function layerCanvas(layer: number, brightness: number): HTMLCanvasElement {
  pixels ??= paintAll()
  const c = document.createElement('canvas')
  c.width = c.height = TEX
  const img = new ImageData(TEX, TEX)
  const off = layer * TEX * TEX * 4
  const tint = ICON_TINT[TINT_BY_LAYER[layer] & 3]
  const k = [(tint >> 16) & 255, (tint >> 8) & 255, tint & 255].map((v) => v / 255)
  for (let i = 0; i < TEX * TEX * 4; i += 4) {
    // alpha < 255 的像素要染色（见 textures/painters.ts）
    const t = tint !== 0 && pixels[off + i + 3] < 255
    img.data[i] = pixels[off + i] * brightness * (t ? k[0] : 1)
    img.data[i + 1] = pixels[off + i + 1] * brightness * (t ? k[1] : 1)
    img.data[i + 2] = pixels[off + i + 2] * brightness * (t ? k[2] : 1)
    img.data[i + 3] = 255
  }
  c.getContext('2d')!.putImageData(img, 0, 0)
  return c
}

const cache = new Map<BlockType, string>()

export function blockIcon(type: BlockType): string {
  const hit = cache.get(type)
  if (hit) return hit
  const { top, side } = BLOCKS[type].textures
  const size = 64
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')!
  g.imageSmoothingEnabled = false // 保持像素风

  const s = size / 2 // 立方体半宽
  const k = s / TEX // 纹理像素 → 画布像素
  const h = s / 2 // 顶面菱形的半高
  // 顶面：菱形。纹理的 x 轴映射到右下方向，y 轴映射到左下方向
  g.setTransform(k, k / 2, -k, k / 2, s, 0)
  g.drawImage(layerCanvas(TEXTURE_LAYER[top], 1), 0, 0)
  // 左面
  g.setTransform(k, k / 2, 0, k, 0, h)
  g.drawImage(layerCanvas(TEXTURE_LAYER[side], 0.8), 0, 0)
  // 右面
  g.setTransform(k, -k / 2, 0, k, s, s)
  g.drawImage(layerCanvas(TEXTURE_LAYER[side], 0.6), 0, 0)

  const url = c.toDataURL()
  cache.set(type, url)
  return url
}

// ---------------------------------------------------------------- 物品图标（v10）

/**
 * 物品的图标。有资源包时照原版：
 *   items/<名字>.json 里的模型是 block/... → 方块图标（斜 45° 的立方体，顶面、两个侧面用模型里第一个盒子的纹理）
 *   是 item/... → 平面图标：模型（沿 parent 找）的 layer0 纹理，按 tints 染色（草色、树叶色、固定颜色）
 * 没有资源包：能放下去的物品用 v1 的程序纹理方块图标，其他的画一个带首字母的方块。
 * 图标要读图片，所以是异步的。
 */
const itemCache = new Map<string, Promise<string>>()

export function itemIcon(item: string, pack: LoadedPack | null): Promise<string> {
  let r = itemCache.get(item)
  if (!r) itemCache.set(item, (r = makeItemIcon(item, pack).catch(() => letterIcon(item))))
  return r
}

async function makeItemIcon(item: string, pack: LoadedPack | null): Promise<string> {
  const short = item.slice(10)
  if (pack) {
    const def = (await pack.json(`items/${short}`)) as Record<string, unknown> | undefined
    const ref = def && findModel(def)
    if (ref) {
      const tint = tintColor((ref.tints ?? []) as Record<string, unknown>[])
      const model = resourceName(ref.model)
      const resolved = await resolve(pack, model)
      if (model.startsWith('block/') && resolved.elements) {
        const faces = (resolved.elements[0]?.faces ?? {}) as Record<string, { texture: string; tintindex?: number }>
        const tex = async (f: string) => {
          const face = faces[f] ?? Object.values(faces)[0]
          if (!face) return null
          const img = await pack.image(textureOf(resolved.textures, face.texture))
          return img && { img, tint: face.tintindex !== undefined && face.tintindex >= 0 ? tint : 0 }
        }
        const [top, left, right] = await Promise.all([tex('up'), tex('south'), tex('east')])
        if (top || left || right) return cubeIcon(top, left, right)
      }
      const layer0 = resolved.textures.layer0
      if (layer0) {
        const img = await pack.image(textureOf(resolved.textures, layer0))
        if (img) return flatIcon(img, tint)
      }
    }
  }
  const b = blockOfItem(item)
  if (b !== undefined && BLOCKS[b]?.textures) return blockIcon(b)
  return letterIcon(item)
}

/** items/*.json 里第一个 "minecraft:model" 类型的模型（有的物品按条件选模型，取第一个） */
function findModel(o: unknown): { model: string; tints?: unknown[] } | null {
  if (!o || typeof o !== 'object') return null
  const r = o as Record<string, unknown>
  if (String(r.type ?? '').endsWith('model') && typeof r.model === 'string') return r as { model: string }
  for (const v of Object.values(r)) {
    const f = Array.isArray(v) ? v.map(findModel).find(Boolean) : findModel(v)
    if (f) return f
  }
  return null
}

/** 物品图标的染色（只用第一层的） */
function tintColor(tints: Record<string, unknown>[]): number {
  const t = tints[0]
  if (!t) return 0
  const type = String(t.type).replace('minecraft:', '')
  if (type === 'grass') return 0x91bd59
  if (type === 'foliage') return 0x48b518
  if (type === 'constant') return Number(t.value) & 0xffffff
  return 0
}

/** 沿 parent 合并纹理，elements 取最近的（同 bakery.ts） */
async function resolve(pack: LoadedPack, name: string): Promise<{ textures: Record<string, string>; elements?: { faces: Record<string, unknown> }[] }> {
  const chain: Record<string, unknown>[] = []
  let cur: string | undefined = name
  while (cur && chain.length < 16) {
    const m = (await pack.json(`models/${cur}`)) as Record<string, unknown> | undefined
    if (!m) break
    chain.push(m)
    cur = typeof m.parent === 'string' ? resourceName(m.parent) : undefined
  }
  const textures: Record<string, string> = {}
  for (let i = chain.length - 1; i >= 0; i--) Object.assign(textures, chain[i].textures)
  const elements = chain.find((m) => m.elements)?.elements as { faces: Record<string, unknown> }[] | undefined
  return { textures, elements }
}

function textureOf(textures: Record<string, string>, ref: string): string {
  let r = ref
  for (let i = 0; i < 8 && r.startsWith('#'); i++) r = textures[r.slice(1)] ?? r
  return resourceName(r)
}

/** 一张图片的第一帧（正方形），可选染色、调暗 */
function frame(img: ImageBitmap, tint: number, brightness = 1): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = c.height = TEX
  const g = c.getContext('2d')!
  g.imageSmoothingEnabled = false
  g.drawImage(img, 0, 0, img.width, img.width, 0, 0, TEX, TEX)
  if (tint || brightness !== 1) {
    const d = g.getImageData(0, 0, TEX, TEX)
    const k = tint ? [(tint >> 16) & 255, (tint >> 8) & 255, tint & 255].map((v) => v / 255) : [1, 1, 1]
    for (let i = 0; i < d.data.length; i += 4) for (let j = 0; j < 3; j++) d.data[i + j] *= k[j] * brightness
    g.putImageData(d, 0, 0)
  }
  return c
}

function cubeIcon(top: { img: ImageBitmap; tint: number } | null, left: typeof top, right: typeof top): string {
  const size = 64
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')!
  g.imageSmoothingEnabled = false
  const s = size / 2
  const k = s / TEX
  const h = s / 2
  if (top) {
    g.setTransform(k, k / 2, -k, k / 2, s, 0)
    g.drawImage(frame(top.img, top.tint), 0, 0)
  }
  if (left) {
    g.setTransform(k, k / 2, 0, k, 0, h)
    g.drawImage(frame(left.img, left.tint, 0.8), 0, 0)
  }
  if (right) {
    g.setTransform(k, -k / 2, 0, k, s, s)
    g.drawImage(frame(right.img, right.tint, 0.6), 0, 0)
  }
  return c.toDataURL()
}

function flatIcon(img: ImageBitmap, tint: number): string {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')!
  g.imageSmoothingEnabled = false
  g.drawImage(frame(img, tint), 0, 0, 64, 64)
  return c.toDataURL()
}

/** 没有图片时：带首字母的方块 */
function letterIcon(item: string): string {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')!
  let h = 0
  for (const ch of item) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  g.fillStyle = `hsl(${h % 360} 40% 45%)`
  g.fillRect(8, 8, 48, 48)
  g.fillStyle = '#fff'
  g.font = 'bold 28px sans-serif'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.fillText(item.slice(10, 11).toUpperCase(), 32, 34)
  return c.toDataURL()
}
