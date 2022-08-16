<template>
  <section class="HomeAside p-[2rem]">
    <header class="flex justify-between items-center">
      <p class="text-[2.4rem] font-bold">热门歌手</p>
      <p class="text-[1.6rem] cursor-pointer" @click="checkMoreSinger">查看更多></p>
    </header>
    <main>
      <div
        v-for="item in singerlist"
        :key="item.name"
        class="flex h-[10rem] mt-[1rem] cursor-pointer"
        @click="goSingerDetail(item.id)"
      >
        <img :src="item.picUrl" alt="" class="w-[8.8rem] h-[8.8rem] rounded-[1.6rem]" />
        <div class="flex flex-col justify-center ml-[2rem]">
          <p class="font-bold text-[1.8rem]">{{ item.name }}</p>
          <p class="mt-[0.8rem] text-[1.4rem]">粉丝数：{{ item.fansCount }}</p>
        </div>
      </div>
    </main>
    <header class="flex justify-between items-center mt-[2rem]">
      <p class="text-[2.4rem] font-bold">最新专辑</p>
      <p class="text-[1.6rem] cursor-pointer" @click="checkMoreAlbums">查看更多></p>
    </header>
    <main>
      <div
        v-for="item in albumslist"
        :key="item.name"
        class="flex h-[10rem] mt-[1rem] cursor-pointer"
        @click="goAlbumsDetail(item.id)"
      >
        <img :src="item.picUrl" alt="" class="w-[8.8rem] h-[8.8rem] rounded-[1.6rem]" />
        <div class="flex flex-col justify-center ml-[2rem]">
          <p class="font-bold text-[1.8rem]">{{ item.name }}</p>
          <p class="mt-[0.8rem] text-[1.4rem]">发行时间：{{ item.publishTime }}</p>
        </div>
      </div>
    </main>
    <!-- <div>
      <Player></Player>
    </div> -->
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
// import Player from '@/components/Player.vue'
import useSinger from '@/hooks/singer/useSinger'
import { useRouter } from 'vue-router'
import useAlbums from '@/hooks/albums/useAlbums'

const singerlist = ref()

const router = useRouter()
const goSingerDetail = (id: string) => {
  router.push({
    name: 'SingerDetail',
    params: {
      singerID: id,
    },
  })
}

const checkMoreSinger = () => {
  router.push({
    name: 'Singer',
  })
}
const albumslist = ref<any>([])
onBeforeMount(async () => {
  const res = await useSinger(3)
  singerlist.value = res.singerlist
  const resAlbums = await useAlbums()
  albumslist.value = resAlbums.albumslist.slice(0, 3)
})
const checkMoreAlbums = () => {
  router.push({
    name: 'Albums',
  })
}
const goAlbumsDetail = (id: string) => {
  router.push({
    name: 'AlbumsDetail',
    params: {
      albumsID: id,
    },
  })
}
</script>

<style scoped lang="scss"></style>
