import { type BrowserWindowConstructorOptions, BrowserWindow } from 'electron'
import { merge, startsWith } from 'lodash'
import path from 'path'

/** Electron 窗口名 */
export type WindowKey = 'main' | 'tips'

/** Electron 渲染窗口实例集合 */
export type ElectronWindows = {
  /** 主窗口 */
  main: BrowserWindow
} & {
  /** 其他窗口 */
  [x in WindowKey]?: BrowserWindow
}

/** Electron 窗口集合 */
export const windows = {} as ElectronWindows

/** 创建 Electron 渲染窗口 */
export const createWindow = (params: {
  /** 窗口名称 */
  name: WindowKey
  /** 窗口加载的路径 */
  loadURL?: string
  /** 窗口配置 */
  opts?: BrowserWindowConstructorOptions
}) => {
  // eslint-disable-next-line prefer-const
  let { name, loadURL, opts } = params
  const defaultOpts: BrowserWindowConstructorOptions = {
    icon: path.resolve(__dirname, 'icons/icon.png'),
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      sandbox: false
    }
  }
  /** 新创建的窗口 */
  const newWin = new BrowserWindow(merge(defaultOpts, opts))
  if (!loadURL) loadURL = ''
  if (!loadURL || startsWith(loadURL, '/')) loadURL = process.env.APP_URL + loadURL
  newWin.loadURL(loadURL)

  windows[name] = newWin
  newWin.on('closed', () => {
    delete windows[name]
  })
  return newWin
}

/** 创建主窗口 */
export const createMainWindow = () => {
  const windowName = 'main'
  const windowOpts = {
    webPreferences: {
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  } as BrowserWindowConstructorOptions
  // 创建主窗口
  const mainWindow = createWindow({
    name: windowName,
    opts: windowOpts
  })
  // 开发环境下打开调试工具
  if (process.env.DEBUGGING) {
    mainWindow.webContents.openDevTools()
  } else {
    // 生产环境下禁止打开调试工具
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools()
    })
  }
}
