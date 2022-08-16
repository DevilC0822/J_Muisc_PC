import albumsApi from '@/service/api/albums/main'
import { useDateFormat } from '@vueuse/core'

interface IAlbums {
  name: string
  picUrl: string
  singer: string
  id: string
  size: number
  publishTime: string
}
// 获取最新专辑 主要用于展示
export default async function useAlbums() {
  const albumslist: IAlbums[] = []
  const res = await albumsApi.newestAlbums()
  res.albums.forEach(
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
  return {
    albumslist,
  }
}
