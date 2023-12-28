import { Router } from 'itty-router'
import { CreateUserDto, UserDto } from './user.dto'
import { findAll, findOne, create } from './user.service'

export default Router({ base: '/api/user' })
  .get('/', () => {
    return findAll()
  })

  .get('/:id', async ({ $v, query }) => {
    const user = await $v(UserDto, query)
    return findOne(user)
  })

  .post('/', async ({ $v, body }) => {
    const createUserDto = await $v(CreateUserDto, body)
    return create(createUserDto)
  })
