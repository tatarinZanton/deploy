
<template>
    <div>
        <!-- Modal Component -->
        <b-modal
          id="connectionModal"
          hide-header-close
          hide-header
          hide-footer
          :visible="connected"
          no-close-on-backdrop
         >
          <h1>Connecting</h1>
          <b-progress :value="100" animated></b-progress>
        </b-modal>
        <router-view></router-view>
    </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import io from 'socket.io-client'
  import socket from '../main'
  export default {
    methods: {
      ...mapActions([
        'setConnection',
      ]),
    },
    computed: mapState({
      connected: state => !state.connection.connected
    }),
    created: function(){
      const socket = io(server) // io - socket initializing, server - global var from WebPack
      socket.on('connect', () => this.setConnection(true))
      socket.on('disconnect', () => this.setConnection(false))
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
