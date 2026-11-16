# 更新记录

每个版本对应一个 git tag 和一篇文章。数字来自 `tools/` 下的脚本或 `tests/` 里的测试，可以自己复现。

## v6 · 光照与昼夜

文章：[docs/articles/v6-光照与昼夜.md](docs/articles/v6-光照与昼夜.md) · 日志：[docs/notes/v6-notes.md](docs/notes/v6-notes.md)

**新增**

- 光照引擎（`terrain/light/LightEngine.ts`）：天空光、方块光，移植自原版 SkyLightEngine / BlockLightEngine；
  雪层、下半台阶等底面挡光。每个方块的 lightBlock / lightEmission 从原版 jar 导出（`tools/vanilla/LightDump.java`、`gen-light.py`）
- 增量更新（`terrain/light/LightUpdater.ts`）：挖放方块、流体流动后只更新附近的光照（先熄灭再点亮）
- 区块加载分两步：Worker 先生成方块，周围 8 个区块都生成后再算“光照 + 网格”（新的 Worker 方法 `light`），算完才显示；生成范围是视距 + 1。
  主线程每个区块多存一份不压缩的方块（`Chunk.flat`）和 18×18 列的光照（`Chunk.light`）
- 原版的平滑光照：每个角 4 格亮度之和存进顶点（新属性 `light`）；AO 改成原版的 0.4 / 0.6 / 0.8 / 1.0；
  发光方块、十字形植物、流体用 flat 光照；十字形植物、藤蔓不按方向变暗；下界上下两面 0.9（constantAmbientLight）
- 光照贴图（`sky/formulas.ts`）：照抄 1.21.4 的 lightmap.fsh，每帧按时间更新；亮度选项（昏暗 / 默认 / 明亮）
- 昼夜（`sky/`）：时间流逝（20 刻 / 秒，24000 一天）；天空色、雾色（群系 sky_color / fog_color 按 CubicSampler 平均，Worker 方法 `skyColors`）；
  日出日落扇形；太阳、8 个月相的月亮、780 颗星星（种子 10842）；下界、末地固定时间
- 雾：原版的圆柱形雾，范围是视距的最后 1/10（下界从 5% 开始）
- F3：`Client Light`、时间、点亮的区块数、光照 + 网格耗时；菜单：时间滑块、昼夜循环开关、亮度
- 工具：`diff-light.ts`（和原版存档的 SkyLight / BlockLight 逐格比较，`--vanilla-blocks` 只检验引擎，标出原版自己没算完的格子）、
  `make-light-fixture.ts`；`anvil.ts` 读光照数组
- 测试：`tests/light.test.ts`（10 个）：属性表、小场景、增量更新 = 整块重算（随机 300 次）、平滑光照、和原版 bare 存档逐格对照（三个维度）、昼夜公式

**改动**

- `generateChunk` 默认仍生成网格（测试、工具用），游戏里传 `mesh: false`
- `ChunkData` 去掉 `meshes`，加上 `blocks`（不压缩的方块）；`chunk` 请求不再带 `greedy`
- 不再用 `scene.background`：先画天空（单独的场景和相机），清深度再画地形；`Core.setSky` 换成 `setAirFog`

**已知问题**

- 和方块状态有关的发光（洞穴藤蔓的浆果、海泡菜个数、被碰到的红石矿石）、含水方块的挡光要等 v7
- 没有云和天气；末地天空是纯色
- 光照算到一半方块变了会作废重算，流体一直在流的地方旁边的区块可能晚一点才显示

## v5.2 · 下界、末地与收尾

文章：[docs/articles/v5.2-下界、末地与收尾.md](docs/articles/v5.2-下界、末地与收尾.md) · 日志：[docs/notes/v5.2-notes.md](docs/notes/v5.2-notes.md)

**修复**

- 下界、末地的地形和群系：按 `legacy_random_source` 选随机状态（`Worldgen.stateFor`）；实心方块用 `default_block`；
  末地群系按 `TheEndBiomeSource`。关掉地物时和原版 100% 一致（之前约 60%）
- 滴水石簇放水洼时漏了“脚下也要是石头或水”的条件
- `fixed_placement` 只留当前区块里的位置
- 雕刻器不再只限主世界（下界有 `nether_cave`）

**新增**

- 下界雕刻器 `nether_cave`
- 下界地物（`feature/nether.ts`）：glowstone_blob、basalt_pillar、basalt_columns、delta_feature、netherrack_replace_blobs、
  scattered_ore、huge_fungus、nether_forest_vegetation、weeping_vines、twisting_vines；放置修饰器 `count_on_every_layer`
- 末地地物（`feature/end.ts`）：end_spike、end_platform、end_island、chorus_plant、end_gateway
- 化石（`feature/fossil.ts`）：结构模板 + 腐烂 / 保护 / 规则处理器；数据包新目录 `structure/`、`worldgen/processor_list/`
- 气泡柱（岩浆块、灵魂沙上方的水源）
- 32 种新方块（共 234 种）；新形状 `none`（气泡柱只画水）
- 下界、末地的天空色；下界从基岩天花板下面找出生点
- 工具：`make-world.py` 的 `only:` 模式、`tests/featurePacks.ts` 的 `onlyPack`、`structures-to-json.ts`；
  `diff-areas.ts` / `probe.ts` 支持下界、末地（区域名前缀 `nether:` / `end:`）；`ChunkSource.isolated` 调试开关
- `tests/feature.test.ts` 按类别对照新增化石、气泡柱、下界植物、萤石、下界矿石、末地

**已知问题**

- 读地形的大地物（滴水石簇、幽匿、玄武岩团块和柱群）和原版的区块生成顺序有关，没法逐格一致
- 下界的天空色只有一种

## v5.1 · 其余地物与洞穴

文章：[docs/articles/v5.1-其余地物与洞穴.md](docs/articles/v5.1-其余地物与洞穴.md) · 日志：[docs/notes/v5.1-notes.md](docs/notes/v5.1-notes.md)

**新增**

- 雕刻器（`worldgen/carver/`）：洞穴、峡谷；`configured_carver` 数据包目录
- 地物（`worldgen/feature/`）：
  - 植物（`vegetation.ts`）：random_patch / flower / no_bonemeal_flower、simple_block、block_column、seagrass、kelp、sea_pickle、bamboo、vines、
    multiface_growth、vegetation_patch、waterlogged_vegetation_patch、root_system
  - 地形（`terrain.ts`）：lake、spring_feature、ice_spike、iceberg、blue_ice、forest_rock、desert_well、monster_room、underwater_magma、geode、
    pointed_dripstone、dripstone_cluster、large_dripstone
  - 幽匿（`sculk.ts`）：sculk_patch（SculkSpreader 世界生成版）
  - 珊瑚（`coral.ts`）：coral_tree、coral_claw、coral_mushroom
  - 方块提供者：noise_provider、noise_threshold_provider、dual_noise_provider；FloatProvider：clamped_normal
- 93 种新方块（共 202 种）；海草、海带、珊瑚、海泡菜当成水源（含水）
- 网格：藤蔓、发光地衣、幽匿脉络按“贴着的实心面”画（multiface）
- 泉和湖边上挨着空气的水 / 岩浆，区块加载后流一次
- 方块标签由 `tools/vanilla/gen-tags.py` 从原版 jar 展开生成（`feature/blockTags.json`）
- 原版对照：`make-world.py` 新增 `carvers` / `full` 模式；`diff-areas.ts`（按区域、按方块统计一致率）、`probe.ts`、`find-biomes.ts`、
  `make-full-fixture.ts`；样本区域新增 19 个（`areas51.txt`）
- `tests/feature.test.ts`：按 11 类方块（晶洞、地牢、冰、发光地衣、花……）和原版完整存档逐格对照

**改动**

- 群系查找更快（结果不变）：参数表查找用上一次的结果剪枝；气候的 5 个平面参数按列缓存；BiomeManager 的角点抖动缓存
- `has_sturdy_face`、海草等的“撑得住”判断不再把树叶算进去（原版树叶的支撑形状是空的）

**已知问题**

- 跨区块的大地物（树、滴水石簇、幽匿）在装饰区域边界两侧互相看不到，和原版的生成顺序有关
- 没有方块状态：两格高植物上下一样、滴水石锥一种形状、没有气泡柱、苍白苔藓地毯不往上长
- 化石没做；生成地物时没有光照，蘑菇按“都亮”处理

## v5 · 地物：矿石、树和积雪

文章：[docs/articles/v5-地物：矿石与树.md](docs/articles/v5-地物：矿石与树.md) · 日志：[docs/notes/v5-notes.md](docs/notes/v5-notes.md)

**目标版本改为 1.21.4**（世界生成数据和 1.21.1 相同；群系表多了苍白之园）。

**新增**

- 矿脉（`worldgen/ore/OreVeinifier.ts`）：铜矿脉 / 铁矿脉，噪声阶段决定
- 地物系统（`worldgen/feature/`）：读取 `configured_feature` / `placed_feature`；放置修饰器（count、in_square、height_range、heightmap、biome、
  rarity_filter、surface_water_depth_filter、block_predicate_filter、environment_scan、random_offset、noise_based_count、noise_threshold_count 等）；
  地物排序（FeatureSorter）；`WorldgenRandom` 的装饰种子 / 地物种子
- 地物：矿石（ore）、圆盘（disk）、积雪和冰（freeze_top_layer）、巨型蘑菇、三种随机选择器、树（9 种树干放置器、11 种树叶放置器、
  红树根放置器、8 种装饰器），共 36 种树
- 区块流水线（`worker/pipeline.ts`）：区块原型 + 周围 3×3 的装饰；4×4 区块的“装饰区域”内按顺序装饰；Worker 按区域分配
- 58 种新方块（矿石、石头、8 种木头的原木和树叶、蘑菇方块、雪层、苔藓地毯、藤蔓……），纹理仍是代码画的
- 网格：扁方块（雪层、地毯）、十字形镂空植物（藤蔓、可可果、垂须、胎生苗）
- 原版对照工具 `tools/vanilla/`：读原版存档（.mca / NBT）、和我们生成的区块逐格比较、生成测试用的对照数据
- `tests/feature.test.ts`：矿脉、矿石、树和原版存档逐格对照；`tests/parity.test.ts` 新增 Java HashSet 遍历顺序

**改动**

- 生物群系查找用包围盒树，结果和逐项比较一样，快 6 倍
- `generateChunk` 拆成 `protoChunk`（地形 + 地表）和装配（+ 地物 + 网格）

**已知问题**

- 只实现了矿石、树、积雪；花草、湖、泉、钟乳石、晶洞等地物还没有（v5.x），雕刻器也没有
- 原木都是竖着的（没有方块状态）
- 区块边上的树：装饰区域之间互相看不到；原版自己在不同生成顺序下也会不一样

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
