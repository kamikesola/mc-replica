/**
 * 读原版存档的区域文件（.mca，Anvil 格式）和 NBT。只用在 Node 端的核对工具里。
 *
 * .mca：前 4 KiB 是 1024 个位置（3 字节扇区号 + 1 字节扇区数），每个区块：4 字节长度 + 1 字节压缩方式 + 数据。
 * 区块 NBT（1.18+）：sections[] = { Y, block_states: { palette, data: long[] }, biomes: { palette, data } }
 */
import { readFileSync } from 'node:fs'
import { inflateSync, gunzipSync } from 'node:zlib'

export type Nbt = number | bigint | string | Nbt[] | { [k: string]: Nbt } | Int8Array | Int32Array | BigInt64Array

export function readNbt(buf: Buffer): { [k: string]: Nbt } {
  let p = 0
  const u8 = () => buf.readUInt8(p++)
  const i16 = () => ((p += 2), buf.readInt16BE(p - 2))
  const i32 = () => ((p += 4), buf.readInt32BE(p - 4))
  const str = () => {
    const n = buf.readUInt16BE(p)
    p += 2
    const s = buf.toString('utf8', p, p + n)
    p += n
    return s
  }
  const payload = (t: number): Nbt => {
    switch (t) {
      case 1: return buf.readInt8(p++)
      case 2: return i16()
      case 3: return i32()
      case 4: return ((p += 8), buf.readBigInt64BE(p - 8))
      case 5: return ((p += 4), buf.readFloatBE(p - 4))
      case 6: return ((p += 8), buf.readDoubleBE(p - 8))
      case 7: {
        const n = i32()
        const a = new Int8Array(buf.buffer.slice(buf.byteOffset + p, buf.byteOffset + p + n))
        p += n
        return a
      }
      case 8: return str()
      case 9: {
        const et = u8()
        const n = i32()
        const a: Nbt[] = []
        for (let i = 0; i < n; i++) a.push(payload(et))
        return a
      }
      case 10: {
        const o: { [k: string]: Nbt } = {}
        for (;;) {
          const tt = u8()
          if (tt === 0) return o
          const name = str()
          o[name] = payload(tt)
        }
      }
      case 11: {
        const n = i32()
        const a = new Int32Array(n)
        for (let i = 0; i < n; i++) a[i] = i32()
        return a
      }
      case 12: {
        const n = i32()
        const a = new BigInt64Array(n)
        for (let i = 0; i < n; i++) a[i] = ((p += 8), buf.readBigInt64BE(p - 8))
        return a
      }
      default:
        throw new Error(`NBT 类型 ${t}`)
    }
  }
  const t = u8()
  if (t !== 10) throw new Error('根不是 compound')
  str()
  return payload(10) as { [k: string]: Nbt }
}

export class Region {
  private readonly buf: Buffer
  constructor(path: string) {
    this.buf = readFileSync(path)
  }
  /** 区域内的区块 (0..31, 0..31)；不存在返回 null */
  chunk(lx: number, lz: number): { [k: string]: Nbt } | null {
    if (this.buf.length < 8192) return null
    const i = 4 * ((lx & 31) + (lz & 31) * 32)
    const off = (this.buf[i] << 16) | (this.buf[i + 1] << 8) | this.buf[i + 2]
    if (off === 0) return null
    const p = off * 4096
    const len = this.buf.readUInt32BE(p)
    const type = this.buf[p + 4]
    const data = this.buf.subarray(p + 5, p + 4 + len)
    const raw = type === 2 ? inflateSync(data) : type === 1 ? gunzipSync(data) : data
    return readNbt(raw)
  }
}

export interface VanillaChunk {
  status: string
  minY: number
  /** blocks[((y - minY) * 16 + z) * 16 + x] = 方块名（不带属性） */
  blocks: string[]
  /** 带属性的完整状态，比如 minecraft:snow[layers=1]，和 blocks 同下标；没有属性时等于方块名 */
  states: string[]
  height: number
}

/** 世界目录下读一个区块 */
export function loadChunk(worldDir: string, cx: number, cz: number, cache = new Map<string, Region>()): VanillaChunk | null {
  const file = `${worldDir}/region/r.${cx >> 5}.${cz >> 5}.mca`
  let r = cache.get(file)
  if (!r) {
    try {
      r = new Region(file)
    } catch {
      return null
    }
    cache.set(file, r)
  }
  const nbt = r.chunk(cx & 31, cz & 31)
  if (!nbt) return null
  const sections = (nbt.sections as { [k: string]: Nbt }[]).filter((s) => s.block_states)
  const ys = sections.map((s) => Number(s.Y))
  const minSec = Math.min(...ys)
  const maxSec = Math.max(...ys)
  const minY = minSec * 16
  const height = (maxSec - minSec + 1) * 16
  const blocks = new Array<string>(height * 256).fill('minecraft:air')
  const states = new Array<string>(height * 256).fill('minecraft:air')
  for (const s of sections) {
    const bs = s.block_states as { [k: string]: Nbt }
    const palette = (bs.palette as { [k: string]: Nbt }[]).map((e) => {
      const name = e.Name as string
      const props = e.Properties as { [k: string]: string } | undefined
      const state = props ? `${name}[${Object.keys(props).sort().map((k) => `${k}=${props[k]}`).join(',')}]` : name
      return [name, state]
    })
    const base = (Number(s.Y) - minSec) * 4096
    if (!bs.data) {
      for (let i = 0; i < 4096; i++) [blocks[base + i], states[base + i]] = palette[0]
      continue
    }
    const data = bs.data as BigInt64Array
    const bits = Math.max(4, Math.ceil(Math.log2(palette.length)))
    const per = Math.floor(64 / bits)
    const mask = (1n << BigInt(bits)) - 1n
    for (let i = 0; i < 4096; i++) {
      const v = Number((BigInt.asUintN(64, data[Math.floor(i / per)]) >> BigInt((i % per) * bits)) & mask)
      ;[blocks[base + i], states[base + i]] = palette[v]
    }
  }
  return { status: String(nbt.Status), minY, height, blocks, states }
}
