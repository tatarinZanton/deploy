import Vue from 'vue'
import * as constants from '../mutations'

const state = {
  connected: false,
}

const mutations = {
  [constants.SOCKETS_CONNECTION] (state, { flag }) {
    state.connected = flag
  },
}

const actions = {
  setConnection({commit}, flag) {
    commit(constants.SOCKETS_CONNECTION, {
      flag
    })
  },
}

const getters = {
  connected: state => state.connected,
}

export default {
  state,
  mutations,
  getters,
  actions
}
