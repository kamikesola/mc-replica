import * as THREE from 'three'
import { LegacyRandomSource } from '../terrain/worldgen/random/LegacyRandomSource'
import {
  dimensionOf,
  fogColor,
  lightmap,
  moonPhase,
  nextFlicker,
  rgb,
  skyColor,
  starBrightness,
  starQuads,
  sunAngle,
  sunriseColor,
  terrainFog,
  timeOfDay,
  type Dimension,
  type Rgb
} from './formulas'

/**
 * 天空（v6）：天空的颜色、日出日落、太阳、月亮、星星，以及每帧更新光照贴图和雾。
 * 对应原版 LevelRenderer.renderSky / SkyRenderer（1.21.4）。
 *
 * 天空画在一个单独的场景里，用一个只有朝向、没有位置的相机先画，然后清掉深度再画地形——
 * 原版也是这样：天空永远在最后面，太阳、星星不会被雾吃掉，也不受相机远平面的限制。
 *
 *   天空盘   原版是相机上方 16 格、半径 512 的一个圆盘，颜色是天空色，用“天空雾”（0 到视距）往雾色过渡。
 *            所以抬头看是天空色，越往地平线越接近雾色。这里用一个球面在着色器里算出同样的结果：
 *            视线和 y = 16 的平面交点的水平距离 r = 16 / tan(仰角)，雾 = (16 + r × 31/32) / 视距（圆盘上的线性插值）
 *   日出日落 太阳那一侧的地平线上一个扇形，中间是日出日落色，边上透明
 *   太阳月亮 在“天球”上：先绕 y 转 −90°，再绕 x 转 timeOfDay × 360°。太阳在 +y 100 格处、边长 60；月亮在 −y、边长 40。
 *            叠加混合（只会变亮），所以贴图黑色的部分就是透明
 *   星星     原版用固定种子 10842 随机撒 1500 个小方块，夜里才看得见
 *
 * 太阳、月亮的贴图和方块一样是代码画的（原版贴图有版权）。
 */
export default class Sky {
  readonly scene = new THREE.Scene()
  readonly camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000)
  /** 当前的雾色 = 清屏色（地形的雾也用它） */
  fog: Rgb = [0.75, 0.85, 1]
  /** 玩家周围群系的天空色、雾色（Worker 算，原版 CubicSampler 平均） */
  biomeSky: Rgb = rgb(0x78a7ff)
  biomeFog: Rgb = rgb(0xc0d8ff)
  /** 亮度设置（原版 gamma：0 昏暗 / 0.5 默认 / 1 明亮） */
  gamma = 0.5
  dim: Dimension = 'overworld'

  private flicker = 0
  private dome: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>
  private sunrise: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
  private celestial = new THREE.Group()
  private sun: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>
  private moon: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>
  private stars: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
  private lm = new Uint8Array(16 * 16 * 3)

  constructor() {
    // ---- 天空盘（球面 + 着色器）
    this.dome = new THREE.Mesh(
      new THREE.SphereGeometry(500, 32, 16),
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        depthTest: false,
        uniforms: {
          skyColor: { value: new THREE.Color() },
          fogColor: { value: new THREE.Color() },
          renderDistance: { value: 96 },
          /** 相机在地平线（海平面）以下时，下半边画成黑色（原版的 darkBuffer） */
          belowHorizon: { value: false },
          end: { value: false }
        },
        vertexShader: /* glsl */ `
          varying vec3 vDir;
          void main() {
            vDir = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 skyColor;
          uniform vec3 fogColor;
          uniform float renderDistance;
          uniform bool belowHorizon;
          uniform bool end;
          varying vec3 vDir;
          void main() {
            vec3 d = normalize(vDir);
            vec3 c = fogColor;
            if (end) {
              c = vec3(40.0 / 255.0); // 原版末地天空：0x282828 的底色（贴图换成纯色）
            } else if (d.y > 0.0) {
              // 和 y = 16 的天空盘的交点：水平距离 r；盘外（r > 512）是清屏色
              float r = 16.0 * length(d.xz) / d.y;
              if (r < 512.0) {
                float dist = 16.0 + r * (496.0 / 512.0);
                c = mix(skyColor, fogColor, clamp(dist / renderDistance, 0.0, 1.0));
              }
            } else if (belowHorizon && d.y < 0.0) {
              float r = 16.0 * length(d.xz) / -d.y;
              if (r < 512.0) c = mix(vec3(0.0), fogColor, clamp((16.0 + r * (496.0 / 512.0)) / renderDistance, 0.0, 1.0));
            }
            gl_FragColor = vec4(c, 1.0);
          }`
      })
    )
    this.dome.renderOrder = 0
    this.scene.add(this.dome)

    // ---- 日出日落的扇形：中心 (0, 100, 0)，边上 16 段半径 120，再转到太阳那一侧
    const fan = new THREE.BufferGeometry()
    fan.setAttribute('position', new THREE.BufferAttribute(new Float32Array(18 * 3), 3))
    fan.setAttribute('color', new THREE.BufferAttribute(new Float32Array(18 * 4), 4))
    const idx: number[] = []
    for (let j = 0; j < 16; j++) idx.push(0, j + 1, j + 2)
    fan.setIndex(idx)
    this.sunrise = new THREE.Mesh(fan, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, depthTest: false, side: THREE.DoubleSide }))
    this.sunrise.renderOrder = 1
    this.scene.add(this.sunrise)

    // ---- 太阳、月亮、星星：放在一个随时间转动的组里
    const additive = (map: THREE.Texture | null) =>
      new THREE.MeshBasicMaterial({
        map,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide,
        blending: THREE.CustomBlending,
        blendSrc: THREE.SrcAlphaFactor,
        blendDst: THREE.OneFactor
      })
    this.sun = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), additive(paintSun()))
    this.sun.position.set(0, 100, 0)
    this.sun.rotation.x = Math.PI / 2 // 平面朝下（朝着球心）
    this.moon = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), additive(paintMoon()))
    this.moon.position.set(0, -100, 0)
    this.moon.rotation.x = -Math.PI / 2
    const starGeo = new THREE.BufferGeometry()
    const quads = starQuads(new LegacyRandomSource(10842n))
    starGeo.setAttribute('position', new THREE.BufferAttribute(quads, 3))
    const si: number[] = []
    for (let q = 0; q < quads.length / 12; q++) si.push(q * 4, q * 4 + 1, q * 4 + 2, q * 4 + 2, q * 4 + 3, q * 4)
    starGeo.setIndex(si)
    this.stars = new THREE.Mesh(starGeo, additive(null))
    for (const m of [this.sun, this.moon, this.stars]) {
      m.renderOrder = 2
      this.celestial.add(m)
    }
    this.scene.add(this.celestial)
  }

  /**
   * 每帧：按时间更新天空、光照贴图、雾。返回地形要用的雾参数。
   * @param dayTime   游戏时间（刻，带小数：两刻之间插值）
   * @param camera    主相机（取朝向）
   * @param chunks    视距（区块）
   */
  update(dayTime: number, camera: THREE.PerspectiveCamera, chunks: number, minY: number): { color: Rgb; start: number; end: number; lightmap: Uint8Array } {
    const t = timeOfDay(dayTime)
    const R = chunks * 16
    // 光照贴图
    this.flicker = nextFlicker(this.flicker)
    lightmap({ dim: this.dim, t, flicker: this.flicker, gamma: this.gamma }, this.lm)
    // 天空色、雾色
    const look = new THREE.Vector3()
    camera.getWorldDirection(look)
    const sky = this.dim === 'overworld' ? skyColor(this.biomeSky, t) : ([0, 0, 0] as Rgb)
    this.fog = fogColor(this.dim, this.biomeFog, sky, t, [look.x, look.y, look.z], chunks, camera.position.y, minY)

    const u = this.dome.material.uniforms
    u.skyColor.value.setRGB(...sky)
    u.fogColor.value.setRGB(...this.fog)
    u.renderDistance.value = R
    u.belowHorizon.value = camera.position.y < 63
    u.end.value = this.dim === 'end'
    // 下界没有天空（原版 SkyType.NONE），末地只有底色
    const overworld = this.dim === 'overworld'
    this.dome.visible = this.dim !== 'nether'

    // 日出日落
    const sr = overworld ? sunriseColor(t) : null
    this.sunrise.visible = sr !== null
    if (sr) {
      const pos = this.sunrise.geometry.attributes.position as THREE.BufferAttribute
      const col = this.sunrise.geometry.attributes.color as THREE.BufferAttribute
      pos.setXYZ(0, 0, 100, 0)
      col.setXYZW(0, sr[0], sr[1], sr[2], sr[3])
      for (let j = 0; j <= 16; j++) {
        const a = (j * Math.PI * 2) / 16
        pos.setXYZ(j + 1, Math.sin(a) * 120, Math.cos(a) * 120, -Math.cos(a) * 40 * sr[3])
        col.setXYZW(j + 1, sr[0], sr[1], sr[2], 0)
      }
      pos.needsUpdate = true
      col.needsUpdate = true
      // 原版：绕 x 转 90°，太阳在西边（下午）时绕 z 转 180°，再绕 z 转 90°
      const flip = Math.sin(sunAngle(t)) < 0 ? Math.PI : 0
      this.sunrise.quaternion
        .setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
        .multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), flip))
        .multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2))
    }

    // 太阳、月亮、星星
    this.celestial.visible = overworld
    this.celestial.rotation.set(t * Math.PI * 2, -Math.PI / 2, 0, 'YXZ')
    const phase = moonPhase(Math.floor(dayTime))
    const uv = this.moon.geometry.attributes.uv as THREE.BufferAttribute
    const u0 = (phase % 4) / 4
    const v0 = phase < 4 ? 0.5 : 0 // 贴图上面一行是 0..3（three 的 v 朝上）
    uv.setXY(0, u0, v0 + 0.5)
    uv.setXY(1, u0 + 0.25, v0 + 0.5)
    uv.setXY(2, u0, v0)
    uv.setXY(3, u0 + 0.25, v0)
    uv.needsUpdate = true
    const stars = starBrightness(t)
    this.stars.visible = stars > 0
    this.stars.material.color.setRGB(stars, stars, stars)
    this.stars.material.opacity = stars

    const f = terrainFog(this.dim, R)
    return { color: this.fog, start: f.start, end: f.end, lightmap: this.lm }
  }

  /** 先画天空（用 clear 色清屏 + 天空），之后由调用者清深度再画地形。人在水里、岩浆里时不画天空，只清屏 */
  render(renderer: THREE.WebGLRenderer, main: THREE.PerspectiveCamera, clear: THREE.Color, drawSky: boolean): void {
    renderer.setClearColor(clear, 1)
    renderer.clear()
    if (!drawSky) return
    this.camera.fov = main.fov
    this.camera.aspect = main.aspect
    this.camera.updateProjectionMatrix()
    main.getWorldQuaternion(this.camera.quaternion) // 主相机挂在玩家的头下面，要取世界朝向
    renderer.render(this.scene, this.camera)
  }

  setDimension(settingsId: string): void {
    this.dim = dimensionOf(settingsId)
  }
}

/** 太阳：中间一块亮黄白色的方块（贴图的一半宽），四周一圈淡淡的光晕（32×32） */
function paintSun(): THREE.Texture {
  const N = 32
  const data = new Uint8Array(N * N * 4)
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const d = Math.max(Math.abs(x - 15.5), Math.abs(y - 15.5))
      const i = (y * N + x) * 4
      let v = 0
      if (d < 4) v = 1
      else if (d < 8) v = 0.3 * (1 - (d - 4) / 4)
      data[i] = 255 * v
      data[i + 1] = 255 * v
      data[i + 2] = 200 * v
      data[i + 3] = 255
    }
  return dataTexture(data, N, N)
}

/** 月亮的 8 个月相（4×2 张 32×32）：灰白的方块加几个坑，按月相盖住一部分 */
function paintMoon(): THREE.Texture {
  const W = 128
  const H = 64
  const data = new Uint8Array(W * H * 4)
  const craters = [
    [12, 12, 2],
    [19, 17, 3],
    [13, 20, 1.5],
    [20, 11, 1.5]
  ]
  for (let p = 0; p < 8; p++) {
    const ox = (p % 4) * 32
    const oy = p < 4 ? 0 : 32 // 第一行是 0..3（图片从上往下）
    // 0 满月，4 新月；被照亮的部分从一边移到另一边
    const lit = p <= 4 ? 1 - p / 4 : (p - 4) / 4
    for (let y = 8; y < 24; y++)
      for (let x = 8; x < 24; x++) {
        const fx = (x - 8 + 0.5) / 16
        const shown = p <= 4 ? fx >= 1 - lit : fx <= lit
        if (!shown) continue
        let v = 0.85
        for (const [cx, cy, r] of craters) if (Math.hypot(x - cx, y - cy) < r) v = 0.6
        const i = ((oy + y) * W + ox + x) * 4
        data[i] = data[i + 1] = 255 * v
        data[i + 2] = 255 * (v + 0.05 > 1 ? 1 : v + 0.05)
        data[i + 3] = 255
      }
  }
  return dataTexture(data, W, H)
}

function dataTexture(data: Uint8Array, w: number, h: number): THREE.Texture {
  // DataTexture 的第一行在 v = 0（下面），画的时候是从上往下画的，所以翻一下
  const flipped = new Uint8Array(data.length)
  for (let y = 0; y < h; y++) flipped.set(data.subarray(y * w * 4, (y + 1) * w * 4), (h - 1 - y) * w * 4)
  const t = new THREE.DataTexture(flipped, w, h, THREE.RGBAFormat)
  t.magFilter = t.minFilter = THREE.NearestFilter
  t.needsUpdate = true
  return t
}
