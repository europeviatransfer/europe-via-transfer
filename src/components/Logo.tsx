interface LogoProps {
  variant?: 'dark' | 'light'
  className?: string
}

export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const light = variant === 'light'
  return (
    <a
      href="#home"
      aria-label="Europe Via Transfer — Luxury Private Transfers & Chauffeur Services"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span
        className={`grid h-11 w-11 place-items-center border transition-colors duration-700 ${
          light
            ? 'border-gold-500/50 text-gold-500'
            : 'border-ink-900/15 text-ink-900 group-hover:border-gold-500 group-hover:text-gold-600'
        }`}
      >
        <span className="font-serif text-xl font-semibold leading-none">E</span>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-lg font-semibold tracking-[0.25em] transition-colors duration-700 ${
            light ? 'text-white' : 'text-ink-900'
          }`}
        >
          EUROPE VIA TRANSFER
        </span>
        <span
          className={`mt-1 text-[8px] font-medium uppercase tracking-widest2 transition-colors duration-700 ${
            light ? 'text-gold-500/80' : 'text-gold-600'
          }`}
        >
          Private Chauffeur
        </span>
      </span>
    </a>
  )
}
