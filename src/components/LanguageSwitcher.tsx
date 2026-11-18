import { useState, useRef, useEffect } from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useI18n } from '../i18n/context'
import type { Locale } from '../i18n/types'

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: 'bg', label: 'Български', flag: '🇧🇬' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
]

export default function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const { locale, setLocale } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className={`inline-flex items-center gap-1.5 border px-3 py-2 text-[11px] font-semibold uppercase tracking-widest transition-all duration-500 ${
          light
            ? 'border-white/25 text-white hover:border-gold-500 hover:text-gold-500'
            : 'border-ink-900/15 text-ink-900 hover:border-gold-500 hover:text-gold-600'
        }`}
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-500 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[180px] border border-mist-300 bg-white py-1 shadow-xl shadow-ink-900/5"
        >
          {languages.map(lang => (
            <li key={lang.code}>
              <button
                type="button"
                role="option"
                aria-selected={locale === lang.code}
                onClick={() => { setLocale(lang.code); setOpen(false) }}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-xs font-medium tracking-wide transition-colors duration-300 hover:bg-mist-100 ${
                  locale === lang.code ? 'text-gold-600' : 'text-ink-700'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base">{lang.flag}</span>
                  <span className="uppercase">{lang.code}</span>
                </span>
                {locale === lang.code && <Check className="h-3.5 w-3.5" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
