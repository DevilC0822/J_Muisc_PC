<script setup lang="ts">
import Progress from './Progress.vue'
import useIDGetInfo from '@/hooks/useIDGetInfo'
import { onBeforeMount, reactive, Ref, ref, watch } from 'vue'
import defaultAvatar from '@/assets/img/defaultAvatar.png'

const ids = [
  '1477405484',
  '421934564',
  '1414849990',
  '1880894132',
  '512733081',
  '1363476321',
  '1407242933',
  '509720124',
]
interface ISong {
  name: string
  artist: string
  playurl: string
  picurl: string
}
const targetSongID = ref(ids[0])
const targetStatus = ref(false)
const targetSong: ISong = reactive({
  name: '暂无歌曲播放',
  artist: 'none',
  playurl: '',
  picurl: defaultAvatar,
})
onBeforeMount(async () => {
  ;(async function init() {
    const res = await useIDGetInfo(targetSongID.value)
    songAssign(res!)
  })()
})
const songAssign = (song: ISong) => {
  targetSong.name = song.name
  targetSong.artist = song.artist
  targetSong.playurl = song.playurl
  targetSong.picurl = song.picurl
}
const prev = () => {
  if (ids.indexOf(targetSongID.value) === 0) {
    targetSongID.value = ids[ids.length - 1]
  } else {
    targetSongID.value = ids[ids.indexOf(targetSongID.value) - 1]
  }
  targetStatus.value = false
}
const next = () => {
  if (ids.indexOf(targetSongID.value) === ids.length - 1) {
    targetSongID.value = ids[0]
  } else {
    targetSongID.value = ids[ids.indexOf(targetSongID.value) + 1]
  }
  targetStatus.value = false
}
watch(targetSongID, async (newValue) => {
  console.log(newValue)
  const res = await useIDGetInfo(newValue)
  console.log(res)
  songAssign(res!)
})
const canplay = () => {
  totalTime.value = myAduio.value.duration
}
const ended = () => {
  next()
}
const myAduio: Ref<HTMLAudioElement> = ref(null as unknown as HTMLAudioElement)
const pause = () => {
  targetStatus.value = false
}
const play = () => {
  targetStatus.value = true
}
watch(targetStatus, async (newValue) => {
  if (newValue) {
    myAduio.value.play()
  } else {
    myAduio.value.pause()
  }
})
const currentTime = ref(0)
const totalTime = ref(0)
const timeupdate = () => {
  currentTime.value = myAduio.value.currentTime
}
</script>

<template>
  <div class="main">
    <div class="soft-phone">
      <div class="rotary">
        <img v-if="targetSong.picurl !== ''" :src="targetSong.picurl" alt="" />
      </div>
      <div style="font-size: 20px">{{ targetSong.name }}</div>
      <div style="font-size: 14px; font-weight: 500; color: #a2adbe; margin: 10px">
        {{ targetSong.artist }}
      </div>

      <Progress :current-time="currentTime" :total-time="totalTime"></Progress>
      <div class="tool">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-suijibofang01"></use>
        </svg>
        <div class="flex justify-around w-[50%]">
          <svg class="icon" aria-hidden="true" @click="prev">
            <use xlink:href="#icon-shangyiqu"></use>
          </svg>
          <svg v-if="targetStatus" class="icon" aria-hidden="true" @click="pause">
            <use xlink:href="#icon-a-zantingyinle"></use>
          </svg>
          <svg v-else class="icon" aria-hidden="true" @click="play">
            <use xlink:href="#icon-bofangyinle"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="next">
            <use xlink:href="#icon-xiayiqu"></use>
          </svg>
        </div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofangliebiao"></use>
        </svg>
      </div>
    </div>
  </div>

  <audio
    ref="myAduio"
    :src="targetSong.playurl"
    class="myAduio"
    @canplay="canplay"
    @ended="ended"
    @timeupdate="timeupdate"
  ></audio>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.soft-phone {
  width: 40rem;
  height: 55rem;
  border-radius: 6rem;
  // box-shadow: 1.5rem 1.5rem 3rem #dee0e2, -1.5rem -1.5rem 3rem #ffffff;
}
.rotary {
  width: 22rem;
  height: 22rem;
  margin: 2rem auto 4.5rem;
  // box-shadow: 2.1rem 2.1rem 4.3rem #dee0e2, -2.1rem -2.1rem 4.3 rem#ffffff;
  img {
    border-radius: 5rem;
    width: 100%;
    height: 100%;
  }
}
.tool {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4.5rem 3rem;
  padding: 4.5rem;
  .icon {
    font-size: 3.2rem;
  }
}
.myAduio {
  opacity: 0;
}
</style>
