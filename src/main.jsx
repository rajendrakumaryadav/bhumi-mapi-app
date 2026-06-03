import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// ---------------------------------------------------------------------------
// Basename — must match the subpath the app is served under.
//
//   GitHub Pages project site : '/bhumi-mapi-app'
//   GitHub Pages user/site root: '/'
//   Custom domain             : '/'
//   `npm run dev` locally     : '/'  (Vite serves at root)
//
// We read it from Vite's `base` config (injected as
// `import.meta.env.BASE_URL` at build time) and fall back to the
// hardcoded production value. The hardcoded fallback exists so that a
// stale or misconfigured build still deploys to the right URL on
// GitHub Pages instead of generating routes like
// `https://…/privacy` (missing the `/bhumi-mapi-app/` prefix).
// ---------------------------------------------------------------------------
function resolveBasename() {
  const fromVite = (import.meta.env.BASE_URL || '').replace(/\/$/, '')
  if (fromVite && fromVite !== '/') return fromVite
  // Hardcoded production fallback for the known GitHub Pages subpath.
  if (import.meta.env.PROD) return '/bhumi-mapi-app'
  return '/'
}

const basename = resolveBasename()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
