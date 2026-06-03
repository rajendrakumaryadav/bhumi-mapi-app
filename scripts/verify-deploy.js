// scripts/verify-deploy.js
//
// Fetches the live 404.html from the deployed site and verifies that the
// rafgraph redirect is configured for the right number of path segments.
// A pathSegmentsToKeep of 0 means the redirect will go to the GH Pages
// user-site root instead of the project subpath, breaking all deep links.

const SITE = process.argv[2] || 'https://rajendrakumaryadav.github.io/bhumi-mapi-app/'

console.log(`Verifying deploy at ${SITE}\n`)

let response
try {
  response = await fetch(SITE + '404.html', { cache: 'no-store' })
} catch (err) {
  console.error(`  ✗ network error: ${err.message}`)
  process.exit(1)
}

if (!response.ok) {
  console.error(`  ✗ 404.html not reachable (HTTP ${response.status})`)
  process.exit(1)
}

const html = await response.text()
const match = html.match(/pathSegmentsToKeep\s*=\s*(\d+)/)
const value = match?.[1]

if (!value) {
  console.error(`  ✗ could not find pathSegmentsToKeep in deployed 404.html`)
  console.error(`    (the file was probably copied from index.html — rebuild)`)
  process.exit(1)
}

console.log(`  pathSegmentsToKeep in deployed 404.html: ${value}`)

if (value === '0') {
  console.error(
    `\n  ✗ WRONG — pathSegmentsToKeep is 0.\n` +
      `    The 404 redirect is going to the GH Pages *user-site* root, not\n` +
      `    the project subpath. Every deep link will redirect to the\n` +
      `    wrong URL.\n\n` +
      `    Fix:\n` +
      `      cd website\n` +
      `      rm -rf dist node_modules/.vite\n` +
      `      npm run build       # postbuild should print pathSegmentsToKeep=1\n` +
      `      # then redeploy the contents of dist/\n`,
  )
  process.exit(1)
}

console.log(`  ✓ deployment looks correct (pathSegmentsToKeep=${value})`)
