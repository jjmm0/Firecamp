<template>
  <div class="wrapper">
    <div class="form-group" @keyup.enter="loginSubmit">
      <label for="login">Nazwa użytkownika</label>
      <br>
      <input v-model="login.Login" id="login" class="form-control">
      <br>
      <label for="password">Hasło</label>
      <br>
      <input v-model="login.Password" id="password" class="form-control">
      <br>
      <div class="button">
        <button @click="loginSubmit" type="submit" class="btn btn-primary" >Zaloguj się</button>
      </div>
    </div>
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
            alert('cos jest nie tak')
          }
        } 
        else{
          alert("cos jest nie tak")
        }
      })
    }
  }
}
</script>
<style scoped>
  @import '~/assets/style/Login/loginStyles.css';
</style>