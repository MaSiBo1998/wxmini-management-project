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
    redirect: '/dashboard',
    children: [
      {
        path: '/userManagement',
        component: (resolve) => require(['@/views/UserManagement/user'], resolve),
        hidden: true
      },
      {
        path: 'dashboard',
        component: (resolve) => require(['@/views/home'], resolve),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'index', affix: true, noCache: true }
      },
      {
        path: '/home',
        name: 'home',
        component: (resolve) => require(['@/views/home'], resolve),
        hidden: true
      },
      {
        path: '/actor',
        name: 'actor',
        component: (resolve) => require(['@/views/actor/index'], resolve),
        hidden: true
      },
      // 首贷确认报表
      {
        path: '/firstLoanConfirm',
        name: 'firstLoanConfirm',
        component: (resolve) => require(['@/views/report/firstLoanConfirm/index'], resolve),
        hidden: true
      },
      // 复贷申请转化率
      {
        path: '/reLoanApplyRate',
        name: 'reLoanApplyRate',
        component: (resolve) => require(['@/views/report/reLoanApplyRate/index'], resolve),
        hidden: true
      },
      // 安装注册率
      {
        path: '/installRegisterRate',
        name: 'installRegisterRate',
        component: (resolve) => require(['@/views/report/installRegisterRate/index'], resolve),
        hidden: true
      },
      // 注册完件率
      {
        path: '/registerStep',
        name: 'registerStep',
        component: (resolve) => require(['@/views/report/registerStep/index'], resolve),
        hidden: true
      },
      // 放款失败率
      {
        path: '/paymentFailRate',
        name: 'paymentFailRate',
        component: (resolve) => require(['@/views/report/paymentFailRate/index'], resolve),
        hidden: true
      },
      // 邀请数据(墨西哥)
      {
        path: '/inviteData',
        name: 'inviteData',
        component: (resolve) => require(['@/views/report/inviteData/index'], resolve),
        hidden: true
      },
      // 邀请数据(哥伦比亚)
      {
        path: '/inviteDataCo',
        name: 'inviteDataCo',
        component: (resolve) => require(['@/views/report/inviteDataCo/index'], resolve),
        hidden: true
      },
      // 首复贷申请率
      {
        path: '/reloanRepaymentRate',
        name: 'reloanRepaymentRate',
        component: (resolve) => require(['@/views/report/reloanRepaymentRate/index'], resolve),
        hidden: true
      },
      // 首复贷确认率
      {
        path: '/reloanConfirmRate',
        name: 'reloanConfirmRate',
        component: (resolve) => require(['@/views/report/reloanConfirmRate/index'], resolve),
        hidden: true
      },
      // 验证码回填率
      {
        path: '/codeReWriteRate',
        name: 'codeReWriteRate',
        component: (resolve) => require(['@/views/report/codeReWriteRate/index'], resolve),
        hidden: true
      },
      // 首贷优化确认率
      {
        path: '/firstLoanOptimizeRate',
        name: 'firstLoanOptimizeRate',
        component: (resolve) => require(['@/views/report/firstLoanOptimizeRate/index'], resolve),
        hidden: true
      },
      // 新老客通过率
      {
        path: '/newOldUserPassRate',
        name: 'newOldUserPassRate',
        component: (resolve) => require(['@/views/report/newOldUserPassRate/index'], resolve),
        hidden: true
      },
      // 逾期追踪汇总
      {
        path: '/overdueTrackSummary',
        name: 'overdueTrackSummary',
        component: (resolve) => require(['@/views/report/overdueTrackSummary/index'], resolve),
        hidden: true
      },
      // 安卓通过率(新)
      {
        path: '/androidPassRateNew',
        name: 'androidPassRateNew',
        component: (resolve) => require(['@/views/report/androidPassRateNew/index'], resolve),
        hidden: true
      },
      // 安卓通过率(老)
      {
        path: '/androidPassRateOld',
        name: 'androidPassRateOld',
        component: (resolve) => require(['@/views/report/androidPassRateOld/index'], resolve),
        hidden: true
      },
      // 安卓风险定价
      {
        path: '/androidRiskPrice',
        name: 'androidRiskPrice',
        component: (resolve) => require(['@/views/report/androidRiskPrice/index'], resolve),
        hidden: true
      }
    ]
  }
]

export default new Router({
  mode: 'history', // nginx服务器需要配置
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
