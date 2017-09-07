import Vuex from 'vuex'
import Vue from 'vue'
import companies from './modules/companies'
import connection from './modules/connection'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    companies,
    connection
  }
})
