/**
 * v8：从原版存档里剪一个很小的存档，给 tests/save.test.ts 用。
 *
 *   npx tsx tools/vanilla/make-save-fixture.ts <原版存档目录> [cx cz 半径=1] [输出=tests/fixtures/save8]
 *
 * 拷 level.dat，再把 (cx, cz) 周围 (2r+1)² 个区块原样搬进一个新的区域文件（其他区块不存），
 * 所以测试里读的是真正的 .mca 格式（扇区、长度、压缩方式都和原版一样）。
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const [dir, cxs = '17', czs = '-17', rs = '1', out = 'tests/fixtures/save8'] = process.argv.slice(2)
if (!dir) throw new Error('用法：make-save-fixture.ts <原版存档目录> [cx cz 半径] [输出目录]')
const cx0 = Number(cxs)
const cz0 = Number(czs)
const r = Number(rs)
mkdirSync(`${out}/region`, { recursive: true })
copyFileSync(`${dir}/level.dat`, `${out}/level.dat`)

const rx = cx0 >> 5
const rz = cz0 >> 5
const src = readFileSync(`${dir}/region/r.${rx}.${rz}.mca`)
const header = Buffer.alloc(8192)
const body: Buffer[] = []
let sector = 2
for (let cz = cz0 - r; cz <= cz0 + r; cz++)
  for (let cx = cx0 - r; cx <= cx0 + r; cx++) {
    if (cx >> 5 !== rx || cz >> 5 !== rz) throw new Error('要剪的区块跨了区域文件，换个位置')
    const i = 4 * ((cx & 31) + (cz & 31) * 32)
    const off = src.readUIntBE(i, 3)
    const count = src[i + 3]
    if (!off) continue
    const data = src.subarray(off * 4096, (off + count) * 4096)
    header.writeUIntBE(sector, i, 3)
    header[i + 3] = count
    header.writeUInt32BE(src.readUInt32BE(4096 + i), 4096 + i)
    body.push(data)
    sector += count
  }
writeFileSync(`${out}/region/r.${rx}.${rz}.mca`, Buffer.concat([header, ...body]))
console.log(`${body.length} 个区块 → ${out}/region/r.${rx}.${rz}.mca（${(sector * 4) | 0} KiB）`)
