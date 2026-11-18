import RECIPE_DATA from './recipes.json'
import type { ItemStack } from './items'

/**
 * 工作台配方（v10.1，原版 1.21.4 的 RecipeManager / ShapedRecipe / ShapelessRecipe / TransmuteRecipe）。
 *
 * 配方表由 tools/vanilla/gen-items.py 从 jar 里的 data/minecraft/recipe/ 生成（recipes.json，964 个）。三种：
 *
 *   有序（shaped）    图案要对上，比如木镐 "XXX / ␣#␣ / ␣#␣"。图案放在格子里哪个位置都行（先把格子
 *                     里空的行列裁掉再比），左右镜像也算（原版 ShapedRecipePattern.matches 的 mirrored）
 *   无序（shapeless） 只要东西对，放哪都行：原木 → 4 个木板、染料混色……
 *                     每个原料要配上不同的一格（二分图匹配，原版 StackedContents.canCraft）
 *   换色（transmute） 正好两样：一个“输入”（潜影盒）加一个“材料”（染料）→ 换成别的物品（染色的潜影盒）
 *
 * 原料可以是一种物品（"minecraft:stick"）、一个物品标签（"#minecraft:planks"：所有木板都行）或几种物品的列表。
 *
 * 熔炉、切石机、锻造台的配方和特殊配方（烟花、地图复制、修理……）还没有。
 */

type RawIngredient = string | string[]
type RawRecipe =
  | { type: 'shaped'; pattern: string[]; key: Record<string, RawIngredient>; result: { id: string; count: number } }
  | { type: 'shapeless'; ingredients: RawIngredient[]; result: { id: string; count: number } }
  | { type: 'transmute'; input: RawIngredient; material: RawIngredient; result: { id: string; count: number } }

/** 一个原料 = 能用的物品的集合 */
type Ingredient = Set<string>

interface Shaped {
  id: string
  type: 'shaped'
  w: number
  h: number
  /** w×h，空格是 null */
  cells: (Ingredient | null)[]
  /** 左右对称的图案不用再比镜像 */
  symmetric: boolean
  count: number
  result: ItemStack
}
interface Shapeless {
  id: string
  type: 'shapeless'
  ingredients: Ingredient[]
  result: ItemStack
}
interface Transmute {
  id: string
  type: 'transmute'
  input: Ingredient
  material: Ingredient
  result: ItemStack
}
export type Recipe = Shaped | Shapeless | Transmute

/**
 * 合成后留在格子里的东西（原版 Item.Properties.craftRemainder）：做蛋糕的牛奶桶 → 空桶，蜂蜜瓶 → 玻璃瓶
 */
export const CRAFT_REMAINDER: Record<string, string> = {
  'minecraft:milk_bucket': 'minecraft:bucket',
  'minecraft:water_bucket': 'minecraft:bucket',
  'minecraft:lava_bucket': 'minecraft:bucket',
  'minecraft:honey_bottle': 'minecraft:glass_bottle',
  'minecraft:dragon_breath': 'minecraft:glass_bottle'
}

export class RecipeBook {
  readonly recipes: Recipe[] = []
  readonly itemTags: Record<string, string[]>

  constructor(data: { recipes: Record<string, RawRecipe>; itemTags: Record<string, string[]> }) {
    this.itemTags = data.itemTags
    const cache = new Map<string, Ingredient>()
    const ing = (x: RawIngredient): Ingredient => {
      const key = JSON.stringify(x)
      let s = cache.get(key)
      if (!s) {
        s = new Set((Array.isArray(x) ? x : [x]).flatMap((v) => (v.startsWith('#') ? (this.itemTags[v.slice(1)] ?? []) : [v])))
        cache.set(key, s)
      }
      return s
    }
    // 按配方名排序（原版几乎没有两个配方能对上同一种摆法，顺序基本不影响结果）
    for (const id of Object.keys(data.recipes).sort()) {
      const r = data.recipes[id]
      const result = { item: r.result.id, count: r.result.count ?? 1 }
      if (r.type === 'shaped') {
        // 原版 ShapedRecipePattern.shrink：去掉图案四周的空行空列
        let rows = r.pattern
        while (rows.length && !rows[0].trim()) rows = rows.slice(1)
        while (rows.length && !rows[rows.length - 1].trim()) rows = rows.slice(0, -1)
        let left = 0
        let right = Math.max(...rows.map((l) => l.length))
        while (left < right && rows.every((l) => (l[left] ?? ' ') === ' ')) left++
        while (right > left && rows.every((l) => (l[right - 1] ?? ' ') === ' ')) right--
        const w = right - left
        const h = rows.length
        const cells: (Ingredient | null)[] = []
        for (const l of rows) for (let x = left; x < right; x++) cells.push((l[x] ?? ' ') === ' ' ? null : ing(r.key[l[x]]))
        let symmetric = true
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (cells[y * w + x] !== cells[y * w + (w - 1 - x)]) symmetric = false
        this.recipes.push({ id, type: 'shaped', w, h, cells, symmetric, count: cells.filter(Boolean).length, result })
      } else if (r.type === 'shapeless') {
        this.recipes.push({ id, type: 'shapeless', ingredients: r.ingredients.map(ing), result })
      } else {
        this.recipes.push({ id, type: 'transmute', input: ing(r.input), material: ing(r.material), result })
      }
    }
  }

  /**
   * 合成格子（width × width，行优先）里摆的东西能做什么。对不上任何配方返回 null。
   * 原版 CraftingInput.ofPositioned：先裁掉四周空的行列
   */
  find(grid: (ItemStack | null)[], width: number): { recipe: Recipe; result: ItemStack } | null {
    const height = grid.length / width
    let x0 = width
    let x1 = -1
    let y0 = height
    let y1 = -1
    for (let y = 0; y < height; y++)
      for (let x = 0; x < width; x++)
        if (grid[y * width + x]) {
          x0 = Math.min(x0, x)
          x1 = Math.max(x1, x)
          y0 = Math.min(y0, y)
          y1 = Math.max(y1, y)
        }
    if (x1 < 0) return null
    const w = x1 - x0 + 1
    const h = y1 - y0 + 1
    const items: (string | null)[] = []
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) items.push(grid[y * width + x]?.item ?? null)
    const present = items.filter((i): i is string => i !== null)

    for (const r of this.recipes) {
      if (!this.matches(r, items, w, h, present)) continue
      return { recipe: r, result: { ...r.result } }
    }
    return null
  }

  private matches(r: Recipe, items: (string | null)[], w: number, h: number, present: string[]): boolean {
    if (r.type === 'shaped') {
      if (r.w !== w || r.h !== h || r.count !== present.length) return false
      const test = (mirror: boolean) => {
        for (let y = 0; y < h; y++)
          for (let x = 0; x < w; x++) {
            const cell = r.cells[y * w + (mirror ? w - 1 - x : x)]
            const it = items[y * w + x]
            if (cell === null ? it !== null : it === null || !cell.has(it)) return false
          }
        return true
      }
      return test(false) || (!r.symmetric && test(true))
    }
    if (r.type === 'shapeless') {
      if (r.ingredients.length !== present.length) return false
      return perfectMatch(r.ingredients, present)
    }
    // transmute：正好两样，一个输入一个材料（原版 TransmuteRecipe.matches）
    if (present.length !== 2) return false
    let hasInput = false
    let hasMaterial = false
    for (const it of present) {
      if (!hasInput && r.input.has(it)) hasInput = true
      else if (!hasMaterial && r.material.has(it)) hasMaterial = true
      else return false
    }
    return hasInput && hasMaterial
  }
}

/** 每个原料配一个不同的物品，能不能全配上（增广路的二分图匹配；最多 9 个，随便算） */
function perfectMatch(ings: Ingredient[], items: string[]): boolean {
  const owner = new Array<number>(items.length).fill(-1)
  const tryAssign = (i: number, seen: boolean[]): boolean => {
    for (let j = 0; j < items.length; j++) {
      if (seen[j] || !ings[i].has(items[j])) continue
      seen[j] = true
      if (owner[j] < 0 || tryAssign(owner[j], seen)) {
        owner[j] = i
        return true
      }
    }
    return false
  }
  for (let i = 0; i < ings.length; i++) if (!tryAssign(i, new Array(items.length).fill(false))) return false
  return true
}

/** 原版的配方表 */
export const recipeBook = new RecipeBook(RECIPE_DATA as unknown as ConstructorParameters<typeof RecipeBook>[0])

/** 物品标签里有没有这个物品（战利品表的 match_tool 用） */
export const inItemTag = (tag: string, item: string) => recipeBook.itemTags[tag]?.includes(item) ?? false
