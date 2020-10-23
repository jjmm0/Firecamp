<template>
    <div class="page">
      <div class="HeaderClient">
        <HeaderClient />
      </div>
      <div class="wrapper">
        <!-- <div class="choice">
          <div @click="handleChoice(1)" class="loginpg log"><span>Zaloguj się</span></div>
          <div @click="handleChoice(2)" class="loginpg reg"><span>Zarejestruj się</span></div>
        </div> -->
        
          <!-- <img id="return" @click="handleRoute('/')" src="~/assets/ReturnArrow.png"> -->
        <div class="buttons">
          <div class="button loginbt" @click="handleChoice(1)">Zaloguj się</div>
          <div class="button registerbt" @click="handleChoice(2)">Zarejestruj się</div>


        </div>  
        <div class="forms">
          <Login v-if="choice == 1" />
          <Register v-if="choice == 2"/>
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
    },
    handleRoute(route){
      this.$router.push(`${route}`)
    }
  }
}
</script>
<style scoped>
@import '~/assets/style/LoginPage/loginPageStyles.css';
</style>