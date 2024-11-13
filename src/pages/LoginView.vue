<script setup lang="ts">
import router from '@/router';
import { login } from '@/services/api';

  const email = ref<string>('');
  const password = ref<string>('');
  const error = ref<boolean>(false);

  function registerBtn(){
    router.push('/register')
  }

  async function handleLogin(){
    const response = await login(email.value, password.value);
    if(response?.status == 200)
      router.push('/home')
    if(response?.status != 200){
      error.value = true
    }
  }
</script>


<template>
  <div class="div-container d-flex justify-center align-center">
    <v-container class="login-card pa-10 d-flex align-center justify-center flex-column rounded-xl" min-width="400">
      <div>
        <img class="logo pa-2" src="../assets/Planify Logo icone.png" alt="" srcset="">
      </div>

      <h1 class="login-title mt-7">Login to Planify</h1>

      <form class="form">
        <v-text-field
          class="input mt-10"
          v-model="email"
          label="Email"
          required
        ></v-text-field>

        <v-text-field
          class="input mt-2"
          v-model="password"
          type="password"
          label="Password"
          required
        ></v-text-field>

        <p v-if="error" class="text-red">Invalid Email or/and Password</p>

        <v-btn class="login-btn mt-5" @click="handleLogin">Login</v-btn>
        <button class="register-btn mt-2 mb-15" @click="registerBtn">Doesn't have an account? Register</button>
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

@media (max-width: 400px) {
  .login-card{
    width: 100% !important;
    box-shadow: none !important;

  }
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
