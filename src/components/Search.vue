<template>
  <n-input v-model:value="keyWords" class="mt-1" type="text" placeholder="keywords" />
  <div class="mt-1">
    <n-button type="primary" @click="searchBtnClick"> 搜索 </n-button>
  </div>
  <n-list v-if="songList.length" bordered class="mt-2">
    <template #header> {{ keyWords }} 的搜索结果 </template>
    <n-list-item v-for="item in songList" :key="item.id">
      <p>{{ item.name }}</p>
    </n-list-item>
  </n-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { search } from '@/service/api/search/main'

interface ISong {
  id: number
  name: string
}
const keyWords = ref('')
const songList = ref<ISong[]>([])
const searchBtnClick = async () => {
  const res = await search({
    keywords: keyWords.value,
  })
  if (res.code !== 200) return
  songList.value = res.result.songs
}
</script>

<style lang="scss"></style>
