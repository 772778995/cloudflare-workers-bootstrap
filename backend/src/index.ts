import { Res } from './middleware/response.middleware'
import api from './api'
import { json } from 'itty-router'

export default {
  fetch: (req: Request, env: Env, ctx: ExecutionContext): Promise<Response> =>
    api
      .handle(req, env, ctx)
      .then(json)
      .catch(res => {
        if (res instanceof Res) return json(res)
        const err: Error = res
        const errorMsgs = `${err.name}: ${err.message}`
        console.error(err.stack)
        return json({ status: 500, errorMsgs, stack: err.stack })
      })
}
