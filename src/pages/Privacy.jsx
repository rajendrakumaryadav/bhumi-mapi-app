import { APP } from '../data/content.js'

const SECTIONS = [
  {
    title: 'Summary',
    body: (
      <>
        <p>
          <strong>Bhumi Mapi</strong> (<span className="font-hindi">भूमि मापी</span>) is a
          free, offline Android application. The short version of this policy: the app does
          not collect, transmit, sell, or share any personal data — because it has no way
          to do so. Everything you type stays on your phone.
        </p>
      </>
    ),
  },
  {
    title: 'Information the app does not collect',
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>No personal information (name, email, phone, address).</li>
        <li>No device identifiers, advertising IDs, or analytics IDs.</li>
        <li>No location, contacts, photos, microphone, or sensor data.</li>
        <li>No usage statistics, crash reports, or diagnostic telemetry.</li>
        <li>No account, sign-in, or authentication of any kind.</li>
      </ul>
    ),
  },
  {
    title: 'Permissions',
    body: (
      <>
        <p>
          The app's <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">AndroidManifest.xml</code>{' '}
          declares <strong>zero runtime permissions</strong>. There is no request for:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li><code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">INTERNET</code> — the app never opens a network connection.</li>
          <li><code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">ACCESS_NETWORK_STATE</code> — not needed.</li>
          <li><code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">READ/WRITE_EXTERNAL_STORAGE</code> — no files are written outside the app sandbox.</li>
          <li><code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">ACCESS_FINE/COARSE_LOCATION</code> — the app has no concept of location.</li>
        </ul>
        <p className="mt-3">
          You can verify this on your own device — the manifest is embedded in every
          installed APK and is also published in the{' '}
          <a
            href={APP.repository}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-brand-700 hover:underline"
          >
            project's source code
          </a>
          . On most Android versions it is viewable from
          <em> Settings → Apps → Bhumi Mapi → Permissions</em>, where you will see
          that the list is empty.
        </p>
      </>
    ),
  },
  {
    title: 'Data stored locally on your device',
    body: (
      <>
        <p>The only data the app stores is kept inside Android's private app storage and is never read by anything else:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong>Language preference</strong> — a single key in <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">SharedPreferences</code>{' '}
            (<code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">bhumi_prefs</code>) recording whether you chose हिन्दी or English.
            This is used purely to render the UI in your language.
          </li>
          <li>
            <strong>Window state</strong> — the current value in the input field and the selected units. These are
            volatile and live in memory; they are wiped when the process is killed.
          </li>
        </ul>
        <p className="mt-3">
          Uninstalling the app removes this data completely. Clearing app data from Android
          settings does the same.
        </p>
      </>
    ),
  },
  {
    title: 'No third-party services',
    body: (
      <p>
        The app contains <strong>no analytics SDKs, no ad networks, no crash reporters, no
        push-notification services, and no remote configuration</strong>. There is no backend,
        no cloud database, and no telemetry endpoint. The full source code is published in
        the project's public repository and can be audited by anyone.
      </p>
    ),
  },
  {
    title: 'Open source',
    body: (
      <>
        <p>
          The Android application is <strong>open-source software</strong> released to the
          public at{' '}
          <a
            href={APP.repository}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-brand-700 hover:underline"
          >
            github.com/rajendrakumaryadav/bhumi-maapi
          </a>
          . You can read every line of the conversion logic, inspect the manifest, build the
          APK yourself, and verify that the privacy claims on this page are accurate.
        </p>
        <p className="mt-3">
          Use of the source code is governed by the licence distributed with the repository.
          Contributions, bug reports and translations are welcome through the usual GitHub
          channels (issues, pull requests, discussions).
        </p>
      </>
    ),
  },
  {
    title: 'Children',
    body: (
      <p>
        Because the app collects no data from anyone, it is inherently safe for use by
        children. It does not direct content at children, nor does it knowingly collect
        any information from them (or anyone else).
      </p>
    ),
  },
  {
    title: 'Changes to this policy',
    body: (
      <p>
        If the app's behaviour ever changes in a way that affects privacy — for example,
        a future version adds an optional online feature — this page will be updated
        before that version is released, and the change will be clearly summarised in the
        release notes.
      </p>
    ),
  },
  {
    title: 'Contact',
    body: (
      <>
        <p>
          Questions, concerns, or privacy requests can be sent via either channel below.
          The fastest way to reach the developer is usually the GitHub issue tracker.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong>Source / issues:</strong>{' '}
            <a
              href={APP.repository}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-brand-700 hover:underline"
            >
              {APP.repository}
            </a>
          </li>
          <li>
            <strong>Google Play listing:</strong>{' '}
            <a
              href={APP.playStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-brand-700 hover:underline"
            >
              {APP.name}
            </a>{' '}
            (use the "Email the developer" link on the store page)
          </li>
          <li>
            <strong>Package id:</strong>{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{APP.packageName}</code>
          </li>
        </ul>
      </>
    ),
  },
]

export default function Privacy() {
  return (
    <>
      <section className="container-page py-12 sm:py-16">
        <span className="chip">Legal</span>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-slate-500">
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav className="card !p-4">
              <h2 className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                On this page
              </h2>
              <ol className="mt-2 space-y-1 text-sm">
                {SECTIONS.map((s, i) => (
                  <li key={s.title}>
                    <a
                      href={`#section-${i}`}
                      className="block rounded-lg px-2 py-1.5 text-slate-600 hover:bg-brand-50 hover:text-brand-800"
                    >
                      {String(i + 1).padStart(2, '0')}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="space-y-10">
            {SECTIONS.map((s, i) => (
              <article
                key={s.title}
                id={`section-${i}`}
                className="scroll-mt-24 rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100 sm:p-8"
              >
                <h2 className="text-xl font-bold text-slate-900">
                  <span className="mr-2 text-brand-600">{String(i + 1).padStart(2, '0')}.</span>
                  {s.title}
                </h2>
                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-slate-700">
                  {s.body}
                </div>
              </article>
            ))}

            <p className="text-center text-xs text-slate-500">
              This policy is written in plain English. If anything is unclear, please open an issue on the
              project's GitHub repository.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
