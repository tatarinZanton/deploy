<template>
  <div>
    <div class="my-1 row justify-content-md-center">
      <div class="col-md-4">
        <b-alert variant="success" :show="showAlert">
          Компания добавлена!
        </b-alert>
        <b-form v-on:submit.prevent="addCompany()">
          <b-form-fieldset horizontal label="Компания" :label-cols="2">
            <b-form-input
              v-model="company.company_name"
              type="text"
              placeholder="Enter company name"
              :formatter="format"
            ></b-form-input>
          </b-form-fieldset>
          <b-form-fieldset horizontal label="IP" :label-cols="2">
            <b-form-input
              v-model="company.ip_address"
              type="text"
              placeholder="Enter IP"
              :formatter="format"
            ></b-form-input>
          </b-form-fieldset>
          <b-form-fieldset horizontal label="Порт" :label-cols="2">
            <b-form-input
              v-model="company.port"
              type="number"
              placeholder="Enter port"
              :formatter="format"
            ></b-form-input>
          </b-form-fieldset>
          <b-form-fieldset horizontal label="HostName" :label-cols="2">
            <b-form-input
              v-model="company.hostname"
              type="text"
              placeholder="Enter hostname"
              :formatter="format"
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
              :formatter="format"
            ></b-form-input>
          </b-form-fieldset>
          <router-link to="/companies">
            <b-button>Cancel</b-button>
          </router-link>
          <b-button variant="primary" type="submit">Add</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'addCompany',
  data () {
    return {
      showAlert: false,
      company: {}
    }
  },
  sockets: {
    success: function(data, index=null) {
      if (data === "companyAdd") {
        this.showAlert = true
        setTimeout(() => this.$router.push('/companies'), 3000)
      }
    },
  },
  methods: {
    addCompany: function(){
      console.log(this.company);
      this.$socket.emit('addCompany', this.company);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
