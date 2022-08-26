import singerApi from '@/service/api/singer/main'
import { useDateFormat } from '@vueuse/core'
import useSongIDArray from '../song/useSongIDArray'

interface ISingerDetail {
  name: string
  description: string
  picUrl: string
  tags: string[]
  id: string
}
interface IAlbums {
  name: string
  picUrl: string
  singer: string
  id: string
  size: number
  publishTime: string
}

export async function getSingerDetail(id: string) {
  const singerDetail: ISingerDetail = {
    name: '',
    description: '',
    picUrl: '',
    tags: [],
    id: '',
  }
  const resDetail = await singerApi.singerDetail({ id })
  console.log(resDetail)
  singerDetail.name = resDetail.data.artist.name
  singerDetail.description = resDetail.data.artist.briefDesc
  singerDetail.picUrl = resDetail.data.artist.cover
  singerDetail.tags = resDetail.data.identify.imageDesc.split('、')
  singerDetail.id = id
  return singerDetail
}
export async function getSongslistShow(id: string) {
  const songslistIds: Array<string> = []
  const resSongs = await singerApi.singerSongs({ id })
  resSongs.hotSongs.forEach((item: { id: string }) => {
    songslistIds.push(item.id)
  })
  const songlistShow = await useSongIDArray(songslistIds.join(','))
  return songlistShow
}

export async function getAlbumsShow(id: string, limit = null) {
  const albumslist: IAlbums[] = []
  const resAlbums = await singerApi.singerAlbums({
    id,
    limit: limit ?? 5,
    offset: 0,
  })
  console.log(resAlbums)
  resAlbums.hotAlbums.forEach(
    (item: {
      name: string
      picUrl: string
      artist: { name: string }
      id: string
      size: number
      publishTime: number
    }) => {
      albumslist.push({
        name: item.name,
        picUrl: item.picUrl,
        singer: item.artist.name,
        id: item.id,
        size: item.size,
        publishTime: useDateFormat(item.publishTime, 'YYYY-MM-DD').value,
      })
    }
  )
  return albumslist
}
// 使用歌单id 获取歌曲列表展示的信息
export default async function useSingerID(id: string) {
  const singerDetail = await getSingerDetail(id)
  const songlistShow = await getSongslistShow(id)
  const albumslist = await getAlbumsShow(id)

  return {
    singerDetail,
    songlistShow,
    albumslist,
  }
}
