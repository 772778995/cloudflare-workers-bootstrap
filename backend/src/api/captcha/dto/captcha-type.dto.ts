import { IsEnum } from 'class-validator'

export enum CaptchaTypeEnum {
  /** 注册 */
  REGISTER = 'REGISTER',
  /** 找回密码 */
  FORGET_PASSWORD = 'FORGET_PASSWORD',
  /** 重置密码 */
  RESET_PASSWORD = 'RESET_PASSWORD'
}

export class CaptchaTypeDto {
  /** 验证码类型 */
  @IsEnum(CaptchaTypeEnum)
  captchaType: CaptchaTypeEnum
}
