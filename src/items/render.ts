import * as THREE from 'three'
import { itemIcon } from '../ui/icons'
import type Terrain from '../terrain'
import type { ItemEntity } from './entities'

/**
 * 画地上的物品（v10）：每个物品一个始终朝着镜头的小图片（three.js 的 Sprite），图片就是物品栏里的图标。
 * 原版是把方块画成会转的小立方体、把物品画成有厚度的薄片；这里先用图标代替。
 * 上下浮动照原版 ItemEntityRenderer：sin(时间 / 10 + 相位) × 0.1 + 0.1。
 * 亮度按物品所在那一格的天空光、方块光查 v6 的光照贴图。
 */
export class ItemRenderer {
  private readonly group = new THREE.Group()
  private readonly sprites = new Map<ItemEntity, THREE.Sprite>()
  private readonly textures = new Map<string, Promise<THREE.Texture>>()

  constructor(
    scene: THREE.Scene,
    private readonly terrain: Terrain
  ) {
    scene.add(this.group)
  }

  private texture(item: string): Promise<THREE.Texture> {
    let t = this.textures.get(item)
    if (!t) {
      t = itemIcon(item, this.terrain.pack).then(
        (url) =>
          new Promise<THREE.Texture>((resolve) => {
            const img = new Image()
            img.onload = () => {
              const tex = new THREE.Texture(img)
              tex.magFilter = THREE.NearestFilter
              tex.minFilter = THREE.NearestFilter
              tex.colorSpace = THREE.SRGBColorSpace
              tex.needsUpdate = true
              resolve(tex)
            }
            img.src = url
          })
      )
      this.textures.set(item, t)
    }
    return t
  }

  /** 每帧：加新的、删没了的、更新位置和亮度。t 是两个 tick 之间的位置（0..1），lightmap 是 sky.update 的结果 */
  update(entities: ItemEntity[], t: number, lightmap: Uint8Array): void {
    const alive = new Set(entities)
    for (const [e, sp] of this.sprites) {
      if (alive.has(e)) continue
      this.group.remove(sp)
      sp.material.dispose()
      this.sprites.delete(e)
    }
    for (const e of entities) {
      let sp = this.sprites.get(e)
      if (!sp) {
        const mat = new THREE.SpriteMaterial({ transparent: true, alphaTest: 0.1, fog: true })
        sp = new THREE.Sprite(mat)
        sp.scale.setScalar(0.35)
        this.sprites.set(e, sp)
        this.group.add(sp)
        this.texture(e.stack.item).then((tex) => {
          mat.map = tex
          mat.needsUpdate = true
        })
      }
      const x = e.prev.x + (e.pos.x - e.prev.x) * t
      const y = e.prev.y + (e.pos.y - e.prev.y) * t
      const z = e.prev.z + (e.pos.z - e.prev.z) * t
      const bob = Math.sin((e.age + t) / 10 + e.bob) * 0.1 + 0.1
      sp.position.set(x, y + bob + 0.15, z)
      // 亮度：光照贴图里 (方块光, 天空光) 那一格
      const l = this.terrain.lightAt(Math.floor(x), Math.floor(y + 0.1), Math.floor(z))
      const i = ((l?.sky ?? 15) * 16 + (l?.block ?? 0)) * 3
      sp.material.color.setRGB(lightmap[i] / 255, lightmap[i + 1] / 255, lightmap[i + 2] / 255, THREE.SRGBColorSpace)
    }
  }
}

/**
 * 挖方块时的裂纹（v10，原版 destroy_stage_0..9）：盖在方块外面一点点的一个盒子，贴第 floor(进度 × 10) 张裂纹。
 * 有资源包用原版的裂纹图，没有就自己画几道黑线
 */
export class CrackOverlay {
  private readonly mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>
  private readonly stages: (THREE.Texture | null)[] = new Array(10).fill(null)
  private loaded = false

  constructor(
    scene: THREE.Scene,
    private readonly terrain: Terrain
  ) {
    const mat = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1, color: 0x777777 })
    this.mesh = new THREE.Mesh(new THREE.BoxGeometry(1.002, 1.002, 1.002), mat)
    this.mesh.visible = false
    scene.add(this.mesh)
  }

  private load() {
    this.loaded = true
    for (let i = 0; i < 10; i++) {
      const pack = this.terrain.pack
      const make = (img: CanvasImageSource) => {
        const tex = new THREE.Texture(img as HTMLCanvasElement)
        tex.magFilter = THREE.NearestFilter
        tex.minFilter = THREE.NearestFilter
        tex.needsUpdate = true
        this.stages[i] = tex
      }
      if (pack) pack.image(`block/destroy_stage_${i}`).then((img) => img && make(img))
      else make(drawCracks(i))
    }
  }

  update(m: { x: number; y: number; z: number; progress: number } | null): void {
    if (!m) {
      this.mesh.visible = false
      return
    }
    if (!this.loaded) this.load()
    const tex = this.stages[Math.min(9, Math.floor(m.progress * 10))]
    this.mesh.visible = !!tex
    if (!tex) return
    if (this.mesh.material.map !== tex) {
      this.mesh.material.map = tex
      this.mesh.material.needsUpdate = true
    }
    this.mesh.position.set(m.x + 0.5, m.y + 0.5, m.z + 0.5)
  }
}

/** 没有资源包时的裂纹：从中间往外画几道，阶段越高越多 */
function drawCracks(stage: number): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = c.height = 16
  const g = c.getContext('2d')!
  g.fillStyle = 'rgba(0,0,0,0.75)'
  let seed = 7
  const r = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff)
  for (let k = 0; k <= stage; k++) {
    let x = 8
    let y = 8
    const dx = r() * 2 - 1
    const dy = r() * 2 - 1
    for (let s = 0; s < 3 + stage; s++) {
      g.fillRect(Math.floor(x), Math.floor(y), 1, 1)
      x += dx + (r() - 0.5)
      y += dy + (r() - 0.5)
    }
  }
  return c
}
