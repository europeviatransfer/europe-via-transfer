import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { openCookiePolicy } from './CookiePolicy'

const STORAGE_KEY = 'evt_cookie_consent'

export default function CookieBanner() {
  const { t } = useI18n()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="mx-auto max-w-5xl border border-ink-700/60 bg-ink-900/95 shadow-2xl shadow-black/40 backdrop-blur-md">
            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
              <div className="flex flex-1 items-start gap-4">
                <Cookie className="mt-0.5 hidden h-6 w-6 shrink-0 text-gold-500 sm:block" strokeWidth={1.5} />
                <div>
                  <p className="font-serif text-sm text-white sm:text-base">
                    {t('cookies.title')}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-mist-400 sm:text-[13px]">
                    {t('cookies.text')}{' '}
                    <a
                      onClick={(e) => { e.preventDefault(); openCookiePolicy() }}
                      href="#cookies"
                      className="link-underline cursor-pointer text-gold-400 hover:text-gold-500"
                    >
                      {t('cookies.policyLabel')}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 gap-3">
                <button
                  onClick={decline}
                  className="btn-ghost !px-5 !py-3 !text-[11px]"
                >
                  {t('cookies.decline')}
                </button>
                <button
                  onClick={accept}
                  className="btn-gold !px-5 !py-3 !text-[11px]"
                >
                  {t('cookies.accept')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
