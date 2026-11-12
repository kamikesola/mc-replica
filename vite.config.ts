import { defineConfig } from 'vite'

export default defineConfig({
  // 部署到 GitHub Pages 子路径时改成 '/mc-replica/v0/' 之类
  base: './',
  build: {
    target: 'es2022', // bigint 字面量需要 ES2020+
    sourcemap: true
  },
  worker: {
    format: 'es'
  }
})
