import { Router } from 'itty-router'
import captchaController from './captcha/captcha.controller'
import userController from './user/user.controller'
import aiController from './ai/ai.controller'
import { i18nMiddleware } from '@/middleware/i18n.middleware'
import { validationMiddleware } from '@/middleware/valid.middleware'
import { responseMiddleware } from '@/middleware/response.middleware'
import { dbMiddleware } from '@/middleware/db.middleware'
import { kvMiddleware } from '@/middleware/kv.middleware'
import { bodyMiddleware } from '@/middleware/body.middleware'

const apiController = Router({ base: '/api' })
  .all('/captcha/*', captchaController.handle)
  .all('/user/*', userController.handle)
  .all('/ai/*', aiController.handle)

export default Router()
  // 中间件
  .all(
    '*',
    i18nMiddleware,
    bodyMiddleware,
    responseMiddleware,
    validationMiddleware,
    kvMiddleware,
    dbMiddleware
  )

  // 业务逻辑
  .all('/api/*', apiController.handle)

  // 404
  .all('*', ({ $res, $t }) => $res({ status: 404, errorMsgs: $t('资源不存在或已删除') }))
