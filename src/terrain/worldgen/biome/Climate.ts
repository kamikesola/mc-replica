import type { FunctionContext } from '../density/DensityFunction'

/**
 * 气候参数（原版 Climate）。生物群系不是“按区域画”出来的，而是查表：
 *
 *   1. 在一个位置算出 6 个数：温度、湿度、大陆性、侵蚀度、深度、怪异度（都来自 noise_router）
 *   2. 表里每个生物群系占 6 维空间里的一个“盒子”（每一维一个区间），外加一个偏移量
 *   3. 找离这个点最近的盒子，就是这里的生物群系
 *
 * 原版把所有数先乘 10000 再转成整数（quantizeCoord），比较全用整数，这里照做，结果才能和原版一模一样。
 */

/** 原版 Climate.quantizeCoord：(long)(f * 10000.0F)，注意是 float 乘法 */
export function quantize(f: number): number {
  return Math.trunc(Math.fround(Math.fround(f) * 10000))
}

/** 一维区间 [min, max]（已量化） */
export class Parameter {
  constructor(
    readonly min: number,
    readonly max: number
  ) {
    if (min > max) throw new Error(`区间下界大于上界：${min} > ${max}`)
  }

  static point(f: number): Parameter {
    return Parameter.span(f, f)
  }

  /** span(float, float) 或 span(Parameter, Parameter)：后者取前一个的 min、后一个的 max */
  static span(a: number | Parameter, b: number | Parameter): Parameter {
    const min = typeof a === 'number' ? quantize(a) : a.min
    const max = typeof b === 'number' ? quantize(b) : b.max
    return new Parameter(min, max)
  }

  /** 点到区间的距离：在区间里是 0 */
  distance(v: number): number {
    const l = v - this.max
    const m = this.min - v
    return l > 0 ? l : Math.max(m, 0)
  }
}

/** 表里的一项：6 个区间 + 偏移量 */
export interface ParameterPoint {
  temperature: Parameter
  humidity: Parameter
  continentalness: Parameter
  erosion: Parameter
  depth: Parameter
  weirdness: Parameter
  /** 已量化 */
  offset: number
}

export function parameters(
  temperature: Parameter,
  humidity: Parameter,
  continentalness: Parameter,
  erosion: Parameter,
  depth: Parameter,
  weirdness: Parameter,
  offset: number
): ParameterPoint {
  return { temperature, humidity, continentalness, erosion, depth, weirdness, offset: quantize(offset) }
}

/** 一个位置的 6 个气候值（已量化），顺序和原版 TargetPoint 一样 */
export type TargetPoint = [number, number, number, number, number, number]

/** 原版 ParameterPoint.fitness：各维距离的平方和 + 偏移量的平方 */
export function fitness(p: ParameterPoint, t: TargetPoint): number {
  const a = p.temperature.distance(t[0])
  const b = p.humidity.distance(t[1])
  const c = p.continentalness.distance(t[2])
  const d = p.erosion.distance(t[3])
  const e = p.depth.distance(t[4])
  const f = p.weirdness.distance(t[5])
  return a * a + b * b + c * c + d * d + e * e + f * f + p.offset * p.offset
}

/**
 * 参数表：找最近的一项。
 * 原版用 R 树加速，并且会从“上一次的结果”开始找；距离完全相同（平局）时结果取决于查找顺序，
 * 原版自己在不同线程里也可能不同。这里的结果固定为“按表的顺序第一个最小的”（原版的 findValueBruteForce）。
 *
 * v5：逐项比较一次要 160 µs（7593 项），地物的 biome 过滤要查很多次，太慢。
 * 现在先把表建成一棵包围盒树（每个节点记下子项 7 个维度的最小 / 最大值），查找时先算到包围盒的距离下界，
 * 下界比当前最好的还大就整棵子树跳过；距离相等时比较表里的序号，所以结果和逐项比较完全一样。
 */
interface BoxNode {
  min: Float64Array
  max: Float64Array
  children: BoxNode[] | null
  /** 叶子：表里的序号 */
  items: number[] | null
}

const DIMS = 7

export class ParameterList<T> {
  private readonly lo: Float64Array
  private readonly hi: Float64Array
  private readonly root: BoxNode

  constructor(readonly values: [ParameterPoint, T][]) {
    const n = values.length
    this.lo = new Float64Array(n * DIMS)
    this.hi = new Float64Array(n * DIMS)
    values.forEach(([p], i) => {
      const ps = [p.temperature, p.humidity, p.continentalness, p.erosion, p.depth, p.weirdness]
      for (let d = 0; d < 6; d++) {
        this.lo[i * DIMS + d] = ps[d].min
        this.hi[i * DIMS + d] = ps[d].max
      }
      this.lo[i * DIMS + 6] = this.hi[i * DIMS + 6] = p.offset
    })
    this.root = this.build(values.map((_, i) => i))
  }

  private build(items: number[]): BoxNode {
    const min = new Float64Array(DIMS).fill(Infinity)
    const max = new Float64Array(DIMS).fill(-Infinity)
    for (const i of items)
      for (let d = 0; d < DIMS; d++) {
        min[d] = Math.min(min[d], this.lo[i * DIMS + d])
        max[d] = Math.max(max[d], this.hi[i * DIMS + d])
      }
    if (items.length <= 8) return { min, max, children: null, items }
    // 按中心点分布最散的那一维排序，切成 6 份
    let best = 0
    let spread = -1
    for (let d = 0; d < DIMS; d++) {
      let a = Infinity
      let b = -Infinity
      for (const i of items) {
        const c = this.lo[i * DIMS + d] + this.hi[i * DIMS + d]
        a = Math.min(a, c)
        b = Math.max(b, c)
      }
      if (b - a > spread) {
        spread = b - a
        best = d
      }
    }
    const sorted = items.slice().sort((x, y) => this.lo[x * DIMS + best] + this.hi[x * DIMS + best] - (this.lo[y * DIMS + best] + this.hi[y * DIMS + best]))
    const per = Math.ceil(sorted.length / 6)
    const children: BoxNode[] = []
    for (let k = 0; k < sorted.length; k += per) children.push(this.build(sorted.slice(k, k + per)))
    return { min, max, children, items: null }
  }

  /** 上一次的结果：先拿它的距离当上界，剪枝快很多（原版 RTree 也这样做，结果和逐项比较一样） */
  private last = 0
  private readonly target = new Float64Array(DIMS)

  private dist(i: number): number {
    const t = this.target
    const lo = this.lo
    const hi = this.hi
    let s = 0
    for (let d = 0, o = i * DIMS; d < DIMS; d++, o++) {
      const v = t[d]
      const e = v < lo[o] ? lo[o] - v : v > hi[o] ? v - hi[o] : 0
      s += e * e
    }
    return s
  }

  /** 盒子到目标的距离下界 */
  private lowerBound(node: BoxNode): number {
    const target = this.target
    let lb = 0
    for (let d = 0; d < DIMS; d++) {
      const v = target[d]
      const e = v < node.min[d] ? node.min[d] - v : v > node.max[d] ? v - node.max[d] : 0
      lb += e * e
    }
    return lb
  }
  /** find 用的栈（复用，不每次分配）：节点和它的距离下界 */
  private readonly stackNodes: BoxNode[] = []
  private readonly stackLbs = new Float64Array(512)

  /**
   * 找最近的一项：距离最小，一样近时取表里靠前的（和逐项比较、原版的结果一样）。
   * v10.3：子盒子按距离下界从近到远访问，先找到近的，后面能剪掉更多；结果只取决于“最小距离 + 最小序号”，和访问顺序无关
   */
  find(t: TargetPoint): T {
    const target = this.target
    for (let d = 0; d < 6; d++) target[d] = t[d]
    target[6] = 0
    let bestIdx = this.last
    let best = this.dist(bestIdx)
    const nodes = this.stackNodes
    const lbs = this.stackLbs
    let sp = 0
    nodes[sp] = this.root
    lbs[sp++] = this.lowerBound(this.root)
    while (sp > 0) {
      sp--
      const node = nodes[sp]
      if (lbs[sp] > best) continue
      if (node.items) {
        for (const i of node.items) {
          const s2 = this.dist(i)
          if (s2 < best || (s2 === best && i < bestIdx)) {
            best = s2
            bestIdx = i
          }
        }
        continue
      }
      // 子盒子入栈，按下界从大到小排好（插入排序），栈顶是最近的
      const base = sp
      for (const c of node.children!) {
        const lb = this.lowerBound(c)
        if (lb > best) continue
        let k = sp++
        while (k > base && lbs[k - 1] < lb) {
          nodes[k] = nodes[k - 1]
          lbs[k] = lbs[k - 1]
          k--
        }
        nodes[k] = c
        lbs[k] = lb
      }
    }
    this.last = bestIdx
    return this.values[bestIdx][1]
  }

  /** 逐项比较的版本（测试用来对照） */
  findBruteForce(t: TargetPoint): T {
    let best = Infinity
    let result = this.values[0][1]
    for (const [p, v] of this.values) {
      const d = fitness(p, t)
      if (d < best) {
        best = d
        result = v
      }
    }
    return result
  }
}

/** 计算 6 个气候值用的 router 字段 */
export interface ClimateSampler {
  temperature: (ctx: FunctionContext) => number
  vegetation: (ctx: FunctionContext) => number
  continents: (ctx: FunctionContext) => number
  erosion: (ctx: FunctionContext) => number
  depth: (ctx: FunctionContext) => number
  ridges: (ctx: FunctionContext) => number
}

/** 原版 Climate.Sampler.sample：在 quart 坐标 (x, y, z) 对应的方块位置求值，转 float 后量化 */
export function sampleClimate(s: ClimateSampler, qx: number, qy: number, qz: number): TargetPoint {
  const ctx: FunctionContext = { blockX: qx * 4, blockY: qy * 4, blockZ: qz * 4 }
  return [
    quantize(s.temperature(ctx)),
    quantize(s.vegetation(ctx)),
    quantize(s.continents(ctx)),
    quantize(s.erosion(ctx)),
    quantize(s.depth(ctx)),
    quantize(s.ridges(ctx))
  ]
}
