
### git remote add origin https://github.com/yanick2019/vuejs-tuto.git

## git push -u origin master 推master分支到github
## git push -u origin master -f  强制覆盖已有的分支


# 官网
=========

https://cn.vuejs.org/
https://github.com/vuejs/vue-cli

```bash

#最新版本
$ npm show vue-cli
    #dist-tags:
    #latest: 2.9.6
$ npm install -g vue-cli@2.9.6
    #-g 全局安装 指定安装2.9.6版本

# 安装版本确认
$ vue -V

#帮助
$ vue -h
    init           generate a new project from a template
    list           list available official templates
    build          prototype a new project 发布
    create         (for v3 warning only)
    help [cmd]     display help for [cmd]

$ vue help init 查看init 使用方法

$ npm run build 编译

通过编译后把dist文件夹里的文件 拷贝到服务器即可。
修改根目录 
    1 . // main.js 或者 router/index.js 处修改路由
        export default new Router({
            mode: 'history', // 去掉链接中的井号 mode: 'history', 默认值是 "hash"
            base： ‘/vuejs-tuto/’ , 
    2 . //config/index.js 修改项目打包为子目录
        assetsPublicPath:'vuejs-tuto' 

```
# 模版
## 官网

https://github.com/vuejs-templates

```bash
$ vue list 查看官方模版
```

#webpack模板工程

https://vuejs-templates.github.io/webpack

```bash
$ vue init webpack myweb
$ cd myweb
$ npm run dev
$ npm run build
$ code .
```
    去官网查看最新模版https://github.com/vuejs/vue-cli/releases 是3.8.4
    修改package.json
       "dependencies": {
            "vue": "2.5.0", -> "vue": "3.8.4", 精确指定版本
            "vue-router": "^3.0.1" -> "vue-router": "3.0.1"
         },



$ npm run build 开发完成后发布项目
    发布到myweb/dist文件夹
## webpack 工程

* src:源文件 基于它进行开发
* dist打包的文件夹
* package.json 项目配置文件
* App.vue 主views
* 入口文件 src/main.js

# 引入bootstrap4
===============

```bash

$ npm install bootstrap --save --save-exact
    --save 把bootstrap作为依赖库放到package.json "dependencies"
    --save-exact 精确版本号
```
main.js 导入
import 'bootstrap/dist/css/bootstrap.min.css'


# 使用ajax库 -axios

https://github.com/axios/axios

```bash

$ npm install --save --save-exact axios -vue-axios

```
mail.js 导入 
import axios from 'axios'
import VueAxios from 'vue-axios'

修改 src/components/HelloWorld.vue

# 自定义css样式

在src/assets/my.css

在app.vue 导入 import "./assets/my.css"
在components/hw.vue里导入会错误

#组件的结构

## 组件文件夹

src/components/*.vue

## 组件文件的格式

* template: 组件html内容
* script: 组件js(es6)
* style 组件 css 
### 写myapp.vue

#工程的结构

http://vuejs-templates.github.io/webpack/

* build
    +webpack设置文件
* config
    +工程设置文件
*src
    +源文件
*static
    + 静态文件夹(pure static assets (directly copied))
* index.html
    + 网页启动入口文件

#  监听 

watch:{
    '$route.path'(t,f)  '$route.name'(t,f)  '$route.params.nid'(t,f) 
    {
        
    }

}

## 注意:
* 路由监听(watch $route) 只能放在父组件里监听 , 在子组件里是监听不到路由切换的 , 但是子组件可以监听到自己的孙组件的路由切换
* 子组件路由切换时在mounted 等 里触发事件
* 刷新同个页面时 可用watch 监听 props


# 路由

https://router.vuejs.org/zh-cn/

https://github.com/vuejs/vue-router


##安装
```bash
 
$ npm install vue-router --save --save-exact

```

## 路由配置
```
Vue.use(Router)

export default new Router({
mode: 'history', // 去掉链接中的井号 mode: 'history', 默认值是 "hash"
base: "",  // 根路由 设置 默认 "" 或/

```

## 路由设定
src/router/index.js
src/main.js

App.vue
    <router-link to="/">Home</router-link>

## 动态路由

    player.vue

## 嵌套路由

* /player/1/profile
* /player/1/stats
* player/stats.vue    
* player/profile.vue   

配置router/index.js

## 路由编程

* router-link
* router.push(location,onComplete?,onAbort)

修改App.vue

## 多路由拼图
* router.views[name]
* components

修改或创建
* Header.vue
* Sidebar.vue
* Detail.vue
* router/index.js
* App.vue

## 多参数路由 

* 路由属性 props
* User.vue

修改
* router/index.js
* App.vue



# URL重定向 

* 重定向指令: redirect
* 路由别名: alias

修改
* About.vue
* router/index.js
* App.vue


# 第三方实用组件库

## vue-chartjs

网页中图表的显示

https://vue-chartjs.org/

### 演示

https://demo.vue-chartjs.org/

## vue-fa
调用FontAwesome5
https://cweili.github.io/vue-fa/

## vee-validate
校验框架
https://baianat.github.io/vee-validate/

##eslint-plugin-vue

语法检验工具,可以快速找出代码,指令,样式中的问题,可以集成到vscode
https://eslint.vuejs.org/

## vue-lazyload
图片预载功能
https://github.com/hilongjw/vuw-lazyload

## axios
HTTP 通讯组件,可以远程存取各种REST-API
https://github.com/axios/axios

## vuedraggable
对象拖动组件
https://github.com/SortableJS/Vue.Draggable
### 演示
https://sortablejs.github.io/Vue.Draggable/@/#/simple

## vue-Socket.io
对于socket.io库的封装,可以和vuex状态管理配合使用
https://github.com/MetinSeylan/Vue-Socket.io

## Vue-multiselect
多选框 
https://vue-multiselect.js.org

## vuejs-datapicker

vue的日期选择组件
https://github.com/charliekassel/vuejs-datapcker

## vue-md-editor

vue的markdown编辑器

https://github.com/anguer/vue-editor

## vue-typer
内容显示的打字机组件
https://github.com/cngu/vue-typer
###演示
https://cngu.github.io/vue-typer/

## vue-rate-it
星级评分组件
https://craigh411.github.io/vue-rate-it

### 演示
https://jsfiddle.net/craig_h_411/992o7cq5

## vue-good-table
表格操作自己,支持排序,内容过滤,分页
https://xaksis.github.io/vue-good-table/

## vuex
官方出品的状态管理自己
https://vuex.vuejs.org

## vue Router
官方路由组件
https://router.vuejs.org

## Vuetify
vue的UI/UX框架, bootstrap外的选择
https://vuetifyjs.com

## element-ui
基于vue2.0的组件库,支持React 和Angular
https://element.eleme.io

## vue-material
谷歌设计风格的ui组件库
https://vuematerial.io

## bootstrap-vue
https://bootstrap-vue.js.org

## Nuxt.js
Vue的服务器端渲染框架,解决客户端渲染的诸多问题如载入慢,seo
https://nuxtis.org


# myweb

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
