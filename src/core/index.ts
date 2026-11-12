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

  /** 视距变了，雾也跟着变：在最后一圈区块处完全变成天空色 */
  setFogDistance = (blocks: number) => {
    const fog = this.scene.fog as THREE.Fog
    fog.near = blocks * 0.6
    fog.far = blocks
    this.camera.far = blocks + 64
    this.camera.updateProjectionMatrix()
  }
}
