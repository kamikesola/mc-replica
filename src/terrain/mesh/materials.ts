import * as THREE from 'three'

/**
 * 材质（对应原项目的 terrain/mesh/materials.ts）。
 *
 * 原项目给每种方块一张贴图；v0 还没有纹理，颜色、明暗、AO 都已经烘焙在顶点色里，
 * 所以只需要两个不受光照影响的材质：不透明的方块、半透明的水。
 */
export default class Materials {
  opaque = new THREE.MeshBasicMaterial({ vertexColors: true })
  water = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    depthWrite: false, // 水面后面的东西仍然要能看到
    side: THREE.DoubleSide // 潜到水下往上看也能看到水面
  })
}
