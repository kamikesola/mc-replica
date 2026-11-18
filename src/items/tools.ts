import { BLOCK_BY_NAME, BLOCK_OF } from '../terrain/blocks'
import TOOL_DATA from './tools.json'
import type { ItemStack } from './items'

/**
 * 工具（v10.1，原版 1.21.4 的 minecraft:tool 组件）。每种工具有一串规则，每条规则说“这些方块”：
 *   speed    挖的速度（没写就看下一条）
 *   correct  算不算“对的工具”，决定要用工具的方块掉不掉东西（没写就看下一条）
 * 原版 Tool.getMiningSpeed / isCorrectForDrops：从前往后找第一条包含这个方块、并且写了这一项的规则。
 *
 * 比如铁镐：
 *   1. #incorrect_for_iron_tool（钻石矿以上……）         correct = false
 *   2. #mineable/pickaxe（石头、矿石……）    speed = 6，correct = true
 * 所以铁镐挖钻石矿：速度 6（第 1 条没写速度，看第 2 条），但不掉东西（第 1 条先说了 false）。
 *
 * 数据由 tools/vanilla/gen-items.py 从数据报告生成（tools.json）。
 */

interface Rule {
  blocks: Set<number>
  speed?: number
  correct?: boolean
}
export interface Tool {
  rules: Rule[]
  /** 不在任何规则里的方块的速度（原版 default_mining_speed，都是 1） */
  speed: number
  /** 挖一块掉多少耐久（剑是 2） */
  damage: number
}

type RawRule = { blocks: string | string[]; speed?: number; correct?: boolean }
const data = TOOL_DATA as {
  tools: Record<string, { rules: RawRule[]; speed?: number; damage?: number }>
  blockTags: Record<string, string[]>
  maxDamage: Record<string, number>
}

/** 方块名（或标签）→ 方块编号的集合 */
function blockSet(b: string | string[]): Set<number> {
  const names = typeof b === 'string' ? (b.startsWith('#') ? data.blockTags[b.slice(1)] : [b]) : b
  const out = new Set<number>()
  for (const n of names ?? []) {
    const id = BLOCK_BY_NAME[n]
    if (id !== undefined) out.add(BLOCK_OF[id])
  }
  return out
}

/** 物品名 → 工具；不是工具的物品没有 */
export const TOOLS = new Map<string, Tool>()
{
  // 同一个标签的集合只建一次（6 种镐共用 #mineable/pickaxe）
  const sets = new Map<string, Set<number>>()
  for (const [item, t] of Object.entries(data.tools)) {
    TOOLS.set(item, {
      rules: t.rules.map((r) => {
        const key = JSON.stringify(r.blocks)
        if (!sets.has(key)) sets.set(key, blockSet(r.blocks))
        return { blocks: sets.get(key)!, speed: r.speed, correct: r.correct }
      }),
      speed: t.speed ?? 1,
      damage: t.damage ?? 1
    })
  }
}

/** 物品的耐久上限（工具、盔甲、钓竿……）；没有耐久的返回 0 */
export const maxDamage = (item: string) => data.maxDamage[item] ?? 0

/** 用这个物品挖方块状态 s 的速度（空手、不是工具的物品都是 1） */
export function miningSpeed(item: string | undefined, s: number): number {
  const t = item ? TOOLS.get(item) : undefined
  if (!t) return 1
  const b = BLOCK_OF[s]
  for (const r of t.rules) if (r.speed !== undefined && r.blocks.has(b)) return r.speed
  return t.speed
}

/** 这个物品对方块状态 s 算不算“对的工具”（原版 ItemStack.isCorrectToolForDrops） */
export function isCorrectTool(item: string | undefined, s: number): boolean {
  const t = item ? TOOLS.get(item) : undefined
  if (!t) return false
  const b = BLOCK_OF[s]
  for (const r of t.rules) if (r.correct !== undefined && r.blocks.has(b)) return r.correct
  return false
}

/**
 * 挖掉一块后工具掉耐久（原版 Item.mineBlock → Tool：硬度不是 0 的方块才掉）。
 * 返回 false 表示工具坏了（调用的一方把它从背包里拿掉）
 */
export function damageTool(stack: ItemStack, hardness: number): boolean {
  const t = TOOLS.get(stack.item)
  const max = maxDamage(stack.item)
  if (!t || !max || hardness === 0 || t.damage === 0) return true
  stack.damage = (stack.damage ?? 0) + t.damage
  return stack.damage < max
}

/**
 * 创造模式里拿着剑、三叉戟、重锤不能挖方块（原版 Item.canAttackBlock：SwordItem、TridentItem、MaceItem 在创造模式返回 false）
 */
export function canBreakInCreative(item: string | undefined): boolean {
  return !item || !(item.endsWith('_sword') || item === 'minecraft:trident' || item === 'minecraft:mace' || item === 'minecraft:debug_stick')
}
