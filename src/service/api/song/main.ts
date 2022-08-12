import http from '../../http'
import * as T from './types'

// 获取歌曲详细信息
export const songDetail = (params: T.ISongDetail) => {
  return http.get('/song/detail', params)
}

export const songUrl = (params: T.ISsongUrl) => {
  return http.get('/song/url', params)
}

export default {
  songDetail,
  songUrl,
}
