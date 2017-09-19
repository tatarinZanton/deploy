import Vue from 'vue'
import * as constants from '../mutations'

const state = {
  deploymentBranches:[],
  consoleFull: []
}

const mutations = {

  [constants.DEPLOYMENT_BRANCHES] (state, { data }) {
    state.deploymentBranches = data
  },
  [constants.ADD_PREPARE_DEPLOY_CONSOLE] (state, { data }) {
    state.consoleFull = state.consoleFull.concat([data])
  },
}

const actions = {
  setBranches({commit}, data) {

    commit(constants.DEPLOYMENT_BRANCHES, {
      data
    })
  },
  addPrepareDeployConsole({commit}, data){
    commit(constants.ADD_PREPARE_DEPLOY_CONSOLE, {
      data
    })
  }
}

const getters = {
  deploymentBranches: state => state.deploymentBranches,
  deploymentBranch: (state, getters) => (branch) => {
    console.log(branch);
    const comp = getters.deploymentBranches.filter(f => (String(branch) === String(f.name)))
    console.log(comp);
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
