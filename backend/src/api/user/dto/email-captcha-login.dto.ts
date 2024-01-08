import { Mixin } from 'ts-mixer'
import { UserEmailDto } from './user-email.dto'
import { CaptchaDto } from '~/api/captcha/dto/captcha.dto'

export class EmailCaptchaLoginDto extends Mixin(UserEmailDto, CaptchaDto) {}
