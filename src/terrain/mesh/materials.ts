import * as THREE from 'three'
import { createBlockTextures } from '../textures'
import { POSITION_SCALE, UV_SCALE } from './mesher'
import { TINT_COLORS } from '../models'

/**
 * 方块材质（对应原项目的 terrain/mesh/materials.ts）。
 *
 * 原项目给每种方块一个 MeshStandardMaterial + 一张贴图。v1 所有方块共用一个材质：
 * 纹理放在一个纹理数组里，每个顶点自己说用第几层（见 textures/index.ts）。
 * 好处是一个 section 只要一次绘制调用（draw call），不管里面有几种方块。
 *
 * three 自带的材质不支持纹理数组，所以写了一个很短的 ShaderMaterial：
 *
 *   顶点着色器  1. 位置 ÷ 16 还原成方块坐标
 *               2. 按面的方向，从位置里取出纹理坐标（顶面用 x、z，侧面用水平方向和 y）
 *                  —— 一个 5×3 的大矩形，纹理坐标就是 0..5 × 0..3，纹理自动重复 5×3 次
 *               3. 明暗 = 方向亮度（顶 1.0 / 南北 0.8 / 东西 0.6 / 底 0.5）× AO
 *   片元着色器  取纹理 × 明暗，再加上雾
 *
 * v4 加了生物群系染色：草、树叶、水的纹理是灰色的（alpha 为 0 的像素表示“要染色”），
 * 颜色从三张 512×512 的“颜色图”里按世界坐标 (x, z) 取 —— 每一列一个颜色，区块加载时由 Worker 算好写进去。
 * 按坐标取而不是存在顶点里，是因为贪婪网格合并出的大矩形横跨好几个群系，顶点只有 4 个，存不下每一列的颜色。
 *
 * v6 光照：顶点带着天空光、方块光（4 格之和，见 mesher.ts），在顶点着色器里查 16×16 的“光照贴图”得到颜色
 * （原版 minecraft_sample_lightmap：贴图线性过滤，坐标 = 亮度 / 16，夹在 0.5/16 ~ 15.5/16 之间——
 * 所以亮度 n 实际取的是第 n−1 和第 n 格的平均，原版就是这样）。
 * 顶点颜色 = 贴图颜色 × 方向明暗 × AO（原版的 AO 是 0.4 / 0.6 / 0.8 / 1.0）。贴图每帧按时间重算（sky/formulas.ts），
 * 天黑不用重建网格。
 * 雾也改成原版的“圆柱形”：按水平距离和竖直距离里大的那个算，而不是按到相机平面的深度。
 *
 * v7.1 原版模型：纹理坐标不再按位置算，网格生成时按模型算好存进顶点（uv）；纹理数组后面接上资源包的纹理。
 * 染色字段多了几个标记（见 models/index.ts）：资源包的纹理整张染色（不再用 alpha 标记），镂空的像素丢掉，
 * 半透明的（水、冰）用纹理自己的 alpha；云杉、白桦树叶、睡莲是固定颜色（tintColors）。
 */

/** 颜色图边长：世界坐标对它取模（视距 10 时可见范围约 21 个区块 = 336 格，放得下） */
export const TINT_MAP_SIZE = 512

const vertexShader = /* glsl */ `
attribute vec4 info; // [面的方向, 纹理层, AO（0..255，+256 不按方向变暗）, 染色字段]
attribute vec2 light; // [天空光之和, 方块光之和]，0..60

uniform sampler2D lightMap;
/** 原版 constantAmbientLight（下界）：上下两面都是 0.9 */
uniform bool constantAmbient;

varying vec2 vUv;
varying float vLayer;
varying vec3 vLight;
varying vec2 vColumn; // 世界坐标 (x, z)，取生物群系颜色用
varying float vTint;
varying float vFogDist;

const vec3 FACE_NORMAL[8] = vec3[8](vec3(-1, 0, 0), vec3(1, 0, 0), vec3(0, -1, 0), vec3(0, 1, 0), vec3(0, 0, -1), vec3(0, 0, 1), vec3(0), vec3(0));

// 原版 ClientLevel.getShade：西东 0.6、下 0.5、上 1.0、北南 0.8
const float FACE_SHADE[8] = float[8](0.6, 0.6, 0.5, 1.0, 0.8, 0.8, 1.0, 1.0);

void main() {
  vec3 p = position / ${POSITION_SCALE.toFixed(1)};
  int face = int(info.x + 0.5);

  // 纹理坐标（v7.1 起顶点里直接存，网格生成时按原版模型算好；大于 1 的部分靠 RepeatWrapping 重复）
  vUv = uv / ${UV_SCALE.toFixed(1)};

  vLayer = info.y;
  int ao = int(info.z + 0.5);
  float shade = (ao & 256) != 0 ? (constantAmbient ? 0.9 : 1.0) : constantAmbient && (face == 2 || face == 3) ? 0.9 : FACE_SHADE[face];
  // 原版 UV2 = 亮度 × 16，再除以 256：4 格之和 × 4 / 256
  vec2 luv = clamp(vec2(light.y, light.x) / 64.0, vec2(0.5 / 16.0), vec2(15.5 / 16.0));
  vLight = texture(lightMap, luv).rgb * shade * (float(ao & 255) / 255.0);
  vTint = info.w;
  // 往面的反方向挪一点点：侧面正好在两列的分界线上，要取“这个方块所在的那一列”的颜色
  vColumn = (modelMatrix * vec4(p - FACE_NORMAL[face] * 0.01, 1.0)).xz;

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mvPosition;
#ifdef WIRE
  gl_Position.z -= 0.0004 * gl_Position.w; // 线框往相机方向挪一点点，避免和表面抢深度而闪烁
#endif
  // 原版 FogShape.CYLINDER：max(水平距离, 竖直距离)
  vec3 d = (modelMatrix * vec4(p, 1.0)).xyz - cameraPosition;
  vFogDist = max(length(d.xz), abs(d.y));
}
`

const fragmentShader = /* glsl */ `
precision highp sampler2DArray;
uniform sampler2DArray map;
uniform sampler2D grassMap;
uniform sampler2D foliageMap;
uniform sampler2D waterMap;
uniform vec3 tintColors[${TINT_COLORS.length}];
uniform float opacity;

uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;

varying vec2 vUv;
varying float vLayer;
varying vec3 vLight;
varying vec2 vColumn;
varying float vTint;
varying float vFogDist;

void main() {
#ifdef WIRE
  gl_FragColor = vec4(0.0, 0.0, 0.0, opacity);
#else
  vec4 c = texture(map, vec3(vUv, floor(vLayer + 0.5)));
  // 染色字段（见 models/index.ts）：低 5 位颜色，+32 镂空，+64 只染 alpha 标记的部分，+128 用纹理的 alpha
  int t = int(vTint + 0.5);
  int kind = t & 31;
  if ((t & 32) != 0 && c.a < 0.5) discard;
  if (kind > 0) {
    vec3 tint;
    if (kind <= 3) {
      ivec2 col = ivec2(mod(floor(vColumn), ${TINT_MAP_SIZE}.0));
      tint = kind == 1 ? texelFetch(grassMap, col, 0).rgb : kind == 2 ? texelFetch(foliageMap, col, 0).rgb : texelFetch(waterMap, col, 0).rgb;
    } else tint = tintColors[kind - 4];
    c.rgb = (t & 64) != 0 ? mix(c.rgb, c.rgb * tint, 1.0 - c.a) : c.rgb * tint; // alpha 越小染得越多（mipmap 时会是中间值）
  }
  gl_FragColor = vec4(c.rgb * vLight, (t & 128) != 0 ? c.a : opacity);
#endif
  // 原版 linear_fog：fogNear 之前没有雾，fogFar 之后全是雾色
  float fog = clamp((vFogDist - fogNear) / (fogFar - fogNear), 0.0, 1.0);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fog);
}
`

function blockMaterial(opacity: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        map: { value: null },
        grassMap: { value: null },
        foliageMap: { value: null },
        waterMap: { value: null },
        lightMap: { value: null },
        constantAmbient: { value: false },
        // 直接用 0..1 的原始值（THREE.Color 会把十六进制颜色从 sRGB 换算成线性，这里不要）
        tintColors: { value: TINT_COLORS.map((c) => new THREE.Vector3(((c >> 16) & 255) / 255, ((c >> 8) & 255) / 255, (c & 255) / 255)) },
        opacity: { value: opacity }
      }
    ]),
    fog: true // 让 three 每帧把场景的雾参数填进 uniforms
  })
}

export default class Materials {
  textures = createBlockTextures()
  opaque: THREE.ShaderMaterial
  water: THREE.ShaderMaterial
  /**
   * 线框（K 键）：在贴图上面再叠一层黑色的三角形边线，用来看贪婪网格合并出的矩形。
   * 只画线框的话，地下的洞穴也会透出来，看不清地表。
   */
  wire: THREE.ShaderMaterial
  wireframe = false
  /** 生物群系颜色图：草、树叶、水（v4） */
  tintMaps = [0x91bd59, 0x77ab2f, 0x3f76e4].map((c) => createTintMap(c))
  private tintsDirty = false
  /** 光照贴图 16×16（v6）：横轴方块光、纵轴天空光，线性过滤（和原版一样，亮度落在两格之间时取平均） */
  lightMap = createLightMap()

  constructor() {
    this.opaque = blockMaterial(1)
    this.water = blockMaterial(0.7)
    this.water.transparent = true
    this.water.depthWrite = false // 水面后面的东西仍然要能看到
    this.water.side = THREE.DoubleSide // 潜到水下往上看也能看到水面
    // UniformsUtils.merge 会复制一份 value，纹理要在复制之后再放进去
    for (const m of [this.opaque, this.water]) {
      m.uniforms.map.value = this.textures
      m.uniforms.grassMap.value = this.tintMaps[0]
      m.uniforms.foliageMap.value = this.tintMaps[1]
      m.uniforms.waterMap.value = this.tintMaps[2]
      m.uniforms.lightMap.value = this.lightMap
    }

    this.wire = blockMaterial(0.6)
    this.wire.uniforms.lightMap.value = this.lightMap
    this.wire.defines = { WIRE: '' }
    this.wire.wireframe = true
    this.wire.transparent = true
  }

  /** 换成“程序纹理 + 资源包纹理”的纹理数组（v7.1，资源包读完之后调用一次） */
  setPackTextures(pixels: Uint8Array): void {
    this.textures.dispose()
    this.textures = createBlockTextures(pixels)
    for (const m of [this.opaque, this.water]) m.uniforms.map.value = this.textures
  }

  /** 把一个区块的颜色（Worker 算好的 16×16×3 种×RGB）写进颜色图 */
  writeTints(cx: number, cz: number, tints: Uint8Array): void {
    const N = TINT_MAP_SIZE
    for (let lz = 0; lz < 16; lz++) {
      for (let lx = 0; lx < 16; lx++) {
        const x = (((cx * 16 + lx) % N) + N) % N
        const z = (((cz * 16 + lz) % N) + N) % N
        for (let k = 0; k < 3; k++) {
          const src = ((lz * 16 + lx) * 3 + k) * 3
          const dst = (z * N + x) * 4
          const data = this.tintMaps[k].image.data as Uint8Array
          data[dst] = tints[src]
          data[dst + 1] = tints[src + 1]
          data[dst + 2] = tints[src + 2]
        }
      }
    }
    this.tintsDirty = true
  }

  /** 换光照贴图（v6，每帧）：rgb 是 16×16×3 字节，下标 (天空光 * 16 + 方块光) * 3 */
  setLightmap(rgb: Uint8Array, constantAmbient: boolean): void {
    const data = this.lightMap.image.data as Uint8Array
    for (let i = 0; i < 256; i++) {
      data[i * 4] = rgb[i * 3]
      data[i * 4 + 1] = rgb[i * 3 + 1]
      data[i * 4 + 2] = rgb[i * 3 + 2]
    }
    this.lightMap.needsUpdate = true
    for (const m of [this.opaque, this.water, this.wire]) m.uniforms.constantAmbient.value = constantAmbient
  }

  /** 每帧最多上传一次颜色图 */
  flushTints(): void {
    if (!this.tintsDirty) return
    for (const t of this.tintMaps) t.needsUpdate = true
    this.tintsDirty = false
  }
}

function createTintMap(color: number): THREE.DataTexture {
  const N = TINT_MAP_SIZE
  const data = new Uint8Array(N * N * 4)
  for (let i = 0; i < N * N; i++) {
    data[i * 4] = (color >> 16) & 255
    data[i * 4 + 1] = (color >> 8) & 255
    data[i * 4 + 2] = color & 255
    data[i * 4 + 3] = 255
  }
  const t = new THREE.DataTexture(data, N, N, THREE.RGBAFormat, THREE.UnsignedByteType)
  t.magFilter = t.minFilter = THREE.NearestFilter
  t.needsUpdate = true
  return t
}

function createLightMap(): THREE.DataTexture {
  const data = new Uint8Array(16 * 16 * 4).fill(255)
  const t = new THREE.DataTexture(data, 16, 16, THREE.RGBAFormat, THREE.UnsignedByteType)
  t.magFilter = t.minFilter = THREE.LinearFilter
  t.generateMipmaps = false
  t.needsUpdate = true
  return t
}
