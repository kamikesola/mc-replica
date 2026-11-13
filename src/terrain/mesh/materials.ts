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
 */

const vertexShader = /* glsl */ `
attribute vec4 info; // [面的方向, 纹理层, AO 等级, 未用]

varying vec2 vUv;
varying float vLayer;
varying float vLight;

#include <fog_pars_vertex>

const float FACE_SHADE[6] = float[6](0.6, 0.6, 0.5, 1.0, 0.8, 0.8);
const float AO_LEVEL[4] = float[4](0.5, 0.68, 0.84, 1.0);

void main() {
  vec3 p = position / ${POSITION_SCALE.toFixed(1)};
  int face = int(info.x + 0.5);

  // 纹理坐标：图片的第一行在上面，所以 v 取 -y
  if (face == 0)      vUv = vec2( p.z, -p.y); // -x 面
  else if (face == 1) vUv = vec2(-p.z, -p.y); // +x 面
  else if (face == 4) vUv = vec2(-p.x, -p.y); // -z 面
  else if (face == 5) vUv = vec2( p.x, -p.y); // +z 面
  else                vUv = vec2( p.x,  p.z); // 顶面、底面

  vLayer = info.y;
  vLight = FACE_SHADE[face] * AO_LEVEL[int(info.z + 0.5)];

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
uniform float opacity;

varying vec2 vUv;
varying float vLayer;
varying float vLight;

#include <fog_pars_fragment>

void main() {
#ifdef WIRE
  gl_FragColor = vec4(0.0, 0.0, 0.0, opacity);
#else
  vec4 c = texture(map, vec3(vUv, floor(vLayer + 0.5)));
  gl_FragColor = vec4(c.rgb * vLight, opacity);
#endif
  #include <fog_fragment>
}
`

function blockMaterial(opacity: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { map: { value: null }, opacity: { value: opacity } }]),
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

  constructor() {
    this.opaque = blockMaterial(1)
    this.water = blockMaterial(0.7)
    this.water.transparent = true
    this.water.depthWrite = false // 水面后面的东西仍然要能看到
    this.water.side = THREE.DoubleSide // 潜到水下往上看也能看到水面
    // UniformsUtils.merge 会复制一份 value，纹理要在复制之后再放进去
    this.opaque.uniforms.map.value = this.textures
    this.water.uniforms.map.value = this.textures

    this.wire = blockMaterial(0.6)
    this.wire.defines = { WIRE: '' }
    this.wire.wireframe = true
    this.wire.transparent = true
  }
}
