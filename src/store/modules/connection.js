import Vue from 'vue'
import * as constants from '../mutations'

const state = {
  connected: false,
}

const mutations = {
  [constants.SOCKETS_CONNECTION] (state, { flag }) {
    state.connected = flag
  },
  [constants.SOCKETS] (state, { socket }) {
    state.socket = socket
  },
}

const actions = {
  setConnection({commit}, flag) {
    commit(constants.SOCKETS_CONNECTION, {
      flag
    })
  },
  setSocket({commit}, socket) {
    commit(constants.SOCKETS, {
      socket
    })
  },
}

const getters = {
  connected: state => state.connected,
  socket: state => state.socket,
}

export default {
  state,
  mutations,
  getters,
  actions
}
