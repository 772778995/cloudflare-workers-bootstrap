import { BaseRouterUrl, Urls } from '~/types/apis'

export type GenericTraps = {
  [key: string]: any
}
export type RequestLike = {
  method: string
  url: string
} & GenericTraps
export type IRequestStrict = {
  method: string
  url: string
  route: string
  params: {
    [key: string]: string
  }
  query: {
    [key: string]: string | string[] | undefined
  }
  proxy?: any
} & Request
export type IRequest = IRequestStrict & GenericTraps
export type RouterOptions<BasePath = BaseRouterUrl> = {
  base?: BasePath
  routes?: RouteEntry[]
}
export type RouteHandler<I = IRequest, A extends any[] = any[]> = {
  (request: I, ...args: A): any
}
export type RouteEntry = [string, RegExp, RouteHandler[], string]
export type Route<
  Method extends keyof Urls,
  Path extends Urls[Method],
  BasePath extends BaseRouterUrl
> = <
  RequestType = IRequest,
  Args extends any[] = any[],
  RT = RouterType<Route<'all', Urls['all'], BaseRouterUrl>, any[], BasePath>
>(
  path: GetMatchPath<BasePath, Path> | `${string}*${string}`,
  ...handlers: RouteHandler<RequestType, Args>[]
) => RT
export type UniversalRoute<RequestType = IRequest, Args extends any[] = any[]> = (
  path: string,
  ...handlers: RouteHandler<RequestType, Args>[]
) => RouterType<UniversalRoute<RequestType, Args>, Args>
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false
export type CustomRoutes<R = Route<'all', Urls['all'], BaseRouterUrl>> = {
  [key: string]: R
}
export type RouterType<
  R = Route<'all', Urls['all'], BaseRouterUrl>,
  Args extends any[] = any[],
  Base extends BaseRouterUrl = ''
> = {
  __proto__: RouterType<R, Args, Base>
  routes: RouteEntry[]
  handle: <A extends any[] = Args>(
    request: RequestLike,
    ...extra: Equal<R, Args> extends true ? A : Args
  ) => Promise<any>
  all: Route<'all', Urls['all'], Base>
  delete: Route<'delete', Urls['delete'], Base>
  get: Route<'get', Urls['get'], Base>
  head: Route<'head', Urls['head'], Base>
  options: Route<'options', Urls['options'], Base>
  patch: Route<'patch', Urls['patch'], Base>
  post: Route<'post', Urls['post'], Base>
  put: Route<'put', Urls['put'], Base>
} & CustomRoutes<R>
export declare const Router: <
  BasePath extends BaseRouterUrl,
  RequestType = IRequest,
  Args extends any[] = any[],
  RouteType = Equal<RequestType, IRequest> extends true
    ? Route<'all', Urls['all'], BaseRouterUrl>
    : UniversalRoute<RequestType, Args>
>({
  base,
  routes
}?: RouterOptions<BasePath>) => RouterType<RouteType, Args, BasePath>

export interface ResponseFormatter {
  (body?: any, options?: ResponseInit): Response
}
export interface BodyTransformer {
  (body: any): string
}

export {}

type GetMatchPath<
  BasePath extends BaseRouterUrl | '',
  FullPath extends Urls['all']
> = FullPath extends `${BasePath}${infer RelativePath}` ? RelativePath : never
