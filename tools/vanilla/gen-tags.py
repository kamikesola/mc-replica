#!/usr/bin/env python3
"""从原版 jar 解出来的 data/minecraft/tags/block/*.json 展开地物要用的方块标签，写成 src/terrain/worldgen/feature/blockTags.json。
用法：python3 tools/vanilla/gen-tags.py <解包后的 jar 目录>"""
import json, os, sys
root = os.path.join(sys.argv[1], 'data/minecraft/tags/block')
NEEDED = '''air dirt sand snow ice leaves logs flowers small_flowers base_stone_overworld base_stone_nether stone_ore_replaceables
deepslate_ore_replaceables features_cannot_replace replaceable replaceable_by_trees mangrove_logs_can_grow_through
mangrove_roots_can_grow_through azalea_grows_on azalea_root_replaceable lush_ground_replaceable moss_replaceable
overworld_carver_replaceables snow_layer_cannot_survive_on snow_layer_can_survive_on geode_invalid_blocks
sculk_replaceable sculk_replaceable_world_gen dripstone_replaceable_blocks coral_blocks corals wall_corals coral_plants
lava_pool_stone_cannot_replace small_dripleaf_placeable big_dripleaf_placeable bamboo_plantable_on dead_bush_may_place_on
mushroom_grow_block replaceable_by_mushrooms terracotta supports_vegetation mineable/pickaxe frogs_spawnable_on
sand stone_bricks wool wool_carpets'''.split()
cache = {}
def expand(tag):
    if tag in cache: return cache[tag]
    j = json.load(open(os.path.join(root, tag + '.json')))
    out = []
    for v in j['values']:
        v = v if isinstance(v, str) else v['id']
        if v.startswith('#'):
            out += [x for x in expand(v[1:].replace('minecraft:', '')) if x not in out]
        else:
            n = v.replace('minecraft:', '')
            if n not in out: out.append(n)
    cache[tag] = out
    return out
res = {}
for t in NEEDED:
    if os.path.exists(os.path.join(root, t + '.json')): res[t] = expand(t)
    else: print('没有标签', t, file=sys.stderr)
json.dump(res, open('src/terrain/worldgen/feature/blockTags.json', 'w'), separators=(',', ':'))
print(len(res), 'tags', sum(len(v) for v in res.values()), 'entries')
