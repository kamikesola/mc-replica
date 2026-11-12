/**
 * net.minecraft.util.Mth 中世界生成会用到的部分。
 *
 * 约定：Java 的 double 直接对应 JS number；Java 的 float 运算用 Math.fround
 * 在每一步之后截断（见 CubicSpline）；Java 的 long 用 BigInt.asIntN(64, …)。
 */

const fround = Math.fround

/** Java `(int)` 截断 + 向下取整，等价于 Mth.floor(double) */
export function floor(value: number): number {
  return Math.floor(value)
}

/** Mth.lfloor：返回值在 Java 里是 long，这里数值范围足够，直接用 number */
export function lfloor(value: number): number {
  return Math.floor(value)
}

export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value
}

export function lerp(delta: number, start: number, end: number): number {
  return start + delta * (end - start)
}

/** float 版 lerp：Java 里参数和中间结果都是 float */
export function lerpF(delta: number, start: number, end: number): number {
  return fround(start + fround(delta * fround(end - start)))
}

export function lerp2(
  deltaX: number,
  deltaY: number,
  x0y0: number,
  x1y0: number,
  x0y1: number,
  x1y1: number
): number {
  return lerp(deltaY, lerp(deltaX, x0y0, x1y0), lerp(deltaX, x0y1, x1y1))
}

export function lerp3(
  deltaX: number,
  deltaY: number,
  deltaZ: number,
  x0y0z0: number,
  x1y0z0: number,
  x0y1z0: number,
  x1y1z0: number,
  x0y0z1: number,
  x1y0z1: number,
  x0y1z1: number,
  x1y1z1: number
): number {
  return lerp(
    deltaZ,
    lerp2(deltaX, deltaY, x0y0z0, x1y0z0, x0y1z0, x1y1z0),
    lerp2(deltaX, deltaY, x0y0z1, x1y0z1, x0y1z1, x1y1z1)
  )
}

/** 6t^5 - 15t^4 + 10t^3，Perlin 的五次缓动曲线 */
export function smoothstep(x: number): number {
  return x * x * x * (x * (x * 6.0 - 15.0) + 10.0)
}

export function inverseLerp(delta: number, start: number, end: number): number {
  return (delta - start) / (end - start)
}

/** 1.21.1 的参数顺序：clampedLerp(start, end, delta) */
export function clampedLerp(start: number, end: number, delta: number): number {
  if (delta < 0.0) return start
  return delta > 1.0 ? end : lerp(delta, start, end)
}

export function clampedMap(
  input: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
): number {
  return clampedLerp(outputMin, outputMax, inverseLerp(input, inputMin, inputMax))
}

/** Mth.binarySearch：返回第一个使 predicate 为真的下标，没有则返回 max */
export function binarySearch(min: number, max: number, predicate: (i: number) => boolean): number {
  let i = max - min
  while (i > 0) {
    const j = Math.floor(i / 2)
    const k = min + j
    if (predicate(k)) {
      i = j
    } else {
      min = k + 1
      i -= j + 1
    }
  }
  return min
}

/**
 * Mth.getSeed(x, y, z)：方块坐标 → 64 位种子，用于“位置随机”。
 *
 * ```java
 * long l = (long)(x * 3129871) ^ (long)z * 116129781L ^ (long)y;
 * l = l * l * 42317861L + l * 11L;
 * return l >> 16;
 * ```
 * 注意 `x * 3129871` 是 int 乘法，会先在 32 位里溢出。
 */
export function getSeed(x: number, y: number, z: number): bigint {
  const ix = BigInt(Math.imul(x | 0, 3129871))
  const iz = BigInt.asIntN(64, BigInt(z | 0) * 116129781n)
  let l = BigInt.asIntN(64, ix ^ iz ^ BigInt(y | 0))
  l = BigInt.asIntN(64, l * l * 42317861n + l * 11n)
  return l >> 16n
}

/** Java String.hashCode()：s[0]*31^(n-1) + … ，按 UTF-16 码元计算 */
export function javaStringHashCode(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(h, 31) + s.charCodeAt(i)) | 0
  }
  return h
}

/**
 * 把“创建世界”界面输入的种子文本变成 long，规则与原版一致：
 * 能解析成 long 就用数字，否则用 String.hashCode()；空字符串由调用方决定随机种子。
 */
export function parseWorldSeed(text: string): bigint {
  const t = text.trim()
  if (/^[+-]?\d+$/.test(t)) {
    const v = BigInt(t)
    if (v >= -(2n ** 63n) && v < 2n ** 63n) return v
  }
  return BigInt(javaStringHashCode(t))
}
