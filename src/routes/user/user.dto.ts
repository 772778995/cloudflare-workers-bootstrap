import { Mixin, decorate } from 'ts-mixer'
import { IsMobilePhone, IsNumberString, Length } from 'class-validator'

export class UserPhoneDto {
  /** 手机号码 */
  @decorate(IsMobilePhone('zh-CN', {}, { message: '请输入有效的手机号码' }))
  phone!: string
}

export class UserPsdDto {
  /** 密码 */
  @decorate(Length(6, 32, { message: '请输入6-32位字符的密码' }))
  psd!: string
}

export class CaptchaDto {
  /** 验证码 */
  @decorate(IsNumberString({}, { message: '请输入有效的验证码' }))
  @decorate(Length(6, 6, { message: '请输入6位数字的验证码' }))
  captcha!: string
}

export class UserDto extends Mixin(UserPhoneDto, UserPsdDto) {}
export class CreateUserDto extends Mixin(UserDto, CaptchaDto) {}
