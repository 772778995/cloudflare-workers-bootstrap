const useRequest = <F extends Function>(fn: F) => {
  const isLoading = ref(false)
  const isError = ref(false)
  const errMsg = ref('')
  const request = ((...arg: any) => {
    isLoading.value = true
    isError.value = false
    errMsg.value = ''
    return fn(...arg)
      .catch((err: Error) => {
        isError.value = true
        errMsg.value = err.message
      })
      .finally(() => (isLoading.value = false))
  }) as unknown as F
  return [
    /** 发起请求 */
    request,
    /** 正在请求中…… */
    isLoading,
    /** 出现异常 */
    isError
  ] as const
}

export default useRequest

