import { Vector3 } from 'three'
import type Control from '../../control'
import type Terrain from '../../terrain'

/**
 * 噪声图面板（按 M 打开）：以玩家为中心，画出某个 noise_router 字段的俯视图。
 *
 * 这是 v0 噪声查看器的“游戏内版本”：一边在世界里走，一边看脚下的大陆性、侵蚀度……
 * 是怎么变化的，很容易看出“地形高低”和哪个噪声对应。
 *
 * 色带：负值蓝、0 白、正值橙，以 0 为中心对称；白色十字是玩家位置，短线是朝向。
 * 快捷键：N 换字段，+ / - 缩放（游戏里鼠标被锁定，点不了下拉框）。
 */
const SIZE = 160 // 采样点数（每边）
const NEG = [33, 82, 160]
const MID = [242, 240, 232]
const POS = [176, 92, 34]

export default class NoiseMap {
  el: HTMLElement
  canvas: HTMLCanvasElement
  select: HTMLSelectElement
  scaleSelect: HTMLSelectElement
  legend: HTMLElement
  visible = false
  private busy = false
  private last = { x: NaN, z: NaN, field: '', step: 0 }
  private image: ImageData | null = null

  constructor(
    private readonly terrain: Terrain,
    private readonly control: Control
  ) {
    this.el = document.getElementById('noiseMap')!
    this.canvas = this.el.querySelector('canvas')!
    this.select = this.el.querySelector('select.field')!
    this.scaleSelect = this.el.querySelector('select.scale')!
    this.legend = this.el.querySelector('.legend')!

    // 游戏里鼠标被锁定，点不了下拉框，所以也给键盘快捷键：N 换字段，+/- 缩放
    document.addEventListener('keydown', (e) => {
      if (!this.control.control.isLocked) return
      if (e.code === 'KeyM') this.toggle()
      if (!this.visible) return
      if (e.code === 'KeyN') this.cycle(this.select, 1)
      if (e.code === 'Equal') this.cycle(this.scaleSelect, -1)
      if (e.code === 'Minus') this.cycle(this.scaleSelect, 1)
    })
    this.select.addEventListener('change', () => this.refresh(true))
    this.scaleSelect.addEventListener('change', () => this.refresh(true))
  }

  /** 世界加载好后填下拉框：当前 noise_settings 的所有 router 字段 */
  setFields(fields: string[]) {
    this.select.innerHTML = fields.map((f) => `<option>${f}</option>`).join('')
    this.select.value = fields.includes('continents') ? 'continents' : fields[0]
  }

  private cycle(sel: HTMLSelectElement, d: number) {
    const n = sel.options.length
    sel.selectedIndex = (sel.selectedIndex + d + n) % n
    this.refresh(true)
  }

  toggle() {
    this.visible = !this.visible
    this.el.classList.toggle('hidden', !this.visible)
    if (this.visible) this.refresh(true)
  }

  /** 每帧调用：玩家走出 1/8 画面范围才重新采样，平时只重画玩家标记 */
  update() {
    if (!this.visible) return
    this.refresh(false)
    this.draw()
  }

  private refresh(force: boolean) {
    const f = this.control.feet
    const step = Number(this.scaleSelect.value)
    const moved = Math.max(Math.abs(f.x - this.last.x), Math.abs(f.z - this.last.z)) > (SIZE * step) / 8
    if (this.busy || !this.terrain.info || !(force || moved || this.select.value !== this.last.field)) return
    this.busy = true
    const req = { field: this.select.value, cx: Math.floor(f.x), cy: Math.floor(f.y), cz: Math.floor(f.z), size: SIZE, step }
    this.last = { x: req.cx, z: req.cz, field: req.field, step }
    this.terrain.pool
      .call('slice', req)
      .then((r) => this.paint(r.values, r.min, r.max))
      .catch((e) => console.error(e))
      .finally(() => (this.busy = false))
  }

  private paint(values: Float32Array, min: number, max: number) {
    const img = new ImageData(SIZE, SIZE)
    const m = Math.max(Math.abs(min), Math.abs(max)) || 1
    for (let i = 0; i < values.length; i++) {
      const t = Math.max(-1, Math.min(1, values[i] / m))
      const end = t < 0 ? NEG : POS
      const s = Math.abs(t)
      img.data[i * 4] = MID[0] + (end[0] - MID[0]) * s
      img.data[i * 4 + 1] = MID[1] + (end[1] - MID[1]) * s
      img.data[i * 4 + 2] = MID[2] + (end[2] - MID[2]) * s
      img.data[i * 4 + 3] = 255
    }
    this.image = img
    this.legend.textContent = `${(-m).toFixed(3)}  …  0  …  ${m.toFixed(3)}    每像素 ${this.last.step} 格`
  }

  /** 底图 + 玩家位置和朝向 */
  private draw() {
    if (!this.image) return
    const ctx = this.canvas.getContext('2d')!
    this.canvas.width = SIZE
    this.canvas.height = SIZE
    ctx.putImageData(this.image, 0, 0)
    const f = this.control.feet
    const px = SIZE / 2 + (f.x - this.last.x) / this.last.step
    const pz = SIZE / 2 + (f.z - this.last.z) / this.last.step
    const dir = this.control.camera.getWorldDirection(new Vector3())
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(px - 4, pz)
    ctx.lineTo(px + 4, pz)
    ctx.moveTo(px, pz - 4)
    ctx.lineTo(px, pz + 4)
    ctx.moveTo(px, pz)
    ctx.lineTo(px + dir.x * 12, pz + dir.z * 12)
    ctx.stroke()
  }
}
