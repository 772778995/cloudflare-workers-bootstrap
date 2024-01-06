declare interface Request {
  $locale: Locale
  $t: Translate

  $v: Validation

  $body: <T = any>() => Promise<T>

  $db: () => DB

  $kv: KVNamespace

  $res: ResponseFn
}
