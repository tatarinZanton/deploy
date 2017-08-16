import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueResource from 'vue-resource'
import VueSocketio from 'vue-socket.io'
import App from './App'
import router from './router'
import store from './store'


Vue.use(VueSocketio, server, store) // server - global var from WebPack
Vue.use(VueResource)
Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  template: '<App/>',
  components: { App },
  router,
  store
}).$mount('#app')
