<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue'
const props = defineProps<{
  currentTime: number
  cacheTime: number
  totalTime: number
}>()

const { currentTime, cacheTime, totalTime } = toRefs(props)
const startFormatTime = computed(() => {
  return (
    Math.floor(currentTime.value / 60) + ':' + ((currentTime.value % 60) / 100).toFixed(2).slice(-2)
  )
})
const endFormatTime = computed(() => {
  return (
    Math.floor(totalTime.value / 60) + ':' + ((totalTime.value % 60) / 100).toFixed(2).slice(-2)
  )
})
const proportion = ref('0%')
watch(currentTime, (newValue) => {
  proportion.value = `${(newValue / totalTime.value) * 100}%`
})
const cacheProportion = ref('0%')
watch(cacheTime, (newValue) => {
  cacheProportion.value = `${(newValue / totalTime.value) * 100}%`
})
</script>

<template>
  <div class="progress">
    <div class="cache-progress"></div>
    <div class="time-box">
      <p>{{ startFormatTime }}</p>
      <p>{{ endFormatTime }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.progress {
  position: relative;
  height: 5px;
  margin: 0 30px;
  border-radius: 5px;
  background: #d7e3ef;
  box-shadow: inset 1px 1px 4px #dee0e2, inset -1px -1px 4px #ffffff;
  margin-top: 45px;
}

.progress::before {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: v-bind('proportion');
  height: 5px;
  border-radius: 5px;
  background: linear-gradient(145deg, #a9b5e7, #d2d7fd);
  box-shadow: 1px 1px 4px #dee0e2, -1px -1px 4px #ffffff;
}

.progress::after {
  position: absolute;
  content: '';
  top: 50%;
  left: v-bind('proportion');
  transform: translate(-40%, -50%);
  width: 15px;
  height: 15px;
  border-radius: 20px;
  background: linear-gradient(145deg, #a9b5e7, #d2d7fd);
  box-shadow: 3px 3px 6px #dee0e2, -3px -3px 6px #ffffff;
  cursor: pointer;
}

.cache-progress {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 3px;
}

.cache-progress::after {
  content: '';
  position: absolute;
  width: v-bind('cacheProportion');
  left: v-bind('proportion');
  background-color: #000;
  opacity: 0.1;
  height: 3px;
}

.time-box {
  display: flex;
  justify-content: space-between;
}
</style>
