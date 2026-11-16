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
import { query } from './utils'

import './style.css'

const core = new Core()
const camera = core.camera
const scene = core.scene
const renderer = core.renderer

const player = new Player()
const terrain = new Terrain(scene, camera)
const control = new Control(scene, camera, player, terrain)
const sky = new Sky()
const ui = new UI(core, terrain, control, sky)

// 种子和 noise_settings 从地址栏读：?seed=42&settings=minecraft:overworld
terrain.init(query('seed') ?? '42', query('settings') ?? '').then((info) => {
  sky.setDimension(info.settings)
  ui.onWorldReady(info)
})

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
Object.assign(window, { game: { core, player, terrain, control, ui, sky } })
