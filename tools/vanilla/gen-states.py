#!/usr/bin/env python3
"""
v7：生成 src/terrain/stateDefs.json —— 我们用到的每种方块有哪些属性、每个属性的取值、默认状态。

  python3 tools/vanilla/gen-states.py <reports/blocks.json>

blocks.json 是原版服务端的数据报告：java -DbundlerMainClass=net.minecraft.data.Main -jar server.jar --reports
（输出在 generated/reports/blocks.json）。

属性的顺序、取值的顺序都和报告一样：原版的状态编号就是按这个顺序“最后一个属性变得最快”排的，
所以我们的状态下标 = 原版状态 ID − 这个方块第一个状态的 ID。
"""
import json, os, subprocess, sys

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(os.path.dirname(here))
report = json.load(open(sys.argv[1]))
names = json.loads(subprocess.run(['npx', 'tsx', '-e',
    "import {NAME_BY_BLOCK} from './src/terrain/blocks'; console.log(JSON.stringify([...new Set(NAME_BY_BLOCK.filter(Boolean))]))"],
    cwd=root, check=True, capture_output=True, text=True).stdout)
out = {}
for n in sorted(names):
    b = report.get(n)
    if b is None:
        print('原版没有', n)
        continue
    props = b.get('properties', {})
    if not props:
        continue
    default = next(s for s in b['states'] if s.get('default'))
    out[n] = {'props': [[k, v] for k, v in props.items()], 'default': default['properties']}
path = os.path.join(root, 'src/terrain/stateDefs.json')
with open(path, 'w') as f:
    f.write('{\n' + ',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, separators=(",", ":"))}' for k, v in out.items()) + '\n}\n')
total = 1
print(f'写了 {path}：{len(out)} 种方块有属性')
