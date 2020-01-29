import { updatePageview } from '@/api/modules/notice'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  // 公告阅读count
  countView ({ commit }, id) {
    updatePageview({ id })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
