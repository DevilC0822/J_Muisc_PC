<template>
  <section class="Home p-[2rem] flex">
    <div class="w-[98.5rem] main">
      <header class="relative">
        <img :src="mylikePoster" alt="" />
        <p class="absolute top-[8rem] left-[6rem] text-[2.4rem]">每日推荐</p>
        <p class="absolute top-[15rem] left-[6rem] text-[4.8rem] leading-tight">
          YOUR LIked <br />Songs
        </p>
      </header>
      <main class="flex flex-wrap">
        <div
          v-for="(item, index) in playLists"
          :key="item.name"
          :class="index > 3 ? 'mt-[2rem]' : ''"
          class="flex-none w-[25%]"
        >
          <img :src="item.picUrl" alt="" />
          <p class="ml-[2rem] text-[1.6rem]">{{ item.name }}</p>
          <p class="ml-[2rem] text-[1.4rem]">{{ item.author }}</p>
        </div>
      </main>
    </div>
    <JAside></JAside>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import mylikePoster from '@/assets/img/mylikePoster.png'
import playlistPicurl from '@/assets/img/playlistPicurl.png'
import JAside from '@/layout/JAside.vue'

const playLists = ref([
  {
    name: '听着就很快乐的英文歌',
    picUrl: playlistPicurl,
    author: '-柚梨-',
  },
  {
    name: 'Best Melody of the year',
    picUrl: playlistPicurl,
    author: '不加糖的阔落',
  },
  {
    name: 'Patah hati logi',
    picUrl: playlistPicurl,
    author: 'Nidia Meioni',
  },
  {
    name: 'Patah Melody',
    picUrl: playlistPicurl,
    author: 'Patyear',
  },
  {
    name: 'Melody Patyear',
    picUrl: playlistPicurl,
    author: 'Iia Mei',
  },
  {
    name: 'Melody of the',
    picUrl: playlistPicurl,
    author: 'the Melody',
  },
  {
    name: 'Naive UI',
    picUrl: playlistPicurl,
    author: 'Vue 3',
  },
  {
    name: 'Button',
    picUrl: playlistPicurl,
    author: '-按钮-',
  },
])
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
