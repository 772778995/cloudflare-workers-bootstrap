import { defineStore } from 'pinia'
import defaultLightTheme from '@/theme/default/light.json'
import defaultDarkTheme from '@/theme/default/dark.json'
import { setCssVar } from 'quasar'

export const themeCssMap = Object.freeze({
  default: {
    ligth: defaultLightTheme,
    dark: defaultDarkTheme
  }
})

/** 主题模式 */
export type ThemeMode = 'ligth' | 'dark'
export type ThemeName = 'default'
export type ThemeCss = typeof defaultLightTheme
export type ThemeCssKey = keyof ThemeCss

const useTheme = defineStore('theme', {
  state: () => ({
    themeMode: 'ligth' as ThemeMode,
    themeName: 'default' as ThemeName
  }),
  getters: {
    themeCss(state) {
      const { themeName, themeMode } = state
      const themeCss = themeCssMap[themeName][themeMode]
      Object.keys(themeCss).map(k => setCssVar(k, themeCss[k as ThemeCssKey]))
      return themeCss
    }
  },
  actions: {}
})

export default useTheme

