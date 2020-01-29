import { request } from './request'
import { formatNumber, formatTime } from './format'
import PinYin from './pinyin'

// 去除空格
const trim = function(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}
//地图经纬度角度（平面）
const getRote = function(lngA, latA, lngB, latB) {
  let a = (90 - latB) * Math.PI / 180
  let b = (90 - latA) * Math.PI / 180
  let AOC_BOC = (lngB - lngA) * Math.PI / 180
  let cosc =
    Math.cos(a) * Math.cos(b) + Math.sin(a) * Math.sin(b) * Math.cos(AOC_BOC)
  let sinc = Math.sqrt(1 - cosc * cosc)
  let sinA = Math.sin(a) * Math.sin(AOC_BOC) / sinc
  let A = Math.asin(sinA) * 180 / Math.PI
  let res = 0
  if (lngB > lngA && latB > latA) res = A
  else if (lngB > lngA && latB < latA) res = 180 - A
  else if (lngB < lngA && latB < latA) res = 180 - A
  else if (lngB < lngA && latB > latA) res = 360 + A
  else if (lngB > lngA && latB === latA) res = 90
  else if (lngB < lngA && latB === latA) res = 270
  else if (lngB === lngA && latB > latA) res = 0
  else if (lngB === lngA && latB < latA) res = 180
  return res
}
// 计算温度是否达标
const getConfig = function(val, items) {
  if (val === '') return
  let min = items.minTemp
  let max = items.maxTemp
  if (min === null) {
    if (max) return val <= max ? 'green' : 'red'
    else return 'green'
  } else {
    if (max === null) {
      return val >= min ? 'green' : 'blue'
    } else {
      if (val < min) return 'blue'
      else if (val > max) return 'red'
      else return 'green'
    }
  }
}
//去重过滤数据
const filterProduct = function(list) {
  let obj = {}
  list.forEach(v => {
    v.productDate = v.productDate ? formatTime(v.productDate, 'YYYY-MM-DD') : ''
    v.expiryDate = v.expiryDate ? formatTime(v.expiryDate, 'YYYY-MM-DD') : ''
    if (!obj[v.extendid]) {
      obj[v.extendid] = {
        list: [v],
        qty: v.qty || 0,
        realQty: v.realQty || 0,
        productShortName: v.productShortName || '',
        stockplacename: v.stockplacename || ''
      }
    } else {
      obj[v.extendid].list.push(v)
      obj[v.extendid].qty += v.qty || 0
      obj[v.extendid].realQty += v.realQty || 0
    }
  })
  return obj
}
//取温度要求
const showTmp = function([tempName, minTemp, maxTemp]) {
  if (minTemp != null && maxTemp != null)
    return `${tempName} ${minTemp}℃~${maxTemp}℃`
  else if (minTemp == null && maxTemp == null) return `${tempName} 不限`
  else if (minTemp == null) return `${tempName} ${maxTemp}℃以下`
  else return `${tempName} ${minTemp}℃以上`
}
//gps转火星坐标系

let PI = 3.14159265358979324
// let x_pi = 3.14159265358979324 * 3000.0 / 180.0
const delta = function(lat, lon) {
  let a = 6378245.0 //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
  let ee = 0.00669342162296594323 //  ee: 椭球的偏心率。
  let dLat = transformLat(lon - 105.0, lat - 35.0)
  let dLon = transformLon(lon - 105.0, lat - 35.0)
  let radLat = lat / 180.0 * PI
  let magic = Math.sin(radLat)
  magic = 1 - ee * magic * magic
  let sqrtMagic = Math.sqrt(magic)
  dLat = dLat * 180.0 / (a * (1 - ee) / (magic * sqrtMagic) * PI)
  dLon = dLon * 180.0 / (a / sqrtMagic * Math.cos(radLat) * PI)
  return { lat: dLat, lon: dLon }
}
const transformLat = function(x, y) {
  let sol =
    -100.0 +
    2.0 * x +
    3.0 * y +
    0.2 * y * y +
    0.1 * x * y +
    0.2 * Math.sqrt(Math.abs(x))
  sol +=
    (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0
  sol += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0
  sol +=
    (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) *
    2.0 /
    3.0
  return sol
}
const transformLon = function(x, y) {
  let sol =
    300.0 +
    x +
    2.0 * y +
    0.1 * x * x +
    0.1 * x * y +
    0.1 * Math.sqrt(Math.abs(x))
  sol +=
    (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0
  sol += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0
  sol +=
    (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) *
    2.0 /
    3.0
  return sol
}
const outOfChina = function(lat, lon) {
  if (lon < 72.004 || lon > 137.8347) return true
  if (lat < 0.8293 || lat > 55.8271) return true
  return false
}
//WGS-84 to GCJ-02
const gcjEncrypt = function(wgsLon, wgsLat) {
  if (outOfChina(wgsLat, wgsLon)) return { lat: wgsLat, lon: wgsLon }
  let d = delta(wgsLat, wgsLon)
  return { lat: wgsLat + d.lat, lon: wgsLon + d.lon }
}

export {
  request,
  PinYin,
  formatNumber,
  formatTime,
  trim,
  getRote,
  getConfig,
  filterProduct,
  showTmp,
  gcjEncrypt
}
