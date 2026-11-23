import { defineConfig } from 'vite'

export default defineConfig({
  // 相对路径：同一份构建放进 GitHub Pages 的任意子目录（/v0/、/v10.1/……）都能用，不用改
  base: './',
  build: {
    target: 'es2022', // bigint 字面量需要 ES2020+
    sourcemap: true
  },
  worker: {
    format: 'es'
  }
})
