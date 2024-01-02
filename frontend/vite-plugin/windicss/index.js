const { windPreset } = require('can-can-need-bug')
const electronPlugin = require('./electronPlugin')
const neumorphism = require('tailwindcss-neumorphism')
const themeVar = require('../../theme/default/light.json')

windPreset.prefix = false
windPreset.addUtilities = {
  preflight: '_'
}
windPreset.plugins.push(electronPlugin, neumorphism)
windPreset.preflight = true

windPreset.theme = {
  colors: {
    q: Object.keys(themeVar).reduce((obj, k) => {
      obj[k] = `var(--q-${k})`
      return obj
    }, {})
  },
  neumorphismColor: {
    q: themeVar
  }
}

module.exports = windPreset

