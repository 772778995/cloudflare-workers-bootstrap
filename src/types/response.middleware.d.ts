type ResMsg = string | string[]

type ResSchema = {
  /** 响应状态码 */
  status?: number
  /** 响应数据 */
  data?: any
  /** 成功消息 */
  successMsgs?: ResMsg
  /** 默认消息 */
  infoMsgs?: ResMsg
  /** 警告消息 */
  warningMsgs?: ResMsg
  /** 错误消息 */
  errorMsgs?: ResMsg
}

type ResponseFn = {
  (data: ResSchema): ResSchema
  return: (data) => ResSchema
  success: (data: ResMsg) => ResSchema
  info: (data: ResMsg) => ResSchema
  warning: (data: ResMsg) => ResSchema
  error: (data: ResMsg) => ResSchema
}
