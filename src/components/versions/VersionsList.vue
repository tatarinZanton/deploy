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
      <template slot="id" scope="row">{{row.value}}</template>
      <template slot="commits" scope="row">{{row.value}}</template>
      <template slot="commitsName" scope="row">{{row.value}}</template>
      <template slot="tags" scope="row">{{row.value}}</template>
      <template slot="edit" scope="row">
        <router-link :to="{ path: `/versions/list/${row.item.id}` }">
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
        commits: { label: 'Commit ID', sortable: true, 'class': 'text-center'  },
        commitsName: { label: 'Commit Name', sortable: true },
        tags: { label: 'Версия', sortable: true },
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
      'setVervionsList',
      'setVervionsDb'
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
      this.setVervionsList(data);
    })
  }
}
</script>

<style scoped>

</style>
