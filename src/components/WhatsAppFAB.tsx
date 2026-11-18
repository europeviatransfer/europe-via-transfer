import { MessageCircle } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { siteConfig } from '../data/site'

export default function WhatsAppFAB() {
  const { t } = useI18n()
  return (
    <a
      href={siteConfig.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('contact.whatsappBtn')}
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-ink-900 shadow-lg shadow-gold-500/30 transition-all duration-500 hover:scale-110 hover:bg-gold-400"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-gold-500/40 group-hover:hidden" />
      <MessageCircle className="relative h-6 w-6" strokeWidth={1.8} />
    </a>
  )
}
