import { useEffect } from 'react'
import { useI18n } from '../i18n/context'

const seoData = {
  bg: {
    title: 'Europe Via Transfer — Частни трансфери и превози | Летищни трансфери България & Балканите',
    description: 'Europe Via Transfer — премиум частни трансфери с професионален шофьор в България и на Балканите. Летищни трансфери, междуградски пътувания, VIP и корпоративни chauffeur услуги.',
    keywords: 'Europe Via Transfer, частни трансфери, летищни трансфери, частни превози, трансфер София, трансфер летище София, VIP трансфер, междуградски трансфери, трансгранични трансфери, private transfers Bulgaria, chauffeur Bulgaria',
  },
  en: {
    title: 'Europe Via Transfer — Private Transfers & Chauffeur Services | Bulgaria & the Balkans',
    description: 'Europe Via Transfer — premium private transfers with a professional chauffeur across Bulgaria and the Balkans. Airport transfers, intercity travel, VIP and corporate chauffeur services.',
    keywords: 'Europe Via Transfer, private transfers Bulgaria, airport transfers Sofia, chauffeur services Bulgaria, private transfers Balkans, VIP transfer Bulgaria, intercity transfers, cross-border transfers, Sofia airport transfer, Bansko transfer, Plovdiv transfer, Thessaloniki transfer',
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
    setMeta('keywords', data.keywords)
    setMeta('og:title', data.title, 'property')
    setMeta('og:description', data.description, 'property')
    setMeta('og:locale', locale === 'bg' ? 'bg_BG' : 'en_US', 'property')
    setMeta('twitter:title', data.title)
    setMeta('twitter:description', data.description)
    document.documentElement.lang = locale
  }, [locale])

  return null
}
