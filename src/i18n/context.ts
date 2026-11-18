import { createContext, useContext } from 'react'
import type { Locale, TFunction, TxFunction } from './types'

export interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: TFunction
  tx: TxFunction
}

export const I18nContext = createContext<I18nContextValue | undefined>(undefined)

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
