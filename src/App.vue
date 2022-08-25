<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
      <n-loading-bar-provider>
        <!-- <Main></Main> -->
        <RouterView></RouterView>
        <!-- <n-card>
          <n-space>
            <n-button @click="changeTheme('dark')"> 深色 </n-button>
            <n-button @click="changeTheme('light')"> 浅色 </n-button>
            <n-button @click="checkLoginStatus"> 登录状态 </n-button>
          </n-space>
        </n-card> -->
        <n-card>
          <n-space>
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
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import useTheme from '@/hooks/useTheme'
import { loginStatus, updateStatus } from '@/hooks/useLoginInfo'
import useAudio from './hooks/useAudio'
import { provide, ref } from 'vue'

const { theme, changeTheme } = useTheme
updateStatus()
const checkLoginStatus = async () => {
  await updateStatus()
  window.$message.info(`${loginStatus.value}`)
}
const audio = document.createElement('audio')
audio.controls = true
audio.setAttribute('id', 'audio999')
document.body.appendChild(audio)
const { play, pause, prev, next, changePlayMethod, targetSong, totalTime, songlist } = useAudio()
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
