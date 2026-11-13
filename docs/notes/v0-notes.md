# v0 开发日志

按时间顺序记下做了什么、卡在哪、怎么解决的。技术解析见 [../articles/v0-功能与实现.md](../articles/v0-功能与实现.md)。

## 第一轮：把底层搭起来

1. **建仓库，定规则**：core 不依赖 DOM；long 一律 bigint；float 运算每步 `Math.fround`。
2. **先写 Java 参照实现**（`tools/parity/Parity.java`），输出对拍数据，TS 测试比较 IEEE 754 原始位。
3. **随机数**：Legacy、Xoroshiro、`upgradeSeedTo128bit`、`fromHashOf`（自己写 MD5）。
   - 坑：`nextFloat` 第一次对不上。`5.9604645E-8F` 写成 JS 字面量是 double，不等于 2^-24；改成精确值 `5.9604644775390625e-8`。
   - 坑：Java 的 `>>>` 在 bigint 上没有，要先 `BigInt.asUintN(64, x)`。
   - 坑：`Mth.getSeed` 里 `x * 3129871` 是 int 乘法，先溢出再扩成 long，要用 `Math.imul`。
4. **噪声**：ImprovedNoise → PerlinNoise → NormalNoise → BlendedNoise，全部对拍通过。
5. **密度函数**：JSON 解析、RandomState、样条（float）、NoiseChunk。
   - 坑：同一个子树被多处引用，`mapAll` 重建时会复制多份，缓存节点不共享。加了按对象身份去重的 `mapChild`。
6. **demo**：噪声图、3D、F3 对照、随机数页。自己写了一个 `demo:overworld_lite` 简化地形，没有原版数据也能看。

## 第二轮：接入原版数据、重构 demo

1. **原版数据放进来就认不出**：解压出来是 `datapacks/vanilla/worldgen/...`，少了 `data/minecraft/` 一层。
   注册表改成两种结构都认（省略时命名空间默认 minecraft）。
2. **7 个 noise_settings 全部解析通过**，只有末地报 `end_islands` 未实现 → 补上 SimplexNoise 和末地外岛（同样 Java 对拍）。
3. **新增原版数据测试**，第一次跑就抓到：手抄的 `ridges_folded` 和原版 JSON 的参数顺序不同
   （`mul(x, -3)` vs `mul(-3, x)`）。数值等价，但还是改成和原版一模一样。其余手抄参数全部一致。
4. **单点求值太慢**：原版主世界 `final_density` 单点约 157 µs，一张 900×900 的剖面图要两分钟。
   加了 `PointCache`：把缓存标记换成“记住上一个点”的缓存，数值完全不变，降到约 51 µs。
   区块模式（NoiseChunk）每个方块只要约 0.5 µs，因为大部分计算只在 4×8×4 的格子角上做。
5. **demo 重构**：
   - core 加了 `Worldgen` 总入口和 `FunctionKey`。
   - 页面状态集中到 `state.ts`，地址栏自动同步。
   - Worker 通信改成有类型的 RPC（`protocol.ts` + `workerClient.ts`）。
   - 主线程按职责拆文件：panel / mapView / terrainView / treeView / rngView / palettes。
   - 新增“函数结构”对话框：看 JSON 解析成的树，引用可以点进去。
   - `npm run build:public`：公开部署时不打包原版数据。

## 第三轮：回到原项目的结构，做成能玩的版本

1. **查看器的写法太绕**（Store / RPC / 渐进式采样……），过几天自己都看不懂。改回原项目
   （vyse12138/minecraft-threejs）的结构：`main.ts` new 出 Core / Player / Terrain / Control / UI，每帧 `update()`。
2. **v0 引擎原样搬到 `src/terrain/worldgen/`**，测试只改了 import 路径，全部通过。
3. **Terrain 重写**：每个方块都存（区块 16×16×384），Worker 池并行生成，按距离加载、超出视距卸载，
   玩家改动记在 `edits` 里。
4. **区块边界**：Worker 多算一圈（18×18 列）来判断邻居；给 `NoiseChunk.forEach` 加了“只遍历这些列”的参数。
5. **网格**：面剔除 + 固定方向光 + 顶点 AO，Worker 和主线程共用同一个 `mesher.ts`。
6. **Control**：PointerLock、分轴 AABB 碰撞、DDA 射线选方块、挖 / 放、飞行、疾跑、游泳。
7. **UI**：菜单（换种子、noise_settings、视距）、准星、物品栏、F3（含原版格式的 NoiseRouter 行）、M 键噪声图。
   - 坑：天空颜色过饱和。`THREE.ColorManagement.enabled = false` 写在了创建 `THREE.Color` 之后，
     天空色已经被当成 sRGB 转换过一次。改成在模块最顶上关掉。
8. **临时地表规则**：草 + 3 层土、海边沙、水下沙/沙砾、y<0 深板岩、底部基岩。不是原版规则，v4 换掉。

## 实测数据（Node 22，单线程）

| 项目 | 数值 |
| --- | --- |
| 解析全部原版 worldgen 数据（102 个文件） | 约 12 ms |
| 主世界 final_density 接线（创建 25 个噪声） | 约 36 ms |
| final_density 单点求值 | 约 157 µs |
| 同上，加 PointCache | 约 51 µs |
| NoiseChunk 16×384×16（一个区块） | 约 93 ms |
| NoiseChunk 64×384×64 | 约 850 ms |

## 还没做

- 和游戏本体逐点对数（F3 对照）。
- 含水层、地表规则、群系 —— 后面的版本。
