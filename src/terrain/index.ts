import * as THREE from 'three'
import { BlockType, FLUID_KIND, FluidKind, isSolid } from './blocks'
import Chunk, { CHUNK_SIZE } from './chunk/Chunk'
import Section from './chunk/Section'
import { FluidTicker } from './fluid/FluidTicker'
import Highlight from './highlight'
import Materials from './mesh/materials'
import { fillLightHood } from './light/LightEngine'
import { updateLight, type LightWorld } from './light/LightUpdater'
import { meshSection, N, nIndex, POSITION_SCALE, type SectionMesh } from './mesh/mesher'
import type { ChunkData, WorldInfo } from './worker/protocol'
import WorkerPool from './worker/pool'
import { fixedTime } from '../sky/formulas'

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
 *
 * v6 的变化：区块生成分两步。
 *   1. 生成方块（Worker，'chunk'）：视距外再多生成一圈
 *   2. 点亮 + 生成网格（Worker，'light'）：周围 8 个区块都生成好了才能做（光会从邻居照过来），做完才显示
 * 之后挖放方块、流体流动，光照在主线程增量更新（light/LightUpdater.ts），亮度变了的 section 也重建网格。
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
  /**
   * 游戏时间（v6）：刻，每个 tick +1，24000 一天。0 是早上 6 点（原版新世界从 0 开始）。
   * 下界、末地的时间是固定的（fixedTime），这里的数照样走，但天空用固定值
   */
  dayTime = 0
  /** 原版游戏规则 doDaylightCycle */
  daylightCycle = true
  /** 维度的固定时间（下界 18000、末地 6000），主世界 null */
  fixedTime: number | null = null
  /** 最近一个区块的生成耗时，F3 里显示 */
  lastChunkMs = 0
  /** 最近一次主线程重建 section 网格的耗时 */
  lastRemeshMs = 0
  /** 最近一个区块算光照 + 网格的耗时（v6） */
  lastLightMs = 0
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
    this.fixedTime = fixedTime(this.info.settings)
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
    this.materials.flushTints()
    const pcx = Math.floor(this.camera.position.x / CHUNK_SIZE)
    const pcz = Math.floor(this.camera.position.z / CHUNK_SIZE)
    const inView = (cx: number, cz: number, extra: number) => (cx - pcx) ** 2 + (cz - pcz) ** 2 <= (this.distance + extra + 0.5) ** 2

    // 卸载：比生成范围（视距 + 1）再多一圈才卸，避免在边界来回走时反复加载
    for (const [key, c] of this.chunks) {
      if (Math.max(Math.abs(c.cx - pcx), Math.abs(c.cz - pcz)) > this.distance + 2) {
        c.dispose(this.scene)
        this.chunks.delete(key)
      }
    }

    // 每个 Worker 最多排 2 个任务。先算光照（便宜，算完就能显示），再生成新区块，都从离玩家最近的开始
    const maxInFlight = this.pool.size * 2
    if (this.pool.busy >= maxInFlight) return
    const ready: [number, Chunk][] = []
    for (const c of this.chunks.values()) {
      if (c.light || c.lighting || !inView(c.cx, c.cz, 0)) continue
      if (this.neighbors(c).every((n) => n)) ready.push([(c.cx - pcx) ** 2 + (c.cz - pcz) ** 2, c])
    }
    ready.sort((a, b) => a[0] - b[0])
    for (const [, c] of ready.slice(0, maxInFlight - this.pool.busy)) this.relight(c)
    if (this.pool.busy >= maxInFlight) return

    const wanted: [number, number, number][] = []
    const r = this.distance + 1
    for (let dx = -r; dx <= r; dx++) {
      for (let dz = -r; dz <= r; dz++) {
        if (!inView(pcx + dx, pcz + dz, 1)) continue // 圆形视距
        const key = `${pcx + dx},${pcz + dz}`
        if (!this.chunks.has(key) && !this.loading.has(key)) wanted.push([dx * dx + dz * dz, pcx + dx, pcz + dz])
      }
    }
    wanted.sort((a, b) => a[0] - b[0])
    for (const [, cx, cz] of wanted.slice(0, maxInFlight - this.pool.busy)) this.load(cx, cz)
  }

  /** 周围 8 个区块（先 z 后 x，不含自己）；没生成的是 undefined */
  private neighbors(c: Chunk): (Chunk | undefined)[] {
    const out: (Chunk | undefined)[] = []
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) if (dx || dz) out.push(this.chunks.get(`${c.cx + dx},${c.cz + dz}`))
    return out
  }

  /** 点亮一个区块：把周围 3×3 的方块发给 Worker，算光照和网格（v6） */
  private relight(c: Chunk): void {
    const nine: Chunk[] = []
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) nine.push(this.chunks.get(`${c.cx + dx},${c.cz + dz}`)!)
    const versions = nine.map((n) => n.version)
    const generation = this.generation
    c.lighting = true
    this.pool
      .call('light', { chunks: nine.map((n) => n.flat), greedy: this.greedy })
      .then((r) => {
        c.lighting = false
        if (generation !== this.generation || this.chunks.get(`${c.cx},${c.cz}`) !== c) return
        // 算的时候有方块变了（挖放方块、流体）：作废，下一帧重新算
        if (nine.some((n, i) => n.version !== versions[i])) return
        c.light = r.light
        this.lastLightMs = r.ms
        for (let sy = 0; sy < r.meshes.length; sy++) this.setSectionMesh(c, sy, r.meshes[sy])
        this.syncBorders(c)
      })
      .catch((e) => {
        c.lighting = false
        console.error(`区块 ${c.cx},${c.cz} 光照失败`, e)
      })
  }

  /**
   * 刚点亮的区块：把它边上一圈的亮度抄给已经点亮的邻居（邻居的光照数组里存着这一圈的副本）。
   * 一般两边算出来是一样的；邻居点亮之后这边的方块改过时才会不一样，那时邻居的网格也要重建
   */
  private syncBorders(c: Chunk): void {
    for (const n of this.neighbors(c)) {
      if (!n?.light) continue
      const dx = c.cx - n.cx
      const dz = c.cz - n.cz
      const touched = new Set<number>()
      for (let y = c.minY; y < c.minY + c.height; y++)
        for (let lz = -1; lz <= 16; lz++)
          for (let lx = -1; lx <= 16; lx++) {
            // n 的局部坐标 (lx, lz) 落在 c 里的格子
            const cx = lx - dx * 16
            const cz = lz - dz * 16
            if (cx < 0 || cx > 15 || cz < 0 || cz > 15) continue
            const v = c.light![c.lightIndex(cx, y, cz)]
            const i = n.lightIndex(lx, y, lz)
            if (n.light[i] !== v) {
              n.light[i] = v
              touched.add(n.sectionIndex(y))
            }
          }
      for (const sy of touched) for (const s of [sy - 1, sy, sy + 1]) if (s >= 0 && s < n.sections.length) this.dirty.add(`${n.cx},${n.cz},${s}`)
    }
  }

  /** 一个游戏 tick（由 Control 的 20 TPS 循环调用）：推进流体 */
  tick(): void {
    this.fluids.tick()
    if (this.daylightCycle) this.dayTime++
  }

  /** 画面用的时间：固定时间的维度用固定值，否则在两个 tick 之间插值 */
  renderTime(partialTick: number): number {
    return this.fixedTime ?? this.dayTime + (this.daylightCycle ? partialTick : 0)
  }

  private load(cx: number, cz: number): void {
    const key = `${cx},${cz}`
    const generation = this.generation
    this.loading.add(key)
    this.pool
      .call('chunk', { cx, cz }, regionAffinity(cx, cz))
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
    const chunk = new Chunk(data.cx, data.cz, info.minY, info.height, sections, data.blocks)
    const key = `${data.cx},${data.cz}`
    this.chunks.set(key, chunk)
    this.lastChunkMs = data.ms
    this.materials.writeTints(data.cx, data.cz, data.tints)

    // 玩家改过的方块写回去（网格、光照在点亮时一起算，这里不用管）
    const edits = this.edits.get(key)
    if (edits)
      for (const [i, type] of edits) {
        const lx = i & 15
        const lz = (i >> 4) & 15
        const y = (i >> 8) + chunk.minY
        chunk.set(lx, y, lz, type)
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
    const old = c.get(lx, y, lz)
    c.set(lx, y, lz, type)
    // 光照（v6）：区块已经点亮了才增量更新；没点亮的，点亮时会用新的方块算
    if (c.light && old !== type) updateLight(this.lightWorld, x, y, z, old, type)

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

  /**
   * 给光照增量更新用的世界接口（v6）。改一格亮度时，除了自己的区块，旁边已点亮的区块存的那一圈副本也要改，
   * 并且所有“邻域里包含这一格”的 section 都要重建网格（平滑光照要看邻居的亮度）
   */
  private lightWorld: LightWorld = (() => {
    let last: Chunk | undefined
    const chunkAt = (x: number, z: number) => {
      const cx = Math.floor(x / 16)
      const cz = Math.floor(z / 16)
      if (last && last.cx === cx && last.cz === cz && this.chunks.get(`${cx},${cz}`) === last) return last
      return (last = this.chunks.get(`${cx},${cz}`))
    }
    const self = this
    return {
      get minY() {
        return self.info!.minY
      },
      get maxY() {
        return self.info!.minY + self.info!.height
      },
      get hasSky() {
        return self.info!.hasSkyLight
      },
      block: (x, y, z) => chunkAt(x, z)?.get(x & 15, y, z & 15) ?? BlockType.air,
      get: (x, y, z) => {
        const c = chunkAt(x, z)
        if (!c?.light || y < c.minY || y >= c.minY + c.height) return -1
        return c.light[c.lightIndex(x & 15, y, z & 15)]
      },
      set: (x, y, z, v) => {
        const c = chunkAt(x, z)
        if (!c?.light) return
        const lx = x & 15
        const lz = z & 15
        c.light[c.lightIndex(lx, y, lz)] = v
        for (let dz = -1; dz <= 1; dz++)
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dz === 0) continue
            const px = lx - dx * 16
            const pz = lz - dz * 16
            if (px < -1 || px > 16 || pz < -1 || pz > 16) continue
            const n = this.chunks.get(`${c.cx + dx},${c.cz + dz}`)
            if (n?.light) n.light[n.lightIndex(px, y, pz)] = v
          }
        for (let oz = -1; oz <= 1; oz++)
          for (let ox = -1; ox <= 1; ox++)
            for (let oy = -1; oy <= 1; oy++) {
              const yy = y + oy
              if (yy < c.minY || yy >= c.minY + c.height) continue
              const n = chunkAt(x + ox, z + oz)
              if (n?.light) this.dirty.add(`${n.cx},${n.cz},${n.sectionIndex(yy)}`)
            }
      }
    }
  })()

  /** 一格的天空光、方块光（F3 用）；区块没点亮时返回 null */
  lightAt(x: number, y: number, z: number): { sky: number; block: number } | null {
    const v = this.lightWorld.get(x, y, z)
    if (v < 0) return y >= (this.info?.minY ?? 0) + (this.info?.height ?? 0) && this.getChunk(x, z)?.light ? { sky: this.info!.hasSkyLight ? 15 : 0, block: 0 } : null
    return { sky: v & 15, block: v >> 4 }
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

  /** 从 fromY 往下找第一个“脚下实心、身体两格是空的”位置（v5.2：下界有天花板，不能站到顶上去） */
  floorBelow(x: number, z: number, fromY: number): number | null {
    const c = this.getChunk(x, z)
    if (!c) return null
    for (let y = fromY; y > c.minY + 1; y--) {
      const at = (yy: number) => this.getBlock(x, yy, z) ?? 0
      if (isSolid(at(y - 1)) && !isSolid(at(y)) && !isSolid(at(y + 1)) && FLUID_KIND[at(y)] === FluidKind.none) return y - 1
    }
    return null
  }

  // ---------------------------------------------------------------- 网格

  /** 在主线程重建一个 section 的网格 */
  remeshSection(c: Chunk, sy: number): void {
    if (!c.light) return // 还没点亮的区块没有网格，点亮时一起生成
    const hood = new Uint8Array(N * N * N)
    if (this.fillNeighborhood(c, sy, hood)) c.staleSections.delete(sy)
    else c.staleSections.add(sy)
    const light = new Uint8Array(N * N * N)
    fillLightHood(c.light, c.height, sy, this.info!.hasSkyLight, light)
    const m = meshSection(hood, { greedy: this.greedy, light })
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
    g.setAttribute('light', new THREE.BufferAttribute(a.light, 2))
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
        for (const a of [g.attributes.position, g.attributes.info, g.attributes.light, g.index!]) meshBytes += (a.array as Uint8Array).byteLength
        vertices += g.attributes.position.count
        quads += g.index!.count / 6
      }
    }
    const height = this.info?.height ?? 0
    let lit = 0
    for (const c of this.chunks.values()) if (c.light) lit++
    return {
      loaded: this.chunks.size,
      lit,
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

/** 区块所在的装饰区域（见 worker/pipeline.ts 的 REGION）→ 一个整数，用来挑 Worker */
function regionAffinity(cx: number, cz: number): number {
  const rx = Math.floor(cx / 4)
  const rz = Math.floor(cz / 4)
  return (Math.imul(rx, 73856093) ^ Math.imul(rz, 19349663)) >>> 0
}
