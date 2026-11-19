import { Clock, MapPin, ArrowRight } from 'lucide-react'
import { useI18n } from '../i18n/context'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { fallbackDestinationImage } from '../data/content'

export default function Destinations() {
  const { t } = useI18n()
  const keys = ['borovets', 'thessaloniki', 'istanbul', 'alexandroupoli', 'kavala', 'bansko', 'plovdiv', 'skopje'] as const

  const images: Record<string, string> = {
    borovets: 'https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg?auto=compress&cs=tinysrgb&w=800',
    thessaloniki: 'https://images.pexels.com/photos/2172972/pexels-photo-2172972.jpeg?auto=compress&cs=tinysrgb&w=800',
    istanbul: 'https://images.pexels.com/photos/1549326/pexels-photo-1549326.jpeg?auto=compress&cs=tinysrgb&w=800',
    alexandroupoli: 'https://images.pexels.com/photos/1000653/pexels-photo-1000653.jpeg?auto=compress&cs=tinysrgb&w=800',
    kavala: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=800',
    bansko: 'https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg?auto=compress&cs=tinysrgb&w=800',
    plovdiv: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
    skopje: 'https://images.pexels.com/photos/2074693/pexels-photo-2074693.jpeg?auto=compress&cs=tinysrgb&w=800',
  }

  return (
    <section id="destinations" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t('destinations.title')}
          subtitle={t('destinations.subtitle')}
          center
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {keys.map((key, i) => {
            const name = t(`destinations.items.${key}.name`)
            const country = t(`destinations.items.${key}.country`)
            const desc = t(`destinations.items.${key}.description`)
            const price = t(`destinations.items.${key}.price`)
            const duration = t(`destinations.items.${key}.duration`)
            const img = images[key] || fallbackDestinationImage

            return (
              <Reveal key={key} delay={i * 80}>
                <div className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={img}
                      alt={`${name} — частен трансфер Europe Via Transfer от София`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-white">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm font-medium">{country}</span>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        <Clock className="h-3.5 w-3.5" />
                        {duration}
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 font-headings text-lg font-bold text-slate-900">{name}</h3>
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600">{desc}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400">{t('destinations.from')}</span>
                        <p className="font-headings text-xl font-bold text-primary-600">{price}</p>
                      </div>
                      <a
                        href="#booking"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-all group-hover:bg-primary-600 group-hover:text-white"
                        aria-label="Book"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
