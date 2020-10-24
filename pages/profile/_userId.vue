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
          <div class="likesCounter">
            <div class="likes">
              <svg class="Like" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
              {{likes}}
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