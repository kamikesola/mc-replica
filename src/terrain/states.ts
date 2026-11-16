import DEFS from './stateDefs.json'

/**
 * 方块状态（v7）。对应原版的 BlockState / StateDefinition。
 *
 * 原版里“方块”和“方块状态”是两回事：橡木原木是一种方块，它有 axis = x / y / z 三个状态；
 * 树叶有 distance 1..7 × persistent × waterlogged = 28 个状态。世界里每一格存的是状态，而不是方块。
 * 原版一共约 2.7 万个状态，每个有一个全局编号，调色板的“直接模式”存的就是这个编号（15 位）。
 *
 * 我们的编号规则：
 *   - 方块 b 的默认状态编号就是 b（0..方块数−1）。所以 v6 以前所有写 BlockType.xxx 的代码，写进去的都是默认状态，意思不变
 *   - 其余状态从方块数开始，按方块顺序依次往后排；同一个方块内部的顺序和原版一样（属性按定义顺序，最后一个变得最快）
 *
 * 属性和取值来自原版的数据报告（tools/vanilla/gen-states.py 生成 stateDefs.json）。两种属性我们不当成状态：
 *   - 水、岩浆的 level：v3 起流动的水已经是单独的“方块”（量 1..7、下落），名字里按原版规则还原出 level
 *   - 一直含水的方块（海草、珊瑚……）的 waterlogged：总是 true
 */

/** 一个方块的状态定义 */
export interface StateDef {
  /** 原版方块名 */
  name: string
  /** 属性名、取值 */
  props: [string, string[]][]
  /** 每个属性在编号里的权重（最后一个是 1） */
  stride: number[]
  /** 状态个数 */
  count: number
  /** 默认状态在本方块内的下标 */
  defaultIndex: number
  /** 非默认状态的起始编号 */
  base: number
  /** 名字里固定加上的属性（level、waterlogged=true） */
  fixed: Record<string, string>
}

export interface StateRegistry {
  defs: StateDef[]
  /** 状态总数 */
  count: number
  /** 状态 → 方块 */
  blockOf: Uint8Array
  /** 状态 → 方块内下标 */
  indexOf: Uint16Array
}

const RAW = DEFS as unknown as Record<string, { props: [string, string[]][]; default: Record<string, string> }>

/**
 * 建状态表。
 * @param names     方块 → 原版名
 * @param fixed     方块 → 名字里固定加上的属性（这些属性不参与编号）
 */
export function buildStates(names: string[], fixed: (b: number) => Record<string, string>): StateRegistry {
  const defs: StateDef[] = []
  let next = names.length
  for (let b = 0; b < names.length; b++) {
    const name = names[b] ?? 'minecraft:air'
    const raw = RAW[name]
    // 固定属性只留原版确实有的（海草没有 waterlogged 属性）
    const fx = Object.fromEntries(Object.entries(fixed(b)).filter(([k]) => raw?.props.some(([n]) => n === k)))
    const props = (raw?.props ?? []).filter(([k]) => !(k in fx))
    const stride: number[] = []
    let count = 1
    for (let i = props.length - 1; i >= 0; i--) {
      stride[i] = count
      count *= props[i][1].length
    }
    let defaultIndex = 0
    props.forEach(([k, values], i) => (defaultIndex += values.indexOf(raw!.default[k]) * stride[i]))
    defs.push({ name, props, stride, count, defaultIndex, base: next, fixed: fx })
    next += count - 1
  }
  const blockOf = new Uint8Array(next)
  const indexOf = new Uint16Array(next)
  for (let b = 0; b < defs.length; b++) {
    const d = defs[b]
    for (let i = 0; i < d.count; i++) {
      const s = i === d.defaultIndex ? b : d.base + (i < d.defaultIndex ? i : i - 1)
      blockOf[s] = b
      indexOf[s] = i
    }
  }
  return { defs, count: next, blockOf, indexOf }
}

/** 方块 b 的第 i 个状态的编号 */
export function stateAt(r: StateRegistry, b: number, i: number): number {
  const d = r.defs[b]
  return i === d.defaultIndex ? b : d.base + (i < d.defaultIndex ? i : i - 1)
}

/** 状态的一个属性；没有这个属性时返回 undefined */
export function getProp(r: StateRegistry, s: number, prop: string): string | undefined {
  const d = r.defs[r.blockOf[s]]
  const p = d.props.findIndex(([k]) => k === prop)
  if (p < 0) return d.fixed[prop]
  return d.props[p][1][Math.floor(r.indexOf[s] / d.stride[p]) % d.props[p][1].length]
}

/** 改几个属性，返回新的状态（不认识的属性、取值忽略——和原版 setValue 不同，原版会报错） */
export function withProps(r: StateRegistry, s: number, props: Record<string, string | number | boolean>): number {
  const b = r.blockOf[s]
  const d = r.defs[b]
  let i = r.indexOf[s]
  for (const [k, v] of Object.entries(props)) {
    const p = d.props.findIndex(([n]) => n === k)
    if (p < 0) continue
    const vi = d.props[p][1].indexOf(String(v))
    if (vi < 0) continue
    const cur = Math.floor(i / d.stride[p]) % d.props[p][1].length
    i += (vi - cur) * d.stride[p]
  }
  return stateAt(r, b, i)
}

/** 所有属性（包括固定的） */
export function propsOf(r: StateRegistry, s: number): Record<string, string> {
  const d = r.defs[r.blockOf[s]]
  const out: Record<string, string> = { ...d.fixed }
  d.props.forEach(([k, values], p) => (out[k] = values[Math.floor(r.indexOf[s] / d.stride[p]) % values.length]))
  return out
}

/** 原版存档里的写法：minecraft:oak_log[axis=x]，属性按名字排序 */
export function stateName(r: StateRegistry, s: number): string {
  const d = r.defs[r.blockOf[s]]
  const p = propsOf(r, s)
  const keys = Object.keys(p).sort()
  return keys.length ? `${d.name}[${keys.map((k) => `${k}=${p[k]}`).join(',')}]` : d.name
}
