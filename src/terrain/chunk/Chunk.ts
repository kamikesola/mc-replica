import type * as THREE from 'three'
import { BlockType } from '../blocks'
import Section from './Section'

/**
 * 区块：16×16 的一根柱子，由若干个 16³ 的 section 叠起来。对应原版的 LevelChunk。
 *
 * v0 的区块是一整个 Uint8Array（16×16×384 = 96 KB）；v1 改成 section 数组，
 * 每个 section 用调色板压缩，空气 section 几乎不占内存（见 Section.ts、PalettedContainer.ts）。
 *
 * 网格也按 section 存：meshes[i] 是第 i 个 section 的不透明部分，waterMeshes[i] 是水。
 */
export const CHUNK_SIZE = 16

export default class Chunk {
  sections: Section[]
  meshes: (THREE.Mesh | null)[]
  waterMeshes: (THREE.Mesh | null)[]
  /**
   * 在主线程重建时，旁边有区块还没加载（当成空气算的）的 section。
   * 那个区块加载后要再重建一次，否则边界上会多出一层本该被挡住的面。
   */
  staleSections = new Set<number>()

  constructor(
    readonly cx: number,
    readonly cz: number,
    readonly minY: number,
    readonly height: number,
    sections?: Section[]
  ) {
    const count = height >> 4
    this.sections = sections ?? Array.from({ length: count }, () => new Section())
    this.meshes = new Array(count).fill(null)
    this.waterMeshes = new Array(count).fill(null)
  }

  /** 世界 y → section 序号 */
  sectionIndex(y: number): number {
    return (y - this.minY) >> 4
  }

  /**
   * 整个区块内的方块编号（玩家改动记录 edits 用这个当 key）。
   * 和 v0 的编号规则相同，所以 edits 的格式没有变。
   */
  static index(lx: number, y: number, lz: number, minY: number): number {
    return ((y - minY) * CHUNK_SIZE + lz) * CHUNK_SIZE + lx
  }

  get(lx: number, y: number, lz: number): BlockType {
    if (y < this.minY || y >= this.minY + this.height) return BlockType.air
    const ry = y - this.minY
    return this.sections[ry >> 4].get(lx, ry & 15, lz)
  }

  set(lx: number, y: number, lz: number, type: BlockType): void {
    if (y < this.minY || y >= this.minY + this.height) return
    const ry = y - this.minY
    this.sections[ry >> 4].set(lx, ry & 15, lz, type)
  }

  /** 方块数据占的内存（字节） */
  get byteSize(): number {
    let n = 0
    for (const s of this.sections) n += s.blocks.byteSize
    return n
  }

  /** 释放一个 section 的网格 */
  disposeSection(scene: THREE.Scene, i: number): void {
    for (const list of [this.meshes, this.waterMeshes]) {
      const m = list[i]
      if (m) {
        scene.remove(m)
        m.geometry.dispose()
        list[i] = null
      }
    }
  }

  /** 释放全部网格（卸载区块时调用） */
  dispose(scene: THREE.Scene): void {
    for (let i = 0; i < this.sections.length; i++) this.disposeSection(scene, i)
  }
}
