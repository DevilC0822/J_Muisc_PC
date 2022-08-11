export interface ILoginParams {
  phone: string
  password?: string
  captcha?: string
}

export interface ISendCaptcha {
  phone: string
}

export interface IVerifyCaptcha {
  phone: string
  captcha: string
}
