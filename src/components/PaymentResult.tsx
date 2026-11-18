import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, X } from 'lucide-react'
import { useI18n } from '../i18n/context'

type PaymentStatus = 'success' | 'cancelled' | null

export default function PaymentResult() {
  const { t } = useI18n()
  const [status, setStatus] = useState<PaymentStatus>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const payment = params.get('payment')
    if (payment === 'success' || payment === 'cancelled') {
      setStatus(payment)
      const url = new URL(window.location.href)
      url.searchParams.delete('payment')
      url.searchParams.delete('session_id')
      window.history.replaceState({}, document.title, url.toString())
    }
  }, [])

  const dismiss = () => setStatus(null)

  return (
    <AnimatePresence>
      {status && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/80 backdrop-blur-sm"
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-4 w-full max-w-md border border-white/10 bg-ink-800 p-8 text-center md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={dismiss}
              className="absolute right-4 top-4 text-mist-400 transition-colors hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {status === 'success' ? (
              <>
                <CheckCircle2 className="mx-auto h-14 w-14 text-gold-500" />
                <h3 className="mt-6 font-serif text-2xl text-white md:text-3xl">
                  {t('payment.successTitle')}
                </h3>
                <p className="mt-3 text-gold-400">{t('payment.successText')}</p>
                <p className="mt-4 text-sm text-mist-300">{t('payment.successSub')}</p>
              </>
            ) : (
              <>
                <XCircle className="mx-auto h-14 w-14 text-red-400" />
                <h3 className="mt-6 font-serif text-2xl text-white md:text-3xl">
                  {t('payment.cancelledTitle')}
                </h3>
                <p className="mt-3 text-mist-300">{t('payment.cancelledText')}</p>
              </>
            )}

            <button
              onClick={dismiss}
              className="btn-gold mt-8 w-full"
            >
              {t('payment.close')}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
