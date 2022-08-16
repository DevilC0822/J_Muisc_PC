<template>
  <n-layout has-sider class="p-[4rem] box-border">
    <JMemu></JMemu>
    <div style="width: calc(100% - 33.3rem)">
      <JHeader></JHeader>
      <JMain></JMain>
    </div>
  </n-layout>
</template>

<script setup lang="ts">
import JMemu from './JMemu.vue'
import JHeader from './JHeader.vue'
import JMain from './JMain.vue'
import JAslid from './JAside.vue'
import { useMessage } from 'naive-ui'

window.$message = useMessage()
</script>

<style scoped lang="scss"></style>
