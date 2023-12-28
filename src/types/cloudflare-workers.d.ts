declare interface Request {
  $locale: Locale
  $t: Translate

  $v: {
    <Cls>(cls: Cls, obj: any): Promise<InstanceType<Cls>>
  }
}
