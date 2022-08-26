import http from '../../http'
import * as T from './types'

export const search = (params: T.ISearch) => {
  return http.post('/search', params)
}

// 默认搜索关键词
export const searchKeywordsDefault = () => {
  return http.post('/search/default')
}

// 热搜列表(简略)
export const searchKeywordsHot = () => {
  return http.post('/search/hot')
}

export default {
  search,
  searchKeywordsDefault,
  searchKeywordsHot,
}
