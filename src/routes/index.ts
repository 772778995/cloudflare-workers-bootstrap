import { Router, error } from 'itty-router'
import userController from './user/user.controller'
import aiController from './ai/ai.controller'
import { i18nMiddleware } from '@/middleware/i18n.middleware'
import { validationMiddleware } from '@/middleware/valid.middleware'
import { responseMiddleware } from '@/middleware/response.middleware'

const apiController = Router({ base: '/api' })
  .all('/user/*', userController.handle)
  .all('/ai/*', aiController.handle)

export default Router()
  .all('*', i18nMiddleware, responseMiddleware, validationMiddleware)
  .all('/api/*', apiController.handle)
  .all('*', () => error(404))
