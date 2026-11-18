import LegalModal, { makeOpener } from './ui/LegalModal'

const OPEN_EVENT = 'open-privacy-policy'
const sections = [
  'intro',
  'dataController',
  'dataCollected',
  'legalBasis',
  'purposes',
  'sharing',
  'internationalTransfers',
  'retention',
  'security',
  'yourRights',
  'children',
  'cookies',
  'changes',
  'contact',
] as const

export const openPrivacyPolicy = makeOpener(OPEN_EVENT)

export default function PrivacyPolicy() {
  return (
    <LegalModal
      openEvent={OPEN_EVENT}
      titleKey="privacyPolicy.title"
      updatedKey="privacyPolicy.updated"
      updatedDateKey="privacyPolicy.updatedDate"
      closeKey="privacyPolicy.close"
      sectionsKey="privacyPolicy.sections"
      sections={sections}
      contactSection="contact"
    />
  )
}
