import BitStorage from './BitStorage'

/**
 * 调色板容器：存 4096 个方块（一个 16×16×16 的 section）。对应原版的 PalettedContainer。
 *
 * 思路：一个 section 里通常只有几种方块。与其每格存完整的方块 ID，不如：
 *   1. 把出现过的方块列成一张“调色板”：[空气, 石头, 泥土, ...]
 *   2. 每格只存它在调色板里的下标。调色板只有 3 种 → 每格 2 位就够
 *
 * 原版对方块用三种模式（按需要的位数自动切换）：
 *
 *   位数 0      单值：整个 section 只有一种方块（全是空气 / 全是石头），什么数组都不存
 *   位数 1..8   间接：调色板 + 位压缩数组；位数至少取 4（原版规定，避免频繁扩容）
 *   位数 > 8    直接：调色板太大就不要了，每格直接存全局 ID，位数 = ceil(log2(全局方块状态数))
 *
 * 原版有约 2.6 万个方块状态，所以直接模式是 15 位。v1 只有十几种方块，调色板永远不会超过 16 项，
 * 实际只会用到前两种模式；直接模式先写好，v7 加方块状态后就会用上。
 */

export const SECTION_VOLUME = 4096

/** 和原版 PalettedContainer.Strategy.SECTION_STATES 相同的规则 */
const MIN_INDIRECT_BITS = 4
const MAX_INDIRECT_BITS = 8

/** 传给 Worker / 从 Worker 收到的序列化形式（数组可以直接 transfer，不复制） */
export interface PalettedData {
  bits: number
  palette: number[]
  data: Uint32Array | null
}

export default class PalettedContainer {
  /** 当前每格的位数：0 = 单值，1..8 = 间接，> 8 = 直接 */
  bits = 0
  /** 调色板：下标 → 方块 ID（直接模式下为空） */
  palette: number[]
  /** 方块 ID → 调色板下标，查找用 */
  private lookup = new Map<number, number>()
  storage: BitStorage | null = null

  /**
   * @param globalBits 直接模式的位数：ceil(log2(方块种类数))
   * @param value      初始值（默认空气）
   */
  constructor(
    readonly globalBits: number,
    value = 0
  ) {
    this.palette = [value]
    this.lookup.set(value, 0)
  }

  get(i: number): number {
    if (this.bits === 0) return this.palette[0]
    const v = this.storage!.get(i)
    return this.bits > MAX_INDIRECT_BITS ? v : this.palette[v]
  }

  /** 写入一格，返回原来的值 */
  set(i: number, value: number): number {
    const old = this.get(i)
    if (old === value) return old
    const id = this.idFor(value)
    this.storage!.set(i, id)
    return old
  }

  /**
   * 方块 ID → 要写进数组的值。调色板里没有就加进去，放不下就扩容。
   * 扩容 = 用更多的位数新建一个数组，把 4096 个值逐个搬过去（原版的 onResize）。
   */
  private idFor(value: number): number {
    if (this.bits > MAX_INDIRECT_BITS) return value
    const found = this.lookup.get(value)
    if (found !== undefined && this.bits > 0) return found

    const size = this.palette.length + (found === undefined ? 1 : 0)
    const capacity = this.bits === 0 ? 1 : 1 << this.bits
    if (size > capacity) this.resize(size)
    if (this.bits > MAX_INDIRECT_BITS) return value

    if (found !== undefined) return found
    this.palette.push(value)
    this.lookup.set(value, this.palette.length - 1)
    return this.palette.length - 1
  }

  /** 按调色板大小换一个更宽的数组 */
  private resize(paletteSize: number): void {
    const old = new Array<number>(SECTION_VOLUME)
    for (let i = 0; i < SECTION_VOLUME; i++) old[i] = this.get(i)

    const need = Math.ceil(Math.log2(paletteSize))
    const bits = need <= MAX_INDIRECT_BITS ? Math.max(MIN_INDIRECT_BITS, need) : this.globalBits
    this.bits = bits
    this.storage = new BitStorage(bits, SECTION_VOLUME)
    if (bits > MAX_INDIRECT_BITS) {
      this.palette = []
      this.lookup.clear()
      for (let i = 0; i < SECTION_VOLUME; i++) this.storage.set(i, old[i])
    } else {
      // 调色板保持不变（下标不变），只是数组变宽了
      for (let i = 0; i < SECTION_VOLUME; i++) this.storage.set(i, this.lookup.get(old[i])!)
    }
  }

  /**
   * 从一个普通数组一次性建好（Worker 生成完方块后调用）。
   * 先统计出现了哪些方块，直接选出最小的位数，不经过反复扩容。
   * 原版存盘时（PalettedContainer.pack）也是这样重新整理一遍调色板的。
   */
  static fromValues(values: ArrayLike<number>, globalBits: number): PalettedContainer {
    const c = new PalettedContainer(globalBits, values[0])
    const palette: number[] = []
    const lookup = new Map<number, number>()
    for (let i = 0; i < SECTION_VOLUME; i++) {
      if (!lookup.has(values[i])) {
        lookup.set(values[i], palette.length)
        palette.push(values[i])
      }
    }
    if (palette.length === 1) return c

    const need = Math.ceil(Math.log2(palette.length))
    const direct = need > MAX_INDIRECT_BITS
    c.bits = direct ? globalBits : Math.max(MIN_INDIRECT_BITS, need)
    c.storage = new BitStorage(c.bits, SECTION_VOLUME)
    c.palette = direct ? [] : palette
    c.lookup = direct ? new Map() : lookup
    for (let i = 0; i < SECTION_VOLUME; i++) c.storage.set(i, direct ? values[i] : lookup.get(values[i])!)
    return c
  }

  toData(): PalettedData {
    return { bits: this.bits, palette: this.palette.slice(), data: this.storage?.data ?? null }
  }

  static fromData(d: PalettedData, globalBits: number): PalettedContainer {
    const c = new PalettedContainer(globalBits, d.palette[0] ?? 0)
    c.bits = d.bits
    c.palette = d.palette
    c.lookup = new Map(d.palette.map((v, i) => [v, i]))
    c.storage = d.bits === 0 ? null : new BitStorage(d.bits, SECTION_VOLUME, d.data!)
    return c
  }

  /** 单值模式：整个 section 都是同一种方块 */
  get isSingle(): boolean {
    return this.bits === 0
  }

  /** 占用的字节数：位压缩数组 + 调色板（每项按 1 字节算，v1 的方块 ID 都小于 256） */
  get byteSize(): number {
    return (this.storage?.data.byteLength ?? 0) + this.palette.length
  }
}
