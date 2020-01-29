import $config from '@/config'
const { ACCESS_TOKEN } = $config

const state = {
  accessToken: wx.getStorageSync(ACCESS_TOKEN),
  userInfo: {},
  roleName: '',
  customerId: '',
  customerName: '',
  customerList: []
}

const getters = {}

const mutations = {
  setToken: (state, data) => {
    if (data) {
      wx.setStorageSync(ACCESS_TOKEN, data)
    } else {
      wx.removeStorageSync(ACCESS_TOKEN)
    }
    state.accessToken = data
  },
  setUserInfo: (state, data) => {
    state.userInfo = data
  },
  setRoleName: (state, data) => {
    state.roleName = data
  },
  setCustomerId: (state, data) => {
    state.customerId = data
  },
  setCustomerName: (state, data) => {
    state.customerName = data
  },
  setCustomerList: (state, data) => {
    state.customerList = data
  }
}

const actions = {
  // 登出
  logout ({ commit }) {
    return new Promise(resolve => {
      commit('setToken', '')
      commit('setUserInfo', {})
      commit('setRoleName', '')
      commit('setCustomerId', '')
      commit('setCustomerName', '')
      commit('setCustomerList', [])
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
