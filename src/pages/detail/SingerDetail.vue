<template>
  <section class="PlayListDetail mt-[2rem] home-main">
    <div v-if="singerDetail?.name" class="flex items-center">
      <img :src="singerDetail.picUrl" class="w-[30rem] h-[30rem] rounded-[1.6rem] shrink-[0]" />
      <div class="ml-[2rem]">
        <p class="font-bold text-[2.4rem] mb-[1rem]">歌手名：{{ singerDetail.name }}</p>
        <n-ellipsis :line-clamp="4">
          歌手简介：{{ singerDetail.description }}
          <template #tooltip>
            <div style="text-align: center; width: 100rem">
              {{ singerDetail.description }}
            </div>
          </template>
        </n-ellipsis>
        <div class="flex items-center mt-[1rem]">
          <p>标签：</p>
          <n-tag v-for="item in singerDetail.tags" :key="item" type="info" class="mr-[2rem]">
            {{ item }}
          </n-tag>
        </div>
      </div>
    </div>
    <template v-else>
      <div class="flex justify-between items-center">
        <n-skeleton height="30rem" width="30rem" class="rounded-[1.6rem]" />
        <div style="width: calc(100% - 32rem)" class="">
          <n-skeleton text width="20%" />
          <n-skeleton text :repeat="4" />
          <n-skeleton text width="88%" />
          <n-skeleton text width="30%" />
        </div>
      </div>
    </template>
    <SingerAlbums
      v-if="singerDetail?.name"
      :singer-id="singerDetail?.id"
      :singer-name="singerDetail?.name!"
    ></SingerAlbums>
    <p class="text-[3.6rem] font-bold mt-[2rem]">{{ singerDetail?.name! }}的单曲</p>
    <div>
      <Songlist :songlist="songlist" :data-loading="dataLoading"></Songlist>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLoadingBar } from 'naive-ui'
import useSingerID from '@/hooks/singer/useSingerID'
import SingerAlbums from '@/components/SingerAlbums.vue'
import Songlist from '@/components/Songlist.vue'

interface ISingerDetail {
  name: string
  description: string
  picUrl: string
  tags: string[]
  id: string
}

const loadingBar = useLoadingBar()
const dataLoading = ref(false)
const route = useRoute()

const songlist = ref<any>([])
const singerDetail = ref<ISingerDetail>()
const getInfo = async (id: string) => {
  window.sessionStorage.setItem('currentSingerID', id)
  songlist.value = []
  loadingBar.start()
  dataLoading.value = true
  const res = await useSingerID(id)
  songlist.value = res.songlistShow
  singerDetail.value = res.singerDetail
  loadingBar.finish()
  dataLoading.value = false
}
onBeforeMount(() => {
  if (route.params.singerID) {
    getInfo(route.params.singerID as string)
    return
  }
  getInfo(window.sessionStorage.getItem('keywords')!)
})
watch(
  () => route.params.singerID,
  async (val) => {
    if (val) {
      singerDetail.value = {
        name: '',
        description: '',
        picUrl: '',
        tags: [],
        id: '',
      }
      getInfo(val as string)
    }
  }
)
</script>

<style scoped lang="scss"></style>
