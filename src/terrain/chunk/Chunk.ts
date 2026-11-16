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
 *
 * v6：另外留一份不压缩的方块（flat，约 100 KB），算光照时要整块发给 Worker，每次从调色板解出来太慢；
 * 读方块也直接读它。光照 light 是 18×18 列（区块加四周一圈，网格生成要用邻居的亮度），点亮之前是 null。
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
  /** 不压缩的方块，下标同 Chunk.index（v6） */
  flat: Uint16Array
  /** 光照（v6）：18×18 列，下标 ((y - minY) * 18 + lz + 1) * 18 + lx + 1，低 4 位天空光、高 4 位方块光；还没点亮时为 null */
  light: Uint8Array | null = null
  /** 正在 Worker 里算光照 */
  lighting = false
  /** 方块每改一次 +1：光照算到一半方块变了，结果就作废 */
  version = 0

  constructor(
    readonly cx: number,
    readonly cz: number,
    readonly minY: number,
    readonly height: number,
    sections?: Section[],
    flat?: Uint16Array
  ) {
    const count = height >> 4
    this.sections = sections ?? Array.from({ length: count }, () => new Section())
    if (flat) this.flat = flat
    else {
      this.flat = new Uint16Array(height * 256)
      this.sections.forEach((s, sy) => {
        for (let i = 0; i < 4096; i++) this.flat[sy * 4096 + i] = s.blocks.get(i)
      })
    }
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
    return this.flat[((y - this.minY) * 16 + lz) * 16 + lx]
  }

  set(lx: number, y: number, lz: number, type: BlockType): void {
    if (y < this.minY || y >= this.minY + this.height) return
    const ry = y - this.minY
    this.sections[ry >> 4].set(lx, ry & 15, lz, type)
    this.flat[(ry * 16 + lz) * 16 + lx] = type
    this.version++
  }

  /** 按 flat 下标直接改一格（v7：区块落定时用），不增加版本号 */
  setRaw(i: number, type: number): void {
    this.flat[i] = type
    this.sections[i >> 12].blocks.set(i & 4095, type)
  }

  /** 光照数组里的下标（lx、lz 可以是 -1..16） */
  lightIndex(lx: number, y: number, lz: number): number {
    return ((y - this.minY) * 18 + lz + 1) * 18 + lx + 1
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
