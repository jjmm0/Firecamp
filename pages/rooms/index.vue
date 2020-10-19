<template>
  <div class="wrapper">
    <div>
      <HeaderHelper/>
    </div>
    <!-- <RoomWindow  /> -->
    <!-- <div v-for="room in rooms">
      <div @click="joinRoom(room)" style="background-color: blue; margin: 1%;">{{room.name}}<br />{{room.uname}}<br />{{room.description}}</div>

    </div> -->
    <div class="content" >
      <div class="block" v-for="room in rooms" @click="joinRoom(room)">
        <div class="roomName">{{room.name}}</div>
        <div class="userName">{{room.uname}}</div>
        <div class="roomDesc">{{room.description}}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  middleware: ['LoggedIn', 'verify'],
  data(){
    return{
      rooms: []
    }
  },
  mounted(){
    this.socket = window.socket

    this.socket.on('updateRooms', (rooms) => {
      this.rooms = rooms
    })

    this.socket.on('joinedRoom', (roomId) => {
      alert('wbijanko')
      this.$router.push(`/rooms/${roomId}`)
    })  
  },
  methods: {
    joinRoom(roomToJoin){
      this.socket.emit('joinRoom', roomToJoin)
    }
  }
}
</script>
<style scoped>
@import 'assets/style/RoomFind/roomFindStyles.css';
</style>