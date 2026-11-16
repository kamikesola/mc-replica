import * as THREE from 'three'
import { paintAll, TEX, TEXTURE_COUNT } from './painters'

/**
 * 把所有方块纹理放进一个“纹理数组”（DataArrayTexture）：一叠 16×16 的图，用层号区分。
 *
 * 为什么不用传统的纹理图集（把所有小图拼成一张大图）：
 *   贪婪网格会把一大片相同的面合成一个矩形，比如 5×3 格，需要把纹理**重复铺** 5×3 次。
 *   GPU 的“重复平铺”只能对整张纹理做；图集里的一小块没法单独重复，
 *   要在着色器里自己取小数部分（fract），还会在 mipmap 时和隔壁的小图串色。
 *   纹理数组的每一层都是独立的一张图，直接开 RepeatWrapping 就行，没有这些问题。
 *
 * WebGL2 才有纹理数组，three.js r163 起本来就只支持 WebGL2，所以没有兼容性损失。
 */
export function createBlockTextures(extra?: Uint8Array): THREE.DataArrayTexture {
  // v7.1：资源包的纹理接在程序画的纹理后面（层号见 models/index.ts 的 PACK_LAYER0）
  const own = paintAll()
  let data = own
  let layers = TEXTURE_COUNT
  if (extra) {
    data = new Uint8Array(own.length + extra.length)
    data.set(own)
    data.set(extra, own.length)
    layers += extra.length / (TEX * TEX * 4)
  }
  const tex = new THREE.DataArrayTexture(data, TEX, TEX, layers)
  tex.format = THREE.RGBAFormat
  tex.type = THREE.UnsignedByteType
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  // 放大时取最近的像素：像素风的关键，不然会糊成一片
  tex.magFilter = THREE.NearestFilter
  // 缩小时用 mipmap：远处的地面不会闪烁出摩尔纹
  tex.minFilter = THREE.NearestMipmapLinearFilter
  tex.generateMipmaps = true
  tex.needsUpdate = true
  return tex
}

export { paintAll, TEX, TEXTURE_COUNT, TEXTURE_LAYER, TEXTURE_NAMES } from './painters'
