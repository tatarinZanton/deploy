<template>
  <div class="main">
    <h1>Ветки</h1>
    <b-table
      striped
      hover
      show-empty
      :items="deploymentBranches"
      :fields="fields"
    >
      <template slot="name" scope="row">{{row.value}}</template>
      <template slot="commitTime" scope="row">{{row.value}}</template>
      <template slot="actions" scope="row">

        <router-link :to="{ path: `/deployment/make-deploy/${row.item.name}` }">
          <b-btn size="sm">Создать deploy</b-btn>
        </router-link>
      </template>
    </b-table>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapActions, mapState, mapGetters } from 'vuex'
  export default {
    name: 'deploymentBranches',
    data () {
      return {
        fields: {
          name:{ label: 'Название', sortable: true },
          actions:  { label: 'Управление' },
        },
      }
    },

    methods: {
      ...mapActions([
        'setBranches',
      ]),
    updateDeploymentBranches: function(){
      this.socket.emit("updateDeploymentBranches");
    }

    },
    computed: {
      ...mapGetters([
        'deploymentBranches',
        'socket',
        'connected',
      ])
    },
    created: function() {
      if (!this.connected) {
        this.socket.on('connect', () => {
          this.socket.emit("getDeploymentBranches")
        ;
        })
      } else {

        this.socket.emit("getDeploymentBranches")
      }

      this.socket.on('deploymentBranches', (data) => {
        this.setBranches(data);
      })
    }
  }
</script>

<style scoped>

</style>
