# v9 开发日志

技术解析见 [../articles/v9-放方块.md](../articles/v9-放方块.md)。

## 目标

放方块时按原版的规则定状态，邻居变了跟着变（方块更新），右键能开关门。

## 过程

1. **坚固的面**：栅栏、墙、玻璃板的连接要看邻居的 `isFaceSturdy`。`BlockDump.java` 加了一个“按行为认方法”的探测：
   三个参数 (BlockGetter, BlockPos, Direction)、返回 boolean，石头 6 面都是、下半台阶只有底面是、空气都不是。
   一次认对，导出到 `blockShapes.json` 的 `sturdy`（6 位，原版 Direction 的顺序）。
2. **标签**：`gen-tags.py` 多展开 12 个标签（fences、wooden_fences、walls、fence_gates、stairs、slabs、doors、wooden_doors、
   trapdoors、wooden_trapdoors、beds、shulker_boxes）。原来的 51 个标签内容逐项比过，没有变。
3. **placement.ts**：getStateForPlacement、updateShape、neighborUpdates、useBlock 都是纯函数，只通过 `get` 读世界。
   测试里用 Map 当世界，11 个测试覆盖楼梯（含内外拐角）、台阶、栅栏、墙、玻璃板、门（门轴的三种情况、开门、挖掉一半）、床、火把和告示牌、
   原木、熔炉、活板门、两格高的花、雪层、snowy、含水。
4. **点在哪**：`Control` 记下射线打在面上的那一点（眼睛 + 方向 × 距离）。
5. **准星**：原来跳过所有“流体”，含水的方块（海草、含水的台阶）选不中。改成只跳过纯水、纯岩浆。
6. **挖掉含水的方块**：留下水源。
7. **浏览器里**：在天上铺一块草地，用真的准星瞄准、调用 `placeBlock`：栅栏一排、墙拐弯、楼梯、两边石砖中间一扇门、墙上的火把；
   再瞄准门右键，门开了。读回来的状态和预期一样（比如墙拐角 `south=low,west=low,up=true`，中间一段 `east=low,west=low,up=false`）。

## 简化

- 墙的 tall：原版看“上面那个方块的碰撞箱底面盖没盖住这一边”，这里用“上面的方块底面坚固，或者是同一边也连着的墙”
- 墙的柱子：上面是火把、告示牌之类的方块时原版看 `wall_post_override` 标签，这里用名字匹配
- 红石线、箱子、方块能否存活都没做

## 测试

`tests/placement.test.ts`（11 个）。全部测试：125 个通过。
