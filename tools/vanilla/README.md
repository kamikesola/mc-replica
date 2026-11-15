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

`make-world.py` 的模式：`bare`（不放地物、不雕刻）、`carvers`（只雕刻）、`ores` / `trees`（只留一类地物）、`full`（原版全部）。

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
python3 tools/vanilla/gen-tags.py <解包的 jar 目录>          # v5.1：从原版 jar 展开方块标签，写 blockTags.json
```

## 4. 查原版代码

server.jar 里的类名是混淆过的。用 JSON 里出现的字符串（比如 `mangrove_root_placement`）在解压出来的 class 文件里找，
再用 `javap -c -p 类名.class` 看字节码。v5 用这个办法确认了红树根放置器和 `Mth.sin` 的细节；
v5.1 用它核对了几乎每个新地物的随机数顺序（地物名在 `Feature` 注册类里，和 `new 类名` 挨着，可以批量对应）。
