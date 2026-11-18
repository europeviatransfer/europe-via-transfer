import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { navLinks } from '../data/site'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNav = (id: string) => {
    setMenuOpen(false)
    scrollToSection(id)
  }

  const solid = scrolled || menuOpen

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxury ${
          solid
            ? 'border-b border-white/10 bg-ink-900/85 py-3 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent py-5'
        }`}
      >
        <nav className="container-lux flex items-center justify-between gap-6">
          <Logo variant="light" />
          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  className="link-underline font-sans text-[12px] font-medium uppercase tracking-widest text-white/85 transition-colors duration-500 hover:text-gold-500"
                >
                  {t(item.key)}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher light />
            </div>
            <button
              onClick={() => handleNav('booking')}
              className="hidden items-center gap-2 border border-gold-500 bg-gold-500 px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-widest2 text-ink-900 transition-all duration-700 ease-luxury hover:bg-transparent hover:text-gold-500 md:inline-flex"
            >
              {t('nav.bookNow')}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label={t('nav.openMenu')}
              className="grid h-10 w-10 place-items-center text-white lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-ink-900 lg:hidden"
          >
            <div className="container-lux flex h-full flex-col py-5">
              <div className="flex items-center justify-between">
                <Logo variant="light" />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label={t('nav.closeMenu')}
                  className="grid h-10 w-10 place-items-center text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <ul className="mt-16 flex flex-col gap-2">
                {navLinks.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => handleNav(item.id)}
                      className="w-full border-b border-white/10 py-5 text-left font-serif text-3xl text-white transition-colors duration-500 hover:text-gold-500"
                    >
                      {t(item.key)}
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                <LanguageSwitcher light />
                <button
                  onClick={() => handleNav('booking')}
                  className="inline-flex items-center gap-2 border border-gold-500 bg-gold-500 px-6 py-3 font-sans text-xs font-semibold uppercase tracking-widest2 text-ink-900"
                >
                  {t('nav.bookNow')}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
