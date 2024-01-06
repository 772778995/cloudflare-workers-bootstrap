declare type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
declare type GetApiResponse<T, R = ReturnType<T>> = UnwrapPromise<R>
