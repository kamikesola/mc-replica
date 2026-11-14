# 架构说明（v5）

## 整体：和原项目一样，一个模块一个类

```ts
// src/main.ts
const core = new Core()                               // 场景、相机、渲染器
const player = new Player()                           // 玩家参数
const terrain = new Terrain(scene, camera)            // 区块
const control = new Control(scene, camera, player, terrain)  // 输入、移动、挖放
const ui = new UI(core, terrain, control)             // 菜单、HUD、调试

terrain.init(seed, settings)                          // 让 Worker 换种子

;(function animate() {
  requestAnimationFrame(animate)
  control.update(dt)   // 1. 累计时间，满 0.05 秒跑一个 tick（按键 → 原版移动公式 → 碰撞）；插值放相机；射线选方块
  terrain.update()     // 2. 按玩家位置加载 / 卸载区块
  ui.update()          // 3. 刷新 FPS、物品栏、F3、噪声图
  renderer.render(scene, camera)
})()
```

模块之间的依赖是单向的：`UI → Control → Terrain`，`Control → Player`。Terrain 不知道玩家和界面的存在。

## 一个区块是怎么来的

```text
 Terrain.update()                         主线程
   │ 视距内缺哪个区块？离玩家最近的先要
   ▼
 WorkerPool.call('chunk', {cx, cz})       terrain/worker/pool.ts（多个 Worker 并行）
   ▼
 generate.ts → generateChunk()            terrain/worker/surface.ts
   │ 1. NoiseChunk 算 final_density       ← terrain/worldgen（v0 的核心成果）
   │    > 0 石头（或矿脉，v5）；≤ 0 交给含水层：空气 / 水 / 岩浆 / 石头墙（v3）
   │ 2. 地表（v4）：原版 surface_rule（SurfaceSystem）按生物群系换成草 / 土 / 沙 / 陶瓦 / 雪……
   │    没有 surface_rule 的 noise_settings（demo）仍用 v0~v3 的临时规则
   │ 2.3 地物（v5）：周围 3×3 个区块放的矿石、树、积雪叠上来（见文末“区块的生成流程”）
   │ 2.5 每一列草 / 树叶 / 水的颜色：周围 5×5 列的生物群系颜色取平均，随区块一起传回主线程
   │ 3. 每 16 层切一个 section：
   │    PalettedContainer.fromValues()    ← terrain/chunk（调色板 + 位压缩）
   │    meshSection() 贪婪网格             ← terrain/mesh/mesher.ts
   ▼
 { sections[24], meshes[24] }  （ArrayBuffer 直接转移，不复制）
   ▼
 Terrain.onChunk()                         主线程
   │ 还原成 Section，每个 section 生成一个 THREE.Mesh 加进场景
   │ 如果这个区块被玩家改过（edits），先写回改动再在主线程重建涉及的 section
```

挖 / 放方块时：`Control` 用射线找到方块 → `Terrain.setBlock()` 改 section、记进 `edits` → 在主线程重建这个方块周围 3×3×3 涉及的 section（1~8 个，可能跨区块）。

## 区块的存储（v1）

```text
Chunk（16×16×384）
 └─ sections[24]：Section（16×16×16）
     ├─ nonAir           非空气方块数，0 时整段跳过
     └─ PalettedContainer
         ├─ bits = 0     单值：只有 palette[0]
         ├─ bits 4..8    间接：palette + BitStorage（存调色板下标）
         └─ bits > 8     直接：BitStorage 存方块 ID
```

段内下标 `(y * 16 + z) * 16 + x`，和原版相同。`Chunk.index()`（整根柱子内的编号）只给 `edits` 当 key 用。

## 网格与材质（v1）

- 一个 section 两个网格：不透明、水。每个顶点 10 字节：`position` Uint16×3（坐标 ×16）+ `info` Uint8×4（方向、纹理层、AO）。
- 所有方块共用一个 `ShaderMaterial`，纹理在一个 `DataArrayTexture` 里，纹理坐标和明暗在着色器里算。
- 生物群系颜色（v4）：草、树叶、水的纹理是灰度的，要染色的像素 alpha = 0 作标记；着色器按世界 x, z 从三张 512×512 的颜色图（每列一个像素，按区块写入）取颜色相乘。网格不用为颜色重建。
- 包围球写死为 section 的外接球（位置放大存储，three 自动算的不对）。

## 各目录

| 目录 | 文件 | 职责 |
| --- | --- | --- |
| `core/` | `index.ts` | 场景、相机、渲染器、雾 |
| `player/` | `index.ts` | 玩家状态（位置、上一 tick 位置、速度、姿势、水深……）、原版物理常数 `PHYSICS`、姿势表 `POSES` |
| `control/` | `index.ts` | 键鼠输入、20 TPS 循环 + 插值、镜头（眼高、摇晃、视野）、挖放方块、出生点 |
| | `movement.ts` | 一个 tick 的移动：原版的加速度、摩擦、跳跃、飞行、游泳、潜行、疾跑 |
| | `physics.ts` | AABB 按轴裁剪碰撞、抬步、潜行防掉落 |
| | `raycast.ts` | DDA 射线选方块 |
| `terrain/` | `index.ts` | 区块加载 / 卸载、`getBlock` / `setBlock`、改动记录、主线程重建网格 |
| | `chunk/Chunk.ts` | 一根区块柱：24 个 section + 每个 section 的网格 |
| | `chunk/Section.ts` | 16³ 的一段，非空气计数 |
| | `chunk/PalettedContainer.ts` | 调色板容器：单值 / 间接 / 直接三种模式，自动扩容 |
| | `chunk/BitStorage.ts` | 位压缩数组，值不跨整数 |
| | `blocks.ts` | 方块种类、每个面的纹理、是否实心、物品栏 |
| | `mesh/mesher.ts` | 贪婪网格：面剔除 + 顶点 AO + 合并；Worker 和主线程共用 |
| | `mesh/materials.ts` | 纹理数组 ShaderMaterial：不透明 / 水 / 线框；生物群系颜色图 |
| | `textures/painters.ts` | 用代码画 16 张纹理 |
| | `textures/index.ts` | 纹理数组 |
| | `fluid/FluidTicker.ts` | 流体流动：计划刻、getNewLiquid、spread、岩浆遇水 |
| | `highlight/` | 选中方块的线框 |
| | `worker/generate.ts` | Worker 入口：init / chunk / f3 / slice 四个方法 |
| | `worker/surface.ts` | 区块原型（密度 → 方块 → 矿脉 → 地表）；装配（+ 地物 + 颜色 + section 压缩 + 网格） |
| | `worker/pipeline.ts` | 区块源（v5）：缓存原型和装饰结果；4×4 区块的装饰区域 |
| | `worker/pool.ts` | Worker 池，请求交给最空闲的 Worker；区块请求按装饰区域固定分配（v5） |
| | `worker/protocol.ts` | 主线程 ↔ Worker 的消息类型 |
| | `worker/datapacks.ts` | 读取 `data/` 和 `datapacks/` |
| | `worldgen/` | 世界生成引擎，见下 |
| `ui/` | `index.ts` | 菜单、准星、物品栏、加载提示 |
| | `icons.ts` | 物品栏的立体方块图标 |
| | `debug/f3.ts` | F3 调试屏（NoiseRouter 一行、内存 / 网格统计）；G、K 键 |
| | `debug/noiseMap.ts` | M 键噪声图面板 |

## worldgen：v0 的核心

不依赖 DOM 和 three，Worker 和 Node 测试直接用。从底到上：

| 目录 | 内容 |
| --- | --- |
| `math/` | 原版 `Mth` 的函数、MD5 |
| `random/` | `LegacyRandomSource`（= java.util.Random）、`XoroshiroRandomSource`、位置随机工厂 |
| `noise/` | `ImprovedNoise` → `PerlinNoise` → `NormalNoise`，`BlendedNoise`，`SimplexNoise`，`PerlinSimplexNoise`（v4，群系温度 / 草色噪声） |
| `registry/` | 数据包注册表：文件路径 → 资源 ID |
| `aquifer/` | 含水层：格子中心点、水位、压力墙、全局流体、预估地表高度 |
| `biome/` | 生物群系（v4）：气候参数表（`Climate`、`OverworldBiomeBuilder`）、方块坐标 → 群系的抖动缩放（`BiomeManager`）、群系 JSON 里的温度 / 颜色（`Biome`） |
| `ore/` | 矿脉（v5，噪声阶段） |
| `feature/` | 地物（v5）：世界接口和各种提供者（`core`）、放置修饰器（`placement`）、矿石 / 圆盘 / 积雪 / 巨型蘑菇 / 选择器（`features`）、树（`tree`）、地物排序和区块装饰（`decorate`）、方块标签（`tags`） |
| `surface/` | 地表规则（v4）：规则 JSON → 函数（`SurfaceRules`）、逐列应用 + 恶地石柱 / 冰山 / 陶瓦条纹（`SurfaceSystem`） |
| `density/` | 密度函数的各种类型、JSON 解析、样条（float）、`RandomState`、`NoiseChunk`、`PointCache` |
| `Worldgen.ts` | 总入口 |

```text
 JSON 文件 ──Registry──► 未绑定种子的树 ──RandomState(种子)──► 可求值的树
                                                              ├─ compute()     单点（= 游戏 F3）
                                                              └─ NoiseChunk    区块（= 生成方块，带插值）
```

**解析和种子分离**：数据包只解析一次，换种子时用 `mapAll(visitor)` 把噪声节点换成带真实噪声的节点。原版也是这样做的。

**同一个 visitor 机制用了三次**：`RandomState` 接种子、`NoiseChunk` 换成插值 / 缓存、`PointCache` 换成单点缓存。

## 测试

| 文件 | 内容 |
| --- | --- |
| `tests/parity.test.ts` | 与 Java 参照实现逐位对拍 |
| `tests/density.test.ts` | 自带数据包的解析、共享、错误信息、NoiseChunk |
| `tests/vanilla.test.ts` | 原版数据（没有就跳过） |
| `tests/game.test.ts` | 射线、碰撞、区块生成 |
| `tests/chunk.test.ts` | 位压缩、调色板、贪婪网格、纹理 |
| `tests/fluid.test.ts` | 流体流动规则、流体表面高度、含水层（原版数据） |
| `tests/movement.test.ts` | 移动速度、跳跃、飞行、潜行、抬步、碰撞、游泳，对照原版数值 |
| `tests/feature.test.ts` | 地物排序、HashSet 顺序；矿脉、矿石、树和原版存档逐格对照（v5） |
| `tests/biome.test.ts` | 气候参数表、温度 / 草色、地表规则的每种条件、原版数据生成的区块（v4） |

## 区块的生成流程（v5）

```text
proto(cx, cz)            密度 → 方块（含水层、矿脉）→ 地表规则                     protoChunk()
decoration(cx, cz)       复制周围 3×3 个原型 → 先叠上同一装饰区域里排在前面的区块的装饰
                         → 按原版顺序放这个区块的地物（每步、每个地物一个种子）→ 记下改了哪些格子
withDecorations(cx, cz)  原型 + 周围 3×3 个区块的装饰（按区域、区域内先 z 后 x 的顺序叠）
generateChunk(cx, cz)    18×18 列（中间是 withDecorations，外圈来自邻居）→ 颜色 → section + 网格
```

原版对照工具在 `tools/vanilla/`：读原版存档（.mca / NBT）、逐格比较、生成测试数据，用法见那里的 README。

