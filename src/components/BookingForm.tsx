import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { useI18n } from '../i18n/context'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { aboutImage, routeKeys, transferTypes } from '../data/site'

const EMAILJS_CONFIG = {
  serviceId: 'service_gfin3pj',
  templateId: 'template_i9ho4le',
  publicKey: 'SZhAUQA6SlrnhHYMC',
} as const

type Status = 'idle' | 'sending' | 'success' | 'error'

const routeToDestination: Record<string, string> = {
  sofiaBansko: 'routes.destinations.bansko',
  sofiaPlovdiv: 'routes.destinations.plovdiv',
  sofiaBorovets: 'routes.destinations.borovets',
  sofiaThessaloniki: 'routes.destinations.thessaloniki',
  sofiaKavala: 'routes.destinations.kavala',
  sofiaAlexandroupoli: 'routes.destinations.alexandroupoli',
  sofiaIstanbul: 'routes.destinations.istanbul',
  sofiaSkopje: 'routes.destinations.skopje',
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label className="field-label !text-mist-400">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  )
}

export default function BookingForm() {
  const { t, locale } = useI18n()
  const [status, setStatus] = useState<Status>('idle')

  const schema = z.object({
    name: z.string().min(2, t('common.required')),
    phone: z.string().min(6, t('common.required')),
    email: z.string().email(t('common.invalid')),
    route: z.enum([...routeKeys]),
    from: z.string().min(2, t('common.required')),
    to: z.string().min(2, t('common.required')),
    date: z.string().min(1, t('common.required')).refine((val) => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return new Date(val) >= today
    }, { message: t('booking.errors.pastDate') }),
    time: z.string().min(1, t('common.required')),
    passengers: z.number().min(1).max(8),
    luggage: z.number().min(0).max(8),
    transferType: z.enum([...transferTypes]),
    message: z.string().optional(),
    website: z.string().optional(),
    privacy: z.boolean().refine(v => v === true, { message: t('common.required') }),
  })

  type BookingFormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      route: 'sofiaBansko',
      transferType: 'airport',
      passengers: 2,
      luggage: 2,
      from: t('routes.from'),
      to: t(routeToDestination['sofiaBansko']),
      website: '',
      privacy: false,
    },
  })

  const selectedRoute = watch('route')
  const prevRoute = useRef<string>('')

  useEffect(() => {
    if (prevRoute.current === selectedRoute) return
    prevRoute.current = selectedRoute
    if (selectedRoute === 'custom') {
      setValue('from', '')
      setValue('to', '')
    } else if (routeToDestination[selectedRoute]) {
      setValue('from', t('routes.from'))
      setValue('to', t(routeToDestination[selectedRoute]))
    }
  }, [selectedRoute, t, setValue])

  const onSubmit = async (data: BookingFormData) => {
    if (data.website) {
      setStatus('success')
      reset()
      return
    }
    setStatus('sending')
    try {
      const routeLabel = t(`booking.routes.${data.route}`)
      const routeDetails = `${data.from} → ${data.to}`
      const transferLabel = t(`booking.transferTypes.${data.transferType}`)

// 1. Имейл към Europe Via Transfer
await emailjs.send(
  EMAILJS_CONFIG.serviceId,
  'template_ryys606',
  {
    name: data.name,
    phone: data.phone,
    email: data.email,
    route: routeDetails,
    routeName: routeLabel,
    from: data.from,
    to: data.to,
    date: data.date,
    time: data.time,
    passengers: String(data.passengers),
    luggage: String(data.luggage),
    transferType: transferLabel,
    message: data.message ?? '-',
    language: locale === 'bg' ? 'Български' : 'English',
  },
  {
    publicKey: EMAILJS_CONFIG.publicKey,
  }
)

// 2. Потвърждение към клиента
await emailjs.send(
  EMAILJS_CONFIG.serviceId,
  'template_i9ho4le',
   {
    email: data.email,
    name: data.name,
    phone: data.phone,
    route: routeDetails,
    routeName: routeLabel,
    from: data.from,
    to: data.to,
    date: data.date,
    time: data.time,
    transferType: transferLabel,
    passengers: String(data.passengers),
    luggage: String(data.luggage),
    message: data.message ?? '-',
    language: locale === 'bg' ? 'Български' : 'English',
  },
  {
    publicKey: EMAILJS_CONFIG.publicKey,
  }
)

      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="booking" className="relative overflow-hidden bg-ink-900 py-24 md:py-32 lg:py-40">
      <div className="absolute inset-0">
        <img
          src={aboutImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-ink-900/80" />
      </div>

      <div className="container-lux relative z-10">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold-500" />
            <span className="eyebrow text-gold-400">{t('booking.eyebrow')}</span>
            <span className="h-px w-8 bg-gold-500" />
          </div>
        </div>

        <div className="text-mist-300">
          <SectionHeading
            title={t('booking.title')}
            subtitle={t('booking.subtitle')}
            center
            light
          />
        </div>

        <Reveal className="mx-auto mt-14 max-w-4xl">
          <div className="border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md md:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center py-16 text-center"
                >
                  <CheckCircle2 className="h-14 w-14 text-gold-500" />
                  <h3 className="mt-6 font-serif text-3xl text-white">{t('booking.successTitle')}</h3>
                  <p className="mt-3 text-lg text-gold-400">{t('booking.successText')}</p>
                  <p className="mt-4 max-w-md text-sm text-mist-300">{t('booking.successSub')}</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-outline mt-10 border-white/30 text-white hover:border-gold-500 hover:bg-gold-500 hover:text-ink-900"
                  >
                    {t('booking.newRequest')}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-8"
                >
                  <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                    <label>{t('booking.fields.website')}</label>
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      className="field-input"
                      {...register('website')}
                    />
                  </div>
                  <div className="grid gap-x-6 gap-y-6 md:grid-cols-2">
                    <Field label={t('booking.fields.name')} error={errors.name?.message}>
                      <input type="text" className="field-input" {...register('name')} />
                    </Field>
                    <Field label={t('booking.fields.phone')} error={errors.phone?.message}>
                      <input type="tel" className="field-input" {...register('phone')} />
                    </Field>
                    <Field label={t('booking.fields.email')} error={errors.email?.message}>
                      <input type="email" className="field-input" {...register('email')} />
                    </Field>
                    <Field label={t('booking.fields.route')}>
                      <select className="field-input" {...register('route')}>
                        {routeKeys.map(r => (
                          <option key={r} value={r}>
                            {t(`booking.routes.${r}`)}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <div className="grid gap-x-6 gap-y-6 md:grid-cols-2">
                    <Field label={t('booking.fields.from')} error={errors.from?.message}>
                      <input type="text" className="field-input" {...register('from')} />
                    </Field>
                    <Field label={t('booking.fields.to')} error={errors.to?.message}>
                      <input type="text" className="field-input" {...register('to')} />
                    </Field>
                    <Field label={t('booking.fields.date')} error={errors.date?.message}>
                      <input type="date" min={new Date().toISOString().split('T')[0]} className="field-input" {...register('date')} />
                    </Field>
                    <Field label={t('booking.fields.time')} error={errors.time?.message}>
                      <input type="time" className="field-input" {...register('time')} />
                    </Field>
                  </div>

                  <div className="grid gap-x-6 gap-y-6 md:grid-cols-3">
                    <Field label={t('booking.fields.passengers')} error={errors.passengers?.message}>
                      <input
                        type="number"
                        min={1}
                        max={8}
                        className="field-input"
                        {...register('passengers', { valueAsNumber: true })}
                      />
                    </Field>
                    <Field label={t('booking.fields.luggage')} error={errors.luggage?.message}>
                      <input
                        type="number"
                        min={0}
                        max={8}
                        className="field-input"
                        {...register('luggage', { valueAsNumber: true })}
                      />
                    </Field>
                    <Field label={t('booking.fields.transferType')}>
                      <select className="field-input" {...register('transferType')}>
                        {transferTypes.map(tt => (
                          <option key={tt} value={tt}>
                            {t(`booking.transferTypes.${tt}`)}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label={t('booking.fields.message')} error={errors.message?.message}>
                    <textarea
                      rows={3}
                      className="field-input resize-none"
                      placeholder={t('booking.fields.messagePlaceholder')}
                      {...register('message')}
                    />
                  </Field>

                  <label className="flex cursor-pointer items-start gap-3 text-sm text-mist-300">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 accent-gold-500"
                      {...register('privacy')}
                    />
                    <span>{t('booking.fields.consentLabel')}</span>
                  </label>
                  {errors.privacy && (
                    <p className="text-xs text-red-400">{errors.privacy.message}</p>
                  )}

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-3 border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
                    >
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <span>{t('booking.errorText')}</span>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t('booking.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {t('booking.submit')}
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
