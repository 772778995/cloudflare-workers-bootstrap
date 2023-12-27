import { CreateUserDto, UserDto } from './user.dto'

export const create = (createUserDto: CreateUserDto) => {
  return createUserDto
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
