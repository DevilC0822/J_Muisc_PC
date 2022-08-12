<template>
  <section class="Home p-[2rem] flex">
    <div class="w-[98.5rem] main">
      <header class="relative cursor-pointer">
        <img :src="mylikePoster" alt="" />
        <p class="absolute top-[8rem] left-[6rem] text-[2.4rem]">每日推荐</p>
        <p class="absolute top-[15rem] left-[6rem] text-[4.8rem] leading-tight">
          YOUR LIked <br />Songs
        </p>
      </header>
      <main class="flex flex-wrap justify-between">
        <div
          v-for="(item, index) in playLists"
          :key="item.name"
          :class="index > 3 ? 'mt-[2rem]' : ''"
          class="flex-none w-[23%] relative cursor-pointer"
          @click="goDetail(item.id)"
        >
          <img :src="item.coverImgUrl" alt="" class="rounded-[1.6rem]" />
          <n-ellipsis :line-clamp="2">
            <p class="mt-[1rem] text-[1.6rem]">{{ item.name }}</p>
          </n-ellipsis>
          <p
            class="play-count absolute top-[1rem] left-[1rem] bg-[#3c3d41] px-[1rem] rounded-[1.6rem]"
          >
            <span class="text-[#fff]">{{ numChange(item.playCount) }}</span>
          </p>
        </div>
      </main>
    </div>
    <JAside></JAside>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import mylikePoster from '@/assets/img/mylikePoster.png'
import JAside from '@/layout/JAside.vue'
import usePlayList from '@/hooks/playlist/usePlayList'
import { useRouter } from 'vue-router'
import { numChange } from '@/utils/main'

const playLists = ref<any>([])
onBeforeMount(async () => {
  const res = await usePlayList(8)
  playLists.value = res.playList
})

const router = useRouter()
const goDetail = (id: string) => {
  router.push({
    name: 'PlayListDetail',
    params: {
      id,
    },
  })
}
</script>

<style scoped lang="scss">
.Home {
  .main {
    max-height: 92rem;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
