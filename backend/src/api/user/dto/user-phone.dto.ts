import { decorate } from 'ts-mixer'
import { IsMobilePhone } from 'class-validator'

export class UserPhoneDto {
  /** 手机号码 */
  @decorate(IsMobilePhone('zh-CN', {}, { message: '请输入有效的手机号码' }))
  phone!: string
}
