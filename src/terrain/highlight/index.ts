import * as THREE from 'three'

/**
 * 准星对准的方块外面画一圈黑色边框（对应原项目的 terrain/highlight）。
 * 选哪个方块由 Control 里的射线检测决定，这里只负责显示。
 *
 * 为什么不用 LineSegments：WebGL 里线宽永远是 1 像素（lineWidth 参数在大多数浏览器里无效），
 * 高分屏上几乎看不见。所以这里用 12 根细长的长方体拼出立方体的 12 条棱，粗细就能自己控制。
 */
const THICKNESS = 0.02 // 棱的粗细（方块的 2%）
const SIZE = 1.002 // 比方块稍大一点，避免和方块表面重叠闪烁

export default class Highlight {
  mesh = new THREE.Group()

  constructor(scene: THREE.Scene) {
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.55 })
    const h = SIZE / 2
    // 沿 x、y、z 三个方向各 4 条棱
    for (const axis of [0, 1, 2]) {
      const dims = [THICKNESS, THICKNESS, THICKNESS]
      dims[axis] = SIZE + THICKNESS
      const geometry = new THREE.BoxGeometry(dims[0], dims[1], dims[2])
      for (const a of [-h, h]) {
        for (const b of [-h, h]) {
          const pos = [a, b]
          pos.splice(axis, 0, 0) // 这条棱在 axis 方向上居中，另外两个方向在 ±h
          const edge = new THREE.Mesh(geometry, material)
          edge.position.set(pos[0], pos[1], pos[2])
          this.mesh.add(edge)
        }
      }
    }
    this.mesh.visible = false
    scene.add(this.mesh)
  }

  /** (x, y, z) 是方块坐标（方块的最小角），边框中心要放在方块中心 */
  show(x: number, y: number, z: number): void {
    this.mesh.position.set(x + 0.5, y + 0.5, z + 0.5)
    this.mesh.visible = true
  }

  hide(): void {
    this.mesh.visible = false
  }
}
