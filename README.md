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
npm run preview  # serves the built dist/ locally
```

The build output goes to `website/dist/` and can be hosted on any static host
(GitHub Pages, Netlify, Cloudflare Pages, Nginx, etc.).

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
