import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Docker içinde dışarıdan erişim için gerekli
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true
    },
    // WebSocket hatasını çözen HMR (Hot Module Replacement) ayarı
    hmr: {
      host: 'softwarengineer.taild894da.ts.net', // Tarayıcının bağlandığı dış adres
      clientPort: 5173 // Tarayıcının bağlandığı port
    }
  }
})