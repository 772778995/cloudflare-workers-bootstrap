import { IRequest } from 'itty-router'

export class Res {
  status?: number
  data?: any
  successMsg?: string
  infoMsg?: string
  warningMsg?: string
  errorMsg?: string

  constructor(resData: ResSchema) {
    this.status = resData.status || 200
    this.data = resData.data
    this.successMsg = resData.successMsg
    this.infoMsg = resData.infoMsg
    this.warningMsg = resData.warningMsg
    this.errorMsg = resData.errorMsg
  }
}

/** 响应中间件 */
export const responseMiddleware = async (req: IRequest) => {
  // @ts-ignore
  req.$res = res => {
    throw new Res(Object.assign({ status: 200 } as ResSchema, res))
  }
  const $t = req.$t
  req.$res.return = data => req.$res({ data })
  req.$res.success = msg => req.$res({ successMsg: $t(msg) })
  req.$res.info = msg => req.$res({ infoMsg: $t(msg) })
  req.$res.warning = msg => req.$res({ warningMsg: $t(msg) })
  req.$res.error = msg => req.$res({ status: 400, errorMsg: $t(msg) })
}
