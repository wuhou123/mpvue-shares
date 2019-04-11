const request = require('request-promise')
const cheerio = require('cheerio')

module.exports = {
  // 初始化请求配置
  initOptions (url, isJson) {
    const options = { url }

    if (isJson) {
      options.json = true
    } else {
      options.transform = (body) => {
        return cheerio.load(body)
      }
    }

    return options
  },

  // 发起请求
  request (url, isJson = false) {
    const options = this.initOptions(url, isJson)
    return request(options)
  }
}