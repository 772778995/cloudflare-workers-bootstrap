import { Router } from 'itty-router'
import { CreateUserDto, UserDto } from './user.dto'
import { findAll, findOne, create } from './user.service'

export default Router({ base: '/api/user' })
  .get('/', () => {
    return findAll()
  })

  .get('/:id', async ({ $v }) => {
    const user = await $v.query(UserDto)
    return findOne(user)
  })

  .post('/', async ({ $v }) => {
    const createUserDto = $v.body(CreateUserDto)
    return createUserDto
  })
