import i18n from 'src/i18n'
import { defineStore } from 'pinia'

const useSetting = defineStore('setting', {
  persist: true,
  state: () => ({
    locale: 'zh-CN' as Locale
  }),
  actions: {
    init() {
      this.watchLocale()
    },
    watchLocale() {
      watch(
        () => this.$state.locale,
        locale => {
          this.updateI18nLocale(locale)
        },
        { immediate: true }
      )
    },
    async updateI18nLocale(locale: Locale) {
      i18n.global.locale.value = locale
    }
  }
})

export default useSetting

