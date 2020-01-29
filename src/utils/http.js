import dayjs from 'dayjs'
import md5 from 'md5'
import $config from '@/config'
const { OPEN_ID, APP_KEY, APP_SECRECT, ACCESS_TOKEN } = $config

export default async (method, url, params = {}, formData) => {
 let data = params.data
 let _method = method || 'GET'
 if (_method.toUpperCase() === 'GET') url = formatUrl(url, data)
 let _url = buildUrl(url)
 const sign = signature(_method, _url, data, formData)
 _url = _url + '&sign=' + sign
 return new Promise((resolve, reject) => {
  wx.request({
   url: _url,
   method: _method,
   data: data,
   dataType: params.dataType || 'json',
   header: params.header || {
    'Content-Type': formData
     ? 'application/x-www-form-urlencoded'
     : 'application/json; charset=utf-8',
    // "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
    // "Response-Content-Type": 'application/json',
    Accept: 'application/json',
    ClientID: wx.getStorageSync(OPEN_ID) || 1,
    ClientType: 'WECHAT',
    Authorization: wx.getStorageSync(ACCESS_TOKEN)
   },
   success: function (res) {
    resolve(res.data)
   },
   fail: function (res) {
    // fail调用接口失败
    reject({ error: '网络错误', code: 0 })
    wx.showToast({ title: '网络错误', icon: 'none' })
   }
  })
 })
}

function formatUrl(url, data) {
 let initUrl = ''
 for (let key in data) {
  initUrl += `${initUrl.includes('?') ? '&' : '?'}${key}=${data[key]}`
 }
 return url + initUrl
}

function buildUrl(url) {
 let _url = url
 let extraParams =
  'timestamp=' +
  dayjs(getTimeTamp())
   .subtract(180, 'seconds')
   .format('YYYYMMDDHHmmss') +
  '&channel=1&sign_method=md5&app_key=' +
  APP_KEY

 if (url.indexOf('?') === -1) {
  _url = _url + '?' + extraParams
 } else {
  _url = _url + '&' + extraParams
 }
 return _url
}
function getTimeTamp() {
 let timezone = 8 // 目标时区时间，东八区
 let offsetGMT = new Date().getTimezoneOffset() // 本地时间和格林威治的时间差，单位为分钟
 let nowDate = new Date().getTime() // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
 let targetDate = new Date(
  nowDate + offsetGMT * 60 * 1000 + timezone * 60 * 60 * 1000
 )
 return targetDate
}

function signature(method, url, body, formData) {
 let __params = {}
 let params = url.substring(url.indexOf('?') + 1, url.length)
 params.split('&').map(param => {
  let keyPair = param.split('=')
  if (keyPair[0] && keyPair[1]) {
   __params[keyPair[0]] = keyPair[1]
  }
 })
 let __signKey = Object.keys(__params)
  .sort()
  .reduce(function (a, k) {
   if (k !== 'sign') {
    a.push(k + '' + filterCode(__params[k]))
   }
   return a
  }, [])
  .join('')

 // Add body
 __signKey =
  __signKey +
  (body && method.toUpperCase() !== 'GET' && !formData
   ? JSON.stringify(body)
   : '')

 let signKey = APP_SECRECT + __signKey + APP_SECRECT
 let sign = (md5(signKey) + '').toUpperCase()
 return sign
}
function filterCode(str) {
 return encodeURIComponent(str) //decodeURIComponent(decodeURI(str))
}
