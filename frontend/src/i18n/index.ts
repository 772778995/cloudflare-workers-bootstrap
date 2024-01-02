import zhCN from './locales/zh-CN.json'
import enUS from './locales/en-US.json'
import { createI18n } from 'vue-i18n'

export type MessageSchema = typeof zhCN
declare global {
  /** 语言国际化 */
  type Locale = 'zh-CN' | 'en-US'
}

const messages: Record<Locale, MessageSchema> = {
  'zh-CN': zhCN,
  'en-US': enUS
}

/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
  export interface DefineDateTimeFormat {}
  export interface DefineNumberFormat {}
}

const i18n = createI18n({
  locale: 'zh-CN',
  legacy: false,
  messages
})

export default i18n

