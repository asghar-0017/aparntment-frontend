// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/available': {
        target: 'https://aparntment-rental-frontend.vercel.app', // Replace with your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
