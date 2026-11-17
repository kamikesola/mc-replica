import { maxStack, type ItemStack } from './items'

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
    const max = maxStack(item)
    for (let i = 0; i < 36 && count > 0; i++) {
      const s = this.slots[i]
      if (s && s.item === item && s.count < max) {
        const n = Math.min(count, max - s.count)
        s.count += n
        count -= n
      }
    }
    for (let i = 0; i < 36 && count > 0; i++) {
      if (this.slots[i]) continue
      const n = Math.min(count, max)
      this.slots[i] = { item, count: n }
      count -= n
    }
    return count
  }

  /** 从第 i 格拿走 n 个，返回拿到的 */
  take(i: number, n = 1): ItemStack | null {
    const s = this.slots[i]
    if (!s) return null
    const k = Math.min(n, s.count)
    s.count -= k
    if (s.count === 0) this.slots[i] = null
    return { item: s.item, count: k }
  }

  /**
   * 背包界面里点一格（原版 AbstractContainerMenu 的左键 / 右键 PICKUP）：
   *   手上空：左键拿起整组，右键拿起一半（向上取整）
   *   手上有：格子空或同种 → 左键放下全部（放不下的留在手上），右键放一个；不同种 → 交换
   * 返回点完以后手上的东西
   */
  click(i: number, cursor: ItemStack | null, right = false): ItemStack | null {
    const s = this.slots[i]
    if (!cursor) {
      if (!s) return null
      const k = right ? Math.ceil(s.count / 2) : s.count
      return this.take(i, k)
    }
    if (!s || s.item === cursor.item) {
      const max = maxStack(cursor.item)
      const have = s?.count ?? 0
      const n = Math.min(right ? 1 : cursor.count, max - have)
      if (n <= 0) return cursor
      this.slots[i] = { item: cursor.item, count: have + n }
      const left = cursor.count - n
      return left > 0 ? { item: cursor.item, count: left } : null
    }
    this.slots[i] = cursor
    return s
  }

  /** 存档用 */
  toJSON(): (ItemStack | null)[] {
    return this.slots.map((s) => (s ? { ...s } : null))
  }

  load(slots: (ItemStack | null)[] | undefined): void {
    for (let i = 0; i < 36; i++) this.slots[i] = slots?.[i] ? { ...slots[i]! } : null
  }
}
