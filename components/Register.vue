<template>
  <div class="wrapper">
    <div class="form-group" @keyup.enter="registerSubmit()">
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
      <p v-show="message" class="alertText">{{message}}</p>
      <br>
      <div class="button">
        <button @click="registerSubmit()"  type="submit" class="btn btn-primary">Zarejestruj się</button>
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
          if(resolve.status === 200){ //Jeżeli pomyślnie zarejestrowano
            let token = resolve.data.token
            let nickname = resolve.data.login
            let userid = resolve.data.uid
            if(token || nickname || userid != null || undefined) //Jeżeli serwer odesłał poprawne dane
            {
              this.$store.commit('setAuth', {token, nickname, userid}) //Wywołaj setAuth w '~/store/index.js'
              this.$router.push('/roomsPage') //Przekierowanie
            }
            else{
              alert("cos jest nie tak")
            }
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