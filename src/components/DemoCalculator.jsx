import { useMemo, useState } from 'react'

const UNIT_GROUPS = [
  {
    label: 'Metric',
    units: [
      { key: 'm2', name: 'Square Meter', short: 'm²', toSqm: 1 },
      { key: 'are', name: 'Are', short: 'a', toSqm: 100 },
      { key: 'ha', name: 'Hectare', short: 'ha', toSqm: 10000 },
    ],
  },
  {
    label: 'Imperial',
    units: [
      { key: 'ft2', name: 'Square Foot', short: 'ft²', toSqm: 0.092903 },
      { key: 'inch2', name: 'Square Inch', short: 'in²', toSqm: 0.00064516 },
      { key: 'acre', name: 'Acre', short: 'ac', toSqm: 4046.86 },
    ],
  },
  {
    label: 'Local (UP)',
    units: [
      { key: 'gaz', name: 'Square Gaz', short: 'Gaz²', toSqm: 0.836127 },
      { key: 'gattha', name: 'Square Gattha', short: 'Gattha²', toSqm: 101.1714 },
    ],
  },
  {
    label: 'Bigha – Pucca',
    units: [
      { key: 'pbigha', name: 'Pucca Bigha', short: 'Bigha', toSqm: 2530 },
      { key: 'biswa_p', name: 'Biswa (Pucca)', short: 'Biswa', toSqm: 126.5 },
      { key: 'biswansi_p', name: 'Biswansi (Pucca)', short: 'Biswansi', toSqm: 6.325 },
      { key: 'kachwansi_p', name: 'Kachwansi (Pucca)', short: 'Kachwansi', toSqm: 0.6325 },
      { key: 'unwansi_p', name: 'Unwansi (Pucca)', short: 'Unwansi', toSqm: 0.06325 },
    ],
  },
  {
    label: 'Bigha – Kuccha',
    units: [
      { key: 'kbigha', name: 'Kuccha Bigha', short: 'Bigha', toSqm: 843 },
      { key: 'biswa_k', name: 'Biswa (Kuccha)', short: 'Biswa', toSqm: 42.15 },
    ],
  },
]

const TO_SQM = Object.fromEntries(
  UNIT_GROUPS.flatMap((g) => g.units.map((u) => [u.key, u.toSqm])),
)
const ALL_UNITS = UNIT_GROUPS.flatMap((g) => g.units)
const findUnit = (key) => ALL_UNITS.find((u) => u.key === key)

function format(n) {
  if (!isFinite(n)) return '—'
  const abs = Math.abs(n)
  if (abs >= 1_000_000 || (abs > 0 && abs < 1e-6)) return n.toExponential(4)
  return n
    .toFixed(6)
    .replace(/\.?0+$/, '')
}

export default function DemoCalculator() {
  const [from, setFrom] = useState('m2')
  const [to, setTo] = useState('pbigha')
  const [value, setValue] = useState('1')

  const result = useMemo(() => {
    const v = parseFloat(value)
    if (!isFinite(v)) return null
    const sqm = v * TO_SQM[from]
    return sqm / TO_SQM[to]
  }, [value, from, to])

  const swap = () => {
    setFrom(to)
    setTo(from)
    if (result != null) setValue(format(result))
  }

  const fromUnit = findUnit(from)
  const toUnit = findUnit(to)

  return (
    <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-slate-100 sm:p-8">
      <div className="flex items-center justify-between">
        <span className="chip">Live preview</span>
        <span className="text-xs text-slate-500">All 15 units from the app</span>
      </div>

      <div className="mt-5 space-y-3">
        <label className="block text-xs font-bold tracking-widest text-slate-500">
          FROM
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-2xl font-semibold text-slate-900 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 sm:flex-1"
            placeholder="Enter value"
          />
          <UnitSelect value={from} onChange={setFrom} />
        </div>

        <div className="flex items-center justify-center py-1">
          <button
            onClick={swap}
            className="grid h-11 w-11 place-items-center rounded-full bg-field-gradient text-white shadow-md transition hover:scale-110"
            aria-label="Swap units"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h13l-3-3M17 17H4l3 3" />
            </svg>
          </button>
        </div>

        <label className="block text-xs font-bold tracking-widest text-slate-500">TO</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="w-full rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-2xl font-semibold text-emerald-800 sm:flex-1">
            {result == null ? '—' : format(result)}
          </div>
          <UnitSelect value={to} onChange={setTo} />
        </div>
      </div>

      <p className="mt-5 text-xs text-slate-500">
        {value || '0'} {fromUnit?.name} ={' '}
        <span className="font-semibold text-emerald-700">
          {result == null ? '—' : format(result)}
        </span>{' '}
        {toUnit?.name}
      </p>
    </div>
  )
}

function UnitSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 sm:w-60"
    >
      {UNIT_GROUPS.map((g) => (
        <optgroup key={g.label} label={g.label}>
          {g.units.map((u) => (
            <option key={u.key} value={u.key}>
              {u.name} ({u.short})
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  )
}
