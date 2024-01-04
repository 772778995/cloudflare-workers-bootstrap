import { Length } from 'class-validator'
import { decorate } from 'ts-mixer'

export class UserPsdDto {
  /** 密码 */
  @decorate(Length(6, 32, { message: '请输入6-32位字符的密码' }))
  psd!: string
}
