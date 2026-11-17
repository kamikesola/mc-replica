import { NAME_BY_BLOCK } from '../blocks'
import { resourceName, type PackSource } from './bakery'

/**
 * 读原版资源包（v7.1，浏览器里，主线程）。
 *
 * 资源包放在 resourcepacks/<名字>/assets/minecraft/ 下（不进 git，见 resourcepacks/README.md），只用三个目录：
 *   blockstates/*.json      方块状态 → 模型
 *   models/block/*.json     模型
 *   textures/block/*.png    纹理
 * 原版有 1000 多个方块状态文件、2000 多个模型、1000 多张纹理，这里只读这个项目用到的方块要的那些：
 * 先读方块状态文件，从里面找出引用的模型，再沿 parent 一层层读上去，最后只加载烘焙结果里用到的纹理。
 *
 * `npm run build:public` 时整个跳过（版权原因，和 datapacks 一样）。
 */

const json: Record<string, () => Promise<unknown>> =
  import.meta.env.MODE === 'public' ? {} : import.meta.glob('/resourcepacks/*/assets/minecraft/{blockstates,models/block,models/item,items}/*.json', { import: 'default' })
const pngs: Record<string, () => Promise<unknown>> =
  import.meta.env.MODE === 'public' ? {} : import.meta.glob('/resourcepacks/*/assets/minecraft/textures/{block,item}/*.png', { query: '?url', import: 'default' })

/** "/resourcepacks/vanilla/assets/minecraft/models/block/stone.json" → ["vanilla", "models/block/stone"] */
function split(path: string): [string, string] {
  const m = /^\/resourcepacks\/([^/]+)\/assets\/minecraft\/(.+)\.(json|png)$/.exec(path)!
  return [m[1], m[2]]
}

/** 资源名 → 加载函数；多个资源包时按名字排序，后面的覆盖前面的 */
function index(files: Record<string, () => Promise<unknown>>, strip = ''): Map<string, () => Promise<unknown>> {
  const out = new Map<string, () => Promise<unknown>>()
  for (const path of Object.keys(files).sort((a, b) => split(a)[0].localeCompare(split(b)[0]))) out.set(split(path)[1].slice(strip.length), files[path])
  return out
}

export interface LoadedPack {
  name: string
  source: PackSource
  /** 纹理名（"block/stone"）→ 图片地址的加载函数 */
  textures: Map<string, () => Promise<unknown>>
  /** 任意 JSON（"items/stone"、"models/item/stick"……），按需读（v10：物品图标） */
  json(path: string): Promise<unknown>
  /** 任意纹理（"item/stick"），按需读；没有返回 null（v10） */
  image(name: string): Promise<ImageBitmap | null>
}

export async function loadResourcePack(): Promise<LoadedPack | null> {
  const files = index(json)
  if (files.size === 0) return null
  const names = [...new Set(Object.keys(json).map((p) => split(p)[0]))].sort()
  const blockstates = new Map<string, unknown>()
  const models = new Map<string, unknown>()

  // 1. 用到的方块的状态文件
  const wanted = [...new Set(NAME_BY_BLOCK.filter(Boolean).map((n) => n.replace(/^minecraft:/, '')))]
  await Promise.all(
    wanted.map(async (n) => {
      const load = files.get(`blockstates/${n}`)
      if (load) blockstates.set(n, await load())
    })
  )
  // 2. 引用的模型，沿 parent 一层层读（每一轮把新发现的一起读）
  let todo = new Set<string>()
  const collect = (v: unknown) => {
    if (Array.isArray(v)) v.forEach(collect)
    else if (v && typeof v === 'object') {
      const o = v as Record<string, unknown>
      if (typeof o.model === 'string') todo.add(resourceName(o.model))
      for (const k of Object.keys(o)) if (k !== 'model') collect(o[k])
    }
  }
  blockstates.forEach(collect)
  while (todo.size) {
    const batch = [...todo].filter((m) => !models.has(m))
    todo = new Set()
    await Promise.all(
      batch.map(async (m) => {
        const load = files.get(`models/${m}`)
        const data = load ? ((await load()) as { parent?: string }) : undefined
        models.set(m, data)
        if (data?.parent && !models.has(resourceName(data.parent))) todo.add(resourceName(data.parent))
      })
    )
  }
  // 纹理按 "block/stone" 这样的名字查（模型里就是这么写的），去掉前面的 textures/
  const textures = index(pngs, 'textures/')
  const jsonCache = new Map<string, Promise<unknown>>()
  const imageCache = new Map<string, Promise<ImageBitmap | null>>()
  return {
    name: names.join(' + '),
    source: { blockstate: (n) => blockstates.get(n), model: (n) => models.get(resourceName(n)) },
    textures,
    json(path) {
      let r = jsonCache.get(path)
      if (!r) jsonCache.set(path, (r = files.get(path)?.() ?? Promise.resolve(undefined)))
      return r
    },
    image(name) {
      let r = imageCache.get(name)
      if (!r) {
        const load = textures.get(name)
        r = load
          ? load()
              .then((url) => fetch(url as string))
              .then((res) => res.blob())
              .then((b) => createImageBitmap(b))
              .catch(() => null)
          : Promise.resolve(null)
        imageCache.set(name, r)
      }
      return r
    }
  }
}

/** 纹理边长（原版方块纹理都是 16×16；动画纹理是竖着的一长条，只取第一帧） */
const TEX = 16

/**
 * 按烘焙结果里的顺序加载纹理，拼成一整块 RGBA（每层 16×16×4 字节）。
 * 找不到的纹理画成原版的“缺失纹理”：紫黑格子
 */
export async function loadPackTextures(pack: LoadedPack, names: string[]): Promise<Uint8Array> {
  const out = new Uint8Array(names.length * TEX * TEX * 4)
  const canvas = new OffscreenCanvas(TEX, TEX)
  const g = canvas.getContext('2d', { willReadFrequently: true })!
  const images = await Promise.all(
    names.map(async (n) => {
      const load = pack.textures.get(n)
      if (!load) return null
      try {
        const url = (await load()) as string
        return await createImageBitmap(await (await fetch(url)).blob())
      } catch {
        return null
      }
    })
  )
  images.forEach((img, layer) => {
    g.clearRect(0, 0, TEX, TEX)
    if (img) {
      // 第一帧：宽 × 宽的正方形（动画纹理的帧是竖着排的）
      g.imageSmoothingEnabled = false
      g.drawImage(img, 0, 0, img.width, img.width, 0, 0, TEX, TEX)
      img.close()
    } else {
      for (let y = 0; y < TEX; y++)
        for (let x = 0; x < TEX; x++) {
          g.fillStyle = (x < 8) !== (y < 8) ? '#f800f8' : '#000000'
          g.fillRect(x, y, 1, 1)
        }
    }
    out.set(g.getImageData(0, 0, TEX, TEX).data, layer * TEX * TEX * 4)
  })
  return out
}
