import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' * data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' * blob:; style-src 'self' 'unsafe-inline' *; font-src 'self' data: *; img-src 'self' data: blob: *;"
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    target: 'esnext',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@tiptap')) {
              return 'vendor-editor';
            }
            if (id.includes('framer-motion') || id.includes('gsap') || id.includes('@gsap')) {
              return 'vendor-animations';
            }
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'vendor-icons';
            }
            if (id.includes('react-router-dom') || id.includes('react-dom') || id.includes('react')) {
              return 'vendor-react';
            }
            return 'vendor-libs';
          }
        }
      }
    },
    chunkSizeWarningLimit: 800
  }
})
