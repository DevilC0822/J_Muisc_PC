import { ref, watch } from 'vue'

interface ISong {
  name: string
  artist: string
  playurl: string
  picurl: string
  id: number
  sort?: number
}

const songlist = ref<ISong[]>([
  {
    name: '暂无歌曲',
    artist: '',
    playurl: '',
    picurl: '',
    id: -1,
  },
])
if (window.sessionStorage.getItem('songlist')) {
  songlist.value = JSON.parse(window.sessionStorage.getItem('songlist')!)
  songlist.value.forEach((i, index) => {
    i.sort = index + 1
  })
}
const playMethod = ref<'turn' | 'reverseOrder' | 'random'>('turn')
// 当前正在播放的歌曲
const targetSong = ref(songlist.value[0])
if (window.sessionStorage.getItem('targetSong')) {
  targetSong.value = JSON.parse(window.sessionStorage.getItem('targetSong')!)
  targetSong.value.sort = songlist.value.findIndex((i) => i.id === targetSong.value.id!) + 1
}

// 当前播放时长
const currentTime = ref(0)
// 歌曲缓存时长
const cacheTime = ref(0)
// 歌曲总时长
const totalTime = ref(0)

export default function useAudio() {
  const audio: HTMLAudioElement = document.querySelector('#audio999')!

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
  watch(
    () => targetSong.value.playurl,
    (newVal) => {
      audio.src = newVal
    },
    { immediate: true }
  )
  const play = () => {
    audio.play()
  }
  const pause = () => {
    audio.pause()
  }
  const prev = () => {
    let index = songlist.value.findIndex((i) => i.sort === targetSong.value.sort)
    if (index === 0) {
      index = songlist.value.length
    }
    targetSong.value = songlist.value[index - 1]
  }
  const next = () => {
    let index = songlist.value.findIndex((i) => i.sort === targetSong.value.sort)
    if (index === songlist.value.length - 1) {
      index = -1
    }
    targetSong.value = songlist.value[index + 1]
    console.log(targetSong.value)
  }
  const canplay = () => {
    // 音频可以播放了
    totalTime.value = audio.duration
    // 除首次外 每次切换歌曲时自动播放
    play()
  }
  const error = () => {
    // 媒体下载过程中错误
    window.$message.error('歌曲播放失败')
    pause()
  }
  const ended = () => {
    currentTime.value = 0
    next()
  }
  const timeupdate = () => {
    currentTime.value = audio.currentTime
    if (!audio.paused) {
      cacheTime.value = audio.buffered.end(0)
    }
  }

  audio.addEventListener('canplay', canplay)
  audio.addEventListener('error', error)
  audio.addEventListener('ended', ended)
  audio.addEventListener('timeupdate', timeupdate)
  return {
    playMethod,
    currentTime,
    cacheTime,
    totalTime,
    targetSong,
    songlist,
    play,
    pause,
    prev,
    next,
    changePlayMethod,
  }
}
