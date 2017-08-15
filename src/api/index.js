import Vue from 'vue'
import VueSocketio from 'vue-socket.io'

Vue.use(VueSocketio, server) // server - global var from WebPack 

export const getPeople = () => {
  // return Vue.http.get('/')
}
