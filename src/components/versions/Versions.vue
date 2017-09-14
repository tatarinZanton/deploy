<template>
  <div class="main">
    <router-link :to="{ path: `/versions/list` }">
      <b-btn size="sm">Доступные версии</b-btn>
    </router-link>
    <router-link :to="{ path: `/versions/listdb` }">
      <b-btn size="sm">Текущие версии</b-btn>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'

</script>

<style scoped>

</style>
