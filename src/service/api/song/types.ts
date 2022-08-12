export interface ISongDetail {
  ids: string
}
export interface ISsongUrl {
  id: string
  br?: number // 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
}
