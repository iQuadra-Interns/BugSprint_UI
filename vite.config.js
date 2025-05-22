import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // add this plugin to use routes
  optimizeDeps: {
    include: ['react-router-dom'],
  },
})
