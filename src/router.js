import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/',
    redirect: { path: '/companies' },
    component: resolve => require(['./components/MainLayer'], resolve),
    children: [
      {
        path: 'companies',
        component: resolve => require(['./components/Companies'], resolve)
      },
      {
        path: 'company/:id',
        component: resolve => require(['./components/EditCompany'], resolve)
      },
      {
        path: 'company',
        component: resolve => require(['./components/NewCompany'], resolve)
      },
      {
        path: 'versions',
        component: resolve => require(['./components/versions/Versions'], resolve),
        children: [
        {
          path: 'list',
          component: resolve => require(['./components/versions/VersionsList'], resolve),
        },
        {
          path: 'listdb',
          component: resolve => require(['./components/versions/VersionsListDb'], resolve),
        }
      ]
      },
      {
        path: '*',
        component: resolve => require(['./components/NotFound'], resolve)
      },
    ]

  },
]

export default new VueRouter({
  routes
})
