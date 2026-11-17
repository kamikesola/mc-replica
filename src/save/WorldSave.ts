import { fullStateName } from '../terrain/blocks'
import { readLevelDat, regionDir } from './anvil'
import { BlockMapper } from './blockMap'
import type { ChunkEdits, PlayerSave, SaveStore, WorldMeta } from './store'

/**
 * 一个打开着的世界（v8）：从存储里读出玩家改过的方块，玩的时候记下哪些区块改了，定时存回去。
 *
 * 存的只是“改动”：区块 key → (区块内下标 → 状态)，和 Terrain.edits 是同一个东西。
 * 生成的世界：没改过的区块每次按种子重新生成（和原版的结果一样，所以不用存）。
 * 原版存档：区域文件整个存在 files 表里，没改过的区块从区域文件读，区域文件里没有的按存档的种子生成。
 */
export class WorldSave {
  /** 自上次保存以来改过的区块 */
  readonly dirty = new Set<string>()
  /** 区域文件（解析过的路径 → 内容；null = 没有这个文件），按需从存储里读 */
  private readonly regions = new Map<string, Promise<Uint8Array | null>>()
  private saving: Promise<void> | null = null

  private constructor(
    readonly store: SaveStore,
    public meta: WorldMeta
  ) {}

  /** 打开世界，返回它和玩家改过的方块（交给 Terrain.edits） */
  static async open(store: SaveStore, id: string): Promise<{ world: WorldSave; edits: Map<string, Map<number, number>> } | null> {
    const meta = await store.getWorld(id)
    if (!meta) return null
    const raw = await store.getChunks(id)
    const mapper = new BlockMapper()
    const edits = new Map<string, Map<number, number>>()
    for (const [key, e] of raw) edits.set(key, decodeEdits(e, mapper))
    meta.lastPlayed = Date.now()
    await store.putWorld(meta)
    return { world: new WorldSave(store, meta), edits }
  }

  /** 新建一个生成的世界（不存在才建） */
  static async ensure(store: SaveStore, init: { id: string; name: string; seed: string; settings: string }): Promise<WorldMeta> {
    const old = await store.getWorld(init.id)
    if (old) return old
    const now = Date.now()
    const meta: WorldMeta = { ...init, created: now, lastPlayed: now, source: 'generated', player: null, dayTime: 0, daylightCycle: true }
    await store.putWorld(meta)
    return meta
  }

  /**
   * 导入原版存档：files 是存档目录里的文件（路径相对于存档目录，比如 "region/r.0.0.mca"）。
   * 只存 level.dat 和三个维度的区域文件，别的（玩家数据、实体、POI……）用不上
   */
  static async importVanilla(store: SaveStore, files: { path: string; data: ArrayBuffer }[], settings = 'minecraft:overworld'): Promise<WorldMeta> {
    const level = files.find((f) => f.path === 'level.dat')
    if (!level) throw new Error('没有找到 level.dat：请选择存档目录（里面有 level.dat 和 region 文件夹的那一层）')
    const info = await readLevelDat(new Uint8Array(level.data))
    const id = `vanilla-${Date.now().toString(36)}`
    const keep = files.filter((f) => /^(region|DIM-1\/region|DIM1\/region)\/r\.-?\d+\.-?\d+\.mca$/.test(f.path))
    if (keep.length === 0) throw new Error('存档里没有区域文件（region/*.mca）')
    for (const f of keep) await store.putFile(id, f.path, f.data)
    const p = info.player
    const now = Date.now()
    const meta: WorldMeta = {
      id,
      name: info.name || '原版存档',
      seed: info.seed.toString(),
      settings: p && /nether/.test(p.dimension) ? 'minecraft:nether' : p && /end/.test(p.dimension) ? 'minecraft:end' : settings,
      created: now,
      lastPlayed: now,
      source: 'vanilla',
      player: p ? vanillaPlayer(p) : null,
      dayTime: info.dayTime % 24000,
      daylightCycle: true,
      vanilla: { spawn: info.spawn, dataVersion: info.dataVersion, substituted: {}, unknown: {} }
    }
    await store.putWorld(meta)
    return meta
  }

  /** 原版存档：区块 (cx, cz) 所在的区域文件（当前维度），没有返回 null */
  region(cx: number, cz: number): Promise<Uint8Array | null> {
    const path = `${regionDir(this.meta.settings)}/r.${cx >> 5}.${cz >> 5}.mca`
    let r = this.regions.get(path)
    if (!r) {
      r = this.store.getFile(this.meta.id, path).then((b) => (b ? new Uint8Array(b) : null))
      this.regions.set(path, r)
    }
    return r
  }

  /**
   * 把改过的区块和世界信息存回去。同一时间只存一次：上一次还没存完时，等它存完再存这一次
   * （不能直接返回上一次的 Promise —— 那一次存的是旧的玩家位置，这期间改的方块也不在里面）
   */
  async save(edits: Map<string, Map<number, number>>, state: { player: PlayerSave | null; dayTime: number; daylightCycle: boolean } & Partial<Pick<WorldMeta, 'mode' | 'inventory'>>): Promise<void> {
    while (this.saving) await this.saving.catch(() => {})
    const keys = [...this.dirty]
    this.dirty.clear()
    const chunks = new Map<string, ChunkEdits>()
    for (const k of keys) {
      const e = edits.get(k)
      if (e) chunks.set(k, encodeEdits(e))
    }
    this.meta = { ...this.meta, ...state, lastPlayed: Date.now() }
    this.saving = (async () => {
      try {
        if (chunks.size) await this.store.putChunks(this.meta.id, chunks)
        await this.store.putWorld(this.meta)
      } catch (e) {
        for (const k of keys) this.dirty.add(k) // 没存上，下次再试
        throw e
      } finally {
        this.saving = null
      }
    })()
    return this.saving
  }
}

/** 区块内的改动 → 调色板格式 */
export function encodeEdits(e: Map<number, number>): ChunkEdits {
  const palette: string[] = []
  const index = new Map<number, number>()
  const entries = new Int32Array(e.size * 2)
  let n = 0
  for (const [i, s] of e) {
    let p = index.get(s)
    if (p === undefined) {
      p = palette.length
      palette.push(fullStateName(s))
      index.set(s, p)
    }
    entries[n++] = i
    entries[n++] = p
  }
  return { palette, entries }
}

export function decodeEdits(c: ChunkEdits, mapper = new BlockMapper()): Map<number, number> {
  const states = c.palette.map((p) => mapper.map(p))
  const out = new Map<number, number>()
  for (let k = 0; k < c.entries.length; k += 2) out.set(c.entries[k], states[c.entries[k + 1]])
  return out
}

/**
 * 原版玩家的朝向 → 我们的：原版 yaw 0 朝南（+z）、顺时针增加，pitch 正数往下看（都是角度）；
 * 我们的 yaw 0 朝北（-z）、逆时针增加，pitch 正数往上看（弧度）
 */
export function vanillaPlayer(p: { x: number; y: number; z: number; yaw: number; pitch: number; flying: boolean }): PlayerSave {
  return { x: p.x, y: p.y, z: p.z, yaw: Math.PI - (p.yaw * Math.PI) / 180, pitch: (-p.pitch * Math.PI) / 180, flying: p.flying }
}
