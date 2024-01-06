import { locales } from '~/i18n'
import { Locale, TranslateKey } from '~/types/i18n.middleware'

/** 语言国际化中间件 */
export const i18nMiddleware = async (req: Request) => {
  const locale = (req.headers.get('locale') || 'zh-CN') as Locale
  req.$locale = locale
  req.$t = (k: TranslateKey) => locales[locale][k] || k
}
