import { app, nativeTheme } from 'electron'
import path from 'path'
import os from 'os'
import { createMainWindow, windows } from './renderer'
import './ipc'

// 在Linux下进程未定义时需要
const platform = process.platform || os.platform()

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

// 当 Electron 完成初始化后，创建主窗口
app.whenReady().then(createMainWindow)
// 当所有窗口关闭时退出
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，否则绝大部分应用及其菜单栏会保持激活
  if (platform !== 'darwin') app.quit()
})
// 在 macOS 上，当单击 dock 图标并且该应用没有打开的窗口时，通常在应用程序中重新创建一个窗口
app.on('activate', () => {
  if (!windows.main) createMainWindow()
})

