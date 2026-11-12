# 架构说明（v0）

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
  control.update(dt)   // 1. 按键 → 速度 → 碰撞 → 新位置；射线选方块
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
   │    > 0 石头，≤ 0 空气
   │ 2. 临时地表规则：草 / 土 / 沙 / 水 / 深板岩 / 基岩
   │ 3. buildChunkMesh() 面剔除 + AO       ← terrain/mesh/mesher.ts
   ▼
 { blocks, opaque, water }  （ArrayBuffer 直接转移，不复制）
   ▼
 Terrain.onChunk()                         主线程
   │ 存进 chunks，生成 THREE.Mesh 加进场景
   │ 如果这个区块被玩家改过（edits），先写回改动再在主线程重建网格
```

挖 / 放方块时：`Control` 用射线找到方块 → `Terrain.setBlock()` 改数组、记进 `edits` → 在主线程重建这个区块（和相邻区块）的网格。

## 各目录

| 目录 | 文件 | 职责 |
| --- | --- | --- |
| `core/` | `index.ts` | 场景、相机、渲染器、雾 |
| `player/` | `index.ts` | 移动模式、速度、碰撞箱、重力、跳跃高度（原版数值） |
| `control/` | `index.ts` | 键鼠输入、移动模式切换、挖放方块、出生点 |
| | `physics.ts` | AABB 分轴碰撞 |
| | `raycast.ts` | DDA 射线选方块 |
| `terrain/` | `index.ts` | 区块加载 / 卸载、`getBlock` / `setBlock`、改动记录、主线程重建网格 |
| | `chunk.ts` | 一个区块的方块数组和网格 |
| | `blocks.ts` | 方块种类、颜色、是否实心、物品栏 |
| | `mesh/mesher.ts` | 面剔除 + 固定方向光 + 顶点 AO；Worker 和主线程共用 |
| | `mesh/materials.ts` | 不透明 / 水两个材质 |
| | `highlight/` | 选中方块的线框 |
| | `worker/generate.ts` | Worker 入口：init / chunk / f3 / slice 四个方法 |
| | `worker/surface.ts` | 密度 → 方块（临时地表规则）→ 网格 |
| | `worker/pool.ts` | Worker 池，请求交给最空闲的 Worker |
| | `worker/protocol.ts` | 主线程 ↔ Worker 的消息类型 |
| | `worker/datapacks.ts` | 读取 `data/` 和 `datapacks/` |
| | `worldgen/` | 世界生成引擎，见下 |
| `ui/` | `index.ts` | 菜单、准星、物品栏、加载提示 |
| | `debug/f3.ts` | F3 调试屏（含原版格式的 NoiseRouter 一行） |
| | `debug/noiseMap.ts` | M 键噪声图面板 |

## worldgen：v0 的核心

不依赖 DOM 和 three，Worker 和 Node 测试直接用。从底到上：

| 目录 | 内容 |
| --- | --- |
| `math/` | 原版 `Mth` 的函数、MD5 |
| `random/` | `LegacyRandomSource`（= java.util.Random）、`XoroshiroRandomSource`、位置随机工厂 |
| `noise/` | `ImprovedNoise` → `PerlinNoise` → `NormalNoise`，`BlendedNoise`，`SimplexNoise` |
| `registry/` | 数据包注册表：文件路径 → 资源 ID |
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
