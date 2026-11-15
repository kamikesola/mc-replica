/** v5.1 地物对照测试按方块类别分组（tools/vanilla/make-full-fixture.ts 和 tests/feature.test.ts 共用） */
export const CATEGORIES: Record<string, RegExp> = {
  晶洞: /amethyst|calcite|smooth_basalt/,
  地牢: /mossy_cobblestone|spawner|chest/,
  冰山和冰刺: /packed_ice|blue_ice/,
  发光地衣: /glow_lichen/,
  岩浆块: /magma_block/,
  花: /dandelion|poppy|tulip|daisy|cornflower|lily_of_the_valley|allium|azure_bluet|blue_orchid|sunflower|lilac|rose_bush|peony/,
  海草和海带: /seagrass|kelp/,
  珊瑚: /coral/,
  苔藓和黏土: /moss_block|clay/,
  滴水石: /dripstone/,
  幽匿: /sculk/,
  沙漠植物: /cactus|dead_bush|sugar_cane/,
  // v5.2
  化石: /bone_block/,
  气泡柱: /bubble_column/,
  下界植物: /crimson|warped|nether_wart|weeping|twisting|nether_sprouts|shroomlight/,
  萤石: /glowstone/,
  下界矿石: /nether_quartz_ore|nether_gold_ore|ancient_debris/,
  末地: /end_stone|obsidian|chorus|iron_bars|end_gateway/
}
