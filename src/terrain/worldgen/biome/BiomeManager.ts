/**
 * 方块坐标 → 生物群系（原版 BiomeManager.getBiome）。
 *
 * 生物群系只在 4×4×4 的格子（quart）上算一次。如果直接按 quart 取，群系边界会是整齐的 4 格锯齿。
 * 原版的做法是给每个 quart 角点一个“抖动”，再找离方块最近的角点 —— 边界就变得不规则了。
 * 抖动由种子的 SHA-256 决定（BiomeManager.obfuscateSeed），用 64 位整数运算：种子哈希用 bigint 算一次，
 * 每个方块的抖动用两个 32 位数模拟 64 位（见下面的 mul64）。
 */

const MASK = (1n << 64n) - 1n
const toSigned = (x: bigint) => BigInt.asIntN(64, x)

/** 原版 LinearCongruentialGenerator.next（bigint 版，测试里用来核对下面的快速版） */
export function lcgNext(a: bigint, b: bigint): bigint {
  return toSigned(toSigned(a * toSigned(a * 6364136223846793005n + 1442695040888963407n)) + b)
}

/**
 * 64 位整数用两个 32 位数（高位 hi、低位 lo，都当无符号）表示，避免 bigint：
 * getBiome 每个方块要做 8 × 9 次 64 位乘法，bigint 慢几十倍。乘法按 16 位一段拆开算（和 Long.js 一样）。
 */
let rh = 0
let rl = 0
function mul64(ah: number, al: number, bh: number, bl: number): void {
  const a48 = ah >>> 16
  const a32 = ah & 0xffff
  const a16 = al >>> 16
  const a00 = al & 0xffff
  const b48 = bh >>> 16
  const b32 = bh & 0xffff
  const b16 = bl >>> 16
  const b00 = bl & 0xffff
  let c00 = a00 * b00
  let c16 = c00 >>> 16
  c00 &= 0xffff
  c16 += a16 * b00
  let c32 = c16 >>> 16
  c16 &= 0xffff
  c16 += a00 * b16
  c32 += c16 >>> 16
  c16 &= 0xffff
  c32 += a32 * b00
  let c48 = c32 >>> 16
  c32 &= 0xffff
  c32 += a16 * b16
  c48 += c32 >>> 16
  c32 &= 0xffff
  c32 += a00 * b32
  c48 += c32 >>> 16
  c32 &= 0xffff
  c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48
  c48 &= 0xffff
  rh = ((c48 << 16) | c32) >>> 0
  rl = ((c16 << 16) | c00) >>> 0
}
function add64(ah: number, al: number, bh: number, bl: number): void {
  const lo = al + bl
  rl = lo >>> 0
  rh = (ah + bh + (lo > 0xffffffff ? 1 : 0)) >>> 0
}
const MUL_H = Number((6364136223846793005n >> 32n) & 0xffffffffn)
const MUL_L = Number(6364136223846793005n & 0xffffffffn)
const ADD_H = Number((1442695040888963407n >> 32n) & 0xffffffffn)
const ADD_L = Number(1442695040888963407n & 0xffffffffn)

/** lcgNext 的快速版：(ah, al) * ((ah, al) * MUL + ADD) + (bh, bl)，结果在 rh / rl 里 */
function lcg(ah: number, al: number, bh: number, bl: number): void {
  mul64(ah, al, MUL_H, MUL_L)
  add64(rh, rl, ADD_H, ADD_L)
  mul64(ah, al, rh, rl)
  add64(rh, rl, bh, bl)
}

/** 整数 i 的 64 位表示（符号扩展） */
const hiOf = (i: number) => (i < 0 ? 0xffffffff : 0)

/** (l >> 24) floorMod 1024 = 第 24..33 位，映射到 -0.45..0.45 */
function fiddle(h: number, l: number): number {
  const d = ((l >>> 24) | ((h & 3) << 8)) / 1024.0
  return (d - 0.5) * 0.9
}

function fiddledDistance(sh: number, sl: number, i: number, j: number, k: number, d: number, e: number, f: number): number {
  lcg(sh, sl, hiOf(i), i >>> 0)
  lcg(rh, rl, hiOf(j), j >>> 0)
  lcg(rh, rl, hiOf(k), k >>> 0)
  lcg(rh, rl, hiOf(i), i >>> 0)
  lcg(rh, rl, hiOf(j), j >>> 0)
  lcg(rh, rl, hiOf(k), k >>> 0)
  const g = fiddle(rh, rl)
  lcg(rh, rl, sh, sl)
  const h = fiddle(rh, rl)
  lcg(rh, rl, sh, sl)
  const n = fiddle(rh, rl)
  return (f + n) * (f + n) + (e + h) * (e + h) + (d + g) * (d + g)
}

export class BiomeManager {
  /**
   * @param zoomSeed obfuscateSeed(世界种子)
   * @param noiseBiome quart 坐标 → 生物群系（调用方负责缓存）
   */
  constructor(
    readonly zoomSeed: bigint,
    private readonly noiseBiome: (qx: number, qy: number, qz: number) => string
  ) {
    this.sh = Number(BigInt.asUintN(64, zoomSeed) >> 32n)
    this.sl = Number(BigInt.asUintN(32, zoomSeed))
  }

  private readonly sh: number
  private readonly sl: number

  getBiome(x: number, y: number, z: number): string {
    const i = x - 2
    const j = y - 2
    const k = z - 2
    const l = i >> 2
    const m = j >> 2
    const n = k >> 2
    const d = (i & 3) / 4.0
    const e = (j & 3) / 4.0
    const f = (k & 3) / 4.0
    let o = 0
    let g = Infinity
    for (let p = 0; p < 8; p++) {
      const bl = (p & 4) === 0
      const bl2 = (p & 2) === 0
      const bl3 = (p & 1) === 0
      const v = fiddledDistance(this.sh, this.sl, bl ? l : l + 1, bl2 ? m : m + 1, bl3 ? n : n + 1, bl ? d : d - 1.0, bl2 ? e : e - 1.0, bl3 ? f : f - 1.0)
      if (g > v) {
        o = p
        g = v
      }
    }
    return this.noiseBiome((o & 4) === 0 ? l : l + 1, (o & 2) === 0 ? m : m + 1, (o & 1) === 0 ? n : n + 1)
  }
}

/** 原版 BiomeManager.obfuscateSeed：Hashing.sha256().hashLong(seed).asLong() */
export function obfuscateSeed(seed: bigint): bigint {
  const bytes = new Uint8Array(8)
  let v = BigInt.asUintN(64, seed)
  for (let i = 0; i < 8; i++) {
    bytes[i] = Number(v & 0xffn) // Guava 的 putLong 是小端
    v >>= 8n
  }
  const h = sha256(bytes)
  let r = 0n
  for (let i = 7; i >= 0; i--) r = (r << 8n) | BigInt(h[i]) // asLong：前 8 个字节，小端
  return toSigned(r & MASK)
}

/** 最朴素的 SHA-256，只用来算上面这一个值 */
export function sha256(msg: Uint8Array): Uint8Array {
  const K = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ])
  const H = new Uint32Array([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19])
  const len = msg.length
  const total = Math.ceil((len + 9) / 64) * 64
  const buf = new Uint8Array(total)
  buf.set(msg)
  buf[len] = 0x80
  const bits = len * 8
  const view = new DataView(buf.buffer)
  view.setUint32(total - 4, bits >>> 0)
  view.setUint32(total - 8, Math.floor(bits / 0x100000000))
  const W = new Uint32Array(64)
  const rotr = (x: number, n: number) => (x >>> n) | (x << (32 - n))
  for (let off = 0; off < total; off += 64) {
    for (let t = 0; t < 16; t++) W[t] = view.getUint32(off + t * 4)
    for (let t = 16; t < 64; t++) {
      const s0 = rotr(W[t - 15], 7) ^ rotr(W[t - 15], 18) ^ (W[t - 15] >>> 3)
      const s1 = rotr(W[t - 2], 17) ^ rotr(W[t - 2], 19) ^ (W[t - 2] >>> 10)
      W[t] = (W[t - 16] + s0 + W[t - 7] + s1) >>> 0
    }
    let [a, b, c, d, e, f, g, h] = H
    for (let t = 0; t < 64; t++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)
      const ch = (e & f) ^ (~e & g)
      const t1 = (h + S1 + ch + K[t] + W[t]) >>> 0
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)
      const maj = (a & b) ^ (a & c) ^ (b & c)
      const t2 = (S0 + maj) >>> 0
      h = g
      g = f
      f = e
      e = (d + t1) >>> 0
      d = c
      c = b
      b = a
      a = (t1 + t2) >>> 0
    }
    H[0] += a
    H[1] += b
    H[2] += c
    H[3] += d
    H[4] += e
    H[5] += f
    H[6] += g
    H[7] += h
  }
  const out = new Uint8Array(32)
  const ov = new DataView(out.buffer)
  for (let i = 0; i < 8; i++) ov.setUint32(i * 4, H[i])
  return out
}
