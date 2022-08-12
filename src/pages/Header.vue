<template>
  <section id="Header">
    <div class="page-contral">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-arrowleft"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-arrowright"></use>
      </svg>
    </div>
    <div class="search-box ml-10">
      <n-input placeholder="搜索" round class="search-input">
        <template #prefix>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-search"></use>
          </svg>
        </template>
      </n-input>
    </div>
    <div class="w-full flex justify-around items-center">
      <div class="features-box">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Bell"></use>
        </svg>
        <svg
          v-if="theme?.name === 'dark'"
          class="icon"
          aria-hidden="true"
          @click="changeTheme('light')"
        >
          <use xlink:href="#icon-yejian"></use>
        </svg>
        <svg v-else class="icon" @click="changeTheme('dark')">
          <use xlink:href="#icon-ziyuan"></use>
        </svg>
        <svg class="icon">
          <use xlink:href="#icon-list"></use>
        </svg>
      </div>
      <div class="time-box ml-[2rem] mb-[-2rem]">
        <n-time :time="nowtime" format="yyyy-MM-dd hh:mm:ss" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import useTheme from '@/hooks/useTheme'

const { theme, changeTheme } = useTheme
const styles = reactive({
  headerBackgroundColor: '#f5f6f8',
  backgroundColor: '#fff',
  color: '#000',
})

watch(
  () => theme.value?.name,
  (val) => {
    if (val) {
      styles.headerBackgroundColor = '#101014'
      styles.backgroundColor = '#000'
      styles.color = '#fff'
      return
    }
    styles.headerBackgroundColor = '#f5f6f8'
    styles.backgroundColor = '#fff'
    styles.color = '#000'
  }
)
// eslint-disable-next-line no-undef
const timer = ref<NodeJS.Timer>()
const nowtime = ref<Date>()
onMounted(() => {
  timer.value = setInterval(() => {
    nowtime.value = new Date()
  }, 1000)
})
</script>

<style scoped lang="scss">
#Header {
  height: 8rem;
  display: flex;
  align-items: center;
  background-color: v-bind('styles.headerBackgroundColor');
  border-radius: 1.6rem;

  .page-contral {
    display: flex;

    .icon {
      cursor: pointer;
      padding: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 5rem;
      background-color: v-bind('styles.backgroundColor');
      color: v-bind('styles.color');
      border-radius: 50%;
      margin-left: 2rem;
    }
  }

  .search-box {
    .icon {
      font-size: 2.4rem;
    }

    .search-input {
      width: 80.7rem;
      height: 6rem;
      border-radius: 5rem;
      :deep(.n-input__input-el) {
        height: 100%;
      }
    }
  }

  .features-box {
    display: flex;

    .icon {
      cursor: pointer;
      padding: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 5rem;
      background-color: v-bind('styles.backgroundColor');
      color: v-bind('styles.color');
      border-radius: 50%;
      margin-left: 2rem;
    }
  }
}
</style>
