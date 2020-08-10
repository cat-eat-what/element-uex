# element-uex 指南

element-uex 是对于ElementUI的扩展，包含js组件与样式皮肤

## 规范

- **不要提交** `lib` 里面打包的文件。

- 执行 `npm run dist` 后可以正确打包文件。

## 开发环境搭建
首先你需要 Node.js 4+ 和 NPM 3+
```shell
git clone https://git.oschina.net/dacp/element-uex.git
npm run dev

# open http://localhost:8085
```

如果国内用户觉得安装慢可以使用 [yarn](https://github.com/yarnpkg/yarn) 搭配 taobao registry
```shell
npm i yarn -g
yarn config set registry https://registry.npm.taobao.org
yarn
npm run dev

To build:

```shell
npm run dist
```
## Icon 图标

[图标Icon演示](https://cat-eat-what.github.io/element-uex/#/zh-CN/component/icon)

## API文档及demo演示地址

[API文档及demo演示地址](https://cat-eat-what.github.io/element-uex/#/zh-CN/component/scroll-content)
