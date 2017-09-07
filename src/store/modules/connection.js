import Vue from 'vue'
import * as constants from '../mutations'
// import * as apis from '../../api'

const state = {
  connected: false,
}

const mutations = {
  [constants.SOCKETS_CONNECTED] (state, { connected }) {
    state.connected = connected
  },
}

const actions = {
  setConnection({commit}, flag) {
    commit(constants.SOCKETS_CONNECTED, {
      flag
    })
  },
}

const getters = {
  connection: state => state.connected,
}

export default {
  state,
  mutations,
  getters,
  actions
}
