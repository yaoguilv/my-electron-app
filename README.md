# Electron Official Tutorial
> Electron就是一个框架，index.html负责静态展示，renderer.js负责前端动态DOM API，preload.js负责调用Electron API、Nodejs API、Operation System API，main.js负责底层算法实现类代码
- 自我练习的目录结构：一个Example一般包含一个html和3个js文件。每个Example存放在单独的文件夹中（比如1_HelloWorld）。使用的时候，就将文件夹中的四个文件放到项目根目录即可运行。
- 文件关联关系：程序从main.js启动，main.js包含preload.js、index.html，index.html包含renderer.js

## 第一个程序
- 初始化项目
```
mkdir my-electron-app && cd my-electron-app
yarn init
```
- 添加依赖
```
yarn add electron --dev
```
- 添加gitignore
```
# 官方Node.js忽略文件
https://github.com/github/gitignore/blob/main/Node.gitignore
```
- 拟写主程序 main.js
```
console.log(`Hello from Electron 👋`)
```
- 在Nodejs程序固定文件package.json中，添加启动脚本
```
"scripts": {
    "start": "electron ."
},
```
- 运行
```
yarn run start
```

- 在根目录，新建一个简单页面 index.html
- 修改main.js，通过BrowserWindow展示刚才的页面
```
# js代码中，驼峰命名的变量是：不可实例化变量，帕斯卡式(PascalCase)命名的变量是：可实例化变量
# ECMAScript代码格式标准(import 某包)，还不能再Electron中使用 
```
- Nodejs事件触发模块(例如app)，属于Nodejs的异步事件驱动机制
```
# 在Electron中，BrowserWindows仅能够在app模块的ready动作触发后，才能被实例化
```
- 在Electron中，动作触发的写法，使用when，不用Nodejs传统的on
```
+ app.on('ready').then(() => {
- app.whenReady().then(() => {
  createWindow()
})
```
- 运行，此时的Web页面已经嵌入到Electron的程序中
- 每个Web页面，有自己的渲染程序`renderer process`，每个Web页面可按照前端开发的方式修改
- Electron对平台的分类只有三种：win32 (Windows), linux (Linux), and darwin (macOS)
- 在Windows及Liniux平台上的生命周期管理：关闭所有窗口，即可关闭app
- 在macOS平台上，关闭所有窗口，无需关闭app
- 在macOS平台上的生命周期管理：激活程序后，发现窗口都关闭。这时，得新开一个窗口

## 在VSCode上调试
> 2023 0303 第一篇的教程，还不能让人成功调试，马回头看看
- 在.vscode文件夹中创建launch.json文件
```
# 在右侧面板的Run模块中，可以点击create a launch.json file
```

## 预加载脚本（沙箱）
> 在预加载阶段，就将后端属性暴露给前端
### 运行机制
- 为了在main与render之间通信
- Electron的IPC机制(内部程序通信机制)： Electron's inter-process communication (IPC) modules
- main程序是nodejs程序，可以与操作系统交互，可以与Nodejs内部包交互，可以与Nodejs下载的外部包交互
- 为了使Electron的main与render通信，我们采用预加载脚本(preload script)
- render中的`BrowserWindow preload script`可以与`HTML DOM`、`Electron API`交互
- 具体的`Electron API`有：`contextBridge`
- 我们可以通过`contextBridge`定义全局对象
### 具体写法
- 在根目录，新建`preload.js`，通过`contextBridge`定义一个叫做`versions`的全局对象，并赋给这个对象三个函数
- 在`BrowserWindow`对象中，预加载上一步的js文件
- 至此，render程序就有了`versions`对象，render程序就可以通过`HTML DOM`和`versions`对象在前台展示操作系统中的内容
- 在根目录，新建`renderer.js`文件，写入调用web页面及system内容的代码
- 在`index.html`页面添加上一步的`renderer.js`文件，并在页面上开辟展示内容的段落`<p></p>`

## 前后端通信
- 在Electron的IPC机制内，通过`ipcMain`及`ipcRenderer`来进行相互通信
- 从前端发送一个消息到后端：在后端代码中设置一个程序句柄(ipcMain.handle)、在预加载代码中暴露一个函数(ipcRenderer.invoke)
- 程序句柄作用：监听事件；函数作用：触发句柄
- 句柄及函数位置：预加载脚本中
- 在`preload.js`(预加载代码)中，拟写函数(相当于seneder)
- 在`main.js`(后端代码)中，拟写句柄(相当于receiver)

- 在`renderer.js`(前端代码)，调用sender
- 调用顺序为：index.html -> renderer.js -> preload.js -> main.js
- preload 可以与两块内容交互： DOM APIs & Node.js environment


## Electron Fiddle
> 这是一个示例代码工具，相当于API手册
### 安装
- Electron Fiddler：File —> Preference -> Execution -> install package : yarn
- 点击切换版本，后台会自动下载对应版本，耐心等待即可。
- 安装完成后，学习引导教程，之后记得要关闭程序，再启动一次，Fiddler才能运行成功。因为360还在阻止部分功能，你需要重启，才能发现360弹窗，点击允许即可。
### 概览
- 给出每个功能的四大部分：index.html、renderer.js、preload.js、main.js
- 使用方法：选择Electron版本、选择Github地址（每个人都可以制作自己的功能模块代码上传到Git）
- 鼠标移动到变量名上面，你会得到其定义(功能由VS Code的引擎Monaco Editor支撑)
- 支持编译和打包生成exe(功能由Electron Forge支撑)
- 虽然Electron Fiddler不是IDE，但你可以扩展Electron Fiddler的功能、使用自己喜欢的编辑器书写代码，然后共享到GitHub

## Electron提供访问外围设备的功能(尚未实验成功)
- 浏览器可以通过弹出窗口的方式提供外围设备访问功能；Electron也可以通过这种方式，同时也可以通过开发人员直接写死代码的方式访问外围设备。
- Web Bluetooth API：需要处理`select-bluetooth-device`事件；使用`ses.setBlutoothPairingHandler(handler)`处理设备配对问题

## Electron Forge
> Electgron Forge是Electron项目的打包工具，最初由社区维护，后来Electron官方接手。
- 使用方法：在Electron项目中执行如下步骤
```
# 在项目中下载并保存依赖项
yarn add --dev @electron-forge/cli
# 在项目目录中安装Electron Forge并将项目导入到Electron Forge框架中
# 导入步骤的内容：此步骤会增加forge.config.js文件，修改.gitignore文件，修改package.json文件(增加package、make命令)
npx electron-forge import
# 构建该项目
yarn run make
```

---------------------------------待迁移到学习积累项目中------------------------------
## github官方的action指引
```
# This workflow will run tests using node and then publish a package to GitHub Packages when a release is created
# For more information see: https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages

name: Node.js Package

on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - run: npm ci
      - run: npm test

  publish-gpr:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          registry-url: https://npm.pkg.github.com/
      - run: npm ci
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.GITHUB_TOKEN}}
```