<template>
  <div class="main">
    <b-alert variant="success" :show="showAlert.show" class="event-alerts">
        {{showAlert.msg}}
    </b-alert>
    <h1>Deploy List</h1>
    <b-table
      striped
      hover
      show-empty
      :items="deploymentList"
      :fields="fields"
    >
    <template slot="name" scope="row">{{row.value}}</template>
    <template slot="referenceBranch" scope="row">{{row.value}}</template>
    <template slot="createTime" scope="row">{{row.value}}</template>
    <template slot="actions" scope="row">
      <b-btn size="sm" v-b-modal.confirmModal @click.stop="deploymentListEditor = row">Удалить</b-btn>
      <router-link :to="{ path: `/deployment/deploy-list/${row.item.id}` }">
        <b-btn size="sm">Редактировать</b-btn>
      </router-link>
      <b-btn size="sm" @click.stop="uploadToTesting(row.item)">Выложить на тест</b-btn>
    </template>
  </b-table>

  <b-modal close-title="Cancel" id="confirmModal" @ok="delDeploymentList(deploymentListEditor.item.id)">
    Удалить {{deploymentListEditor.item ? deploymentListEditor.item.name : ''}}?
  </b-modal>

  </div>
  </template>

  <script>
  import Vue from 'vue'
  import { mapActions, mapState, mapGetters } from 'vuex'
  export default {
    name: 'deploymentList',
    data () {
      return {
        showAlert: {
          show: false,
          msg: '',
        },
        showAlertDel: false,
        fields: {
          name:{ label: 'Название', sortable: true },
          referenceBranch:{ label: 'Опорная ветка', sortable: true },
          createTime:{ label: 'Время создания', sortable: true },
          actions:  { label: 'Управление' },
        },
        deploymentListEditor:{}
      }
    },

    methods: {
      ...mapActions([
        'setDeploymentList',
      ]),
      showAlertMsg: function (msg) {
        this.showAlert.msg = msg
        this.showAlert.show = true
        setTimeout(() => (this.showAlert.show = false), 3000)
      },
      uploadToTesting:function(deploy){
        this.socket.emit("uploadToTesting", deploy, this.testingContainer[0].id);
      },
      delDeploymentList:function(id){
        this.socket.emit("delDeploymentList", id);
      },
    },
    computed: {
      ...mapGetters([
        'testingContainer',
        'deploymentList',
        'socket',
        'connected',
      ])
    },
    created: function() {
      if (!this.connected) {
        this.socket.on('connect', () => {
          this.socket.emit("getDeploymentList")
        ;
        })
      } else {

        this.socket.emit("getDeploymentList")
      }

      this.socket.on('deploymentList', (data) => {
        this.setDeploymentList(data);
      })
      this.socket.on('delDeploymentList', () => {
        this.showAlertMsg('Deploy удален!')
        this.socket.emit("getDeploymentList")
      })

    }
  }
  </script>

  <style scoped>

  </style>
