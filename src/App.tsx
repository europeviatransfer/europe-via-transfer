import { I18nProvider } from './i18n/I18nProvider'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Routes from './components/Routes'
import WhyChooseUs from './components/WhyChooseUs'
import About from './components/About'
import Testimonials from './components/Testimonials'
import BookingForm from './components/BookingForm'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import CTA from './components/CTA'
import Footer from './components/Footer'
import WhatsAppFAB from './components/WhatsAppFAB'
import SeoManager from './components/SeoManager'
import PaymentResult from './components/PaymentResult'
import CookieBanner from './components/CookieBanner'
import CookiePolicy from './components/CookiePolicy'
import PrivacyPolicy from './components/PrivacyPolicy'
import Terms from './components/Terms'

export default function App() {
  return (
    <I18nProvider>
      <SeoManager />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Routes />
          <WhyChooseUs />
          <About />
          <Testimonials />
          <BookingForm />
          <FAQ />
          <Contact />
          <CTA />
        </main>
        <Footer />
        <WhatsAppFAB />
        <PaymentResult />
        <CookieBanner />
        <CookiePolicy />
        <PrivacyPolicy />
        <Terms />
      </div>
    </I18nProvider>
  )
}
