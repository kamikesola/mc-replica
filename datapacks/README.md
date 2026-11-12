# 放你自己的数据包

这个目录下的内容不会提交到 git（原版数据归 Mojang 所有）。

## 加载原版 1.21.1 的世界生成数据

1. 找到你自己的客户端 jar：`.minecraft/versions/1.21.1/1.21.1.jar`，它就是一个 zip。
2. 把里面 `data/minecraft/worldgen/` 拷出来，下面两种放法都可以：

```text
datapacks/
  vanilla/
    worldgen/                 ← 放法一：只拷 worldgen（命名空间默认是 minecraft）
      noise/...
      density_function/...
      noise_settings/...
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

只读取 `noise`、`density_function`、`noise_settings` 三个子目录，其他目录（biome、structure……）会被忽略，
也不会被打包进页面。

## 自己写数据包

按同样的结构放就行，例如 `datapacks/mypack/data/mypack/worldgen/density_function/test.json`，
它的 ID 就是 `mypack:test`。目录名按字母顺序加载，后加载的同名 ID 覆盖先加载的。

## 部署

`npm run build` 会把这里的数据一起打包，只适合自己用；
公开部署（比如 GitHub Pages）请用 `npm run build:public`，它会跳过这个目录。
