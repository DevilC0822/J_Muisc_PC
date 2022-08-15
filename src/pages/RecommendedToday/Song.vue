<template>
  <section class="RecommendedTodaySong mt-[2rem]">
    <n-space align="center">
      <p>查看历史日推记录</p>
      <n-select
        v-model:value="recommendDate"
        class="history-selcet"
        :options="recommendOptions"
        :on-update:value="selectChange"
      />
      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <svg class="icon text-[3rem]" aria-hidden="true">
            <use xlink:href="#icon-tips"></use>
          </svg>
        </template>
        <span> {{ recommendDesc }} </span>
      </n-tooltip>
    </n-space>
    <div class="mt-[2rem]">
      <n-data-table
        :data="songsList"
        :columns="columns"
        max-height="90rem"
        :loading="dataLoading"
      ></n-data-table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useLoadingBar } from 'naive-ui'
import songApi from '@/service/api/song/main'
import useSongIDArray from '@/hooks/song/useSongIDArray'

const recommendDate = ref('today')
const recommendDesc = ref('您已尊享查看60天内近5次历史日推的特权')
const recommendOptions = ref<{ label: string; value: string }[]>([
  {
    label: '今日',
    value: 'today',
  },
])
const loadingBar = useLoadingBar()
const dataLoading = ref(false)
const columns = [
  {
    title: '歌曲名',
    key: 'name',
  },
  {
    title: '歌手',
    key: 'artist',
  },
]
const songsList = ref<any>([])
const getRecommendedSongs = async () => {
  loadingBar.start()
  dataLoading.value = true
  const res = await songApi.recommendSongs()
  const ids: Array<string> = []
  ;(res as any).data.dailySongs.forEach((item: { id: string }) => {
    ids.push(item.id)
  })
  const result = await useSongIDArray(ids.join(','))
  songsList.value = result
  loadingBar.finish()
  dataLoading.value = false
}
const getHistoryDate = async () => {
  const res = await songApi.historySongsDate()
  if (res.data.dates) {
    res.data.dates.forEach((item: string) => {
      recommendOptions.value.push({
        label: item,
        value: item,
      })
    })
    return
  }
  recommendDesc.value = res.data.noHistoryMessage
}
const getHistoryData = async (date: string) => {
  loadingBar.start()
  dataLoading.value = true
  const res = await songApi.historySongsData({
    date,
  })
  const ids: Array<string> = []
  ;(res as any).data.songs.forEach((item: { id: string }) => {
    ids.push(item.id)
  })
  const result = await useSongIDArray(ids.join(','))
  songsList.value = result
  loadingBar.finish()
  dataLoading.value = false
}
const selectChange = (val: string) => {
  recommendDate.value = val
  if (val === 'today') {
    getRecommendedSongs()
    return
  }
  getHistoryData(val)
}
onBeforeMount(() => {
  getRecommendedSongs()
  getHistoryDate()
})
</script>

<style scoped lang="scss">
.history-selcet {
  min-width: 150px;
}
</style>
