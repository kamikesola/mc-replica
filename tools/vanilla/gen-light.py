#!/usr/bin/env python3
"""
v6：生成 src/terrain/light/lightProps.json —— 我们用到的每种方块的 [lightBlock, lightEmission]。

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
subprocess.run(['java', '-cp', tmp + ':' + cp, 'LightDump', out], check=True, stdout=subprocess.DEVNULL)

# 完整的状态表留一份给核对工具（diff-light.ts --vanilla-blocks）：状态（属性按名字排序）→ lightBlock lightEmission
os.makedirs(os.path.join(here, 'out'), exist_ok=True)
with open(os.path.join(here, 'out', 'light-states.tsv'), 'w') as f:
    for line in open(out):
        m = re.match(r'Block\{(minecraft:[a-z0-9_]+)\}(?:\[([^\]]*)\])?\t\d\t(\d+)\t(\d+)', line)
        if m:
            props = ','.join(sorted(m.group(2).split(','))) if m.group(2) else ''
            f.write(f"{m.group(1)}{'[' + props + ']' if props else ''}\t{m.group(3)}\t{m.group(4)}\n")

states = collections.defaultdict(list)
for line in open(out):
    m = re.match(r'Block\{minecraft:([a-z0-9_]+)\}(\[[^\]]*\])?\t(\d)\t(\d+)\t(\d+)', line)
    if m:
        states[m.group(1)].append((m.group(2) or '', m.group(3) == '1', (int(m.group(4)), int(m.group(5)))))

# 我们的方块名、一直含水的方块
ours = subprocess.run(['npx', 'tsx', '-e',
    "import {NAME_BY_BLOCK} from './src/terrain/blocks'; import {ALWAYS_WATERLOGGED} from './src/terrain/worldgen/feature/core';"
    "console.log(JSON.stringify({names:[...new Set(NAME_BY_BLOCK.filter(Boolean))], wet:[...ALWAYS_WATERLOGGED]}))"],
    cwd=root, check=True, capture_output=True, text=True).stdout
ours = json.loads(ours)
wet = set(ours['wet'])
props = {}
for full in sorted(ours['names']):
    n = full[len('minecraft:'):]
    ss = states[n]
    if not ss:
        print('原版没有', n); continue
    want = 'waterlogged=true' if full in wet else 'waterlogged=false'
    pick = [s for s in ss if want in s[0]] or ss
    count = collections.Counter(v for _, _, v in pick)
    best = max(count.values())
    default = next((v for _, d, v in pick if d), None)
    top = [v for v, c in count.items() if c == best]
    v = default if default in top else top[0]
    props[full] = list(v)
path = os.path.join(root, 'src/terrain/light/lightProps.json')
with open(path, 'w') as f:
    f.write('{\n' + ',\n'.join(f'  "{k}": {json.dumps(v)}' for k, v in props.items()) + '\n}\n')
print(f'写了 {path}：{len(props)} 种方块')
