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
      <template slot="hash" scope="row">{{row.value}}</template>
      <template slot="name" scope="row">{{row.value}}</template>
      <template slot="version" scope="row">{{row.value}}</template>
      <template slot="edit" scope="row">
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
        hash: { label: 'Hash', sortable: true },
        name: { label: 'Название', sortable: true, 'class': 'text-center'  },
        version: { label: 'Версия', sortable: true },
      },
    }
  },
  computed: {
    ...mapGetters([
      'versionsList',
      'socket',
    ])
  },
  methods: {
    ...mapActions([
      'setVervionsList',
      'setVervionsDb'
    ]),


  },
  created: function() {
    this.socket.on('connect', () => {
      this.socket.emit("getVersionsList");
    })
    this.socket.on('versionsList', (data) => {
      this.setVervionsList(data);
    })
  }
}
</script>

<style scoped>

</style>
