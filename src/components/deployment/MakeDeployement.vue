<template>
  <div class="make-deploy">
    <h2>{{ deploymentBranch.name }}</h2>
    <div class="my-1 row justify-content-md-center">
      <div class="col-md-4">
        <b-alert variant="success" :show="showAlert">
            Deploy создан!
        </b-alert>
        <b-form v-on:submit.prevent="makeDeployement(deployName, deploymentBranch.name)">
          <b-form-fieldset horizontal label="Название" :label-cols="2">
            <b-form-input
              v-model="deployName = deploymentBranch.name"
              type="text"
              placeholder="Введите название"
            ></b-form-input>
          </b-form-fieldset>
          <router-link to="/deployment/branches">
            <b-button>Cancel</b-button>
          </router-link>
          <b-button variant="primary" type="submit">Создать Deploy</b-button>
        </b-form>
      </div>
    </div>
      <terminal v-bind:msg="prepareDeployConsole"></terminal>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import Terminal from '../Terminal'

Vue.component('terminal', Terminal)

export default {
  name: 'editCompany',
  data () {
    return {
      showAlert: false,
      deployName: "",
      deployPrefix:"deploy_",
      consoleDepMsg: "",
      consoleShow: false,
    }
  },
  methods: {
    ...mapActions([
      'setBranches',
      'addPrepareDeployConsole',
    ]),
    makeDeployement: function(deployBranch, referenceBranch) {
      this.consoleShow = true;
      this.socket.emit("makeDeployement", this.deployPrefix+deployBranch, referenceBranch);
    },
    format(value, el) {
      return String(value)
    }
  },
  computed: {
    ...mapGetters([
        'socket',
        'connected',
        'deploymentBranches',
        'prepareDeployConsole',
      ]),
      deploymentBranch() {
        return this.$store.getters.deploymentBranch(this.$route.params.branch)
      }
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

    this.socket.on('prepareDeployConsole', data => {
      this.addPrepareDeployConsole(data);
    });
    this.socket.on('prepareDeploySuccess', data => {
      this.showAlert = true
      setTimeout(() => this.$router.push('/deployment/deploy-list'), 3000)
    });
  }
  // created: function(){
  //   this.socket.on('connect', () => {
  //     if (!this.companies.length) {
  //       this.socket.emit("getCompanies")
  //       this.socket.on('resiveCompanies', companies => this.getCompanies(companies))
  //     }
  //   })
  //   this.socket.on('success', (data, index=null) => {
  //     if (data === "companyEdit") {
  //       this.showAlert = true
  //       setTimeout(() => this.$router.push('/companies'), 3000)
  //     }
  //   })
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .edit-company {
    text-align: center;
  }
</style>
