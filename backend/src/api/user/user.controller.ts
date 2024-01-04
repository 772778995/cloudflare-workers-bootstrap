import { Router } from 'itty-router'
import { createUser, findAll, findOne } from './user.service'
import { UserDto } from './dto/user.dto'

export default Router({ base: '/api/user' })
  .get('/', () => {
    return findAll()
  })

  .get('/:id', async ({ $v }) => {
    const user = await $v.query(UserDto)
    return findOne(user)
  })

  .post('/', createUser)
