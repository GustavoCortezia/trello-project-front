<script setup lang="ts">
import router from '@/router';
import { createEnvironment, getEnvironments } from '@/services/api';
import { EnvironmentType } from '@/types/EnvironmentType';

const environments = ref<EnvironmentType[]>([]);
const name = ref<string>('');
const color = ref<string>('#ff0000');
const isActive = ref<boolean>(false);
const error = ref<boolean>(false);

onMounted(async () => {
  const response = await getEnvironments();
  response.data.data.forEach((environment: EnvironmentType) => {
    environments.value.push(environment);
  });
  console.log(response);
});

function activateModal(){
  isActive.value = true;
}

function disactivateModal(){
  isActive.value = false;
}

async function handleCreateEnvironment(){
  if(name.value.length >= 30 || name.value.length <= 1) {
    error.value = true;
    return;
  }
  const response = await createEnvironment(name.value, color.value);
  console.log(response);
  if (response?.status == 201) {
    isActive.value = false;
    error.value = false;
    window.location.reload();
  }
}


</script>

<template>
  <v-app-bar class="nav-bar d-flex justify-center" :elevation="5" rounded>
    <v-app-bar-title><img class="nav-img mt-11" src="../assets/planify logo nome.png" alt=""></v-app-bar-title>
    <v-btn icon="mdi-calendar-blank"></v-btn>
    <v-btn icon="mdi-magnify"></v-btn>
    <v-btn icon="mdi-plus"></v-btn>
  </v-app-bar>

  <v-container>
    <div class="d-flex justify-space-around">
      <h2 class="my-env-title pa-8 mt-15" >My Environments</h2>
    </div>

    <v-container v-for="environment in environments" :key="environment.id">
      <RouterLink :to="`/environment/${environment.id}`" class="d-flex justify-center" style="text-decoration: none;">
      <div class="environment-card-div d-flex" >
        <div class="color-div" :style="{ backgroundColor: environment.color }"></div>
        <div class="content-div d-flex">
          <h2 class="env-name d-flex align-center mx-7">{{ environment.name }}</h2>
          <div class="env-action ml-auto">
            <v-btn class="btn-icon rounded" icon="mdi-delete"></v-btn>
            <v-btn class="btn-icon rounded" icon="mdi-pencil"></v-btn>
          </div>
        </div>
      </div>
    </RouterLink>
    </v-container>

    <v-btn @click="activateModal" class="create-btn">
      <v-icon icon="mdi-plus" start></v-icon>Create new Environment
    </v-btn>

    <!-- Modal -->
    <v-dialog
      v-model="isActive"
      transition="dialog-bottom-transition"
      width="auto"
    >
      <v-card
        class="d-flex flex-column justify-center align-center pa-15 rounded-xl"
        style="min-width: 600px; min-height: 400px;"
      >
      <form class="form d-flex justify-center align-center flex-column">
        <h1 class="card-title">Create new environment</h1>
        <v-text-field
        width="300"
        class="input mt-10"
            v-model="name"
            label="Name"
            required
          ></v-text-field>

          <div>
            <v-color-picker
              hide-canvas
              v-model="color"
              class="color-picker mt-5 mb-7"
              hide-inputs
              show-sliders
              mode="hex"
              hide-mode-switcher
            ></v-color-picker>
          </div>

          <p v-if="error" class="text-red mb-2">error: Enter a valid environment name!</p>

          <v-btn class="create-button" @click="handleCreateEnvironment" width="300px">Create</v-btn>
      </form>

        <v-card-actions class="justify-end">
          <v-btn
            class="close-btn"
            width="200px"
            text="Close"
            @click="disactivateModal"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

</template>

<style scoped>
  .env-name{
    width: 100%;
  }

  .my-env-title{
    color: rgb(2, 152, 213);
  }

  .btn-icon{
    height: 100% !important;
    box-shadow: none;
  }

  .content-div{
    width: 100% !important;
  }

  .env-action{
    justify-content:right !important;
    width: 100% !important;
    display: flex;
    gap: 10px;
  }

  .color-div{
    width: 30px;
  }

  .close-btn {
    color: rgb(2, 152, 213);
  }
  .create-button{
    background-color: rgb(254, 50, 158);
    color: white;
    border: 1px solid rgb(254, 50, 158);
  }

  .create-button:hover{
    background-color: white;
    color: rgb(254, 50, 158);
  }

  .card-title{
    color: rgb(2, 152, 213);
  }

  .nav-bar{
    height: 100px;
    border-bottom: 2px solid rgb(254, 50, 158);
  }
  ::v-deep(.v-toolbar__content) {
    height: 80px !important;
  }
  .nav-img{
    margin: 2%;
    width: 130px;
  }

  .environment-card-div{
    margin-bottom: -15px !important;
    transition: transform 0.4s !important;
    border-radius: 10px;
    border-bottom: 2px solid rgb(237, 237, 237);
    border-top: 2px solid rgb(237, 237, 237);
    width: 55%;
    height: 70px;
  }

  .environment-card-div:hover{
    transform: scale(1.03);
  }

  .create-btn{
    color: rgb(254, 50, 158);
    position: fixed;
    right: 50px;
    bottom: 60px;
  }
</style>
