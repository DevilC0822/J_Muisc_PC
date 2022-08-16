import http from '../../http'
import * as T from './types'

// 获取最新专辑
export const newestAlbums = () => {
  return http.post('/album/newest')
}

// 获取专辑内容
export const albumsDetail = (params: T.IAlbumsId) => {
  return http.post('/album', params)
}

// 获取专辑内容
export const albumsDynamicDetail = (params: T.IAlbumsId) => {
  return http.post('/album/detail/dynamic', params)
}

export default {
  newestAlbums,
  albumsDetail,
  albumsDynamicDetail,
}
