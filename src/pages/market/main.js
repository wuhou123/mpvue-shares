import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    // 注意，页面级可配置属性相当于只是`src/main.js`中配置里的`window`部分
    navigationBarTitleText: '行情',
    usingComponents: {
      skeletons: '/static/components/component/skeletons/index'
    }
  }
}
