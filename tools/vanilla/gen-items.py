#!/usr/bin/env python3
"""
物品数据（v10 / v10.1），从数据报告和原版 jar 生成：

  python3 tools/vanilla/gen-items.py <generated/reports/items.json> <1.21.4 的 jar（客户端或服务端都行）>

写出三个文件：
  src/items/itemList.json  全部物品（1385 种）的名字和最大堆叠数（v10）
  src/items/tools.json     工具（v10.1）：数据报告里 minecraft:tool 组件的规则（哪些方块挖得快、哪些能掉东西），
                           规则里用到的方块标签展开成方块名；耐久（minecraft:max_damage）
  src/items/recipes.json   工作台配方（v10.1）：data/minecraft/recipe/ 里的 crafting_shaped / crafting_shapeless /
                           crafting_transmute，配方里用到的物品标签展开成物品名

数据报告的生成方法见 tools/vanilla/README.md（java -DbundlerMainClass=net.minecraft.data.Main -jar server.jar --reports）。
"""
import json, os, sys, zipfile

root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
items = json.load(open(sys.argv[1]))
jar = zipfile.ZipFile(sys.argv[2])
out_dir = os.path.join(root, 'src/items')
os.makedirs(out_dir, exist_ok=True)


def dump(name, obj, lines=False):
    with open(os.path.join(out_dir, name), 'w') as f:
        if lines:
            f.write('[\n' + ',\n'.join('  ' + json.dumps(x) for x in obj) + '\n]\n')
        else:
            f.write(json.dumps(obj, separators=(',', ':')) + '\n')


# ---------------------------------------------------------------- v10：名字和最大堆叠数
dump('itemList.json', [[k, v['components'].get('minecraft:max_stack_size', 64)] for k, v in items.items()], lines=True)
print(f'{len(items)} 种物品')


# ---------------------------------------------------------------- 标签（方块 / 物品）
def tag_expander(kind):
    cache = {}

    def expand(tag):
        tag = tag.replace('minecraft:', '')
        if tag in cache:
            return cache[tag]
        j = json.loads(jar.read(f'data/minecraft/tags/{kind}/{tag}.json'))
        out = []
        for v in j['values']:
            v = v if isinstance(v, str) else v['id']
            for x in (expand(v[1:]) if v.startswith('#') else ['minecraft:' + v.replace('minecraft:', '')]):
                if x not in out:
                    out.append(x)
        cache[tag] = out
        return out

    return expand


block_tag = tag_expander('block')
item_tag = tag_expander('item')

# ---------------------------------------------------------------- v10.1：工具
tools, block_tags, max_damage = {}, {}, {}
for k, v in items.items():
    c = v['components']
    if 'minecraft:max_damage' in c:
        max_damage[k] = c['minecraft:max_damage']
    t = c.get('minecraft:tool')
    if not t:
        continue
    rules = []
    for r in t['rules']:
        b = r['blocks']
        if isinstance(b, str) and b.startswith('#'):
            block_tags[b[1:]] = block_tag(b[1:])
        rule = {'blocks': b if isinstance(b, (str, list)) else b}
        if 'speed' in r:
            rule['speed'] = r['speed']
        if 'correct_for_drops' in r:
            rule['correct'] = r['correct_for_drops']
        rules.append(rule)
    tool = {'rules': rules}
    if t.get('default_mining_speed', 1) != 1:
        tool['speed'] = t['default_mining_speed']
    if t.get('damage_per_block', 1) != 1:
        tool['damage'] = t['damage_per_block']
    tools[k] = tool
dump('tools.json', {'tools': tools, 'blockTags': block_tags, 'maxDamage': max_damage})
print(f'{len(tools)} 种工具，{len(block_tags)} 个方块标签，{len(max_damage)} 种有耐久的物品')

# ---------------------------------------------------------------- v10.1：配方
item_tags = {}


def ingredient(x):
    """配方里的一个原料：'minecraft:stick'、'#minecraft:planks' 或它们的列表 → 字符串或列表（标签记下来展开）"""
    for s in x if isinstance(x, list) else [x]:
        if s.startswith('#'):
            item_tags[s[1:]] = item_tag(s[1:])
    return x


recipes = {}
skipped = {}
for name in sorted(jar.namelist()):
    if not (name.startswith('data/minecraft/recipe/') and name.endswith('.json')):
        continue
    j = json.loads(jar.read(name))
    rid = 'minecraft:' + name.rsplit('/', 1)[1][:-5]
    typ = j['type'].replace('minecraft:', '')
    if typ == 'crafting_shaped':
        r = {'type': 'shaped', 'pattern': j['pattern'], 'key': {k: ingredient(v) for k, v in j['key'].items()}, 'result': j['result']}
    elif typ == 'crafting_shapeless':
        r = {'type': 'shapeless', 'ingredients': [ingredient(v) for v in j['ingredients']], 'result': j['result']}
    elif typ == 'crafting_transmute':
        r = {'type': 'transmute', 'input': ingredient(j['input']), 'material': ingredient(j['material']), 'result': {'id': j['result']}}
    else:
        skipped[typ] = skipped.get(typ, 0) + 1
        continue
    r['result'] = {'id': r['result']['id'], 'count': r['result'].get('count', 1)}
    recipes[rid] = r

# 战利品表的 match_tool 用到的物品标签（紫水晶簇要用镐挖才掉满 4 个）
for t in ['cluster_max_harvestables']:
    item_tags['minecraft:' + t] = item_tag(t)
dump('recipes.json', {'recipes': recipes, 'itemTags': item_tags})
print(f'{len(recipes)} 个工作台配方，{len(item_tags)} 个物品标签；没做的：{skipped}')
