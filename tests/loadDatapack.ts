import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { PackInput } from '../src/terrain/worldgen/Worldgen'
import { Registry } from '../src/terrain/worldgen/registry/Registry'

/**
 * Node 端读取数据包目录（浏览器端用 Vite 的 import.meta.glob，见 src/terrain/worker/datapacks.ts）。
 * 只读 .json；路径 → ID 的规则由 Registry 统一处理，这里只负责把文件读出来。
 */
export function readPack(dir: string, name: string): PackInput {
  const files: Record<string, unknown> = {}
  const walk = (d: string) => {
    for (const entry of readdirSync(d)) {
      const p = join(d, entry)
      if (statSync(p).isDirectory()) walk(p)
      else if (entry.endsWith('.json')) files['/' + relative(join(dir, '..'), p)] = JSON.parse(readFileSync(p, 'utf8'))
    }
  }
  walk(dir)
  return { name, files }
}

export const repoPath = (p: string) => fileURLToPath(new URL(`../${p}`, import.meta.url))

/** 仓库自带的数据包 */
export const builtinPack = () => readPack(repoPath('data'), 'builtin')

/** 你自己放进 datapacks/vanilla 的原版数据；没有就返回 null（相关测试会跳过） */
export function vanillaPack(): PackInput | null {
  const dir = repoPath('datapacks/vanilla')
  return existsSync(dir) ? readPack(dir, 'vanilla') : null
}

/** 兼容旧写法 */
export function loadDir(registry: Registry, dir: string, name: string): number {
  return registry.addFiles(readPack(dir, name).files, name)
}
