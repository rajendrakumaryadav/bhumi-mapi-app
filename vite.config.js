import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed at https://rajendrakumaryadav.github.io/land-area-calculator/
// `base` controls where the built index.html, JS and CSS resolve from.
// Set BASE_PATH to '/' for a custom-domain / user-site root deploy.
const BASE_PATH = process.env.BASE_PATH || '/land-area-calculator/'

export default defineConfig({
  base: BASE_PATH,
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
