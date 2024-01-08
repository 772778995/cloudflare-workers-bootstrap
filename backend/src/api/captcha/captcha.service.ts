import { IRequest } from 'itty-router'
import { getUserByEmail } from '../user/user.service'
import random from 'lodash/random'
import { SendEmailCaptchaDto } from './dto/send-email-captcha.dto'
import { sendMail } from '~/utils/mailer'

/** 发送邮件验证码 */
export const sendEmailCaptcha = async (req: IRequest) => {
  const { $v, $t, $res } = req
  const { email, captchaType } = await $v.body(SendEmailCaptchaDto)

  /** 检查邮箱是否存在 */
  const isExistUser = await getUserByEmail(req, email)

  // 发送注册验证码
  if (captchaType === CaptchaTypeEnum.Register) {
    if (isExistUser) $res.error('已存在的邮箱')
    const captcha = random(100000, 999999).toString()
    const text =
      $t(
        '尊敬的用户您正在进行注册操作，以下验证码在十分钟内有效，如不是您本人操作，请忽略。验证码：'
      ) + captcha
    await sendMail({ to: email, text })
    return $res.success('已发送邮箱验证码，请注意查收')
  }
}
