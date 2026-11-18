import { type ReactNode } from 'react'

interface SectionHeadingProps {
  title: ReactNode
  subtitle?: ReactNode
  center?: boolean
  light?: boolean
}

export default function SectionHeading({ title, subtitle, center, light }: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {subtitle && (
        <p className={`mb-2 text-sm font-semibold uppercase tracking-wider ${light ? 'text-primary-300' : 'text-primary-600'}`}>
          {subtitle}
        </p>
      )}
      <h2 className={`text-3xl font-bold sm:text-4xl md:text-5xl ${light ? 'text-white' : 'text-slate-900'} font-headings`}>
        {title}
      </h2>
    </div>
  )
}
