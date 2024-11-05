<script setup lang="ts">
  console.log('a')
</script>


<template>
  <div class="div-container d-flex justify-center align-center">
    <v-container class="login-card d-flex align-center justify-center flex-column rounded-xl">
      <div>
        <img class="logo pa-2" src="../assets/Planify Logo icone.png" alt="" srcset="">
      </div>

      <h1 class="login-title mt-7">Login to Planify</h1>

      <form class="form">
        <v-text-field
        class="input mt-10"
          v-model="email"
          :counter="10"
          label="Email"
          required
        ></v-text-field>

        <v-text-field
        class="input mt-2"
          v-model="password"
          :counter="10"
          label="Password"
          required
        ></v-text-field>

        <v-btn class="login-btn mt-5">Login</v-btn>
        <button class="register-btn mt-2 mb-15">Doesn't have an account? Register</button>
    </form>
    </v-container>
  </div>
</template>


<style>
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
