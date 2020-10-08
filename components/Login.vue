<template>
  <div class="wrapper">
    <div class="form-group">
      <label for="login">Nazwa użytkownika</label>
      <br>
      <input v-model="login.Login" id="login" class="form-control">
      <br>
      <label for="password">Hasło</label>
      <br>
      <input v-model="login.Password" id="password" class="form-control">
      <br>
      <div class="button">
        <button @click="loginSubmit" type="submit" class="btn btn-primary">Zaloguj się</button>
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
        alert(`Zalogowano jako ${resolve.data}`)
      })
      // await this.$auth.loginWith('local', { data: this.login }).then(() => {
      //   console.log('koniec')
      //   alert('es')
        
      // })
      // this.$router.push('/roomsPage')
    }
  }
}
</script>
<style scoped>
  @import '~/assets/style/Login/loginStyles.css';
</style>