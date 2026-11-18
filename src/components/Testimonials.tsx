import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { testimonials } from '../data/site'
import { SectionHeading } from './SectionHeading'

export default function Testimonials() {
  const { t, locale } = useI18n()
  const [index, setIndex] = useState(0)
  const count = testimonials.length

  const navigate = (dir: number) => setIndex(prev => (prev + dir + count) % count)
  const current = testimonials[index]

  return (
    <section className="relative overflow-hidden bg-ink-900 py-24 md:py-32 lg:py-40">
      <div className="container-lux">
        <SectionHeading
          eyebrowKey="testimonials.eyebrow"
          titleKey="testimonials.title"
          subtitleKey="testimonials.subtitle"
          light
        />
        <div className="relative mx-auto mt-16 max-w-4xl">
          <Quote className="mx-auto h-10 w-10 text-gold-500/40" />
          <div className="relative min-h-[280px] md:min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 text-center"
              >
                <div className="mb-6 flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const fill = current.rating >= i + 1 ? 100 : current.rating >= i + 0.5 ? 50 : 0
                    return (
                      <div className="relative h-4 w-4" key={i}>
                        <Star className="absolute h-4 w-4 text-gold-500" />
                        {fill > 0 && (
                          <div className="absolute overflow-hidden" style={{ width: `${fill}%` }}>
                            <Star className="h-4 w-4 fill-gold-500 text-gold-500" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
                <p className="text-balance text-xl font-light leading-relaxed text-white md:text-2xl">
                  {locale === 'bg' ? current.textBg : current.textEn}
                </p>
                <footer className="mt-8">
                  <p className="font-serif text-lg text-gold-500">{current.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-mist-400">
                    {locale === 'bg' ? current.roleBg : current.roleEn} · {current.location}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              aria-label={t('testimonials.prev')}
              className="grid h-11 w-11 place-items-center border border-white/20 text-white transition-all duration-500 hover:border-gold-500 hover:text-gold-500"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-1.5 transition-all duration-500 ${
                    i === index ? 'w-8 bg-gold-500' : 'w-3 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => navigate(1)}
              aria-label={t('testimonials.next')}
              className="grid h-11 w-11 place-items-center border border-white/20 text-white transition-all duration-500 hover:border-gold-500 hover:text-gold-500"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
