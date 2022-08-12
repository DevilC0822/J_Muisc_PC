<template>
  <section class="PlayListDetail">
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
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import usePlayListID from '@/hooks/playlist/usePlayListID'
import { useLoadingBar } from 'naive-ui'

const loadingBar = useLoadingBar()
const dataLoading = ref(false)
const route = useRoute()

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
watch(
  () => route.params.id,
  async (val) => {
    if (val) {
      songsList.value = []
      loadingBar.start()
      dataLoading.value = true
      const res = await usePlayListID(route.params.id as string)
      songsList.value = res
      loadingBar.finish()
      dataLoading.value = false
    }
  },
  {
    immediate: true,
  }
)
</script>

<style scoped lang="scss"></style>
