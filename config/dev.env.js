var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // DOMAIN_NAME_ACCOUNT: '"https://account.qa.saas.sh-jiuye.com.cn"',
  DOMAIN_NAME_ACCOUNT: '"https://account-uat.jiuyescm.com"',
  // DOMAIN_NAME_ACCOUNT: '"https://account.jiuyescm.com"',
  // DOMAIN_NAME_SERVICE: '"https://customer.qa.saas.sh-jiuye.com.cn"',
  DOMAIN_NAME_SERVICE: '"https://c-uat.jiuyescm.com"',
  // DOMAIN_NAME_SERVICE: '"https://cus.jiuyescm.com"',
  // DOMAIN_NAME_SERVICE: '"http://192.168.4.102:8088"',
  // APP_KEY: '"1100000504"',
  APP_KEY: '"11000002"',
  // APP_KEY: '"11000006"',
  // APP_SECRECT: '"2d7d1a604e0140e083cb237bc71b63cf"'
  APP_SECRECT: '"69bf33141d4a48a99fcaf1799240074e"'
  // APP_SECRECT: '"68b3cde9a5504832961a177e91ae2c76"'
})
