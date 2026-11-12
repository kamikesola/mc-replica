import { createVisitor, type DensityFunction, type FunctionContext, Marker } from './DensityFunction'

/**
 * 单点求值加速：给树里所有缓存标记（interpolated / flat_cache / cache_2d / cache_once / cache_all_in_cell）
 * 换上“记住上一个点”的缓存。
 *
 * 为什么有用：原版 final_density 里同一个子树会被引用很多次（例如 sloped_cheese、depth），
 * 单点求值时每次引用都要从头算一遍。这些子树在 JSON 里基本都包着缓存标记，
 * 记住“同一个 (x, y, z) 已经算过的值”，同一个点内的重复计算就省掉了。
 *
 * 和 NoiseChunk 不同，这里**不改变任何数值**：不插值、不按 4×4 量化，只是避免重复计算。
 * 所以结果与直接 compute() 完全相同，F3 对照照样可以用。
 */
export function withPointCache(fn: DensityFunction): DensityFunction {
  return fn.mapAll(createVisitor((node) => (node instanceof Marker ? new LastPointCache(node) : node)))
}

class LastPointCache implements DensityFunction {
  readonly type: string
  private x = NaN
  private y = NaN
  private z = NaN
  private value = 0

  constructor(private readonly marker: Marker) {
    this.type = marker.type
  }

  compute(ctx: FunctionContext): number {
    if (ctx.blockX !== this.x || ctx.blockY !== this.y || ctx.blockZ !== this.z) {
      this.value = this.marker.argument.compute(ctx)
      this.x = ctx.blockX
      this.y = ctx.blockY
      this.z = ctx.blockZ
    }
    return this.value
  }

  mapAll(): DensityFunction {
    return this
  }

  children(): DensityFunction[] {
    return [this.marker.argument]
  }
}
