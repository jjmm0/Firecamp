<template>
    <div class="page">
      <HeaderClient />
      <div class="wrapper">
        <div class="choice">
          <button @click="handleChoice(1)" class="log">Zaloguj się</button>
          <button @click="handleChoice(2)" class="reg">Zarejestruj się</button>
        </div>
        <Login v-if="choice == 1" />
        <Register v-if="choice == 2"/>
      </div>
    </div>
</template>
<script>
export default {
  data(){
    return{
      choice: 0
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