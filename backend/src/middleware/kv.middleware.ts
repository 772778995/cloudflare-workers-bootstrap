import { IRequest } from 'itty-router'

/** 键值存储中间件 */
export const kvMiddleware: any = async (req: IRequest, env: Env) => {
  req.$kv = env.KV
}
