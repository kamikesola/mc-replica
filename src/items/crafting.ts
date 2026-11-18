import { clickSlot, sameItem, withCount, type Inventory } from './inventory'
import { maxStack, type ItemStack } from './items'
import { CRAFT_REMAINDER, recipeBook, type RecipeBook } from './recipes'

/**
 * 合成格子（v10.1，原版 CraftingMenu / InventoryMenu 的合成部分 + ResultSlot）：
 *   背包里 2×2，工作台 3×3。格子里摆好东西，结果格就显示能做出什么；从结果格拿走一次，格子里每格少一个。
 *
 * 点结果格（原版 ResultSlot）：
 *   手上空，或者手上是同一种东西而且还叠得下 → 拿起一份结果；否则什么也不做
 *   Shift + 点 → 一直做，直到材料用完或者背包放不下（原版 quickMoveStack 对结果格的处理）
 * 关掉界面时，格子里剩下的东西回到背包（放不下的扔出去）
 */
export class CraftingGrid {
  readonly slots: (ItemStack | null)[]

  constructor(
    /** 2（背包）或 3（工作台） */
    readonly width: number,
    private readonly book: RecipeBook = recipeBook
  ) {
    this.slots = new Array(width * width).fill(null)
  }

  /** 现在能做出什么（结果格里显示的东西） */
  result(): ItemStack | null {
    return this.book.find(this.slots, this.width)?.result ?? null
  }

  /** 点格子里的一格，见 inventory.clickSlot */
  click(i: number, cursor: ItemStack | null, right = false): ItemStack | null {
    return clickSlot(this.slots, i, cursor, right)
  }

  /**
   * 做一次：每格少一个，留下“剩余物”（牛奶桶 → 空桶）。剩余物放回原来那格，那格还有东西就塞进背包，再放不下就返回给调用的一方扔掉。
   * 返回 [做出来的东西, 要扔掉的剩余物]；对不上配方返回 null
   */
  craftOnce(inv: Inventory): [ItemStack, ItemStack[]] | null {
    const r = this.result()
    if (!r) return null
    const dropped: ItemStack[] = []
    for (let i = 0; i < this.slots.length; i++) {
      const s = this.slots[i]
      if (!s) continue
      const rest = CRAFT_REMAINDER[s.item]
      this.slots[i] = s.count > 1 ? withCount(s, s.count - 1) : null
      if (!rest) continue
      const cur = this.slots[i]
      if (!cur) this.slots[i] = { item: rest, count: 1 }
      else if (cur.item === rest && cur.count < maxStack(rest)) cur.count++
      else if (inv.add(rest, 1)) dropped.push({ item: rest, count: 1 })
    }
    return [r, dropped]
  }

  /** 点结果格：返回点完以后手上的东西，和要扔掉的剩余物 */
  clickResult(cursor: ItemStack | null, inv: Inventory): [ItemStack | null, ItemStack[]] {
    const r = this.result()
    if (!r) return [cursor, []]
    if (cursor && !(sameItem(cursor, r) && cursor.count + r.count <= maxStack(r.item))) return [cursor, []]
    const [made, dropped] = this.craftOnce(inv)!
    return [cursor ? withCount(cursor, cursor.count + made.count) : made, dropped]
  }

  /** Shift + 点结果格：一直做到做不了为止，做出来的放进背包。返回做了几次和要扔掉的剩余物 */
  quickCraft(inv: Inventory): [number, ItemStack[]] {
    const dropped: ItemStack[] = []
    let n = 0
    let made0: ItemStack | undefined
    for (;;) {
      const r = this.result()
      // 原版：结果是同一种东西就一直做，直到材料用完或者背包放不下（每格最多 64 个，所以最多 64 次）
      if (!r || (made0 && !sameItem(r, made0)) || !inv.canAdd(r) || n >= 64) break
      made0 ??= r
      const [made, d] = this.craftOnce(inv)!
      inv.addStack(made)
      dropped.push(...d)
      n++
    }
    return [n, dropped]
  }

  /** 关掉界面：格子里的东西回背包，返回放不下的（调用的一方扔出去） */
  clear(inv: Inventory): ItemStack[] {
    const out: ItemStack[] = []
    for (let i = 0; i < this.slots.length; i++) {
      const s = this.slots[i]
      if (!s) continue
      this.slots[i] = null
      const left = inv.addStack(s)
      if (left) out.push(withCount(s, left))
    }
    return out
  }
}
