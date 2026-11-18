export type Locale = 'bg' | 'en'

type NestedRecord = { [key: string]: string | number | NestedRecord | NestedRecord[] }

export type Translation = NestedRecord

export type TFunction = (key: string) => string
export type TxFunction = (key: string) => unknown
