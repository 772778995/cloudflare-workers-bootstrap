import { Locale, Translate } from './i18n.middleware'

declare global {
  interface Request {
    /**
     * 语言环境
     * @default 'zh-CN'
     */
    $locale: Locale

    /** 翻译 */
    $t: Translate

    /** 校验数据 */
    $v: Validation

    /** 表单数据 */
    $body: <T = any>() => Promise<T>

    /** 获取数据库 */
    $db: () => DB

    /** 键值对存储 */
    $kv: KVNamespace

    /** 响应 */
    $res: ResponseFn
  }
}
