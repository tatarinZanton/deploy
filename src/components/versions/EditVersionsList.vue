<template>
  <div class="edit-version-list">
    <h1>{{ versionItem.shortHash }}</h1>
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
