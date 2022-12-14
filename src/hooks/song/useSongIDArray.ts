import songApi from '@/service/api/song/main'
// id传入多个使用, 分隔可获得由ISong类型组成的数组 用于歌曲列表展示
export default async function useIDGetInfo(id: string) {
  interface ISong {
    name: string
    artist: string
    picurl: string
    id: string
    playurl: string
  }

  const result: ISong[] = []
  const res = await songApi.songDetail({
    ids: id,
  })
  res.songs.forEach((item: { ar: any[]; name: string; al: { picUrl: any }; id: string }) => {
    const artists: Array<string> = []
    if (item.ar.length >= 3) {
      for (const key in item.ar.slice(0, 3)) {
        artists.push(item.ar[key].name)
      }
    } else {
      item.ar.forEach((k: any) => {
        artists.push(k.name)
      })
    }
    const artistsFull = artists.join(' / ')
    result.push({
      name: item.name,
      artist: artistsFull,
      picurl: item.al.picUrl,
      id: item.id,
      playurl: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
    })
  })

  const resUrl = await songApi.songUrlV1({
    id,
  })
  resUrl.data.forEach((i: { id: string; url: string }) => {
    result.forEach((it) => {
      if (it.id === i.id) {
        it.playurl = i.url
      }
    })
  })
  return result
}
