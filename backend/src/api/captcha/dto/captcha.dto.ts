import { IsNumberString, Length } from 'class-validator'
import { decorate } from 'ts-mixer'

export class CaptchaDto {
  /** 验证码 */
  @decorate(IsNumberString({}, { message: '请输入有效的验证码' }))
  @decorate(Length(6, 6, { message: '请输入6位数字的验证码' }))
  captcha!: string
}
