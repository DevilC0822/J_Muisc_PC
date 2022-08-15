import playListApi from '@/service/api/playList/main'
import useSongIDArray from '../song/useSongIDArray'

interface IPlaylistDetail {
  name: string
  description: string
  picUrl: string
  tags: string[]
}
// 使用歌单id 获取歌曲列表展示的信息
export default async function usePlayListID(id: string) {
  const songslistIds: Array<string> = []
  const playlistDetail: IPlaylistDetail = {
    name: '',
    description: '',
    picUrl: '',
    tags: [],
  }
  const res = await playListApi.playlistDetail({
    id,
  })
  console.log(res)
  playlistDetail.name = res.playlist.name
  playlistDetail.description = res.playlist.description
  playlistDetail.picUrl = res.playlist.coverImgUrl
  playlistDetail.tags = res.playlist.tags
  // 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的 trackIds 是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情
  res.playlist.trackIds.forEach((item: { id: string }) => {
    songslistIds.push(item.id)
  })
  const playlistShow = await useSongIDArray(songslistIds.join(','))
  return {
    playlistShow,
    playlistDetail,
  }
}
