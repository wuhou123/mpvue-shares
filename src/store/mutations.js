import * as types from './mutation-types'
const matations = {
  /**
   * state:当前状态树
   * v: 提交matations时传的参数
   */
  [types.INCREMENT] (state) {
    const obj = state
    obj.count += 1
  },
  [types.DECREMENT] (state) {
    const obj = state
    obj.count -= 1
  },
  [types.SET_TOKEN] (state, token) {
    state.access_token = token
  },
  [types.SET_STORAGEPAGE] (state, page) {
    state.storePage = page
  },
  [types.SET_CITYS] (state, citys) {
    state.citys = citys
  },
  [types.SET_SELECTCITYS] (state, citys) {
    state.selectCitys = citys
  },
  [types.SET_PRODUCTS] (state, product) {
    state.products = product
  },
  [types.SET_HEIGHT] (state, height) {
    state.customerHeight = height
  },
  [types.SET_STORAGEWAREHOUSE] (state, payload = {}) {
    state.storageWarehouse = payload
  },
  // 保存鲜配查询选择的省市区
  [types.SET_SELECTDELIVERYAREAS] (state, payload = []) {
    state.selectDeliveryAreas = payload
  }
}

export default matations
