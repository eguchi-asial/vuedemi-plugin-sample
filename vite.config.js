import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    assetsDir: path.join(__dirname, 'src/assets/'),
    lib: {
      name: 'my-component',
      entry: resolve(__dirname, 'src/index.ts')
    },
    rollupOptions: {
      external: "vue",
      output: {
        globals: {
          vue: "Vue",
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'assets': path.join(__dirname, 'src/assets/')
    }
  }
})