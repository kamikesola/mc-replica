/** 一些到处都会用到的小工具 */

export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)

/** document.getElementById 的简写，带类型 */
export const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T

/** 读地址栏参数，例如 ?seed=42&settings=minecraft:overworld */
export const query = (key: string): string | null => new URLSearchParams(location.search).get(key)

/** 区块坐标的 Map key */
export const chunkKey = (cx: number, cz: number) => `${cx},${cz}`
