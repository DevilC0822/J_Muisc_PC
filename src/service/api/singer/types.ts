export interface ITopSinger {
  limit?: number // 取出歌手数量 , 默认为 50
  offset?: number // 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
}
export interface ISingerId {
  id: string
  limit?: number // 取出歌手专辑数量 , 默认为 30
  offset?: number // 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
}

export interface ISingerCategory {
  limit?: number // 取出歌手专辑数量 , 默认为 30
  offset?: number // 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
  initial?: string // 按首字母索引查找参数
  type?: number //-1:全部 1:男歌手 2:女歌手 3:乐队
  area?: number // -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
}
