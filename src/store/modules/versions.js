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
  setVersionsList({commit}, data) {
    commit(constants.VERSIONS_LIST, {
      data
    })
  },
  setVersionsDb({commit}, data) {
    commit(constants.VERSIONS_DB, {
      data
    })
  },
}

const getters = {
  versionsList: state => state.versionsList.map(s => ({...s,
    shortHash: s.hash.substring(0,8),
    unixTime: new Date(s.unixTime*1000).toLocaleDateString('ru-RU',
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
  versionsDb: state => state.versionsDb.map(s => ({...s,

    unixTime: new Date(s.unixTime*1000).toLocaleDateString('ru-RU',
            {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            }
          )})
  ),
  versionItem: (state, getters) => (hash) => {
    const comp = getters.versionsList.filter(f => (String(hash) === String(f.hash)))

    return comp.length ? comp[0] : {}
  },
}

export default {
  state,
  mutations,
  getters,
  actions
}
