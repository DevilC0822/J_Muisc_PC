<template>
  <n-card>
    <n-space>
      <n-button @click="router.push({ name: 'Main' })"> 首页 </n-button>
      <n-button @click="play"> 播放 </n-button>
      <n-button @click="pause"> 暂停 </n-button>
      <n-button @click="prev"> perv </n-button>
      <n-button @click="next"> next </n-button>
      <n-button @click="changePlayMethod"> changePlayMethod </n-button>
      <p>{{ targetSong.name }}</p>
      <p>{{ totalTime }}</p>
      <p v-for="i in songlist" :key="i.name">{{ i.name }}</p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import useAudio from '@/hooks/useAudio'
import { useRouter } from 'vue-router'

const router = useRouter()
const { play, pause, prev, next, changePlayMethod, targetSong, totalTime, songlist } = useAudio()
songlist.value = JSON.parse(window.sessionStorage.getItem('songlist')!)
songlist.value.forEach((i, index) => {
  i.sort = index + 1
})
targetSong.value = JSON.parse(window.sessionStorage.getItem('targetSong')!)
targetSong.value.sort = songlist.value.findIndex((i) => i.id === targetSong.value.id!) + 1
</script>

<style scoped lang="scss"></style>
