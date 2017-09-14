import Vuex from 'vuex'
import Vue from 'vue'
import companies from './modules/companies'
import connection from './modules/connection'
import versions from './modules/versions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    companies,
    connection,
    versions
  }
})
