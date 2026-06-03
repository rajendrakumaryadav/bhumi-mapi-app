import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ---------------------------------------------------------------------------
// The site is deployed to:
//
//     https://rajendrakumaryadav.github.io/land-area-calculator/
//
// `base` controls where the built `index.html`, JS and CSS resolve from.
// If the build is done without this option set, Vite defaults `base` to
// '/' and the resulting bundle will be referenced from the wrong URL
// (you'll see 404s on `/assets/index-*.js` in the Network tab).
//
// To deploy under a different subpath, override at build time:
//
//     BASE_PATH=/my-other-folder/ npm run build
//
// To deploy at the root (custom domain or user-site), use:
//
//     BASE_PATH=/ npm run build
// ---------------------------------------------------------------------------
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
