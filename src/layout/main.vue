<template>
  <n-layout has-sider class="p-[4rem] box-border">
    <JMemu></JMemu>
    <n-layout>
      <n-layout-header>
        <JHeader></JHeader>
      </n-layout-header>
      <n-layout-content>
        <n-layout has-sider>
          <n-layout-content>
            <JMain></JMain>
          </n-layout-content>
        </n-layout>
      </n-layout-content>
    </n-layout>
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
