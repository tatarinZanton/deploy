import Vuex from 'vuex'
import Vue from 'vue'
import companies from './modules/companies'
import connection from './modules/connection'
import versions from './modules/versions'
import deployment from './modules/deployment'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    companies,
    connection,
    versions,
    deployment
  }
})
