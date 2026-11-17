# 放你自己的资源包（v7.1）

这个目录下的内容不会提交到 git（原版的模型和纹理归 Mojang 所有）。

## 用原版 1.21.4 的方块模型和纹理

1. 找到你自己的客户端 jar：`.minecraft/versions/1.21.4/1.21.4.jar`（官方启动器下载过 1.21.4 就有），它就是一个 zip。
2. 拷出六个目录（v10 起多了物品的三个），任选一种方法：

```text
python3 tools/vanilla/extract-assets.py <你的 1.21.4.jar>
```

或者用解压软件手动拷，保持目录结构：

```text
resourcepacks/
  vanilla/
    assets/
      minecraft/
        blockstates/       方块状态 → 模型（oak_log.json：axis=x 用横着的模型，转 90°）
        models/block/      方块模型（盒子、面、纹理、旋转）
        textures/block/    方块纹理（.png）
        items/             物品 → 模型（v10：物品图标）
        models/item/       物品模型（v10）
        textures/item/     物品纹理（v10）
```

3. 重启 `npm run dev`。F3 里“资源包”一行会显示 `vanilla`。

没有资源包时用 v1~v7 程序画的纹理和简单形状（立方体、十字、薄片），游戏照常能玩。

## 说明

- 只读这个项目里有的方块用到的那些文件（第一次加载时按需读，不会把 2000 多个模型全读进来）。
- 动画纹理（水、岩浆、火、海晶灯……）只取第一帧，还不会动。
- 多个资源包时按目录名的字母顺序加载，后面的覆盖前面的（同名文件）。
- `npm run build` 会把这里的文件一起打包，只适合自己用；公开部署请用 `npm run build:public`，它会跳过这个目录。
