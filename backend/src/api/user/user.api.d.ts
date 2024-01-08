import { GetApiResponse, GetApiSchema } from '~/types/common'
import { CreateUserDto } from './dto/create-user.dto'
import { createUser } from './user.service'
import { EmailCaptchaLoginDto } from './dto/email-captcha-login.dto'

declare module '~/types/apis' {
  interface Post {
    '/api/user/register': GetApiSchema<{
      body: CreateUserDto
      response: GetApiResponse<typeof createUser>
    }>

    '/api/user/login-psd': {}

    '/api/user/login-email-captcha': GetApiSchema<{
      body: EmailCaptchaLoginDto
    }>
  }
}
