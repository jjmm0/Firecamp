<template>
  <div class="wrapper">
    <div class="form-group">
      <label for="login" >Nazwa użytkownika</label>
      <br>
      <input id="login" class="form-control" v-model="Login">
      <br>
      <label for="password">Hasło</label>
      <br>
      <input id="password" class="form-control" v-model="Password">
      <br>
      <label for="confirmPassword">Potwierdź hasło</label>
      <br>
      <input id="confirmPassword" class="form-control" v-model="confirmPassword">
      {{message}}
      <p v-show="error" class="alertText">Hasła nie są identyczne!</p>
      <br>
      <div class="button">
        <button @click="registerSubmit()" type="submit" class="btn btn-primary">Zarejestruj się</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      Login: "",
      Password: "",
      message: "",
      confirmPassword: "",
      Email: String,
      error: false
    }
  },
  methods:{
    registerSubmit(){
      const {Login, Password, confirmPassword} = this

      if(confirmPassword !== Password){
        this.error = true;
      }
      else{
        this.error = false
        this.$axios.post('/api/register', {Login, Password}).then((resolve) => {
          if(resolve.status === 200){
            let token = resolve.data
            this.$store.commit('setAuth', token)
            this.$router.push('/roomsPage')
          }
          else{
            this.message = resolve.data.message
          }
        })  
      }
    }
  }
}
</script>
<style scoped>
  @import '~/assets/style/Register/registerStyles.css';
</style>