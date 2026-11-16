/**
 * NBT（Named Binary Tag）：原版存档的二进制格式（v8，浏览器和 Node 都能用）。
 *
 * 每个“标签”是 [类型 1 字节][名字：2 字节长度 + UTF-8][内容]，整数都是大端：
 *
 *   1 byte   2 short   3 int   4 long（这里用 bigint）   5 float   6 double
 *   7 byte[]（4 字节长度 + 内容）   8 string   9 list（元素类型 + 4 字节个数 + 内容，元素没有名字）
 *   10 compound（一串带名字的标签，以类型 0 结束）   11 int[]   12 long[]
 *
 * level.dat 是 gzip 压缩的 NBT；区域文件（.mca）里每个区块是 zlib 压缩的 NBT（见 anvil.ts）。
 * tools/vanilla/anvil.ts 里有一份 Node 版（用 Buffer），这一份用 DataView，浏览器里也能跑。
 */

export type Nbt = number | bigint | string | Nbt[] | NbtCompound | Int8Array | Int32Array | BigInt64Array
export interface NbtCompound {
  [k: string]: Nbt
}

const utf8 = new TextDecoder()

export function readNbt(bytes: Uint8Array): NbtCompound {
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  let p = 0
  const u8 = () => v.getUint8(p++)
  const i32 = () => ((p += 4), v.getInt32(p - 4))
  const str = () => {
    const n = v.getUint16(p)
    p += 2
    const s = utf8.decode(bytes.subarray(p, p + n))
    p += n
    return s
  }
  const payload = (t: number): Nbt => {
    switch (t) {
      case 1:
        return v.getInt8(p++)
      case 2:
        return (p += 2), v.getInt16(p - 2)
      case 3:
        return i32()
      case 4:
        return (p += 8), v.getBigInt64(p - 8)
      case 5:
        return (p += 4), v.getFloat32(p - 4)
      case 6:
        return (p += 8), v.getFloat64(p - 8)
      case 7: {
        const n = i32()
        const a = new Int8Array(bytes.slice(p, p + n).buffer)
        p += n
        return a
      }
      case 8:
        return str()
      case 9: {
        const et = u8()
        const n = i32()
        const a: Nbt[] = []
        for (let i = 0; i < n; i++) a.push(payload(et))
        return a
      }
      case 10: {
        const o: NbtCompound = {}
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
        for (let i = 0; i < n; i++) a[i] = ((p += 8), v.getBigInt64(p - 8))
        return a
      }
      default:
        throw new Error(`NBT：不认识的类型 ${t}（位置 ${p}）`)
    }
  }
  if (u8() !== 10) throw new Error('NBT：根标签不是 compound')
  str() // 根的名字（一般是空的）
  return payload(10) as NbtCompound
}

/** 解压：zlib（区域文件里的区块，压缩方式 2）或 gzip（level.dat，压缩方式 1）。用浏览器 / Node 自带的 DecompressionStream */
export async function inflate(data: Uint8Array, format: 'deflate' | 'gzip'): Promise<Uint8Array> {
  const stream = new Blob([data as BlobPart]).stream().pipeThrough(new DecompressionStream(format))
  return new Uint8Array(await new Response(stream).arrayBuffer())
}
