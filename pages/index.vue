<template>
  <div class="mainsitecontainer">
      <div class="text">
        <h1>duzy tekst xd</h1><br/>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </div>
      
      <div class="accbuttons">
        <div>
          <nuxt-link to="/loginPage">
            <div class="lbutton">
              <b><a class="buttontext">Client</a></b>
            </div>
          </nuxt-link>
        </div>
        
        <div>
          <nuxt-link to="/loginPage">
            <div class="rbutton">
              <b><a class="buttontext">Login/register as a helper</a></b>
            </div>
          </nuxt-link>
        </div>
      </div>


    </div>
</template>

<script>
export default {
  data(){
    return{

    }
  }
}
</script>

<style scoped>
    @import '~/assets/style/mainsite/style.css';
</style>
