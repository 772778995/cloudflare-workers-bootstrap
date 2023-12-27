import routes from './routes'
import { json, error } from 'itty-router'

export default {
  fetch: (req: Request, env: Env, ctx: ExecutionContext): Promise<Response> =>
    routes.handle(req, env, ctx).then(json).catch(error)
}
