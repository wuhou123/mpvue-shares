import Vue from 'vue'
import App from './App'
import store from './store/index'
import '../static/css/icon.css'
import '../static/css/colorui.css'

Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: [
      '^pages/home/main',
      'pages/details/main',
      'pages/market/main',
      'pages/news/main'
    ],
    window: {
      navigationBarBackgroundColor: '#F73240',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: '',
      backgroundColor: '#F7F8F9',
      backgroundTextStyle: 'dark',
      enablePullDownRefresh: false
    },
    cloud: true,
    tabBar: {
      color: '#666666',
      selectedColor: '#D62B2B',
      borderStyle: 'white',
      backgroundColor: '#fff',
      list: [
        {
          text: '直播',
          pagePath: 'pages/home/main',
          iconPath: 'static/icon/home.png',
          selectedIconPath: 'static/icon/home_focus.png'
        },
        {
          text: '行情',
          pagePath: 'pages/market/main',
          iconPath: 'static/icon/invest.png',
          selectedIconPath: 'static/icon/invest_focus.png'
        },
        {
          text: '我的',
          pagePath: 'pages/my/main',
          iconPath: 'static/icon/my.png',
          selectedIconPath: 'static/icon/my_focus.png'
        }
      ]
    }
  }
}
