<template>
  <section class="mt-[2rem]">
    <Songlist
      :pagination="paginationData"
      :songlist="songlist"
      :data-loading="dataLoading"
      @page-change="pageChange"
      @page-size-change="pageSizeChange"
    ></Songlist>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
import searchApi from '@/service/api/search/main'
import useSongIDArray from '@/hooks/song/useSongIDArray'
import { useLoadingBar } from 'naive-ui'
import Songlist from '@/components/Songlist.vue'

interface ISong {
  name: string
  artist: string
  picurl: string
  id: string
  playurl: string
}
const route = useRoute()
const loadingBar = useLoadingBar()
const dataLoading = ref(false)
const paginationData = ref({
  page: 1,
  limit: 10,
  offset: 0,
  total: 0,
})
const songlist = ref<any>([])
const getInfo = async (keywords: string) => {
  window.sessionStorage.setItem('keywords', keywords)
  const res = await searchApi.search({
    keywords,
    limit: paginationData.value.limit,
    offset: paginationData.value.offset,
  })
  if (res.code !== 200) return
  if (!res.result.songs) {
    window.$message.error('出错了')
    pageChange(1)
    return
  }
  paginationData.value.total = res.result.songCount
  loadingBar.start()
  dataLoading.value = true
  const songslistIds: string[] = []
  res.result.songs.forEach((item: { id: string }) => {
    songslistIds.push(item.id)
  })
  songlist.value = await useSongIDArray(songslistIds.join(','))
  loadingBar.finish()
  dataLoading.value = false
}

const pageChange = (page: number) => {
  paginationData.value.page = page
  paginationData.value.offset = (page - 1) * paginationData.value.limit
  if (route.params.keywords) {
    getInfo(route.params.keywords as string)
    return
  }
  getInfo(window.sessionStorage.getItem('keywords')!)
}
const pageSizeChange = (pageSize: number) => {
  paginationData.value.limit = pageSize
  paginationData.value.offset = 0
  paginationData.value.page = 1
  if (route.params.keywords) {
    getInfo(route.params.keywords as string)
    return
  }
  getInfo(window.sessionStorage.getItem('keywords')!)
}
onBeforeMount(() => {
  if (route.params.keywords) {
    getInfo(route.params.keywords as string)
    return
  }
  getInfo(window.sessionStorage.getItem('keywords')!)
})
watch(
  () => route.params.keywords,
  async (val) => {
    if (val) {
      getInfo(val as string)
    }
  }
)
</script>

<style scoped lang="scss"></style>
