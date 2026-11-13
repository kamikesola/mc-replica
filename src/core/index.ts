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

  /** 天空颜色，雾也用它，远处的区块会自然“融”进天空 */
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
    this.scene.background = new THREE.Color(Core.SKY)
    // 雾的距离在 Terrain 里按视距调整
    this.scene.fog = new THREE.Fog(Core.SKY, 40, 80)
  }

  initRenderer = () => {
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    })
  }

  private viewBlocks = 96
  private medium: 'air' | 'water' | 'lava' = 'air'

  /** 视距变了，雾也跟着变：在最后一圈区块处完全变成天空色 */
  setFogDistance = (blocks: number) => {
    this.viewBlocks = blocks
    this.camera.far = blocks + 64
    this.camera.updateProjectionMatrix()
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

  private applyFog() {
    const fog = this.scene.fog as THREE.Fog
    const bg = this.scene.background as THREE.Color
    if (this.medium === 'water') {
      fog.color.setHex(0x1f3f8f)
      fog.near = 2
      fog.far = Math.min(48, this.viewBlocks)
    } else if (this.medium === 'lava') {
      fog.color.setHex(0x991a00)
      fog.near = 0.25
      fog.far = 1.5
    } else {
      fog.color.setHex(Core.SKY)
      fog.near = this.viewBlocks * 0.6
      fog.far = this.viewBlocks
    }
    bg.copy(fog.color)
  }
}
