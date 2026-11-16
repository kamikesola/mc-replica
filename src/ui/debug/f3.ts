import type Control from '../../control'
import type Core from '../../core'
import type Terrain from '../../terrain'
import { BLOCK_OF, BLOCKS, fullStateName } from '../../terrain/blocks'
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
  /** 原版 F3 的 "Client Light: 15 (15 sky, 0 block)"：脚下这一格 */
  private lightLine(x: number, y: number, z: number): string {
    const l = this.terrain.lightAt(x, y, z)
    return l ? `Client Light: ${Math.max(l.sky, l.block)} (${l.sky} sky, ${l.block} block)` : 'Client Light: （区块还没点亮）'
  }

  /** 时间：第几天、几点（dayTime 0 是早上 6 点） */
  private timeLine(): string {
    const t = this.terrain.dayTime
    const day = Math.floor(t / 24000)
    const ticks = ((t % 24000) + 24000) % 24000
    const minutes = Math.floor(((ticks / 1000 + 6) % 24) * 60)
    const hh = String(Math.floor(minutes / 60)).padStart(2, '0')
    const mm = String(minutes % 60).padStart(2, '0')
    const fixed = this.terrain.fixedTime !== null ? `（这个维度的时间固定在 ${this.terrain.fixedTime}）` : this.terrain.daylightCycle ? '' : '（昼夜循环已关）'
    return `时间: 第 ${day} 天 ${hh}:${mm}  dayTime ${t}${fixed}`
  }

  /** 脚下的生物群系（Worker 算） */
  private biome = '…'
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
        .then((r) => {
          this.routerLine = r.line
          this.biome = r.biome
        })
        .finally(() => (this.querying = false))
    }

    const info = this.terrain.info
    const t = this.control.target
    // v7：准星指着的方块连属性一起显示（原版 F3 右边的 Targeted Block）
    const ts = t ? (this.terrain.getBlock(t.x, t.y, t.z) ?? 0) : 0
    const targetName = t ? `${BLOCKS[BLOCK_OF[ts]].name} ${fullStateName(ts).replace('minecraft:', '')}` : '—'
    const st = this.terrain.stats
    const r = this.core.renderer.info.render
    const mb = (b: number) => (b / 1048576).toFixed(1) + ' MB'
    const lines = [
      `mc-replica v7 (${fps} fps, 20 TPS)`,
      `种子: ${info?.seed ?? '…'}    noise_settings: ${info?.settings ?? '…'}`,
      `区块: ${st.loaded} 已加载（${st.lit} 已点亮）, ${st.loading} 生成中, 上一个用时 ${this.terrain.lastChunkMs.toFixed(0)} ms, 光照+网格 ${this.terrain.lastLightMs.toFixed(0)} ms, 挖/放重建 ${this.terrain.lastRemeshMs.toFixed(1)} ms`,
      `方块数据: ${mb(st.bytes)}（v0 的存法要 ${mb(st.v0Bytes)}）`,
      `网格: ${this.terrain.greedy ? '贪婪' : '逐面'} [G]${this.terrain.materials.wireframe ? ' 线框' : ''} [K]  ${st.sectionMeshes} 个 section 网格, ${st.quads.toLocaleString()} 个四边形, ${mb(st.meshBytes)}`,
      `本帧: ${r.calls} 次绘制, ${r.triangles.toLocaleString()} 个三角形`,
      `流体: ${st.fluidQueue} 个待更新, 上个 tick 处理 ${this.terrain.fluids.lastProcessed} 个`,
      '',
      `XYZ: ${f.x.toFixed(3)} / ${f.y.toFixed(5)} / ${f.z.toFixed(3)}`,
      `Block: ${bx} ${by} ${bz}`,
      `Chunk: ${Math.floor(bx / CHUNK_SIZE)} ${Math.floor(bz / CHUNK_SIZE)}  (区块内 ${bx & 15} ${bz & 15})`,
      `Facing: ${this.control.facing}`,
      `Biome: ${this.biome}`,
      this.lightLine(bx, by, bz),
      this.timeLine(),
      `状态: ${this.control.player.state}${this.control.player.onGround ? '  落地' : ''}    速度: ${this.speed()}`,
      '',
      this.routerLine,
      '',
      `准星: ${targetName}${t ? `  (${t.x}, ${t.y}, ${t.z})` : ''}`
    ]
    this.el.textContent = lines.join('\n')
  }
}
