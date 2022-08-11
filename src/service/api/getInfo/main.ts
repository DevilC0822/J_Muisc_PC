import http from '../../http'
import * as T from './types'

export const getUserAccount = () => {
  return http.get('/user/account')
}

export default {
  getUserAccount,
}
