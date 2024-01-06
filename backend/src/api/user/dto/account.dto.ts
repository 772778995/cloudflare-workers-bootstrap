import { Validate, isEmail, isMobilePhone } from 'class-validator'
import { decorate } from 'ts-mixer'

export class AccountDto {
  /** 账号：邮箱或手机号码 */
  @decorate(Validate(v => isEmail(v) && isMobilePhone(v, 'zh-CN'), { message: '请输入有效的账号' }))
  account!: string
}
