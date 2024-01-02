import { IRequest } from 'itty-router'

export class Res {
  status?: number
  data?: any
  successMsgs?: ResMsg
  infoMsgs?: ResMsg
  warningMsgs?: ResMsg
  errorMsgs?: ResMsg

  constructor(resData: ResSchema) {
    this.status = resData.status || 200
    this.data = resData.data
    this.successMsgs = resData.successMsgs
    this.infoMsgs = resData.infoMsgs
    this.warningMsgs = resData.warningMsgs
    this.errorMsgs = resData.errorMsgs
  }
}

/** 响应中间件 */
export const responseMiddleware = async (req: IRequest) => {
  // @ts-ignore
  req.$res = res => {
    throw new Res(Object.assign({ status: 200 } as ResSchema, res))
  }
  const $t = req.$t
  const getMsgList = (msg: ResMsg) => {
    const msgList = typeof msg === 'string' ? [msg] : msg
    return msgList.map(msg => $t(msg))
  }
  req.$res.return = data => req.$res({ data })
  req.$res.success = msg => req.$res({ successMsgs: getMsgList(msg) })
  req.$res.info = msg => req.$res({ infoMsgs: getMsgList(msg) })
  req.$res.warning = msg => req.$res({ warningMsgs: getMsgList(msg) })
  req.$res.error = msg => req.$res({ status: 400, errorMsgs: getMsgList(msg) })
}
