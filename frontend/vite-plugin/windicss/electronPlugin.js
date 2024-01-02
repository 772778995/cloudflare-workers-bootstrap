const plugin = require('windicss/plugin')

const electronPlugin = plugin(({ addUtilities }) => {
  addUtilities({
    '.electron-drag-deep': {
      '-webkit-app-region': 'drag'
    },
    '.electron-drag': {
      '-webkit-app-region': 'drag',
      '& > *': {
        '-webkit-app-region': 'no-drag'
      }
    },
    '.electron-no-drag': {
      '-webkit-app-region': 'no-drag'
    },
    '.electron-ignore-mouse-events': {
      content: ''
    }
  })
})

module.exports = electronPlugin

