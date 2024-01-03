import { Mixin, decorate } from 'ts-mixer'
import { IsEmail, IsMobilePhone, IsNumberString, Length } from 'class-validator'

// export class UserPhoneDto {
//   /** 手机号码 */
//   @decorate(IsMobilePhone('zh-CN', {}, { message: '请输入有效的手机号码' }))
//   phone!: string
// }

const emailDeorate = decorate(IsEmail({}, { message: '请输入有效的邮箱' }))
export class UserEmailDto {
  /** 邮箱 */
  @emailDeorate
  email!: string
}

export class UserEmailOptionalDto {
  /** 邮箱 */
  @emailDeorate
  email: string
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

export class UserDto extends Mixin(UserEmailDto, UserPsdDto) {}
export class CreateUserDto extends Mixin(UserDto, UserPsdDto, CaptchaDto) {}
export class UpdateUserDto extends Mixin(UserEmailOptionalDto, UserPsdDto) {}
