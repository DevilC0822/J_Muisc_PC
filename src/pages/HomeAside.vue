<template>
  <section class="HomeAside p-[2rem]">
    <header class="flex justify-between items-center">
      <p class="text-[2.4rem] font-bold">音乐制作人</p>
      <p class="text-[1.6rem] cursor-pointer">查看更多></p>
    </header>
    <main>
      <div
        v-for="item in singerList"
        :key="item.name"
        class="flex h-[10rem] mt-[1rem] cursor-pointer"
      >
        <img :src="item.picUrl" alt="" class="w-[8.8rem] h-[8.8rem]" />
        <div class="flex flex-col justify-center ml-[2rem]">
          <p class="font-bold text-[1.8rem]">{{ item.name }}</p>
          <p class="mt-[0.8rem] text-[1.4rem]">{{ item.desc }}</p>
        </div>
      </div>
    </main>
    <!-- <div>
      <Player></Player>
    </div> -->
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import Player from '@/components/Player.vue'
import singerPicurl from '@/assets/img/singerPicurl.png'

const singerList = ref([
  {
    name: 'Jacob Jones',
    desc: '148.4万粉丝·240万播放',
    picUrl: singerPicurl,
  },
  {
    name: 'Kathrn Murhet',
    desc: '76.8万粉丝·180万播放',
    picUrl: singerPicurl,
  },
  {
    name: 'Robert Fox',
    desc: '167.2万粉丝·320万播放',
    picUrl: singerPicurl,
  },
])
</script>

<style scoped lang="scss"></style>
