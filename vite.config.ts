import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['posthog-js'],
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
})
