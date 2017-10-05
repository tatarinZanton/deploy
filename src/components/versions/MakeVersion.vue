<template>
  <div class="edit-version-list">
    <h1>Cоздание версии</h1>



    <b-form v-on:submit.prevent="addVersion()">
      <b-container class="bv-example-row">
        <b-row>
        <b-col><b-form-input
          v-model="versionItem.major"
          type="number"
          placeholder="Введите номер версии"
          :formatter="format"
        ></b-form-input></b-col>
        <b-col><b-form-input
          v-model="versionItem.minor"
          type="number"
          placeholder="Введите номер версии"
          :formatter="format"
        ></b-form-input></b-col>
        <b-col><b-form-input
          v-model="versionItem.build"
          type="number"
          placeholder="Введите номер версии"
          :formatter="format"
        ></b-form-input></b-col>
        <b-col><b-form-input
          v-model="versionItem.revision"
          type="number"
          placeholder="Введите номер версии"
          :formatter="format"
        ></b-form-input></b-col>
      </b-row>
  </b-container>


    <b-form-fieldset horizontal label="SQL" :label-cols="2">
        <b-form-textarea
          v-model="versionItem.note"
          placeholder="Введите SQL запросы"
          :formatter="format"
          rows="5">
        </b-form-textarea>
      </b-form-fieldset>

      <b-form-fieldset horizontal label="Примечания" :label-cols="2">
        <b-form-textarea
          v-model="versionItem.note"
          type="text"
          placeholder="Введите примечания"
          :formatter="format"
        ></b-form-textarea>
      </b-form-fieldset>

      <router-link to="/versions/list/">
        <b-button>Отменить</b-button>
      </router-link>
     <b-button variant="primary" type="submit">Создать</b-button>
    </b-form>

  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'makeVersion',
  data () {
    return {
      showAlert: false,
      version:{}
    }
  },
  computed: {
    ...mapGetters([
        'socket',
        'connected',
        'versions',
      ]),
      versionItem() {
        return this.$store.getters.versionItem(this.$route.params.hash)
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .edit-company {
    text-align: center;
  }
</style>
