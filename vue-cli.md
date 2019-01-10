
# Vue-Cli

## 0.技术栈

vue2+webpack+vueRouter+element

## 1.安装nodejs

node -v  &&  npm -v

## 2.安装vue-cli

npm install vue-cli -g

## 3.初始化项目:采用webpack模板

vue init webpack vue_demo

## 4.进入项目根目录

cd vue_demo

## 5.安装package.json中依赖包

npm install

## 6.开发模式下运行项目

npm run dev

## 7.打包项目

npm run build  --根目录生成了dist文件夹,

## 项目结构

```javascript
|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- dev-client.js                // 热重载相关
|   |-- dev-server.js                // 构建本地服务器
|   |-- utils.js                     // 构建工具相关
|   |-- webpack.base.conf.js         // webpack基础配置
|   |-- webpack.dev.conf.js          // webpack开发环境配置
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|   |-- test.env.js                  // 测试环境变量
|-- src                              // 源码目录
|   |-- components                     // vue公共组件
|   |-- store                          // vuex的状态管理
|   |-- App.vue                        // 页面入口文件
|   |-- main.js                        // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等
|   |-- data                           // 群聊分析得到的数据用于数据可视化
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .eslintrc.js                     //javascript 代码检查
|-- .gitignore                       // git上传需要忽略的文件格式
|-- README.md                        // 项目说明
|-- index.html                       // 入口页面
|-- package.json                     // 项目基本信息
```

## package.json

```javascript
package.json 文件是项目根目录下的一个文件，定义该项目开发所需要的各种模块以及一些项目配置信息(如项目名称、版本、描述、作者等);

scripts字段: 这个字段定义了你可以用npm运行的命令。在开发环境下，在命令行工具中运行npm run dev 就相当于执行 node build/dev-server.js .也就是开启了一个node写的开发行建议服务器。由此可以看出script字段是用来指定npm相关命令的缩写;
 "scripts": {
    "dev": "node build/dev-server.js",
    "build": "node build/build.js"
  },
dependencies字段: 指项目运行时所依赖的模块;
devDependencies字段: 指定了项目开发时所依赖的模块;
在命令行中运行npm install命令，会自动安装dependencies和devDempendencies字段中的模块。package.json还有很多相关配置，如果你想全面了解，可以专门去百度学习一下。
```

## dev-server.js

```javascript
// 检查 Node 和 npm 版本
require('./check-versions')()

// 获取 config/index.js 的默认配置
var config = require('../config')

// 如果 Node 的环境无法判断当前是 dev / product 环境
// 使用 config.dev.env.NODE_ENV 作为当前的环境
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)

// 使用 NodeJS 自带的文件路径工具
var path = require('path')

// 使用 express
var express = require('express')

// 使用 webpack
var webpack = require('webpack')

// 一个可以强制打开浏览器并跳转到指定 url 的插件
var opn = require('opn')

// 使用 proxyTable
var proxyMiddleware = require('http-proxy-middleware')

// 使用 dev 环境的 webpack 配置
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
// 如果没有指定运行端口，使用 config.dev.port 作为运行端口
var port = process.env.PORT || config.dev.port

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// 使用 config.dev.proxyTable 的配置作为 proxyTable 的代理配置
var proxyTable = config.dev.proxyTable

// 使用 express 启动一个服务
var app = express()

// 启动 webpack 进行编译
var compiler = webpack(webpackConfig)

// 启动 webpack-dev-middleware，将 编译后的文件暂存到内存中
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

// 启动 webpack-hot-middleware，也就是我们常说的 Hot-reload
var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// 将 proxyTable 中的请求配置挂在到启动的 express 服务上
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
// 使用 connect-history-api-fallback 匹配资源，如果不匹配就可以重定向到指定地址
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
// 将 Hot-reload 挂在到 express 服务上
app.use(hotMiddleware)

// serve pure static assets
// 拼接 static 文件夹的静态资源路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

// 为静态资源提供响应服务
app.use(staticPath, express.static('./static'))

// 让我们这个 express 服务监听 port 的请求，并且将此服务作为 dev-server.js 的接口暴露
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
  
  // when env is testing, don't need open it
  // 如果不是测试环境，自动打开浏览器并跳到我们的开发地址
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
```

## webpack.base.config.js

```javascript

module.export = {
    // 编译入口文件
    entry: {},
    // 编译输出路径
    output: {},
    // 一些解决方案配置
    resolve: {},
    resolveLoader: {},
    module: {
        // 各种不同类型文件加载器配置
        loaders: {
        ...
        ...
        // js文件用babel转码
        {
            test: /\.js$/,
            loader: 'babel',
            include: projectRoot,
            // 哪些文件不需要转码
            exclude: /node_modules/
        },
        ...
        ...
        }
    },
    // vue文件一些相关配置
    vue: {}
}
```

## .babelrc



```javascript
//Babel解释器的配置文件，存放在根目录下。Babel是一个转码器，项目里需要用它将ES6代码转为ES5代码。如果你想了解更多，可以查看babel的知识。
{
  //设定转码规则
  "presets": [
    ["env", { "modules": false }],
    "stage-2"
  ],
  //转码用的插件
  "plugins": ["transform-runtime"],
  "comments": false,
  //对BABEL_ENV或者NODE_ENV指定的不同的环境变量，进行不同的编译操作
  "env": {
    "test": {
      "presets": ["env", "stage-2"],
      "plugins": [ "istanbul" ]
    }
  }
}
```

## .editorconfig

```javascript
//该文件定义项目的编码规范，编译器的行为会与.editorconfig文件中定义的一致，并且其优先级比编译器自身的设置要高，这在多人合作开发项目时十分有用而且必要。
root = true
[*]    // 对所有文件应用下面的规则
charset = utf-8                    // 编码规则用utf-8
indent_style = space               // 缩进用空格
indent_size = 2                    // 缩进数量为2个空格
end_of_line = lf                   // 换行符格式
insert_final_newline = true        // 是否在文件的最后插入一个空行
trim_trailing_whitespace = true    // 是否删除行尾的空格
```
