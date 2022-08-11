import axios from 'axios'

export default async function useIDGetInfo(id: string) {
  interface ISong {
    name: string
    artist: string
    playurl: string
    picurl: string
  }

  const result: ISong = {
    name: '歌曲不存在',
    artist: '歌曲不存在',
    playurl: '',
    picurl: '',
  }
  const { data: res } = await axios({
    url: 'http://175.24.198.84:3000/song/detail',
    method: 'get',
    withCredentials: true,
    params: {
      ids: id,
    },
  })
  if (res.songs.length === 0) {
    window.$message.error('歌曲不存在')
    return result
  }
  const song = res.songs[0]
  const artists: Array<string> = []
  let artistsFull
  if (song.ar >= 3) {
    for (const key in song.ar.slice(0, 3)) {
      artists.push(song.ar[key].name)
    }
    artistsFull = artists.join(' / ') + '...'
  } else {
    song.ar.forEach((k: any) => {
      artists.push(k.name)
    })
    artistsFull = artists.join(' / ')
  }
  result.name = song.al.name
  result.artist = artistsFull
  result.picurl = song.al.picUrl

  const { data: resGetUrl } = await axios({
    url: 'http://175.24.198.84:3000/song/url',
    method: 'get',
    withCredentials: true,
    params: {
      id: id,
    },
  })
  result.playurl = resGetUrl.data[0].url

  return result
}
