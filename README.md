# Bhumi Mapi – Website

A simple, static landing site for the **Bhumi Mapi (भूमि मापी) – Land Area Calculator**
Android app. Built with **Vite + React + Tailwind CSS** and deployed as static files.

All download links point to the Google Play Store listing for the
package `io.github.rajendrakumaryadav.uprevenueconvertor`. Source code and
issue tracking live at <https://github.com/rajendrakumaryadav/bhumi-maapi>.

## Pages

- `/` – Landing page (hero, features, supported units, quick reference, download CTA, plus a working **live conversion demo** of the app's calculator)
- `/privacy` – Privacy policy (derived from the app's `AndroidManifest.xml`: zero permissions, zero network, zero data collection)

## Local development

```bash
cd website
npm install
npm run dev      # http://localhost:5173
```

## Production build

```bash
npm run build
```

This runs `vite build` and then `node scripts/postbuild.js`, which:

1. Generates `dist/404.html` using the [rafgraph SPA-for-GitHub-Pages
   technique](https://github.com/rafgraph/spa-github-pages) so deep links
   like `/land-area-calculator/privacy` work on direct visit. The
   `pathSegmentsToKeep` value is derived automatically from Vite's
   `<base href>` so it tracks the `BASE_PATH` config.
2. Verifies that the built asset paths sit under the configured base.
   If the build is stale (wrong subpath), `postbuild` exits non-zero
   with a clear error message.

```bash
npm run preview  # serves the built dist/ locally
```

## Deploying to GitHub Pages (project site)

This site is configured to live at
`https://rajendrakumaryadav.github.io/land-area-calculator/`.

- `vite.config.js` sets `base: '/land-area-calculator/'` so all built asset
  paths (`/assets/index-*.js`, `/assets/index-*.css`, etc.) resolve correctly
  under the subpath. **This is the fix for the "404 on `/*.js` and `/*.css`" issue.**
- `main.jsx` wraps the app in `<BrowserRouter basename="…">` so the React
  routes (`/`, `/privacy`) also resolve under the subpath.
- `scripts/postbuild.js` creates `dist/404.html` as a copy of `dist/index.html`.
  GitHub Pages serves `404.html` for any unknown path, which lets the React
  Router take over and render the correct page on direct visits to e.g.
  `…/land-area-calculator/privacy`.
- `public/.nojekyll` tells GitHub Pages to skip Jekyll processing, which would
  otherwise ignore files starting with `_` and strip `.nojekyll` itself.

### One-time setup

1. In your GitHub repo → **Settings → Pages**, set the source to
   **GitHub Actions** (recommended) or the `gh-pages` branch.
2. The simplest publish flow is the official GitHub Actions workflow
   [`actions/deploy-pages`](https://github.com/actions/deploy-pages) — drop
   this in `.github/workflows/deploy.yml` at the repo root:

   ```yaml
   name: Deploy website
   on:
     push:
       branches: [main]
       paths: ['website/**']
   permissions:
     pages: write
     id-token: write
   jobs:
     build-deploy:
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deploy.outputs.page_url }}
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with: { node-version: 20 }
         - run: npm ci
           working-directory: website
         - run: npm run build
           working-directory: website
         - uses: actions/upload-pages-artifact@v3
           with:
             path: website/dist
         - id: deploy
           uses: actions/deploy-pages@v4
   ```

3. Push. After a minute the site will be live at
   `https://rajendrakumaryadav.github.io/land-area-calculator/`.

### Deploying under a different subpath

Set the `BASE_PATH` environment variable at build time:

```bash
BASE_PATH=/my-other-folder/ npm run build
```

The build, basename, and 404.html all pick up the new path automatically.

## Troubleshooting

### "Menus navigate to `…/privacy` instead of `…/land-area-calculator/privacy`"

This means the React Router `<BrowserRouter basename>` ended up empty.
It happens when the build is older than the `base` config in
`vite.config.js`. Fix:

```bash
cd website
rm -rf dist node_modules/.vite
npm run build
```

The `postbuild` hook will print `postbuild: asset paths OK` if the
base is correct, or `VERIFICATION FAILED` with the bad paths if not.

### "Network tab shows 404s for `/assets/index-*.js` and `/assets/index-*.css`"

Same root cause — the bundle was built without the `/land-area-calculator/`
prefix. Rebuild as above.

### "Direct visit to `/land-area-calculator/privacy` shows a 404"

The site uses the [rafgraph SPA-for-GH-Pages](https://github.com/rafgraph/spa-github-pages)
technique: `dist/404.html` encodes the original path in `?p=/…` and
redirects to the site root, and a small inline script in `index.html`
rewrites the URL back to the deep link before React Router boots. This
works for direct visits, browser refresh on deep links, and the GH
Pages 404 page. Verify the postbuild step ran:

```bash
ls dist/404.html
head -3 dist/404.html   # should contain "pathSegmentsToKeep"
```

If `dist/404.html` is missing or empty, the build didn't finish — re-run
`npm run build` and redeploy.

## Project structure

```
website/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── App.jsx                # router (/, /privacy)
    ├── main.jsx
    ├── index.css              # Tailwind entry + small design tokens
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── Icon.jsx           # inline SVG icon set
    │   └── DemoCalculator.jsx # interactive preview of the app
    ├── data/
    │   └── content.js         # all copy + unit data, single source of truth
    └── pages/
        ├── Home.jsx
        └── Privacy.jsx
```

## Editing copy

All user-facing text lives in `src/data/content.js`. Edit it there and both the
landing page and the privacy page pick up the new values.

## Adding new routes

1. Add a page under `src/pages/`.
2. Register it in `src/App.jsx` inside `<Routes>`.

## Design notes

- Tailwind theme is extended with a `brand` (emerald/green) and `harvest` (amber)
  palette to match the Android app's agricultural theme.
- Hindi/English bilingual labels are used for the app name and key CTAs.
- No tracking, no analytics, no external scripts on this site either.
