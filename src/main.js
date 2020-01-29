import Vue from 'vue'
import App from './App'
import store from './store/index'
import Api from './api'
import cuCustom from './components/common/cuCustom.vue'
Vue.component('cu-custom', cuCustom)

Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(Api)
const app = new Vue(App)
app.$mount()
