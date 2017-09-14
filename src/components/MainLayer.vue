
<template>
    <div>
        <b-navbar toggleable type="dark" variant="light">
          <b-nav-toggle target="nav_collapse"></b-nav-toggle>
          <b-navbar-brand href="#">Navion deployer</b-navbar-brand>
          <b-collapse is-nav id="nav_collapse">

            <b-nav is-nav-bar>
              <b-nav-item href="#/companies">Companies</b-nav-item>
              <b-nav-item href="#">Logs</b-nav-item>
              <b-nav-item href="#/versions">Версии</b-nav-item>
            </b-nav>


            <!-- Right aligned nav items -->
            <!-- <b-nav is-nav-bar class="ml-auto">
              <b-nav-item-dropdown right>
                <template slot="button-content">
                  <em>User</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Signout</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-nav> -->
          </b-collapse>
        </b-navbar>
        <div class="logo">
          <img src="../assets/logo.png" width="150px" height="150px">
        </div>
        <b-modal
          id="connectionModal"
          hide-header-close
          hide-header
          hide-footer
          :visible="!connected"
          no-close-on-backdrop
         >
          <h1>Connecting</h1>
          <b-progress :value="100" animated></b-progress>
        </b-modal>
        <router-view></router-view>
    </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import io from 'socket.io-client'
  export default {
    methods: {
      ...mapActions([
        'setConnection',
        'setSocket'
      ]),
    },
    computed: {
      ...mapGetters([
          'connected',
          'socket',
        ])
    },
    created: function(){
      this.setSocket(io(server))// io - socket initializing, server - global var from WebPack
      this.socket.on('connect', () => this.setConnection(true))
      this.socket.on('disconnect', () => this.setConnection(false))
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    text-align: center;
  }
</style>
