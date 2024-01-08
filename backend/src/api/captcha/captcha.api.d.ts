import { GetApiSchema } from '~/types/common'

declare module '~/types/apis' {
  interface Post {
    '/api/captcha/email': GetApiSchema<{}>
  }
}
