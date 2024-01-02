// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { ipcRenderer } from 'electron'
import { isNull, isUndefined, startsWith, uniqueId } from 'lodash'
const ipc = (cb, ipcArgs) => {
  return new Promise((resolve, reject) => {
    const channelId = uniqueId('ipc-')
    ipcArgs = isUndefined(ipcArgs) ? undefined : JSON.stringify(ipcArgs)
    ipcRenderer.once(channelId, (e, err, res) =>
      isNull(err) ? resolve(JSON.parse(res || 'null')) : reject(err)
    )
    ipcRenderer.send('ipc', cb.toString(), {
      channelId,
      ipcArgs
    })
  })
}

const ipcSync = (cb, ipcArgs) => {
  ipcArgs = isUndefined(ipcArgs) ? undefined : JSON.parse(ipcArgs)
  const [err, res] = ipcRenderer.sendSync('ipc-sync', cb.toString(), ipcArgs)
  if (isNull(err)) return res
  else throw new Error(err)
}

const openUrlByBrowser = url => {
  if (startsWith(url, '/')) url = process.env.APP_URL + '/#' + url
  window.electron.ipc(({ shell }, { url }) => shell.openExternal(url), { url })
}

window.electron = {
  ipc,
  ipcSync,
  openUrlByBrowser,
  ipcRenderer
}
