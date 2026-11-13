import type Control from '../../control'
import type Core from '../../core'
import type Terrain from '../../terrain'
import { BLOCKS } from '../../terrain/blocks'
import { CHUNK_SIZE } from '../../terrain/chunk/Chunk'

/**
 * F3 调试屏。左上角显示坐标、区块、朝向、帧率，以及最重要的一行：
 *
 *   NoiseRouter T: … V: … C: … E: … D: … W: … PV: … AS: … N: …
 *
 * 格式和游戏里的 F3 完全一样。用同一个种子、站到同一个坐标，就能和原版逐个数字对比——
 * 这是 v0 “与原版一致”最直接的验证方式。
 *
 * NoiseRouter 那一行要在 Worker 里算（单点求值要几十微秒），所以每 0.25 秒才更新一次。
 *
 * v1 加了渲染统计（内存、顶点、绘制调用），以及两个对比用的按键：
 *   G  贪婪网格开 / 关（关掉就是 v0 那样一个面一个四边形，会重新生成所有区块）
 *   K  线框模式，看得见合并出来的大矩形
 */
export default class F3 {
  el: HTMLElement
  visible = false
  private routerLine = ''
  private lastQuery = 0
  private querying = false

  constructor(
    private readonly core: Core,
    private readonly terrain: Terrain,
    private readonly control: Control
  ) {
    this.el = document.getElementById('f3')!
    document.addEventListener('keydown', (e) => {
      if (e.code === 'F3') {
        e.preventDefault()
        this.visible = !this.visible
        this.el.classList.toggle('hidden', !this.visible)
      } else if (e.code === 'KeyG') {
        this.terrain.setGreedy(!this.terrain.greedy)
      } else if (e.code === 'KeyK') {
        this.terrain.setWireframe(!this.terrain.materials.wireframe)
      }
    })
  }

  /** 水平速度和竖直速度（格/秒）。物理是每 tick 算的，所以直接用 tick 速度 × 20 */
  private speed(): string {
    const p = this.control.player
    const d = { x: p.pos.x - p.prevPos.x, y: p.pos.y - p.prevPos.y, z: p.pos.z - p.prevPos.z }
    return `水平 ${(Math.hypot(d.x, d.z) * 20).toFixed(2)}  竖直 ${(d.y * 20).toFixed(2)} 格/秒`
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
    const st = this.terrain.stats
    const r = this.core.renderer.info.render
    const mb = (b: number) => (b / 1048576).toFixed(1) + ' MB'
    const lines = [
      `mc-replica v2 (${fps} fps, 20 TPS)`,
      `种子: ${info?.seed ?? '…'}    noise_settings: ${info?.settings ?? '…'}`,
      `区块: ${st.loaded} 已加载, ${st.loading} 生成中, 上一个用时 ${this.terrain.lastChunkMs.toFixed(0)} ms, 挖/放重建 ${this.terrain.lastRemeshMs.toFixed(1)} ms`,
      `方块数据: ${mb(st.bytes)}（v0 的存法要 ${mb(st.v0Bytes)}）`,
      `网格: ${this.terrain.greedy ? '贪婪' : '逐面'} [G]${this.terrain.materials.wireframe ? ' 线框' : ''} [K]  ${st.sectionMeshes} 个 section 网格, ${st.quads.toLocaleString()} 个四边形, ${mb(st.meshBytes)}`,
      `本帧: ${r.calls} 次绘制, ${r.triangles.toLocaleString()} 个三角形`,
      '',
      `XYZ: ${f.x.toFixed(3)} / ${f.y.toFixed(5)} / ${f.z.toFixed(3)}`,
      `Block: ${bx} ${by} ${bz}`,
      `Chunk: ${Math.floor(bx / CHUNK_SIZE)} ${Math.floor(bz / CHUNK_SIZE)}  (区块内 ${bx & 15} ${bz & 15})`,
      `Facing: ${this.control.facing}`,
      `状态: ${this.control.player.state}${this.control.player.onGround ? '  落地' : ''}    速度: ${this.speed()}`,
      '',
      this.routerLine,
      '',
      `准星: ${targetName}${t ? `  (${t.x}, ${t.y}, ${t.z})` : ''}`
    ]
    this.el.textContent = lines.join('\n')
  }
}
