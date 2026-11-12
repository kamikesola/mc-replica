import * as THREE from 'three'
import { BlockType, isSolid } from './blocks'
import Chunk, { CHUNK_SIZE } from './chunk'
import Highlight from './highlight'
import Materials from './mesh/materials'
import { buildChunkMesh, type MeshArrays } from './mesh/mesher'
import type { ChunkData, WorldInfo } from './worker/protocol'
import WorkerPool from './worker/pool'

export { BlockType } from './blocks'

/**
 * Terrain：管理整个世界的区块（对应原项目的 Terrain 类）。
 *
 * 每帧 update() 做三件事：
 *   1. 看玩家在哪个区块
 *   2. 视距内还没加载的区块，按“离玩家近的优先”交给 Worker 生成
 *   3. 视距外的区块卸载，释放显存
 *
 * 另外提供 getBlock / setBlock，给碰撞检测和挖放方块用。
 * 玩家改过的方块记在 edits 里（相当于原项目的 customBlocks），区块卸载后再加载也不会丢。
 */
export default class Terrain {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  pool = new WorkerPool()
  materials = new Materials()
  highlight: Highlight

  /** 视距（区块数），原版默认 12，这里浏览器里先用小一点 */
  distance = 6
  chunks = new Map<string, Chunk>()
  /** 正在 Worker 里生成的区块 */
  private loading = new Set<string>()
  /** 每次换种子 +1，用来丢弃旧种子的区块结果 */
  private generation = 0
  /** 玩家改过的方块：区块 key → (方块下标 → 方块类型) */
  edits = new Map<string, Map<number, BlockType>>()

  /** 世界信息（种子、高度、海平面……），init 之后才有 */
  info: WorldInfo | null = null
  /** 最近一个区块的生成耗时，F3 里显示 */
  lastChunkMs = 0

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.scene = scene
    this.camera = camera
    this.highlight = new Highlight(scene)
  }

  /** 通知所有 Worker 换种子 / noise_settings，并清空现有区块 */
  async init(seed: string, settings: string): Promise<WorldInfo> {
    for (const c of this.chunks.values()) c.dispose(this.scene)
    this.chunks.clear()
    this.loading.clear()
    this.edits.clear()
    this.generation++
    this.info = await this.pool.broadcast('init', { seed, settings })
    return this.info
  }

  // ---------------------------------------------------------------- 每帧调用

  update = () => {
    if (!this.info) return
    const pcx = Math.floor(this.camera.position.x / CHUNK_SIZE)
    const pcz = Math.floor(this.camera.position.z / CHUNK_SIZE)

    // 卸载：比视距多一圈才卸，避免在边界来回走时反复加载
    for (const [key, c] of this.chunks) {
      if (Math.max(Math.abs(c.cx - pcx), Math.abs(c.cz - pcz)) > this.distance + 1) {
        c.dispose(this.scene)
        this.chunks.delete(key)
      }
    }

    // 加载：每个 Worker 最多排 2 个任务，从离玩家最近的开始
    const maxInFlight = this.pool.size * 2
    if (this.pool.busy >= maxInFlight) return
    const wanted: [number, number, number][] = []
    for (let dx = -this.distance; dx <= this.distance; dx++) {
      for (let dz = -this.distance; dz <= this.distance; dz++) {
        if (dx * dx + dz * dz > (this.distance + 0.5) ** 2) continue // 圆形视距
        const key = `${pcx + dx},${pcz + dz}`
        if (!this.chunks.has(key) && !this.loading.has(key)) wanted.push([dx * dx + dz * dz, pcx + dx, pcz + dz])
      }
    }
    wanted.sort((a, b) => a[0] - b[0])
    for (const [, cx, cz] of wanted.slice(0, maxInFlight - this.pool.busy)) this.load(cx, cz)
  }

  private load(cx: number, cz: number): void {
    const key = `${cx},${cz}`
    const generation = this.generation
    this.loading.add(key)
    this.pool
      .call('chunk', { cx, cz })
      .then((data) => {
        if (generation !== this.generation) return // 期间换了种子，结果作废
        this.loading.delete(key)
        this.onChunk(data)
      })
      .catch((e) => {
        if (generation === this.generation) this.loading.delete(key)
        console.error(`区块 ${key} 生成失败`, e)
      })
  }

  private onChunk(data: ChunkData): void {
    const info = this.info!
    const chunk = new Chunk(data.cx, data.cz, info.minY, info.height, data.blocks)
    const key = `${data.cx},${data.cz}`
    this.chunks.set(key, chunk)
    this.lastChunkMs = data.ms

    const edits = this.edits.get(key)
    if (edits && edits.size > 0) {
      // 有玩家改动：先把改动写回去，再在主线程重新生成网格
      for (const [i, type] of edits) chunk.blocks[i] = type
      this.remesh(chunk)
    } else {
      this.setMeshes(chunk, data.opaque, data.water)
    }
  }

  // ---------------------------------------------------------------- 方块读写

  getChunk(x: number, z: number): Chunk | undefined {
    return this.chunks.get(`${Math.floor(x / CHUNK_SIZE)},${Math.floor(z / CHUNK_SIZE)}`)
  }

  /** 世界坐标取方块；区块没加载时返回 null */
  getBlock(x: number, y: number, z: number): BlockType | null {
    const c = this.getChunk(x, z)
    if (!c) return null
    return c.get(x - c.cx * CHUNK_SIZE, y, z - c.cz * CHUNK_SIZE)
  }

  /** 给碰撞用：没加载的区块当作实心，防止玩家掉进还没生成的地方 */
  isSolidAt(x: number, y: number, z: number): boolean {
    const b = this.getBlock(x, y, z)
    return b === null ? true : isSolid(b)
  }

  setBlock(x: number, y: number, z: number, type: BlockType): void {
    const c = this.getChunk(x, z)
    if (!c || !this.info) return
    const lx = x - c.cx * CHUNK_SIZE
    const lz = z - c.cz * CHUNK_SIZE
    if (y < this.info.minY || y >= this.info.minY + this.info.height) return
    c.set(lx, y, lz, type)

    const key = `${c.cx},${c.cz}`
    if (!this.edits.has(key)) this.edits.set(key, new Map())
    this.edits.get(key)!.set(Chunk.index(lx, y, lz, c.minY), type)

    // 重建这个区块；如果改的是边上的方块，相邻区块的面也要更新
    this.remesh(c)
    if (lx === 0) this.remeshAt(c.cx - 1, c.cz)
    if (lx === 15) this.remeshAt(c.cx + 1, c.cz)
    if (lz === 0) this.remeshAt(c.cx, c.cz - 1)
    if (lz === 15) this.remeshAt(c.cx, c.cz + 1)
  }

  /** 某一列最高的实心方块的 y；没加载时返回 null */
  topSolidY(x: number, z: number): number | null {
    const c = this.getChunk(x, z)
    if (!c) return null
    for (let y = c.minY + c.height - 1; y >= c.minY; y--) {
      if (isSolid(c.get(x - c.cx * CHUNK_SIZE, y, z - c.cz * CHUNK_SIZE))) return y
    }
    return c.minY
  }

  // ---------------------------------------------------------------- 网格

  private remeshAt(cx: number, cz: number): void {
    const c = this.chunks.get(`${cx},${cz}`)
    if (c) this.remesh(c)
  }

  /** 在主线程重建网格：邻居方块从相邻区块读，相邻区块没加载就当空气 */
  remesh(c: Chunk): void {
    const ox = c.cx * CHUNK_SIZE
    const oz = c.cz * CHUNK_SIZE
    const { opaque, water } = buildChunkMesh(
      (lx, y, lz) => {
        if (lx >= 0 && lx < 16 && lz >= 0 && lz < 16) return c.get(lx, y, lz)
        return this.getBlock(ox + lx, y, oz + lz) ?? BlockType.air
      },
      c.minY,
      c.height,
      c.cx,
      c.cz
    )
    this.setMeshes(c, opaque, water)
  }

  private setMeshes(c: Chunk, opaque: MeshArrays, water: MeshArrays): void {
    c.dispose(this.scene)
    c.mesh = this.toMesh(opaque, this.materials.opaque, c)
    c.waterMesh = this.toMesh(water, this.materials.water, c)
    if (c.waterMesh) c.waterMesh.renderOrder = 1 // 水最后画
  }

  private toMesh(a: MeshArrays, material: THREE.Material, c: Chunk): THREE.Mesh | null {
    if (a.indices.length === 0) return null
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(a.positions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(a.colors, 3))
    g.setIndex(new THREE.BufferAttribute(a.indices, 1))
    g.computeBoundingSphere() // 视锥剔除要用：屏幕外的区块不画
    const mesh = new THREE.Mesh(g, material)
    mesh.position.set(c.cx * CHUNK_SIZE, 0, c.cz * CHUNK_SIZE)
    mesh.matrixAutoUpdate = false
    mesh.updateMatrix()
    this.scene.add(mesh)
    return mesh
  }

  /** 已加载 / 正在生成的区块数，F3 用 */
  get stats() {
    return { loaded: this.chunks.size, loading: this.loading.size }
  }
}
