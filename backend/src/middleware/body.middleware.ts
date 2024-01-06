import { IRequest } from 'itty-router'

/** 表单中间件 */
export const bodyMiddleware = async (req: IRequest) => {
  let body: any = null
  req.$body = async () => {
    const contentType = req.headers.get('content-type')
    if (!body) {
      // json 数据
      if (contentType?.includes('application/json')) {
        body = await req.json()
        // 表单数据
      } else if (
        contentType?.includes('application/x-www-form-urlencoded') ||
        contentType?.includes('multipart/form-data')
      ) {
        body = await req.formData()
      }
    }
    return body || {}
  }
}
