import { IsEmail } from 'class-validator'
import { decorate } from 'ts-mixer'

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
