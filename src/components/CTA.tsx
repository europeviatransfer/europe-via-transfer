import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { siteConfig } from '../data/site'

function scrollToBooking() {
  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
}

export default function CTA() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-gold-500 py-20 md:py-28">
      <div className="absolute inset-0 grain opacity-30" />
      <div className="container-lux relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8 text-center"
        >
          <h2 className="max-w-2xl text-balance font-serif text-3xl leading-tight text-ink-900 md:text-4xl">
            {t('cta.title')}
          </h2>
          <p className="max-w-xl text-base text-ink-900/70 md:text-lg">{t('cta.subtitle')}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button onClick={scrollToBooking} className="inline-flex items-center justify-center gap-2.5 bg-ink-900 px-8 py-4 font-sans text-xs font-semibold uppercase tracking-widest2 text-white transition-all duration-700 ease-luxury hover:bg-ink-800">
              {t('cta.book')}
              <ArrowRight className="h-4 w-4" />
            </button>
            <a href={siteConfig.phoneHref} className="inline-flex items-center justify-center gap-2.5 border border-ink-900/30 px-8 py-4 font-sans text-xs font-semibold uppercase tracking-widest2 text-ink-900 transition-all duration-700 ease-luxury hover:bg-ink-900 hover:text-white">
              <Phone className="h-4 w-4" />
              {t('cta.call')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
