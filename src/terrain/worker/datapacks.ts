import type { PackInput } from '../worldgen'

/**
 * Worker 从哪里拿数据包。
 *
 * 1. /data/...            仓库自带：手抄的原版噪声参数 + demo 命名空间的简化地形
 * 2. /datapacks/<名字>/... 你自己放的数据包（不进 git），两种目录结构都认：
 *      datapacks/vanilla/worldgen/...                  （直接从 jar 的 data/minecraft 里拷出来）
 *      datapacks/vanilla/data/minecraft/worldgen/...   （标准数据包结构）
 *
 * 后加载的覆盖先加载的：放了原版数据后，minecraft:* 自动换成真正的原版定义。
 * 只匹配 noise / density_function / noise_settings / biome 四个目录，别的文件不会被打包进页面。
 */

// 自带数据很小，打包时直接内联
const builtin = import.meta.glob('/data/*/worldgen/{noise,density_function,noise_settings}/**/*.json', {
  eager: true,
  import: 'default'
})

// 你自己的数据包用懒加载。`npm run build:public`（--mode public）时这一支整个被删掉，
// 原版数据不会进入 dist/（版权原因）
const user: Record<string, () => Promise<unknown>> =
  import.meta.env.MODE === 'public'
    ? {}
    : {
        ...import.meta.glob('/datapacks/*/worldgen/{noise,density_function,noise_settings,biome,configured_feature,placed_feature}/**/*.json', { import: 'default' }),
        ...import.meta.glob('/datapacks/*/data/*/worldgen/{noise,density_function,noise_settings,biome,configured_feature,placed_feature}/**/*.json', {
          import: 'default'
        })
      }

export async function loadPacks(): Promise<PackInput[]> {
  const packs: PackInput[] = [{ name: 'builtin', files: builtin }]
  // "/datapacks/vanilla/worldgen/noise/x.json" → 包名 "vanilla"
  const byName = new Map<string, Record<string, unknown>>()
  await Promise.all(
    Object.entries(user).map(async ([path, load]) => {
      const name = path.split('/')[2]
      if (!byName.has(name)) byName.set(name, {})
      byName.get(name)![path] = await load()
    })
  )
  for (const [name, files] of [...byName].sort()) packs.push({ name, files })
  return packs
}
