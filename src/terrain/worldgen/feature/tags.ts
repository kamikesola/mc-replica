/**
 * 地物要用到的方块标签（原版 data/minecraft/tags/block/*.json，1.21.4）。
 * blockTags.json 由 tools/vanilla/gen-tags.py 从原版 jar 展开生成（嵌套的 #标签 已经展开）；方块名省略 minecraft: 前缀。
 */
import RAW from './blockTags.json'

export const TAGS: Record<string, Set<string>> = Object.fromEntries(
  Object.entries(RAW as Record<string, string[]>).map(([k, v]) => [`minecraft:${k}`, new Set(v.map((n) => `minecraft:${n}`))])
)

/** 方块是否在标签里；不认识的标签当成空的 */
export function inTag(block: string, tag: string): boolean {
  const t = TAGS[tag.startsWith('#') ? tag.slice(1) : tag.includes(':') ? tag : `minecraft:${tag}`]
  return t ? t.has(block) : false
}
