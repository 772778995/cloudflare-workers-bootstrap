import api from '@/src/api'
import useRequest from '@/src/hooks/useRequest'
import useSendEmail, { EmailCodeType } from '@/src/hooks/useSendEmail'
import { ApiDetails } from '@/src/typings/apis'
import localForage from '@/src/utils/localForage'
import { QInput } from 'quasar'

/** 登录表单 */
type LoginForm = //
  ApiDetails['post']['/login/email/code']['data'] &
    ApiDetails['post']['/login/email/psd']['data'] &
    ApiDetails['post']['/login/phone/psd']['data'] &
    ApiDetails['post']['/login/phone/code']['data']

type Props = {
  emailInputRef: Ref<QInput>
}
// TODO 邮箱密码登录
// TODO 手机号短信验证码登录
// TODO 手机号密码登录
export default (props: Props) => {
  const { emailInputRef } = props
  const router = useRouter()

  const loginType: Ref<['email' | 'phone', 'psd' | 'emailCode' | 'smsCode']> = ref([
    'email',
    'psd'
  ])

  const loginForm: Ref<LoginForm> = ref({
    phone: '13777777777',
    smsCode: '000000',
    email: '772778995@qq.com',
    emailCode: '000000',
    psd: '123456'
  })

  const { leftSeconds, sendEmailCode, isSendEmailCodeLoading } = useSendEmail()
  const sendEmailCodeHandler = async () => {
    const isPass = await emailInputRef.value.validate()
    if (!isPass) return
    sendEmailCode(loginForm.value.email, EmailCodeType.Login)
  }

  const [login, isLoginLoading] = useRequest(() =>
    api.post('/login/email/code', loginForm.value)
  )

  const loginHandler = async () => {
    const { token, userInfo } = await login()
    localStorage.setItem('token', token) // token 存在 localStorage，因为新页面 localForage 异步获取 token 有问题
    await localForage.setItem('userInfo', userInfo)
    router.replace({ name: '首页' })
  }

  return {
    loginType,

    leftSeconds,
    sendEmailCodeHandler,
    isSendEmailCodeLoading,

    loginForm,
    isLoginLoading,
    loginHandler
  }
}

