import type { RouteRecordRaw } from 'vue-router'

export type RouteName = '录音器' | '登录'

/** 路由信息 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '首页',
    redirect: '/recorder',
    component: () => import('@/src/pages/home/Home.vue'),
    children: [
      {
        path: '/recorder',
        name: '录音器',
        component: () => import('@/src/pages/home/recorder/Recorder.vue')
      },
      {
        path: '/audio-file',
        name: '音频文件',
        component: () => import('@/src/pages/home/recorder/Recorder.vue')
      },
      {
        path: '/mime',
        name: '我的',
        component: () => import('@/src/pages/home/recorder/Recorder.vue')
      }
    ]
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('@/src/pages/login/Login.vue')
  },
  {
    path: '/register',
    name: '注册',
    component: () => import('@/src/pages/register/Register.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/src/pages/noFound/NoFound.vue')
  }
]

export default routes

