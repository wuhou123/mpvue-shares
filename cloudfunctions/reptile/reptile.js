// 爬虫
const ajax = require('./ajax.js')
const request = require('request-promise')
iconv = require('iconv-lite')

const URL = {
  calendar:
    'http://comment.10jqka.com.cn/tzrl/getTzrlData.php?callback=callback_dt&type=data',
  market: 'http://q.10jqka.com.cn/api.php?t=indexflash&',
  search:
    'http://qd.10jqka.com.cn/quote.php?cate=real&type=stock&return=json&callback=showStockData&callback=jQuery183031558640597485343_1554345337454',
  jetton: 'http://doctor.10jqka.com.cn/',
  rankList: 'https://sec.wedengta.com/getSecInfo',
  rankReal: 'https://sec.wedengta.com/getMarketQuotation'
}

module.exports = {
  getCalendar() {
    let date =
      `${new Date().getFullYear()}${
        (new Date().getMonth() + 1).toString().length < 10
          ? '0' + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1
      }` || ''
    let options = {
      url: URL.calendar,
      qs: {
        date: date
      },
      encoding: null
    }
    return new Promise((resolve, reject) => {
      request(options)
        .then(res => {
          resolve(iconv.decode(res, 'gb2312'))
        })
        .catch(error => {
          console.log(error)
          reject('获取股市日历失败！')
        })
    })
  },
  getMarket() {
    let options = {
      url: URL.market
    }
    return new Promise((resolve, reject) => {
      request(options)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          console.log(error)
          reject('获取行情失败！')
        })
    })
  },
  getSearch(item) {
    let options = {
      method: 'GET',
      url: URL.search,
      qs: {
        code: item.id
      },
      json: true,
      allow_redirects: false,
      headers: {
        'content-type': 'application/json'
      }
    }
    return new Promise((resolve, reject) => {
      request(options)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          console.log(error)
          reject('获取详情失败！')
        })
    })
  },
  getStockJetton(item) {
    let options = {
      method: 'GET',
      url: URL.jetton + item.id,
      qs: {
        code: item.id
      },
      json: true,
      allow_redirects: false,
      encoding: null,
      headers: {
        'content-type': 'application/json'
      }
    }
    return new Promise((resolve, reject) => {
      request(options)
        .then(res => {
          resolve(iconv.decode(res, 'gb2312'))
        })
        .catch(error => {
          console.log(error)
          reject('获取详情失败！')
        })
    })
  },
  getRankList(item) {
    let options = {
      method: 'GET',
      url: URL.rankList,
      qs: item,
      json: true,
      allow_redirects: false,
      headers: {
        'content-type': 'application/json'
      }
    }
    return new Promise((resolve, reject) => {
      request(options)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          console.log(error)
          reject('获取详情失败！')
        })
    })
  },
  getRankReal(item) {
    let options = {
      method: 'GET',
      url: URL.rankReal,
      qs: item,
      json: true,
      allow_redirects: false,
      headers: {
        'content-type': 'application/json'
      }
    }
    return new Promise((resolve, reject) => {
      request(options)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          console.log(error)
          reject('获取详情失败！')
        })
    })
  }
}
