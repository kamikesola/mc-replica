import { LootTables } from './loot'

/**
 * 读方块的战利品表（v10，主线程，按需）。放在数据包里，和世界生成数据一样（见 datapacks/README.md）：
 *   datapacks/vanilla/loot_table/blocks/*.json              （从 jar 的 data/minecraft/ 里拷出来）
 *   datapacks/vanilla/data/minecraft/loot_table/blocks/*.json（标准数据包结构）
 * 没有这些文件时，挖掉的方块掉它自己（Control 里处理）。
 */
const files: Record<string, () => Promise<unknown>> =
  import.meta.env.MODE === 'public'
    ? {}
    : {
        ...import.meta.glob('/datapacks/*/loot_table/blocks/*.json', { import: 'default' }),
        ...import.meta.glob('/datapacks/*/data/minecraft/loot_table/blocks/*.json', { import: 'default' })
      }

/** "minecraft:blocks/stone" → 加载函数 */
const byName = new Map<string, () => Promise<unknown>>()
for (const [path, load] of Object.entries(files)) byName.set(`minecraft:blocks/${path.split('/').pop()!.replace('.json', '')}`, load)

const tables = new Map<string, Record<string, unknown>>()
export const lootTables = new LootTables(tables)

/** 有没有战利品表可用 */
export const hasLootTables = () => byName.size > 0

/** 确保这张表读进来了（第一次挖某种方块时读） */
export async function loadLootTable(name: string): Promise<void> {
  if (tables.has(name)) return
  const load = byName.get(name)
  if (load) tables.set(name, (await load()) as Record<string, unknown>)
}
