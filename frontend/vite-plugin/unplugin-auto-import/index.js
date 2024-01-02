module.exports = [
  'unplugin-auto-import/vite',
  {
    include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
    imports: ['vue', 'vue-router', 'pinia'],
    eslintrc: {
      enabled: true, // Default `false`
      filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    },
    dts: './src/typings/auto-imports.d.ts'
  }
]

