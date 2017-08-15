import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   component: function(resolve){
  //     require(['./components/Hello'], resolve)
  //   }
  // },
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
