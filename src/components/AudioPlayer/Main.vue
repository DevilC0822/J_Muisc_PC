<template>
  <div class="main">
    <div class="soft-phone">
      <div class="header">
        <slot></slot>
      </div>
      <div class="rotary">
        <img v-if="targetSong.picurl !== ''" :src="targetSong.picurl" alt="" />
      </div>
      <div style="font-size: 20px">{{ targetSong.name }}</div>
      <div style="font-size: 14px; font-weight: 500; color: #a2adbe; margin: 10px">
        {{ targetSong.artist }}
      </div>

      <Progress :currentTime="currentTime" :cacheTime="cacheTime" :totalTime="totalTime"></Progress>
      <div class="tool">
        <slot name="playMethod">
          <div @click="changePlayMethod">
            <svg v-if="playMethod === 'turn'" class="icon" aria-hidden="true">
              <use xlink:href="#icon-shunxubofang"></use>
            </svg>
            <svg v-if="playMethod === 'random'" class="icon" aria-hidden="true">
              <use xlink:href="#icon-suijibofang01"></use>
            </svg>
            <svg
              v-if="playMethod === 'reverseOrder'"
              class="icon"
              aria-hidden="true"
              style="transform: rotate(180deg)"
            >
              <use xlink:href="#icon-shunxubofang"></use>
            </svg>
          </div>
        </slot>
        <svg class="icon" aria-hidden="true" @click="prev">
          <use xlink:href="#icon-shangyiqu"></use>
        </svg>
        <svg v-if="!myAduio?.paused" class="icon" aria-hidden="true" @click="pause">
          <use xlink:href="#icon-a-zantingyinle"></use>
        </svg>
        <svg
          v-else
          class="icon"
          :class="playBtnStatus ? 'disabled' : ''"
          aria-hidden="true"
          @click="play"
        >
          <use xlink:href="#icon-bofangyinle"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="next">
          <use xlink:href="#icon-xiayiqu"></use>
        </svg>
        <slot name="volumeControl">
          <Volume @rangeChange="volumeChange">
            <template #reference>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-volume"></use>
              </svg>
            </template>
          </Volume>
        </slot>
        <slot name="PlayQueue">
          <PlayQueue :songlist="songlist" :targetSong="targetSong" @selectSong="selectSong">
            <template #reference>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofangliebiao"></use>
              </svg>
            </template>
          </PlayQueue>
        </slot>
      </div>
    </div>
  </div>

  <audio
    ref="myAduio"
    :src="targetSong.playurl"
    class="myAduio"
    @canplay="canplay"
    @canplaythrough="canplaythrough"
    @ended="ended"
    @error="error"
    @timeupdate="timeupdate"
  ></audio>
</template>

<script setup lang="ts">
import Progress from './Progress.vue'
import Volume from './Volume.vue'
import PlayQueue from './PlayQueue.vue'
import { Ref, ref, toRefs, computed } from 'vue'

interface ISong {
  name: string
  artist: string
  playurl: string
  picurl: string
  sort?: number
}
interface Props {
  songlist: ISong[]
}
const props = defineProps<Props>()
const { songlist } = toRefs(props)
songlist.value.forEach((i, index) => {
  i.sort = index + 1
})
// 播放方式
const playMethod = ref<'turn' | 'reverseOrder' | 'random'>('turn')
const changePlayMethod = () => {
  if (playMethod.value === 'turn') {
    playMethod.value = 'reverseOrder'
    songlist.value.sort((a, b) => b.sort! - a.sort!)
    return
  }
  if (playMethod.value === 'reverseOrder') {
    playMethod.value = 'random'
    songlist.value.sort((a, b) => Math.random() - 0.5)
    return
  }
  playMethod.value = 'turn'
  songlist.value.sort((a, b) => a.sort! - b.sort!)
}

const targetSongIndex = ref(0)
const playBtnStatus = ref(true)
const targetSong = computed(() => {
  return songlist.value[targetSongIndex.value]
})
const prev = () => {
  targetSongIndex.value =
    songlist.value.findIndex((i) => i.sort === targetSong.value.sort) === 0
      ? songlist.value.length - 1
      : songlist.value.findIndex((i) => i.sort === targetSong.value.sort) - 1
  if (targetSongIndex.value === songlist.value.length - 1) {
    targetSongIndex.value = songlist.value.length - 2
    targetSongIndex.value = songlist.value.length - 1
  }
}
const next = () => {
  targetSongIndex.value =
    songlist.value.findIndex((i) => i.sort === targetSong.value.sort) === songlist.value.length - 1
      ? 0
      : songlist.value.findIndex((i) => i.sort === targetSong.value.sort) + 1
  // 直接点击切换顺序 导致歌单队列改变 targetSongIndex.value变化从 0 -> 0 不会触发computed
  if (targetSongIndex.value === 0) {
    targetSongIndex.value = 1
    targetSongIndex.value = 0
  }
}

const canplay = () => {
  // 音频可以播放了
  totalTime.value = myAduio.value.duration
  playBtnStatus.value = false
  // 除首次外 每次切换歌曲时自动播放
  play()
}
const canplaythrough = () => {
  // 音频文件可以从头播放到尾时候触发
  // cacheTime.value = myAduio.value.buffered.end(0)
}
const error = () => {
  // 媒体下载过程中错误
  console.log('error')
  pause()
}
const ended = () => {
  currentTime.value = 0
  next()
}
const myAduio: Ref<HTMLAudioElement> = ref(null as unknown as HTMLAudioElement)
const pause = () => {
  myAduio.value.pause()
}
const play = () => {
  myAduio.value.play()
}
const currentTime = ref(0)
const cacheTime = ref(0)
const totalTime = ref(0)
const timeupdate = () => {
  currentTime.value = myAduio.value.currentTime
  if (!myAduio.value.paused) {
    cacheTime.value = myAduio.value.buffered.end(0)
  }
}
// 音量
const volumeChange = (val: string) => {
  myAduio.value.volume = Number(val) / 100
}

// 队列
const selectSong = (val: number) => {
  targetSongIndex.value = songlist.value.findIndex((i) => i.sort === val)
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.main {
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  min-height: 100vh;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.soft-phone {
  width: 100%;
  height: 750px;
  border-radius: 60px;
  background: #f1f3f6;
  box-shadow: 15px 15px 30px #dee0e2, -15px -15px 30px #ffffff;
}

.header,
.tool {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 45px 30px;
}

.tool .icon {
  font-size: 36px;
  cursor: pointer;
}

.rotary {
  width: 220px;
  height: 220px;
  margin: 0 auto 45px;
  border-radius: 130px;
  background: #f1f3f6;
  box-shadow: 21px 21px 43px #dee0e2, -21px -21px 43px #ffffff;
}

.rotary img {
  width: 100%;
  height: 100%;
  border-radius: 130px;
  transform: scale(1);
}

.tool {
  padding: 45px 20px;
}

.myAduio {
  opacity: 1;
}

.disabled {
  opacity: 0.5;
  cursor: no-drop;
}

@media screen and (min-width: 415px) {
  .main {
    width: 414px;
  }
}
</style>
