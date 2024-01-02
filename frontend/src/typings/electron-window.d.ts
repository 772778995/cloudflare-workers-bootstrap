import { ElectronWindows } from '@/src-electron/renderer'

declare global {
  interface Window {
    electron: {
      /**
       * 封装的 ipc 模块
       * @param cb 在主线程执行的回调函数，会将该函数转换成字符串，再在主线程转换成函数执行，所以无法沿着作用域链访问渲染进程中的外层变量
       * @param config 配置项
       * @param config.ipcArgs 回调函数需要使用的渲染进程的参数
       * @returns 一个Promise包装的在主线程执行的回调函数的结果
       */
      ipc: <CbRes, IpcArgs>(
        cb: (
          opts: typeof Electron & {
            windows: ElectronWindows
          },
          ipcArgs: IpcArgs extends never ? never : IpcArgs
        ) => CbRes,
        ipcArgs?: IpcArgs | undefined
      ) => Promise<CbRes>

      /**
       * 封装的 ipc 同步模块
       * @param cb 在主线程执行的回调函数
       * @param ipcArgs 渲染进程的参数
       * @returns 回调函数的返回值
       */
      ipcSync: <CbRes, IpcArgs>(
        cb: (
          opts: typeof Electron & { windows: ElectronWindows },
          ipcArgs: IpcArgs extends never ? never : IpcArgs
        ) => CbRes,
        ipcArgs?: IpcArgs
      ) => CbRes

      /**
       * 通过浏览器打开网页
       * @param url 完整地址或者路由，如 "baidu.com"，"/your-route-path"
       */
      openUrlByBrowser: (url: string) => void

      ipcRenderer: Electron.IpcRenderer
    }
  }
}

