import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `
  //       @import "@/assets/able-pro/settings/_bootstrap-variables.scss";
  //       @import "@/assets/able-pro/settings/_color-variables.scss";
  //       @import "@/assets/able-pro/settings/_theme-variables.scss";
  //       @import "@/assets/able-pro/pages/_application.scss";
  //       @import "@/assets/able-pro/pages/_chat.scss";
  //       @import "@/assets/able-pro/layouts/_layouts.scss";
  //       @import "@/assets/able-pro/components/_components-variable.scss";
  //       `
  //     }
  //   }
  // }
})
