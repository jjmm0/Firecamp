<template>
  <div>
    <HeaderHelper/>
    <!-- <RoomWindow  /> -->
    <div v-for="room in rooms">
      <div @click="joinRoom(room)" style="background-color: blue; margin: 1%;">{{room.name}}<br />{{room.uname}}<br />{{room.description}}</div>

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
    this.socket = this.$nuxtSocket({
      name: "main",
    })

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