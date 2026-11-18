import { useState, type FormEvent } from 'react'
import { Phone, Mail, MessageCircle, Clock, MapPin, CheckCircle2, Loader2, Send } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { useI18n } from '../i18n/context'
import { siteConfig } from '../data/site'
import { SectionHeading, Reveal } from './SectionHeading'

const EMAILJS_CONFIG = {
  serviceId: 'service_gfin3pj',
  templateId: 'template_ryys606',
  publicKey: 'SZhAUQA6SlrnhHYMC',
} as const

export default function Contact() {
  const { t, locale } = useI18n()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const contactInfo = [
    { icon: Phone, label: t('contact.phone'), value: siteConfig.phone, href: siteConfig.phoneHref },
    { icon: Mail, label: t('contact.email'), value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: MessageCircle, label: t('contact.whatsapp'), value: siteConfig.whatsapp.replace('https://', ''), href: siteConfig.whatsapp },
    { icon: Clock, label: t('contact.hours'), value: t('contact.hoursValue') },
    { icon: MapPin, label: t('contact.address'), value: t('contact.addressValue') },
  ]

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const data: Record<string, string> = {}
    formData.forEach((v, k) => { data[k] = String(v) })

    const errs: Record<string, string> = {}
    if (!data.name || data.name.length < 2) errs.name = t('common.required')
    if (!data.email || !data.email.includes('@')) errs.email = t('common.invalid')
    if (!data.phone || data.phone.length < 6) errs.phone = t('common.required')
    if (!data.message || data.message.length < 5) errs.message = t('common.required')
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          name: data.name,
          phone: data.phone,
          email: data.email,
          message: data.message,
          language: locale === 'bg' ? 'Български' : 'English',
        },
        { publicKey: EMAILJS_CONFIG.publicKey }
      )
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="bg-white py-24 md:py-32 lg:py-40">
      <div className="container-lux">
        <SectionHeading
          eyebrowKey="contact.eyebrow"
          titleKey="contact.title"
          subtitleKey="contact.subtitle"
        />
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="space-y-px overflow-hidden border border-mist-300 bg-mist-300">
              {contactInfo.map(item => {
                const Icon = item.icon
                const inner = (
                  <div className="flex items-center gap-4 bg-white p-6 transition-colors duration-500 hover:bg-mist-100">
                    <span className="grid h-11 w-11 flex-shrink-0 place-items-center border border-gold-500/40 text-gold-600">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-ink-600">{item.label}</p>
                      <p className="mt-0.5 font-serif text-base text-ink-900">{item.value}</p>
                    </div>
                  </div>
                )
                if (item.href) {
                  return (
                    <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                      {inner}
                    </a>
                  )
                }
                return <div key={item.label}>{inner}</div>
              })}
            </div>
            <div className="relative mt-6 aspect-[16/9] overflow-hidden border border-mist-300 bg-mist-100">
              <iframe
                title="Europe Via Transfer — Sofia, Bulgaria"
                src="https://www.google.com/maps?q=Sofia,Bulgaria&output=embed"
                className="h-full w-full grayscale-[0.3] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={1}>
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center border border-mist-300 bg-mist-100 p-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-gold-500" />
                <p className="mt-5 font-serif text-2xl text-ink-900">{t('contact.form.success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6 border border-mist-300 bg-white p-8 md:p-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="field-label">{t('contact.form.name')}</label>
                    <input type="text" name="name" className="field-input" />
                    {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="field-label">{t('contact.form.phone')}</label>
                    <input type="tel" name="phone" className="field-input" />
                    {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label className="field-label">{t('contact.form.email')}</label>
                  <input type="email" name="email" className="field-input" />
                  {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <label className="field-label">{t('contact.form.message')}</label>
                  <textarea
                    rows={5}
                    name="message"
                    className="field-input resize-none"
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                  {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
                </div>
                {status === 'error' && <p className="text-sm text-red-500">{t('contact.form.error')}</p>}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-gold w-full disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    <>
                      {t('contact.form.send')}
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
