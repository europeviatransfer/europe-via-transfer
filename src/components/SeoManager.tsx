import { useEffect } from 'react'
import { useI18n } from '../i18n/context'

const seoData = {
  bg: {
    title: 'Europe Via Transfer — Частни трансфери и превози в България и Балканите | Private Transfers',
    description: 'Europe Via Transfer — частни трансфери, летищни трансфери София и VIP превози с професионален шофьор. Private airport transfers Bulgaria & chauffeur service Balkans.',
    keywords: 'Europe Via Transfer, частни трансфери, летищни трансфери София, VIP превози, private transfers Bulgaria, airport transfers Sofia, chauffeur service Balkans, трансфер летище София, междуградски трансфери, трансгранични трансфери',
    canonical: 'https://europeviatransfer.com/',
  },
  en: {
    title: 'Europe Via Transfer — Private Transfers & Airport Transfers in Bulgaria & the Balkans',
    description: 'Europe Via Transfer — private transfers, Sofia airport transfers and VIP chauffeur service across Bulgaria and the Balkans. Частни трансфери и летищни трансфери с професионален шофьор.',
    keywords: 'Europe Via Transfer, private transfers Bulgaria, airport transfers Sofia, chauffeur service Balkans, VIP transfers Bulgaria, intercity transfers, cross-border transfers, Sofia airport transfer, Bansko transfer, Plovdiv transfer, Thessaloniki transfer',
    canonical: 'https://europeviatransfer.com/en/',
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

function setLink(rel: string, href: string) {
  let link = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
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
    setMeta('og:url', data.canonical, 'property')
    setMeta('twitter:title', data.title)
    setMeta('twitter:description', data.description)
    setLink('canonical', data.canonical)
    document.documentElement.lang = locale
  }, [locale])

  return null
}
