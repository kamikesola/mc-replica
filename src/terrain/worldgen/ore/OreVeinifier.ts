import type { DensityFunction, FunctionContext } from '../density/DensityFunction'
import { clampedMap } from '../math/Mth'
import type { PositionalRandomFactory } from '../random/RandomSource'

/**
 * 矿脉（原版 OreVeinifier，1.18 起）：地下长长的铜矿脉、铁矿脉。
 *
 * 它不是“地物”，而是噪声阶段的一部分：密度 > 0（本来要放石头）的格子，先问矿脉要不要换成别的。
 *   vein_toggle > 0 → 铜矿脉（y 0..50，填充花岗岩），否则铁矿脉（y -60..-8，填充凝灰岩）
 *   |vein_toggle| 越大越“在矿脉里”，离上下边界 20 格以内逐渐变细
 *   vein_ridged < 0 才是矿脉的“脊”；vein_gap 决定矿石之间的空隙
 *   每格一个位置随机数：70% 的格子参与；参与的格子按概率是矿石（2% 是粗矿块）或填充石头
 *
 * 浮点常数在原版是 float（0.4F 等），和 double 比较时先转成 double，这里用 Math.fround 保持一致。
 */
const f = Math.fround

interface VeinType {
  ore: string
  raw: string
  filler: string
  minY: number
  maxY: number
}
const COPPER: VeinType = { ore: 'minecraft:copper_ore', raw: 'minecraft:raw_copper_block', filler: 'minecraft:granite', minY: 0, maxY: 50 }
const IRON: VeinType = { ore: 'minecraft:deepslate_iron_ore', raw: 'minecraft:raw_iron_block', filler: 'minecraft:tuff', minY: -60, maxY: -8 }

export type Veinifier = (ctx: FunctionContext) => string | null

export function createOreVeinifier(veinToggle: DensityFunction, veinRidged: DensityFunction, veinGap: DensityFunction, random: PositionalRandomFactory): Veinifier {
  return (ctx) => {
    const d = veinToggle.compute(ctx)
    const i = ctx.blockY
    const type = d > 0.0 ? COPPER : IRON
    const e = Math.abs(d)
    const j = type.maxY - i
    const k = i - type.minY
    if (k < 0 || j < 0) return null
    const l = Math.min(j, k)
    const g0 = clampedMap(l, 0.0, 20.0, -0.2, 0.0)
    if (e + g0 < f(0.4)) return null
    const r = random.at(ctx.blockX, i, ctx.blockZ)
    if (r.nextFloat() > f(0.7)) return null
    if (veinRidged.compute(ctx) >= 0.0) return null
    const g = clampedMap(e, f(0.4), f(0.6), f(0.1), f(0.3))
    if (r.nextFloat() < g && veinGap.compute(ctx) > f(-0.3)) {
      return r.nextFloat() < f(0.02) ? type.raw : type.ore
    }
    return type.filler
  }
}
