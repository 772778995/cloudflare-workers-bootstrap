# cloudflare-workers-bootstrap

## 概览

这是一个基于 [cloudflare workers](https://developers.cloudflare.com/workers/) 的 serveless 快速开发模板



## 快速开始

1. 安装依赖

   ```bash
   pnpm i
   # npm i
   # yarn install
   ```

2. 启动本地服务

   ```bash
   pnpm dev
   ```

3. 访问接口：[127.0.0.1:8787/api/user](http://127.0.0.1:8787/api/user)
   默认端口为 8787，若端口已被占用的话修改终端输出的地址

4. 部署服务

   ```bash
   pnpm serve
   ```

   执行完毕后，若已经申请 cloudflare 账号会弹出授权页面，允许即可



## 主要依赖

- [wrangler](https://developers.cloudflare.com/workers/wrangler/)

  wrangler 是 Cloudflare 开发人员平台命令行界面 （CLI），在这里我们用它管理项目

- [itty-router](https://github.com/kwhitley/itty-router)
  itty-router 是一个精简的路由库，可以对标 [express](https://github.com/expressjs/express) 和 [koa-router](https://github.com/ZijianHe/koa-router)，它最初是为 [Cloudflare Workers](https://itty.dev/itty-router/runtimes#Cloudflare Workers) 设计的，可用于浏览器、Service Worker、边缘功能或运行时，如 [Node](https://itty.dev/itty-router/runtimes#Node)、[Bun](https://itty.dev/itty-router/runtimes#Bun) 等

- [class-validator](https://github.com/typestack/class-validator)，[class-transformer](https://github.com/typestack/class-validator)
  class-validator 是一个流行的检验对象的库，它可以使用装饰器或者函数的方式来检验对象是否符合特定的条件。 
  class-transformer 可以对象和类之间基于装饰器的转换、序列化和反序列化
  这里我使用他们封装在 [./src/utils/validation.ts](./src/utils/validation.ts) 中，主要用于校验请求的 `query` 或者 `body` 对象是否合法

- [ts-mixer](https://github.com/tannerntannern/ts-mixer)
  一个小型 TypeScript 库，提供了不错的 Mixin 功能。它可以合并多个 class，**组合** 优于 **继承**！

- [lodash](https://github.com/lodash/lodash)

  一个现代JavaScript实用程序库，提供模块化、性能和附加功能。在这个项目中引入 lodash 时，使用以下方式引入函数才能实现按需引入：

  ```typescript
  // import { map } from 'lodash' 这里没有使用 webpack 或者 vite 等构建工具，无法自动 treeshake
  import map from 'lodash/map' // 因为是云函数，尽量减少打包之后的体积
  ```

  

