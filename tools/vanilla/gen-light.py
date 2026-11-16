#!/usr/bin/env python3
"""
v6：生成 src/terrain/light/lightProps.json —— 我们用到的每种方块的 [lightBlock, lightEmission]。
v7：按方块状态取（洞穴藤蔓有浆果时发光、海泡菜越多越亮、含水的方块挡光）：
    所有状态都一样的写一组，否则按 src/terrain/states.ts 的状态顺序写一个列表。下面 v6 的“挑一个状态”的规则不再用了。

  python3 tools/vanilla/gen-light.py <server-1.21.4.jar> <libraries 目录>

原版的方块有状态，我们的没有（v7 才有），每种方块挑一个状态：
  - 一直含水的方块（海草、珊瑚……）用 waterlogged=true 的状态，其余用 waterlogged=false（有这个属性的话）
  - 在这些状态里取出现最多的那组值；一样多就用默认状态的（发光地衣：有面的状态都是 7，没有面的默认状态是 0 → 7；
    海泡菜：1~4 个各不相同 → 默认 1 个 = 6；洞穴藤蔓：有没有浆果各一半 → 默认没有 = 0）
"""
import collections, json, os, re, subprocess, sys, tempfile, zipfile

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(os.path.dirname(here))
jar, libs = sys.argv[1], sys.argv[2]
tmp = tempfile.mkdtemp()
# 原版 jar 带签名，和默认包里我们自己的类放在一起会报“签名不一致”，先去掉签名
unsigned = os.path.join(tmp, 'server.jar')
with zipfile.ZipFile(jar) as zin, zipfile.ZipFile(unsigned, 'w', zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        if re.match(r'META-INF/.*\.(SF|RSA|DSA|EC)$', item.filename):
            continue
        zout.writestr(item, zin.read(item.filename))
cp = ':'.join([unsigned] + [os.path.join(d, f) for d, _, fs in os.walk(libs) for f in fs if f.endswith('.jar')])
subprocess.run(['javac', '-proc:none', '-d', tmp, '-cp', cp, os.path.join(here, 'LightDump.java')], check=True)
out = os.path.join(tmp, 'states.tsv')
subprocess.run(['java', '-cp', tmp + ':' + cp, 'LightDump', out], check=True, stdout=subprocess.DEVNULL, cwd=tmp)  # 原版会在当前目录写 logs/

# 完整的状态表留一份给核对工具（diff-light.ts --vanilla-blocks）：状态（属性按名字排序）→ lightBlock lightEmission
os.makedirs(os.path.join(here, 'out'), exist_ok=True)
with open(os.path.join(here, 'out', 'light-states.tsv'), 'w') as f:
    for line in open(out):
        m = re.match(r'Block\{(minecraft:[a-z0-9_]+)\}(?:\[([^\]]*)\])?\t\d\t(\d+)\t(\d+)', line)
        if m:
            props = ','.join(sorted(m.group(2).split(','))) if m.group(2) else ''
            f.write(f"{m.group(1)}{'[' + props + ']' if props else ''}\t{m.group(3)}\t{m.group(4)}\n")

# v7：按状态取。我们每个方块的每个状态（按 states.ts 的顺序）在原版状态表里查
table = {}
for line in open(os.path.join(here, 'out', 'light-states.tsv')):
    st, a, b = line.rstrip('\n').split('\t')
    table[st] = [int(a), int(b)]
ours = json.loads(subprocess.run(['npx', 'tsx', '-e',
    "import {STATES, fullStateName} from './src/terrain/blocks'; import {stateAt} from './src/terrain/states';"
    "console.log(JSON.stringify(STATES.defs.map((d, b) => [d.name, Array.from({length: d.count}, (_, i) => fullStateName(stateAt(STATES, b, i)))])))"],
    cwd=root, check=True, capture_output=True, text=True).stdout)
props = {}
for name, names in ours:
    vals = []
    for st in names:
        if st not in table:
            raise SystemExit('原版没有这个状态：' + st)
        vals.append(table[st])
    # 所有状态都一样就只写一组
    props[name] = vals[0] if all(v == vals[0] for v in vals) else vals
path = os.path.join(root, 'src/terrain/light/lightProps.json')
with open(path, 'w') as f:
    f.write('{\n' + ',\n'.join(f'  "{k}": {json.dumps(v, separators=(",", ":"))}' for k, v in props.items()) + '\n}\n')
print(f'写了 {path}：{len(props)} 种方块，{sum(1 for v in props.values() if isinstance(v[0], list))} 种按状态不同')
