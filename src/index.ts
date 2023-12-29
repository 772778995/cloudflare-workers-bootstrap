import { Res } from './middleware/response.middleware'
import routes from './routes'
import { json, error } from 'itty-router'

export default {
  fetch: (req: Request, env: Env, ctx: ExecutionContext): Promise<Response> =>
    routes
      .handle(req, env, ctx)
      .then(json)
      .catch(res => {
        if (res instanceof Res) return json(res)
        const err: Error = res
        const errorMsg = `${err.name}: ${err.message}`
        return json({ status: 500, errorMsg })
      })
}
