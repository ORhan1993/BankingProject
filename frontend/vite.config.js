import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Dışarıdan bağlantıya izin ver
    port: 5173,
    strictPort: true, // Eğer 5173 meşgulse hata ver, başka porta atlama (Docker için önemli)
    watch: {
      usePolling: true, // Docker içindeki dosya değişikliklerini algılamak için
    }
  }
})
