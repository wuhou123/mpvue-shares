import dayjs from 'dayjs'
export function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(time, fmt = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(fmt)
}
