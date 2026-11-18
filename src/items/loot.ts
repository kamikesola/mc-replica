import { BLOCK_OF, NAME_BY_BLOCK, propOf } from '../terrain/blocks'
import type { ItemStack } from './items'
import { inItemTag } from './recipes'

/**
 * 战利品表（v10，原版 LootTable）：方块被挖掉时掉什么。原版每种方块一个 JSON（data/minecraft/loot_table/blocks/），比如：
 *
 *   石头      → 圆石（要用镐，见 blocks.NEEDS_TOOL）
 *   草方块    → 泥土（用精准采集的工具才掉草方块）
 *   矮草      → 用剪刀掉矮草，否则 1/8 的概率掉小麦种子
 *   橡树树叶  → 用剪刀或精准采集掉树叶，否则 1/20 掉树苗、1/50 掉木棍、1/200 掉苹果
 *
 * 一个表有几个“池”（pool），每个池抽 rolls 次，每次从满足条件的条目里按权重抽一个，再按函数改数量。
 * 这里实现了方块表里常用的那些条件、条目、函数。v10.1 起有了工具：match_tool 会看手上拿的是什么（剪刀剪树叶掉树叶、
 * 剪草掉草）；还没有附魔，所以要精准采集的条件一律不满足，时运等级当成 0。
 */

type Json = Record<string, unknown>
type NumberProvider = number | { type?: string; min?: NumberProvider; max?: NumberProvider; n?: NumberProvider; p?: NumberProvider; value?: NumberProvider }

export class LootTables {
  constructor(
    /** 表名（"minecraft:blocks/stone"）→ JSON */
    private readonly tables: Map<string, Json>,
    private readonly random: () => number = Math.random
  ) {}

  get size(): number {
    return this.tables.size
  }

  /** 挖的时候手上拿的物品（v10.1，match_tool 用） */
  private tool: string | undefined

  /** 方块状态 s 被挖掉时掉的东西；没有表返回 null（调用的一方决定怎么办）。tool：手上拿的物品 */
  blockDrops(s: number, tool?: string): ItemStack[] | null {
    this.tool = tool
    const name = NAME_BY_BLOCK[BLOCK_OF[s]]
    const t = this.tables.get(name.replace('minecraft:', 'minecraft:blocks/'))
    if (!t) return null
    const out: ItemStack[] = []
    for (const pool of (t.pools as Json[] | undefined) ?? []) this.pool(pool, s, out)
    // 同种物品合在一起
    const merged = new Map<string, number>()
    for (const st of out) if (st.count > 0) merged.set(st.item, (merged.get(st.item) ?? 0) + st.count)
    return [...merged].map(([item, count]) => ({ item, count }))
  }

  private pool(pool: Json, s: number, out: ItemStack[]): void {
    if (!this.conditions(pool.conditions as Json[] | undefined, s)) return
    const rolls = Math.floor(this.num(pool.rolls as NumberProvider))
    for (let r = 0; r < rolls; r++) {
      // 展开条目（alternatives 取第一个满足条件的，group 全要），按权重抽一个
      const choices: { entry: Json; weight: number }[] = []
      for (const e of (pool.entries as Json[]) ?? []) this.expand(e, s, choices)
      if (!choices.length) continue
      const total = choices.reduce((a, c) => a + c.weight, 0)
      let k = this.random() * total
      const pick = choices.find((c) => (k -= c.weight) < 0) ?? choices[choices.length - 1]
      this.create(pick.entry, s, out)
    }
    this.functions(pool.functions as Json[] | undefined, s, out)
  }

  /** 原版 LootPoolEntryContainer.expand：条件不满足的不要；组合条目展开成具体的“掉一个物品” */
  private expand(e: Json, s: number, out: { entry: Json; weight: number }[]): boolean {
    if (!this.conditions(e.conditions as Json[] | undefined, s)) return false
    const type = String(e.type).replace('minecraft:', '')
    const children = (e.children as Json[] | undefined) ?? []
    if (type === 'alternatives') {
      for (const c of children) if (this.expand(c, s, out)) return true
      return false
    }
    if (type === 'group') {
      for (const c of children) this.expand(c, s, out)
      return true
    }
    if (type === 'sequence') {
      for (const c of children) if (!this.expand(c, s, out)) break
      return true
    }
    if (type === 'item' || type === 'empty') {
      out.push({ entry: e, weight: Number(e.weight ?? 1) })
      return true
    }
    return false // loot_table、tag、dynamic（潜影盒的内容……）：不支持
  }

  private create(e: Json, s: number, out: ItemStack[]): void {
    if (String(e.type).endsWith('empty')) return
    const stack = [{ item: String(e.name), count: 1 }]
    this.functions(e.functions as Json[] | undefined, s, stack)
    out.push(...stack)
  }

  private functions(fns: Json[] | undefined, s: number, stacks: ItemStack[]): void {
    for (const f of fns ?? []) {
      if (!this.conditions(f.conditions as Json[] | undefined, s)) continue
      const name = String(f.function).replace('minecraft:', '')
      for (const st of stacks) {
        if (name === 'set_count') {
          const n = Math.floor(this.num(f.count as NumberProvider))
          st.count = f.add ? st.count + n : n
        } else if (name === 'limit_count') {
          const lim = f.limit as NumberProvider | { min?: NumberProvider; max?: NumberProvider }
          if (typeof lim === 'number') st.count = Math.min(st.count, lim)
          else {
            if (lim.min !== undefined) st.count = Math.max(st.count, this.num(lim.min as NumberProvider))
            if (lim.max !== undefined) st.count = Math.min(st.count, this.num(lim.max as NumberProvider))
          }
        } else if (name === 'apply_bonus') {
          // 时运 0 级：ore_drops、uniform_bonus_count 不变；binomial_with_bonus_count 还是会多掉（作物的种子）
          const formula = String(f.formula).replace('minecraft:', '')
          if (formula === 'binomial_with_bonus_count') {
            const p = f.parameters as { extra: number; probability: number }
            for (let i = 0; i < p.extra; i++) if (this.random() < p.probability) st.count++
          }
        }
        // explosion_decay（没有爆炸）、copy_components、copy_state、set_components……不影响数量，跳过
      }
    }
  }

  private conditions(cs: Json[] | undefined, s: number): boolean {
    return (cs ?? []).every((c) => this.condition(c, s))
  }

  private condition(c: Json, s: number): boolean {
    const type = String(c.condition).replace('minecraft:', '')
    switch (type) {
      case 'survives_explosion':
        return true
      case 'random_chance':
        return this.random() < Number(this.num(c.chance as NumberProvider))
      case 'table_bonus':
        return this.random() < (c.chances as number[])[0] // 附魔 0 级
      case 'inverted':
        return !this.condition(c.term as Json, s)
      case 'any_of':
        return (c.terms as Json[]).some((t) => this.condition(t, s))
      case 'all_of':
        return (c.terms as Json[]).every((t) => this.condition(t, s))
      case 'block_state_property': {
        const props = (c.properties as Record<string, string | { min?: string; max?: string }>) ?? {}
        return Object.entries(props).every(([k, v]) => {
          const have = propOf(s, k)
          if (typeof v === 'string') return have === v
          const n = Number(have)
          return (v.min === undefined || n >= Number(v.min)) && (v.max === undefined || n <= Number(v.max))
        })
      }
      case 'entity_properties':
        // 挖方块的那个实体（玩家）存在；带具体条件的（着火了吗、穿什么……）不支持
        return c.entity === 'this' && Object.keys((c.predicate as Json) ?? {}).length === 0
      case 'match_tool': {
        // v10.1：{"items": "minecraft:shears"} / {"items": "#minecraft:cluster_max_harvestables"}；
        // 附魔条件（{"predicates": {"minecraft:enchantments": ...}}，精准采集）还没有附魔，不满足
        const p = (c.predicate as Json) ?? {}
        if (p.predicates) return false
        if (p.items === undefined) return true
        const tool = this.tool
        if (!tool) return false
        const list = Array.isArray(p.items) ? (p.items as string[]) : [String(p.items)]
        return list.some((i) => (i.startsWith('#') ? inItemTag(i.slice(1), tool) : i === tool))
      }
      // entity_properties、location_check……：方块表里很少用到，当作不满足
      default:
        return false
    }
  }

  private num(p: NumberProvider | undefined): number {
    if (p === undefined) return 1
    if (typeof p === 'number') return p
    const type = String(p.type ?? 'minecraft:uniform').replace('minecraft:', '')
    if (type === 'constant') return this.num(p.value)
    if (type === 'binomial') {
      const n = this.num(p.n)
      const prob = this.num(p.p)
      let k = 0
      for (let i = 0; i < n; i++) if (this.random() < prob) k++
      return k
    }
    // uniform：[min, max] 之间的浮点数（原版 UniformGenerator.getFloat；整数用的时候再向下取整）
    const min = this.num(p.min)
    const max = this.num(p.max)
    return min + this.random() * (max - min)
  }
}
