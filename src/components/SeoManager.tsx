import { useEffect } from 'react'
import { useI18n } from '../i18n/context'

const seoData = {
  bg: {
    title: 'Europe Via Transfer — Луксозни частни трансфери & chauffeur услуги | България & Балканите',
    description: 'Europe Via Transfer (Юръп Виа Трансфер ООД) — премиум частни трансфери с професионален шофьор в България и на Балканите. Летищни трансфери, междуградски пътувания, VIP и корпоративни chauffeur услуги.',
  },
  en: {
    title: 'Europe Via Transfer — Luxury Private Transfers & Chauffeur Services | Bulgaria & the Balkans',
    description: 'Europe Via Transfer Ltd. — premium private transfers with a professional chauffeur across Bulgaria and the Balkans. Airport transfers, intercity travel, VIP and corporate chauffeur services.',
  },
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export default function SeoManager() {
  const { locale } = useI18n()

  useEffect(() => {
    const data = seoData[locale]
    document.title = data.title
    setMeta('description', data.description)
    setMeta('og:title', data.title, 'property')
    setMeta('og:description', data.description, 'property')
    setMeta('og:locale', locale === 'bg' ? 'bg_BG' : 'en_US', 'property')
    setMeta('twitter:title', data.title)
    setMeta('twitter:description', data.description)
    document.documentElement.lang = locale
  }, [locale])

  return null
}
