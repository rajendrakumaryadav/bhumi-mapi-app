const ICONS = {
  bolt: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
  ),
  grid: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 5h6v6H4zM14 5h6v6h-6zM4 13h6v6H4zM14 13h6v6h-6z"
    />
  ),
  swap: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 7h13l-3-3M17 17H4l3 3"
    />
  ),
  palette: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.6-1.4-.4-.4-.6-.9-.6-1.4 0-1.1.9-2 2-2h2.4A4.6 4.6 0 0 0 21.8 9 9 9 0 0 0 12 3zM7.5 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5-5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
    />
  ),
  translate: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5h12M9 3v2M5 5c0 5 6 8 10 8M11 21l4-10 4 10M12.5 17h5"
    />
  ),
  shield: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3 4 6v6c0 4.5 3.4 8.4 8 9 4.6-.6 8-4.5 8-9V6l-8-3zM9 12l2 2 4-4"
    />
  ),
}

export default function Icon({ name, className = 'h-6 w-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    >
      {ICONS[name] ?? ICONS.grid}
    </svg>
  )
}
