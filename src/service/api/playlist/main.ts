import http from '../../http'
import * as T from './types'

export const topPlaylist = (params: T.ITopPlaylist) => {
  return http.get('/top/playlist', params)
}

export const playlistDetail = (params: T.IPlaylistDetail) => {
  return http.get('/playlist/detail', params)
}

export default {
  playlistDetail,
  topPlaylist,
}
