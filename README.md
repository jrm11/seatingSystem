本项目为小型应用
## 技术栈

vue2 + element-ui + axios + vue-router + webpack + ES6/7+ sass+mockjs
## 项目运行


#### 注意：由于涉及大量的 ES6 等新属性，node 需要 6.0 以上版本
## 开发
```bash

    # 安装依赖
    npm install

    # 本地开发 开启服务
    npm start

```
浏览器访问 http://localhost:8080

## 目录结构

```shell
├── README.md                                   项目介绍
├── index.html                                  入口页面
├── build                                       构建脚本目录
│   ├── build.js                                生产环境构建脚本，执行打包命令的时候会执行这个文件
│   ├── check-versions.js                       检查node npm版本
│   ├── utils.js                                构建相关工具方法
│   ├── webpack.base.conf.js                    wabpack基础配置
│   ├── webpack.dev.conf.js                     wabpack开发环境配置
│   └── webpack.prod.conf.js                    wabpack生产环境配置
│   └── webpack.test.conf.js                    wabpack测试环境配置
├── config                                      项目配置
│   ├── dev.env.js                              开发环境变量
│   ├── index.js                                项目配置文件
│   ├── prod.env.js                             生产环境变量
│   └── test.env.js                             测试环境变量
├── package.json                                npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
├── src                                         源码目录
│   ├── api
│   │   └── api.js                              ajax接口
│   ├── components                              公共组件目录
│   │   └── header.vue                          公用头部组件
│   │   └── seatList.vue                        座位列表组件
│   │   └── single-training-camp.vue            训练营组件
│   │   └── studentInfo.vue                     学生信息组件
│   ├── assets                                  资源目录，这里的资源会被wabpack构建,存放自己写的代码或资源
│   │   └── css
│   │       └── app.scss                        入口css文件
│   │       └── base.scss                       基础类css文件
│   │       └── common.scss                     公用css文件
│   │       └── common_color.scss               公用颜色css文件
│   │       └── common_size.scss                公用尺寸css文件
│   │       └── reset.scss                      游览器重置css文件
│   │       └── userManager.scss                用户管理css文件
|   |    └── img                                图片
│   ├── common                                  公用js工具文件
│   │   └── bus.js                              公用中间件（用于兄弟组件的通讯）
│   │   └── util.js                             公用工具文件
│   ├── mock                                    后台数据文件及业务逻辑
│   │   └── data                                数据文件
│   │         └── user.js                       生成的随机数据
│   │   └── index.js
│   │   └── mock.js                             后台业务逻辑
│   ├── routes                                  前端路由
│   │   └── index.js
│   └── vendor                                  导入导出文件
│       ├── Blob.js
│       └── Exprot2Excel.js                     导出js
│       └── Exprot2Zip.js                       导出压缩js
│   └── views                                   页面目录
│       ├── createTrainCamp.vue                 创建训练营
│       ├── index.vue                           主页
│       ├── login.vue                           登录
│       ├── modifyPassword.vue                  修改密码
│       └── notFound.vue                        未找到页
│       └── studentDetail.vue                   学生详情
│       └── userManager.vue                     用户管理
│   ├── App.vue                                 根组件
│   ├── main.js                                 入口js文件
├── static                                      纯静态资源，不会被wabpack构建。存放类库文件

```
