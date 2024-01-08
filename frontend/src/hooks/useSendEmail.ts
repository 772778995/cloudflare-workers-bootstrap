import localForage from '../utils/localForage'
import api from '../api'
import useRequest from './useRequest'
import { SendEmailCaptchaDto } from '~/api/captcha/dto/send-email-captcha.dto'

export enum EmailCodeType {
  Register,
  Login
}

const useSendEmail = () => {
  const lastSendEmailCodeTime = ref(0)
  onMounted(async () => {
    const lastSendEmailCodeTimeStorage = await localForage.getItem(
      'lastSendEmailCodeTime'
    )
    if (!lastSendEmailCodeTimeStorage) return
    lastSendEmailCodeTime.value = lastSendEmailCodeTimeStorage
    const diffTime = lastSendEmailCodeTime.value + 60000 - Date.now()
    if (diffTime <= 0) return
    leftSeconds.value = Math.ceil(diffTime / 1000)
  })

  const leftSeconds = ref(0)
  const countDown = () =>
    setTimeout(() => {
      if (leftSeconds.value <= 0) return
      leftSeconds.value -= 1
      countDown()
    }, 1000)

  watch(lastSendEmailCodeTime, countDown)

  const [sendEmailCode, isSendEmailCodeLoading] = useRequest(
    async (body: SendEmailCaptchaDto) => {
      await api.post('/api/captcha/email', body)
      lastSendEmailCodeTime.value = Date.now()
      localForage.setItem('lastSendEmailCodeTime', lastSendEmailCodeTime.value)
      leftSeconds.value = 60
    }
  )

  return {
    leftSeconds,
    sendEmailCode,
    isSendEmailCodeLoading
  }
}

export default useSendEmail

