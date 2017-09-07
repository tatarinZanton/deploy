<template>
  <div class="main">
    <b-button-group>
      <b-button>Компании</b-button>
      <b-button>Логи</b-button>
      <b-button>Архив</b-button>
      <b-button v-bind:disabled="blockDeployBut" v-on:click="prepareDeploy">Prepare Deploy</b-button>
      <b-button v-bind:disabled="blockUpAllBut" v-on:click="updateAll">Обновить всех</b-button>
      <b-button href="#/company">Добавить компанию</b-button>
    </b-button-group>

    <b-alert variant="success" :show="showAlert.show">
        {{showAlert.msg}}
    </b-alert>

    <div class="my-1 row justify-content-md-center">
      <div class="col-md-6">
        <b-form-input
          v-model="filter"
          placeholder="Type to Search"
          :formatter="format"
          lazy-formatter
        />
      </div>
    </div>

    <b-table
      striped
      hover
      show-empty
      :items="companies"
      :fields="fields"
      :filter="filter"
    >
      <template slot="id" scope="row">{{row.value}}</template>
      <template slot="company_name" scope="row">{{row.value}}</template>
      <template slot="ip_address" scope="row">{{row.value}}</template>
      <template slot="port" scope="row">{{row.value}}</template>
      <template slot="hostname" scope="row">{{row.value}}</template>
      <template slot="payed" scope="row">{{row.value ? 'YES' : 'NO'}}</template>
      <template slot="tls_key" scope="row">{{row.value}}</template>
      <template slot="conStatus" scope="row">{{row.value}}</template>
      <template slot="actions" scope="row">
        <b-btn size="sm" v-b-modal.confirmModal @click.stop="companyEditor = row">Удалить</b-btn>
        <router-link :to="{ path: `company/${row.item.id}` }">
          <b-btn size="sm">Редактировать</b-btn>
        </router-link>
        <b-btn size="sm" @click.stop="updateClient(row.company, row.index)">Обновить контейнер</b-btn>
      </template>
    </b-table>

    <b-modal close-title="Cancel" id="confirmModal" @ok="deleteCompany(companyEditor.item.id)">
      Realy delete {{companyEditor.item ? companyEditor.item.company_name : ''}}?
    </b-modal>

  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'main',
  data () {
    return {
      showAlertDel: false,
      showAlertDeploy: false,
      showAlert: {
        show: false,
        msg: '',
      },
      fields: {
        id: { label: 'ID', sortable: true },
        company_name: { label: 'Компания', sortable: true },
        ip_address: { label: 'IP', sortable: true, 'class': 'text-center'  },
        port: { label: 'Порт' },
        hostname:  { label: 'HostName', sortable: true },
        payed:  { label: 'Оплата', sortable: true },
        tls_key:  { label: 'Ключ TLS' },
        conStatus:  { label: 'Статус' },
        actions:  { label: 'Управление' },
      },
      filter: null,
      blockDeployBut : false,
      blockUpAllBut : false,
      companyEditor: {},
      consoleDepMsg: "",
      consoleShow: false
    }
  },
  methods: {
    ...mapActions([
      'getCompanies',
      'getCompaniesStatusTls',
      'getCompaniesStatusErr',
    ]),
    showAlertMsg: function (msg) {
      this.showAlert.msg = msg
      this.showAlert.show = true
      setTimeout(() => (this.showAlert.show = false), 3000)
    },
    showCompanyForm: function() {
      this.formSeen = !this.formSeen;
    },
    editClient: function(company) {
      this.showModal = true
      this.companyEditor = company
    },
    deleteCompany: function(id) {
      this.socket.emit("deleteCompany", id);
    },
    prepareDeploy : function(){
      app.blockDeployBut = true;
      this.socket.emit("prepareDeploy");
    },
    updateClient:function(company, index){
      app.companies[index].companyUpBut = true;
      this.socket.emit("updateClient",  company, index);
    },
    updateAll:function() {
      for (var i = 0; i < app.companies.length; i++) {
        if (app.companies[i].payed) {
            this.socket.emit("updateClient", app.companies[i], i);
        }
      }
    },
    clearName() {
      this.name = '';
    },
    submit(e) {
      if (!this.name) {
        alert('Please enter your name');
        return e.cancel();
      }
      this.names.push(this.name);
      this.name = '';
    }
  },
  computed: mapState({
    companies: state => state.companies.list,
    socket: state => state.connection.socket
  }),
  created: function() {
    this.socket.emit("getCompanies")
    this.socket.on('resiveCompanies', companies => {
      for (var i = 0; i < companies.length; i++) {
        companies[i].companyEdit = false;
        companies[i].companyUpBut = false;
        companies[i].consoleOut="";
        companies[i].conStatus="";
      }
      this.getCompanies(companies)
      console.dir(companies);
      this.socket.emit("initConnection", companies);
    })
    this.socket.on('success', (data, index=null) => {
      switch (data) {
        case "companyDel":
          this.showAlertMsg('Компания удалена!')
          this.socket.emit("getCompanies")
          break;
        case "prepareDeploy":
          this.showAlertMsg('Деплой готов!')
          // this.blockDeployBut = false;
          break;
        case "updateClient":
          this.showAlertMsg(`Компания ${this.companies[index] ? this.companies[index].company_name : ''} обновлена!`)
          // this.companies[index].companyUpBut = false;
          break;
      }
      this.socket.emit("getCompanies")
    })
    this.socket.on('certNotFound', index => {
      this.getCompaniesStatusTls(index)
    })
    this.socket.on('consoleOut', data => {
      console.dir(data);
      this.companies[data.index].consoleOut += data + "|||";
    })
    this.socket.on('prepareDeployErr', (stderr, error) => {
      console.dir(error);
      console.dir(stderr);
    })
    this.socket.on('clientConnected', index => {
      this.companies[index].conStatus = "Client connected!"
      // console.log("client " + app.companies[index].company_name + " connected")
    })
    this.socket.on('connectionErr', err => {
      console.dir(err);
      this.getCompaniesStatusErr(err)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
