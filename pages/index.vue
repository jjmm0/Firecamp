<template>
  <div class="master">
    <div class="pusher">
    
    </div>
    <div class="indexcontainer " >
      <div class="text">
        <h1>NAGŁÓWEK</h1><br/>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </div>
      
      <div class="accbuttons">
          <!-- <nuxt-link to="/rooms/create"> -->
            <div class="lbutton buttontext" @click="handleRouter('rooms/create')">
              Client
            </div>
          <!-- </nuxt-link> -->
          <!-- <nuxt-link to="/loginPage"> -->
            <div class="rbutton buttontext" @click="handleRouter('loginPage')">
              Helper
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