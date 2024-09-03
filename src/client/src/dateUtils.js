import dayjs from 'dayjs'

export function getNDaysAgo(n) {
  let day = dayjs(new Date()).subtract(n, "day")
  day = day.format('YYYY-MM-DD')
  return day
}
