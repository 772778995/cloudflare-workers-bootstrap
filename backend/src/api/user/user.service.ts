import { IRequest } from 'itty-router'
import { userEntity } from './user.entity'
import { and, eq } from 'drizzle-orm'
import { CreateUserDto } from './dto/create-user.dto'
import { PsdLoginDto } from './dto/psd-login.dto'
import { isEmail } from 'class-validator'
import { EmailCaptchaLoginDto } from './dto/email-captcha-login.dto'

/** 通过邮箱地址获取用户信息 */
export const getUserByEmail = async ({ $db }: IRequest, email: string) => {
  const [user] = await $db().select().from(userEntity).where(eq(userEntity.email, email))
  return user
}

/** 注册用户 */
export const createUser = async (req: IRequest) => {
  const { $v, $res, $db } = req
  const { email, psd, captcha } = await $v.body(CreateUserDto)

  const isExistUser = await getUserByEmail(req, email)
  if (isExistUser) $res.error('已存在的邮箱')

  await $db().insert(userEntity).values({ email, psd })

  return $res.success('注册用户成功')
}

/** TODO 密码登录 */
export const loginByPsd = async ({ $v, $db, $res }: IRequest) => {
  const { account, psd } = await $v.body(PsdLoginDto)
  const accountType = isEmail(account) ? 'email' : 'phone'

  const [userInfo] = await $db()
    .select()
    .from(userEntity)
    .where(
      and(
        eq(userEntity[accountType], account), // 校验账号
        eq(userEntity.psd, psd) // 检验密码
      )
    )

  if (!userInfo) $res.error('账号或密码错误')
  return $res.return(userInfo)
}

// TODO
/** 邮箱验证码登录 */
export const loginByEmailCaptcha = async (req: IRequest) => {
  const { $v, $res } = req
  const { email, captcha } = await $v.body(EmailCaptchaLoginDto)
  console.log(email, captcha)

  return $res.success('登录成功')
}
