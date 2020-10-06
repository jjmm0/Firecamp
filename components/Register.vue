<template>
  <div class="wrapper">
    <div class="forms">
      <label for="login">Nazwa użytkownika</label>
      <br>
      <input id="login" v-model="Login">
      <br>
      <label for="password">Hasło</label>
      <br>
      <input id="password" v-model="Password">
      <br>
      <label for="confirmPassword">Potwierdź hasło</label>
      <br>
      <input id="confirmPassword">
      <br>
      <div class="button">
        <button @click="registerSubmit()" type="submit" class="submitButton">Zarejestruj się</button>
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
      Email: String,
    }
  },
  methods:{
    registerSubmit(){
      const {Login, Password} = this

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
</script>
<style scoped>
  @import '~/assets/style/Register/registerStyles.css';
</style>