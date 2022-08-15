import http from '../../http'
import * as T from './types'

// 获取歌曲详细信息
export const songDetail = (params: T.ISongDetail) => {
  return http.get('/song/detail', params)
}

// 获取歌曲url
export const songUrl = (params: T.ISsongUrl) => {
  return http.get('/song/url', params)
}

// 获取每日推荐歌曲
export const recommendSongs = () => {
  return http.get('/recommend/songs')
}

// 获取历史日推可用日期列表
export const historySongsDate = () => {
  return http.get('/history/recommend/songs')
}

// 获取历史日推详情数据
export const historySongsData = (params: T.IHistorySongsData) => {
  return http.get('/history/recommend/songs/detail', params)
}

export default {
  songDetail,
  songUrl,
  recommendSongs,
  historySongsDate,
  historySongsData,
}
