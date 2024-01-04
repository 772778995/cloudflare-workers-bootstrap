import { IRequest } from 'itty-router'
import { getUserByEmail } from '../user/user.service'
import random from 'lodash/random'
import { SendEmailCaptchaDto } from './dto/send-email-captcha.dto'
import { CaptchaTypeEnum } from './dto/captcha-type.dto'

/** 发送邮件验证码 */
export const sendEmailCaptcha = async (req: IRequest) => {
  const { $v, $res } = req
  const { email, captchaType } = await $v.body(SendEmailCaptchaDto)

  /** 检查邮箱是否存在 */
  const isExistUser = await getUserByEmail(req, email)

  // 发送注册验证码
  if (captchaType === CaptchaTypeEnum.REGISTER) {
    if (isExistUser) $res.error('已存在的邮箱')
    const captcha = random(100000, 999999).toString()
    return captcha
  }
}
