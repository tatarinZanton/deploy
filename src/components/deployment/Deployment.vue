<template>
  <div class="main">
    <h1>Deployment</h1>
    <b-table
      striped
      hover
      show-empty
      :items="testingContainer"
      :fields="fields"
    >
      <template slot="id" scope="row">{{row.value}}</template>
      <template slot="name" scope="row">{{row.value}}</template>
      <template slot="ip_address" scope="row">{{row.value}}</template>
      <template slot="port" scope="row">{{row.value}}</template>
      <template slot="hostname" scope="row">{{row.value}}</template>
      <template slot="tls_key" scope="row">{{row.value}}</template>
      <template slot="testingContainerStatus" scope="row"

       >
       <span v-bind:class="[ row.item.connection ? connected : errorCon  ]">
      {{row.value}}</span>
    </template>
      <template slot="forUpload" scope="row">
        <b-form-checkbox
          id="checkbox1"
          v-bind:value="1"
          v-bind:unchecked-value="0"
          v-model="row.value"
        >
      </b-form-checkbox>
      </template>
      <template slot="actions" scope="row">
        <b-button v-if="!row.item.connection"  v-on:click="connectToTestingContainer(row.item)">Установить соединение</b-button>
        <b-button v-else v-on:click="disconnectFromTestingContainer(row.item)">Разорвать соединение</b-button>
      </template>
    </b-table>


    <router-link :to="{ path: `/deployment/branches` }">
      <b-btn size="sm">Ветки</b-btn>
    </router-link>
    <router-link :to="{ path: `/deployment/deploy-list` }">
      <b-btn size="sm">Deploy List</b-btn>
    </router-link>
    <router-view></router-view>
  </div>
  </template>

  <script>
  import Vue from 'vue'
  import { mapActions, mapState, mapGetters } from 'vuex'
  export default {
    name: 'deployment',
    data () {
      return {
        fields: {
          id:{ label: 'ID', sortable: true },
          name:{ label: 'Название', sortable: true },
          ip_address:{ label: 'IP адрес', sortable: true },
          port:{ label: 'Порт', sortable: true },
          hostname:{ label: 'Hostname', sortable: true },
          tls_key:{ label: 'TLS ключ', sortable: true },
          testingContainerStatus:{label:"Статус соединения", sortable: true},
          forUpload:{label:"Выгрузка", sortable: true},
          actions:  { label: 'Управение' },
        },
        connected : "connected",
        errorCon  : "errorCon"
      }
    },

    methods: {
      ...mapActions([
        'setTestingContainerToDeploy',
        'setConnectionErrTestingContainer',
        'setConnectionStatusTestingContainer'
      ]),
    connectToTestingContainer: function(container){
      this.socket.emit("connectToTestingContainer", container);
    },

    disconnectFromTestingContainer: function(container){
      this.socket.emit("disconnectFromTestingContainer", container);
    }

    },
    computed: {
      ...mapGetters([
        'testingContainer',
        'socket',
        'connected',
      ])
    },
    created: function() {
      if (!this.connected) {
        this.socket.on('connect', () => {
          this.socket.emit("getTestingContainerForDeploy");
        })
      } else {
        this.socket.emit("getTestingContainerForDeploy")
      }

      this.socket.on('testingContainerToDeploy', (data) => {
        this.setTestingContainerToDeploy(data);
      })
      this.socket.on('connectionErrTestingContainer', (i, m, e) => {

        this.setConnectionErrTestingContainer({index:i, msg:m});
      })
      this.socket.on('testingContainerConnected', (id) => {
        this.setConnectionStatusTestingContainer(id);
      })

    }
  }

  </script>

  <style scoped>
    .errorCon{
      color:red;
    }
    .connected{
      color:green;
    }
  </style>
