/**
 * 挖掘进度（v10，原版 BlockBehaviour.getDestroyProgress，空手）：
 *   每 tick 的进度 = 挖掘速度 / 硬度 / (能掉东西 ? 30 : 100)
 * 空手的挖掘速度是 1；眼睛在水下（没有水下速掘）、脚不在地上各除以 5。
 * 硬度 0 的一下就掉（花草、火把）；硬度 -1 的挖不动（基岩）。
 * 例：泥土 0.5 → 每 tick 1/15，15 tick = 0.75 秒；石头 1.5 空手不掉东西 → 每 tick 1/150，7.5 秒
 */
export function destroyProgress(hardness: number, needsTool: boolean, onGround: boolean, underWater: boolean): number {
  if (hardness < 0) return 0
  if (hardness === 0) return 1
  let speed = 1
  if (underWater) speed /= 5
  if (!onGround) speed /= 5
  return speed / hardness / (needsTool ? 100 : 30)
}
