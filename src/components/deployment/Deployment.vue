<template>
  <div class="main">
    <h1>Deployment</h1>

    <router-link :to="{ path: `/deployment/branches` }">
      <b-btn size="sm">Ветки</b-btn>
    </router-link>
    <router-link :to="{ path: `/deployment/deploy-list` }">
      <b-btn size="sm">Deploy List</b-btn>
    </router-link>
    <router-view></router-view>
  </div>
  </template>

  <script>
  import Vue from 'vue'


  </script>

  <style scoped>

  </style>
