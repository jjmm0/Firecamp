<template>
  <div class="wrapper">
    <div class="header">
      <HeaderHelper v-if="screenWidth > 700"/>
      <HeaderBurger v-if="screenWidth <= 700"/>
      
    </div>
    <div class="content" >
      <div class="block" v-for="room in rooms" @click="joinRoom(room)">
        <div class="roomName" ><i><b><span class="txt">Nazwa pokoju: </span></b></i>{{room.name}}</div>
        <div class="userName"><i><b><span class="txt">Nazwa użytkownika: </span></b></i>{{room.client}}</div>
        <div class="roomDesc"><i><b><span class="txt">Opis: </span></b></i>{{room.description}}</div>
      </div>
      <div v-if="emptyRooms" class="empty"><div class="text">Brak pokojów</div></div>
    </div>
  </div>
</template>

<script>

export default {
  middleware: ['LoggedIn', 'verify'],
  data(){
    return{
      rooms: [],
      screenWidth: 0,
    }
  },
  computed:{
    emptyRooms: function(){
      if(this.rooms.length == 0){
        return true;
      }
      else{
        return false;
      }
    },

  },
  mounted(){
    this.socket = window.socket;
    // Send emit to get list of rooms
    this.socket.emit('getRooms');
  
    // Receive updated list of rooms
    this.socket.on('updateRooms', (rooms) => {
      this.rooms = rooms;
    })
    // If you joined to the room succesfully
    this.socket.on('joined', (roomId) => {
      let data = {
        roomId: roomId,
        helperID: this.$store.state.userdata.uid
      };
      // Connect to this room and push route
      this.socket.emit('roomConnect', data);
      this.$router.push(`/rooms/${roomId}`);
    });

    this.screenWidth = window.innerWidth;
    window.addEventListener('resize', ()=>{
      this.screenWidth = window.innerWidth;
    });
  },
  methods: {
    joinRoom(roomToJoin){
      this.socket.emit('joinRoom', roomToJoin);
    }
  }
}
</script>
<style scoped>
@import 'assets/style/RoomFind/roomFindStyles.css';
</style>