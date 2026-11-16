/**
 * 存档的存储（v8）：浏览器里是 IndexedDB，测试里是内存。
 *
 * 三张表：
 *   worlds   每个世界一条：名字、种子、维度、玩家、时间……（WorldMeta）
 *   chunks   玩家改过的区块：键 "世界id|cx,cz"，值是这个区块里改过的方块（ChunkEdits）
 *   files    导入的原版存档的文件：键 "世界id|region/r.0.0.mca"，值是文件内容（ArrayBuffer）
 *
 * 只存“和生成结果不一样的地方”，所以一个刚建好的世界几乎不占空间；原版存档要把区域文件整个存进来。
 */

export interface PlayerSave {
  x: number
  y: number
  z: number
  /** 我们的朝向（弧度，three.js 的 Euler YXZ） */
  yaw: number
  pitch: number
  flying: boolean
}

export interface WorldMeta {
  id: string
  name: string
  seed: string
  settings: string
  created: number
  lastPlayed: number
  /** generated：我们自己生成的；vanilla：导入的原版存档（没存的区块按它的种子生成） */
  source: 'generated' | 'vanilla'
  player: PlayerSave | null
  dayTime: number
  daylightCycle: boolean
  /** 导入的原版存档：level.dat 里的出生点、数据版本、导入时换掉的方块 */
  vanilla?: { spawn: { x: number; y: number; z: number }; dataVersion: number; substituted: Record<string, number>; unknown: Record<string, number> }
}

/**
 * 一个区块里改过的方块，用调色板存（和原版一样）：状态写成字符串（"minecraft:oak_log[axis=x]"），
 * 这样以后状态编号变了，旧存档也能读
 */
export interface ChunkEdits {
  palette: string[]
  /** [区块内下标, 调色板下标, 区块内下标, 调色板下标, ...]，下标见 Chunk.index */
  entries: Int32Array
}

export interface SaveStore {
  listWorlds(): Promise<WorldMeta[]>
  getWorld(id: string): Promise<WorldMeta | undefined>
  putWorld(w: WorldMeta): Promise<void>
  /** 删除世界和它的区块、文件 */
  deleteWorld(id: string): Promise<void>
  getChunks(world: string): Promise<Map<string, ChunkEdits>>
  putChunks(world: string, chunks: Map<string, ChunkEdits>): Promise<void>
  getFile(world: string, path: string): Promise<ArrayBuffer | undefined>
  putFile(world: string, path: string, data: ArrayBuffer): Promise<void>
  listFiles(world: string): Promise<string[]>
}

/** 测试用 */
export class MemoryStore implements SaveStore {
  worlds = new Map<string, WorldMeta>()
  chunks = new Map<string, ChunkEdits>()
  files = new Map<string, ArrayBuffer>()
  async listWorlds() {
    return [...this.worlds.values()].map((w) => structuredClone(w))
  }
  async getWorld(id: string) {
    const w = this.worlds.get(id)
    return w && structuredClone(w)
  }
  async putWorld(w: WorldMeta) {
    this.worlds.set(w.id, structuredClone(w))
  }
  async deleteWorld(id: string) {
    this.worlds.delete(id)
    for (const m of [this.chunks, this.files]) for (const k of [...m.keys()]) if (k.startsWith(id + '|')) m.delete(k)
  }
  async getChunks(world: string) {
    const out = new Map<string, ChunkEdits>()
    for (const [k, v] of this.chunks) if (k.startsWith(world + '|')) out.set(k.slice(world.length + 1), structuredClone(v))
    return out
  }
  async putChunks(world: string, chunks: Map<string, ChunkEdits>) {
    for (const [k, v] of chunks) this.chunks.set(`${world}|${k}`, structuredClone(v))
  }
  async getFile(world: string, path: string) {
    return this.files.get(`${world}|${path}`)
  }
  async putFile(world: string, path: string, data: ArrayBuffer) {
    this.files.set(`${world}|${path}`, data)
  }
  async listFiles(world: string) {
    return [...this.files.keys()].filter((k) => k.startsWith(world + '|')).map((k) => k.slice(world.length + 1))
  }
}

/** IndexedDB 版 */
export class IdbStore implements SaveStore {
  private db: Promise<IDBDatabase>

  constructor(name = 'mc-replica') {
    this.db = new Promise((resolve, reject) => {
      const req = indexedDB.open(name, 1)
      req.onupgradeneeded = () => {
        const db = req.result
        db.createObjectStore('worlds', { keyPath: 'id' })
        db.createObjectStore('chunks')
        db.createObjectStore('files')
      }
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => reject(req.error)
    })
  }

  /** 在一个事务里做事，事务完成后 resolve */
  private async tx<T>(stores: string[], mode: IDBTransactionMode, fn: (t: IDBTransaction) => Promise<T> | T): Promise<T> {
    const db = await this.db
    const t = db.transaction(stores, mode)
    const done = new Promise<void>((resolve, reject) => {
      t.oncomplete = () => resolve()
      t.onerror = () => reject(t.error)
      t.onabort = () => reject(t.error)
    })
    const r = await fn(t)
    await done
    return r
  }

  private static req<T>(r: IDBRequest<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      r.onsuccess = () => resolve(r.result)
      r.onerror = () => reject(r.error)
    })
  }

  /** 键在 "世界id|" 开头的范围 */
  private static range(world: string) {
    return IDBKeyRange.bound(world + '|', world + '|￿')
  }

  listWorlds() {
    return this.tx(['worlds'], 'readonly', (t) => IdbStore.req(t.objectStore('worlds').getAll() as IDBRequest<WorldMeta[]>))
  }
  getWorld(id: string) {
    return this.tx(['worlds'], 'readonly', (t) => IdbStore.req(t.objectStore('worlds').get(id) as IDBRequest<WorldMeta | undefined>))
  }
  putWorld(w: WorldMeta) {
    return this.tx(['worlds'], 'readwrite', (t) => void t.objectStore('worlds').put(w))
  }
  deleteWorld(id: string) {
    return this.tx(['worlds', 'chunks', 'files'], 'readwrite', (t) => {
      t.objectStore('worlds').delete(id)
      t.objectStore('chunks').delete(IdbStore.range(id))
      t.objectStore('files').delete(IdbStore.range(id))
    })
  }
  getChunks(world: string) {
    return this.tx(['chunks'], 'readonly', async (t) => {
      const s = t.objectStore('chunks')
      const [keys, values] = await Promise.all([IdbStore.req(s.getAllKeys(IdbStore.range(world))), IdbStore.req(s.getAll(IdbStore.range(world)))])
      const out = new Map<string, ChunkEdits>()
      keys.forEach((k, i) => out.set(String(k).slice(world.length + 1), values[i] as ChunkEdits))
      return out
    })
  }
  putChunks(world: string, chunks: Map<string, ChunkEdits>) {
    return this.tx(['chunks'], 'readwrite', (t) => {
      const s = t.objectStore('chunks')
      for (const [k, v] of chunks) s.put(v, `${world}|${k}`)
    })
  }
  getFile(world: string, path: string) {
    return this.tx(['files'], 'readonly', (t) => IdbStore.req(t.objectStore('files').get(`${world}|${path}`) as IDBRequest<ArrayBuffer | undefined>))
  }
  putFile(world: string, path: string, data: ArrayBuffer) {
    return this.tx(['files'], 'readwrite', (t) => void t.objectStore('files').put(data, `${world}|${path}`))
  }
  listFiles(world: string) {
    return this.tx(['files'], 'readonly', async (t) => (await IdbStore.req(t.objectStore('files').getAllKeys(IdbStore.range(world)))).map((k) => String(k).slice(world.length + 1)))
  }
}
