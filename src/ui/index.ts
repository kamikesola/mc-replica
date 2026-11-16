import type Control from '../control'
import type Core from '../core'
import type Terrain from '../terrain'
import type Sky from '../sky'
import { BLOCKS } from '../terrain/blocks'
import { blockIcon } from './icons'
import type { WorldInfo } from '../terrain/worker/protocol'
import { $, isMobile } from '../utils'
import F3 from './debug/f3'
import NoiseMap from './debug/noiseMap'
import SavesPanel from './saves'
import type { SaveStore } from '../save/store'

/**
 * UI：所有 HTML 界面（对应原项目的 UI 类）。
 *
 *   菜单     开始 / 继续 / 换种子、换 noise_settings、调视距
 *   准星     屏幕中间的 +
 *   物品栏   底部 9 格，数字键 / 滚轮切换
 *   F3       调试信息（ui/debug/f3.ts）
 *   M        噪声图面板（ui/debug/noiseMap.ts）
 *
 * 界面元素都写在 index.html 里，这里只负责取出来、绑定事件、每帧刷新。
 */
export default class UI {
  f3: F3
  noiseMap: NoiseMap
  /** 存档（v8） */
  saves: SavesPanel
  menu = $('menu')
  playButton = $<HTMLButtonElement>('play')
  status = $('loadingStatus')
  hotbar = $('hotbar')

  private frames = 0
  private fps = 0
  private fpsTime = performance.now()
  private lastSlot = -1
  private lastHotbar = ''
  private timeInput: HTMLInputElement | null = null

  constructor(
    private readonly core: Core,
    private readonly terrain: Terrain,
    private readonly control: Control,
    private readonly sky: Sky,
    store: SaveStore
  ) {
    this.f3 = new F3(core, terrain, control)
    this.saves = new SavesPanel(store, terrain)
    this.noiseMap = new NoiseMap(terrain, control)
    this.initMenu()
    this.initHotbar()
  }

  // ---------------------------------------------------------------- 菜单

  initMenu = () => {
    const seed = $<HTMLInputElement>('seedInput')
    const distance = $<HTMLSelectElement>('distance')
    const q = new URLSearchParams(location.search)
    seed.value = q.get('seed') ?? '42'
    distance.value = String(this.terrain.distance)

    // 开始 / 继续：锁定鼠标，进入游戏
    this.playButton.addEventListener('click', () => {
      if (isMobile) return alert('暂不支持手机，请用电脑浏览器打开')
      this.control.control.lock()
    })
    this.control.control.addEventListener('lock', () => this.menu.classList.add('hidden'))
    this.control.control.addEventListener('unlock', () => {
      this.menu.classList.remove('hidden')
      this.playButton.textContent = '继续游戏'
    })

    // 换种子 / noise_settings：改地址栏参数后刷新页面，最简单也最不容易出错
    $('regenerate').addEventListener('click', () => {
      const params = new URLSearchParams({
        seed: seed.value.trim() || '42',
        settings: $<HTMLSelectElement>('settingsSelect').value,
        distance: distance.value
      })
      location.search = params.toString()
    })

    distance.addEventListener('change', () => this.setDistance(Number(distance.value)))
    const bobbing = $<HTMLInputElement>('bobbing')
    bobbing.addEventListener('change', () => (this.control.bobbing = bobbing.checked))

    // 时间和亮度（v6）：原版的 /time set、doDaylightCycle 游戏规则、“亮度”选项
    const time = $<HTMLInputElement>('timeInput')
    const cycle = $<HTMLInputElement>('daylightCycle')
    const gamma = $<HTMLSelectElement>('gamma')
    time.addEventListener('input', () => (this.terrain.dayTime = Number(time.value)))
    cycle.addEventListener('change', () => (this.terrain.daylightCycle = cycle.checked))
    gamma.addEventListener('change', () => (this.sky.gamma = Number(gamma.value)))
    if (q.get('time')) this.terrain.dayTime = Number(q.get('time'))
    this.timeInput = time
    if (q.get('distance')) {
      distance.value = q.get('distance')!
      this.setDistance(Number(distance.value))
    }
  }

  setDistance(chunks: number) {
    this.terrain.distance = chunks
    this.core.setFogDistance(chunks * 16)
  }

  /** Worker 准备好之后调用：填菜单里的信息 */
  onWorldReady(info: WorldInfo) {
    $<HTMLSelectElement>('settingsSelect').innerHTML = info.allSettings
      .map((id) => `<option${id === info.settings ? ' selected' : ''}>${id}</option>`)
      .join('')
    const vanilla = info.packs.some((p) => p.name !== 'builtin')
    $('worldInfo').textContent =
      `种子 ${info.seed} · ${info.settings}` +
      (vanilla ? '' : ' · 没有检测到原版数据包，正在使用 demo 简化地形（见 datapacks/README.md）')
    this.noiseMap.setFields(info.routerFields)
    this.setDistance(this.terrain.distance)
    this.saves.refresh()
    const w = this.terrain.world
    if (w) $('saveStatus').textContent = `当前存档：${w.meta.name}`
  }

  // ---------------------------------------------------------------- 物品栏

  initHotbar = () => {
    // 每格画一个小方块图标（用的就是方块自己的纹理，见 ui/icons.ts）
    this.hotbar.innerHTML = this.control.hotbar.map(
      (type, i) => `<div class="slot" title="${BLOCKS[type].name}"><img src="${blockIcon(type)}" alt=""><span>${i + 1}</span></div>`
    ).join('')
  }

  // ---------------------------------------------------------------- 每帧

  update = () => {
    // 帧率：每秒统计一次
    this.frames++
    const now = performance.now()
    if (now - this.fpsTime >= 1000) {
      this.fps = Math.round((this.frames * 1000) / (now - this.fpsTime))
      this.frames = 0
      this.fpsTime = now
    }

    // v8.1：鼠标中键换了物品栏里的方块时重画
    const key = this.control.hotbar.join()
    if (key !== this.lastHotbar) {
      this.lastHotbar = key
      this.initHotbar()
      this.lastSlot = -1
    }
    if (this.control.slot !== this.lastSlot) {
      this.lastSlot = this.control.slot
      this.hotbar.querySelectorAll('.slot').forEach((el, i) => el.classList.toggle('on', i === this.lastSlot))
      $('slotName').textContent = BLOCKS[this.control.hotbar[this.lastSlot]].name
    }

    // 加载进度：出生前显示在菜单里
    if (!this.control.spawned) {
      const { loaded } = this.terrain.stats
      this.status.textContent = this.terrain.info ? `正在生成出生点附近的区块…（已完成 ${loaded} 个）` : '正在读取数据包…'
      this.playButton.disabled = true
    } else if (this.playButton.disabled) {
      this.status.textContent = '准备好了'
      this.playButton.disabled = false
    }

    this.core.setMedium(this.control.medium)
    // 菜单里的时间滑块跟着走（菜单打开时才看得见）
    if (this.timeInput && !this.menu.classList.contains('hidden') && document.activeElement !== this.timeInput)
      this.timeInput.value = String(((this.terrain.dayTime % 24000) + 24000) % 24000)
    this.f3.update(this.fps)
    this.noiseMap.update()
  }
}
