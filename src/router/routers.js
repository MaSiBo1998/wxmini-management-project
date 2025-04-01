import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/login',
    meta: { title: 'sign in', noCache: true },
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: (resolve) => require(['@/views/home/index'], resolve),
        hidden: true
      },
      {
        path: '/actor',
        name: 'actor',
        component: (resolve) => require(['@/views/actor/index'], resolve),
        hidden: true
      },
      {
        path: '/notice',
        name: 'actor',
        component: (resolve) => require(['@/views/notice/index'], resolve),
        hidden: true
      },
      {
        path: '/active',
        name: 'actor',
        component: (resolve) => require(['@/views/active/index'], resolve),
        hidden: true
      },
      {
        path: '/case',
        name: 'case',
        component: (resolve) => require(['@/views/case/index'], resolve),
        hidden: true
      },
      {
        path: '/user',
        name: 'user',
        component: (resolve) => require(['@/views/user/index'], resolve),
        hidden: true
      },
      {
        path: '/banner',
        name: 'case',
        component: (resolve) => require(['@/views/banner/index'], resolve),
        hidden: true
      },

    ]
  }
]

export default new Router({
  mode: 'history', // nginx服务器需要配置
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
