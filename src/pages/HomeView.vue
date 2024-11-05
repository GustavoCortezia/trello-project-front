<script setup lang="ts">
import { getEnvironments } from '@/services/api';

onMounted(() => {
  const response = getEnvironments(1);
  console.log(response);

});
</script>

<template>
  <v-app-bar :elevation="2" rounded>
    <v-app-bar-title>Planify</v-app-bar-title>
    <v-btn icon="mdi-heart"></v-btn>
    <v-btn icon="mdi-magnify"></v-btn>
    <v-btn icon="mdi-plus"></v-btn>
  </v-app-bar>

  <v-container>
    <div class="d-flex justify-space-around">
      <h1 class="pa-12">My Environments</h1>
      <v-btn  class="create-btn"> <v-icon icon="mdi-plus" start></v-icon>Create new Environment</v-btn>
    </div>

    <v-container class="d-flex justify-center">
      <div class="environment-card-div"></div>
    </v-container>

  </v-container>
</template>

<style scoped>
  .environment-card-div{
    border: 2px solid red;
    width: 80%;
    height: 50px;
  }

  .create-btn{
    position: fixed;
    right: 50px;
    bottom: 60px;
  }
</style>
