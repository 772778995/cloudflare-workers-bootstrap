import { boot } from 'quasar/wrappers'
import localForage from '../utils/localForage'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $localForage: typeof localForage
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$localForage = localForage
})

