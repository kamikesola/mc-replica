# 架构说明（v6）

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
   │ 2.2 雕刻器（v5.1）：洞穴、峡谷，周围 ±8 个区块起头的都算（v5.2 起下界也有）
   │ 2.3 地物（v5 / v5.1）：周围 3×3 个区块放的地物叠上来（见文末“区块的生成流程”）
   │ 2.5 每一列草 / 树叶 / 水的颜色：周围 5×5 列的生物群系颜色取平均，随区块一起传回主线程
   │ 3. 每 16 层切一个 section：
   │    PalettedContainer.fromValues()    ← terrain/chunk（调色板 + 位压缩）
   ▼
 { sections[24], blocks（不压缩）, tints }  （ArrayBuffer 直接转移，不复制）
   ▼
 Terrain.onChunk()                         主线程
   │ 还原成 Section，留一份不压缩的 flat；被玩家改过（edits）的写回去
   ▼
 Terrain.update()：周围 8 个区块都生成好了？（v6）
   ▼
 WorkerPool.call('light', {chunks: 3×3 份 flat})
   ▼
 generate.ts → meshChunk()                terrain/worker/surface.ts
   │ lightChunk()：3×3 个区块一起算天空光、方块光   ← terrain/light/LightEngine.ts
   │ meshSection() 贪婪网格 + 平滑光照              ← terrain/mesh/mesher.ts
   ▼
 { light（18×18 列）, meshes[24] }
   ▼
 Terrain：每个 section 生成一个 THREE.Mesh 加进场景；算的时候方块变了就作废重来
```

挖 / 放方块时：`Control` 用射线找到方块 → `Terrain.setBlock()` 改 section、记进 `edits` → 光照增量更新（`light/LightUpdater.ts`，v6）→ 在主线程重建这个方块周围 3×3×3、以及亮度变了的格子周围涉及的 section（可能跨区块）。

每帧（v6）：`Sky.update()` 按时间算光照贴图、天空色、雾色 → 先用单独的相机画天空（清屏色 = 雾色）→ 清深度 → 画地形。

## 区块的存储（v1）

```text
Chunk（16×16×384）
 └─ sections[24]：Section（16×16×16）
     ├─ nonAir           非空气方块数，0 时整段跳过
     └─ PalettedContainer
         ├─ bits = 0     单值：只有 palette[0]
         ├─ bits 4..8    间接：palette + BitStorage（存调色板下标）
         └─ bits > 8     直接：BitStorage 存方块状态编号（v7 起 12 位）
```

段内下标 `(y * 16 + z) * 16 + x`，和原版相同。`Chunk.index()`（整根柱子内的编号）只给 `edits` 当 key 用。

## 方块状态（v7）

每一格存的是**状态编号**（`Uint16`），不是方块编号。规则（`terrain/states.ts`）：方块 b 的默认状态编号就是 b；
其余状态排在所有方块后面，同一方块内部的顺序和原版状态 ID 一样。所有表（`SOLID`、`SHAPE`、`FACE_TEXTURES`、`FLUIDS`、
`LIGHT_BLOCK`……）都按状态查，长度 = `STATE_COUNT`；`BLOCK_OF[状态]` 是它的方块。
地物用字符串传状态（`minecraft:oak_log[axis=x]`，属性按名字排序，和原版存档一样），`WorldGenLevel.setBlock` 负责换成编号。
区块和周围 8 个都生成后有一步“落定”（`worldgen/feature/settle.ts`，目前是树叶的 distance），在 Worker 的 `light` 里和光照一起做。

## 原版全部方块（v8.1）

`blocks.ts` 里手写的 234 种（编号从 v1 起就定了）后面，按原版注册顺序接上其余的方块（`blockList.json`），一共 1109 种（含流体的各个状态）、27816 个状态，
调色板直接模式 15 位。新方块的属性全部来自原版：属性和取值（数据报告），光照、碰撞箱、破坏时间（`BlockDump.java` 从服务端导出），样子（资源包的模型）。
按状态的数据都按原版的状态顺序存，`states.vanillaIndex` 把我们的状态换算成原版的下标。玩家的碰撞用 `COLLISION`（`control/index.ts` 的 `collisionBoxes`）。

## 放方块（v9）

`terrain/placement.ts`，纯函数，世界通过 `PlaceWorld.get` 读：`placement` 算出要写的格子（门、床是两格），
`updateShape` 是“邻居变了我变成什么”，`neighborUpdates` 把变化一层层往外传。`Control.placeBlock` / `breakBlock` 调用它们，
写入走 `Terrain.setBlock`（重建网格、更新光照、记改动）。连接要看邻居“坚固的面”（`STURDY`，原版 isFaceSturdy）。

## 物品和生存模式（v10）

`src/items/`：`items.ts`（物品表、物品 ↔ 方块）、`inventory.ts`（背包）、`loot.ts` + `lootLoader.ts`（战利品表，主线程按需读）、
`entities.ts`（地上的物品的物理）、`render.ts`（画地上的物品、裂纹）、`mining.ts`（挖掘进度）。
`Control` 持有背包、游戏模式、地上的物品，每个 tick 推进挖掘和物品；UI 的物品栏 / 背包界面读 `control.inventory`。

v10.1：`recipes.ts`（`RecipeBook`：964 个工作台配方，`find(格子, 宽)` 先裁掉空行空列再逐个比）、`crafting.ts`（`CraftingGrid`：
合成格子、结果格的点击、Shift 连续合成、剩余物）、`tools.ts`（`miningSpeed` / `isCorrectTool` / `damageTool`，原版 tool 组件的规则）。
数据都由 `tools/vanilla/gen-items.py` 从数据报告和 jar 生成（`recipes.json`、`tools.json`，进 git）。合成格子归 UI 管（关界面时清空），
右键工作台由 `Control.onOpenScreen` 通知 UI 打开 3×3。`ItemStack.damage` 是用掉的耐久，背包的叠放比较 `sameItem`（物品和耐久都一样）。

## 红石（v9.1）

`terrain/redstone.ts`：`Redstone` 有一个待处理队列（neighborChanged）和计划刻表。`Terrain.updateBlock` 写入后调用 `changed` + `process`，
`Terrain.tick` 调用 `tick`（到期的计划刻 → 再 process）。信号查询（`signalAt`、`bestNeighborSignal`）照原版的强弱充能规则；
红石线的形状由 `placement.updateShape` 调 `wireShape`。

## 方块模型（v7.1）

有原版资源包（`resourcepacks/`）时，方块的样子来自原版模型：

1. 主线程读资源包（`terrain/models/pack.ts`，只读用到的方块状态文件和它们引用的模型、parent），
   烘焙成“每个状态 → 部分 → 带权重的候选 → 四边形”（`models/bakery.ts`），发给每个 Worker（Worker 方法 `models`）。
2. 两边都调用 `setModels`（`models/index.ts`）生成网格要查的表：`USE_MODEL`、`OCCLUDES`（挡不挡邻居）、`SKIPS_SAME`、
   `SPLIT`（每个候选拆成“能贪婪合并的整面”和“其他四边形”）、`FACE_LOOKS`（面的样子：纹理层、染色字段、纹理映射 M·D + c）。
3. `meshSection`：整面照样贪婪合并；其他四边形逐个输出（`modelQuads`），平滑光照按顶点位置插值。
   多候选的模型按世界坐标挑（`Mth.getSeed` + LegacyRandomSource，和原版一样），所以 `meshSection` 要知道 section 的世界坐标（`origin`）。

纹理数组 = 程序画的纹理（v1~v7）+ 资源包的纹理。没有资源包、或者状态没有模型（箱子）时用 v7 的画法。

## 存档（v8）

`src/save/`：

- `store.ts`：IndexedDB（测试里用内存版）。worlds 一个世界一条；chunks 是改过的区块（键 `世界id|cx,cz`）；files 是导入的原版存档的文件
- `WorldSave.ts`：打开着的世界。打开时读出改动交给 `Terrain.edits`（区块加载时写回去，v0 起就是这样），
  `writeBlock` 记下改过的区块，`main.ts` 每 10 秒调用 `save`
- 原版存档：`Terrain.load` 先看区域文件里有没有这个区块（`anvil.regionChunk`，主线程只切片），有就发给 Worker 解码（`vanillaChunk`），
  没有或没生成完就照常生成。原版方块到我们的方块的对应在 `blockMap.ts`

## 网格与材质（v1）

- 一个 section 两个网格：不透明、半透明（水、冰）。每个顶点 20 字节（v7.1）：`position` Uint16×3（坐标 ×256）+ `uv` Int16×2（纹理坐标 ×256，v7.1）+ `info` Uint16×4（方向、纹理层、AO、染色字段）+ `light` Uint8×2（v6：天空光、方块光，各是 4 格之和）。
- 光照（v6）：顶点着色器用 `light` 查 16×16 的光照贴图（每帧按时间更新），再乘方向明暗和 AO。雾是原版的圆柱形雾。
- 所有方块共用一个 `ShaderMaterial`，纹理在一个 `DataArrayTexture` 里。v7.1 之前纹理坐标在着色器里按位置算，之后顶点里直接存（模型的面可以转 90°、只用一小块纹理）。
- 生物群系颜色（v4）：草、树叶、水的纹理是灰度的，要染色的像素 alpha = 0 作标记；着色器按世界 x, z 从三张 512×512 的颜色图（每列一个像素，按区块写入）取颜色相乘。网格不用为颜色重建。
- 包围球写死为 section 的外接球（位置放大存储，three 自动算的不对）。

## 各目录

| 目录 | 文件 | 职责 |
| --- | --- | --- |
| `core/` | `index.ts` | 场景、相机、渲染器、雾（空气里的雾由 sky/ 每帧给） |
| `sky/` | `formulas.ts` | 昼夜和光照贴图的公式（v6）：timeOfDay、skyDarken、天空色、雾色、日出日落、星星位置、lightmap |
| | `index.ts` | 天空的渲染：天空盘、日出日落扇形、太阳、月亮、星星；每帧更新光照贴图 |
| `player/` | `index.ts` | 玩家状态（位置、上一 tick 位置、速度、姿势、水深……）、原版物理常数 `PHYSICS`、姿势表 `POSES` |
| `control/` | `index.ts` | 键鼠输入、20 TPS 循环 + 插值、镜头（眼高、摇晃、视野）、挖放方块、出生点 |
| | `movement.ts` | 一个 tick 的移动：原版的加速度、摩擦、跳跃、飞行、游泳、潜行、疾跑 |
| | `physics.ts` | AABB 按轴裁剪碰撞、抬步、潜行防掉落 |
| | `raycast.ts` | DDA 射线选方块 |
| `terrain/` | `index.ts` | 区块加载 / 卸载、`getBlock` / `setBlock`、改动记录、主线程重建网格 |
| | `chunk/Chunk.ts` | 一根区块柱：24 个 section + 每个 section 的网格；不压缩的方块 flat、光照 light（v6） |
| | `light/LightEngine.ts` | 光照引擎（v6）：光照属性表、天空光源、按亮度分桶的扩散、区块光照、网格用的光照邻域 |
| | `light/LightUpdater.ts` | 挖放方块后的增量更新（v6）：熄灭 + 点亮 |
| | `light/lightProps.json` | 每种方块的 [lightBlock, lightEmission]，`tools/vanilla/gen-blocks.py` 从原版 jar 导出（v8.1 起所有方块，按状态） |
| | `chunk/Section.ts` | 16³ 的一段，非空气计数 |
| | `chunk/PalettedContainer.ts` | 调色板容器：单值 / 间接 / 直接三种模式，自动扩容 |
| | `chunk/BitStorage.ts` | 位压缩数组，值不跨整数 |
| | `blocks.ts` | 方块种类、每个面的纹理、是否实心、物品栏；v8.1 起原版全部方块，碰撞箱 `COLLISION`、破坏时间 `HARDNESS` |
| | `blockList.json`、`blockShapes.json` | 原版全部方块名；每个状态的碰撞箱和破坏时间（v8.1，`tools/vanilla/gen-blocks.py` 从原版 jar 导出） |
| | `mesh/mesher.ts` | 贪婪网格：面剔除 + 顶点 AO + 平滑光照（v6）+ 合并；Worker 和主线程共用 |
| | `mesh/materials.ts` | 纹理数组 ShaderMaterial：不透明 / 水 / 线框；生物群系颜色图；光照贴图、圆柱雾（v6） |
| | `textures/painters.ts` | 用代码画 16 张纹理 |
| | `textures/index.ts` | 纹理数组 |
| | `fluid/FluidTicker.ts` | 流体流动：计划刻、getNewLiquid、spread、岩浆遇水 |
| | `highlight/` | 选中方块的线框 |
| | `worker/generate.ts` | Worker 入口：init / chunk / light / skyColors / f3 / slice |
| | `worker/surface.ts` | 区块原型（密度 → 方块 → 矿脉 → 地表）；装配（+ 地物 + 颜色 + section 压缩）；meshChunk：光照 + 网格（v6） |
| | `worker/pipeline.ts` | 区块源（v5）：缓存原型和装饰结果；4×4 区块的装饰区域 |
| | `worker/pool.ts` | Worker 池，请求交给最空闲的 Worker；区块请求按装饰区域固定分配（v5） |
| | `worker/protocol.ts` | 主线程 ↔ Worker 的消息类型 |
| | `worker/datapacks.ts` | 读取 `data/` 和 `datapacks/` |
| | `worldgen/` | 世界生成引擎，见下 |
| `ui/` | `index.ts` | 菜单、准星、物品栏、加载提示 |
| | `icons.ts` | 物品栏的立体方块图标 |
| | `debug/f3.ts` | F3 调试屏（NoiseRouter 一行、内存 / 网格统计、Client Light、时间）；G、K 键 |
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
| `feature/` | 地物（v5）：世界接口和各种提供者（`core`）、放置修饰器（`placement`）、矿石 / 圆盘 / 积雪 / 巨型蘑菇 / 选择器（`features`）、树（`tree`）、地物排序和区块装饰（`decorate`）、方块标签（`tags`，v5.1 起由 `blockTags.json` 生成）；v5.1：植物（`vegetation`）、湖 / 泉 / 冰 / 晶洞 / 滴水石 / 地牢（`terrain`）、幽匿（`sculk`）、珊瑚（`coral`）；v5.2：化石（`fossil`）、下界（`nether`）、末地（`end`） |
| `carver/` | 雕刻器（v5.1）：洞穴、峡谷；下界洞穴（v5.2） |
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
| `tests/feature.test.ts` | 地物排序、HashSet 顺序；矿脉、矿石、树和原版存档逐格对照（v5）；其余地物按类别和原版完整存档对照（v5.1） |
| `tests/biome.test.ts` | 气候参数表、温度 / 草色、地表规则的每种条件、原版数据生成的区块（v4） |

## 区块的生成流程（v5）

```text
proto(cx, cz)            密度 → 方块（含水层、矿脉）→ 地表规则 → 雕刻器（v5.1）    protoChunk()
decoration(cx, cz)       复制周围 3×3 个原型 → 先叠上同一装饰区域里排在前面的区块的装饰
                         → 按原版顺序放这个区块的地物（每步、每个地物一个种子）→ 记下改了哪些格子
withDecorations(cx, cz)  原型 + 周围 3×3 个区块的装饰（按区域、区域内先 z 后 x 的顺序叠）→ 气泡柱（v5.2）
generateChunk(cx, cz)    18×18 列（中间是 withDecorations，外圈来自邻居）→ 颜色 → section + 网格
                         + 挨着空气的水 / 岩浆记下来，加载后流一次（泉、湖，v5.1）
```

原版对照工具在 `tools/vanilla/`：读原版存档（.mca / NBT）、逐格比较、生成测试数据，用法见那里的 README。

