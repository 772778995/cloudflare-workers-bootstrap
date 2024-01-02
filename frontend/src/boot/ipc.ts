import { boot } from 'quasar/wrappers'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $ipc: typeof window.electron.ipc
    $ipcSync: typeof window.electron.ipcSync
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$ipc = window.electron.ipc
  app.config.globalProperties.$ipcSync = window.electron.ipcSync
})

