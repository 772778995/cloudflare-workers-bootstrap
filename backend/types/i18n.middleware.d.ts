import { locales } from '@backend/i18n'
import ZhCn from '@backend/i18n/locales/zh-CN.json'

type Locale = keyof typeof locales
type TranslateKey = keyof (typeof locales)[Locale]
type Translate = (key: TranslateKey) => string
