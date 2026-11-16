#!/usr/bin/env python3
"""
v8.1：原版全部方块（1095 种、27866 个状态）的数据，代替 v7 的 gen-states.py 和 v6 的 gen-light.py。

  python3 tools/vanilla/gen-blocks.py <reports/blocks.json> <server-1.21.4.jar> <libraries 目录>

写这些文件（都按原版的顺序：方块按注册顺序，状态按“最后一个属性变得最快”）：
  src/terrain/blockList.json        所有方块名
  src/terrain/stateDefs.json        有属性的方块：属性、取值、默认状态（来自数据报告 blocks.json）
  src/terrain/light/lightProps.json 每个状态的 [lightBlock, lightEmission]（所有状态一样时只写一组）
  src/terrain/blockShapes.json      每个状态的碰撞箱（去重后的形状编号）、破坏时间、坚固的面（v9）
  tools/vanilla/out/light-states.tsv 完整的状态 → 光照表（diff-light.ts --vanilla-blocks 用）
后三项来自原版服务端本身：tools/vanilla/BlockDump.java 用反射调用 jar 里的方法导出。
"""
import json, os, re, subprocess, sys, tempfile, zipfile

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(os.path.dirname(here))
report = json.load(open(sys.argv[1]))
jar, libs = sys.argv[2], sys.argv[3]

def write_json_lines(path, obj):
    """一个方块一行，diff 时好看"""
    with open(path, 'w') as f:
        f.write('{\n' + ',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, separators=(",", ":"))}' for k, v in obj.items()) + '\n}\n')

# ---- 1. 方块名、属性（数据报告）
names = list(report.keys())
with open(os.path.join(root, 'src/terrain/blockList.json'), 'w') as f:
    f.write('[\n' + ',\n'.join('  ' + json.dumps(n) for n in names) + '\n]\n')
defs = {}
for n in names:
    b = report[n]
    props = b.get('properties', {})
    if not props:
        continue
    default = next(s for s in b['states'] if s.get('default'))
    defs[n] = {'props': [[k, v] for k, v in props.items()], 'default': default['properties']}
write_json_lines(os.path.join(root, 'src/terrain/stateDefs.json'), defs)

# 每个状态在本方块里的下标（原版顺序）：属性按名字排序后的字符串 → 下标
def key(name, props):
    return name + ('[' + ','.join(f'{k}={props[k]}' for k in sorted(props)) + ']' if props else '')
index = {}
for n in names:
    for i, s in enumerate(report[n]['states']):
        index[key(n, s.get('properties', {}))] = (n, i)

# ---- 2. 原版服务端：光照、碰撞箱、破坏时间
tmp = tempfile.mkdtemp()
unsigned = os.path.join(tmp, 'server.jar')  # 原版 jar 带签名，和我们自己的类放在一起会报“签名不一致”，先去掉签名
with zipfile.ZipFile(jar) as zin, zipfile.ZipFile(unsigned, 'w', zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        if not re.match(r'META-INF/.*\.(SF|RSA|DSA|EC)$', item.filename):
            zout.writestr(item, zin.read(item.filename))
cp = ':'.join([unsigned] + [os.path.join(d, f) for d, _, fs in os.walk(libs) for f in fs if f.endswith('.jar')])
subprocess.run(['javac', '-proc:none', '-d', tmp, '-cp', cp, os.path.join(here, 'BlockDump.java')], check=True)
out = os.path.join(tmp, 'states.tsv')
subprocess.run(['java', '-cp', tmp + ':' + cp, 'BlockDump', out, unsigned], check=True, stdout=subprocess.DEVNULL, cwd=tmp)  # 原版会在当前目录写 logs/

rows = {n: [None] * len(report[n]['states']) for n in names}
os.makedirs(os.path.join(here, 'out'), exist_ok=True)
with open(os.path.join(here, 'out', 'light-states.tsv'), 'w') as lf:
    for line in open(out):
        st, lb, em, hard, boxes, sturdy = line.rstrip('\n').split('\t')
        m = re.match(r'Block\{(minecraft:[a-z0-9_]+)\}(?:\[([^\]]*)\])?$', st)
        props = dict(kv.split('=') for kv in m.group(2).split(',')) if m.group(2) else {}
        k = key(m.group(1), props)
        lf.write(f'{k}\t{lb}\t{em}\n')
        n, i = index[k]
        rows[n][i] = (int(lb), int(em), float(hard), boxes, int(sturdy))

def compact(vals):
    """所有状态一样就只写一个"""
    return vals[0] if all(v == vals[0] for v in vals) else vals

light = {n: compact([[r[0], r[1]] for r in rows[n]]) for n in names}
write_json_lines(os.path.join(root, 'src/terrain/light/lightProps.json'), light)

shapes, shape_ids = [], {}
def shape_id(boxes):
    if boxes not in shape_ids:
        shape_ids[boxes] = len(shapes)
        shapes.append([round(float(x), 6) for b in boxes.split(';') if b for x in b.split(',')])
    return shape_ids[boxes]
shape_id('')                    # 0：没有碰撞箱
shape_id('0.0,0.0,0.0,1.0,1.0,1.0')  # 1：完整方块
blocks = {n: compact([shape_id(r[3]) for r in rows[n]]) for n in names}
hardness = {n: compact([r[2] for r in rows[n]]) for n in names}
sturdy = {n: compact([r[4] for r in rows[n]]) for n in names}
with open(os.path.join(root, 'src/terrain/blockShapes.json'), 'w') as f:
    f.write('{\n  "shapes": [\n' + ',\n'.join('    ' + json.dumps(s, separators=(',', ':')) for s in shapes) + '\n  ],\n')
    f.write('  "collision": {\n' + ',\n'.join(f'    {json.dumps(k)}: {json.dumps(v, separators=(",", ":"))}' for k, v in blocks.items()) + '\n  },\n')
    f.write('  "hardness": {\n' + ',\n'.join(f'    {json.dumps(k)}: {json.dumps(v, separators=(",", ":"))}' for k, v in hardness.items()) + '\n  },\n')
    f.write('  "sturdy": {\n' + ',\n'.join(f'    {json.dumps(k)}: {json.dumps(v, separators=(",", ":"))}' for k, v in sturdy.items()) + '\n  }\n}\n')
print(f'{len(names)} 种方块，{sum(len(r) for r in rows.values())} 个状态，{len(shapes)} 种碰撞箱')
