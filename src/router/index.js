import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savePosition){
    "use strict";
    // 要进入的目标路由对象要去哪里
    // 离开的路由对象从哪来
    // 记录滚动条的坐标点击前进后退的时候记录值
    if (savePosition) {
      return savePosition;
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  //路由实现懒加载
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: "登录"
      },
      component: (resolve)=>require(['@/views/login.vue'], resolve)
    },
    {
      path: '/index/:state?',
      name: 'index',
      meta: {
        title: "主页"
      },
      component: (resolve)=>require(['@/views/index.vue'], resolve)
    },
    {
      path: '*',
      name: 'notFound',
      meta: {
        title: "页面没找到"
      },
      component: (resolve)=>require(['@/views/notFound.vue'], resolve)
    },
    {
      path: '/userManager',
      name: 'userManager',
      meta: {
        title: "用户管理"
      },
      component: (resolve)=>require(['@/views/userManager.vue'], resolve)
    }, {
      path: '/addTrainCamp',
      name: 'addTrainCamp',
      meta: {
        title: "添加训练营"
      },
      component: (resolve)=>require(['@/views/createTrainCamp.vue'], resolve)
    },
    {
      path: '/modifyPwd',
      name: 'modifyPwd',
      meta: {
        title: "修改密码"
      },
      component: (resolve)=>require(['@/views/modifyPassword.vue'], resolve)
    },
    {
      path: '/studentDetail/:id?',
      name: 'studentDetail',
      meta: {
        title: "座位表及详情"
      },
      component: (resolve)=>require(['@/views/studentDetail.vue'], resolve)
    }
  ]
})
