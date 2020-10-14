<template>
  <div class="master">
    <div class="pusher">
    
    </div>
    <div class="indexcontainer">
      <div class="text">
        <h1>NAGŁÓWEK</h1><br/>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </div>
      
      <div class="accbuttons">
        <div>
          <nuxt-link to="/rooms/create">
            <div class="lbutton">
              <b><a class="buttontext">Client</a></b>
            </div>
          </nuxt-link>
        </div>
        
        <div style="margin-left: 20%">
          <nuxt-link to="/loginPage">
            <div class="rbutton">
              <b><a class="buttontext">Helper</a></b>
            </div>
          </nuxt-link>
        </div>
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
  }

}
</script>

<style scoped>
    @import '~/assets/style/mainsite/style.css';
</style>