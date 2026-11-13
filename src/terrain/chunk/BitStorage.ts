/**
 * 定长位压缩数组：每个值占 bits 位，一个 32 位整数里塞 floor(32 / bits) 个值。
 *
 * 对应原版的 SimpleBitStorage（1.16 起的格式）。原版用 long[]（64 位），
 * 这里用 Uint32Array：JS 里没有快速的 64 位整数运算（bigint 慢几十倍），而规则完全一样——
 * **一个值不会跨两个整数存放**，多出来的几位空着不用。
 *
 *   bits = 4：每个 32 位整数放 8 个值，4096 个值需要 512 个整数 = 2 KB
 *   bits = 5：每个放 6 个（30 位，空 2 位），需要 683 个 = 2.7 KB
 *
 * 不跨界存放会浪费一点空间，但读一个值只要一次除法、一次移位、一次与运算。
 * v8 读原版存档时，再把 long[] 按同样的规则拆成两半就行。
 */
export default class BitStorage {
  readonly data: Uint32Array
  readonly valuesPerWord: number
  private readonly mask: number

  constructor(
    readonly bits: number,
    readonly size: number,
    data?: Uint32Array
  ) {
    if (bits < 1 || bits > 32) throw new Error(`bits 必须在 1..32 之间：${bits}`)
    this.valuesPerWord = Math.floor(32 / bits)
    this.mask = bits === 32 ? 0xffffffff : (1 << bits) - 1
    const words = Math.ceil(size / this.valuesPerWord)
    if (data && data.length !== words) throw new Error(`数据长度不对：需要 ${words}，实际 ${data.length}`)
    this.data = data ?? new Uint32Array(words)
  }

  get(i: number): number {
    const word = (i / this.valuesPerWord) | 0
    const shift = (i - word * this.valuesPerWord) * this.bits
    return (this.data[word] >>> shift) & this.mask
  }

  set(i: number, value: number): void {
    const word = (i / this.valuesPerWord) | 0
    const shift = (i - word * this.valuesPerWord) * this.bits
    this.data[word] = (this.data[word] & ~(this.mask << shift)) | ((value & this.mask) << shift)
  }
}
