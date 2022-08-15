export interface ITopSinger {
  limit?: number // 取出歌单数量 , 默认为 50
  offset?: number // 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
}
export interface ISingerId {
  id: string
}
