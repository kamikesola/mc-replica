#!/usr/bin/env python3
"""
v10：原版全部物品（1385 种）的名字和最大堆叠数 → src/items/itemList.json

  python3 tools/vanilla/gen-items.py <generated/reports/items.json>

数据报告的 items.json 里每个物品有一堆默认组件，我们只要 max_stack_size。
"""
import json, os, sys

root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
items = json.load(open(sys.argv[1]))
out = [[k, v['components'].get('minecraft:max_stack_size', 64)] for k, v in items.items()]
os.makedirs(os.path.join(root, 'src/items'), exist_ok=True)
with open(os.path.join(root, 'src/items/itemList.json'), 'w') as f:
    f.write('[\n' + ',\n'.join('  ' + json.dumps(x) for x in out) + '\n]\n')
print(f'{len(out)} 种物品')
