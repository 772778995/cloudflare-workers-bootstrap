type ResMsg = string | string[]

type ResSchema<D = any> = {
  /**
   * 响应状态码
   * @default 200 // success
   * @default 400 // error
   */
  status?: number
  /** 响应数据 */
  data?: D
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
  <R extends ResSchema>(res: R): R['data']
  return: <D extends any>(data: D) => ResSchema<D>
  success: (data: ResMsg) => ResSchema<void>
  info: (data: ResMsg) => ResSchema<void>
  warning: (data: ResMsg) => ResSchema<void>
  error: (data: ResMsg) => ResSchema<void>
}
