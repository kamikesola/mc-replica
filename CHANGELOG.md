# 更新记录

每个版本对应一个 git tag 和一篇文章。数字来自 `tools/` 下的脚本，可以自己复现。

## v1 · 区块存储与贪婪网格

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
