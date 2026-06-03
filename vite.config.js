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

// `process.env.BASE_PATH` is *only* respected if it's a non-empty string
// other than "/". This stops a stray `BASE_PATH=` (empty) or `BASE_PATH=/`
// from a shell/.env/CI override silently flipping the build to root.
const rawBase = process.env.BASE_PATH
const BASE_PATH =
  rawBase && rawBase !== '/' ? rawBase : '/land-area-calculator/'

// Print so it's visible in the build log *why* this value was picked.
if (rawBase && rawBase !== BASE_PATH) {
  console.warn(
    `[vite.config.js] process.env.BASE_PATH=${JSON.stringify(rawBase)} ` +
      `is being ignored, using ${JSON.stringify(BASE_PATH)} instead. ` +
      `If you actually want to deploy to a different subpath, update ` +
      `the default in vite.config.js (and postbuild.js).`,
  )
} else {
  console.log(`[vite.config.js] base = ${JSON.stringify(BASE_PATH)}`)
}

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
