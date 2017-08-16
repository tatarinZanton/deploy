import Vue from 'vue'
import * as constants from '../mutations'
// import * as apis from '../../api'

const state = {
  list: [],
}

const mutations = {
  [constants.GET_COMPANIES] (state, { companies }) {
    state.list = state.list.concat(companies)
  }
}

const actions = {
  getCompanies({commit}, params) {
    commit(constants.GET_COMPANIES, {
      companies: params
    })
  }
}

const getters = {
  companies: state => state.companies,
}

export default {
  state,
  mutations,
  getters,
  actions
}
