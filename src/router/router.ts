import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      path: '/home',
    },
  },
  {
    path: '/home',
    component: () => import('@/layout/Main.vue'),
    redirect: {
      path: '/home/main',
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
      {
        path: 'RecommendedTodaySong',
        name: 'RecommendedTodaySong',
        component: () => import('@/pages/RecommendedToday/Song.vue'),
      },
      {
        path: 'PlayListDetail',
        name: 'PlayListDetail',
        component: () => import('@/pages/detail/PlayListDetail.vue'),
      },
      {
        path: 'SingerDetail',
        name: 'SingerDetail',
        component: () => import('@/pages/detail/SingerDetail.vue'),
      },
      {
        path: 'AlbumsDetail',
        name: 'AlbumsDetail',
        component: () => import('@/pages/detail/AlbumsDetail.vue'),
      },
      {
        path: 'Search',
        name: 'Search',
        component: () => import('@/pages/Search.vue'),
        meta: {
          keepAlive: false,
        },
      },
    ],
  },
  {
    path: '/Playing',
    name: 'Playing',
    component: () => import('@/pages/Playing.vue'),
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
