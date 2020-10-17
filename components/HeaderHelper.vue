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

     <!-- <a v-if="this.$store.state.userdata != (null || undefined)" style="font-size: 20px;">ZALOGOWANY JAKO: {{this.$store.state.userdata.name}} //Info</a> -->
   <!-- <div class="buttons" > 
      <ul>
        <li><nuxt-link to="/rooms"><button>Znajdź Pokój</button></nuxt-link></li>
        <li><nuxt-link :to="`/profile/${this.$store.state.userdata.uid}`"><button>Mój profil</button></nuxt-link></li>
        <li><nuxt-link to="/profile"><button>Lista profili</button></nuxt-link></li>
        <li><button>Ranking</button></li>
        <li><button @click="LogOut()">Wyloguj</button></li>
      </ul>
    </div>  -->

  <div class="buttons" > 
    <ul>
      <li id="imgli"><img class="logo" src="~/assets/Logo.png"/></li>
      <li @click="RouterPush('rooms')" class="li" ><nuxt-link to="/rooms"><div class="click">
        <!-- icon -->
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>

        Znajdź Pokój</div></nuxt-link></li>
      <li @click="RouterPush(`profile/${$store.state.userdata.uid}`)" class="li"><nuxt-link :to="`/profile/${this.$store.state.userdata.uid}`"><div class="click">
        <!-- icon -->
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>

        Mój profil</div></nuxt-link></li>

      <li @click="RouterPush('profile')" class="li"><nuxt-link to="/profile"><div class="click">
        <!-- icon -->
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>

        Lista profili</div></nuxt-link></li>

      <li onclick="alert('ranking')" class="li"><div class="click">
        <!-- icon -->
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>

        Ranking</div></li>

      <li class="li"><div class="click" @click="LogOut()">
        <!-- icon -->
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
        
        Wyloguj</div></li>

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
      },
      RouterPush(router){
          this.$router.push(`/${router}`)

      }
      
  },
}
</script>
<style scoped>
@import "~/assets/style/Header/headerHelper.css";
</style>