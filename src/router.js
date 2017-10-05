import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: resolve => require(['./components/NotFound'], resolve)
  },
  {
    path: '/', redirect: { path: '/companies' },
    component: resolve => require(['./components/MainLayer'], resolve),
    children: [
      {
        path: 'companies',
        component: resolve => require(['./components/companies/Companies'], resolve)
      },
      {
        path: 'deployment',
        component: resolve => require(['./components/deployment/Deployment'], resolve),
        children: [
          {
            path: 'branches',
            component: resolve => require(['./components/deployment/DeploymentBranches'], resolve),
          },
          {
            path: 'deploy-list',
            component: resolve => require(['./components/deployment/DeploymentList'], resolve),
          },
          {
            path: 'make-deploy/:branch',
            component: resolve => require(['./components/deployment/MakeDeployement'], resolve)
          },
        ]
      },
      {
        path: 'company/:id',
        component: resolve => require(['./components/companies/EditCompany'], resolve)
      },
      {
        path: 'company',
        component: resolve => require(['./components/companies/NewCompany'], resolve)
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
            path: 'list/:hash',
            component: resolve => require(['./components/versions/MakeVersion'], resolve)
          },
          {
            path: 'listdb',
            component: resolve => require(['./components/versions/VersionsListDb'], resolve),
          }
        ]
      },
    ]
  },
]

export default new VueRouter({
  routes
})
