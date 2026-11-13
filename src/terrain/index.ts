import * as THREE from 'three'
import { BlockType, FLUID_KIND, FluidKind, isSolid } from './blocks'
import Chunk, { CHUNK_SIZE } from './chunk/Chunk'
import Section from './chunk/Section'
import { FluidTicker } from './fluid/FluidTicker'
import Highlight from './highlight'
import Materials from './mesh/materials'
import { meshSection, N, nIndex, POSITION_SCALE, type SectionMesh } from './mesh/mesher'
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
 *
 * v1 的变化：区块按 16³ 的 section 存储和画。挖一个方块只重建它周围的 section，而不是整根区块。
 * v3 的变化：水和岩浆会流动（fluid/FluidTicker.ts），由 tick() 每个游戏 tick 推进一次。
 * 方块改动先只记下“哪些 section 要重建”，每帧统一重建一次（流体一个 tick 可能改几百格）。
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
  /** 每次换种子 / 重新加载 +1，用来丢弃旧的区块结果 */
  private generation = 0
  /** 玩家改过的方块：区块 key → (方块编号 → 方块类型)，编号见 Chunk.index() */
  edits = new Map<string, Map<number, BlockType>>()
  /** 贪婪网格开关（G 键），关掉就是 v0 那样一个面一个四边形，方便对比 */
  greedy = true

  /** 世界信息（种子、高度、海平面……），init 之后才有 */
  info: WorldInfo | null = null
  /** 最近一个区块的生成耗时，F3 里显示 */
  lastChunkMs = 0
  /** 最近一次主线程重建 section 网格的耗时 */
  lastRemeshMs = 0
  /** 等待重建网格的 section（"cx,cz,sy"） */
  private dirty = new Set<string>()
  /** 流体流动（计划刻） */
  fluids = new FluidTicker({
    get: (x, y, z) => this.getBlock(x, y, z),
    set: (x, y, z, b) => this.writeBlock(x, y, z, b)
  })

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.scene = scene
    this.camera = camera
    this.highlight = new Highlight(scene)
  }

  /** 通知所有 Worker 换种子 / noise_settings，并清空现有区块 */
  async init(seed: string, settings: string): Promise<WorldInfo> {
    this.edits.clear()
    this.fluids.clear()
    this.reload()
    this.info = await this.pool.broadcast('init', { seed, settings })
    return this.info
  }

  /** 丢掉所有区块重新生成（玩家改动保留） */
  reload(): void {
    for (const c of this.chunks.values()) c.dispose(this.scene)
    this.chunks.clear()
    this.loading.clear()
    this.generation++
  }

  setGreedy(on: boolean): void {
    this.greedy = on
    this.reload()
  }

  /** 线框开关（K 键）：给每个 section 网格挂一个共用几何体的线框子网格 */
  setWireframe(on: boolean): void {
    this.materials.wireframe = on
    for (const c of this.chunks.values()) for (const m of [...c.meshes, ...c.waterMeshes]) if (m) this.applyWire(m)
  }

  private applyWire(mesh: THREE.Mesh): void {
    const has = mesh.children.length > 0
    if (this.materials.wireframe && !has) {
      const w = new THREE.Mesh(mesh.geometry, this.materials.wire)
      w.renderOrder = 2
      mesh.add(w)
    } else if (!this.materials.wireframe && has) mesh.clear()
  }

  // ---------------------------------------------------------------- 每帧调用

  update = () => {
    if (!this.info) return
    this.flushRemesh()
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

  /** 一个游戏 tick（由 Control 的 20 TPS 循环调用）：推进流体 */
  tick(): void {
    this.fluids.tick()
  }

  private load(cx: number, cz: number): void {
    const key = `${cx},${cz}`
    const generation = this.generation
    this.loading.add(key)
    this.pool
      .call('chunk', { cx, cz, greedy: this.greedy })
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
    const sections = data.sections.map((d) => Section.fromData(d))
    const chunk = new Chunk(data.cx, data.cz, info.minY, info.height, sections)
    const key = `${data.cx},${data.cz}`
    this.chunks.set(key, chunk)
    this.lastChunkMs = data.ms

    const edits = this.edits.get(key)
    if (edits && edits.size > 0) {
      // 有玩家改动：先把改动写回去，再在主线程重新生成网格
      const touched = new Set<number>()
      for (const [i, type] of edits) {
        const lx = i & 15
        const lz = (i >> 4) & 15
        const y = (i >> 8) + chunk.minY
        chunk.set(lx, y, lz, type)
        touched.add(chunk.sectionIndex(y))
      }
      for (let sy = 0; sy < sections.length; sy++) {
        if (touched.has(sy) || touched.has(sy - 1) || touched.has(sy + 1)) this.remeshSection(chunk, sy)
        else this.setSectionMesh(chunk, sy, data.meshes[sy])
      }
    } else {
      for (let sy = 0; sy < sections.length; sy++) this.setSectionMesh(chunk, sy, data.meshes[sy])
    }

    // 旁边的区块里，有之前当成“这里是空气”重建过的 section：现在这里加载了，重新建一次
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
      const n = this.chunks.get(`${data.cx + dx},${data.cz + dz}`)
      if (n) for (const sy of n.staleSections) this.dirty.add(`${n.cx},${n.cz},${sy}`)
    }

    // 含水层边上的水 / 岩浆：加载后马上更新一次，让它们流进旁边的洞里（原版的区块后处理）
    for (const i of data.fluidUpdates) {
      const x = data.cx * 16 + (i & 15)
      const z = data.cz * 16 + ((i >> 4) & 15)
      const y = (i >> 8) + chunk.minY
      const b = chunk.get(i & 15, y, (i >> 4) & 15)
      const kind = FLUID_KIND[b]
      if (kind !== FluidKind.none) this.fluids.schedule(x, y, z, kind as FluidKind.water | FluidKind.lava, 1)
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

  /** 玩家挖 / 放方块：改方块，通知周围的流体，马上重建网格 */
  setBlock(x: number, y: number, z: number, type: BlockType): void {
    if (!this.writeBlock(x, y, z, type)) return
    this.fluids.blockChanged(x, y, z)
    this.flushRemesh()
  }

  /**
   * 改一个方块：写进 section、记进 edits、把受影响的 section 标记为待重建。
   * 受影响的是方块本身所在的 section，加上它周围 3×3×3 范围碰到的
   * （邻居的面要不要画、角上的 AO、流体表面的高度都可能因为这个方块改变，可能跨到相邻 section / 区块）
   */
  writeBlock(x: number, y: number, z: number, type: BlockType): boolean {
    const c = this.getChunk(x, z)
    if (!c || !this.info) return false
    const lx = x - c.cx * CHUNK_SIZE
    const lz = z - c.cz * CHUNK_SIZE
    if (y < this.info.minY || y >= this.info.minY + this.info.height) return false
    c.set(lx, y, lz, type)

    const key = `${c.cx},${c.cz}`
    if (!this.edits.has(key)) this.edits.set(key, new Map())
    this.edits.get(key)!.set(Chunk.index(lx, y, lz, c.minY), type)

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          const ny = y + dy
          if (ny < this.info.minY || ny >= this.info.minY + this.info.height) continue
          const nc = this.getChunk(x + dx, z + dz)
          if (nc) this.dirty.add(`${nc.cx},${nc.cz},${nc.sectionIndex(ny)}`)
        }
      }
    }
    return true
  }

  /** 重建所有待重建的 section */
  flushRemesh(): void {
    if (this.dirty.size === 0) return
    const t0 = performance.now()
    for (const k of this.dirty) {
      const [cx, cz, sy] = k.split(',').map(Number)
      const c = this.chunks.get(`${cx},${cz}`)
      if (c) this.remeshSection(c, sy)
    }
    this.dirty.clear()
    this.lastRemeshMs = performance.now() - t0
  }

  /** 某一列最高的实心方块的 y；没加载时返回 null */
  topSolidY(x: number, z: number): number | null {
    const c = this.getChunk(x, z)
    if (!c) return null
    const lx = x - c.cx * CHUNK_SIZE
    const lz = z - c.cz * CHUNK_SIZE
    for (let sy = c.sections.length - 1; sy >= 0; sy--) {
      if (c.sections[sy].isEmpty) continue // 整段空气，直接跳过 16 格
      for (let ly = 15; ly >= 0; ly--) if (isSolid(c.sections[sy].get(lx, ly, lz))) return c.minY + sy * 16 + ly
    }
    return c.minY
  }

  // ---------------------------------------------------------------- 网格

  /** 在主线程重建一个 section 的网格 */
  remeshSection(c: Chunk, sy: number): void {
    const hood = new Uint8Array(N * N * N)
    if (this.fillNeighborhood(c, sy, hood)) c.staleSections.delete(sy)
    else c.staleSections.add(sy)
    const m = meshSection(hood, { greedy: this.greedy })
    this.setSectionMesh(c, sy, m.opaque.indices.length + m.water.indices.length > 0 ? m : null)
  }

  /**
   * 填 18³ 的邻域：section 本身 + 四周一圈（可能在相邻的 section 或相邻的区块里）。
   * 先把周围 3×3 个区块取出来，避免每个方块都去 Map 里查一次。没加载的邻居当作空气。
   * 返回 false 表示有邻居区块没加载。
   */
  private fillNeighborhood(c: Chunk, sy: number, out: Uint8Array): boolean {
    const around: (Chunk | undefined)[] = []
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) around.push(this.chunks.get(`${c.cx + dx},${c.cz + dz}`))
    const y0 = c.minY + sy * 16
    for (let ly = -1; ly <= 16; ly++) {
      for (let lz = -1; lz <= 16; lz++) {
        const dz = lz < 0 ? -1 : lz > 15 ? 1 : 0
        for (let lx = -1; lx <= 16; lx++) {
          const dx = lx < 0 ? -1 : lx > 15 ? 1 : 0
          const n = around[(dz + 1) * 3 + (dx + 1)]
          out[nIndex(lx, ly, lz)] = n ? n.get(lx - dx * 16, y0 + ly, lz - dz * 16) : BlockType.air
        }
      }
    }
    return !around.includes(undefined)
  }

  private setSectionMesh(c: Chunk, sy: number, m: { opaque: SectionMesh; water: SectionMesh } | null): void {
    c.disposeSection(this.scene, sy)
    if (!m) return
    c.meshes[sy] = this.toMesh(m.opaque, this.materials.opaque, c, sy)
    c.waterMeshes[sy] = this.toMesh(m.water, this.materials.water, c, sy)
    if (c.waterMeshes[sy]) c.waterMeshes[sy]!.renderOrder = 1 // 水最后画
  }

  private toMesh(a: SectionMesh, material: THREE.Material, c: Chunk, sy: number): THREE.Mesh | null {
    if (a.indices.length === 0) return null
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(a.positions, 3))
    g.setAttribute('info', new THREE.BufferAttribute(a.info, 4))
    g.setIndex(new THREE.BufferAttribute(a.indices, 1))
    // 位置是放大 16 倍存的，three 自己算出来的包围球会大 16 倍。
    // 一个 section 就是 16³ 的立方体，包围球直接写死（视锥剔除用它判断这个 section 在不在屏幕里）
    const S = 16 * POSITION_SCALE
    g.boundingBox = new THREE.Box3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(S, S, S))
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(8, 8, 8), 8 * Math.sqrt(3))
    const mesh = new THREE.Mesh(g, material)
    mesh.position.set(c.cx * CHUNK_SIZE, c.minY + sy * 16, c.cz * CHUNK_SIZE)
    mesh.matrixAutoUpdate = false
    mesh.updateMatrix()
    this.applyWire(mesh)
    this.scene.add(mesh)
    return mesh
  }

  /** F3 用的统计 */
  get stats() {
    let bytes = 0
    let meshBytes = 0
    let sectionMeshes = 0
    let vertices = 0
    let quads = 0
    for (const c of this.chunks.values()) {
      bytes += c.byteSize
      for (const m of [...c.meshes, ...c.waterMeshes]) {
        if (!m) continue
        sectionMeshes++
        const g = m.geometry
        for (const a of [g.attributes.position, g.attributes.info, g.index!]) meshBytes += (a.array as Uint8Array).byteLength
        vertices += g.attributes.position.count
        quads += g.index!.count / 6
      }
    }
    const height = this.info?.height ?? 0
    return {
      loaded: this.chunks.size,
      loading: this.loading.size,
      /** 方块数据（调色板压缩后） */
      bytes,
      /** 同样的区块用 v0 的方式（每格 1 字节）要多少 */
      v0Bytes: this.chunks.size * 16 * 16 * height,
      meshBytes,
      fluidQueue: this.fluids.queued,
      sectionMeshes,
      vertices,
      quads
    }
  }
}
