type ResSchema = {
  /** 响应状态码 */
  status?: number
  /** 响应数据 */
  data?: any
  /** 成功消息 */
  successMsg?: string
  /** 默认消息 */
  infoMsg?: string
  /** 警告消息 */
  warningMsg?: string
  /** 错误消息 */
  errorMsg?: string
}

type ResponseFn = {
  (data: ResSchema): ResSchema
  return: (data) => ResSchema
  success: (data: string) => ResSchema
  info: (data: string) => ResSchema
  warning: (data: string) => ResSchema
  error: (data: string) => ResSchema
}
