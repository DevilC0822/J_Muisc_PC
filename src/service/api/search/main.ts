import http from '../../http'
import * as T from './types'

export const search = (params: T.ISearch) => {
  return http.post('/search', params)
}
