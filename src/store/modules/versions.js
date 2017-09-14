import Vue from 'vue'
import * as constants from '../mutations'

const state = {
  versionsList: [],
  versionsDb:[]
}

const mutations = {
  [constants.VERSIONS_LIST] (state, { data }) {
    state.versionsList = data
  },
  [constants.VERSIONS_DB] (state, { data }) {
    state.versionsDb = data
  },

}

const actions = {
  setVervionsList({commit}, data) {
    commit(constants.VERSIONS_LIST, {
      data
    })
  },
  setVervionsDb({commit}, data) {
    commit(constants.VERSIONS_DB, {
      data
    })
  },
}

const getters = {
  versionsList: state => state.versionsList,
  versionsDb: state => state.versionsDb,
}

export default {
  state,
  mutations,
  getters,
  actions
}
