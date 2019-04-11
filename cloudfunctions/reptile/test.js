const ajax = require('./ajax.js')

function getIndex () {
  ajax
    .request(`http://hq.sinajs.cn/list=s_sh000001`, true)
    .then(json => {
      let price = json.split(',')[1]
      price = parseFloat(price).toFixed(2)
      price = price + ''
      console.log(price)
    })
}

getIndex()