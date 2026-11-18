import { useEffect, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useI18n } from '../../i18n/context'
import { siteConfig } from '../../data/site'

export interface LegalSection {
  key: string
  withContact?: boolean
}

interface LegalModalProps {
  openEvent: string
  titleKey: string
  updatedKey: string
  updatedDateKey: string
  closeKey: string
  sectionsKey: string
  sections: readonly string[]
  contactSection?: string
}

export default function LegalModal({
  openEvent,
  titleKey,
  updatedKey,
  updatedDateKey,
  closeKey,
  sectionsKey,
  sections,
  contactSection,
}: LegalModalProps) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener(openEvent, handler)
    return () => window.removeEventListener(openEvent, handler)
  }, [openEvent])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  const close = () => setOpen(false)

  const renderContact = (): ReactNode => (
    <ul className="mt-3 space-y-1 text-sm text-ink-600">
      <li>
        <a href={`mailto:${siteConfig.email}`} className="link-underline text-gold-600">
          {siteConfig.email}
        </a>
      </li>
      <li>
        <a href={siteConfig.phoneHref} className="link-underline text-gold-600">
          {siteConfig.phone}
        </a>
      </li>
    </ul>
  )

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink-900/80 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.97, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative my-8 mx-4 w-full max-w-3xl border border-white/10 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink-600/10 bg-white/95 px-6 py-5 backdrop-blur-md md:px-10">
              <h2 className="font-serif text-lg text-ink-900 md:text-xl">
                {t(titleKey)}
              </h2>
              <button
                onClick={close}
                className="text-mist-400 transition-colors hover:text-ink-900"
                aria-label={t(closeKey)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-8 md:px-10 md:py-10">
              <p className="text-xs text-mist-400">
                {t(updatedKey)}: {t(updatedDateKey)}
              </p>

              <div className="mt-6 space-y-8">
                {sections.map(key => (
                  <section key={key}>
                    <h3 className="font-serif text-base text-ink-900 md:text-lg">
                      {t(`${sectionsKey}.${key}.title`)}
                    </h3>
                    <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink-600">
                      {t(`${sectionsKey}.${key}.body`)}
                    </p>
                    {key === contactSection && renderContact()}
                  </section>
                ))}
              </div>

              <button onClick={close} className="btn-gold mt-10 w-full">
                {t(closeKey)}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function makeOpener(openEvent: string) {
  return () => window.dispatchEvent(new CustomEvent(openEvent))
}
