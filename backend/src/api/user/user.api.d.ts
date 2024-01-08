import { GetApiResponse, GetApiSchema } from '~/types/common'
import { CreateUserDto } from './dto/create-user.dto'
import { createUser } from './user.service'

declare module '~/types/apis' {
  interface Post {
    '/api/user/register': GetApiSchema<{
      body: CreateUserDto
      response: GetApiResponse<typeof createUser>
    }>

    '/api/user/login-psd': {}
  }
}
