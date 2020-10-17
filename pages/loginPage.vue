<template>
    <div class="page">
      <HeaderClient />
      <div class="wrapper">
        <!-- <div class="choice">
          <div @click="handleChoice(1)" class="loginpg log"><span>Zaloguj się</span></div>
          <div @click="handleChoice(2)" class="loginpg reg"><span>Zarejestruj się</span></div>
        </div> -->
        <nuxt-link to="/">
          <img id="return" src="~/assets/ReturnArrow.png">
        </nuxt-link>
        <div class="buttons">
          <div class="button loginbt" @click="handleChoice(1)">Zaloguj się</div>
          <div class="button registerbt" @click="handleChoice(2)">Zarejestruj się</div>


        </div>  
        <div style="overflow: hidden;">
          <Login class="forms" v-if="choice == 1" />
          <Register class="forms" v-if="choice == 2"/>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  middleware: ['notLoggedIn', 'verify'],
  data(){
    return{
      choice: 0,
    }
  },
  methods:{
    handleChoice(choice){
      this.choice = choice;
    }
  }
}
</script>
<style scoped>
@import '~/assets/style/LoginPage/loginPageStyles.css';
</style>