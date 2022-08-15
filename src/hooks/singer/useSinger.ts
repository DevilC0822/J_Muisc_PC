import singerApi from '@/service/api/singer/main'
import { loginStatus } from '@/hooks/useLoginInfo'
import { numChange } from '@/utils/main'

interface ISinger {
  name: string
  picUrl: string
  fansCount: string
  id: string
}
// 获取歌单 主要用于展示
export default async function useSinger(limit: number | null = null) {
  const singerlist: ISinger[] = []
  const res = await singerApi.topSinger({
    limit: limit ?? 50,
    offset: 0,
  })
  console.log(res)
  res.artists.forEach(
    (item: { name: string; img1v1Url: string; fansCount: number; id: string }) => {
      singerlist.push({
        name: item.name,
        picUrl: item.img1v1Url,
        fansCount: numChange(item.fansCount),
        id: item.id,
      })
    }
  )
  return {
    singerlist,
  }
}
