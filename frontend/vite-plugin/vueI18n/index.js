const path = require('path')

module.exports = [
  '@intlify/vite-plugin-vue-i18n',
  {
    // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
    // compositionOnly: false,

    // you need to set i18n resource including paths !
    include: path.resolve(__dirname, '../../src/i18n/**')
  }
]

