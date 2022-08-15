import http from '../../http'
import * as T from './types'

export const topPlaylist = (params: T.ITopPlaylist) => {
  return http.get('/top/playlist', params)
}

export const playlistDetail = (params: T.IPlaylistDetail) => {
  return http.get('/playlist/detail', params)
}

export const recommendPlaylist = () => {
  return http.get('/recommend/resource')
}

export default {
  playlistDetail,
  topPlaylist,
  recommendPlaylist,
}
