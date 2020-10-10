<template>
<!-- <div>
    <nuxt-link to="/"><img class="logo"
    src="https://pbs.twimg.com/profile_images/1170663788405825536/2mbm927v_400x400.jpg"/>
    </nuxt-link>
    <div class="buttons">
  <div class="buttons">
    <button @click="LogOut()">Wyloguj</button>
    <button>Profil</button>
    <button>Ranking</button>
  </div>
</div> -->

  <div class="wrapperHeader">
    <img class="logo" src="https://pbs.twimg.com/profile_images/1170663788405825536/2mbm927v_400x400.jpg"/>
    <a v-if="this.$store.state.userdata != (null || undefined)" style="font-size: 20px;">ZALOGOWANY JAKO: {{this.$store.state.userdata.name}} //Info</a>
    <div class="buttons" >
      <ul>
        <li><nuxt-link to="/profilePage"><button>Profil</button></nuxt-link></li>
        <li><button>Ranking</button></li>
        <li><button @click="LogOut()">Wyloguj</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
    methods:{
      LogOut(){
        this.$store.commit('logout')
        this.$router.push('/')
      }
    }
}
</script>
<style scoped>
@import "~/assets/style/Header/headerHelper.css";
</style>