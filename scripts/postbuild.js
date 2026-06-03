import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// GitHub Pages serves 404.html for any path it doesn't recognise.
// Copying index.html → 404.html is the standard SPA fallback trick:
//   /land-area-calculator/privacy  →  GitHub Pages serves 404.html
//                                  →  loads the React bundle
//                                  →  BrowserRouter renders the Privacy page
// See: https://github.com/rafgraph/spa-github-pages

const src = resolve(process.cwd(), 'dist/index.html')
const dest = resolve(process.cwd(), 'dist/404.html')

if (!existsSync(src)) {
  console.error('postbuild: dist/index.html not found. Did `vite build` run?')
  process.exit(1)
}

copyFileSync(src, dest)
console.log(`postbuild: copied ${src} → ${dest}`)
