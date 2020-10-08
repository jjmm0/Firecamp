<template>
  <div class="wrapper">
    <div>
      <HeaderHelper />
    </div>
    <div class="user-pfp">
      <img src="/" placeholder="Missing pfp" id="userProfilePicture">
    </div>
    <div class="userInfo">
      <div class="infowrap">
        <div class="userName info">asdasda</div>
        <div class="userStats info">123</div>
      </div>
      
        <div class="userDesc info"><input type="text" :value="description"></div>
      
    </div>
  </div>
</template>

<script>
export default {
    data(){
      return{
        description: 'Description iasvfhba'
      }
    }
}
</script>

<style scoped>
@import '~/assets/style/Profile/ProfileStyles.css';
</style>
