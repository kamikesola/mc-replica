import type Terrain from '../terrain'
import type { SaveStore } from '../save/store'
import { WorldSave } from '../save/WorldSave'
import { $ } from '../utils'

/**
 * 菜单里的“存档”（v8）：存档列表、新建、删除、导入原版存档。
 *
 * 换世界都是改地址栏（?world=<id>）再刷新页面，和 v0 换种子一样：最简单，也不会有上一个世界的东西残留。
 */
export default class SavesPanel {
  private status = $('saveStatus')
  private list = $('worldList')

  constructor(
    private readonly store: SaveStore,
    private readonly terrain: Terrain
  ) {
    $('newWorld').addEventListener('click', () => this.create())
    $<HTMLInputElement>('importWorld').addEventListener('change', (e) => this.importFolder((e.target as HTMLInputElement).files))
    this.list.addEventListener('click', (e) => {
      const b = (e.target as HTMLElement).closest('button')
      if (!b) return
      if (b.dataset.open) this.go(b.dataset.open)
      else if (b.dataset.del) this.remove(b.dataset.del)
    })
    this.refresh()
  }

  /** 不能保存时（IndexedDB 不可用、存档不存在）在菜单里提示 */
  warn(text: string) {
    this.status.textContent = text
    this.status.classList.add('warn')
  }

  saved() {
    const w = this.terrain.world
    if (!w) return
    this.status.textContent = `当前存档：${w.meta.name} · 已自动保存 ${new Date().toLocaleTimeString()}`
  }

  async refresh() {
    let worlds
    try {
      worlds = await this.store.listWorlds()
    } catch {
      return
    }
    const current = this.terrain.world?.meta.id
    worlds.sort((a, b) => b.lastPlayed - a.lastPlayed)
    const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`)
    this.list.innerHTML = worlds
      .map(
        (w) => `<div class="world${w.id === current ? ' current' : ''}">
          <div><b>${esc(w.name)}</b>${w.source === 'vanilla' ? ' <span class="tag">原版存档</span>' : ''}<br>
          <small>种子 ${esc(w.seed)} · ${esc(w.settings.replace('minecraft:', '') || 'overworld')} · ${new Date(w.lastPlayed).toLocaleString()}</small></div>
          ${w.id === current ? '<small>正在玩</small>' : `<button data-open="${esc(w.id)}">进入</button><button data-del="${esc(w.id)}">删除</button>`}
        </div>`
      )
      .join('')
  }

  private go(id: string) {
    location.search = new URLSearchParams({ world: id, distance: String(this.terrain.distance) }).toString()
  }

  private async create() {
    const name = $<HTMLInputElement>('newWorldName').value.trim() || '新的世界'
    const seed = $<HTMLInputElement>('seedInput').value.trim() || String(Math.floor(Math.random() * 2 ** 31))
    const settings = $<HTMLSelectElement>('settingsSelect').value
    const id = `w-${Date.now().toString(36)}`
    await WorldSave.ensure(this.store, { id, name, seed, settings })
    this.go(id)
  }

  private async remove(id: string) {
    const w = await this.store.getWorld(id)
    if (!w || !confirm(`删除存档“${w.name}”？删除后不能恢复。`)) return
    await this.store.deleteWorld(id)
    this.refresh()
  }

  /** 选择了一个原版存档的文件夹：只读 level.dat 和区域文件 */
  private async importFolder(files: FileList | null) {
    if (!files?.length) return
    const wanted = [...files]
      .map((f) => ({ f, path: f.webkitRelativePath.split('/').slice(1).join('/') }))
      .filter(({ path }) => path === 'level.dat' || /^(region|DIM-1\/region|DIM1\/region)\/r\.-?\d+\.-?\d+\.mca$/.test(path))
    this.status.classList.remove('warn')
    try {
      const out: { path: string; data: ArrayBuffer }[] = []
      for (const [i, { f, path }] of wanted.entries()) {
        this.status.textContent = `正在读取 ${path}（${i + 1} / ${wanted.length}）`
        out.push({ path, data: await f.arrayBuffer() })
      }
      this.status.textContent = '正在存进浏览器…'
      const meta = await WorldSave.importVanilla(this.store, out)
      this.go(meta.id)
    } catch (e) {
      this.warn(`导入失败：${(e as Error).message}`)
    }
  }
}
