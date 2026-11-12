import * as THREE from 'three'
import { BlockType } from './blocks'

/**
 * 区块：16×16 的一根柱子，高度由 noise_settings 决定（主世界 -64..320，共 384 格）。
 *
 * 和原项目最大的不同就在这里：原项目只存“每一列的地表”，这里存**每一个方块**，
 * 所以才能有洞穴、悬崖下的空腔，挖下去看到的也是真实生成的方块。
 *
 * 一个区块 = 16 × 16 × 384 = 98304 个方块，每个 1 字节，约 96 KB。
 */
export const CHUNK_SIZE = 16

export default class Chunk {
  /** 方块数组。下标规则见 index() */
  blocks: Uint8Array
  /** 不透明方块和水分开两个网格（水要半透明、后画） */
  mesh: THREE.Mesh | null = null
  waterMesh: THREE.Mesh | null = null

  constructor(
    readonly cx: number,
    readonly cz: number,
    readonly minY: number,
    readonly height: number,
    blocks?: Uint8Array
  ) {
    this.blocks = blocks ?? new Uint8Array(CHUNK_SIZE * CHUNK_SIZE * height)
  }

  /**
   * 局部坐标 → 下标。y 放在最外层：同一层的 256 个方块在内存里是连续的，
   * 网格生成时按层遍历比较快。lx、lz 是 0..15，y 是世界坐标。
   */
  static index(lx: number, y: number, lz: number, minY: number): number {
    return ((y - minY) * CHUNK_SIZE + lz) * CHUNK_SIZE + lx
  }

  get(lx: number, y: number, lz: number): BlockType {
    if (y < this.minY || y >= this.minY + this.height) return BlockType.air
    return this.blocks[Chunk.index(lx, y, lz, this.minY)]
  }

  set(lx: number, y: number, lz: number, type: BlockType): void {
    if (y < this.minY || y >= this.minY + this.height) return
    this.blocks[Chunk.index(lx, y, lz, this.minY)] = type
  }

  /** 释放 GPU 资源（卸载区块时调用） */
  dispose(scene: THREE.Scene): void {
    for (const m of [this.mesh, this.waterMesh]) {
      if (m) {
        scene.remove(m)
        m.geometry.dispose()
      }
    }
    this.mesh = this.waterMesh = null
  }
}
