import Vue from 'vue'
import * as constants from '../mutations'

const state = {
  list: [],
  consoleFull: [],
}

const mutations = {
  [constants.GET_COMPANIES] (state, { companies }) {
    state.list = companies
  },
  [constants.GET_COMPANIES_STATUS_TLS] (state, { index }) {
    state.list = state.list.map((c, i) => {
      if (i === index) {
        c.conStatus = "tls not Found!"
      }
      return c
    })
  },
  [constants.GET_COMPANIES_STATUS_ERR] (state,  { err } ) {
    state.list = state.list.map((c, i) => {
      if (i === err.index) {
        c.conStatus = "connection Error"
        console.log("Error on company " + c.company_name);
      }
      return c
    })
  },
  [constants.ADD_PREPARE_DEPLOY_CONSOLE] (state, { data }) {
    state.consoleFull = state.consoleFull.concat([data])
  },
}

const actions = {
  getCompanies({commit}, params) {
    const comp = params.map(c => ({ ...c, companyEdit: false, companyUpBut: false, consoleOut: '', conStatus: '' }))
    commit(constants.GET_COMPANIES, {
      companies: comp
    })
  },
  getCompaniesStatusTls({commit}, index) {
    commit(constants.GET_COMPANIES_STATUS_TLS, {
      index
    })
  },
  getCompaniesStatusErr({commit}, err) {
    // console.log(params);
    commit(constants.GET_COMPANIES_STATUS_ERR, {
      err
    })
  },
  addPrepareDeployConsole({commit}, data){
    commit(constants.ADD_PREPARE_DEPLOY_CONSOLE, {
      data
    })
  }
}

const getters = {
  companies: state => state.list,
  company: (state, getters) => (id) => {
    const comp = getters.companies.filter(f => (String(id) === String(f.id)))
    return comp.length ? comp[0] : {}
  },
  prepareDeployConsole: state => state.consoleFull,
}

export default {
  state,
  mutations,
  getters,
  actions
}
