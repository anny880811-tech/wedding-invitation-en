import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 當本地端呼叫 /api 時，自動代理到你 Vercel 上的線上測試網址
      '/api': {
        target: 'https://wedding-invitation-self-beta.vercel.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})