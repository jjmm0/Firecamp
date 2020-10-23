<template>
  <div class="master">
    <div class="pusher">
      <img class="logo" src="~/assets/bg/Logo3.png">
    </div>
    
    <div class="indexcontainer " >
      <div class="filter">
        <div class="text">
          <h1>Witaj na <b><i>Firecamp!</i></b></h1><br/>
            Strona <i><b>Firecamp</b></i> jest poświęcona pomaganiu osobom z różnymi problemami poprzez rozmowę.
              <br>
            Jeżeli jesteś tutaj, aby pomóc, wybierz prawy przycisk, jeśli jednak to Ty potrzebujesz pomocy, wybierz lewy przycisk.
        </div>
        <div class="accbuttons">
            <div class="lbutton " @click="handleRouter('rooms/create')">
              <div class="buttontext">
              Potrzebuję pomocy
              </div>
            </div>
            <div class="rbutton " @click="handleRouter('loginPage')">
              <div class="buttontext">
                Chcę pomagać
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['notLoggedIn', 'verify'],
  data(){
    return{

    }
  },
  methods:{
    handleRouter(route){
      this.$router.push(`/${route}`);
    }
  }

}
</script>

<style scoped>
    @import '~/assets/style/mainsite/style.css';
</style>