import {
  Ap2,
  BlendDensity,
  BlendedNoiseFunction,
  Clamp,
  Constant,
  type DensityFunction,
  EndIslands,
  FixedValue,
  Mapped,
  Marker,
  Noise,
  RangeChoice,
  Reference,
  ShiftedNoise,
  ShiftNoise,
  Spline,
  type SplineNode,
  WeirdScaledSampler,
  YClampedGradient
} from './DensityFunction'

/**
 * 把一棵（未绑定种子的）密度函数树转成可显示的结构，给 demo 的“函数结构”面板用。
 *
 * 引用节点（"minecraft:xxx"）不展开，只给出 ID —— 原版主世界的 final_density
 * 完全展开有上千个节点，逐层点进去看才看得懂。
 */
export interface TreeNode {
  /** 节点类型，如 "add"、"spline"、"noise" */
  type: string
  /** 参数摘要，如 "noise=minecraft:ridge xz=0.25 y=0" */
  detail?: string
  /** 子节点的角色名，如 "argument1"、"coordinate"、"@-0.11" */
  role?: string
  /** 如果是引用，给出被引用的 ID，界面上可以点进去 */
  ref?: string
  children: TreeNode[]
}

const n = (v: number) => (Number.isInteger(v) ? v.toFixed(1) : String(v))

export function describe(fn: DensityFunction, role?: string): TreeNode {
  const node = (type: string, detail?: string, children: TreeNode[] = []): TreeNode => ({ type, detail, role, children })

  if (fn instanceof Reference) return { type: 'reference', ref: fn.id, detail: fn.id, role, children: [] }
  if (fn instanceof Constant) return node('constant', n(fn.value))
  if (fn instanceof YClampedGradient) {
    return node('y_clamped_gradient', `y ${fn.fromY}→${fn.toY} 映射到 ${n(fn.fromValue)}→${n(fn.toValue)}`)
  }
  if (fn instanceof Noise) return node('noise', `${fn.noise.id}  xz×${fn.xzScale}  y×${fn.yScale}`)
  if (fn instanceof ShiftNoise) return node(fn.type, fn.offsetNoise.id)
  if (fn instanceof ShiftedNoise) {
    return node('shifted_noise', `${fn.noise.id}  xz×${fn.xzScale}  y×${fn.yScale}`, [
      describe(fn.shiftX, 'shift_x'),
      describe(fn.shiftY, 'shift_y'),
      describe(fn.shiftZ, 'shift_z')
    ])
  }
  if (fn instanceof BlendedNoiseFunction) {
    const p = fn.params
    return node(
      'old_blended_noise',
      `xz_scale=${p.xzScale} y_scale=${p.yScale} xz_factor=${p.xzFactor} y_factor=${p.yFactor} smear=${p.smearScaleMultiplier}`
    )
  }
  if (fn instanceof EndIslands) return node('end_islands')
  if (fn instanceof FixedValue) return node(fn.type, `恒为 ${n(fn.value)}`)
  if (fn instanceof Marker) return node(fn.type, undefined, [describe(fn.argument, 'argument')])
  if (fn instanceof BlendDensity) return node('blend_density', '无旧区块混合时直接透传', [describe(fn.argument, 'argument')])
  if (fn instanceof Mapped) return node(fn.type, undefined, [describe(fn.input, 'argument')])
  if (fn instanceof Ap2) {
    return node(fn.type, undefined, [describe(fn.argument1, 'argument1'), describe(fn.argument2, 'argument2')])
  }
  if (fn instanceof Clamp) return node('clamp', `[${n(fn.min)}, ${n(fn.max)}]`, [describe(fn.input, 'input')])
  if (fn instanceof RangeChoice) {
    return node('range_choice', `input ∈ [${n(fn.minInclusive)}, ${n(fn.maxExclusive)})`, [
      describe(fn.input, 'input'),
      describe(fn.whenInRange, 'when_in_range'),
      describe(fn.whenOutOfRange, 'when_out_of_range')
    ])
  }
  if (fn instanceof WeirdScaledSampler) {
    return node('weird_scaled_sampler', `${fn.noise.id}  ${fn.rarityValueMapper}`, [describe(fn.input, 'input')])
  }
  if (fn instanceof Spline) return { ...describeSpline(fn.node), role }
  return node(fn.type, '（未知节点）')
}

function describeSpline(s: SplineNode, role?: string): TreeNode {
  if (typeof s === 'number') return { type: 'constant', detail: n(s), role, children: [] }
  return {
    type: 'spline',
    detail: `${s.locations.length} 个控制点`,
    role,
    children: [
      describe(s.coordinate, 'coordinate'),
      ...s.locations.map((loc, i) => {
        const child = describeSpline(s.values[i], `@${loc}`)
        if (s.derivatives[i] !== 0) child.detail = `${child.detail ?? ''}  斜率 ${s.derivatives[i]}`.trim()
        return child
      })
    ]
  }
}
