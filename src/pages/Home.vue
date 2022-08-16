<template>
  <section class="Home p-[2rem] flex home-main">
    <div class="w-[98.5rem] main">
      <header
        v-if="loginStatus"
        class="relative cursor-pointer"
        @click="router.push({ name: 'RecommendedTodaySong' })"
      >
        <img :src="mylikePoster" alt="" />
        <p class="absolute top-[8rem] left-[6rem] text-[2.4rem]">每日推荐</p>
        <p class="absolute top-[15rem] left-[6rem] text-[4.8rem] leading-tight">
          YOUR LIked <br />Songs
        </p>
      </header>
      <header v-else class="relative cursor-pointer" @click="showLoginModal = true">
        <img :src="mylikePoster" alt="" />
        <p class="absolute top-[15rem] left-[6rem] text-[3.2rem] leading-tight">
          登录获取更多精彩内容
        </p>
      </header>
      <p class="text-[3.6rem] font-bold mb-[2rem]">热门歌单</p>
      <main class="flex flex-wrap justify-between">
        <div
          v-for="(item, index) in playLists"
          :key="item.name"
          :class="index > 3 ? 'mt-[2rem]' : ''"
          class="flex-none w-[23%] relative cursor-pointer"
          @click="goDetail(item.id)"
        >
          <img :src="item.picUrl" alt="" class="rounded-[1.6rem]" />
          <n-ellipsis :line-clamp="2">
            <p class="mt-[1rem] text-[1.6rem]">{{ item.name }}</p>
          </n-ellipsis>
          <p
            class="play-count absolute top-[1rem] left-[1rem] bg-[#3c3d41] px-[1rem] rounded-[1.6rem]"
          >
            <span class="text-[#fff]">{{ item.playCount }}</span>
          </p>
        </div>
      </main>
    </div>
    <JAside></JAside>
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
import { onBeforeMount, ref } from 'vue'
import mylikePoster from '@/assets/img/mylikePoster.png'
import JAside from '@/layout/JAside.vue'
import usePlayList from '@/hooks/playlist/usePlayList'
import { useRouter } from 'vue-router'
import MyLogin from './MyLogin.vue'
import { loginStatus } from '@/hooks/useLoginInfo'

const playLists = ref<any>([])
const showLoginModal = ref(false)
onBeforeMount(async () => {
  const res = await usePlayList(8)
  playLists.value = res.playList
})

const router = useRouter()
const goDetail = (id: string) => {
  router.push({
    name: 'PlayListDetail',
    params: {
      playlistID: id,
    },
  })
}
</script>

<style scoped lang="scss"></style>
