# 更新记录

每个版本对应一个 git tag 和一篇文章。数字来自 `tools/` 下的脚本或 `tests/` 里的测试，可以自己复现。

## v4 · 生物群系与地表规则

文章：[docs/articles/v4-生物群系与地表规则.md](docs/articles/v4-生物群系与地表规则.md) · 日志：[docs/notes/v4-notes.md](docs/notes/v4-notes.md)

**新增**

- 生物群系（`terrain/worldgen/biome/`）：原版气候参数表（`OverworldBiomeBuilder`，主世界 7593 项、下界 5 项）、
  量化与最近项查找（`Climate`）、方块坐标 → 群系的抖动缩放（`BiomeManager`，种子 SHA-256 + LCG，64 位运算用 32 位模拟）
- 群系 JSON（`worldgen/biome/*.json`）：温度、湿度、冰冻修饰器、草 / 树叶 / 水的颜色、沼泽 / 黑森林修饰器；
  高处变冷（`PerlinSimplexNoise`，原版写死的种子）
- 地表规则（`terrain/worldgen/surface/`）：原版 `surface_rule` 的 4 种规则、11 种条件；`SurfaceSystem.buildSurface`
  逐列应用；恶地陶瓦条纹、侵蚀恶地石柱、冰冻海洋冰山
- 新方块（含纹理）：砂岩、红沙、红砂岩、雪块、细雪、冰、浮冰、泥巴、菌丝、灰化土、砂土、方解石、陶瓦及 6 种颜色
- 生物群系颜色：草、树叶、水的纹理改为灰度 + 染色标记；每列颜色取周围 5×5 列平均（原版默认过渡半径），
  写进三张 512×512 颜色图，着色器按世界坐标取
- F3 显示 `Biome:`
- 数据包读取 `worldgen/biome/`；数据包里有 `minecraft:pale_garden` 时按 1.21.4+ 的表放苍白之园
- 群系参数表已用 1.21.4 服务端导出的 `biome_parameters` 报告核对：主世界 7593 项、下界 5 项逐项一致
- `tests/biome.test.ts`；`tests/parity.test.ts` 新增种子哈希、BiomeManager、PerlinSimplex、量化、陶瓦条纹 4 组 Java 对拍

**改动**

- 有 `surface_rule` 的 noise_settings 不再用 v0~v3 的临时地表规则（demo 的简化地形仍然用）
- 物品栏的草、树叶、水图标按平原 / 默认颜色染色

**数据**：原版主世界每个区块生成约 102 ms → 约 121 ms（群系查找 + 地表规则）

**已知问题**

- 没有树、花草、积雪层和冰面（原版是“地物”，v5）
- 草和树叶的颜色图是用 13 个已知群系颜色拟合的二次多项式（原版颜色图归 Mojang 所有，没放进仓库），这 13 个群系误差 ≤ 2 个色阶

## v3 · 含水层与流体

文章：[docs/articles/v3-含水层与流体.md](docs/articles/v3-含水层与流体.md) · 日志：[docs/notes/v3-notes.md](docs/notes/v3-notes.md)

**新增**

- 含水层（`terrain/worldgen/aquifer/Aquifer.ts`）：逐行移植原版 `NoiseBasedAquifer`、全局流体（y < -54 岩浆）、预估地表高度；按 noise_settings 的 `aquifers_enabled` / `default_fluid` 开关
- 流体状态：水、岩浆各有源 / 流动（量 1~7）/ 下落 9 种状态；新方块：岩浆、黑曜石（含纹理）
- 流体流动（`terrain/fluid/FluidTicker.ts`）：原版计划刻、getNewLiquid、往最近的坑流、无限水、岩浆遇水变黑曜石 / 圆石 / 石头；区块加载后更新含水层边上的流体
- 流体渲染：原版角高度（加权平均）；平的流体面才合并；岩浆不透明
- 玩家：流体高度按液面算，水流推人，岩浆里的移动，水下 / 岩浆里的雾
- 物品栏第 8、9 格改为水和岩浆
- `tools/aquifer-probe.ts`：列出地下湖的坐标，用来和游戏本体核对
- `tests/fluid.test.ts`

**改动**

- 顶点坐标精度从 1/16 格改为 1/256 格（`POSITION_SCALE = 256`）
- 方块改动不再立刻重建网格，而是标记 section，每帧统一重建
- v0 以来“地表以上、海平面以下填水”的临时规则去掉，改由含水层决定
- `MoveWorld.isWater` 改为 `block`，移动代码自己查流体状态

**修复**

- 主线程重建 section 时邻居区块还没加载，边界上会多出一层面；邻居加载后重建（`staleSections`）

**数据**：原版主世界每个区块生成约 83 ms → 约 102 ms（含水层）

**已知问题**

- 洞穴没有光照（v6）；岩浆不发光
- 含水层只核对了两处地下湖（种子 42 的 (11, 14)、(-32, 40)，最上面一格水都是 y = 19，与原版一致）；更多位置可以用 `tools/aquifer-probe.ts` 核对

## v2 · 20 TPS 原版物理与手感

文章：[docs/articles/v2-原版物理与手感.md](docs/articles/v2-原版物理与手感.md) · 日志：[docs/notes/v2-notes.md](docs/notes/v2-notes.md)

**新增**

- 固定步长物理：每秒 20 tick，与帧率无关；画面在两个 tick 之间插值
- 原版移动公式（`control/movement.ts`）：加速度 + 摩擦、空中控制、跳跃（0.42、×0.98、-0.08）、疾跑跳推力、按住跳的 10 tick 冷却、创造飞行
- 原版碰撞（`control/physics.ts`）：按轴裁剪位移（y 先，x / z 里位移小的先），方块碰撞形状接口，抬步 0.6 格
- 潜行：碰撞箱 1.5 格、眼高 1.27；走到方块边缘不会掉下去；头顶有东西时站不起来
- 水：原版每 tick 公式（加速度 0.02、阻力 ×0.8、重力 1/16、按住跳 +0.04），水深按 8/9 水面计算
- 镜头：眼高平滑、视角摇晃（菜单里可关）、疾跑 / 飞行视野变宽、水下视野变窄
- F3 显示状态和速度；`tests/movement.test.ts` 对照原版公认数值

**改动**

- `Player` 改为保存完整的移动状态（位置、上一 tick 位置、格/tick 速度、姿势、疾跑、水深……）
- 鼠标控制的是一个单独的 `head` 对象，相机每帧从它复制朝向后叠加摇晃
- 移除 `Mode` / `Speed`，改为原版常数 `PHYSICS` 和姿势表 `POSES`

**数据**：走 4.317、疾跑 5.612、潜行 1.295、连续疾跑跳 7.127 格/秒；跳跃 1.2522 格 / 12 tick；最大下落 78.4 格/秒；水底 1.96 格/秒，全部与原版一致

**已知问题**

- 没有水下游泳姿势、摔落伤害；水没有流动

## v1.1 · 水中移动修正

**修复**

- 浮在水面按住空格时上下快速抖动，并且水平速度变成了陆地速度。改为按原版规则：
  - 水里竖直速度：按住跳每 tick +0.04，阻力 ×0.8，水中重力 -0.005（稳定后上浮 2.7 格/秒、下沉 0.5 格/秒）
  - 浮到水面会冲出一点再落回去（实测起伏约 0.13 格），和原版一样“浮”在水面
  - 从水里出来、还没落地之前保持水中的水平速度（约 2.2 格/秒）
  - 浅水（水深 ≤ 0.4 格）站在地上按空格是正常起跳
- v1 加的“水里撞墙往上蹿”加上原版的限制条件：人抬高 0.6 格后前面必须是空的，所以只对一格高的岸边生效，不会贴着高墙一直往上爬



文章：[docs/articles/v1-区块存储与贪婪网格.md](docs/articles/v1-区块存储与贪婪网格.md) · 日志：[docs/notes/v1-notes.md](docs/notes/v1-notes.md)

**新增**

- 区块改为 24 个 16³ section，每段用调色板 + 位压缩存储，规则与原版 `PalettedContainer` 相同（单值 / 间接 4~8 位 / 直接）
- 贪婪网格：相同纹理、相同 AO 的相邻面合并成大矩形；AO 只沿一个方向变化的面也能顺着合并
- 16 张用代码画的方块纹理，放在纹理数组（`DataArrayTexture`）里，自定义 `ShaderMaterial`
- 物品栏立体方块图标
- F3 新增内存、四边形、绘制调用统计；G 切换贪婪 / 逐面网格，K 显示线框
- `tools/bench-v1.ts`：v0 / v1 存储与网格对比
- `tests/chunk.test.ts`：位压缩、调色板、贪婪网格（含“合并前后面积相等”）、纹理

**改动**

- 顶点格式 24 字节 → 10 字节（Uint16 位置 + Uint8 信息），索引 Uint32 → Uint16
- 一个区块一个网格 → 一个 section 一个网格，视锥剔除按 section 进行
- 挖 / 放方块只重建周围 3×3×3 涉及的 section，不再重建整个区块
- `terrain/chunk.ts` → `terrain/chunk/` 目录；`docs/v0-notes.md` → `docs/notes/v0-notes.md`

**修复**

- 浮在水面上走不到岸边：脚比岸边顶面低约 0.3 格，又不在地面上不能跳。改成和原版一样，在水里水平撞到方块时向上蹿（6 格/秒）

**数据**（原版主世界，种子 42，64 个区块）：方块数据 6.00 → 0.70 MB；四边形 104,416 → 60,763；网格显存 11.95 → 3.01 MB；挖方块重建网格约 33 ms → 约 1.6 ms

**已知问题**

- 绘制调用比 v0 多（section 网格多），视距大时可能成为瓶颈
- 区块重新加载时，邻居区块边上的面不会根据该区块的改动更新

## v0 · 原版地形

文章：[docs/articles/v0-功能与实现.md](docs/articles/v0-功能与实现.md) · 日志：[docs/notes/v0-notes.md](docs/notes/v0-notes.md)

**新增**

- 与原版逐位对齐的随机数（Legacy、Xoroshiro）、噪声（Perlin、Normal、Blended、Simplex）、JSON 密度函数；能读取原版 1.21.1 的全部 7 个 noise_settings
- 可玩的游戏：区块加载 / 卸载、Worker 池、面剔除 + 顶点 AO、AABB 碰撞、DDA 射线选方块、挖 / 放、飞行、疾跑、游泳
- 菜单、物品栏、F3（含原版格式的 NoiseRouter 行）、M 键噪声图
- Java 参照实现对拍（`tools/parity/Parity.java`）

**已知问题**

- 地表规则是临时写的近似版；没有生物群系、含水层、地物、光照
