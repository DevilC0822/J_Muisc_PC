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
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import useTheme from '@/hooks/useTheme'
import { loginStatus, updateStatus } from '@/hooks/useLoginInfo'

const { theme, changeTheme } = useTheme
updateStatus()
const checkLoginStatus = async () => {
  await updateStatus()
  window.$message.info(`${loginStatus.value}`)
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
