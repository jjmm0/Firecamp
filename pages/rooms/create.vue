<template>
    <!-- <div>
        <label>Nazwa Użytkownika:</label><br>
        <input v-model="room.uname" type="text"><br>
        <label>Nazwa Pokoju:</label><br>
        <input v-model="room.name" type="text"><br>
        <label>Opis:</label><br>
        <input v-model="room.description" type="text">

        <button @click="createRoom">CREATE</button>
    </div> -->
  <div class="wrapper">
    <img id="return" @click="handleRoute('/')" src="~/assets/bg/Logo3.png">

    <div class="form-group" @keyup.enter="createRoom">
      <label for="userName" >Nazwa użytkownika <span :class="{redText: room.uname.length > 20}" >{{room.uname.length}} / 20</span></label>
      <br>
      <input id="userName" type="text" class="form-control" autocomplete="off" v-model="room.uname">
      <br>
      <label for="roomName" >Nazwa pokoju <span :class="{redText: room.name.length > 30}" >{{room.name.length}} / 30</span></label>
      <br>
      <input type="text" id="roomName" class="form-control" autocomplete="off" v-model="room.name">
      <br>
      <label for="roomDesc">Opis pokoju <span :class="{redText: room.description.length > 400}" >{{room.description.length}} / 400</span></label>
      <br>
      
      <textarea rows="3"  id="roomDesc" class="form-control" autocomplete="off" v-model="room.description"></textarea>
      <!-- Error Messages -->
      <p v-show="userError" class="alertText userAlert"><b>Nazwa użytkownika nie może być pusta!</b></p>
      <p v-show="roomError" class="alertText roomAlert" ><b>Nazwa pokoju nie może być pusta!</b></p>
      <p v-show="descError" class="alertText descAlert"><b>Opis pokoju nie może być pusty!</b></p>

      <br>
      <div class="button">
        <!-- <button @click="createRoom" type="submit"  :class="{disabled: disable ||  room.description.length > 400 || room.uname.length > 20 || room.name.length > 20}" :disabled="disable || room.description.length > 400" class="btn btn-primary">Utwórz pokój</button> -->
        <button @click="createRoom" type="submit"  :class="{disabled: Condition}" :disabled="disable || room.description.length > 400" class="btn btn-primary">Utwórz pokój</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  middleware: ['verify', 'notLoggedIn'],
  data(){
    return{
      //error handlers
        userError: false,
        roomError: false,
        descError: false,
        disable: false,
        descCharError: false,
      //counting input length
      descTotal: 0,
      room: {
        name: "",
        description: "",
        uname: "",
      }
    }
  },
  mounted(){
    this.socket = window.socket;

    this.socket.emit('leaveRoom')
    this.socket.on('refresh', () =>{
      location.reload(true)
    })

    this.socket.on('created', (roomId) => {
      let data = {
        roomId: roomId,
        helperID: this.$store.state.userdata.uid
      }
      this.socket.emit('roomConnect', data)
      this.$router.push(`/rooms/${roomId}`);
    })
  },
  computed:{
    Condition: function() {
      if(this.disable || this.room.description.length > 400 || this.room.uname.length > 20 || this.room.name.length > 20){
        return true
      }
      else{
        return false
      }
    }
  },
  methods: {
    handleRoute(route){
      this.$router.push(`${route}`)

    },
    async createRoom(){
      //preventing user from spamming on button
      if(!this.disable){
        if(!this.room.uname){
          this.userError = true;
        }
        else{
          this.userError = false;
        }
        if(!this.room.name){
          this.roomError = true;
        }
        else{
          this.roomError = false;
        }
        if(!this.room.description){
          this.descError = true;
        }
        else{
          this.descError = false;
        }
        if(this.room.name && this.room.description && this.room.uname){
          this.disable = true;
          await this.socket.emit('createRoom', this.room);
          //reseting values
            this.room.name = '';
            this.room.uname = '';
            this.room.description = '';
        }
      }
    }
  }    
}
</script>

<style scoped>
  @import 'assets/style/RoomCreate/roomCreateStyles.css';
</style>