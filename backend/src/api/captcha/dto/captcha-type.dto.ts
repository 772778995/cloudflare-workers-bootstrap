import { IsIn } from 'class-validator'
import { decorate } from 'ts-mixer'

export class CaptchaTypeDto {
  /** 验证码类型 */
  @decorate(IsIn(['register', 'login']))
  captchaType!: 'register' | 'login'
}
