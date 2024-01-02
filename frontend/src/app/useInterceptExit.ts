import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { WindowKey } from '@/src-electron/renderer'

/**
 * 拦截默认退出程序（因为热更新会出现多次弹窗，生产版本不会出现此情况）
 */
const useInterceptExit = () => {
  const $q = useQuasar()
  const { t } = useI18n()
  if ($q.platform.is.electron) {
    window.electron.ipc(({ windows }) => {
      windows.main.on('close', e => {
        e.preventDefault()
        windows.main.webContents.send('quit-app')
      })
    })

    window.electron.ipcRenderer.on('quit-app', () => {
      $q.dialog({ title: t('ask-confirm-quit') }).onOk(() => {
        window.electron.ipc(({ app, windows }) => {
          const windowKeys = Object.keys(windows) as WindowKey[]
          windowKeys.forEach(key => windows[key]?.destroy())
          app.quit()
        })
      })
    })
  }
}

export default useInterceptExit

