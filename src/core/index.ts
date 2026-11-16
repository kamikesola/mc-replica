import * as THREE from 'three'

// 方块颜色是直接写进顶点色的，不需要 three 做色彩空间转换。
// 必须在创建任何 THREE.Color 之前关掉，否则天空色会被当成 sRGB 转换一次，变得过饱和
THREE.ColorManagement.enabled = false

/**
 * Core：three.js 的三件套——场景、相机、渲染器。
 * 和原项目一样，只负责“把东西画出来”，不关心游戏逻辑。
 */
export default class Core {
  camera = new THREE.PerspectiveCamera()
  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer({ antialias: false })

  /** 天空颜色，雾也用它，远处的区块会自然“融”进天空（v6 起由 sky/ 每帧按时间算，这是初始值） */
  static SKY = 0x9cc4ff

  constructor() {
    this.initScene()
    this.initRenderer()
    this.initCamera()
  }

  initCamera = () => {
    this.camera.fov = 70 // 原版默认 FOV
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.near = 0.05
    this.camera.far = 1000
    this.camera.updateProjectionMatrix()
    this.camera.position.set(0, 120, 0)

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
    })
  }

  initScene = () => {
    // 雾的距离在 Terrain 里按视距调整。v6：不用 scene.background 了，清屏色由 sky/ 设置（先画天空再画地形）
    this.scene.fog = new THREE.Fog(Core.SKY, 40, 80)
  }

  initRenderer = () => {
    this.renderer.autoClear = false
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    })
  }

  private viewBlocks = 96
  /** 人在空气里时的雾（v6：颜色和范围每帧由 sky/ 按时间、群系、视距算出来） */
  private air = { color: new THREE.Color(Core.SKY), near: 57.6, far: 96 }
  medium: 'air' | 'water' | 'lava' = 'air'

  /** 视距变了：相机远平面跟着变（雾的范围由 sky/ 给） */
  setFogDistance = (blocks: number) => {
    this.viewBlocks = blocks
    this.camera.far = blocks + 64
    this.camera.updateProjectionMatrix()
    this.applyFog()
  }

  /** 空气里的雾（v6，每帧）：原版 FogRenderer 的颜色和地形雾范围 */
  setAirFog = (rgb: [number, number, number], near: number, far: number) => {
    this.air.color.setRGB(...rgb)
    this.air.near = near
    this.air.far = far
    this.applyFog()
  }

  /**
   * 眼睛在空气 / 水 / 岩浆里，雾不一样（原版 FogRenderer）：
   * 水下是深蓝色、能看几十格；岩浆里是橙红色、几乎什么都看不见
   */
  setMedium = (medium: 'air' | 'water' | 'lava') => {
    if (medium === this.medium) return
    this.medium = medium
    this.applyFog()
  }

  /** 当前的雾色，也是清屏色 */
  get fogColor(): THREE.Color {
    return (this.scene.fog as THREE.Fog).color
  }

  private applyFog() {
    const fog = this.scene.fog as THREE.Fog
    if (this.medium === 'water') {
      fog.color.setHex(0x1f3f8f)
      fog.near = 2
      fog.far = Math.min(48, this.viewBlocks)
    } else if (this.medium === 'lava') {
      fog.color.setHex(0x991a00)
      fog.near = 0.25
      fog.far = 1.5
    } else {
      fog.color.copy(this.air.color)
      fog.near = this.air.near
      fog.far = this.air.far
    }
  }
}
