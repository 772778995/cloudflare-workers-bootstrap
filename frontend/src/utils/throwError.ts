import { isString } from 'lodash'
import { Notify } from 'quasar'

const throwError = (err: string | Error) => {
  let errMsg = ''
  if (isString(err)) errMsg = err
  else errMsg = err.message || JSON.stringify(err)
  Notify.create({
    type: 'negative',
    icon: 'announcement',
    message: errMsg
  })
  throw new Error(errMsg)
}

export default throwError

