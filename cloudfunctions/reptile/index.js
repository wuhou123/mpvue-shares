// 入口文件
const cloud = require('wx-server-sdk')
const reptile = require('./reptile.js')
cloud.init()

exports.main = async (event, context) => {
  let res
  switch (event.type) {
    case 'getCalendar':
      res = await reptile.getCalendar()
      break
    case 'getMarket':
      res = await reptile.getMarket()
      break
    case 'getSearch':
      res = await reptile.getSearch(event)
      break
    case 'getStockJetton':
      res = await reptile.getStockJetton(event)
      break
    case 'getCalendar':
      res = await reptile.getCalendar()
      break
    case 'getRankList':
      res = await reptile.getRankList(event)
      break
    case 'getRankReal':
      res = await reptile.getRankReal(event)
      break
    case 'getNews':
      res = await reptile.getNews(event)
      break
    case 'getDetail':
      res = await reptile.getDetail(event)
      break
  }
  return {
    home: res
  }
}
