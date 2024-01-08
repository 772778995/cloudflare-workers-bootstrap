import { Obj } from './common'

export type DevBaseURL = 'http://127.0.0.1:8787'
export type ProdBaseURL = 'https://api.example.com'
export type BaseURL = ProdBaseURL | DevBaseURL

export type ApiSchema = {
  /** url 参数 */
  query?: Obj
  /** 表单数据 */
  body?: Obj
  /** 响应数据 */
  response?: Obj
}

export interface Get {}
export interface Post {}
export interface Put {}
export interface Delete {}
export interface Patch {}
export interface Head {}
export interface Options {}
export interface Trace {}
export interface Connect {}

export type Urls = {
  get: keyof Get
  post: keyof Post
  put: keyof Put
  delete: keyof Delete
  patch: keyof Patch
  head: keyof Head
  options: keyof Options
  trace: keyof Trace
  connect: keyof Connect
  all: Urls[Exclude<keyof Urls, 'all'>]
}

type GetBaseRouterUrl<U extends string> = U extends `/${infer P1}/${infer P2}`
  ? P2 extends `${string}/${string}`
    ? `/${P1}${GetBaseRouterUrl<`/${P2}`>}` | GetBaseRouterUrl<`/${P1}`>
    : GetBaseRouterUrl<`/${P1}`> | U
  : U

/** 基础路由路径 */
export type BaseRouterUrl = GetBaseRouterUrl<Urls['all']> | ''

export interface Api {
  /**
   * - 用于从服务器获取资源。
   * - 没有请求主体，所有的数据都附加在 URL 中。
   * - 对服务器的操作是幂等的，多次相同的 GET 请求应该返回相同的结果。
   */
  get: Get

  /**
   * - 用于向服务器提交数据，通常用于创建新资源。
   * - 请求主体包含要提交的数据。
   * - 对服务器的操作不是幂等的，即多次相同的 POST 请求可能会导致不同的结果
   */
  post: Post

  /**
   * - 用于向服务器更新或创建资源。
   * - 请求主体包含要更新的数据。
   * - 对服务器的操作是幂等的，即多次相同的 PUT 请求应该具有相同的结果。
   */
  put: Put

  /**
   * - 用于请求服务器删除指定的资源。
   * - 请求通常不包含主体，因为被删除的资源信息在 URL 中指定。
   * - 对服务器的操作是幂等的。
   */
  delete: Delete

  /**
   * - 用于对资源进行部分更新。
   * - 请求主体包含要应用于资源的部分更新。
   * - 对服务器的操作通常不是幂等的。
   */
  patch: Patch

  /**
   * - 类似于 GET 请求，但不返回实际的数据主体，只返回响应头信息。
   * - 主要用于检查资源的元信息，如最后修改时间。
   */
  head: Head

  /**
   * - 用于请求关于目标资源的信息，或者关于服务器的其他可用选项的信息。
   * - 通常在 CORS（跨域资源共享）中使用。
   */
  options: Options

  /**
   * - 用于在目标资源的路径上执行一个消息环回测试。
   * - 主要用于调试或诊断。
   */
  trace: Trace

  /**
   * - 用于建立与目标资源的隧道连接，通常在代理服务器上使用。
   */
  connect: Connect
}
