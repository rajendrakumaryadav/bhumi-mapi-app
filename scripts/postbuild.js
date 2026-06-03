import { copyFileSync, existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// ---------------------------------------------------------------------------
// Post-build steps for GitHub Pages SPA deploys.
//
// 1. Copy dist/index.html → dist/404.html so that deep links
//    (e.g. /land-area-calculator/privacy) work — GitHub Pages serves
//    404.html for any unknown path, which then loads the React bundle
//    and lets the Router render the correct page.
//
// 2. Verify the built index.html actually points at the configured
//    deployment subpath. Catches the most common deploy bug: forgetting
//    to rebuild after changing vite.config.js, which leaves stale
//    absolute asset paths that 404 in production.
// ---------------------------------------------------------------------------

const distDir = resolve(process.cwd(), 'dist')
const indexPath = resolve(distDir, 'index.html')
const notFoundPath = resolve(distDir, '404.html')

if (!existsSync(indexPath)) {
  console.error('postbuild: dist/index.html not found. Did `vite build` run?')
  process.exit(1)
}

// 1. SPA fallback
copyFileSync(indexPath, notFoundPath)
console.log(`postbuild: copied ${indexPath} → ${notFoundPath}`)

// 2. Sanity check: asset paths should start with the same subpath the
//    site is deployed under. Read it from the built HTML (Vite writes
//    a <base href="…"> tag for exactly this reason).
const html = readFileSync(indexPath, 'utf-8')
const baseMatch = html.match(/<base\s+href="([^"]+)"\s*\/?>/i)
const baseHref = baseMatch ? baseMatch[1] : '/'

const scriptMatch = html.match(/<script[^>]+src="([^"]+)"/)
const linkMatch = html.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/)
const assetPaths = [scriptMatch?.[1], linkMatch?.[1]].filter(Boolean)

if (assetPaths.length === 0) {
  console.warn('postbuild: no <script> or <link rel=stylesheet> found, skipping verification.')
} else {
  const bad = assetPaths.filter((p) => !p.startsWith(baseHref) && !p.startsWith('http'))
  if (bad.length > 0) {
    console.error(
      `\npostbuild: VERIFICATION FAILED.\n` +
        `  Configured base : ${baseHref}\n` +
        `  Bad asset paths : ${bad.join(', ')}\n\n` +
        `  This usually means ` +
        `(a) the build was done before the `base` config was added to vite.config.js, or ` +
        `(b) BASE_PATH is set to the wrong value.\n` +
        `  Try:  rm -rf dist && BASE_PATH=/land-area-calculator/ npm run build\n`,
    )
    process.exit(1)
  }
  console.log(
    `postbuild: asset paths OK (base=${baseHref}, ${assetPaths.length} checked)`,
  )
}
