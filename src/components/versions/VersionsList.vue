<template>
  <div class="main">
    <h1>VeLIS</h1>
    <b-table
      striped
      hover
      show-empty
      :items="versionsList"
      :fields="fields"
    >
      <template slot="shortHash" scope="row">{{row.value}}</template>
      <template slot="name" scope="row">{{row.value}}</template>
      <template slot="unixTime" scope="row">{{row.value}}</template>
      <template slot="version" scope="row">{{row.value}}</template>
      <template slot="actions" scope="row">

        <router-link :to="{ path: `/versions/list/${row.item.hash}` }" v-if="!row.item.version">
          <b-btn size="sm">Создать версию</b-btn>
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
        shortHash:{ label: 'Hash', sortable: true },
        name: { label: 'Имя коммита', sortable: true, 'class': 'text-center'  },
        unixTime :{ label: 'Время создания коммита', sortable: true },
        version: { label: 'Версия', sortable: true },
        actions:  { label: 'Управление' },
      },
    }
  },
  computed: {
    ...mapGetters([
      'versionsList',
      'socket',
      'connected',
    ])
  },
  methods: {
    ...mapActions([
      'setVersionsList',
    ]),


  },
  created: function() {
    if (!this.connected) {
      this.socket.on('connect', () => {
        this.socket.emit("getVersionsList")
      })
    } else {
      this.socket.emit("getVersionsList")
    }
    this.socket.on('versionsList', (data) => {
      this.setVersionsList(data);
    })
  }
}
</script>

<style scoped>

</style>
