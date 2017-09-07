
<template>
    <div>
        <!-- Modal Component -->
        <b-modal
          id="modal1"
          ref="modal1"
          title="Connecting"
         >
          <h1>Connecting</h1>
        </b-modal>
    </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import io from 'socket.io-client'
  import socket from '../main'
  export default {
    // data () {
    //   return {
    //   }
    // },
    methods: {
      ...mapActions([
        'setConnection',
      ]),
      // handleSubmit() {
      //   this.names.push(this.name);
      //   this.clearName();
      //   this.$refs.modal1.hide()
      // }
    },
    created: function(){
      const socket = io(server) // io - socket initializing, server - global var from WebPack
      socket.on('connect', () => {
        console.log(socket.id)
        this.$refs.modal1.show()
      });
      // this.setConnection(err)
      // this.$refs.modal1.show();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
