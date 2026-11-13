/**
 * 入口：和原项目一样，把各个模块 new 出来，然后跑动画循环。
 *
 *   Core     场景、相机、渲染器
 *   Player   玩家状态（位置、速度、姿势）和原版物理常数
 *   Terrain  区块的生成 / 加载 / 卸载 / 读写方块（生成在 Worker 里，用的是 v0 的原版密度函数）
 *   Control  键鼠输入 → 移动、碰撞、挖放方块
 *   UI       菜单、准星、物品栏、F3、噪声图
 *
 * 每一帧：Control 移动玩家 → Terrain 按玩家位置加载区块 → UI 刷新 → 渲染
 */
import * as THREE from 'three'
import Control from './control'
import Core from './core'
import Player from './player'
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
const ui = new UI(core, terrain, control)

// 种子和 noise_settings 从地址栏读：?seed=42&settings=minecraft:overworld
terrain.init(query('seed') ?? '42', query('settings') ?? '').then((info) => ui.onWorldReady(info))

// animation
const clock = new THREE.Clock()
;(function animate() {
  requestAnimationFrame(animate)
  const dt = clock.getDelta()

  control.update(dt)
  terrain.update()
  ui.update()

  renderer.render(scene, camera)
})()

// 方便在浏览器控制台里调试：game.terrain.getBlock(0, 64, 0)
Object.assign(window, { game: { core, player, terrain, control, ui } })
