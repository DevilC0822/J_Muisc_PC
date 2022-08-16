import albumsApi from '@/service/api/albums/main'
import useSongIDArray from '../song/useSongIDArray'

interface IAlbumsDetail {
  commentCount: number // 评论数
  shareCount: number // 分享数
  subCount: number // 订阅数
  name: string
  desc: string
  picUrl: string
  id: string
  company: string
  singer: string
}
// 使用歌单id 获取歌曲列表展示的信息
export default async function useAlbumsID(id: string) {
  const albumsDynamicDetail: IAlbumsDetail = {
    commentCount: 0,
    shareCount: 0,
    subCount: 0,
    name: '',
    desc: '',
    picUrl: '',
    id: '',
    company: '',
    singer: '',
  }
  const resDynamicDetail = await albumsApi.albumsDynamicDetail({ id })
  console.log(resDynamicDetail)
  albumsDynamicDetail.commentCount = resDynamicDetail.commentCount
  albumsDynamicDetail.shareCount = resDynamicDetail.shareCount
  albumsDynamicDetail.subCount = resDynamicDetail.subCount

  const songslistIds: Array<string> = []
  const resSongs = await albumsApi.albumsDetail({ id })
  albumsDynamicDetail.name = resSongs.album.name
  albumsDynamicDetail.desc = resSongs.album.description
  albumsDynamicDetail.picUrl = resSongs.album.picUrl
  albumsDynamicDetail.id = resSongs.album.id
  albumsDynamicDetail.company = resSongs.album.company
  albumsDynamicDetail.singer = resSongs.album.artists.name

  resSongs.songs.forEach((item: { id: string }) => {
    songslistIds.push(item.id)
  })
  const songslistShow = await useSongIDArray(songslistIds.join(','))
  return {
    albumsDynamicDetail,
    songslistShow,
  }
}
