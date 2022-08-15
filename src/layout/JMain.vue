<template>
  <div class="header min-h-[92rem] box-border">
    <!-- <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <div :key="(route.name as string)">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </div>
      </transition>
    </router-view> -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route)
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
