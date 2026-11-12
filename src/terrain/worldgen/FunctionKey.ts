/**
 * “要看哪个函数”的统一写法。
 *
 * 界面上的下拉框、地址栏参数、Worker 消息都用同一个字符串 key，避免每一层各自拼接：
 *
 *   router|minecraft:overworld|final_density   某个 noise_settings 的 noise_router 字段
 *   df|minecraft:overworld/continents          注册表里的一个密度函数
 *   noise|minecraft:continentalness            一个原始噪声（NormalNoise，坐标不缩放）
 */
export type FunctionKey =
  | { kind: 'router'; settings: string; field: string }
  | { kind: 'df'; id: string }
  | { kind: 'noise'; id: string }

export function encodeKey(k: FunctionKey): string {
  switch (k.kind) {
    case 'router':
      return `router|${k.settings}|${k.field}`
    case 'df':
      return `df|${k.id}`
    case 'noise':
      return `noise|${k.id}`
  }
}

export function parseKey(s: string): FunctionKey {
  const [kind, a, b] = s.split('|')
  if (kind === 'router' && a && b) return { kind, settings: a, field: b }
  if ((kind === 'df' || kind === 'noise') && a) return { kind, id: a }
  throw new Error(`无法识别的函数 key：${s}`)
}

/** 给人看的名字 */
export function describeKey(s: string): string {
  try {
    const k = parseKey(s)
    return k.kind === 'router' ? `${k.settings} → ${k.field}` : k.id
  } catch {
    return s
  }
}
