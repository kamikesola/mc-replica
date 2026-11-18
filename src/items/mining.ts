/**
 * 挖掘进度（v10，原版 BlockBehaviour.getDestroyProgress / Player.getDestroySpeed）：
 *   每 tick 的进度 = 挖掘速度 / 硬度 / (能掉东西 ? 30 : 100)
 * 挖掘速度：空手是 1；v10.1 起拿着工具挖它擅长的方块更快（items/tools.ts：木 2、石 4、铁 6、钻石 8、下界合金 9、金 12）。
 * 眼睛在水下（没有水下速掘）、脚不在地上各除以 5。
 * “能掉东西”：方块不要求工具，或者手上是对的工具（铁镐挖钻石矿 → 能；木镐挖铁矿 → 不能）。
 * 硬度 0 的一下就掉（花草、火把）；硬度 -1 的挖不动（基岩）。
 * 例：泥土 0.5 空手 → 每 tick 1/15，15 tick = 0.75 秒；石头 1.5 空手不掉东西 → 每 tick 1/150，7.5 秒；
 *     石头用木镐 → 2 / 1.5 / 30，23 tick ≈ 1.15 秒
 */
export function destroyProgress(hardness: number, noDrops: boolean, onGround: boolean, underWater: boolean, speed = 1): number {
  if (hardness < 0) return 0
  if (hardness === 0) return 1
  if (underWater) speed /= 5
  if (!onGround) speed /= 5
  return speed / hardness / (noDrops ? 100 : 30)
}
