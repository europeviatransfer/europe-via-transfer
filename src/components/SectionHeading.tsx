import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useI18n } from '../i18n/context'

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: delay * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={sectionVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

interface SectionHeadingProps {
  eyebrowKey: string
  titleKey: string
  subtitleKey?: string
  align?: 'center' | 'left'
  light?: boolean
  className?: string
}

export function SectionHeading({
  eyebrowKey,
  titleKey,
  subtitleKey,
  align = 'center',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const { t } = useI18n()
  const center = align === 'center'
  return (
    <Reveal className={`max-w-3xl ${center ? 'mx-auto text-center' : 'text-left'} ${className}`}>
      <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
        <span className="h-px w-8 bg-gold-500" />
        <span className={`eyebrow ${light ? 'text-gold-400' : ''}`}>{t(eyebrowKey)}</span>
        <span className="h-px w-8 bg-gold-500" />
      </div>
      <h2
        className={`mt-6 text-balance text-3xl leading-tight md:text-4xl lg:text-[2.75rem] ${
          light ? 'text-white' : 'text-ink-900'
        }`}
      >
        {t(titleKey)}
      </h2>
      {subtitleKey && (
        <p className={`mt-5 text-base leading-relaxed md:text-lg ${light ? 'text-mist-300' : 'text-ink-600'}`}>
          {t(subtitleKey)}
        </p>
      )}
    </Reveal>
  )
}
