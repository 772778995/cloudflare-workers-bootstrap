import electron, { ipcMain } from 'electron'
import { isUndefined, map } from 'lodash'
import { windows } from './renderer'

// 异步通信模块
ipcMain.on(
  'ipc',
  (
    e,
    /** 渲染进程传递的函数字符串 */
    callback: string | (() => () => unknown),
    config: {
      /** 频道ID */
      channelId: string
      /** 渲染进程函数的参数 */
      ipcArgs: string
      /** 通信的窗口Key值 */
      windowKey: string
    }
  ) => {
    try {
      const ipcArgs = isUndefined(config.ipcArgs) ? undefined : JSON.parse(config.ipcArgs)
      const res = new Function(`return ${callback}`)()({ ...electron, windows }, ipcArgs)
      map(windows, win =>
        win?.webContents.send(config.channelId, null, JSON.stringify(res))
      )
    } catch (err) {
      map(windows, win => win?.webContents.send(config.channelId, err, null))
    }
  }
)

// 同步通信模块
ipcMain.on('ipc-sync', (e, callback, ipcArgs) => {
  ipcArgs = isUndefined(ipcArgs) ? undefined : JSON.parse(ipcArgs)
  try {
    const res = new Function(`return ${callback}`)()({ ...electron, windows }, ipcArgs)
    e.returnValue = [null, res]
  } catch (err) {
    e.returnValue = [err, null]
  }
})

