<template>
  <section
    class="left-memu w-[calc(100%-2rem)] h-full box-border p-[2rem] border border-slate-300 border-solid rounded-[1.6rem]"
  >
    <n-avatar style="border-radius: 1.6rem" :size="100" :src="userInfo.avatarUrl" />
    <div v-if="loginStatus">
      <p class="text-[1.6rem]">Hello</p>
      <p class="text-[2.4rem] font-bold">{{ userInfo.nickname }}</p>
    </div>
    <div v-else>
      <p class="text-[1.4rem]" @click="showLoginModal = true">登录获取更多精彩内容</p>
    </div>
    <div class="memu-item find-music">
      <p class="title">发现音乐</p>
      <div
        v-for="item in MenuList.filter((item) => item.category === 'findMusic')"
        :key="item.name"
        :class="item.isActive ? 'active' : ''"
        class="child-item"
        @click="gpPages(item.routerPath)"
      >
        <i :class="item.icon" class="iconfont"></i>
        <p>{{ item.name }}</p>
      </div>
    </div>
    <div class="memu-item my-music">
      <p class="title">我的音乐</p>
      <div
        v-for="item in MenuList.filter((item) => item.category === 'myMusic')"
        :key="item.name"
        :class="item.isActive ? 'active' : ''"
        class="child-item"
        @click="gpPages(item.routerPath)"
      >
        <i :class="item.icon" class="iconfont"></i>
        <p>{{ item.name }}</p>
      </div>
    </div>
    <n-divider />
    <div class="memu-item">
      <div class="child-item">
        <p>每日推荐</p>
      </div>
      <div class="child-item">
        <p>听着就很快乐的英文歌</p>
      </div>
    </div>
  </section>
  <n-modal
    v-model:show="showLoginModal"
    style="width: 600px"
    :bordered="false"
    :mask-closable="false"
    size="huge"
    role="dialog"
    aria-modal="true"
  >
    <MyLogin @close-modal="showLoginModal = false"></MyLogin>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginStatus, userInfo } from '@/hooks/useLoginInfo'
import MyLogin from './MyLogin.vue'

const showLoginModal = ref(false)
const MenuList = ref([
  {
    name: '首页',
    routerPath: '/main',
    icon: 'icon-1_music72',
    isActive: true,
    category: 'findMusic',
  },
  {
    name: '专辑',
    routerPath: '/albums',
    icon: 'icon-music-albums',
    isActive: false,
    category: 'findMusic',
  },
  {
    name: '歌手',
    routerPath: '/singer',
    icon: 'icon-yinlemusic217',
    isActive: false,
    category: 'findMusic',
  },
  {
    name: '播客',
    routerPath: '/podcasts',
    icon: 'icon-a-maikefengyinle',
    isActive: false,
    category: 'findMusic',
  },
  {
    name: '本地与下载',
    routerPath: '/localdownload',
    icon: 'icon-music-player',
    isActive: false,
    category: 'myMusic',
  },
  {
    name: '我喜欢的音乐',
    routerPath: '/mylike',
    icon: 'icon-romantic-music',
    isActive: false,
    category: 'myMusic',
  },
  {
    name: '创建歌单',
    routerPath: '/createplaylists',
    icon: 'icon-add',
    isActive: false,
    category: 'myMusic',
  },
])
const resetActive = () => {
  MenuList.value.forEach((item) => (item.isActive = false))
}
const router = useRouter()
const gpPages = (page: string) => {
  router.push(page)
  resetActive()
  // eslint-disable-next-line prettier/prettier
  const targetIndex = MenuList.value.findIndex((item) => item.routerPath === page)
  if (targetIndex === -1) return
  MenuList.value[targetIndex].isActive = true
}
</script>

<style scoped lang="scss">
.left-memu {
  .memu-item {
    margin-top: 2rem;
    .title {
      font-size: 2rem;
      font-weight: bold;
    }
    .child-item {
      display: flex;
      margin-top: 1rem;
      align-items: center;
      i {
        font-size: 3.6rem;
        color: #b1b1b1;
        margin-bottom: -0.8rem;
      }
      p {
        font-size: 1.8rem;
        margin-left: 1rem;
        color: #b1b1b1;
      }
    }
    .active {
      i,
      p {
        color: $test-color;
      }
    }
  }
}
</style>
