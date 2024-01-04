import { Router } from 'itty-router'
import { UserDto } from './user.dto'
import { createUser, findAll, findOne } from './user.service'

export default Router({ base: '/api/user' })
  .get('/', () => {
    return findAll()
  })

  .get('/:id', async ({ $v }) => {
    const user = await $v.query(UserDto)
    return findOne(user)
  })

  .post('/', createUser)
