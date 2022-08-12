import playListApi from '@/service/api/playList/main'

export default async function usePlayList(limit: number | null = null) {
  let playList = []
  const res = await playListApi.topPlaylist({
    order: 'hot',
    cat: '全部',
    limit: limit ?? 50,
    offset: 0,
  })
  playList = res.playlists
  return {
    playList,
  }
}
