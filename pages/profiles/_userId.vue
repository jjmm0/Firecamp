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
    this.$axios.get(`/api/profiles/${this.$route.params.userId}`).then((resolve) => {
        this.name = resolve.data.name
        this.description = resolve.data.description
        this.likes = resolve.data.likes

        if((resolve.data.id === this.$store.state.userdata.uid)&&
        (resolve.data.name === this.$store.state.userdata.name)){
          this.canedit = true
        }
    })
  },
  methods: {
    editDesc(){
      const { description } = this
      this.$axios.put('/api/profiles', {udata: this.$store.state.userdata, description}).then((resolve) => {
        //Jezeli pomyslnie zedytowales profil
        if(resolve.status === 200){
          alert('Zedytowano!')
        }
        else{ //Jezeli podczas edycji profilu zostales zle zweryfikowany
          
        }
      })
    }
  }
}
</script>

<style scoped>
@import '~/assets/style/profile/profilestyles';
</style>