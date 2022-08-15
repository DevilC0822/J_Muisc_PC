import singerApi from '@/service/api/singer/main'
import useSongIDArray from '../song/useSongIDArray'

interface ISingerDetail {
  name: string
  description: string
  picUrl: string
  tags: string[]
}
// 使用歌单id 获取歌曲列表展示的信息
export default async function useSingerID(id: string) {
  const singerDetail: ISingerDetail = {
    name: '',
    description: '',
    picUrl: '',
    tags: [],
  }
  const resDetail = await singerApi.singerDetail({ id })
  console.log(resDetail)
  singerDetail.name = resDetail.data.artist.name
  singerDetail.description = resDetail.data.artist.briefDesc
  singerDetail.picUrl = resDetail.data.artist.cover
  singerDetail.tags = resDetail.data.identify.imageDesc.split('、')

  const songslistIds: Array<string> = []
  const resSongs = await singerApi.singerSongs({ id })
  resSongs.hotSongs.forEach((item: { id: string }) => {
    songslistIds.push(item.id)
  })
  const songslistShow = await useSongIDArray(songslistIds.join(','))
  return {
    singerDetail,
    songslistShow,
  }
}
