export interface ISongDetail {
  ids: string
}
export interface ISsongUrl {
  id: string
  br?: number // 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
}

export interface IHistorySongsData {
  date: string
}

export interface ISongUrlV1 {
  id: string
  level?: string // 播放音质等级, 分为 standard => 标准, exhigh=>极高, lossless=>无损, hires=>Hi-Res
}
