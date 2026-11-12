/**
 * 原版 NoiseRouterData.peaksAndValleys，用 float 计算。
 * 游戏 F3 调试屏里的 PV 不是从 noise_router 读的，而是拿 W（ridges）现算的。
 */
export function peaksAndValleys(weirdness: number): number {
  const f = Math.fround
  const w = f(weirdness)
  return f(-f(f(Math.abs(f(Math.abs(w) - f(0.6666667)))) - f(0.33333334)) * 3)
}
