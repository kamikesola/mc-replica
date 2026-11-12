import type { Method, Params, RequestMessage, ResponseMessage, Result } from './protocol'
import GenerateWorker from './generate?worker'

/**
 * 一组地形 Worker。
 *
 * 原项目只有一个 Worker；这里开多个（CPU 核数 - 1，最多 4 个），区块可以并行生成。
 * call() 会把请求交给当前最空闲的那个 Worker，返回 Promise。
 *
 *   const data = await pool.call('chunk', { cx: 0, cz: 0 })
 *
 * 每个 Worker 都有一份完整的 Worldgen（各自读数据包、各自建噪声），互不共享内存。
 */
interface Slot {
  worker: Worker
  busy: number // 正在处理的请求数
}

export default class WorkerPool {
  private readonly slots: Slot[] = []
  private nextId = 1
  private readonly pending = new Map<number, { slot: Slot; resolve: (v: unknown) => void; reject: (e: Error) => void }>()

  constructor(count = Math.max(1, Math.min(4, (navigator.hardwareConcurrency || 4) - 1))) {
    for (let i = 0; i < count; i++) {
      const slot: Slot = { worker: new GenerateWorker(), busy: 0 }
      slot.worker.onmessage = (e: MessageEvent<ResponseMessage>) => this.onMessage(e.data)
      this.slots.push(slot)
    }
  }

  get size(): number {
    return this.slots.length
  }

  /** 正在算的请求总数（Terrain 用它控制同时生成多少个区块） */
  get busy(): number {
    return this.slots.reduce((n, s) => n + s.busy, 0)
  }

  /** 发给最空闲的 Worker */
  call<M extends Method>(method: M, params: Params<M>): Promise<Result<M>> {
    const slot = this.slots.reduce((a, b) => (b.busy < a.busy ? b : a))
    return this.send(slot, method, params)
  }

  /** 发给每一个 Worker（init 要让所有 Worker 都换种子），返回第一个的结果 */
  async broadcast<M extends Method>(method: M, params: Params<M>): Promise<Result<M>> {
    const results = await Promise.all(this.slots.map((s) => this.send(s, method, params)))
    return results[0]
  }

  private send<M extends Method>(slot: Slot, method: M, params: Params<M>): Promise<Result<M>> {
    const id = this.nextId++
    slot.busy++
    const msg: RequestMessage<M> = { id, method, params }
    return new Promise((resolve, reject) => {
      this.pending.set(id, { slot, resolve: resolve as (v: unknown) => void, reject })
      slot.worker.postMessage(msg)
    })
  }

  private onMessage(msg: ResponseMessage): void {
    const p = this.pending.get(msg.id)
    if (!p) return
    this.pending.delete(msg.id)
    p.slot.busy--
    if (msg.ok) p.resolve(msg.result)
    else p.reject(new Error(msg.error))
  }
}
