/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { startsWith } from 'lodash'
import { boot } from 'quasar/wrappers'
import i18n from '@/src/i18n'
import { Dialog } from 'quasar'

const t = i18n.global.t

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $electron: typeof window.electron
  }
}

export default boot(({ app }) => {
  if (!window.electron) {
    const fn = () =>
      Dialog.create({
        title: t('web-side-not-supported'),
        message: t('please-download-client')
      })
    window.electron = {
      ipc: fn,
      ipcSync: fn,
      openUrlByBrowser: url => {
        if (startsWith(url, '/')) url = process.env.APP_URL + '#' + url
        window.open(url)
      },
      ipcRenderer: {
        on: () => null
      }
    }
  }
  app.config.globalProperties.$electron = window.electron
})

