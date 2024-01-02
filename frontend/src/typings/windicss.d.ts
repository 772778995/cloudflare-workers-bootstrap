import { AttributifyNames } from 'windicss/types/jsx'

declare module '@vue/runtime-dom' {
  type Prefix = '_'
  type OtherAttr = 'electron'
  type OtherKey = `${Prefix}${OtherAttr}`
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface HTMLAttributes
    extends Partial<Record<AttributifyNames<Prefix> | OtherKey, string>> {}
}
