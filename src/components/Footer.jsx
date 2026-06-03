import { Link } from 'react-router-dom'
import { APP } from '../data/content.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-field-gradient text-lg font-bold text-white">
              भू
            </span>
            <span className="text-base font-bold text-slate-900">
              {APP.hindiName} · {APP.name}
            </span>
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
            A free, open-source land area calculator built for Uttar Pradesh.
            All math happens on your device — no network, no accounts, no ads,
            no tracking.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900">Project</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link to="/" className="hover:text-brand-700">
                Home
              </Link>
            </li>
            <li>
              <a href="#features" className="hover:text-brand-700">
                Features
              </a>
            </li>
            <li>
              <a href="#units" className="hover:text-brand-700">
                Supported units
              </a>
            </li>
            <li>
              <a href="#reference" className="hover:text-brand-700">
                Quick reference
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link to="/privacy" className="hover:text-brand-700">
                Privacy policy
              </Link>
            </li>
            <li>
              <a
                href={APP.playStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-700"
              >
                Google Play
              </a>
            </li>
            <li>
              <a
                href={APP.repository}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-700"
              >
                Source code
              </a>
            </li>
            <li className="text-slate-500">Package: {APP.packageName}</li>
            <li className="text-slate-500">v{APP.version} · API {APP.minSdk}+</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-500 sm:flex-row">
          <span>© {year} {APP.name}. Open source under the project's licence.</span>
          <span>Made for the fields of Uttar Pradesh.</span>
        </div>
      </div>
    </footer>
  )
}
