import type Control from '../../control'
import type Terrain from '../../terrain'
import { BLOCKS } from '../../terrain/blocks'
import { CHUNK_SIZE } from '../../terrain/chunk'

/**
 * F3 调试屏。左上角显示坐标、区块、朝向、帧率，以及最重要的一行：
 *
 *   NoiseRouter T: … V: … C: … E: … D: … W: … PV: … AS: … N: …
 *
 * 格式和游戏里的 F3 完全一样。用同一个种子、站到同一个坐标，就能和原版逐个数字对比——
 * 这是 v0 “与原版一致”最直接的验证方式。
 *
 * NoiseRouter 那一行要在 Worker 里算（单点求值要几十微秒），所以每 0.25 秒才更新一次。
 */
export default class F3 {
  el: HTMLElement
  visible = false
  private routerLine = ''
  private lastQuery = 0
  private querying = false

  constructor(
    private readonly terrain: Terrain,
    private readonly control: Control
  ) {
    this.el = document.getElementById('f3')!
    document.addEventListener('keydown', (e) => {
      if (e.code === 'F3') {
        e.preventDefault()
        this.visible = !this.visible
        this.el.classList.toggle('hidden', !this.visible)
      }
    })
  }

  update(fps: number) {
    if (!this.visible) return
    const now = performance.now()
    const f = this.control.feet
    const bx = Math.floor(f.x)
    const by = Math.floor(f.y)
    const bz = Math.floor(f.z)

    // 隔一段时间问一次 Worker
    if (!this.querying && now - this.lastQuery > 250 && this.terrain.info) {
      this.querying = true
      this.lastQuery = now
      this.terrain.pool
        .call('f3', { x: bx, y: by, z: bz })
        .then((r) => (this.routerLine = r.line))
        .finally(() => (this.querying = false))
    }

    const info = this.terrain.info
    const t = this.control.target
    const targetName = t ? BLOCKS[this.terrain.getBlock(t.x, t.y, t.z) ?? 0].name : '—'
    const { loaded, loading } = this.terrain.stats
    const lines = [
      `mc-replica v0 (${fps} fps)`,
      `种子: ${info?.seed ?? '…'}    noise_settings: ${info?.settings ?? '…'}`,
      `区块: ${loaded} 已加载, ${loading} 生成中, 上一个用时 ${this.terrain.lastChunkMs.toFixed(0)} ms`,
      '',
      `XYZ: ${f.x.toFixed(3)} / ${f.y.toFixed(5)} / ${f.z.toFixed(3)}`,
      `Block: ${bx} ${by} ${bz}`,
      `Chunk: ${Math.floor(bx / CHUNK_SIZE)} ${Math.floor(bz / CHUNK_SIZE)}  (区块内 ${bx & 15} ${bz & 15})`,
      `Facing: ${this.control.facing}`,
      `模式: ${this.control.player.mode}${this.control.player.onGround ? '  落地' : ''}`,
      '',
      this.routerLine,
      '',
      `准星: ${targetName}${t ? `  (${t.x}, ${t.y}, ${t.z})` : ''}`
    ]
    this.el.textContent = lines.join('\n')
  }
}
