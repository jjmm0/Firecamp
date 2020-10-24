<template>
  <div class="wrapper">
    <center>
    <div class="form-group" @keyup.enter="registerSubmit()">
      <label for="login" >Nazwa użytkownika</label>
      <br>
      <input id="login" type="text" class="form-control" autocomplete="off" v-model="Login">
      <br>
      <label for="password">Hasło</label>
      <br>
      <input type="password" id="password" class="form-control" v-model="Password">
      <br>
      <label for="confirmPassword">Potwierdź hasło</label>
      <br>
      <input  type="password" id="confirmPassword" class="form-control" v-model="confirmPassword">
      
      <p v-show="error" class="alertText"><b>Hasła nie są identyczne!</b></p>
      <p v-show="message" class="alertText"><b>{{message}}</b></p>
      <br>
      <div class="button">
        <button @click="registerSubmit()"  type="submit" class="btn btn-primary">Zarejestruj się</button>
      </div>
    </div>
    </center>
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
        this.message = "";
      }
      else{
        this.error = false
        this.$axios.post('/api/register', {Login, Password}).then((resolve) => {
          //Jeżeli pomyślnie zarejestrowano
          if(resolve.status === 200){
            let token = resolve.data.token
            let nickname = resolve.data.login
            let userid = resolve.data.uid
            //Jeżeli serwer odesłał poprawne dane
            if(token || nickname || userid != null || undefined)
            {
              //  Wywołaj setAuth w '~/store/index.js'
              this.$store.commit('setAuth', {token, nickname, userid})
              //  Przekierowanie
              this.$router.push('/rooms')
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