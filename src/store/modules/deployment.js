import Vue from 'vue'
import * as constants from '../mutations'

const state = {
  deploymentBranches:[],
  deploymentList:[],
  consoleFull: [],
  testingContainer:[],
}

const mutations = {

  [constants.DEPLOYMENT_BRANCHES] (state, { data }) {
    state.deploymentBranches = data
  },
  [constants.DEPLOYMENT_LIST] (state, { data }) {
    state.deploymentList = data
  },
  [constants.ADD_PREPARE_DEPLOY_CONSOLE] (state, { data }) {
    state.consoleFull = state.consoleFull.concat([data])
  },
  [constants.TESTING_CONTAINER] (state, { data }) {
    state.testingContainer = data
  },
  [constants.TESTING_CONTAINER_CONNECTION_ERR] (state, { idCon, msg }) {

    state.testingContainer = state.testingContainer.map((c, i) => {

      if (c.id === idCon) {
        c.testingContainerStatus = msg
      }
      return c
    })
  },
  [constants.TESTING_CONTAINER_CONNECTION_STATUS] (state, { id }) {
    state.testingContainer = state.testingContainer.map((c, i) => {

      if (c.id === id) {
        c.testingContainerStatus = "Connected!"
      }
      return c
    })
  },
}

const actions = {
  setBranches({commit}, data) {
    commit(constants.DEPLOYMENT_BRANCHES, {
      data
    })
  },
  setDeploymentList({commit}, data) {
    commit(constants.DEPLOYMENT_LIST, {
      data
    })
  },
  setTestingContainerToDeploy({commit}, container){
    const comp = container.map(c => ({ ...c, forUpload:1 }))
    commit(constants.TESTING_CONTAINER, {
      data:comp
    })
  },
  addPrepareDeployConsole({commit}, data){
    commit(constants.ADD_PREPARE_DEPLOY_CONSOLE, {
      data
    })
  },
  setConnectionErrTestingContainer({commit}, data){
    commit(constants.TESTING_CONTAINER_CONNECTION_ERR, {
      idCon: data.index,
      msg: data.msg
    })
  },
  setConnectionStatusTestingContainer({commit}, id){
    commit(constants.TESTING_CONTAINER_CONNECTION_STATUS, {
      id
    })
  }
}

const getters = {
  deploymentBranches: state => state.deploymentBranches,
  deploymentBranch: (state, getters) => (branch) => {
    const comp = getters.deploymentBranches.filter(f => (String(branch) === String(f.name)))
    return comp.length ? comp[0] : {}
  },
  deploymentList: state => state.deploymentList.map(s => ({...s,
    creationTime: new Date(s.creationTime*1000).toLocaleDateString('ru-RU',
            {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            }
          )
    }),

  ),
  prepareDeployConsole: state => state.consoleFull,
  testingContainer: state => state.testingContainer,
}

export default {
  state,
  mutations,
  getters,
  actions
}
