import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()], // Element-plus自动引入
    }),
    Components({
      resolvers: [ElementPlusResolver()], // Element-plus自动引入
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@api', replacement: fileURLToPath(new URL('./src/api', import.meta.url)) },
    ],
  },
  build: {
    rollupOptions: {
      input: {
        index: './index.html',
        main: './main.html',
      },
    },
  },
})
