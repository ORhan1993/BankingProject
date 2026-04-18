import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Tüm ağ arayüzlerinden erişime izin ver
    port: 5173,
    strictPort: true,
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
    watch: {
      usePolling: true,
    },
    // YENİ EKLENEN KISIM: Vite'ye hangi adreslere hizmet verebileceğini söylüyoruz
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'softwarengineer.taild894da.ts.net', // Tailscale MagicDNS adresi
      '100.108.175.65', // Sunucunun Tailscale IP'si
    ],
  }
})
