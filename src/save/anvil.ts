import { BlockType } from '../terrain/blocks'
import type { BlockMapper } from './blockMap'
import { inflate, readNbt, type Nbt, type NbtCompound } from './nbt'

/**
 * 原版的区域文件（.mca，Anvil 格式，v8）。一个文件存 32×32 个区块，文件名 r.<区域x>.<区域z>.mca。
 *
 *   前 4 KiB：1024 个“位置”，每个 4 字节 = 3 字节的起始扇区号 + 1 字节的扇区数（一个扇区 4 KiB），0 表示这个区块没有存
 *   再 4 KiB：1024 个修改时间（用不上）
 *   每个区块：4 字节长度 + 1 字节压缩方式（1 gzip、2 zlib、3 不压缩）+ 压缩后的 NBT
 *
 * 区块的 NBT（1.18 起）：
 *   Status: "minecraft:full"（生成完了；没生成完的我们自己生成）
 *   sections: [{ Y: section 序号, block_states: { palette: [{ Name, Properties }], data: long[] } }, ...]
 * data 是按位压缩的调色板下标：每个下标 max(4, ⌈log2(调色板长度)⌉) 位，一个 long 放 ⌊64 / 位数⌋ 个，不跨 long（和 v1 的 BitStorage 一样）。
 */

/** 区域文件里一个区块的压缩数据；没有存这个区块返回 null。只切片，不解压（解压在 Worker 里做） */
export function regionChunk(region: Uint8Array, cx: number, cz: number): { compression: number; data: Uint8Array } | null {
  if (region.length < 8192) return null
  const i = 4 * ((cx & 31) + (cz & 31) * 32)
  const sector = (region[i] << 16) | (region[i + 1] << 8) | region[i + 2]
  if (sector === 0) return null
  const p = sector * 4096
  if (p + 5 > region.length) return null
  const v = new DataView(region.buffer, region.byteOffset + p, 5)
  const len = v.getUint32(0)
  const compression = v.getUint8(4)
  if (compression & 128) return null // 128：数据在单独的 .mcc 文件里（特别大的区块），不支持
  return { compression, data: region.slice(p + 5, p + 4 + len) }
}

export async function chunkNbt(compression: number, data: Uint8Array): Promise<NbtCompound> {
  const raw = compression === 2 ? await inflate(data, 'deflate') : compression === 1 ? await inflate(data, 'gzip') : data
  return readNbt(raw)
}

/** "minecraft:oak_log[axis=x]"：调色板的一项 → 状态字符串（属性按名字排序） */
export function paletteState(e: NbtCompound): string {
  const name = e.Name as string
  const props = e.Properties as Record<string, string> | undefined
  if (!props) return name
  return `${name}[${Object.keys(props)
    .sort()
    .map((k) => `${k}=${props[k]}`)
    .join(',')}]`
}

export interface DecodedChunk {
  /** 区块有没有生成完（Status = minecraft:full） */
  full: boolean
  /** 方块，下标 ((y - minY) * 16 + z) * 16 + x，和 Chunk.flat 一样 */
  blocks: Uint16Array
}

/**
 * 区块 NBT → 我们的方块数组。minY / height 是我们这个维度的范围（原版存档里上下可能多存一个只有光照的 section）
 */
export function decodeChunk(nbt: NbtCompound, minY: number, height: number, mapper: BlockMapper): DecodedChunk {
  const blocks = new Uint16Array(height * 256)
  const full = String(nbt.Status ?? '') === 'minecraft:full'
  const sections = (nbt.sections ?? []) as NbtCompound[]
  for (const sec of sections) {
    const bs = sec.block_states as NbtCompound | undefined
    if (!bs) continue
    const y0 = Number(sec.Y) * 16
    if (y0 < minY || y0 >= minY + height) continue
    const palette = (bs.palette as NbtCompound[]).map(paletteState)
    const base = (y0 - minY) * 256
    if (!bs.data) {
      // 整段一种方块：没有 data
      const s = mapper.map(palette[0], 4096)
      if (s !== BlockType.air) blocks.fill(s, base, base + 4096)
      continue
    }
    // 先把调色板换成我们的状态（每项只换一次），再按位解出下标
    const counts = new Int32Array(palette.length)
    const data = bs.data as BigInt64Array
    const bits = Math.max(4, Math.ceil(Math.log2(palette.length)))
    const per = Math.floor(64 / bits)
    const mask = (1 << bits) - 1
    const idx = new Uint16Array(4096)
    for (let w = 0, i = 0; w < data.length && i < 4096; w++) {
      // 一个 long 拆成高低两个 32 位数，避免每格都做 bigint 运算
      const word = data[w]
      const lo = Number(BigInt.asUintN(32, word))
      const hi = Number(BigInt.asUintN(32, word >> 32n))
      for (let k = 0; k < per && i < 4096; k++, i++) {
        const shift = k * bits
        let v: number
        if (shift + bits <= 32) v = (lo >>> shift) & mask
        else if (shift >= 32) v = (hi >>> (shift - 32)) & mask
        else v = ((lo >>> shift) | (hi << (32 - shift))) & mask
        idx[i] = v
        counts[v]++
      }
    }
    const states = palette.map((p, k) => (counts[k] ? mapper.map(p, counts[k]) : 0))
    for (let i = 0; i < 4096; i++) blocks[base + i] = states[idx[i]]
  }
  return { full, blocks }
}

/** level.dat 里我们要用的东西 */
export interface LevelInfo {
  name: string
  seed: bigint
  dayTime: number
  spawn: { x: number; y: number; z: number }
  /** 单人存档里有玩家（服务端存档的玩家在 playerdata/ 里，这里没有） */
  player: { x: number; y: number; z: number; yaw: number; pitch: number; dimension: string; flying: boolean } | null
  /** 存档的数据版本（1.21.4 是 4189） */
  dataVersion: number
}

export async function readLevelDat(bytes: Uint8Array): Promise<LevelInfo> {
  const root = readNbt(await inflate(bytes, 'gzip'))
  const d = root.Data as NbtCompound
  const wgs = d.WorldGenSettings as NbtCompound | undefined
  const num = (n: Nbt | undefined) => Number(n ?? 0)
  const p = d.Player as NbtCompound | undefined
  let player: LevelInfo['player'] = null
  if (p) {
    const pos = p.Pos as number[]
    const rot = p.Rotation as number[]
    const abilities = p.abilities as NbtCompound | undefined
    player = { x: pos[0], y: pos[1], z: pos[2], yaw: rot[0], pitch: rot[1], dimension: String(p.Dimension ?? 'minecraft:overworld'), flying: num(abilities?.flying) === 1 }
  }
  return {
    name: String(d.LevelName ?? ''),
    seed: BigInt((wgs?.seed as bigint | undefined) ?? (d.RandomSeed as bigint | undefined) ?? 0n),
    dayTime: Number(d.DayTime ?? 0n),
    spawn: { x: num(d.SpawnX), y: num(d.SpawnY), z: num(d.SpawnZ) },
    player,
    dataVersion: num(d.DataVersion)
  }
}

/** 维度 → 存档里区域文件所在的目录 */
export function regionDir(settings: string): string {
  if (/nether/.test(settings)) return 'DIM-1/region'
  if (/end/.test(settings)) return 'DIM1/region'
  return 'region'
}
