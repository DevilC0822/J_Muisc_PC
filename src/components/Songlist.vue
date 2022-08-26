<template>
  <section class="Songlist">
    <n-data-table
      :data="songlist"
      :columns="columns"
      :row-props="rowProps"
      max-height="90rem"
      :loading="dataLoading"
    ></n-data-table>
    <n-pagination
      v-if="pagination"
      v-model:page="pagination.page"
      v-model:page-size="pagination.limit"
      class="mt-[2rem] justify-end"
      :item-count="pagination.total"
      show-size-picker
      :page-sizes="pageSizes"
      :on-update:page="pageChange"
      :on-update:page-size="pageSizeChange"
    />
  </section>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'

interface ISong {
  artist: string
  id: number
  name: string
  picurl: string
  playurl: string
}
interface Props {
  songlist: ISong[]
  dataLoading: boolean
  pagination?: any
}
const pageSizes = [
  {
    label: '10 每页',
    value: 10,
  },
  {
    label: '20 每页',
    value: 20,
  },
  {
    label: '30 每页',
    value: 30,
  },
  {
    label: '40 每页',
    value: 40,
  },
]
const emit = defineEmits(['pageChange', 'pageSizeChange'])
const pageChange = (val: number) => {
  emit('pageChange', val)
}
const pageSizeChange = (val: number) => {
  emit('pageSizeChange', val)
}

const props = defineProps<Props>()
const { songlist, dataLoading, pagination } = toRefs(props)
console.log(pagination)
const router = useRouter()

const columns = [
  {
    title: '歌曲名',
    key: 'name',
  },
  {
    title: '歌手',
    key: 'artist',
  },
]
const rowProps = (row: ISong) => {
  return {
    style: 'cursor: pointer;',
    onClick: () => {
      window.sessionStorage.setItem('songlist', JSON.stringify(songlist.value))
      window.sessionStorage.setItem('targetSong', JSON.stringify(row))
      router.push({
        name: 'Playing',
      })
    },
  }
}
</script>

<style scoped lang="scss"></style>
