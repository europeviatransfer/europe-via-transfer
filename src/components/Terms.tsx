import LegalModal, { makeOpener } from './ui/LegalModal'

const OPEN_EVENT = 'open-terms'
const sections = [
  'intro',
  'definitions',
  'services',
  'bookings',
  'pricing',
  'payment',
  'cancellation',
  'liability',
  'conduct',
  'intellectualProperty',
  'governingLaw',
  'changes',
  'contact',
] as const

export const openTerms = makeOpener(OPEN_EVENT)

export default function Terms() {
  return (
    <LegalModal
      openEvent={OPEN_EVENT}
      titleKey="terms.title"
      updatedKey="terms.updated"
      updatedDateKey="terms.updatedDate"
      closeKey="terms.close"
      sectionsKey="terms.sections"
      sections={sections}
      contactSection="contact"
    />
  )
}
