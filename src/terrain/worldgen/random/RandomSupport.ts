import { md5String } from '../math/md5'
import { toLong } from './RandomSource'

/** net.minecraft.world.level.levelgen.RandomSupport */

/** 2^64 / φ，即 0x9E3779B97F4A7C15（作为有符号 long 是负数） */
export const GOLDEN_RATIO_64 = toLong(0x9e3779b97f4a7c15n)
/** 0x6A09E667F3BCC909（√2 的小数部分） */
export const SILVER_RATIO_64 = 0x6a09e667f3bcc909n

export interface Seed128bit {
  lo: bigint
  hi: bigint
}

/** Stafford 的 Mix13：把相近的输入打散成毫不相关的输出（SplitMix64 的终结函数） */
export function mixStafford13(z: bigint): bigint {
  const u = (v: bigint) => BigInt.asUintN(64, v)
  z = toLong((z ^ (u(z) >> 30n)) * -4658895280553007687n)
  z = toLong((z ^ (u(z) >> 27n)) * -7723592293110705685n)
  return toLong(z ^ (u(z) >> 31n))
}

export function upgradeSeedTo128bitUnmixed(seed: bigint): Seed128bit {
  const lo = toLong(seed ^ SILVER_RATIO_64)
  const hi = toLong(lo + GOLDEN_RATIO_64)
  return { lo, hi }
}

/** 64 位世界种子 → 128 位 Xoroshiro 状态 */
export function upgradeSeedTo128bit(seed: bigint): Seed128bit {
  const s = upgradeSeedTo128bitUnmixed(seed)
  return { lo: mixStafford13(s.lo), hi: mixStafford13(s.hi) }
}

function longFromBytes(b: Uint8Array, off: number): bigint {
  let v = 0n
  for (let i = 0; i < 8; i++) v = (v << 8n) | BigInt(b[off + i])
  return toLong(v)
}

/** MD5(UTF-8 字符串) 的前 8 字节、后 8 字节分别按大端拼成两个 long（Guava Longs.fromBytes） */
export function seedFromHashOf(name: string): Seed128bit {
  const bs = md5String(name)
  return { lo: longFromBytes(bs, 0), hi: longFromBytes(bs, 8) }
}
