<template>
  <div class="master">
    <div class="pusher">
    
    </div>
    
    <div class="indexcontainer " >
      <div class="text">
        <h1>Witaj na Ognisku!</h1><br/>
          Strona ta jest poświęcona pomaganiu osobom z problemami/( (deperesją) wywal jedrzej jc ok) poprzez rozmowę.
          Jeżeli jesteś tutaj, aby pomóć wybierz prawy przycisk, jeśli jednak to ty potrzebujesz pomocy wybierz lewy przycisk .
      </div>
      
      <div class="accbuttons">
          <!-- <nuxt-link to="/rooms/create"> -->
            <div class="lbutton buttontext" @click="handleRouter('rooms/create')">
              Potrzebuję pomocy
            </div>
          <!-- </nuxt-link> -->
          <!-- <nuxt-link to="/loginPage"> -->
            <div class="rbutton buttontext" @click="handleRouter('loginPage')">
              Chcę pomagać
            </div>
          <!-- </nuxt-link> -->
      </div>
      <Footer />
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
  mounted(){
    // this.socket = this.$nuxtSocket()
  },
  methods:{
    handleRouter(route){
      this.$router.push(`/${route}`)
    }
  }

}
</script>

<style scoped>
    @import '~/assets/style/mainsite/style.css';
</style>