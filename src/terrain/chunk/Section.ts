import { BLOCK_BITS, BlockType } from '../blocks'
import PalettedContainer, { type PalettedData } from './PalettedContainer'

/**
 * Section：区块里 16×16×16 的一段。对应原版的 LevelChunkSection。
 *
 * 主世界一根区块柱高 384 格 = 24 个 section。按 section 切开有三个好处：
 *   - 每段单独用调色板压缩：天上的 section 全是空气，只占几个字节
 *   - 每段单独生成网格：挖一个方块只需要重建 16³ 而不是 16×16×384
 *   - 每段单独做视锥剔除：看不见的 section 不画
 *
 * 段内下标和原版一样：(y * 16 + z) * 16 + x，y 在最外层。
 */
export default class Section {
  /** 非空气方块的数量。为 0 时整段可以直接跳过（原版的 nonEmptyBlockCount） */
  nonAir = 0

  constructor(public blocks: PalettedContainer = new PalettedContainer(BLOCK_BITS, BlockType.air)) {
    this.recount()
  }

  static index(lx: number, ly: number, lz: number): number {
    return (ly * 16 + lz) * 16 + lx
  }

  get(lx: number, ly: number, lz: number): BlockType {
    return this.blocks.get(Section.index(lx, ly, lz))
  }

  set(lx: number, ly: number, lz: number, type: BlockType): void {
    const old = this.blocks.set(Section.index(lx, ly, lz), type)
    if (old === BlockType.air && type !== BlockType.air) this.nonAir++
    else if (old !== BlockType.air && type === BlockType.air) this.nonAir--
  }

  get isEmpty(): boolean {
    return this.nonAir === 0
  }

  recount(): void {
    const c = this.blocks
    if (c.isSingle) {
      this.nonAir = c.palette[0] === BlockType.air ? 0 : 4096
      return
    }
    let n = 0
    for (let i = 0; i < 4096; i++) if (c.get(i) !== BlockType.air) n++
    this.nonAir = n
  }

  static fromData(d: PalettedData): Section {
    return new Section(PalettedContainer.fromData(d, BLOCK_BITS))
  }
}
