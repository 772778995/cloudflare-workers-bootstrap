import { boot } from 'quasar/wrappers'
import useSetting from '@/src/stores/useSetting'

export default boot(({ app }) => {
  app.config.globalProperties.$stores = {
    setting: useSetting()
  }
})

const store = {
  setting: useSetting()
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $stores: typeof store
  }
}

