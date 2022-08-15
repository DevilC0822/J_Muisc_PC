import playListApi from '@/service/api/playList/main'
import { loginStatus } from '@/hooks/useLoginInfo'
import { numChange } from '@/utils/main'

interface IPlaylisy {
  name: string
  picUrl: string
  playCount: string
  id: string
}
// 获取歌单 主要用于展示
export default async function usePlayList(limit: number | null = null) {
  const playList: IPlaylisy[] = []
  if (!loginStatus) {
    const res = await playListApi.recommendPlaylist()
    res.recommend.forEach(
      (item: { name: string; picUrl: string; playcount: number; id: string }) => {
        playList.push({
          name: item.name,
          picUrl: item.picUrl,
          playCount: numChange(item.playcount),
          id: item.id,
        })
      }
    )
  } else {
    const res = await playListApi.topPlaylist({
      order: 'hot',
      cat: '全部',
      limit: limit ?? 50,
      offset: 0,
    })
    res.playlists.forEach(
      (item: { name: string; coverImgUrl: string; playCount: number; id: string }) => {
        playList.push({
          name: item.name,
          picUrl: item.coverImgUrl,
          playCount: numChange(item.playCount),
          id: item.id,
        })
      }
    )
  }
  return {
    playList,
  }
}
