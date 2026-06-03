export const APP = {
  name: 'Bhumi Mapi',
  hindiName: 'भूमि मापी',
  tagline: 'Land Area Calculator',
  subtitle: 'Uttar Pradesh • All local units supported',
  description:
    'A free, offline Android app that converts land area between Metric, Imperial and the traditional local units used across Uttar Pradesh — Bigha, Biswa, Gaz and more.',
  packageName: 'io.github.rajendrakumaryadav.uprevenueconvertor',
  version: '1.0',
  minSdk: 23,
  targetSdk: 37,
  playStoreUrl:
    'https://play.google.com/store/apps/details?id=io.github.rajendrakumaryadav.uprevenueconvertor',
  repository: 'https://github.com/rajendrakumaryadav/bhumi-maapi',
}

export const UNIT_GROUPS = [
  {
    name: 'Metric',
    color: 'emerald',
    description: 'Standard SI units of area.',
    units: [
      { name: 'Square Meter', note: 'Base unit (m²)' },
      { name: 'Are', note: '100 m²' },
      { name: 'Hectare', note: '10,000 m²' },
    ],
  },
  {
    name: 'Imperial',
    color: 'sky',
    description: 'Commonly used in property records.',
    units: [
      { name: 'Square Foot', note: '1/10.7639 m²' },
      { name: 'Square Inch', note: '1/1550 m²' },
      { name: 'Acre', note: '4,047 m²' },
    ],
  },
  {
    name: 'Local (UP)',
    color: 'amber',
    description: 'Traditional Gaz-based units.',
    units: [
      { name: 'Square Gaz', note: '1/1.196 m²' },
      { name: 'Square Gattha', note: '121 Sq Gaz' },
    ],
  },
  {
    name: 'Bigha – Pucca',
    color: 'rose',
    description: 'Pucca Bigha system (55 × 55 Gaz).',
    units: [
      { name: 'Pucca Bigha', note: '2,530 m² (0.253 ha)' },
      { name: 'Biswa (Pucca)', note: 'Bigha ÷ 20 = 126.5 m²' },
      { name: 'Biswansi (Pucca)', note: 'Biswa ÷ 20 = 6.325 m²' },
      { name: 'Kachwansi (Pucca)', note: 'Biswansi ÷ 10' },
      { name: 'Unwansi (Pucca)', note: 'Kachwansi ÷ 10' },
    ],
  },
  {
    name: 'Bigha – Kuccha',
    color: 'violet',
    description: 'Kuccha Bigha system (Pucca Bigha ÷ 3).',
    units: [
      { name: 'Kuccha Bigha', note: '843 m² (0.0843 ha)' },
      { name: 'Biswa (Kuccha)', note: 'Kuccha Bigha ÷ 20 = 42.15 m²' },
    ],
  },
]

export const FEATURES = [
  {
    icon: 'bolt',
    title: 'Real-time conversion',
    body: 'Results update on every keystroke — no submit button, no waiting.',
  },
  {
    icon: 'grid',
    title: '15 land units',
    body: 'Covers Metric, Imperial and every local UP unit in one place.',
  },
  {
    icon: 'swap',
    title: 'Swap in a tap',
    body: 'Reverse FROM ↔ TO with a single animated swap button.',
  },
  {
    icon: 'palette',
    title: 'Color-coded groups',
    body: 'Each unit group is visually distinct, so the systems never get confused.',
  },
  {
    icon: 'translate',
    title: 'हिन्दी + English',
    body: 'Toggle the entire UI between Hindi and English from the top bar.',
  },
  {
    icon: 'shield',
    title: '100% offline',
    body: 'No internet, no accounts, no ads, no tracking. Math happens on-device.',
  },
]

export const QUICK_REFERENCES = [
  { from: '1 Hectare', to: '2.47 Acre' },
  { from: '1 Hectare', to: '3.95 Pucca Bigha' },
  { from: '1 Hectare', to: '11.86 Kuccha Bigha' },
  { from: '1 Acre', to: '1 Bigha 12 Biswa (Pucca)' },
  { from: '1 Acre', to: '4 Bigha 16 Biswa (Kuccha)' },
  { from: '1 Sq Meter', to: '1.196 Sq Gaz' },
  { from: '1 Sq Meter', to: '10.76 Sq Foot' },
  { from: '1 Sq Gaz', to: '9 Sq Foot' },
  { from: '1 Sq Foot', to: '144 Sq Inch' },
  { from: '1 Pucca Bigha', to: '20 Biswa' },
  { from: '1 Kuccha Bigha', to: '20 Biswa' },
]
