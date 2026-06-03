import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// ---------------------------------------------------------------------------
// Post-build steps for GitHub Pages SPA deploys.
//
// 1. Sanity-check the built index.html. We DO NOT look for a <base> tag
//    (Vite 5 often omits it when all asset URLs are already absolute).
//    Instead we look at the first <script src> or <link href> that points
//    at a root-relative path and confirm it sits under EXPECTED_BASE.
//
// 2. Generate dist/404.html using the rafgraph SPA technique.
//    `pathSegmentsToKeep` is derived from EXPECTED_BASE (the same value
//    vite.config.js used when building), so the redirect can never go to
//    the wrong host.
//
//    https://github.com/rafgraph/spa-github-pages
// ---------------------------------------------------------------------------

// CRITICAL: this MUST match the default in vite.config.js.
//   Project site (e.g. /land-area-calculator/):   '/land-area-calculator/'
//   User site / custom domain:                    '/'
//
// Only respect BASE_PATH if it's a non-empty, non-root value. A stray
// `BASE_PATH=/` from a shell/.env/CI override would otherwise make
// postbuild "agree" with a broken build and silently ship a 404.html
// that points at the wrong host.
const rawEnvBase = process.env.BASE_PATH
const EXPECTED_BASE =
  rawEnvBase && rawEnvBase !== '/' ? rawEnvBase : '/land-area-calculator/'

const distDir = resolve(process.cwd(), 'dist')
const indexPath = resolve(distDir, 'index.html')
const notFoundPath = resolve(distDir, '404.html')

if (!existsSync(indexPath)) {
  console.error('postbuild: dist/index.html not found. Did `vite build` run?')
  process.exit(1)
}

const html = readFileSync(indexPath, 'utf-8')

// ---------------------------------------------------------------------------
// 1. Sanity-check the first root-relative asset path.
// ---------------------------------------------------------------------------
const rootRelativeRe = /(?:src|href)="(\/[^"]+)"/g
let firstAsset = null
let m
while ((m = rootRelativeRe.exec(html)) !== null) {
  // Skip the favicon if it's under the base (it's expected to be)
  // and skip anything that's actually a hash link.
  if (m[1] === '/' || m[1].startsWith('//')) continue
  firstAsset = m[1]
  break
}

console.log(`postbuild:`)
console.log(`  expected base : ${EXPECTED_BASE}`)
console.log(`  first asset   : ${firstAsset ?? '(none found)'}`)

if (firstAsset && !firstAsset.startsWith(EXPECTED_BASE)) {
  console.error(
    `\n  ✗ ASSET PATH MISMATCH\n\n` +
      `    First root-relative asset in dist/index.html:\n` +
      `      ${firstAsset}\n\n` +
      `    Expected it to start with:\n` +
      `      ${EXPECTED_BASE}\n\n` +
      `    This means vite.config.js built with a different base than\n` +
      `    expected. The 404.html redirect would point at the wrong host.\n\n` +
      `    Most common cause: process.env.BASE_PATH is set in your\n` +
      `    shell, .env file, CI, or package.json scripts to "/".\n\n` +
      `    Quick checks:\n` +
      `      echo "$BASE_PATH"                  # should be empty\n` +
      `      env | grep -i base                 # any leftover vars?\n` +
      `      ls .env* 2>/dev/null               # any BASE_PATH= line?\n` +
      `      grep -n BASE_PATH package.json     # any in scripts?\n\n` +
      `    Fix — unset it and rebuild:\n` +
      `      unset BASE_PATH\n` +
      `      rm -rf dist node_modules/.vite\n` +
      `      npm run build\n\n` +
      `    Or, if you're actually deploying under a different subpath,\n` +
      `    update the defaults in BOTH vite.config.js and postbuild.js.\n`,
  )
  process.exit(1)
}

// ---------------------------------------------------------------------------
// 2. Generate dist/404.html with the rafgraph SPA redirect.
//    pathSegmentsToKeep is derived from EXPECTED_BASE, not the built HTML,
//    so a misconfigured build can't produce a 404.html that points at the
//    wrong host.
// ---------------------------------------------------------------------------
const pathSegmentsToKeep = EXPECTED_BASE.replace(/\/$/, '')
  .split('/')
  .filter(Boolean).length

const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bhumi Mapi</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--
      Built by scripts/postbuild.js — single-page-apps for GitHub Pages.
      pathSegmentsToKeep=${pathSegmentsToKeep}  (expected base: ${EXPECTED_BASE})
      https://github.com/rafgraph/spa-github-pages  (MIT)
    -->
    <script>
      var pathSegmentsToKeep = ${pathSegmentsToKeep}
      var l = window.location
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?p=/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      )
    </script>
  </head>
  <body></body>
</html>
`

writeFileSync(notFoundPath, notFoundHtml)
console.log(`  ✓ wrote 404.html  (pathSegmentsToKeep=${pathSegmentsToKeep})`)
