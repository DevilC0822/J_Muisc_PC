import http from '../../http'
import * as T from './types'

export const loginPhone = (params: T.ILoginParams) => {
  return http.get('/login/cellphone', params)
}

export const updateLoginStatus = () => {
  return http.get('/login/status')
}

export const sendCaptcha = (params: T.ISendCaptcha) => {
  return http.get('/captcha/sent', params)
}

export const verifyCaptcha = (params: T.IVerifyCaptcha) => {
  return http.get('/captcha/verify', params)
}

export default {
  loginPhone,
  updateLoginStatus,
  sendCaptcha,
  verifyCaptcha,
}
