import { ApiSchema } from '~/types/apis'

declare type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

/** 获取函数的返回类型 */
declare type GetApiResponse<T extends (...args: any) => any, R = ReturnType<T>> = Required<
  UnwrapPromise<R>
>

declare type Obj = Record<string, any>

declare type GetApiSchema<T extends ApiSchema> = T
