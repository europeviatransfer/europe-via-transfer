import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { faqCount } from '../data/site'
import { SectionHeading } from './SectionHeading'

export default function FAQ() {
  const { t } = useI18n()
  const [open, setOpen] = useState<number | null>(null)

  const items = Array.from({ length: faqCount }, (_, i) => ({
    qKey: `faqItems.${i}.q`,
    aKey: `faqItems.${i}.a`,
  }))

  return (
    <section className="bg-mist-100 py-24 md:py-32 lg:py-40">
      <div className="container-lux">
        <SectionHeading
          eyebrowKey="faq.eyebrow"
          titleKey="faq.title"
          subtitleKey="faq.subtitle"
        />
        <div className="mx-auto mt-14 max-w-3xl divide-y divide-mist-300 border-y border-mist-300">
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-gold-600"
                >
                  <span className="font-serif text-base text-ink-900 md:text-lg">{t(item.qKey)}</span>
                  <span
                    className={`grid h-8 w-8 flex-shrink-0 place-items-center border transition-all duration-500 ${
                      isOpen
                        ? 'rotate-45 border-gold-500 bg-gold-500 text-ink-900'
                        : 'border-ink-900/20 text-ink-900'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-sm leading-relaxed text-ink-600 md:text-base">
                        {t(item.aKey)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
