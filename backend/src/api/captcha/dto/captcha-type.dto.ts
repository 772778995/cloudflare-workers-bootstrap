import { IsIn } from 'class-validator'

export class CaptchaTypeDto {
  /** 验证码类型 */
  @IsIn(['register', 'login'])
  captchaType!: string
}
