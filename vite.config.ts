import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VITE_BASE_PATH lets the repository name be configured by GitHub Actions.
export default defineConfig({
  plugins: [react()],
  // Relative asset paths also work when Pages serves this repository from /REPOSITORY/.
  base: process.env.VITE_BASE_PATH || './',
  build: {
    rollupOptions: { input: './app.html' },
  },
})
