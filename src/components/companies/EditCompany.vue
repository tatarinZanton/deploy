<template>
  <div class="edit-company">
    <h1>{{ company.company_name }}</h1>
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
                v-bind:value="1"
                v-bind:unchecked-value="0"
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
import { mapActions, mapState, mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters([
        'socket',
        'connected',
        'companies',
      ]),
      company() {
        return this.$store.getters.company(this.$route.params.id)
      }
  },
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
  .edit-company {
    text-align: center;
  }
</style>
