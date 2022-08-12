// 改变数字结构（万）
export const numChange = (num: number) => {
  let cnum = num + ''
  if (cnum.length > 4 && cnum.length < 9) {
    const wan = cnum.substring(0, cnum.length - 4)
    const qian = cnum.substring(wan.length, cnum.length - 2)
    cnum = wan + (qian === '00' ? '万' : '.' + qian + '万')
  } else if (cnum.length >= 9) {
    cnum = Math.floor((num / 100000000) * 100) / 100 + '亿'
  }
  return cnum
}
export default { numChange }
