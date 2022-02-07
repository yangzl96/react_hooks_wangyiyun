// [00:26.810] 我好像住你隔壁
// ...
// 匹配 [00:26.810] 毫秒可能 2-3 位数
const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric (lyricString) {
  // 换行符分割成数组
  const lineStrings = lyricString.split('\n')

  const lyrics = []
  for (let line of lineStrings) {
    if (line) {
      const result = parseExp.exec(line)
      if (!result) continue
      // 拿到分组
      // 转成毫秒
      const time1 = result[1] * 60 * 1000
      const time2 = result[2] * 1000
      const time3 = result[3].lenghth === 3 ? result[3] * 1 : result[3] * 10
      const time = time1 + time2 + time3
      // 拿文字
      const content = line.replace(parseExp, '').trim()
      const lenObj = { time, content }
      lyrics.push(lenObj)
    }
  }
  return lyrics
}