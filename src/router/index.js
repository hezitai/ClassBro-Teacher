import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/sellerDetail',
    name: 'SellerDetail',
    component: () => import('@/views/detail/seller_detail'),
    hidden: true
}, {
    path: '/sellerDetailWy',
    name: 'sellerDetailWy',
    component: () => import('@/views/detail/seller_detailWy'),
    hidden: true
}, {
    path: '/bigClassRoom',
    name: 'bigClassRoom',
    component: () => import('@/views/detail/bigClassRoom'),
    hidden: true
},

{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
},
{
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
},
{
    path: '/orders',
    name: 'orders',
    component: Layout,
    redirect: '/orders/orderlist',
    meta: {
        title: '订单池',
        icon: 'table'
    },
    alwaysShow: true,
    children: [{
        path: 'orderlist',
        name: 'orderlist',
        component: () => import('@/views/orders/orderList'),
        meta: {
            title: '订单列表'
            // icon: 'form'
        }
    }]
},
{
    path: '/myorders',
    name: 'myorders',
    component: Layout,
    redirect: '/myorders',
    meta: {
        title: '我的订单', icon: 'tree'
    },
    children: [{
        path: 'mycourse',
        name: 'mycourse',
        component: () => import('@/views/myorders/myCourse'),
        meta: {
            title: '我的课程'
            //  icon: 'tree'
        }
    }, {
        path: 'oncourse',
        name: 'oncourse',
        component: () => import('@/views/myorders/onCourse'),
        meta: {
            title: '进行中课堂'
            // icon: 'tree'
        }
    }, {
        path: 'finishedcourse',
        name: 'finishedcourse',
        component: () => import('@/views/myorders/finishedCourse'),
        meta: {
            title: '已结束课堂'
            // icon: 'tree'
        }
    }]
},
{
    path: '/messages',
    name: 'Messages',
    component: Layout,
    hidden: true,
    // redirect: '/messages/message',
    // meta: {
    //     title: '通知',
    //     icon: 'form'
    // },

    // alwaysShow: true,
    children: [{
        path: 'messages',
        name: 'messages',
        component: () => import('@/views/messages/messages'),
        meta: {
            title: '通知列表'
            //  icon: 'tree'
        }
    }]
},
{
    path: '/account',
    name: 'account',
    component: Layout,
    redirect: '/account',
    meta: {
        title: '我的',
        icon: 'user'
    },
    children: [{
        path: 'myinfonamtion',
        name: 'myinfonamtion',
        component: () => import('@/views/account/myInformation'),
        meta: {
            title: '个人资料'
            // icon: 'nested'
        }
    }, {
        path: 'historylessons',
        name: 'historylessons',
        component: () => import('@/views/account/historyLessons'),
        meta: {
            title: '历史课程'
            // icon: 'link'
        }
    }, {
        path: 'incomelist',
        name: 'incomelist',
        component: () => import('@/views/account/incomeList'),
        meta: {
            title: '收入记录'
            // icon: 'link'
        }
    }, {
        path: 'withdrawlist',
        name: 'withdrawlist',
        component: () => import('@/views/account/withdrawList'),
        meta: {
            title: '工资记录'
            // icon: 'link'
        }
    }, {
        path: 'givetimes',
        name: 'givetimes',
        component: () => import('@/views/account/giveTimes'),
        meta: {
            title: '赠送时长'
            // icon: 'link'
        }
    }]
},
{
    path: '*',
    redirect: '/login',
    hidden: true
}
]

const createRouter = () => new Router({
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router
