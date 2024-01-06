import { Router } from 'itty-router'
import { createUser, loginByPsd } from './user.service'

export default Router({ base: '/api/user' })
  // 注册
  .post('/register', createUser)
  // 密码登录
  .post('/login-psd', loginByPsd)
