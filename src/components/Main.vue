<template>
  <div class="main">

    <nav>
      <button type="button" name="companies" v-on:click="teest()">Компании</button>
      <button type="button" name="logs">Логи</button>
      <button type="button" name="archive" >Архив</button>
      <button type="button" name="prepareDeploy" v-bind:disabled="blockDeployBut" v-on:click="prepareDeploy">Prepare Deploy</button>
      <button type="button" name="blockUpAllBut" v-bind:disabled="blockUpAllBut" v-on:click="updateAll">Обновить всех</button>
    </nav>

    <button type="button" name="button" v-on:click="showCompanyForm">Добавить компанию</button>
    <!-- <div v-if="formSeen">
      <form class="companyForm" id="addCompany" method="post" v-on:submit="addCompany" >
        Компания:<input type="text" name="companyName" v-model="newCompany.company_name">
        IP:<input type="text" name="companyIP" v-model="newCompany.ip_address">
        Порт:<input type="text" name="companyPort" v-model="newCompany.port">
        HostName <input type="text" name="hostname" v-model="newCompany.hostname">
        Оплата:<input type="checkbox" name="payment" v-model="newCompany.payed">
        Ключ TLS:<input type="text" name="tlsKey" v-model="newCompany.tls_key">
        <input type="submit" name="addCompany">
      </form>
    </div> -->

    <b-table striped hover show-empty
      :items="companies"
      :fields="fields"
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
        <b-btn size="sm" @click.stop="deleteCompany(row.id)">Удалить</b-btn>
        <b-btn size="sm" @click.stop="row.companyEdit = !row.companyEdit">Редактировать</b-btn>
        <b-btn size="sm" @click.stop="updateClient(row.company,row.index)">Обновить контейнер</b-btn>
      </template>
    </b-table>



<hr>
    <ol>
      <li v-for="(company, index) in companies">
        <span>ID:{{company.id}}</span>
        <span>Компания:{{company.company_name}}</span>
        <span>IP:{{company.ip_address}}</span>
        <span>Порт:{{company.port}}</span>
        <span>HostName:{{company.hostname}}</span>
        <span>Оплата:{{company.payed}}</span>
        <span>Ключ TLS:{{company.tls_key}}</span>
        <button type="button" name="deleteCompany" v-on:click="deleteCompany(company.id)">Удалить</button>
        <button type="button" name="edit" v-on:click="company.companyEdit = !company.companyEdit">Редактировать</button>
        <button type="button" name="updateClient" v-bind:disabled="company.companyUpBut" v-on:click="updateClient(company, index)">Обновить контейнер</button>
        <div class="containerStatus">
            {{company.conStatus}}
        </div>

        <form class="editCompany" v-on:submit.prevent="editCompany(company)" v-if="company.companyEdit">
          Компания:<input type="text" name="companyName" v-model="company.company_name" >
          IP:<input type="text" name="companyIP" v-model="company.ip_address" >
          Порт:<input type="text" name="companyPort" v-model="company.port">
          HostName <input type="text" name="hostname" v-model="company.hostname">
          Оплата:<input type="checkbox" name="payment" v-model="company.payed">
          Ключ TLS:<input type="text" name="tlsKey" v-model="company.tls_key">
          <input type="submit" name="addCompany" value="Сохранить">
        </form>

      </li>
    </ol>

  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'

export default {
  name: 'main',
  data () {
    return {
      companies: [],
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
      formSeen : false,
      blockDeployBut : false,
      blockUpAllBut : false,
      newCompany:{},
      consoleDepMsg:"",
      consoleShow:false
    }
  },
  sockets: {
    connect: function() {
      this.$socket.emit("getCompanies")
      // console.log('socket connected')
    },
    resiveCompanies: function(companies){
      for (var i = 0; i < companies.length; i++) {
        companies[i].companyEdit = false;
        companies[i].companyUpBut = false;
        companies[i].consoleOut="";
        companies[i].conStatus="";
      }
      this.companies = companies;
      console.dir(companies);
      this.$socket.emit("initConnection", companies);
    },
    success: function(data, index=null) {
      switch (data) {
        case "companyAdd":
          alert("Компания добавлена!");
          this.newCompany = {};
          this.$socket.emit("getCompanies");
          break;
        case "companyDel":
          alert("Компания удалена!");
          this.$socket.emit("getCompanies");
          break;
        case "companyEdit":
          alert("Компания изменена!");
          this.$socket.emit("getCompanies");
          break;
        case "prepareDeploy":
          alert("Deploy готов!");
          this.blockDeployBut = false;
          break;
        case "updateClient":
          alert("Компания "+ this.companies[index].company_name + " обновлена!");
          this.companies[index].companyUpBut = false;
          break;
      }
    },
    unblock: function(index) {
      this.companies[index].companyUpBut = false
    },
    deployConsole: function(msg) {
      this.consoleDepMsg += msg
    },
    certNotFound: function(index) {
      this.companies[index].conStatus = "tls not Found!";
      console.log("Company "+ this.companies[index].company_name + " tls not found");
    },
    consoleOut: function(data, index) {
      console.log(data);
      this.companies[index].consoleOut += data + "|||";
    },
    prepareDeployErr: function(stderr, error) {
      console.dir(error);
      console.dir(stderr);
    },
    clientConnected: function(index) {
      this.companies[index].conStatus = "Client connected!";
      // console.log("client " + app.companies[index].company_name + " connected");
    },
    connectionErr: function (err, index) {
      this.companies[index].conStatus = "connection Error";
      console.log("Error on company " + this.companies[index].company_name);
      console.dir(err);
    }
  },
  methods: {
    ...mapActions([
      // 'getPeople'
    ]),
    showCompanyForm: function(){
      this.formSeen = !this.formSeen;
    },
    teest: function(){
      this.$socket.emit("getCompanies")
    },
    addCompany:function(e){
      e.preventDefault();
      this.$socket.emit('addCompany', this.newCompany);
    },
    editCompany:function(company){
      this.$socket.emit("editCompany", company);
    },
    deleteCompany: function(id){
      this.$socket.emit("deleteCompany", id);
    },
    prepareDeploy : function(){
      app.blockDeployBut = true;
      this.$socket.emit("prepareDeploy");
    },
    updateClient:function(company, index){
      app.companies[index].companyUpBut = true;
      this.$socket.emit("updateClient",  company, index);
    },
    updateAll:function(){
      for (var i = 0; i < app.companies.length; i++) {
        if (app.companies[i].payed) {
            this.$socket.emit("updateClient", app.companies[i], i);
        }
      }
    }
  },
  // created () {
  //   console.log('sdf');
  //   this.$socket.emit("getCompanies")
  // }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
