# 原版对照工具（v5）

用原版服务端生成存档，再和我们生成的区块逐格比较。原版 jar 和存档都不放进仓库。

## 1. 准备服务端

1. 下载和游戏同版本的 `server.jar`（地址在 `.minecraft/versions/<版本>/<版本>.json` 的 `downloads.server.url`），放进一个空文件夹
2. 在同一个文件夹里写 `server.properties`：

   ```properties
   level-seed=42
   online-mode=false
   generate-structures=false
   pause-when-empty-seconds=-1
   level-name=bare
   ```

   `pause-when-empty-seconds=-1` 很重要：1.21.2 起没人在线 60 秒后服务端会暂停，forceload 的区块就不生成了。
3. `eula.txt` 写 `eula=true`（表示你同意 Mojang 的 EULA）

## 2. 生成对照存档

```text
python3 tools/vanilla/make-world.py <服务端文件夹> bare bare <原版 worldgen 目录>
java -Xmx3G -jar server.jar nogui
```

服务端启动后在控制台输入（每条之间等几秒）：

```text
forceload add -64 -64 63 63
save-all flush
stop
```

`tools/vanilla/areas.txt` 是 v5 用到的 21 个群系样本区域（群系名、区块 x、区块 z），每个区域 forceload 以它为中心的 4×4 个区块。
`tools/vanilla/areas51.txt` 是 v5.1 加的 19 个区域（繁茂洞穴、溶洞、深暗之域、暖水海洋、冰刺之地、冻洋、樱花树林、苍白之园……），
用 `tools/vanilla/find-biomes.ts` 按种子 42 找出来。v5.1 的“完整地物”存档：

```text
python3 tools/vanilla/make-world.py <服务端文件夹> full full <原版 worldgen 目录>
cat tools/vanilla/areas.txt tools/vanilla/areas51.txt \
  | awk '{x=$2*16; z=$3*16; printf "forceload add %d %d %d %d\n", x-32, z-32, x+31, z+31}' > full-areas.txt
# 启动服务端，把 full-areas.txt 里的命令逐条输入控制台（每条等几秒），最后 save-all flush、stop
```

`make-world.py` 的模式：`bare`（不放地物、不雕刻）、`carvers`（只雕刻）、`ores` / `trees`（只留一类地物）、`full`（原版全部）、
`only:a,b`（v5.2：只留列出的 placed_feature，保留雕刻器；我们这边用 `diff-areas.ts --features a,b` 或 `FEATURES=a,b probe.ts` 对照）。

下界、末地（v5.2）：`tools/vanilla/areas52.txt` 里的区域名带 `nether:` / `end:` 前缀；forceload 要在对应维度执行：

```text
execute in minecraft:the_nether run forceload add <x1> <z1> <x2> <z2>
execute in minecraft:the_end run forceload add <x1> <z1> <x2> <z2>
```

存档里下界在 `DIM-1/`、末地在 `DIM1/`，比较工具会自己找。

## 3. 比较

```text
npx tsx tools/vanilla/diff.ts <存档文件夹> -2 -2 1 1          # 逐格比较，列出最多的 40 种差别
FEATURES=0 npx tsx tools/vanilla/diff.ts <存档文件夹> ...     # 只比较地形（不放地物）
npx tsx tools/vanilla/make-feature-fixture.ts <trees 存档> <trees2 存档> <ores 存档> tools/vanilla/areas.txt <bare 存档>
                                                              # 重新生成 tests/fixtures/features.json
npx tsx tools/vanilla/diff-areas.ts <存档> tools/vanilla/areas.txt tools/vanilla/areas51.txt
                                                              # v5.1：按区域比较，最后列出每种方块的一致率
npx tsx tools/vanilla/probe.ts <存档> <cx> <cz> <方块名>     # v5.1：某种方块哪几格对不上，带六个邻居
npx tsx tools/vanilla/make-full-fixture.ts <full 存档> tools/vanilla/areas51.txt tools/vanilla/areas.txt
                                                              # v5.1：重新生成 tests/fixtures/features51.json
python3 tools/vanilla/gen-tags.py <解包的 jar 目录>          # v5.1：从原版 jar 展开方块标签，写 blockTags.json（v9 多了栅栏、墙、楼梯等 12 个）
npx tsx tools/vanilla/structures-to-json.ts <jar 里的 data/minecraft/structure> datapacks/vanilla/structure
                                                              # v5.2：化石的结构模板（.nbt → JSON）
python3 tools/vanilla/gen-blocks.py <generated/reports/blocks.json> <server-1.21.4.jar> <libraries 目录>
                                                              # v8.1：原版全部方块（代替 v6 的 gen-light.py、v7 的 gen-states.py）：
                                                              #     方块名 → src/terrain/blockList.json，属性和取值 → stateDefs.json，
                                                              #     光照 → light/lightProps.json，碰撞箱和破坏时间 → blockShapes.json，
                                                              #     完整的光照状态表 → tools/vanilla/out/light-states.tsv（不进 git）
python3 tools/vanilla/gen-items.py <generated/reports/items.json> <1.21.4 的 jar>
                                                              # v10 / v10.1：物品表 → src/items/itemList.json，工具规则和耐久 → tools.json，
                                                              #     工作台配方（964 个，物品标签展开）→ recipes.json
npx tsx tools/vanilla/diff-light.ts <bare 存档> --range -3 -3 2 2 --bare
                                                              # v6：天空光、方块光逐格比较（bare 存档要加 --bare）
npx tsx tools/vanilla/diff-light.ts <full 存档> --vanilla-blocks --areas tools/vanilla/areas51.txt tools/vanilla/areas.txt
                                                              # v6：用原版存档里的方块算，只检验光照引擎；去掉 --vanilla-blocks 是端到端
npx tsx tools/vanilla/make-light-fixture.ts <bare 存档> <bare52 存档>
                                                              # v6：重新生成 tests/fixtures/light6.json
STATES=1 npx tsx tools/vanilla/diff-areas.ts <full 存档> tools/vanilla/areas.txt tools/vanilla/areas51.txt
                                                              # v7：同时比较完整状态（带属性），差别按状态列出
npx tsx tools/vanilla/make-state-fixture.ts <full 存档> tools/vanilla/areas.txt tools/vanilla/areas51.txt
                                                              # v7：重新生成 tests/fixtures/states7.json
npx tsx tools/vanilla/make-save-fixture.ts <full 存档> 17 -17 1
                                                              # v8：剪一个 9 个区块的小存档 → tests/fixtures/save8/
python3 tools/vanilla/extract-assets.py <客户端 1.21.4.jar>
                                                              # v7.1：方块模型和纹理 → resourcepacks/vanilla/（见 resourcepacks/README.md）
```

`blocks.json` 是原版服务端的数据报告：`java -DbundlerMainClass=net.minecraft.data.Main -jar server.jar --reports`，
输出在 `generated/reports/`。v7 起 `diff.ts` 比较的是区块“落定”之后的结果（树叶的 distance 要看周围 3×3 个区块，见
`src/terrain/worldgen/feature/settle.ts`），所以开着地物时会慢一些。

`gen-blocks.py` 要的 jar 是 bundler 里面那个真正的服务端（`META-INF/versions/1.21.4/server-1.21.4.jar`），
libraries 是 bundler 运行一次后解出来的 `libraries/` 目录。它会编译 `BlockDump.java` 并直接调用原版的类
（jar 是混淆过的：几个手查的名字写在 Java 文件的注释里，碰撞箱、破坏时间的方法用反射按“已知方块的值”认出来），所以需要 JDK。

原版存档里的光照偶尔是“没算完”的（保存时还有光照更新在排队）：`diff-light.ts` 会检查每格是否满足
“亮度 = max(光源, 邻居 − 代价)”，不满足的标成“原版没算完”，并给出去掉这些区块之后的一致率。

## 4. 查原版代码

server.jar 里的类名是混淆过的。用 JSON 里出现的字符串（比如 `mangrove_root_placement`）在解压出来的 class 文件里找，
再用 `javap -c -p 类名.class` 看字节码。v5 用这个办法确认了红树根放置器和 `Mth.sin` 的细节；
v5.1 用它核对了几乎每个新地物的随机数顺序（地物名在 `Feature` 注册类里，和 `new 类名` 挨着，可以批量对应）。
v6 的光照：`esr` = LightEngine、`est` = SkyLightEngine、`esi` = BlockLightEngine、`esk` = ChunkSkyLightSources、
`dwx` = BlockBehaviour（`i_` 是 getLightBlock 的默认实现、`e_` 是 propagatesSkylightDown）。
