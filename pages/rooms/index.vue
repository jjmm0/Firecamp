<template>
  <div>
    <HeaderHelper/>
    <!-- <RoomWindow  /> -->
    <div v-for="room in rooms">
      <div style="background-color: blue; margin: 1%;">{{room.name}}<br />{{room.uname}}<br />{{room.description}}</div>

    </div>
  </div>
</template>

<script>
export default {
  middleware: ['LoggedIn', 'verify'],
  data(){
    return{
      rooms: [{name: "TEST"}]
    }
  },
  mounted(){
    this.socket = this.$nuxtSocket({
      name: "main",
    })

    this.socket.on('newRoom', (room) => {
      console.log(room.name)
      this.rooms.push({name: room.name, uname: room.uname, description: room.description})
    })
  }
}
</script>