import { GetApiSchema } from '~/types/common'
import { SendEmailCaptchaDto } from './dto/send-email-captcha.dto'

declare module '~/types/apis' {
  interface Post {
    '/api/captcha/email': GetApiSchema<{
      body: SendEmailCaptchaDto
    }>
  }
}
