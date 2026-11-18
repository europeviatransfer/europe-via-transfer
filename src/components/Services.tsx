import { motion } from 'framer-motion'
import { Plane, Building2, Crown, Globe, Route, Sparkles, ArrowUpRight } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { services } from '../data/site'
import { SectionHeading } from './SectionHeading'

const iconMap: Record<string, typeof Plane> = {
  Plane, Building2, Crown, Globe, Route, Sparkles,
}

function scrollToBooking() {
  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function Services() {
  const { t } = useI18n()

  return (
    <section id="services" className="bg-mist-100 py-24 md:py-32 lg:py-40">
      <div className="container-lux">
        <SectionHeading
          eyebrowKey="services.eyebrow"
          titleKey="services.title"
          subtitleKey="services.subtitle"
        />
        <div className="mt-16 grid gap-px overflow-hidden border border-mist-300 bg-mist-300 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Plane
            return (
              <motion.button
                key={service.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                onClick={scrollToBooking}
                className="group relative flex flex-col items-start bg-white p-8 text-left transition-colors duration-700 hover:bg-ink-900 md:p-10"
              >
                <span className="mb-8 grid h-12 w-12 place-items-center border border-ink-900/15 text-ink-900 transition-all duration-700 group-hover:border-gold-500 group-hover:text-gold-500">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="font-serif text-xl text-ink-900 transition-colors duration-700 group-hover:text-white">
                  {t(service.nameKey)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600 transition-colors duration-700 group-hover:text-mist-300">
                  {t(service.descKey)}
                </p>
                <ArrowUpRight className="mt-6 h-5 w-5 text-gold-500 opacity-0 transition-all duration-700 group-hover:opacity-100" />
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
