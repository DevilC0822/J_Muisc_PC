<template>
  <section id="Header">
    <div class="page-contral">
      <svg class="icon" aria-hidden="true" @click="arrowLeftClick">
        <use xlink:href="#icon-arrowleft"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="arrowRightClick">
        <use xlink:href="#icon-arrowright"></use>
      </svg>
    </div>
    <div class="search-box ml-10">
      <n-popselect
        v-model:value="keywords"
        style="width: 73rem"
        :options="options"
        trigger="click"
        :on-update:value="popselectChange"
      >
        <n-input
          v-model:value="keywords"
          :placeholder="showKeyword"
          round
          class="search-input"
          @keyup.enter="search"
        >
          <template #prefix>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-search"></use>
            </svg>
          </template>
        </n-input>
      </n-popselect>
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
        <p>{{ currentTime }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref, watch } from 'vue'
import useTheme from '@/hooks/useTheme'
import { useRouter } from 'vue-router'
import { useDateFormat, useNow } from '@vueuse/core'
import searchApi from '@/service/api/search/main'

const keywords = ref('')
const currentTime = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
const { theme, changeTheme } = useTheme
const styles = reactive({
  headerBackgroundColor: '#f5f6f8',
  backgroundColor: '#fff',
  color: '#000',
})

const router = useRouter()
const arrowLeftClick = () => {
  router.back()
}
const arrowRightClick = () => {
  router.forward()
}
const search = () => {
  if (keywords.value === '') {
    keywords.value = realkeyword.value
  }
  router.push({
    name: 'Search',
    params: {
      keywords: keywords.value,
    },
  })
}

const showKeyword = ref('')
const realkeyword = ref('')
const getDefaultKeywords = async () => {
  const res = await searchApi.searchKeywordsDefault()
  showKeyword.value = res.data.showKeyword
  realkeyword.value = res.data.realkeyword
}

const getHotKeywordslist = async () => {
  const res = await searchApi.searchKeywordsHot()
  console.log(res)
  options.value = []
  res.result.hots.forEach((item: { first: any }) => {
    options.value.push({
      label: item.first,
      value: item.first,
    })
  })
}
const options = ref([
  {
    label: 'Drive My Car',
    value: 'Drive My Car',
  },
])
const popselectChange = (val: string) => {
  keywords.value = val
  search()
}
onBeforeMount(async () => {
  getDefaultKeywords()
  getHotKeywordslist()
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
