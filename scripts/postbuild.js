import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// ---------------------------------------------------------------------------
// Post-build steps for GitHub Pages SPA deploys.
//
// 1. Verify the built index.html uses the *expected* subpath. A mismatch
//    almost always means the build was done with the wrong BASE_PATH
//    (or with an old vite.config.js) and would silently deploy a
//    broken site. We fail the build with a clear error in that case.
//
// 2. Generate dist/404.html using the rafgraph SPA technique. The
//    `pathSegmentsToKeep` value is derived from the EXPECTED base,
//    not from the built HTML, so a misconfigured build can't produce
//    a 404.html that redirects to the wrong URL.
//
//    https://github.com/rafgraph/spa-github-pages
//
// 3. Sanity check that the built asset paths actually sit under the
//    configured base, as a second line of defence.
// ---------------------------------------------------------------------------

// CRITICAL: this must be the subpath the site is served under.
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
const EXPECTED_BASE_NOSLASH = EXPECTED_BASE.replace(/\/$/, '')

const distDir = resolve(process.cwd(), 'dist')
const indexPath = resolve(distDir, 'index.html')
const notFoundPath = resolve(distDir, '404.html')

if (!existsSync(indexPath)) {
  console.error('postbuild: dist/index.html not found. Did `vite build` run?')
  process.exit(1)
}

const html = readFileSync(indexPath, 'utf-8')

// ---------------------------------------------------------------------------
// 1. Verify the built base href matches the expected base.
// ---------------------------------------------------------------------------
const baseMatch = html.match(/<base\s+href="([^"]+)"\s*\/?>/i)
const builtBase = baseMatch ? baseMatch[1] : '/'
const builtBaseNoslash = builtBase.replace(/\/$/, '')

console.log(`postbuild:`)
console.log(`  expected base : ${EXPECTED_BASE}`)
console.log(`  built base    : ${builtBase}`)

if (builtBaseNoslash !== EXPECTED_BASE_NOSLASH) {
  console.error(
    `\n  ✗ BASE MISMATCH\n\n` +
      `    The site is configured to deploy under  ${EXPECTED_BASE}\n` +
      `    but vite was built with base           =  ${builtBase}\n\n` +
      `    A misconfigured build would 404 on /assets/* and the SPA\n` +
      `    fallback 404.html would redirect to the wrong host.\n\n` +
      `    Most common cause: process.env.BASE_PATH is set in your\n` +
      `    shell, .env file, CI, or package.json scripts to "/".\n` +
      `    Vite picked it up, vite.config.js logged the override,\n` +
      `    but you probably never intended it.\n\n` +
      `    Quick checks:\n` +
      `      echo "$BASE_PATH"                 # should be empty\n` +
      `      env | grep -i base                # any leftover vars?\n` +
      `      cat .env 2>/dev/null              # any BASE_PATH= line?\n` +
      `      grep -rn BASE_PATH package.json   # any in scripts?\n\n` +
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
//    pathSegmentsToKeep is derived from the *expected* base, not the
//    built one, so the redirect can never go to the wrong place.
// ---------------------------------------------------------------------------
const pathSegmentsToKeep = EXPECTED_BASE_NOSLASH.split('/').filter(Boolean).length

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

// ---------------------------------------------------------------------------
// 3. Asset paths should sit under the configured base.
// ---------------------------------------------------------------------------
const scriptMatch = html.match(/<script[^>]+src="([^"]+)"/)
const linkMatch = html.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/)
const assetPaths = [scriptMatch?.[1], linkMatch?.[1]].filter(Boolean)

if (assetPaths.length === 0) {
  console.warn('  ⚠ no <script>/<link rel=stylesheet> found, skipping asset check')
} else {
  const bad = assetPaths.filter(
    (p) => !p.startsWith(builtBase) && !p.startsWith('http'),
  )
  if (bad.length > 0) {
    console.error(
      `  ✗ asset path mismatch:\n    ${bad.join('\n    ')}\n` +
        `    don't sit under  ${builtBase}`,
    )
    process.exit(1)
  }
  console.log(`  ✓ asset paths OK (${assetPaths.length} checked)`)
}
