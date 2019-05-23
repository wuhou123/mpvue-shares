import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '韭菜日历',
    usingComponents: {
      skeletons: '/static/components/component/skeletons/index'
    }
  }
}
