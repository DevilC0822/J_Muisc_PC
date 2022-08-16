<template>
  <section class="Singer home-main mt-[2rem]">
    <div class="flex flex-col">
      <n-radio-group
        v-model:value="initialValue"
        name="initial"
        :on-update:value="initialValueChange"
      >
        <n-space align="center">
          <span>歌手名首字符：</span>
          <n-radio-button
            v-for="initialItem in initialList"
            :key="initialItem.value"
            :value="initialItem.value"
          >
            {{ initialItem.label }}
          </n-radio-button>
        </n-space>
      </n-radio-group>
      <n-radio-group
        v-model:value="typeValue"
        name="type"
        class="mt-[2rem]"
        :on-update:value="typeValueChange"
      >
        <n-space align="center">
          <span>歌手类别：</span>
          <n-radio-button
            v-for="typeItem in typeList"
            :key="typeItem.value"
            :value="typeItem.value"
          >
            {{ typeItem.label }}
          </n-radio-button>
        </n-space>
      </n-radio-group>
      <n-radio-group
        v-model:value="areaValue"
        name="area"
        class="mt-[2rem]"
        :on-update:value="areaValueChange"
      >
        <n-space align="center">
          <span>歌手范围：</span>
          <n-radio-button
            v-for="areaItem in areaList"
            :key="areaItem.value"
            :value="areaItem.value"
          >
            {{ areaItem.label }}
          </n-radio-button>
        </n-space>
      </n-radio-group>
    </div>
    <main class="mt-[2rem]">
      <div v-if="loading" class="text-center my-[20rem]">
        <n-spin size="large" />
      </div>
      <div v-else class="flex flex-wrap justify-between">
        <div
          v-for="(item, index) in singerlist"
          :key="item.id"
          class="w-[18%] cursor-pointer"
          :class="index >= 5 ? 'mt-[2rem]' : ''"
          @click="goSingerDetail(item.id)"
        >
          <img :src="item.picUrl" alt="" class="rounded-[1.6rem] w-[25rem] h-[25rem]" />
          <p>{{ item.name }}</p>
        </div>
      </div>
      <div class="text-right flex justify-end mt-[2rem]">
        <n-button
          :disabled="paginationData.offset <= 0"
          style="margin-right: 2rem"
          @click="prevPage"
          >上一页</n-button
        >
        <n-select
          v-model:value="paginationData.limit"
          style="width: 15rem; margin: 0 2rem; text-align: center"
          :options="pageSizeSelect"
        />
        <n-button :disabled="nextBtnStatus" @click="nextPage">下一页</n-button>
      </div>
    </main>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import singerApi from '@/service/api/singer/main'
import { useRouter } from 'vue-router'

interface ISinglist {
  name: string
  id: string
  picUrl: string
}
const loading = ref(false)
const singerlist = ref<ISinglist[]>()

const initialValue = ref('a')
const initialList = ref([
  {
    value: 'a',
    label: 'a',
  },
  {
    value: 'b',
    label: 'b',
  },
  {
    value: 'c',
    label: 'c',
  },
  {
    value: 'd',
    label: 'd',
  },
  {
    value: 'e',
    label: 'e',
  },
  {
    value: 'f',
    label: 'f',
  },
  {
    value: 'g',
    label: 'g',
  },
  {
    value: 'h',
    label: 'h',
  },
  {
    value: 'i',
    label: 'i',
  },
  {
    value: 'j',
    label: 'j',
  },
  {
    value: 'k',
    label: 'k',
  },
  {
    value: 'l',
    label: 'l',
  },
  {
    value: 'm',
    label: 'm',
  },
  {
    value: 'n',
    label: 'n',
  },
  {
    value: 'o',
    label: 'o',
  },
  {
    value: 'p',
    label: 'p',
  },
  {
    value: 'q',
    label: 'q',
  },
  {
    value: 'r',
    label: 'r',
  },
  {
    value: 's',
    label: 's',
  },
  {
    value: 't',
    label: 't',
  },
  {
    value: 'u',
    label: 'u',
  },
  {
    value: 'v',
    label: 'v',
  },
  {
    value: 'w',
    label: 'w',
  },
  {
    value: 'x',
    label: 'x',
  },
  {
    value: 'y',
    label: 'y',
  },
  {
    value: 'z',
    label: 'z',
  },
  {
    value: '-1',
    label: '热门',
  },
  {
    value: '0',
    label: '特殊字符',
  },
])

const typeValue = ref(-1)
const typeList = ref([
  {
    value: -1,
    label: '全部',
  },
  {
    value: 1,
    label: '男歌手',
  },
  {
    value: 2,
    label: '女歌手',
  },
  {
    value: 3,
    label: '乐队',
  },
])

const areaValue = ref(-1)
const areaList = ref([
  {
    value: -1,
    label: '全部',
  },
  {
    value: 7,
    label: '华语',
  },
  {
    value: 96,
    label: '欧美',
  },
  {
    value: 8,
    label: '日本',
  },
  {
    value: 16,
    label: '韩国',
  },
  {
    value: 0,
    label: '其他',
  },
])

const paginationData = ref({
  limit: 10,
  offset: 0,
})
const getSingerlist = async () => {
  loading.value = true
  const res = await singerApi.singerCategory({
    limit: paginationData.value.limit,
    offset: paginationData.value.offset,
    initial: initialValue.value,
    type: typeValue.value,
    area: areaValue.value,
  })
  singerlist.value = res.artists
  loading.value = false
  if (res.more) {
    nextBtnStatus.value = false
  } else {
    nextBtnStatus.value = true
  }
}
const prevPage = () => {
  paginationData.value = {
    limit: paginationData.value.limit,
    offset:
      (paginationData.value.offset -= paginationData.value.limit) <= 0
        ? 0
        : paginationData.value.offset,
  }
  getSingerlist()
}
const nextBtnStatus = ref(false)
const nextPage = () => {
  paginationData.value = {
    limit: paginationData.value.limit,
    offset: (paginationData.value.offset += paginationData.value.limit),
  }
  getSingerlist()
}

const initialValueChange = (val: string) => {
  initialValue.value = val
  getSingerlist()
}
const typeValueChange = (val: number) => {
  typeValue.value = val
  getSingerlist()
}
const areaValueChange = (val: number) => {
  areaValue.value = val
  getSingerlist()
}

const pageSizeSelect = ref([
  {
    label: '5',
    value: 5,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '15',
    value: 15,
  },
  {
    label: '20',
    value: 20,
  },
  {
    label: '30',
    value: 30,
  },
])

const router = useRouter()
const goSingerDetail = (id: string) => {
  router.push({
    name: 'SingerDetail',
    params: {
      singerID: id,
    },
  })
}

onBeforeMount(() => {
  getSingerlist()
})

watch(
  () => paginationData.value.limit,
  () => {
    getSingerlist()
  }
)
</script>

<style scoped lang="scss"></style>
