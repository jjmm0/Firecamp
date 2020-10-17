<template>
  <div class="wrapper">
    <div>
      <HeaderHelper v-if="this.$store.state.userdata.name || this.$store.state.userdata.uid || this.$store.state.userdata.token" />
      <HeaderClient v-else />
    </div>
    <div class="user-pfp">
      <img :src="`/api/avatar/${this.$route.params.userId}`" placeholder="Missing pfp" id="userProfilePicture">
    </div>
    <div class="userInfo">
      <div class="infowrap">
        <div class="userName info">{{name}}</div>
        <div class="userStats info">{{likes}}</div>
      </div>

      <input v-if="canedit" type="file" name="avatar" @change="sendAvatar" />
      
        <div class="userDesc info">
          <input v-if="canedit" type="text" v-model="description" @keyup.enter="editDesc()">
          <a v-else>{{description}}</a>
        </div>
      
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['verify'],
  data(){
    return{
      name: null,
      description: null,
      likes: null,
      canedit: false,
    }
  },
  mounted(){
    //Pobierz profil na podstawie routa w adresie
    let result = this.$axios.get(`/api/profile/${this.$route.params.userId}`).then((resolve) => {
        this.name = resolve.data.name
        this.description = resolve.data.description
        this.likes = resolve.data.likes
        //Jezeli ten profil nalezy do ciebie zezwol na edycje
        if((resolve.data.id === this.$store.state.userdata.uid)&&
        (resolve.data.name === this.$store.state.userdata.name)&&
        (this.$store.state.userdata.token || this.$store.state.userdata.name || this.$store.state.userdata.uid)){
          this.canedit = true
        }
    })
  },
  methods: {
    editDesc(){
      const { description } = this
      this.$axios.put('/api/profile', {description}).then((resolve) => {
        if(resolve.status === 200){
          alert('Zedytowano!')
        }
        else{
          alert('?')
        }
      })
    },
    sendAvatar(event) {
      const formData = new FormData()
      formData.append('avatar', event.target.files[0])
      
      this.$axios.post('/api/avatar', formData).then((resolve) => {
        if(resolve.status === 200){
          location.reload(true)
        }else{
          alert("Błąd")
        }
      })
    },
  },
}
</script>

<style scoped>
@import '~/assets/style/profile/profilestyles';
</style>