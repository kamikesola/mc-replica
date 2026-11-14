# 放你自己的数据包

这个目录下的内容不会提交到 git（原版数据归 Mojang 所有）。

## 加载原版 1.21.4 的世界生成数据

1. 找到你自己的客户端 jar：`.minecraft/versions/1.21.4/1.21.4.jar`，它就是一个 zip。
2. 把里面 `data/minecraft/worldgen/` 拷出来，下面两种放法都可以：

```text
datapacks/
  vanilla/
    worldgen/                 ← 放法一：只拷 worldgen（命名空间默认是 minecraft）
      noise/...
      density_function/...
      noise_settings/...
      biome/...               ← v4：生物群系的温度、湿度、颜色
      configured_feature/...  ← v5：地物（矿石、树……）
      placed_feature/...      ← v5：地物的放置规则
```

```text
datapacks/
  vanilla/
    data/
      minecraft/
        worldgen/             ← 放法二：标准数据包结构，可以有多个命名空间
          ...
```

3. 重启 `npm run dev`。菜单上会显示当前用的 noise_settings，
   菜单的“世界设置”里会出现 `minecraft:overworld` 等 7 个原版 noise_settings。

只读取 `noise`、`density_function`、`noise_settings`、`biome`（v4 起）、`configured_feature` 和 `placed_feature`（v5 起）六个子目录，其他目录（structure、template_pool……）会被忽略，
也不会被打包进页面。

## 核对生物群系（可选）

原版服务端可以导出主世界的气候参数表：

```text
java -DbundlerMainClass=net.minecraft.data.Main -jar server.jar --reports
```

把生成的 `generated/reports/biome_parameters/` 拷到 `datapacks/reports/biome_parameters/`，
`npm test` 会把 v4 手抄的参数表和它逐项比较（没有就跳过）。

## 自己写数据包

按同样的结构放就行，例如 `datapacks/mypack/data/mypack/worldgen/density_function/test.json`，
它的 ID 就是 `mypack:test`。目录名按字母顺序加载，后加载的同名 ID 覆盖先加载的。

## 部署

`npm run build` 会把这里的数据一起打包，只适合自己用；
公开部署（比如 GitHub Pages）请用 `npm run build:public`，它会跳过这个目录。
