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
          if(resolve.status === 200)
          {
            alert("Utworzyles konto!")
          }
          else if(resolve.status === 400)
          {
            alert("Cos nie tak status 400")
          }
          else {
            alert("hmm?")
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