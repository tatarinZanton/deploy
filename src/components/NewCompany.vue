<template>
  <div class="hello">
    <h1>Create</h1>
    <!-- <form class="companyForm" id="addCompany" method="post" v-on:submit="addCompany" >
      Компания:<input type="text" name="companyName" v-model="newCompany.company_name">
      IP:<input type="text" name="companyIP" v-model="newCompany.ip_address">
      Порт:<input type="text" name="companyPort" v-model="newCompany.port">
      HostName <input type="text" name="hostname" v-model="newCompany.hostname">
      Оплата:<input type="checkbox" name="payment" v-model="newCompany.payed">
      Ключ TLS:<input type="text" name="tlsKey" v-model="newCompany.tls_key">
      <input type="submit" name="addCompany">
    </form>

    <form class="editCompany" v-on:submit.prevent="editCompany(company)" v-if="company.companyEdit">
      Компания:<input type="text" name="companyName" v-model="company.company_name" >
      IP:<input type="text" name="companyIP" v-model="company.ip_address" >
      Порт:<input type="text" name="companyPort" v-model="company.port">
      HostName <input type="text" name="hostname" v-model="company.hostname">
      Оплата:<input type="checkbox" name="payment" v-model="company.payed">
      Ключ TLS:<input type="text" name="tlsKey" v-model="company.tls_key">
      <input type="submit" name="addCompany" value="Сохранить">
    </form> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    ...mapActions([
      'getPeople'
    ])
  },
  computed: {
    friends() {
      return this.$store.getters.people
    }
  }

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
