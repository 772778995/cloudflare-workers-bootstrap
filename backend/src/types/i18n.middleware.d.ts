import { locales } from '~/i18n'
import ZhCn from '~/i18n/locales/zh-CN.json'

type Locale = keyof typeof locales
type TranslateKey = keyof (typeof locales)[Locale]
type Translate = (key: TranslateKey) => string
