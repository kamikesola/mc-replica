/**
 * 入口：和原项目一样，把各个模块 new 出来，然后跑动画循环。
 *
 *   Core     场景、相机、渲染器
 *   Player   玩家状态（位置、速度、姿势）和原版物理常数
 *   Terrain  区块的生成 / 加载 / 卸载 / 读写方块（生成在 Worker 里，用的是 v0 的原版密度函数）
 *   Control  键鼠输入 → 移动、碰撞、挖放方块
 *   UI       菜单、准星、物品栏、F3、噪声图
 *   Sky      天空、太阳月亮星星、光照贴图、雾的颜色（v6）
 *
 * 每一帧：Control 移动玩家 → Terrain 按玩家位置加载区块 → UI 刷新 → 按时间更新天空和光照贴图 → 先画天空、再画地形
 */
import * as THREE from 'three'
import Control from './control'
import Core from './core'
import Player from './player'
import Sky from './sky'
import Terrain from './terrain'
import UI from './ui'
import { IdbStore } from './save/store'
import { WorldSave } from './save/WorldSave'
import { fullStateName, parseState } from './terrain/blocks'

import './style.css'

const core = new Core()
const camera = core.camera
const scene = core.scene
const renderer = core.renderer

const player = new Player()
const terrain = new Terrain(scene, camera)
const control = new Control(scene, camera, player, terrain)
const sky = new Sky()
// v8：存档放在浏览器的 IndexedDB 里
const store = new IdbStore()
const ui = new UI(core, terrain, control, sky, store)

// v8：存档。地址栏 ?world=<id> 打开一个存档；没有的话按 ?seed=&settings= 打开（或新建）这个种子的默认世界

async function start() {
  const q = new URLSearchParams(location.search)
  let opened: Awaited<ReturnType<typeof WorldSave.open>> = null
  try {
    let id = q.get('world')
    if (!id) {
      const seed = q.get('seed') ?? '42'
      const settings = q.get('settings') ?? ''
      id = `default:${seed}:${settings}`
      await WorldSave.ensure(store, { id, name: `种子 ${seed}${settings ? ' · ' + settings.replace('minecraft:', '') : ''}`, seed, settings })
    }
    opened = await WorldSave.open(store, id)
    if (!opened) ui.saves.warn(`没有找到存档 ${id}，这次不会保存`)
  } catch (e) {
    // 隐私模式等情况下 IndexedDB 不能用：照常玩，只是不保存
    console.error(e)
    ui.saves.warn('浏览器不让用 IndexedDB，这次不会保存')
  }
  const meta = opened?.world.meta
  if (opened) {
    terrain.world = opened.world
    control.resume = meta!.player
    if (meta!.vanilla && !meta!.player) control.spawnCenter = { x: meta!.vanilla.spawn.x, z: meta!.vanilla.spawn.z }
    terrain.dayTime = meta!.dayTime
    terrain.daylightCycle = meta!.daylightCycle
  }
  const info = await terrain.init(meta?.seed ?? q.get('seed') ?? '42', meta?.settings ?? q.get('settings') ?? '', opened?.edits)
  sky.setDimension(info.settings)
  ui.onWorldReady(info)
}
start()

/** 自动保存（v8）：每 10 秒一次，切到别的标签页、关掉页面时也存一次 */
function save() {
  const w = terrain.world
  if (!w || !control.spawned) return
  w.save(terrain.edits, { player: control.saveState, dayTime: terrain.dayTime, daylightCycle: terrain.daylightCycle })
    .then(() => ui.saves.saved())
    .catch((e) => console.error('保存失败', e))
}
setInterval(save, 10000)
document.addEventListener('visibilitychange', () => document.visibilityState === 'hidden' && save())
window.addEventListener('pagehide', save)

/** 每半秒问一次 Worker：玩家周围群系的天空色、雾色（群系不会变得很快） */
let skyQuery = 0
function refreshBiomeColors(now: number) {
  if (!terrain.info || now - skyQuery < 500) return
  skyQuery = now
  const p = camera.position
  terrain.pool.call('skyColors', { x: Math.floor(p.x), y: Math.floor(p.y), z: Math.floor(p.z) }).then((r) => {
    sky.biomeSky = r.sky
    sky.biomeFog = r.fog
  })
}

// animation
const clock = new THREE.Clock()
;(function animate() {
  requestAnimationFrame(animate)
  const dt = clock.getDelta()

  control.update(dt)
  terrain.update()
  ui.update()

  // 天空、光照贴图、雾（v6）
  refreshBiomeColors(performance.now())
  const f = sky.update(terrain.renderTime(control.partialTick), camera, terrain.distance, terrain.info?.minY ?? -64)
  core.setAirFog(f.color, f.start, f.end)
  terrain.materials.setLightmap(f.lightmap, sky.dim === 'nether')

  sky.render(renderer, camera, core.fogColor, core.medium === 'air')
  renderer.clearDepth()
  renderer.render(scene, camera)
})()

// 方便在浏览器控制台里调试：game.terrain.getBlock(0, 64, 0)
Object.assign(window, { game: { core, player, terrain, control, ui, sky, store, save, parseState, fullStateName } })
