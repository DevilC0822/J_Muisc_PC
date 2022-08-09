import http from '../../http'
import * as T from './types'

export const loginPhone = (params: T.ILoginParams) => {
  return http.post('/login/cellphone', params)
}
