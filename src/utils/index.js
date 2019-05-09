function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

//request
export const request = function(method, url, params, isShowLoading = true) {
  // 加密
  // console.log(method, requestHandler, isShowLoading = true)
  // let params = requestHandler.params
  isShowLoading && wx.showLoading && wx.showLoading({ title: '加载中...' })
  return new Promise((resolve, reject) => {
    let appid, accessToken
    //登录不带appid&accessToken
    if (url.includes('/wxxcx/login.do')) {
      appid = ''
      accessToken = ''
    } else {
      appid = wx.getStorageSync('vuex')
        ? JSON.parse(wx.getStorageSync('vuex')).loginMsg.appid
        : ''
      accessToken = wx.getStorageSync('vuex')
        ? JSON.parse(wx.getStorageSync('vuex')).loginMsg.token
        : ''
    }
    wx.request({
      url: url,
      data: params,
      method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type':
          method === 'POST'
            ? 'application/x-www-form-urlencoded'
            : 'application/json',
        appid: appid,
        accessToken: accessToken
      },
      success: function(res) {
        isShowLoading && wx.hideLoading && wx.hideLoading()
        resolve(res)
      },
      fail: function(err) {
        // 因为hide会让showToast隐藏
        isShowLoading && wx.hideLoading && wx.hideLoading()
        wx.showToast({
          title: '出错了',
          icon: 'error',
          duration: 1000
        })
        reject(err)
        // throw new Error('Network request failed')
      },
      complete: function() {}
    })
  })
}

export const GET = function(url, params) {
  return request('GET', url, params)
}

export const POST = function(url, params) {
  return request('POST', url, params)
}

export const regular = function(str) {
  return str
    .replace(/<[\s\S]*?>/gim, '')
    .replace(/&nbsp;/gim, ' ')
    .trim()
}

export const RandomNum = function(Min, Max) {
  let Range = Max - Min
  let Rand = Math.random()
  let num = Min + parseInt(Rand * Range) //舍去
  return num
}
export const formatDate = function(date, format) {
  let dates = new Date(date)
  var o = {
    'M+': dates.getMonth() + 1, // month
    'd+': dates.getDate(), // day
    'h+': dates.getHours(), // hour
    'H+': dates.getHours(), // hour
    'm+': dates.getMinutes(), // minute
    's+': dates.getSeconds(), // second
    'q+': Math.floor((dates.getMonth() + 3) / 3), // quarter
    S: dates.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (dates.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return format
}
export default {
  formatNumber,
  formatTime,
  RandomNum,
  formatDate
}
