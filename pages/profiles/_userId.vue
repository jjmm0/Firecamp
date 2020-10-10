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
        <div class="userName info">{{name}}</div>
        <div class="userStats info">{{likes}}</div>
      </div>
      
        <div class="userDesc info"><input type="text" :value="description"></div>
      
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            name: null,
            description: null,
            likes: null,
        }
    },
    mounted(){
        this.$axios.get(`/api/profiles/${this.$route.params.userId}`).then((resolve) => {
            this.name = resolve.data.name
            this.description = resolve.data.description
            this.likes = resolve.data.likes
            console.log(resolve.data)
            // if(resolve.status !== 200){
            //   this.$router.push('/')
            // }
        })
    }
}
</script>

<style scoped>
@import '~/assets/style/profile/profilestyles';
</style>