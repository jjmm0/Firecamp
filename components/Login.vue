<template>
  <div class="wrapper">
    <center>
    <div class="form-group" @keyup.enter="loginSubmit">
      <label for="login">Nazwa użytkownika</label>
      <br>
      <input v-model="login.Login" id="login" autocomplete="off" type="text" class="form-control">
      <br>
      <label for="password">Hasło</label>
      <br>
      <input v-model="login.Password" id="password" type="password" class="form-control">

      <p v-show="errorMessage" class="alertText"><b>Błędny login lub hasło!</b></p>
      <br>
      <div class="button">
        <button @click="loginSubmit" type="submit" class="btn btn-primary" >Zaloguj się</button>
      </div>
    </div>
    </center>
  </div>
</template>
<script>
export default {
  data(){
    return{
      login: {
        Login: '',
        Password: '',
      },
      errorMessage: false,
      message: "",
    }
  },
  methods: {
    async loginSubmit(){
      let Login = this.login.Login
      let Password = this.login.Password
      await this.$axios.post('/api/login', {Login, Password}).then((resolve) => {
        if(resolve.status === 200){
          let token = resolve.data.token
          let nickname = resolve.data.login
          let userid = resolve.data.uid
          if(token != (null || undefined))//Jeżeli token istnieje przejdź do logowania
          {
            this.$store.commit('setAuth', {token, nickname, userid})
            this.$router.push('/rooms')
          }
          else{
            this.errorMessage = true;
          }
        } 
        else{
          this.errorMessage = true;
        }
      })
    }
  }
}
</script>
<style scoped>
  @import '~/assets/style/Login/loginStyles.css';
</style>