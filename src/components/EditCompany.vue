<template>
  <div class="hello">
    <h1>{{ company.company_name }}</h1>
    <!-- <form class="companyForm" id="addCompany" method="post" v-on:submit="addCompany" >
      Компания:<input type="text" name="companyName" v-model="newCompany.company_name">
      IP:<input type="text" name="companyIP" v-model="newCompany.ip_address">
      Порт:<input type="text" name="companyPort" v-model="newCompany.port">
      HostName <input type="text" name="hostname" v-model="newCompany.hostname">
      Оплата:<input type="checkbox" name="payment" v-model="newCompany.payed">
      Ключ TLS:<input type="text" name="tlsKey" v-model="newCompany.tls_key">
      <input type="submit" name="addCompany">
    </form> -->

    <div class="my-1 row justify-content-md-center">
      <div class="col-md-4">
        <b-alert variant="success" :show="showAlert">
            Компания изменена!
        </b-alert>
        <b-form v-on:submit.prevent="editCompany()">
          <b-form-fieldset horizontal label="Компания" :label-cols="2">
            <b-form-input
              v-model="company.company_name"
              type="text"
              placeholder="Enter company name"
            ></b-form-input>
          </b-form-fieldset>
          <b-form-fieldset horizontal label="IP" :label-cols="2">
            <b-form-input
              v-model="company.ip_address"
              type="text"
              placeholder="Enter IP"
            ></b-form-input>
          </b-form-fieldset>
          <b-form-fieldset horizontal label="Порт" :label-cols="2">
            <b-form-input
              v-model="company.port"
              type="text"
              placeholder="Enter port"
              :formatter="format"
            ></b-form-input>
          </b-form-fieldset>
          <b-form-fieldset horizontal label="HostName" :label-cols="2">
            <b-form-input
              v-model="company.hostname"
              type="text"
              placeholder="Enter hostname"
            ></b-form-input>
          </b-form-fieldset>
          <b-form-fieldset horizontal label="Оплата" :label-cols="2">
            <div class="text-left">
              <b-form-checkbox
                id="checkbox1"
                v-model="company.payed"
              >
              </b-form-checkbox>
            </div>
          </b-form-fieldset>
          <b-form-fieldset horizontal label="Ключ" :label-cols="2">
            <b-form-input
              v-model="company.tls_key"
              type="text"
              placeholder="Enter key"
            ></b-form-input>
          </b-form-fieldset>
          <router-link to="/companies">
            <b-button>Cancel</b-button>
          </router-link>
          <b-button variant="primary" type="submit">Save</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'editCompany',
  data () {
    return {
      showAlert: false,
    }
  },
  methods: {
    ...mapActions([
      'getCompanies',
    ]),
    editCompany: function() {
      this.socket.emit("editCompany", this.company);
    },
    format(value, el) {
      return String(value)
    }
  },
  computed: mapState({
    company: function(state) {
        const comp = state.companies.list.filter(f => (String(this.$route.params.id) === String(f.id)))
        return comp.length ? comp[0] : {}
    },
    socket: state => state.connection.socket,
    connected: state => state.connection.connected,
    companies: state => state.companies.list,
  }),
  created: function(){
    this.socket.on('connect', () => {
      if (!this.companies.length) {
        this.socket.emit("getCompanies")
        this.socket.on('resiveCompanies', companies => this.getCompanies(companies))
      }
    })
    this.socket.on('success', (data, index=null) => {
      if (data === "companyEdit") {
        this.showAlert = true
        setTimeout(() => this.$router.push('/companies'), 3000)
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
