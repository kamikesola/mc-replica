import type { Decoration, Proto } from './worker/pipeline'
import { decorationDeps } from './worker/pipeline'
import type WorkerPool from './worker/pool'
import type { ChunkData } from './worker/protocol'
import { AROUND } from './worker/tasks'

/**
 * 区块生成的调度器（v10.2，主线程）。
 *
 * 生成一个区块要三步，每一步是一个 Worker 任务（见 worker/tasks.ts）：
 *   原型 proto(cx, cz)       不依赖别的
 *   装饰 decoration(cx, cz)  依赖周围 3×3 的原型，和同一装饰区域里排在前面的装饰（decorationDeps）
 *   组装 chunk(cx, cz)       依赖周围 3×3 的原型和装饰
 *
 * 原型和装饰算好以后存在这里，谁要用就发给哪个 Worker，所以每样在整个游戏里只算一次。
 * v10.1 以前每个 Worker 自己缓存自己的，邻居的原型在好几个 Worker 里各算一遍（81 个区块算了 398 次原型）。
 *
 * 任务只在依赖都好了以后才排队；队列按优先级（离玩家的距离²，越小越先）发给空闲的 Worker。
 * 这和原版的区块状态（ChunkStatus：noise → surface → carvers → features → full）是同一个思路：
 * 每个阶段的结果保存下来，下一阶段要用周围区块的上一阶段结果。
 */
export class ChunkGenerator {
  private protos = new Map<string, Entry<Proto>>()
  private decorations = new Map<string, Entry<Decoration>>()
  private queue: Task[] = []
  /** reset() 之后 +1：旧的任务结果作废 */
  private epoch = 0
  /** 统计（F3 / 测速用）：一共算了多少个原型、装饰、组装 */
  readonly counts = { proto: 0, decorate: 0, assemble: 0 }

  /** features：这个维度有没有地物（WorldInfo.features），没有就不需要装饰 */
  features = true

  constructor(private readonly pool: WorkerPool) {}

  /** 换种子、换维度、重新加载：清空所有中间结果，排着的任务作废 */
  reset(features: boolean): void {
    this.epoch++
    this.protos.clear()
    this.decorations.clear()
    this.queue = []
    this.features = features
  }

  /** 生成区块 (cx, cz)；priority 越小越先（Terrain 传离玩家的距离²） */
  chunk(cx: number, cz: number, priority: number): Promise<ChunkData> {
    const epoch = this.epoch
    const self = { priority }
    const protos = AROUND.map(([dx, dz]) => this.proto(cx + dx, cz + dz, priority))
    const decos = this.features ? AROUND.map(([dx, dz]) => this.decoration(cx + dx, cz + dz, priority)) : []
    return Promise.all([Promise.all(protos), Promise.all(decos)]).then(([p, d]) =>
      this.run(epoch, self, () => this.pool.call('assemble', { cx, cz, protos: p, decorations: this.features ? d : null })).then((r) => {
        this.counts.assemble++
        return r
      })
    )
  }

  private proto(cx: number, cz: number, priority: number): Promise<Proto> {
    return this.get(this.protos, cx, cz, priority, (epoch, self) =>
      this.run(epoch, self, () => this.pool.call('proto', { cx, cz })).then((r) => {
        this.counts.proto++
        return r
      })
    )
  }

  private decoration(cx: number, cz: number, priority: number): Promise<Decoration> {
    return this.get(this.decorations, cx, cz, priority, (epoch, self) => {
      const deps = decorationDeps(cx, cz)
      self.bump = (p) => {
        AROUND.forEach(([dx, dz]) => this.proto(cx + dx, cz + dz, p))
        deps.forEach(([ex, ez]) => this.decoration(ex, ez, p))
      }
      const protos = AROUND.map(([dx, dz]) => this.proto(cx + dx, cz + dz, priority))
      const priors = deps.map(([ex, ez]) => this.decoration(ex, ez, priority))
      return Promise.all([Promise.all(protos), Promise.all(priors)]).then(([p, d]) =>
        this.run(epoch, self, () =>
          this.pool.call('decorate', { cx, cz, protos: p, priors: deps.map(([ex, ez], i) => [ex, ez, d[i]] as [number, number, Decoration]) })
        ).then((r) => {
          this.counts.decorate++
          return r
        })
      )
    })
  }

  /**
   * 缓存里有就用（算好的、正在算的都算）。后来的请求更急时，把优先级改小：
   * 还在排队的任务排序时读的就是这个数，所以会被提前；它还没排上的依赖，在这次请求里各自被提前
   */
  private get<V>(map: Map<string, Entry<V>>, cx: number, cz: number, priority: number, make: (epoch: number, self: Entry<V>) => Promise<V>): Promise<V> {
    const k = `${cx},${cz}`
    let e = map.get(k)
    if (e) {
      if (priority < e.priority) {
        e.priority = priority
        // 依赖也要跟着提前：重新请求一遍（都在缓存里，只是改优先级）
        if (e.value === undefined) e.bump?.(priority)
      }
      return e.promise
    }
    const entry: Entry<V> = (e = { priority, promise: null!, cx, cz })
    map.set(k, e)
    e.promise = make(this.epoch, e)
    e.promise.then(
      (v) => (entry.value = v),
      () => map.get(k) === entry && map.delete(k) // 失败了（或作废了）下次重算
    )
    return e.promise
  }

  /** 排队：依赖都好了才会调到这里，所以队列里的任务都能马上执行。owner.priority 是活的，排序时再读 */
  private run<V>(epoch: number, owner: { priority: number }, call: () => Promise<V>): Promise<V> {
    return new Promise<V>((resolve, reject) => {
      if (epoch !== this.epoch) return reject(new Error('区块生成已作废（换了种子或重新加载）'))
      this.queue.push({ owner, start: () => call().then(resolve, reject) })
    })
  }

  /** 每帧调用：Worker 有空就按优先级发任务，最多让 Worker 里同时有 limit 个任务 */
  pump(limit: number): void {
    if (!this.queue.length) return
    this.queue.sort((a, b) => a.owner.priority - b.owner.priority)
    while (this.queue.length && this.pool.busy < limit) this.queue.shift()!.start()
  }

  /** 还在排队的任务数 */
  get queued(): number {
    return this.queue.length
  }

  /** 中间结果占的内存（字节，F3 显示） */
  get bytes(): number {
    let n = 0
    for (const e of this.protos.values()) if (e.value) n += e.value.blocks.byteLength + 1024
    for (const e of this.decorations.values()) if (e.value) for (const p of e.value) n += p.idx.byteLength + p.ids.byteLength
    return n
  }

  /**
   * 丢掉离玩家太远的中间结果（切比雪夫距离 > keep 个区块）。正在算的不丢。
   * keep 要比加载半径大几圈：装饰要用到 2 个区块外的前序装饰和它们周围的原型
   */
  evict(pcx: number, pcz: number, keep: number): void {
    for (const map of [this.protos, this.decorations] as Map<string, Entry<unknown>>[])
      for (const [k, e] of map) if (e.value !== undefined && Math.max(Math.abs(e.cx - pcx), Math.abs(e.cz - pcz)) > keep) map.delete(k)
  }
}

interface Entry<V> {
  cx: number
  cz: number
  priority: number
  promise: Promise<V>
  /** 算好以后的值（evict 只丢算好的） */
  value?: V
  /** 把依赖的优先级也提前（装饰用：它的原型和前序装饰） */
  bump?: (priority: number) => void
}

interface Task {
  owner: { priority: number }
  start: () => void
}
