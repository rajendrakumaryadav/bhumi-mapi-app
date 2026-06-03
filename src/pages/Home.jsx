import { APP, FEATURES, UNIT_GROUPS, QUICK_REFERENCES } from '../data/content.js'
import Icon from '../components/Icon.jsx'
import DemoCalculator from '../components/DemoCalculator.jsx'

const GROUP_STYLES = {
  emerald: { dot: 'bg-emerald-500', ring: 'ring-emerald-100', bg: 'bg-emerald-50/60', text: 'text-emerald-800' },
  sky: { dot: 'bg-sky-500', ring: 'ring-sky-100', bg: 'bg-sky-50/60', text: 'text-sky-800' },
  amber: { dot: 'bg-amber-500', ring: 'ring-amber-100', bg: 'bg-amber-50/60', text: 'text-amber-800' },
  rose: { dot: 'bg-rose-500', ring: 'ring-rose-100', bg: 'bg-rose-50/60', text: 'text-rose-800' },
  violet: { dot: 'bg-violet-500', ring: 'ring-violet-100', bg: 'bg-violet-50/60', text: 'text-violet-800' },
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-72 w-[120%] -translate-x-1/2 rounded-[50%] bg-brand-200/40 blur-3xl" />
          <div className="absolute right-0 top-32 h-48 w-48 rounded-full bg-harvest-400/20 blur-3xl" />
        </div>

        <div className="container-page grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
              Free · Open source · No ads
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              <span className="block font-hindi text-brand-700">{APP.hindiName}</span>
              <span className="block">{APP.tagline}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {APP.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href={APP.playStoreUrl} target="_blank" rel="noreferrer" className="btn-primary">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M3.6 1.6c-.4.4-.6 1-.6 1.8v17.2c0 .8.2 1.4.6 1.8l.1.1L13 12.8v-.2L3.7 1.5l-.1.1z" />
                  <path d="m16.5 16.3 3-1.7c1-.6 1-1.5 0-2.1l-3-1.7L13 12.6v.2l3.5 3.5z" opacity=".75" />
                  <path d="M16.6 16.3 13 12.8 3.6 22.4c.4.4 1 .5 1.7.1l11.3-6.2" />
                  <path d="M16.6 9.2 5.3 2.9c-.7-.4-1.3-.3-1.7.1L13 12.6l3.6-3.4z" opacity=".55" />
                </svg>
                Get it on Google Play
              </a>
              <a
                href={APP.repository}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                View source on GitHub
              </a>
              <a href="#features" className="text-sm font-semibold text-brand-700 hover:underline">
                See features →
              </a>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Units</dt>
                <dd className="mt-1 text-2xl font-bold text-slate-900">15</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Languages</dt>
                <dd className="mt-1 text-2xl font-bold text-slate-900">
                  <span className="font-hindi">हिन्दी</span> · EN
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Min Android</dt>
                <dd className="mt-1 text-2xl font-bold text-slate-900">6.0+</dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-field-gradient opacity-20 blur-2xl" />
            <DemoCalculator />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="container-page py-16 sm:py-20">
        <div className="max-w-2xl">
          <span className="chip">Features</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Built for quick field lookups
          </h2>
          <p className="mt-3 text-slate-600">
            Every feature is designed to remove friction when converting a value on the spot —
            at the khet, the registry office, or the chai stall.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100 transition hover:-translate-y-1 hover:ring-brand-200"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                <Icon name={f.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* UNITS */}
      <section id="units" className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="chip">Supported units</span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Every unit you'll see on a UP land record
              </h2>
              <p className="mt-3 text-slate-600">
                Grouped exactly the way they appear in the app — colour-coded so you always
                know which system you're working in.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href={APP.repository} target="_blank" rel="noreferrer" className="btn-ghost">
                Read the conversion factors
              </a>
              <a href={APP.playStoreUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                Open in Google Play
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {UNIT_GROUPS.map((g) => {
              const style = GROUP_STYLES[g.color] ?? GROUP_STYLES.emerald
              return (
                <div
                  key={g.name}
                  className={`rounded-2xl ${style.bg} p-6 ring-1 ${style.ring}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
                    <h3 className={`text-base font-bold ${style.text}`}>{g.name}</h3>
                    <span className={`ml-auto text-xs font-semibold ${style.text} opacity-70`}>
                      {g.units.length} units
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{g.description}</p>
                  <ul className="mt-4 divide-y divide-white/70 rounded-xl bg-white/80 ring-1 ring-white">
                    {g.units.map((u) => (
                      <li
                        key={u.name}
                        className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                      >
                        <span className="font-semibold text-slate-800">{u.name}</span>
                        <span className="text-right text-xs text-slate-500">{u.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* QUICK REFERENCE */}
      <section id="reference" className="container-page py-16 sm:py-20">
        <div className="rounded-3xl bg-field-gradient p-8 text-white shadow-card sm:p-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                Quick reference
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Conversion factors you'll use most
              </h2>
              <p className="mt-3 max-w-2xl text-white/85">
                These are the same numbers the app shows in its context-aware
                reference card.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {QUICK_REFERENCES.map((r) => (
              <div
                key={`${r.from}-${r.to}`}
                className="flex items-center justify-between gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold ring-1 ring-white/15 backdrop-blur"
              >
                <span>{r.from}</span>
                <span className="text-white/60">=</span>
                <span className="text-right">{r.to}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD / CTA */}
      <section id="download" className="container-page py-16 sm:py-20">
        <div className="card grid items-center gap-8 lg:grid-cols-2">
          <div>
            <span className="chip">Get the app</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Install in under a minute
            </h2>
            <p className="mt-3 text-slate-600">
              Bhumi Mapi is a single ~2 MB APK. No Google account, no Play Services,
              no background services. Open it, type a number, get an answer.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <Check /> Works on every Android 6.0+ device.
              </li>
              <li className="flex items-start gap-2">
                <Check /> Bilingual UI — switch any time, your choice is remembered.
              </li>
              <li className="flex items-start gap-2">
                <Check /> 100% offline after install. No data ever leaves the device.
              </li>
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={APP.playStoreUrl} target="_blank" rel="noreferrer" className="btn-primary">
                Get it on Google Play
              </a>
              <a href="/privacy" className="btn-ghost">
                Read the privacy policy
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-100">
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Package
                </dt>
                <dd className="mt-1 break-all font-mono text-xs text-slate-800">
                  {APP.packageName}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Version
                </dt>
                <dd className="mt-1 font-semibold text-slate-800">v{APP.version}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Min SDK
                </dt>
                <dd className="mt-1 font-semibold text-slate-800">{APP.minSdk} (Android 6.0)</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Target SDK
                </dt>
                <dd className="mt-1 font-semibold text-slate-800">{APP.targetSdk}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Permissions
                </dt>
                <dd className="mt-1 font-semibold text-slate-800">None</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Network
                </dt>
                <dd className="mt-1 font-semibold text-slate-800">Not used</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}

function Check() {
  return (
    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
      </svg>
    </span>
  )
}
