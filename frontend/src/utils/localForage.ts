import { getLocalForage } from 'can-can-word-bug'
import { ApiDetails } from '../typings/apis'

/** 用户信息 */
export type UserInfo =
  ApiDetails['post']['/login/email/psd']['response']['data']['userInfo']

export default getLocalForage<{
  /** 上一次发送邮件验证码时间戳 */
  lastSendEmailCodeTime: number
  /** 用户信息 */
  userInfo: UserInfo
}>()

