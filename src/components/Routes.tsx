import { motion } from 'framer-motion'
import { Clock, MapPin, ArrowRight } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { routes, siteConfig } from '../data/site'
import { SectionHeading } from './SectionHeading'

function scrollToBooking() {
  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Routes() {
  const { t, locale } = useI18n()

  return (
    <section id="routes" className="bg-ink-900 py-24 md:py-32 lg:py-40">
      <div className="container-lux">
        <SectionHeading
          eyebrowKey="routes.eyebrow"
          titleKey="routes.title"
          subtitleKey="routes.subtitle"
          light
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {routes.map((route, i) => {
            const duration = locale === 'bg' ? route.durationLabelBg : route.durationLabelEn
            return (
              <motion.article
                key={route.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden border border-white/10 bg-white/[0.02]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={route.image}
                    alt={`Частен трансфер Europe Via Transfer: ${t('routes.from')} ↔ ${t(route.destKey)}`}
                    className="h-full w-full object-cover transition-transform duration-1000 ease-luxury group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                    <div>
                      <h3 className="font-serif text-xl text-white">
                        {t('routes.from')}
                        <span className="mx-2 text-gold-500">↔</span>
                        {t(route.destKey)}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-mist-300">
                        <Clock className="h-3.5 w-3.5" />
                        {duration} {t('routes.duration')}
                      </p>
                    </div>
                    <span className="font-serif text-lg text-gold-500">{route.priceFrom}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="flex items-start gap-2 text-sm leading-relaxed text-mist-300">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-500" />
                    {t(route.noteKey)}
                  </p>
                  <button
                    onClick={scrollToBooking}
                    className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-gold-500 transition-colors duration-500 hover:text-white"
                  >
                    {t('hero.reserve')}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col items-center gap-6 text-center"
        >
          <p className="font-serif text-2xl text-white">{t('routes.customCta')}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button onClick={scrollToBooking} className="btn-gold">
              {t('routes.customBtn')}
              <ArrowRight className="h-4 w-4" />
            </button>
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              {t('contact.whatsappBtn')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
