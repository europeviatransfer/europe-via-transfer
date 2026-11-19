import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { heroImage } from '../data/site'

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const heroVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function Hero() {
  const { t } = useI18n()

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-900">
      <div className="absolute inset-0">
        <motion.img
          src={heroImage}
          alt="Europe Via Transfer — частни трансфери с луксозен автомобил и професионален шофьор в България"
          className="h-full w-full object-cover"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 14, ease: [0.22, 1, 0.36, 1] }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/70 to-ink-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/40" />
      </div>

      <div className="container-lux relative z-10 pt-28">
        <div className="max-w-3xl">
          <motion.p custom={0} variants={heroVariants} initial="hidden" animate="visible" className="eyebrow text-gold-400">
            {t('hero.eyebrow')}
          </motion.p>
          <motion.h1
            custom={1}
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="mt-7 text-balance font-serif text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            custom={2}
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 max-w-xl text-base leading-relaxed text-mist-300 md:text-lg"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            custom={3}
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <button onClick={() => scrollToSection('booking')} className="btn-gold">
              {t('hero.reserve')}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => scrollToSection('booking')} className="btn-ghost">
              {t('hero.quote')}
            </button>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={() => scrollToSection('services')}
        aria-label={t('hero.scroll')}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition-colors duration-500 hover:text-gold-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="text-[10px] font-medium uppercase tracking-widest2">{t('hero.scroll')}</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  )
}
