import { IRequest } from 'itty-router'
import { userEntity } from './user.entity'
import { eq } from 'drizzle-orm'
import { CreateUserDto } from './dto/create-user.dto'
import { UserDto } from './dto/user.dto'

/** 通过邮箱地址获取用户信息 */
export const getUserByEmail = async ({ $db }: IRequest, email: string) => {
  const [user] = await $db.select().from(userEntity).where(eq(userEntity.email, email))
  return user
}

/** 注册用户 */
export const createUser = async (req: IRequest) => {
  const { $v, $res, $db } = req
  const { email, psd, captcha } = await $v.body(CreateUserDto)

  const isExistUser = await getUserByEmail(req, email)
  if (isExistUser) $res.error('已存在的邮箱')

  await $db.insert(userEntity).values({ email, psd })

  return $res.success('注册用户成功')
}

export const findOne = (user: UserDto) => {
  return user
}

export const findAll = () => {
  return [{ xxx: '1234' }, { xxx: '1234' }, { xxx: '1234' }, { xxx: '1234' }]
}

export const update = () => {
  return { xxx: '1234' }
}

export const remove = () => {
  return { xxx: '1234' }
}
