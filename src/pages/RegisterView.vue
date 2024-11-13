<script setup lang="ts">
import router from '@/router';
import { register } from '@/services/api';

  const name = ref<string>('');
  const email = ref<string>('');
  const password = ref<string>('');
  const confirmPassword = ref<string>('');
  const error = ref<boolean>(false);
  const errorMessage = ref<string>('');


  function LoginBtn(){
    router.push('/login')
  }

  async function handleRegister() {
    error.value = false;
    errorMessage.value = '';

    if(name.value.length > 50){
      error.value = true;
      errorMessage.value = 'Name is too Big!';
      return;
    }
    if(name.value.length < 5){
      error.value = true;
      errorMessage.value = 'Name is too short!';
      return;
    }
    if(email.value.length > 50){
      error.value = true;
      errorMessage.value = 'Email is too Big!';
      return;
    }
    if(email.value.length < 10){
      error.value = true;
      errorMessage.value = 'Email is too short!';
      return;
    }
    if(password.value.length < 8){
      error.value = true;
      errorMessage.value = 'Password is too short!';
      return;
    }
    if(password.value != confirmPassword.value){
      error.value = true;
      errorMessage.value = 'Passwords dont match!';
      return;
    }

    const response = await register(name.value, email.value, password.value);
    console.log(response);

    if(response.status == 201){
      router.push('/login');
    }
    else{
      errorMessage.value = 'Email must be valid and unique!';
      error.value = true;
    }
  }

</script>


<template>
  <div class="div-container d-flex justify-center align-center">
    <v-container class="login-card d-flex align-center justify-center flex-column rounded-xl" min-width="400">

      <h1 class="login-title mt-7">Register</h1>

      <form class="form">

        <v-text-field
        class="input mt-10"
          v-model="name"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
        class="input mt-2"
          v-model="email"
          label="Email"
          required
        ></v-text-field>

        <v-text-field
          class="input mt-2"
          type="password"
          v-model="password"
          label="Password"
          required
        ></v-text-field>

        <v-text-field
          class="input mt-2"
          type="password"
          v-model="confirmPassword"
          label="Confirm Password"
          required
        ></v-text-field>

        <p class="text-red" v-if="error">error: {{errorMessage}}</p>

        <v-btn class="login-btn mt-5" @click="handleRegister">Register</v-btn>
        <button class="register-btn mt-2 mb-15" @click="LoginBtn">Already has an account? Login</button>
    </form>
    </v-container>
  </div>
</template>


<style scoped>
.register-btn{
  width: 100%;
  color:  rgb(2, 152, 213);
}

.login-title{
  color:  rgb(2, 152, 213);
}

.form{
  width: 300px;
}

.login-btn{
  width: 100%;
  height: 50px !important;
  color: white;
  background-color: rgb(254, 50, 158);
}

.input{
  width: 100%;
}

@media (max-width: 400px) {
  .login-card{
    width: 100% !important;
    box-shadow: none !important;
  }
}

  .logo{
    width: 200px;
  }

  .div-container{
    width: 100%;
    height: 100%;
  }
  .login-card{
    width: 40%;
    height: 80%;
    box-shadow: 0px 0px 63px -23px rgba(0,0,0,0.5);
  }
</style>
