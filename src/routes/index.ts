import { Router, error } from 'itty-router'
import userController from './user/user.controller'
import aiController from './ai/ai.controller'

const apiController = Router({ base: '/api' })
  .all('/user/*', userController.handle)
  .all('/ai/*', aiController.handle)

export default Router()
  .all('/api/*', apiController.handle)
  .all('*', () => error(404))
