import { motion } from 'framer-motion'
import {
  Clock, UserCheck, Car, Hourglass, Plane, Droplets, Wifi, Baby,
  Briefcase, Lock, CalendarClock,
} from 'lucide-react'
import { useI18n } from '../i18n/context'
import { whyItems } from '../data/site'
import { SectionHeading } from './SectionHeading'

const iconMap: Record<string, typeof Clock> = {
  Clock, UserCheck, Car, Hourglass, Plane, Droplets, Wifi, Baby,
  Briefcase, Lock, CalendarClock,
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function WhyChooseUs() {
  const { t } = useI18n()

  return (
    <section className="bg-mist-100 py-24 md:py-32 lg:py-40">
      <div className="container-lux">
        <SectionHeading
          eyebrowKey="why.eyebrow"
          titleKey="why.title"
          subtitleKey="why.subtitle"
        />
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden border border-mist-300 bg-mist-300 md:grid-cols-3 lg:grid-cols-4"
        >
          {whyItems.map((item, i) => {
            const Icon = iconMap[item.icon] || Clock
            return (
              <motion.li
                key={item.id}
                variants={itemVariants}
                custom={i}
                className="group flex flex-col items-start bg-white p-7 transition-colors duration-700 hover:bg-ink-900 md:p-8"
              >
                <span className="mb-5 grid h-11 w-11 place-items-center border border-ink-900/15 text-ink-900 transition-all duration-700 group-hover:border-gold-500 group-hover:text-gold-500">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="font-serif text-base text-ink-900 transition-colors duration-700 group-hover:text-white">
                  {t(item.titleKey)}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-600 transition-colors duration-700 group-hover:text-mist-300">
                  {t(item.descKey)}
                </p>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
