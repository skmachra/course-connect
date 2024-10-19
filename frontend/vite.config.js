import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    build: {
      outDir: 'dist'
  },  
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://gastric-leodora-sunilk-f03394eb.koyeb.app', // Your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
