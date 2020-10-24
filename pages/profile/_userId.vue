<template>
  <div class="wrapper">
    <div class="header">
      <!-- <HeaderHelper v-if="this.$store.state.userdata.name || this.$store.state.userdata.uid || this.$store.state.userdata.token" />
      <HeaderClient v-else /> -->
      <HeaderBurger />
    </div>
    <div class="content">      
      <div class="profile">
        <img :src="`/api/avatar/${this.$route.params.userId}`" placeholder="Missing pfp" id="userProfilePicture">
        <input v-if="canedit" type="file" name="avatar" @change="sendAvatar" placeholder="gunga" class="pfpEdit">
        
          <div class="Username">
            <div class="text">
              {{name}} 
            </div>
          </div>
          <textarea class="editor" v-if="canedit" type="text" v-model="description" />
          <div class="Desc" v-else>
            {{description}}
          </div>
          <button class="saveDesc btn btn-primary" v-if="canedit" @click="editDesc()">Zapisz</button>
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
      description: 'asdasda',
      likes: null,
      canedit: false,
    }
  },
  mounted(){
    //Pobierz profil na podstawie routa w adresie
    let result = this.$axios.get(`/api/profile/${this.$route.params.userId}`).then((resolve) => {
        this.name = resolve.data.name;
        this.description = resolve.data.description;
        this.likes = resolve.data.likes;
        //Jezeli ten profil nalezy do ciebie zezwol na edycje
        if((resolve.data.id === this.$store.state.userdata.uid)&&
        (resolve.data.name === this.$store.state.userdata.name)&&
        (this.$store.state.userdata.token || this.$store.state.userdata.name || this.$store.state.userdata.uid)){
          this.canedit = true;
        }
    });
  },
  methods: {
    editDesc(){
      const { description } = this;
      this.$axios.put('/api/profile', {description}).then((resolve) => {
        if(resolve.status === 200){
          alert('Zedytowano!');
        }
        else{
          alert('?');
        }
      })
    },
    sendAvatar(event) {
      const formData = new FormData();
      formData.append('avatar', event.target.files[0]);
      
      this.$axios.post('/api/avatar', formData).then((resolve) => {
        if(resolve.status === 200){
          location.reload(true);
        }else{
          alert("Błąd");
        }
      });
    },
  },
}
</script>

<style scoped>
@import '~/assets/style/Profile/ProfileStyles.css';
</style>