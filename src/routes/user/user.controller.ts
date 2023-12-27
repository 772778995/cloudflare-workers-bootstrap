import { Router } from 'itty-router'
import { CreateUserDto, UserDto } from './user.dto'
import { validation } from '@/utils/validation'
import { findAll, findOne, create } from './user.service'

export default Router({ base: '/api/user' })
  .get('/', () => {
    return findAll()
  })

  .get('/:id', async ({ query }) => {
    const user = await validation(UserDto, query)
    return findOne(user)
  })

  .post('/', async ({ body }) => {
    const createUserDto = await validation(CreateUserDto, body)
    return create(createUserDto)
  })
