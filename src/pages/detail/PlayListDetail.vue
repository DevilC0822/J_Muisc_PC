<template>
  <section class="PlayListDetail mt-[2rem] home-main">
    <div v-if="playlistInfo?.name" class="flex items-center">
      <img :src="playlistInfo.picUrl" class="w-[30rem] h-[30rem] rounded-[1.6rem] shrink-[0]" />
      <div class="ml-[2rem]">
        <p class="font-bold text-[2.4rem] mb-[1rem]">歌单名：{{ playlistInfo.name }}</p>
        <n-ellipsis :line-clamp="4">
          歌单描述：{{ playlistInfo.description }}
          <template #tooltip>
            <div style="text-align: center; width: 100rem">
              {{ playlistInfo.description }}
            </div>
          </template>
        </n-ellipsis>
        <div class="flex items-center mt-[1rem]">
          <p>标签：</p>
          <n-tag v-for="item in playlistInfo.tags" :key="item" type="info" class="mr-[2rem]">
            {{ item }}
          </n-tag>
        </div>
      </div>
    </div>
    <template v-else>
      <div class="flex justify-between items-center">
        <n-skeleton height="30rem" width="30rem" class="rounded-[1.6rem]" />
        <div style="width: calc(100% - 32rem)" class="">
          <n-skeleton text width="20%" />
          <n-skeleton text :repeat="4" />
          <n-skeleton text width="88%" />
          <n-skeleton text width="30%" />
        </div>
      </div>
    </template>
    <div class="songlist-box mt-[2rem]">
      <div class="flex text-[1.6rem] items-center">
        <p class="w-[45rem]">歌曲名</p>
        <p class="text-[1.4rem] w-[35rem]">歌手</p>
      </div>
      <div
        v-for="item in songlist"
        :key="item.name"
        class="flex text-[1.6rem] items-center"
        @click="goPlay(item)"
      >
        <p class="w-[45rem]">{{ item.name }}</p>
        <p class="text-[1.4rem] w-[35rem]">{{ item.artist }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import usePlayListID from '@/hooks/playlist/usePlayListID'
import { useLoadingBar } from 'naive-ui'
import { useStorage } from '@vueuse/core'
interface IPlaylistDetail {
  name: string
  description: string
  picUrl: string
  tags: string[]
}

const loadingBar = useLoadingBar()
const dataLoading = ref(false)
const route = useRoute()

const songlist = ref<any>([])
const playlistInfo = ref<IPlaylistDetail>()
const getsonglist = async (id: string) => {
  window.sessionStorage.setItem('currentPlaylistID', id)
  songlist.value = []
  loadingBar.start()
  dataLoading.value = true
  const res = await usePlayListID(id)
  songlist.value = res.playlistShow
  playlistInfo.value = res.playlistDetail
  loadingBar.finish()
  dataLoading.value = false
}

const router = useRouter()
const goPlay = (song: any) => {
  window.sessionStorage.setItem('songlist', JSON.stringify(songlist.value))
  window.sessionStorage.setItem('targetSong', JSON.stringify(song))
  router.push({
    name: 'Playing',
  })
}
onBeforeMount(() => {
  if (route.params.playlistID) {
    getsonglist(route.params.playlistID as string)
    return
  }
  getsonglist(window.sessionStorage.getItem('currentPlaylistID')!)
})
watch(
  () => route.params.playlistID,
  async (val) => {
    if (val) {
      playlistInfo.value = {
        name: '',
        description: '',
        picUrl: '',
        tags: [],
      }
      getsonglist(val as string)
    }
  }
)
</script>

<style scoped lang="scss"></style>
