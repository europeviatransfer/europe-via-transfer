import { MapPin, Instagram, Facebook, Linkedin } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { siteConfig, footerQuickLinks, footerServiceLinks } from '../data/site'
import Logo from './Logo'
import { openCookiePolicy } from './CookiePolicy'
import { openPrivacyPolicy } from './PrivacyPolicy'
import { openTerms } from './Terms'

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const { t } = useI18n()

  const socials = [
    { icon: Instagram, label: 'Instagram', href: siteConfig.instagram },
    { icon: Facebook, label: 'Facebook', href: siteConfig.facebook },
    { icon: Linkedin, label: 'LinkedIn', href: siteConfig.linkedin },
  ]

  return (
    <footer className="border-t border-white/10 bg-ink-900 pt-20 pb-10">
      <div className="container-lux">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist-300">{t('footer.tagline')}</p>
            <div className="mt-6 flex items-center gap-2 text-xs text-mist-400">
              <MapPin className="h-4 w-4 text-gold-500" />
              {t('contact.addressValue')}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest2 text-gold-500">{t('footer.quickLinks')}</h3>
            <ul className="mt-5 space-y-3">
              {footerQuickLinks.map(item => (
                <li key={`${item.id}-${item.key}`}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="link-underline text-sm text-mist-300 transition-colors duration-500 hover:text-white"
                  >
                    {t(item.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest2 text-gold-500">{t('footer.servicesTitle')}</h3>
            <ul className="mt-5 space-y-3">
              {footerServiceLinks.map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="link-underline text-sm text-mist-300 transition-colors duration-500 hover:text-white"
                  >
                    {t(item.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest2 text-gold-500">{t('footer.contactTitle')}</h3>
            <ul className="mt-5 space-y-3 text-sm text-mist-300">
              <li><a href={siteConfig.phoneHref} className="link-underline hover:text-white">{siteConfig.phone}</a></li>
              <li><a href={`mailto:${siteConfig.email}`} className="link-underline hover:text-white">{siteConfig.email}</a></li>
              <li className="text-mist-400">{t('contact.hoursValue')}</li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest2 text-gold-500">{t('footer.social')}</h3>
            <ul className="mt-5 space-y-3">
              {socials.map(s => {
                const Icon = s.icon
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 text-sm text-mist-300 transition-colors duration-500 hover:text-white"
                    >
                      <span className="grid h-8 w-8 place-items-center border border-white/15 transition-colors duration-500 group-hover:border-gold-500 group-hover:text-gold-500">
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      {s.label}
                    </a>
                  </li>
                )
              })}
              <li>
                <a
                  href={siteConfig.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm text-mist-300 transition-colors duration-500 hover:text-white"
                >
                  {t('footer.google')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-center md:flex-row md:text-left">
          <p className="text-xs text-mist-400">
            © {new Date().getFullYear()} Europe Via Transfer Ltd. {t('footer.rights')}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { key: 'footer.privacy', onClick: openPrivacyPolicy },
              { key: 'footer.terms', onClick: openTerms },
              { key: 'footer.cookies', onClick: openCookiePolicy },
            ].map(item => (
              <li key={item.key}>
                <button
                  onClick={item.onClick}
                  className="link-underline text-xs text-mist-400 transition-colors duration-500 hover:text-gold-500"
                >
                  {t(item.key)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
