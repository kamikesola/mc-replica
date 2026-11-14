import * as THREE from 'three'
import { createBlockTextures } from '../textures'
import { POSITION_SCALE } from './mesher'

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
 */

/** 颜色图边长：世界坐标对它取模（视距 10 时可见范围约 21 个区块 = 336 格，放得下） */
export const TINT_MAP_SIZE = 512

const vertexShader = /* glsl */ `
attribute vec4 info; // [面的方向, 纹理层, AO 等级, 染色种类]

varying vec2 vUv;
varying float vLayer;
varying float vLight;
varying vec2 vColumn; // 世界坐标 (x, z)，取生物群系颜色用
varying float vTint;

const vec3 FACE_NORMAL[8] = vec3[8](vec3(-1, 0, 0), vec3(1, 0, 0), vec3(0, -1, 0), vec3(0, 1, 0), vec3(0, 0, -1), vec3(0, 0, 1), vec3(0), vec3(0));

#include <fog_pars_vertex>

const float FACE_SHADE[8] = float[8](0.6, 0.6, 0.5, 1.0, 0.8, 0.8, 0.85, 0.85);
const float AO_LEVEL[4] = float[4](0.5, 0.68, 0.84, 1.0);

void main() {
  vec3 p = position / ${POSITION_SCALE.toFixed(1)};
  int face = int(info.x + 0.5);

  // 纹理坐标：图片的第一行在上面，所以 v 取 -y
  if (face == 0)      vUv = vec2( p.z, -p.y); // -x 面
  else if (face == 1) vUv = vec2(-p.z, -p.y); // +x 面
  else if (face == 4) vUv = vec2(-p.x, -p.y); // -z 面
  else if (face == 5) vUv = vec2( p.x, -p.y); // +z 面
  else if (face >= 6) vUv = vec2( p.x, -p.y); // 十字形植物的两片斜面（v5）：沿对角线，x 每格正好走一格
  else                vUv = vec2( p.x,  p.z); // 顶面、底面

  vLayer = info.y;
  vLight = FACE_SHADE[face] * AO_LEVEL[int(info.z + 0.5)];
  vTint = info.w;
  // 往面的反方向挪一点点：侧面正好在两列的分界线上，要取“这个方块所在的那一列”的颜色
  vColumn = (modelMatrix * vec4(p - FACE_NORMAL[face] * 0.01, 1.0)).xz;

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mvPosition;
#ifdef WIRE
  gl_Position.z -= 0.0004 * gl_Position.w; // 线框往相机方向挪一点点，避免和表面抢深度而闪烁
#endif
  #include <fog_vertex>
}
`

const fragmentShader = /* glsl */ `
precision highp sampler2DArray;
uniform sampler2DArray map;
uniform sampler2D grassMap;
uniform sampler2D foliageMap;
uniform sampler2D waterMap;
uniform float opacity;

varying vec2 vUv;
varying float vLayer;
varying float vLight;
varying vec2 vColumn;
varying float vTint;

#include <fog_pars_fragment>

void main() {
#ifdef WIRE
  gl_FragColor = vec4(0.0, 0.0, 0.0, opacity);
#else
  vec4 c = texture(map, vec3(vUv, floor(vLayer + 0.5)));
  int kind = int(vTint + 0.5);
  bool cutout = kind >= 4; // 镂空纹理（v5，十字形植物）：透明的像素丢掉，其余整张染色
  if (cutout) {
    if (c.a < 0.5) discard;
    kind -= 4;
  }
  if (kind > 0 && (cutout || c.a < 0.999)) {
    ivec2 col = ivec2(mod(floor(vColumn), ${TINT_MAP_SIZE}.0));
    vec3 tint = kind == 1 ? texelFetch(grassMap, col, 0).rgb : kind == 2 ? texelFetch(foliageMap, col, 0).rgb : texelFetch(waterMap, col, 0).rgb;
    c.rgb = cutout ? c.rgb * tint : mix(c.rgb, c.rgb * tint, 1.0 - c.a); // alpha 越小染得越多（mipmap 时会是中间值）
  }
  gl_FragColor = vec4(c.rgb * vLight, opacity);
#endif
  #include <fog_fragment>
}
`

function blockMaterial(opacity: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      { map: { value: null }, grassMap: { value: null }, foliageMap: { value: null }, waterMap: { value: null }, opacity: { value: opacity } }
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
    }

    this.wire = blockMaterial(0.6)
    this.wire.defines = { WIRE: '' }
    this.wire.wireframe = true
    this.wire.transparent = true
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
