import type Control from '../control'
import type Core from '../core'
import type Terrain from '../terrain'
import type Sky from '../sky'
import { itemIcon } from './icons'
import { itemName, type ItemStack } from '../items/items'
import { CraftingGrid } from '../items/crafting'
import { maxDamage } from '../items/tools'
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
    this.initInventory()
    // v10：游戏模式
    const mode = $<HTMLSelectElement>('modeSelect')
    mode.addEventListener('change', () => this.control.setMode(mode.value as 'creative' | 'survival'))
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
      if (this.inventoryOpen) return // v10：打开背包时也会松开鼠标，但不显示菜单
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
    $<HTMLSelectElement>('modeSelect').value = this.control.mode
    const w = this.terrain.world
    if (w) $('saveStatus').textContent = `当前存档：${w.meta.name}`
  }

  // ---------------------------------------------------------------- 物品栏

  initHotbar = () => {
    // v10：物品栏是背包的前 9 格，每格一个物品图标（ui/icons.ts）和数量
    this.hotbar.innerHTML = Array.from({ length: 9 }, (_, i) => `<div class="slot"><img alt=""><b></b><span>${i + 1}</span></div>`).join('')
  }

  /** 把一组格子画成背包里的物品（图标是异步的，读好了再填进去） */
  private fillSlots(els: ArrayLike<Element>, stacks: (ItemStack | null)[]) {
    for (let i = 0; i < els.length; i++) {
      const el = els[i] as HTMLElement
      const st = stacks[i]
      const img = el.querySelector('img')!
      const count = el.querySelector('b')!
      el.title = st ? itemName(st.item) : ''
      count.textContent = st && st.count > 1 ? String(st.count) : ''
      // v10.1：耐久条（原版 ItemStack.getBarWidth / getBarColor：13 像素宽，颜色从绿到红）
      const max = st ? maxDamage(st.item) : 0
      let bar = el.querySelector('i')
      if (st && max && st.damage) {
        if (!bar) bar = el.appendChild(document.createElement('i'))
        const f = Math.max(0, (max - st.damage) / max)
        bar.style.width = `${Math.round(13 - (st.damage * 13) / max) * 2}px`
        bar.style.background = `hsl(${Math.round(f * 120)}, 100%, 50%)`
      } else bar?.remove()
      if (!st) {
        img.removeAttribute('src')
        img.dataset.item = ''
        continue
      }
      if (img.dataset.item === st.item) continue
      img.dataset.item = st.item
      itemIcon(st.item, this.terrain.pack).then((url) => {
        if (img.dataset.item === st.item) img.src = url
      })
    }
  }

  // ---------------------------------------------------------------- 背包界面（v10，E 键）；v10.1 起带合成格子

  inventoryOpen = false
  private invEl = $('inventory')
  /** 背包里的 2×2 合成格子，和右键工作台打开的 3×3（v10.1） */
  private craft2 = new CraftingGrid(2)
  private craft3 = new CraftingGrid(3)
  private craft = this.craft2

  initInventory = () => {
    const grid = (n: number, from: number) => Array.from({ length: n }, (_, i) => `<div class="slot" data-i="${from + i}"><img alt=""><b></b></div>`).join('')
    $('invMain').innerHTML = grid(27, 9)
    $('invBar').innerHTML = grid(9, 0)
    this.invEl.addEventListener('mousedown', (e) => {
      const el = (e.target as HTMLElement).closest('.slot') as HTMLElement | null
      if (!el) return
      const c = this.control
      const inv = c.inventory
      const right = e.button === 2
      const drop = (stacks: ItemStack[]) => stacks.forEach((st) => c.throwStack(st))
      if (el.dataset.r !== undefined) {
        // 结果格：Shift 一直做到做不了，否则拿一份到手上
        if (e.shiftKey) drop(this.craft.quickCraft(inv)[1])
        else {
          const [cursor, dropped] = this.craft.clickResult(c.cursor, inv)
          c.cursor = cursor
          drop(dropped)
        }
      } else if (el.dataset.c !== undefined) {
        const i = Number(el.dataset.c)
        if (e.shiftKey) {
          // 合成格子里的 Shift + 点：挪回背包（原版先放背包三排，再放物品栏）
          const st = this.craft.slots[i]
          if (st) {
            this.craft.slots[i] = null
            const left = inv.addStack(st, 0, 36)
            if (left) this.craft.slots[i] = { ...st, count: left }
          }
        } else c.cursor = this.craft.click(i, c.cursor, right)
      } else {
        const i = Number(el.dataset.i)
        if (e.shiftKey) inv.quickMove(i)
        else c.cursor = inv.click(i, c.cursor, right)
      }
      this.renderInventory()
    })
    this.invEl.addEventListener('mousemove', (e) => {
      const c = $('invCursor')
      c.style.left = `${e.clientX - 24}px`
      c.style.top = `${e.clientY - 24}px`
    })
    document.addEventListener('keydown', (e) => {
      if (e.code === 'KeyE' && this.control.control.isLocked && !e.repeat) this.openInventory()
      else if ((e.code === 'KeyE' || e.code === 'Escape') && this.inventoryOpen) this.closeInventory(e.code === 'KeyE')
    })
    // v10.1：右键工作台
    this.control.onOpenScreen = () => this.openInventory(3)
  }

  /** 打开背包（2×2 合成）或工作台（3×3 合成） */
  openInventory(width: 2 | 3 = 2) {
    this.inventoryOpen = true
    this.craft = width === 3 ? this.craft3 : this.craft2
    $('invTitle').textContent = width === 3 ? '工作台' : '背包'
    const g = $('craftGrid')
    g.style.gridTemplateColumns = `repeat(${width}, 44px)`
    g.innerHTML = Array.from({ length: width * width }, (_, i) => `<div class="slot" data-c="${i}"><img alt=""><b></b></div>`).join('')
    this.invEl.classList.remove('hidden')
    this.renderInventory()
    this.control.control.unlock()
  }

  /** 关掉背包；手上拿着的、合成格子里的东西放回背包（放不下就扔掉） */
  closeInventory(relock: boolean) {
    this.inventoryOpen = false
    this.invEl.classList.add('hidden')
    const c = this.control
    if (c.cursor) {
      const left = c.inventory.addStack(c.cursor)
      if (left) c.throwStack({ ...c.cursor, count: left })
      c.cursor = null
    }
    for (const st of this.craft.clear(c.inventory)) c.throwStack(st)
    if (relock) c.control.lock()
    else this.menu.classList.remove('hidden')
  }

  private renderInventory() {
    const inv = this.control.inventory.slots
    this.fillSlots(document.querySelectorAll('#invMain .slot'), inv.slice(9))
    this.fillSlots(document.querySelectorAll('#invBar .slot'), inv.slice(0, 9))
    this.fillSlots(document.querySelectorAll('#craftGrid .slot'), this.craft.slots)
    this.fillSlots([$('craftResult')], [this.craft.result()])
    this.fillSlots([$('invCursor')], [this.control.cursor])
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

    // v10：物品栏（背包的前 9 格）有变化时重画
    const inv = this.control.inventory.slots
    const key = inv.map((st) => (st ? `${st.item}*${st.count}*${st.damage ?? 0}` : '')).join() + `|${this.control.cursor?.item}*${this.control.cursor?.count}|${this.control.slot}`
    if (key !== this.lastHotbar) {
      this.lastHotbar = key
      this.fillSlots(this.hotbar.querySelectorAll('.slot'), inv.slice(0, 9))
      this.hotbar.querySelectorAll('.slot').forEach((el, i) => el.classList.toggle('on', i === this.control.slot))
      const held = inv[this.control.slot]
      $('slotName').textContent = held ? itemName(held.item) : ''
      if (this.inventoryOpen) this.renderInventory()
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
