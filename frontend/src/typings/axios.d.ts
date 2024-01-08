/* eslint-disable */
// @ts-nocheck
// TypeScript Version: 4.1
import { Urls, Api, BaseURL } from '~/types/apis'
type AxiosHeaderValue = AxiosHeaders | string | string[] | number | boolean | null
type RawAxiosHeaders = Record<string, AxiosHeaderValue>

type MethodsHeaders = {
  [Key in Method as Lowercase<Key>]: AxiosHeaders
}

interface CommonHeaders {
  common: AxiosHeaders
}

type AxiosHeaderMatcher = (
  this: AxiosHeaders,
  value: string,
  name: string,
  headers: RawAxiosHeaders
) => boolean

type AxiosHeaderSetter = (
  value: AxiosHeaderValue,
  rewrite?: boolean | AxiosHeaderMatcher
) => AxiosHeaders

type AxiosHeaderGetter =
  | ((parser?: RegExp) => RegExpExecArray | null)
  | ((matcher?: AxiosHeaderMatcher) => AxiosHeaderValue)

type AxiosHeaderTester = (matcher?: AxiosHeaderMatcher) => boolean

export class AxiosHeaders {
  constructor(
    headers?: RawAxiosHeaders | AxiosHeaders,
    defaultHeaders?: RawAxiosHeaders | AxiosHeaders
  )

  set(
    headerName?: string,
    value?: AxiosHeaderValue,
    rewrite?: boolean | AxiosHeaderMatcher
  ): AxiosHeaders
  set(headers?: RawAxiosHeaders | AxiosHeaders, rewrite?: boolean): AxiosHeaders

  get(headerName: string, parser: RegExp): RegExpExecArray | null
  get(headerName: string, matcher?: true | AxiosHeaderMatcher): AxiosHeaderValue

  has(header: string, matcher?: true | AxiosHeaderMatcher): boolean

  delete(header: string | string[], matcher?: AxiosHeaderMatcher): boolean

  clear(): boolean

  normalize(format: boolean): AxiosHeaders

  toJSON(asStrings?: boolean): RawAxiosHeaders

  static from(thing?: AxiosHeaders | RawAxiosHeaders | string): AxiosHeaders

  static accessor(header: string | string[]): AxiosHeaders

  setContentType: AxiosHeaderSetter
  getContentType: AxiosHeaderGetter
  hasContentType: AxiosHeaderTester

  setContentLength: AxiosHeaderSetter
  getContentLength: AxiosHeaderGetter
  hasContentLength: AxiosHeaderTester

  setAccept: AxiosHeaderSetter
  getAccept: AxiosHeaderGetter
  hasAccept: AxiosHeaderTester

  setUserAgent: AxiosHeaderSetter
  getUserAgent: AxiosHeaderGetter
  hasUserAgent: AxiosHeaderTester

  setContentEncoding: AxiosHeaderSetter
  getContentEncoding: AxiosHeaderGetter
  hasContentEncoding: AxiosHeaderTester
}

export type RawAxiosRequestHeaders = Partial<
  RawAxiosHeaders & MethodsHeaders & CommonHeaders
>

export type AxiosRequestHeaders = Partial<
  RawAxiosHeaders & MethodsHeaders & CommonHeaders
> &
  AxiosHeaders

export type RawAxiosResponseHeaders = Partial<
  Record<string, string> & {
    'set-cookie'?: string[]
  }
>

export type AxiosResponseHeaders = RawAxiosResponseHeaders & AxiosHeaders

export interface AxiosRequestTransformer {
  (this: AxiosRequestConfig, data: any, headers: AxiosRequestHeaders): any
}

export interface AxiosResponseTransformer {
  (
    this: AxiosRequestConfig,
    data: any,
    headers: AxiosResponseHeaders,
    status?: number
  ): any
}

export interface AxiosAdapter {
  (config: AxiosRequestConfig): AxiosPromise
}

export interface AxiosBasicCredentials {
  username: string
  password: string
}

export interface AxiosProxyConfig {
  host: string
  port: number
  auth?: {
    username: string
    password: string
  }
  protocol?: string
}

export enum HttpStatusCode {
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  EarlyHints = 103,
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  ImUsed = 226,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  Unused = 306,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  PayloadTooLarge = 413,
  UriTooLong = 414,
  UnsupportedMediaType = 415,
  RangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  ImATeapot = 418,
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  TooEarly = 425,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511
}

export type Method = keyof (keyof Apitails)

export type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream'

export type responseEncoding =
  | 'ascii'
  | 'ASCII'
  | 'ansi'
  | 'ANSI'
  | 'binary'
  | 'BINARY'
  | 'base64'
  | 'BASE64'
  | 'base64url'
  | 'BASE64URL'
  | 'hex'
  | 'HEX'
  | 'latin1'
  | 'LATIN1'
  | 'ucs-2'
  | 'UCS-2'
  | 'ucs2'
  | 'UCS2'
  | 'utf-8'
  | 'UTF-8'
  | 'utf8'
  | 'UTF8'
  | 'utf16le'
  | 'UTF16LE'

export interface TransitionalOptions {
  silentJSONParsing?: boolean
  forcedJSONParsing?: boolean
  clarifyTimeoutError?: boolean
}

export interface GenericAbortSignal {
  readonly aborted: boolean
  onabort?: ((...args: any) => any) | null
  addEventListener?: (...args: any) => any
  removeEventListener?: (...args: any) => any
}

export interface FormDataVisitorHelpers {
  defaultVisitor: SerializerVisitor
  convertValue: (value: any) => any
  isVisitable: (value: any) => boolean
}

export interface SerializerVisitor {
  (
    this: GenericFormData,
    value: any,
    key: string | number,
    path: null | Array<string | number>,
    helpers: FormDataVisitorHelpers
  ): boolean
}

export interface SerializerOptions {
  visitor?: SerializerVisitor
  dots?: boolean
  metaTokens?: boolean
  indexes?: boolean | null
}

export type FormSerializerOptions = SerializerOptions

export interface ParamEncoder {
  (value: any, defaultEncoder: (value: any) => any): any
}

export interface CustomParamsSerializer {
  (params: Record<string, any>, options?: ParamsSerializerOptions): string
}

export interface ParamsSerializerOptions extends SerializerOptions {
  encode?: ParamEncoder
  serialize?: CustomParamsSerializer
}

type MaxUploadRate = number

type MaxDownloadRate = number

export interface AxiosProgressEvent {
  loaded: number
  total?: number
  progress?: number
  bytes: number
  rate?: number
  estimated?: number
  upload?: boolean
  download?: boolean
}

type Milliseconds = number

export interface AxiosRequestConfig<
  D = any,
  U = Urls['all'],
  M = keyof Api,
  P = Api[M][U]['params'],
  C =
    | 'application/json'
    | 'multipart/form-data'
    | 'application/x-www-form-urlencoded'
    | 'none'
> {
  url?: U
  method?: M | Uppercase<M>
  baseURL?: BaseURL
  transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[]
  transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[]
  headers?: RawAxiosRequestHeaders & { 'Content-Type'?: C }
  params?: P
  paramsSerializer?: ParamsSerializerOptions
  data?: D
  timeout?: Milliseconds
  timeoutErrorMessage?: string
  withCredentials?: boolean
  adapter?: AxiosAdapter
  auth?: AxiosBasicCredentials
  responseType?: ResponseType
  responseEncoding?: responseEncoding | string
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
  maxContentLength?: number
  validateStatus?: ((status: number) => boolean) | null
  maxBodyLength?: number
  maxRedirects?: number
  maxRate?: number | [MaxUploadRate, MaxDownloadRate]
  beforeRedirect?: (
    options: Record<string, any>,
    responseDetails: { headers: Record<string, string> }
  ) => void
  socketPath?: string | null
  httpAgent?: any
  httpsAgent?: any
  proxy?: AxiosProxyConfig | false
  cancelToken?: CancelToken
  decompress?: boolean
  transitional?: TransitionalOptions
  signal?: GenericAbortSignal
  insecureHTTPParser?: boolean
  env?: {
    FormData?: new (...args: any[]) => object
  }
  formSerializer?: FormSerializerOptions
}

export interface HeadersDefaults {
  common: RawAxiosRequestHeaders
  delete: RawAxiosRequestHeaders
  get: RawAxiosRequestHeaders
  head: RawAxiosRequestHeaders
  post: RawAxiosRequestHeaders
  put: RawAxiosRequestHeaders
  patch: RawAxiosRequestHeaders
  options?: RawAxiosRequestHeaders
  purge?: RawAxiosRequestHeaders
  link?: RawAxiosRequestHeaders
  unlink?: RawAxiosRequestHeaders
}

export interface AxiosDefaults<D = any> extends Omit<AxiosRequestConfig<D>, 'headers'> {
  headers: HeadersDefaults
}

export interface CreateAxiosDefaults<D = any>
  extends Omit<AxiosRequestConfig<D>, 'headers'> {
  headers?: RawAxiosRequestHeaders | Partial<HeadersDefaults>
}

// export interface AxiosResponse<T = any, D = any> {
//   data: T
//   status: number
//   statusText: string
//   headers: RawAxiosResponseHeaders | AxiosResponseHeaders
//   config: AxiosRequestConfig<D>
//   request?: any
// }

export class AxiosError<T = unknown, D = any> extends Error {
  constructor(
    message?: string,
    code?: string,
    config?: AxiosRequestConfig<D>,
    request?: any,
    response?: AxiosResponse<T, D>
  )

  config?: AxiosRequestConfig<D>
  code?: string
  request?: any
  response?: AxiosResponse<T, D>
  isAxiosError: boolean
  status?: number
  toJSON: () => object
  cause?: Error
  static readonly ERR_FR_TOO_MANY_REDIRECTS = 'ERR_FR_TOO_MANY_REDIRECTS'
  static readonly ERR_BAD_OPTION_VALUE = 'ERR_BAD_OPTION_VALUE'
  static readonly ERR_BAD_OPTION = 'ERR_BAD_OPTION'
  static readonly ERR_NETWORK = 'ERR_NETWORK'
  static readonly ERR_DEPRECATED = 'ERR_DEPRECATED'
  static readonly ERR_BAD_RESPONSE = 'ERR_BAD_RESPONSE'
  static readonly ERR_BAD_REQUEST = 'ERR_BAD_REQUEST'
  static readonly ERR_NOT_SUPPORT = 'ERR_NOT_SUPPORT'
  static readonly ERR_INVALID_URL = 'ERR_INVALID_URL'
  static readonly ERR_CANCELED = 'ERR_CANCELED'
  static readonly ECONNABORTED = 'ECONNABORTED'
  static readonly ETIMEDOUT = 'ETIMEDOUT'
}

export class CanceledError<T> extends AxiosError<T> {}

export type AxiosPromise<T = any> = Promise<AxiosResponse<T>>

export interface CancelStatic {
  new (message?: string): Cancel
}

export interface Cancel {
  message: string | undefined
}

export interface Canceler {
  (message?: string, config?: AxiosRequestConfig, request?: any): void
}

export interface CancelTokenStatic {
  new (executor: (cancel: Canceler) => void): CancelToken
  source(): CancelTokenSource
}

export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  throwIfRequested(): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface AxiosInterceptorOptions {
  synchronous?: boolean
  runWhen?: (config: AxiosRequestConfig) => boolean
}

export interface AxiosInterceptorManager<V> {
  use(
    onFulfilled?: (value: V) => V | Promise<V>,
    onRejected?: (error: any) => any,
    options?: AxiosInterceptorOptions
  ): number
  eject(id: number): void
  clear(): void
}

export class Axios {
  constructor(config?: AxiosRequestConfig)
  defaults: AxiosDefaults
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  getUri(config?: AxiosRequestConfig): string
  request<T = any, R = AxiosResponse<T>, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<R>
  /**
   * - 用于从服务器获取资源。
   * - 没有请求主体，所有的数据都附加在 URL 中。
   * - 对服务器的操作是幂等的，多次相同的 GET 请求应该返回相同的结果。
   */
  get<
    T extends Api['get'][U]['response'],
    R extends AxiosResponse<T>,
    U extends keyof Api['get'],
    D extends Api['get'][U]['body'],
    P extends Api['get'][U]['params'],
    C extends Api['get'][U]['contentType']
  >(url: U, config?: AxiosRequestConfig<D, U, M, P, C>): Promise<R>
  /**
   * - 用于请求服务器删除指定的资源。
   * - 请求通常不包含主体，因为被删除的资源信息在 URL 中指定。
   * - 对服务器的操作是幂等的。
   */
  delete<
    T extends Api['delete'][U]['response'],
    R extends AxiosResponse<T>,
    U extends keyof Api['delete'],
    D extends Api['delete'][U]['body'],
    P extends Api['delete'][U]['params'],
    C extends Api['delete'][U]['contentType']
  >(url: U, config?: AxiosRequestConfig<D, U, M, P, C>): Promise<R>
  /**
   * - 类似于 GET 请求，但不返回实际的数据主体，只返回响应头信息。
   * - 主要用于检查资源的元信息，如最后修改时间。
   */
  head<
    T extends Api['head'][U]['response'],
    R extends AxiosResponse<T>,
    U extends keyof Api['head'],
    D extends Api['head'][U]['body'],
    P extends Api['head'][U]['params'],
    C extends Api['head'][U]['contentType']
  >(url: U, config?: AxiosRequestConfig<D, U, M, P, C>): Promise<R>
  /**
   * - 用于请求关于目标资源的信息，或者关于服务器的其他可用选项的信息。
   * - 通常在 CORS（跨域资源共享）中使用。
   */
  options<
    T extends Api['options'][U]['response'],
    R extends AxiosResponse<T>,
    U extends keyof Api['options'],
    D extends Api['options'][U]['body'],
    P extends Api['options'][U]['params'],
    C extends Api['options'][U]['contentType']
  >(url: U, config?: AxiosRequestConfig<D, U, M, P, C>): Promise<R>
  /**
   * - 用于向服务器提交数据，通常用于创建新资源。
   * - 请求主体包含要提交的数据。
   * - 对服务器的操作不是幂等的，即多次相同的 POST 请求可能会导致不同的结果
   */
  post<
    T extends Api['post'][U]['response'],
    R extends AxiosResponse<T>,
    U extends keyof Api['post'],
    D extends Api['post'][U]['body'],
    P extends Api['post'][U]['params'],
    C extends Api['post'][U]['contentType']
  >(url: U, data?: D, config?: AxiosRequestConfig<D, U, M, P, C>): Promise<R>
  /**
   * - 用于向服务器更新或创建资源。
   * - 请求主体包含要更新的数据。
   * - 对服务器的操作是幂等的，即多次相同的 PUT 请求应该具有相同的结果。
   */
  put<
    T extends Api['put'][U]['response'],
    R extends AxiosResponse<T>,
    U extends keyof Api['put'],
    D extends Api['put'][U]['body'],
    P extends Api['put'][U]['params'],
    C extends Api['put'][U]['contentType']
  >(url: U, data?: D, config?: AxiosRequestConfig<D, U, M, P, C>): Promise<R>
  /**
   * - 用于对资源进行部分更新。
   * - 请求主体包含要应用于资源的部分更新。
   * - 对服务器的操作通常不是幂等的。
   */
  patch<
    T extends Api['patch'][U]['response'],
    R extends AxiosResponse<T>,
    U extends keyof Api['patch'],
    D extends Api['patch'][U]['body'],
    P extends Api['patch'][U]['params'],
    C extends Api['patch'][U]['contentType']
  >(url: U, data?: D, config?: AxiosRequestConfig<D, U, M, P, C>): Promise<R>
  // postForm<
  //   T extends Api['postform'][U]['response'],
  //   R extends AxiosResponse<T>,
  //   U extends keyof Api['postform'],
  //   D extends Api['postform'][U]['body'],
  //   P extends Api['postform'][U]['params'],
  //   C extends Api['postform'][U]['contentType']
  // >(url: U, data?: D, config?: AxiosRequestConfig<D, U, M, P, C>): Promise<R>
  // putForm<
  //   T extends Api['putform'][U]['response'],
  //   R extends AxiosResponse<T>,
  //   U extends keyof Api['putform'],
  //   D extends Api['putform'][U]['body'],
  //   P extends Api['putform'][U]['params'],
  //   C extends Api['putform'][U]['contentType']
  // >(url: U, data?: D, config?: AxiosRequestConfig<D, U, M, P, C>): Promise<R>
  // patchForm<
  //   T extends Api['patchform'][U]['response'],
  //   R extends AxiosResponse<T>,
  //   U extends keyof Api['patchform'],
  //   D extends Api['patchform'][U]['body'],
  //   P extends Api['patchform'][U]['params'],
  //   C extends Api['patchform'][U]['contentType']
  // >(url: U, data?: D, config?: AxiosRequestConfig<D, U, M, P, C>): Promise<R>
}

export interface AxiosInstance extends Axios {
  <T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>
  <T = any, R = AxiosResponse<T>, D = any>(
    url: Urls['all'],
    config?: Omit<AxiosRequestConfig<D>, 'url'>
  ): Promise<R>

  defaults: Omit<AxiosDefaults, 'headers'> & {
    headers: HeadersDefaults & {
      [key: string]: AxiosHeaderValue
    }
  }
}

export interface GenericFormData {
  append(name: string, value: any, options?: any): any
}

export interface GenericHTMLFormElement {
  name: string
  method: string
  submit(): void
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: CreateAxiosDefaults): AxiosInstance
  Cancel: CancelStatic
  CancelToken: CancelTokenStatic
  Axios: typeof Axios
  AxiosError: typeof AxiosError
  readonly VERSION: string
  isCancel(value: any): value is Cancel
  all<T>(values: Array<T | Promise<T>>): Promise<T[]>
  spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R
  isAxiosError<T = any, D = any>(payload: any): payload is AxiosError<T, D>
  toFormData(
    sourceObj: object,
    targetFormData?: GenericFormData,
    options?: FormSerializerOptions
  ): GenericFormData
  formToJSON(form: GenericFormData | GenericHTMLFormElement): object
}

declare const axios: AxiosStatic

export default axios

