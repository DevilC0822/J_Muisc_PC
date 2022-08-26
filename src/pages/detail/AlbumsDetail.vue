<template>
  <section class="AlbumsDetail mt-[2rem] home-main">
    <div v-if="albumsInfo?.name" class="flex items-center">
      <img :src="albumsInfo.picUrl" class="w-[30rem] h-[30rem] rounded-[1.6rem] shrink-[0]" />
      <div class="ml-[2rem]">
        <p class="font-bold text-[2.4rem] mb-[1rem]">专辑名：{{ albumsInfo.name }}</p>
        <n-ellipsis :line-clamp="4">
          专辑描述：{{ albumsInfo.desc }}
          <template #tooltip>
            <div style="text-align: center; width: 100rem">
              {{ albumsInfo.desc }}
            </div>
          </template>
        </n-ellipsis>
        <div class="flex items-center mt-[1rem]">发行公司：{{ albumsInfo.company }}</div>
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
    <div class="mt-[2rem]">
      <Songlist :songlist="songlist" :data-loading="dataLoading"></Songlist>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useAlbumsID from '@/hooks/albums/useAlbumsID'
import { useLoadingBar } from 'naive-ui'
import Songlist from '@/components/Songlist.vue'

interface IAlbumsDetail {
  commentCount: number // 评论数
  shareCount: number // 分享数
  subCount: number // 订阅数
  name: string
  desc: string
  picUrl: string
  id: string
  company: string
  singer: string
}

const loadingBar = useLoadingBar()
const dataLoading = ref(false)
const route = useRoute()

const songlist = ref<any>([])
const albumsInfo = ref<IAlbumsDetail>()
const getsonglist = async (id: string) => {
  window.sessionStorage.setItem('currentAlbumsID', id)
  songlist.value = []
  loadingBar.start()
  dataLoading.value = true
  const res = await useAlbumsID(id)
  songlist.value = res.songlistShow
  albumsInfo.value = res.albumsDynamicDetail
  loadingBar.finish()
  dataLoading.value = false
}
onBeforeMount(() => {
  if (route.params.albumsID) {
    getsonglist(route.params.albumsID as string)
    return
  }
  getsonglist(window.sessionStorage.getItem('currentAlbumsID')!)
})
watch(
  () => route.params.albumsID,
  async (val) => {
    if (val) {
      albumsInfo.value = {
        commentCount: 0,
        shareCount: 0,
        subCount: 0,
        name: '',
        desc: '',
        picUrl: '',
        id: '',
        company: '',
        singer: '',
      }
      getsonglist(val as string)
    }
  }
)
</script>

<style scoped lang="scss"></style>
