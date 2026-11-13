/**
 * worldgen：与界面无关的世界生成引擎（v0 的全部成果）。只依赖标准 JS，Worker、Node 测试都直接用。
 *
 * 目录按“从底层到上层”排列：
 *
 *   math/      Mth 工具函数、MD5
 *   random/    随机源（Legacy / Xoroshiro）与位置随机工厂
 *   noise/     ImprovedNoise → PerlinNoise → NormalNoise，以及 BlendedNoise、SimplexNoise
 *   registry/  数据包注册表：文件路径 → 资源 ID
 *   density/   密度函数：JSON 解析、绑定种子（RandomState）、区块级求值（NoiseChunk）
 *   Worldgen.ts  总入口，把上面几层串起来
 *
 * 一般只需要从这里导入 Worldgen；写测试或文章示例时也可以单独导入某一层。
 */
export { Worldgen, type PackInput } from './Worldgen'
export { encodeKey, parseKey, describeKey, type FunctionKey } from './FunctionKey'
export { NoiseChunk, type Region } from './density/NoiseChunk'
export { withPointCache } from './density/PointCache'
export { Fluid, type Aquifer } from './aquifer/Aquifer'
export type { DensityFunction, FunctionContext } from './density/DensityFunction'
export type { TreeNode } from './density/describe'
export type { NoiseSettingsInfo, RouterField } from './density/DensityFunctionParser'
export { ROUTER_FIELDS } from './density/DensityFunctionParser'
export { parseWorldSeed } from './math/Mth'
export { LegacyRandomSource } from './random/LegacyRandomSource'
export { XoroshiroRandomSource } from './random/XoroshiroRandomSource'
export { NormalNoise } from './noise/NormalNoise'
