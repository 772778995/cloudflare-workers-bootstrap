# Quasar 开发文档

## 要求：

- Node 版本：14+
- 包管理器： Yarn v1（建议使用 Yarn），Pnpm，或npm。



## 下载依赖

```bash
npm i yarn -g			# 全局安装 yarn（如果还没安装的话）
npm i @quasar/cli -g 	# 全局安装 quasar 脚手架（如果还没安装的话）
yarn install			# 进入项目根目录，安装项目依赖
```



## 运行、打包应用

```bash
yarn dev 			# 启动 web 应用
yarn build 			# 打包 web 应用

yarn dev-electron 	# 启动 electron 应用
yarn build-electron # 打包 electron 应用
```



## 代码修复

```bash
yarn lint 		# eslint 修复代码
yarn format 	# prettier 格式化代码
yarn update-api	# 更新接口类型
```



### 自定义配置

[配置 quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).