declare interface Request {
  $locale: Locale
  $t: Translate

  $v: Validation

  $res: ResponseFn
}
