import { Link, NavLink, useLocation } from 'react-router-dom'
import { APP } from '../data/content.js'
import HashLink from './HashLink.jsx'

const linkClass = ({ isActive }) =>
  [
    'rounded-full px-3 py-1.5 text-sm font-medium transition',
    isActive
      ? 'bg-brand-50 text-brand-700'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  ].join(' ')

export default function Navbar() {
  const { pathname } = useLocation()
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-field-gradient text-lg font-bold text-white shadow-sm">
            भू
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold text-slate-900">
              {APP.hindiName}
            </span>
            <span className="block text-[11px] font-medium text-slate-500">
              {APP.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <HashLink hash="features" className={linkClass}>
            Features
          </HashLink>
          <HashLink hash="units" className={linkClass}>
            Units
          </HashLink>
          <NavLink to="/privacy" className={linkClass}>
            Privacy
          </NavLink>
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <a
            href={APP.repository}
            target="_blank"
            rel="noreferrer"
            aria-label="View source on GitHub"
            className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.7.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.6 18.3.5 12 .5z" />
            </svg>
          </a>
          <a
            href={APP.playStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M3.6 1.6c-.4.4-.6 1-.6 1.8v17.2c0 .8.2 1.4.6 1.8l.1.1L13 12.8v-.2L3.7 1.5l-.1.1z" />
              <path d="m16.5 16.3 3-1.7c1-.6 1-1.5 0-2.1l-3-1.7L13 12.6v.2l3.5 3.5z" opacity=".8" />
              <path d="M16.6 16.3 13 12.8 3.6 22.4c.4.4 1 .5 1.7.1l11.3-6.2" />
              <path d="M16.6 9.2 5.3 2.9c-.7-.4-1.3-.3-1.7.1L13 12.6l3.6-3.4z" opacity=".5" />
            </svg>
            Get it on Play
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 sm:hidden"
          aria-label="Open menu"
          onClick={() => {
            const el = document.getElementById('mobile-nav')
            if (el) el.classList.toggle('hidden')
          }}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      <div id="mobile-nav" className="hidden border-t border-slate-200 bg-white sm:hidden">
        <div className="container-page flex flex-col gap-1 py-3">
          <Link to="/" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Home
          </Link>
          <HashLink
            hash="features"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Features
          </HashLink>
          <HashLink
            hash="units"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Units
          </HashLink>
          <Link
            to="/privacy"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Privacy
          </Link>
          <a
            href={APP.playStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            Get it on Google Play →
          </a>
          <a
            href={APP.repository}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            View source on GitHub
          </a>
          <span className="px-3 pt-2 text-xs text-slate-400">Path: {pathname}</span>
        </div>
      </div>
    </header>
  )
}
