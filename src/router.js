import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/company/:id',
    component: function(resolve){
      require(['./components/EditCompany'], resolve)
    }
  },
  {
    path: '/company',
    component: function(resolve){
      require(['./components/NewCompany'], resolve)
    }
  },
  {
    path: '/',
    component: function(resolve){
      require(['./components/Main'], resolve)
    }
  }
]

export default new VueRouter({
  routes
})
