
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
  export default {
    methods: {
      ...mapActions([
        'setConnection',
        'setSocket'
      ]),
    },
    computed: mapState({
      connected: state => !state.connection.connected,
      socket: state => state.connection.socket
    }),
    created: function(){
      this.setSocket(io(server))// io - socket initializing, server - global var from WebPack
      this.socket.on('connect', () => this.setConnection(true))
      this.socket.on('disconnect', () => this.setConnection(false))
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
