import { Router } from 'itty-router'
import { sendEmailCaptcha } from './captcha.service'

export default Router({ base: '/api/captcha' })
  //
  .post('/email', sendEmailCaptcha)
