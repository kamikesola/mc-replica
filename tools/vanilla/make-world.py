"""
准备一个原版对照存档（v5）：在 <服务端目录>/<存档名>/datapacks/ 里放一个改过生物群系的数据包。

  python3 tools/vanilla/make-world.py <服务端目录> <存档名> <模式> <原版 worldgen 目录>

模式：
  bare     去掉所有地物和雕刻器（只剩地形 + 地表 + 矿脉）
  nocarve  去掉雕刻器（我们还没做），地物保留
  ores     只留第 6 步（矿石），去掉雕刻器
  trees    只有一个 test_trees 地物：每个区块从所有树里随机挑一种（和 tests/featurePacks.ts 完全一样）

原版 worldgen 目录：你自己 jar 里的 data/minecraft/worldgen（或者 datapacks/vanilla/worldgen）。
接着按 tools/vanilla/README.md 启动服务端、forceload、存盘。
"""
import json, os, sys, glob, shutil

server, name, mode, W = sys.argv[1:5]
root = os.path.join(server, name, 'datapacks', mode)
shutil.rmtree(os.path.join(server, name), ignore_errors=True)
files = {}
if mode == 'trees':
    trees = sorted(os.path.basename(f)[:-5] for f in glob.glob(W + '/configured_feature/*.json')
                   if json.load(open(f))['type'] in ('minecraft:tree', 'minecraft:huge_red_mushroom', 'minecraft:huge_brown_mushroom'))
    sap = lambda t: 'minecraft:mangrove_propagule' if 'mangrove' in t else 'minecraft:oak_sapling'
    files['worldgen/configured_feature/test_trees.json'] = {'type': 'minecraft:simple_random_selector', 'config': {'features': [
        {'feature': 'minecraft:' + t, 'placement': [{'type': 'minecraft:block_predicate_filter', 'predicate': {'type': 'minecraft:would_survive', 'state': {'Name': sap(t)}}}]} for t in trees]}}
    files['worldgen/placed_feature/test_trees.json'] = {'feature': 'minecraft:test_trees', 'placement': [
        {'type': 'minecraft:in_square'}, {'type': 'minecraft:surface_water_depth_filter', 'max_water_depth': 2},
        {'type': 'minecraft:heightmap', 'heightmap': 'OCEAN_FLOOR'}, {'type': 'minecraft:biome'}]}
for f in glob.glob(W + '/biome/*.json'):
    d = json.load(open(f))
    d['carvers'] = []
    if mode == 'bare': d['features'] = []
    if mode == 'ores': d['features'] = [l if i == 6 else [] for i, l in enumerate(d['features'])]
    if mode == 'trees': d['features'] = [[] for _ in range(9)] + [['minecraft:test_trees']]
    files['worldgen/biome/' + os.path.basename(f)] = d
for rel, d in files.items():
    p = os.path.join(root, 'data', 'minecraft', rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    json.dump(d, open(p, 'w'))
json.dump({'pack': {'pack_format': 61, 'description': mode}}, open(os.path.join(root, 'pack.mcmeta'), 'w'))
print('写好了', root)
