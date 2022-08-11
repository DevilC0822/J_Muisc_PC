import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 8000,
    open: true,
    https: false,
    proxy: {
      // 正则表达式写法
      '^/api': {
        target: 'http://175.24.198.84:3000/', // 后端服务实际地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    // 配置@别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/style/main.scss";',
      },
    },
  },
  base: './',
  build: {
    chunkSizeWarningLimit: 1024,
  },
})
