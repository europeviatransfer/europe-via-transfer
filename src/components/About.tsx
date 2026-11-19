import { motion } from 'framer-motion'
import { useI18n } from '../i18n/context'
import { aboutImage, aboutStats } from '../data/site'
import { Reveal } from './SectionHeading'

export default function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="bg-white py-24 md:py-32 lg:py-40">
      <div className="container-lux">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={aboutImage}
                  alt="Луксозен частен трансфер Europe Via Transfer — шофьор отваря вратата на премиум автомобил за гост"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden border border-gold-500 bg-white p-7 md:block">
                <p className="font-serif text-4xl text-gold-600">{t('about.statValues.years')}</p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-ink-600">{t('about.stats.years')}</p>
              </div>
              <div className="absolute -left-6 -top-6 h-24 w-24 border-l border-t border-gold-500" />
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold-500" />
              <span className="eyebrow">{t('about.eyebrow')}</span>
            </div>
            <h2 className="mt-6 text-balance text-3xl leading-tight text-ink-900 md:text-4xl lg:text-[2.75rem]">
              {t('about.title')}
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-ink-600 md:text-lg">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-mist-300 bg-mist-300 sm:grid-cols-4">
              {aboutStats.map((stat, n) => (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: n * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white p-5 text-center"
                >
                  <p className="font-serif text-2xl text-ink-900 md:text-3xl">{t(stat.valueKey)}</p>
                  <p className="mt-1.5 text-[10px] uppercase tracking-widest text-ink-600">{t(stat.labelKey)}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
