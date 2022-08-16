import http from '../../http'
import * as T from './types'

// 获取热门歌手
export const topSinger = (params: T.ITopSinger) => {
  return http.get('/top/artists', params)
}

// 获取歌手单曲
export const singerSongs = (params: T.ISingerId) => {
  return http.get('/artists', params)
}

// 获取歌手描述
export const singerDesc = (params: T.ISingerId) => {
  return http.get('/artist/desc', params)
}

// 获取歌手详情
export const singerDetail = (params: T.ISingerId) => {
  return http.get('/artist/detail', params)
}

// 获取歌手专辑
export const singerAlbums = (params: T.ISingerId) => {
  return http.get('/artist/album', params)
}

// 歌手分类列表
export const singerCategory = (params: T.ISingerCategory) => {
  return http.get('/artist/list', params)
}
export default {
  topSinger,
  singerSongs,
  singerDesc,
  singerDetail,
  singerAlbums,
  singerCategory,
}
