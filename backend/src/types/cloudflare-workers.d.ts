declare interface Request {
  $locale: Locale
  $t: Translate

  $v: Validation

  $db: DB

  $res: ResponseFn
}
