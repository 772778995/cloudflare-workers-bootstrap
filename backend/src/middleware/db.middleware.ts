import { IRequest } from 'itty-router'
import { drizzle } from 'drizzle-orm/d1'

/** 数据库中间件 */
export const dbMiddleware: any = async (req: IRequest, env: Env) => {
  req.$db = drizzle(env.DB)
}
