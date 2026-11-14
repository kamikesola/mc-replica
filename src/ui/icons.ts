import { BLOCKS, type BlockType } from '../terrain/blocks'
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
