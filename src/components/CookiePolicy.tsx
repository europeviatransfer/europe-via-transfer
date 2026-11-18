import LegalModal, { makeOpener } from './ui/LegalModal'

const OPEN_EVENT = 'open-cookie-policy'
const sections = [
  'intro',
  'whatAreCookies',
  'types',
  'necessary',
  'analytics',
  'functional',
  'howWeUse',
  'thirdParty',
  'yourChoices',
  'managing',
  'changes',
  'contact',
] as const

export const openCookiePolicy = makeOpener(OPEN_EVENT)

export default function CookiePolicy() {
  return (
    <LegalModal
      openEvent={OPEN_EVENT}
      titleKey="cookiePolicy.title"
      updatedKey="cookiePolicy.updated"
      updatedDateKey="cookiePolicy.updatedDate"
      closeKey="cookiePolicy.close"
      sectionsKey="cookiePolicy.sections"
      sections={sections}
      contactSection="contact"
    />
  )
}
