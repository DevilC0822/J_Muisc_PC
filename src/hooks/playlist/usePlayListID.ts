import playListApi from '@/service/api/playList/main'
import useSongIDArray from '../song/useSongIDArray'

export default async function usePlayListID(id: string) {
  const playListIds: Array<string> = []
  const res = await playListApi.playlistDetail({
    id,
  })
  // 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的 trackIds 是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情
  console.log(res)
  res.playlist.trackIds.forEach((item: { id: string }) => {
    playListIds.push(item.id)
  })
  const result = await useSongIDArray(playListIds.join(','))
  return result
}
