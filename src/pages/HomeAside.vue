<template>
  <section class="HomeAside p-[2rem]">
    <header class="flex justify-between items-center">
      <p class="text-[2.4rem] font-bold">热门歌手</p>
      <p class="text-[1.6rem] cursor-pointer" @click="checkMore">查看更多></p>
    </header>
    <main>
      <div
        v-for="item in singerlist"
        :key="item.name"
        class="flex h-[10rem] mt-[1rem] cursor-pointer"
        @click="goDetail(item.id)"
      >
        <img :src="item.picUrl" alt="" class="w-[8.8rem] h-[8.8rem] rounded-[1.6rem]" />
        <div class="flex flex-col justify-center ml-[2rem]">
          <p class="font-bold text-[1.8rem]">{{ item.name }}</p>
          <p class="mt-[0.8rem] text-[1.4rem]">粉丝数：{{ item.fansCount }}</p>
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

const singerlist = ref()

const router = useRouter()
const goDetail = (id: string) => {
  router.push({
    name: 'SingerDetail',
    params: {
      singerID: id,
    },
  })
}

const checkMore = () => {
  router.push({
    name: 'Singer',
  })
}

onBeforeMount(async () => {
  const res = await useSinger(3)
  singerlist.value = res.singerlist
})
</script>

<style scoped lang="scss"></style>
