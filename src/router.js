import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: { path: '/company' }},
  {
    path: '/company',
    component: resolve => require(['./components/List'], resolve)
  },
  {
    path: '/company/:id',
    component: resolve => require(['./components/EditCompany'], resolve)
  },
  {
    path: '/company/new',
    component: resolve => require(['./components/NewCompany'], resolve)
  },
]

export default new VueRouter({
  routes
})
