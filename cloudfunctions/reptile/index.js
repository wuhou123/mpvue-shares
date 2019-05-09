// 入口文件
const cloud = require('wx-server-sdk')
const reptile = require('./reptile.js')
cloud.init()

exports.main = async (event, context) => {
  let res, db, run
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
    case 'getLives':
      res = await reptile.getLives(event)
      break
    case 'getSessionKey':
      res = await reptile.getSessionKey(event)
      break
    case 'upDateRunDate':
      db = db || cloud.database()
      run = run || db.collection('runDatas')
      res = await new Promise((resolve, reject) => {
        run
          .where({
            openid: event.list.openid
          })
          .get()
          .then(response => {
            if (!response.data[0]) {
              run.add({
                data: event.list
              })
            } else {
              run
                .doc(response.data[0]._id)
                .update({
                  data: {
                    items: {
                      currency: response.data[0].items.currency + 1,
                      total: response.data[0].items.total + 1,
                      date: event.list.date
                    }
                  }
                })
                .then(res1 => {
                  resolve(res1)
                })
                .catch(error => {
                  reject(error)
                })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
      break
    case 'initRunData':
      db = db || cloud.database()
      run = run || db.collection('runDatas')
      res = await new Promise((resolve, reject) => {
        run
          .where({
            openid: event.list.openid
          })
          .get()
          .then(response => {
            if (!response.data[0]) {
              run.add({
                data: event.list
              })
            } else {
              run
                .doc(response.data[0]._id)
                .update({
                  data: {
                    items: {
                      date: event.list.date,
                      TodayWalk: event.list.items.TodayWalk,
                      timestamp: event.list.items.timestamp
                    }
                  }
                })
                .then(res1 => {
                  resolve(res1)
                })
                .catch(error => {
                  reject(error)
                })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
      break
    case 'resetCurrenty':
      db = db || cloud.database()
      run = run || db.collection('runDatas')
      res = await new Promise((resolve, reject) => {
        run
          .where({
            openid: event.list.openid
          })
          .get()
          .then(response => {
            run
              .doc(response.data[0]._id)
              .update({
                data: {
                  items: {
                    currency: 0,
                    date: event.list.date
                  }
                }
              })
              .then(res1 => {
                resolve(res1)
              })
              .catch(error => {
                reject(error)
              })
          })
          .catch(error => {
            reject(error)
          })
      })
      break
  }
  return {
    home: res
  }
}
