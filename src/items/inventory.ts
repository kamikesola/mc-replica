import { maxStack, type ItemStack } from './items'

/** 两组东西能不能叠在一起：同一种物品，耐久也一样（v10.1：工具用过以后就不一样了） */
export const sameItem = (a: ItemStack, b: ItemStack) => a.item === b.item && (a.damage ?? 0) === (b.damage ?? 0)

/** 复制一组，改个数 */
export const withCount = (s: ItemStack, count: number): ItemStack => (s.damage ? { item: s.item, count, damage: s.damage } : { item: s.item, count })

/**
 * 在界面里点一格（原版 AbstractContainerMenu 的左键 / 右键 PICKUP）：
 *   手上空：左键拿起整组，右键拿起一半（向上取整）
 *   手上有：格子空或同种 → 左键放下全部（放不下的留在手上），右键放一个；不同种 → 交换
 * 返回点完以后手上的东西。v10.1 起背包、合成格子都用它
 */
export function clickSlot(slots: (ItemStack | null)[], i: number, cursor: ItemStack | null, right = false): ItemStack | null {
  const s = slots[i]
  if (!cursor) {
    if (!s) return null
    const k = right ? Math.ceil(s.count / 2) : s.count
    slots[i] = s.count - k > 0 ? withCount(s, s.count - k) : null
    return withCount(s, k)
  }
  if (!s || sameItem(s, cursor)) {
    const max = maxStack(cursor.item)
    const have = s?.count ?? 0
    const n = Math.min(right ? 1 : cursor.count, max - have)
    if (n <= 0) return cursor
    slots[i] = withCount(cursor, have + n)
    const left = cursor.count - n
    return left > 0 ? withCount(cursor, left) : null
  }
  slots[i] = cursor
  return s
}

/**
 * 背包（v10，原版 Inventory 的物品部分）：36 格，0..8 是物品栏（屏幕底下那一排），9..35 是背包里的三排。
 *
 * 捡东西时（原版 Inventory.add）：先往已经有同种物品、还没满的格子里塞（从物品栏开始），再放进第一个空格，
 * 还放不下的留在地上。
 */
export class Inventory {
  readonly slots: (ItemStack | null)[] = new Array(36).fill(null)

  /** 放进去，返回放不下的个数 */
  add(item: string, count: number): number {
    return this.addStack({ item, count })
  }

  /** 同上，v10.1：带耐久的工具也能放 */
  addStack(st: ItemStack, from = 0, to = 36): number {
    const max = maxStack(st.item)
    let count = st.count
    for (let i = from; i < to && count > 0; i++) {
      const s = this.slots[i]
      if (s && sameItem(s, st) && s.count < max) {
        const n = Math.min(count, max - s.count)
        s.count += n
        count -= n
      }
    }
    for (let i = from; i < to && count > 0; i++) {
      if (this.slots[i]) continue
      const n = Math.min(count, max)
      this.slots[i] = withCount(st, n)
      count -= n
    }
    return count
  }

  /** 能不能全放进去（v10.1：Shift 点合成结果时，放不下就不做） */
  canAdd(st: ItemStack): boolean {
    const max = maxStack(st.item)
    let room = 0
    for (const s of this.slots) room += !s ? max : sameItem(s, st) ? max - s.count : 0
    return room >= st.count
  }

  /** 从第 i 格拿走 n 个，返回拿到的 */
  take(i: number, n = 1): ItemStack | null {
    const s = this.slots[i]
    if (!s) return null
    const k = Math.min(n, s.count)
    s.count -= k
    if (s.count === 0) this.slots[i] = null
    return withCount(s, k)
  }

  /** 背包界面里点一格，见 clickSlot */
  click(i: number, cursor: ItemStack | null, right = false): ItemStack | null {
    return clickSlot(this.slots, i, cursor, right)
  }

  /**
   * Shift + 点一格（原版 InventoryMenu.quickMoveStack）：物品栏的挪到背包里，背包里的挪到物品栏，挪不完的留在原地
   */
  quickMove(i: number): void {
    const s = this.slots[i]
    if (!s) return
    this.slots[i] = null
    const left = i < 9 ? this.addStack(s, 9, 36) : this.addStack(s, 0, 9)
    if (left) this.slots[i] = withCount(s, left)
  }

  /** 存档用 */
  toJSON(): (ItemStack | null)[] {
    return this.slots.map((s) => (s ? { ...s } : null))
  }

  load(slots: (ItemStack | null)[] | undefined): void {
    for (let i = 0; i < 36; i++) this.slots[i] = slots?.[i] ? { ...slots[i]! } : null
  }
}
