import { useState, useCallback, useMemo, type ReactNode } from 'react'
import { I18nContext } from './context'
import type { Locale, Translation } from './types'
import { bg } from './locales/bg'
import { en } from './locales/en'

const translations: Record<Locale, Translation> = { bg, en }
const STORAGE_KEY = 'evt-locale'

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'bg'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved && saved in translations) return saved as Locale
  if (window.navigator.language.slice(0, 2) === 'en') return 'en'
  return 'bg'
}

function getValue(obj: Translation, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') {
      if (Array.isArray(acc)) {
        const idx = Number(key)
        return acc[idx]
      }
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    try {
      window.localStorage.setItem(STORAGE_KEY, newLocale)
    } catch { /* ignore */ }
  }, [])

  const t = useCallback(
    (key: string) => {
      const value = getValue(translations[locale], key)
      return typeof value === 'string' ? value : key
    },
    [locale]
  )

  const tx = useCallback(
    (key: string) => getValue(translations[locale], key),
    [locale]
  )

  const value = useMemo(
    () => ({ locale, setLocale, t, tx }),
    [locale, setLocale, t, tx]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
