import api from '@/src/api'
import useRequest from '@/src/hooks/useRequest'
import useSendEmail from '@/src/hooks/useSendEmail'
import localForage from '@/src/utils/localForage'
import { QInput } from 'quasar'
import { EmailCaptchaLoginDto } from '~/api/user/dto/email-captcha-login.dto'

type Props = {
  emailInputRef: Ref<QInput>
}
export default (props: Props) => {
  const { emailInputRef } = props
  const router = useRouter()

  const loginForm = ref<EmailCaptchaLoginDto>({
    email: '6666@5i996.icu',
    captcha: '666666'
  })

  const { leftSeconds, sendEmailCode, isSendEmailCodeLoading } = useSendEmail()
  const sendEmailCodeHandler = async () => {
    const isPass = await emailInputRef.value.validate()
    if (!isPass) return
    sendEmailCode({
      captchaType: 'login',
      email: loginForm.value.email
    })
  }

  const [login, isLoginLoading] = useRequest(() =>
    api.post('/api/user/login-email-captcha', loginForm.value)
  )

  const loginHandler = async () => {
    const { token, userInfo } = (await login()) as any
    localStorage.setItem('token', token) // token 存在 localStorage，因为新页面 localForage 异步获取 token 有问题
    await localForage.setItem('userInfo', userInfo)
    router.replace({ name: '首页' })
  }

  return {
    leftSeconds,
    sendEmailCodeHandler,
    isSendEmailCodeLoading,

    loginForm,
    isLoginLoading,
    loginHandler
  }
}

