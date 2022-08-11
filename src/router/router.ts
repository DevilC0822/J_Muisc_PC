import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      path: '/main',
    },
    children: [
      {
        path: 'main',
        name: 'Main',
        component: () => import('@/pages/Home.vue'),
      },
      {
        path: 'albums',
        name: 'Albums',
        component: () => import('@/pages/Albums.vue'),
      },
      {
        path: 'singer',
        name: 'Singer',
        component: () => import('@/pages/Singer.vue'),
      },
      {
        path: 'podcasts',
        name: 'Podcasts',
        component: () => import('@/pages/Podcasts.vue'),
      },
      {
        path: 'localdownload',
        name: 'LocalDownload',
        component: () => import('@/pages/LocalDownload.vue'),
      },
      {
        path: 'mylike',
        name: 'MyLike',
        component: () => import('@/pages/MyLike.vue'),
      },
      {
        path: 'createplaylists',
        name: 'CreatePlaylists',
        component: () => import('@/pages/CreatePlaylists.vue'),
      },
    ],
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   redirect: {
  //     path: '/home/main',
  //   },
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
