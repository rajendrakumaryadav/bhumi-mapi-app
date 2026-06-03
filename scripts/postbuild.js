import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// ---------------------------------------------------------------------------
// Post-build steps for GitHub Pages SPA deploys.
//
// 1. Generate dist/404.html using the rafgraph SPA technique.
//    When GH Pages serves 404.html for an unknown path, it encodes the
//    original path in ?p=/… and redirects to the site root. The
//    matching restore script at the top of index.html rewrites the
//    URL back to the deep link before React Router boots, so the
//    <Route path="/privacy"> actually matches.
//
//    https://github.com/rafgraph/spa-github-pages
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

const html = readFileSync(indexPath, 'utf-8')

// ---------------------------------------------------------------------------
// 1. Read base href, derive path segments to keep for the 404 redirect.
// ---------------------------------------------------------------------------
const baseMatch = html.match(/<base\s+href="([^"]+)"\s*\/?>/i)
const baseHref = baseMatch ? baseMatch[1] : '/'
// "/land-area-calculator/" → 1 segment to keep
const pathSegmentsToKeep = baseHref
  .split('/')
  .filter(Boolean).length

const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bhumi Mapi</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script>
      // Single Page Apps for GitHub Pages
      // https://github.com/rafgraph/spa-github-pages
      // MIT License
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
console.log(
  `postbuild: wrote ${notFoundPath} (rafgraph redirect, pathSegmentsToKeep=${pathSegmentsToKeep})`,
)

// ---------------------------------------------------------------------------
// 2. Sanity check: asset paths should sit under the configured base.
// ---------------------------------------------------------------------------
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
        `(a) the build was done before the \`base\` config was added to vite.config.js, or ` +
        `(b) BASE_PATH is set to the wrong value.\n` +
        `  Try:  rm -rf dist && BASE_PATH=/land-area-calculator/ npm run build\n`,
    )
    process.exit(1)
  }
  console.log(
    `postbuild: asset paths OK (base=${baseHref}, ${assetPaths.length} checked)`,
  )
}
