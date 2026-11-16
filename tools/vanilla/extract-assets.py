#!/usr/bin/env python3
"""
v7.1：从你自己的 1.21.4 客户端 jar 里拷出方块模型和纹理，放进 resourcepacks/vanilla/（不进 git）。

    python3 tools/vanilla/extract-assets.py <客户端 jar> [输出目录，默认 resourcepacks/vanilla]

客户端 jar 在 .minecraft/versions/1.21.4/1.21.4.jar（就是一个 zip）。只拷三个目录：
    assets/minecraft/blockstates/      方块状态 → 模型
    assets/minecraft/models/block/     方块模型
    assets/minecraft/textures/block/   方块纹理（.png，动画纹理的 .mcmeta 不需要）
没有 Python 的话，用解压软件手动拷这三个目录也一样（保持 assets/minecraft/... 的目录结构）。
"""
import sys
import zipfile
from pathlib import Path

PREFIXES = ('assets/minecraft/blockstates/', 'assets/minecraft/models/block/', 'assets/minecraft/textures/block/')


def main() -> None:
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    jar = Path(sys.argv[1])
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else Path(__file__).resolve().parents[2] / 'resourcepacks' / 'vanilla'
    n = 0
    with zipfile.ZipFile(jar) as z:
        for name in z.namelist():
            if not name.startswith(PREFIXES) or name.endswith('/') or name.endswith('.mcmeta'):
                continue
            target = out / name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(z.read(name))
            n += 1
    print(f'拷出 {n} 个文件 → {out}')


if __name__ == '__main__':
    main()
