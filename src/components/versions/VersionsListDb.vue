<template>
  <div class="main">
    <h1>VeLIS</h1>
    <b-table
      striped
      hover
      show-empty
      :items="versionsDb"
      :fields="fields"
    >
      <template slot="id" scope="row">{{row.value}}</template>
      <template slot="version" scope="row">{{row.value}}</template>
      <template slot="sql" scope="row">{{row.value}}</template>
      <template slot="commit" scope="row">{{row.value}}</template>
      <template slot="unixTime" scope="row">{{row.value}}</template>
      <template slot="actions" scope="row">
        <router-link :to="{ path: `/versions/list/${row.item.hash}` }">
          <b-btn size="sm">Редактировать</b-btn>
        </router-link>
      </template>


    </b-table>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'main',
  data () {
    return {
      fields: {
        id: { label: 'ID', sortable: true },
        version: { label: 'Версия', sortable: true },
        sql:{ label: 'SQL', sortable: true },
        commit:{ label: 'commit', sortable: true },
        unixTime:{ label: 'Время', sortable: true },
        actions:  { label: 'Управление' },

      },
    }
  },
  computed: {
    ...mapGetters([
      'versionsDb',
      'socket',
      'connected',
    ])
  },
  methods: {
    ...mapActions([
      'setVersionsList',
      'setVersionsDb'
    ]),


  },
  
  created: function() {
    if (!this.connected) {
      this.socket.on('connect', () => {
        this.socket.emit("getVersionsDb")
      })
    } else {
      this.socket.emit("getVersionsDb")
    }
    this.socket.on('versionsDb', (data) => {
      this.setVersionsDb(data);
    })
  }
}
</script>

<style scoped>

</style>
