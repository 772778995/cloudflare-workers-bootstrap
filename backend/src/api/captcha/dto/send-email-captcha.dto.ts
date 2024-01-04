import { UserEmailDto } from '@/api/user/dto/user-email.dto'
import { Mixin } from 'ts-mixer'
import { CaptchaTypeDto } from './captcha-type.dto'

export class SendEmailCaptchaDto extends Mixin(UserEmailDto, CaptchaTypeDto) {}
